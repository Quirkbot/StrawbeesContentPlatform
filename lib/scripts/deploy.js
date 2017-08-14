const execute = require('../utils/execute')
const s3 = require('s3')

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
