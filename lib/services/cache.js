const contentful = require('contentful')
const fs = require('fs')
const http = require('http')
const mimeTypes = require('mime-types')
const path = require('path')
const rimraf = require('rimraf')
const Jimp = require('jimp')

const initCache = async ({ sources, imageSizes }) => {
	try {
		const dir = path.join(__dirname, 'static', 'contentful')
		await rmdir(dir)
		await mkdir(dir)
		let index = await Promise.all(sources.map(
			({
				cdaToken,
				spaceId,
				id,
				basename
			}) => cacheSpace({
				cdaToken,
				spaceId,
				id,
				basename,
				dir,
				imageSizes
			})
		))

		await saveJson(path.join(dir, 'imageSizes.json'), imageSizes)
		await saveJson(path.join(dir, 'index.json'), index)

		index = index.reduce((acc, o) => {
			acc[o.site.id] = o
			return acc
		}, {})

		const saveFields = field => {
			const data = Object.keys(index).reduce((acc, key) => {
				acc[key] = index[key][field]
				return acc
			}, {})
			return saveJson(path.join(dir, `${field}.json`), data)
		}
		await saveFields('data')
		await saveFields('normalizedData')
		await saveFields('meta')
		await saveFields('route')
		await saveFields('site')
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log('Error during cache', error)
	}
}

const cacheSpace = async ({
		cdaToken,
		spaceId,
		id,
		basename,
		dir,
		imageSizes
	}) => {
	// Create the static directory
	await mkdir(path.join(dir, id))

	// Fetch the space from contentful
	const data = await fetchSpaceData({
		cdaToken,
		spaceId
	})

	// Site identifcation
	const site = {
		id,
		basename
	}

	// Extract and parse the metadata from contentful
	const meta = data.siteMeta.slice(-1).pop().fields
	meta.contentTypeSlugs = meta.contentTypeSlugs.reduce((acc, row) => {
		const rowArray = row.split(',')
		acc[rowArray[0]] = rowArray[1]
		return acc
	}, {})

	// Create the page route, based on the existing page templates
	const route = {}
	route[`/${basename}`] = {
		page  : '/',
		query : {
			site : id
		}
	}
	await Promise.all(Object.keys(data).map(async type => {
		const typeSlug = meta.contentTypeSlugs[type]

		const listPath = path.join(
			__dirname,
			'pages',
			'contentful',
			`${type}-list`
		)
		if (await exists(listPath)) {
			route[`${basename ? '/' : ''}${basename}/${typeSlug}`] = {
				page  : `/contentful/${type}-list`,
				query : {
					site        : id,
					contentType : type
				}
			}
		}

		const singlePath = path.join(
			__dirname,
			'pages',
			'contentful',
			`${type}-single`
		)
		if (await exists(singlePath)) {
			data[type].forEach(item =>
				route[`${basename ? '/' : ''}${basename}/${typeSlug}/${item.fields.slug || item.sys.id}`] = {
					page  : `/contentful/${type}-single`,
					query : {
						site        : id,
						contentType : type,
						id          : item.sys.id
					}
				}
			)
		}
	}))


	// Download all the assets
	await mkdir(path.join(dir, id, 'assets'))
	const localAssets = await Promise.all(data.Asset.map(({ sys, fields }) =>
		(async () => {
			const url = fields.file.url.indexOf('//') === 0 ? `http:${fields.file.url}` : fields.file.url
			const ext = mimeTypes.extension(fields.file.contentType)
			const filename = path.join(dir, id, 'assets', `${sys.id}.${ext}`)
			await download(url, filename)
			return { ext, filename }
		})()
	))

	// Resize all the asset images
	await Promise.all(localAssets
		.filter(({ ext }) => ['jpg', 'jpeg', 'png', 'gif', 'tiff'].includes(ext))
		.map(({ filename }) => Promise.all(Object.keys(imageSizes).map(size =>
			processImage(filename, size, imageSizes[size])
		)))
	)

	// Remove the external references from files
	// Extend the data by enriching "file" entry with an "extension" field
	Object.keys(data).forEach(type => {
		if (!data[type].forEach) {
			return
		}
		const parseItem = item => {
			if (item.forEach) {
				item.forEach(parseItem)
				return
			}
			const { sys, fields } = item
			if (!fields) {
				return
			}

			if (fields.file) {
				fields.directory = `/static/contentful/${id}/assets`
				fields.extension = mimeTypes.extension(fields.file.contentType)
				fields.url = `${fields.directory}/${sys.id}.${fields.extension}`
				delete fields.file
			}
			Object.keys(fields).forEach(key => parseItem(fields[key]))
		}
		data[type].forEach(parseItem)
	})

	// Simplify items to include only id, contentType and fields
	Object.keys(data).forEach(type => {
		if (!data[type].forEach) {
			return
		}
		const parseItem = item => {
			if (item.forEach) {
				item.forEach(parseItem)
				return
			}
			const { sys, fields } = item
			if (!fields || !sys) {
				return
			}
			fields.id = sys.id
			fields.contentType = sys.contentType ? sys.contentType.sys.id : sys.type

			Object.keys(item).forEach(key => delete item[key])
			Object.assign(item, fields)
			Object.keys(item).forEach(key => parseItem(item[key]))
		}
		data[type].forEach(parseItem)
	})

	// Normalize
	const normalizedData = JSON.parse(JSON.stringify(data))
	const addLabel = item => {
		Object.keys(item).forEach(field => {
			const value = item[field]
			if (value.id) {
				item[field] = value.id
				return
			}
			if (value.forEach) {
				item[field] = value.reduce((acc, cur, i) => {
					acc[i] = cur
					return acc
				}, {})
				addLabel(item[field])
			}
		})
	}
	Object.keys(normalizedData).forEach(type => {
		normalizedData[type].forEach(addLabel)
		normalizedData[type] = normalizedData[type].reduce((acc, item) => {
			acc[item.id] = item
			return acc
		}, {})
	})

	// Save data to disk...

	// Content types
	await mkdir(path.join(dir, id, 'data'))
	await saveJson(path.join(dir, id, 'data', 'index.json'), normalizedData)
	await Promise.all(Object.keys(normalizedData).map(async type => {
		// All entries in content type
		await mkdir(path.join(dir, id, 'data', type))
		await saveJson(path.join(dir, id, 'data', type, 'index.json'), normalizedData[type])

		// Individual entries
		await Promise.all(Object.keys(normalizedData[type]).map(itemId => mkdir(
			path.join(dir, id, 'data', type, itemId)
		)))
		await Promise.all(Object.keys(normalizedData[type]).map(itemId => saveJson(
			path.join(dir, id, 'data', type, itemId, 'index.json'),
			normalizedData[type][itemId]
		)))
	}))
	// Other data
	await saveJson(path.join(dir, id, 'data.json'), data)
	await saveJson(path.join(dir, id, 'normalizedData.json'), normalizedData)
	await saveJson(path.join(dir, id, 'site.json'), site)
	await saveJson(path.join(dir, id, 'meta.json'), meta)
	await saveJson(path.join(dir, id, 'route.json'), route)

	// Save everything as one json
	const index = {
		site,
		data,
		normalizedData,
		meta,
		route
	}
	await saveJson(path.join(dir, id, 'index.json'), index)
	return index
}

