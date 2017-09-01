require('dotenv').config()

const execute = require('../utils/execute')
const s3 = require('s3')
const path = require('path')

const accessKeyId = process.env.S3_KEY
const secretAccessKey = process.env.S3_SECRET
const region = process.env.S3_REGION
const bucket = process.env.S3_BUCKET

const client = s3.createClient({
	s3Options : {
		accessKeyId,
		secretAccessKey,
		region
	}
})

const upload = () => new Promise((resolve, reject) => {
	const uploader = client.uploadDir({
		localDir      : 'out',
		deleteRemoved : true,
		s3Params      : {
			Bucket : bucket
		},
		getS3Params : (localFile, stat, callback) => {
			const longCacheControl = 'max-age=604800, public, no-transform'
			const quickCacheControl = 'max-age=120, public, no-transform'
			let CacheControl
			switch (path.extname(localFile)) {
				case '.html':
				case '.json':
					CacheControl = quickCacheControl
					break
				default:
					CacheControl = longCacheControl
			}
			// eslint-disable-next-line no-console
			console.log(`Uploading -> ${localFile}`)
			callback(null, { CacheControl })
		}
	})
	uploader.on('error', err => reject(err))
	uploader.on('end', () => resolve())
})

execute(async ({ fork }) => {
	// build
	await fork('lib/scripts/build.js')
	// upload
	await upload()
})
