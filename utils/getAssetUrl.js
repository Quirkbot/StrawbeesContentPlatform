import getPathRoot from './getPathRoot'

export default (asset, size, fromPath) =>
	`${fromPath ? getPathRoot(fromPath) : ''}static/contentful/${asset.sys.id}${size ? `-${size}` : ''}.${asset.fields.file.extension}`