const fetchSpaceData = async config => {
	const {
		cdaToken : accessToken,
		spaceId  : space
	} = config
	const client = contentful.createClient({ accessToken, space })

	const responses = await Promise.all([
		client.getEntries({ include : 10 }),
		client.getAssets()
	])
	const items = []
	// merge into one array
	.concat(...responses.map(response => response.items))
	// group by content type
	.reduce((a, item) => {
		const type = item.sys.contentType ? item.sys.contentType.sys.id : item.sys.type
		if (typeof a[type] === 'undefined') {
			a[type] = []
		}
		a[type].push(item)
		return a
	}, {})

	return items
}

const download = (url, dest) => new Promise((resolve, reject) => {
	const file = fs.createWriteStream(dest)
	const request = http.get(url, response => {
		if (response.statusCode !== 200) {
			reject(`Response status was ${response.statusCode}`)
			return
		}
		response.pipe(file)
		file.on('finish', () => file.close(resolve(response)))
	})

	request.on('error', err => {
		fs.unlink(dest)
		return reject(err.message)
	})

	file.on('error', err => {
		fs.unlink(dest)
		return reject(err.message)
	})
})
const saveJson = async (filename, contents) =>
	saveFile(filename, JSON.stringify(contents, null, '\t'))
const saveFile = async (filename, contents) => new Promise((resolve, reject) => {
	fs.writeFile(filename, contents, err => {
		if (err) {
			reject(err)
			return
		}
		resolve()
	})
})

const processImage = async (filename, size, config = { }) => {
	const type = config.type || 'resize'
	const width = config.width || Jimp.AUTO
	const height = config.height || Jimp.AUTO

	let image
	image = await Jimp.read(filename)
	image = await new Promise((resolve, reject) => {
		image[type](width, height, (err, img) => {
			if (err) {
				reject(err)
				return
			}
			resolve(img)
		})
	})
	await new Promise((resolve, reject) => {
		const dirname = path.dirname(filename)
		const extname = path.extname(filename)
		const basename = path.basename(filename, extname)
		image.write(path.join(dirname, `${basename}-${size}${extname}`), err => {
			if (err) {
				reject(err)
				return
			}
			resolve()
		})
	})
}

const exists = async filename => new Promise(resolve => {
	fs.access(filename, err => {
		if (err) {
			resolve(false)
			return
		}
		resolve(true)
	})
})
const mkdir = async filename => new Promise((resolve, reject) => {
	fs.mkdir(filename, err => {
		if (err) {
			reject(err)
			return
		}
		resolve()
	})
})
const rmdir = async filename => new Promise((resolve, reject) => {
	rimraf(filename, err => {
		if (err) {
			reject(err)
			return
		}
		resolve()
	})
})

initCache(require('./../../contentful.config.json'))
