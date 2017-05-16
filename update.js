const contentful = require('contentful')
const fs = require('fs')
const http = require('http')
const mimeTypes = require('mime-types')
const ncp = require('ncp').ncp
const path = require('path')
const rimraf = require('rimraf')
const Jimp = require('jimp')

const fetchSpaceData = async ({ accessToken, space }) => {
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
			return reject('Response status was ' + response.statusCode);
		}
		response.pipe(file)
		file.on('finish', () => file.close(resolve(response)))
	})

	request.on('error', function (err) {
		fs.unlink(dest)
		return reject(err.message)
	})

	file.on('error', function(err) {
		fs.unlink(dest)
		return reject(err.message)
	})
})

const saveFile = async (path, contents) => new Promise((resolve, reject) => {
	fs.writeFile(path, contents, err => err ? reject(err) : resolve())
})

const processImage = async (filePath, name, config = { }) => {
	const type = config.type || 'resize'
	const width = config.width || Jimp.AUTO
	const height = config.height || Jimp.AUTO


	let image
	image = await Jimp.read(filePath)
	image = await new Promise((resolve, reject) => {
		image[type](width, height, (err, image) => {
			if(err){
				return reject(err)
			}
			resolve(image)
		})
	})
	await new Promise((resolve, reject) => {
		const dirname = path.dirname(filePath)
		const extname = path.extname(filePath)
		const basename = path.basename(filePath, extname)
		image.write(path.join(dirname,`${basename}-${name}${extname}`),	err => {
			if(err){
				return reject(err)
			}
			resolve()
		})
	})
}

const mkdir = async path => new Promise((resolve, reject) => {
	fs.mkdir(path , err => {
		if(err){
			return reject(err)
		}
		resolve()
	})
})

const rmdir = async path => new Promise((resolve, reject) => {
	rimraf(path, err => {
		if(err){
			return reject(err)
		}
		resolve()
	})
})

const cpdir = async (src, dest) => new Promise((resolve, reject) => {
	ncp(src, dest, err => {
		if(err){
			return reject(err)
		}
		resolve()
	})
})

const update = async ({ accessToken, space, imageSizes, contentTypePages }) => {
	// Create the /pages directory, from the /src
	await rmdir('pages')
	await cpdir('src', 'pages')

	// Create the other contentful directories
	await rmdir(path.join('static', 'contentful'))
	await mkdir(path.join('static', 'contentful'))

	await rmdir(path.join('utils', 'contentful.js'))

	// Fetch the data from contentful
	const spaceData = await fetchSpaceData({
		accessToken,
		space
	})

	// Enrich every "file" field with an "extension" field
	Object.keys(spaceData).forEach(type => {
		const enrichFile = item => {
			if (!item.fields) {
				return
			}
			if (item.fields.file) {
				item.fields.file.extension = mimeTypes.extension(item.fields.file.contentType)
			}
			Object.keys(item.fields).forEach(key => enrichFile(item.fields[key]))
		}
		spaceData[type].forEach(enrichFile)
	})
	// Download all the assets
	await Promise.all(spaceData.Asset.map(asset => download(
		asset.fields.file.url.indexOf('//') === 0 ? `http:${asset.fields.file.url}` : asset.fields.file.url,
		path.join(
			__dirname,
			'static',
			'contentful',
			`${asset.sys.id}.${asset.fields.file.extension}`
		)
	)))
	// Resize all the images
	await Promise.all(spaceData.Asset
		.filter(asset =>
			['jpg', 'jpeg', 'png', 'gif', 'tiff']
			.includes(asset.fields.file.extension)
		)
		.map(asset => Promise.all(Object.keys(imageSizes).map(size =>
			processImage(
				path.join(
					__dirname,
					'static',
					'contentful',
					`${asset.sys.id}.${asset.fields.file.extension}`
				),
				size,
				{
					type   : imageSizes[size].type,
					width  : imageSizes[size].width,
					height : imageSizes[size].height
				}
			)
		)))
	)

	// Append the most recent site metadata
	spaceData.meta = spaceData.siteMeta.slice(-1).pop().fields
	spaceData.meta.contentTypeSlugs = spaceData.meta.contentTypeSlugs.reduce((hash, row) => {
		const rowArray = row.split(',')
		hash[rowArray[0]] = rowArray[1]
		return hash
	}, {})

	// Append the image sizes
	spaceData.imageSizes = imageSizes

	// Save all the contentful data as a json
	await saveFile(path.join('static', 'contentful', 'data.json'), JSON.stringify(spaceData, null, '\t'))

	// Save all the contentful data also as javascript, so it can be accessed by
	// the components.
	await saveFile(path.join('utils', 'contentful.js'), `export default ${JSON.stringify(spaceData, null, '\t')}\n`)

	// Create the individual pages for every content type
	const renderPage = (type, single, dataPath) => `
		import Component from '../../components/types/${type}/${single ? 'single' : 'index'}'
		import contentful from '../../utils/contentful.js'

		const Wrapper = props =>
			<Component
				{...props}
				data={contentful.${dataPath}}
			/>

		Wrapper.getInitialProps = props =>
			({
				pathname : props.pathname,
				query    : props.query,
				asPath   : props.asPath
			})

		export default Wrapper
	`
	await Promise.all(Object.keys(contentTypePages).map(type => (async () => {
		const slug = spaceData.meta.contentTypeSlugs[type]
		await mkdir(path.join('pages', slug))
		if (contentTypePages[type].index) {
			await saveFile(path.join('pages', slug, 'index.js'), renderPage(type, false, type))
		}
		if (contentTypePages[type].single) {
			await Promise.all(spaceData[type].map((item, index) => (async () => {
				await saveFile(path.join('pages', slug, `${item.fields.slug}.js`), renderPage(type, true, `${type}[${index}]`))
			})()))
		}
	})()))
}

update({
	accessToken : '2890b1a4fd9b02f31de1f9d62e02b0163df8147226ec0fdacb6ae5f3b2b6e53b',
	space       : 't44t8y72jr7d',

	imageSizes : {
		thumbnail : {
			type   : 'cover',
			width  : 200,
			height : 200,
		},
		small : {
			type  : 'resize',
			width : 600
		}
	},

	contentTypePages : {
		lessonPlanCollection : {
			index  : true,
			single : true
		},
		lessonPlan : {
			single : true
		}
	}
})
