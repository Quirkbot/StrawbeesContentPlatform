export default obj => Object.keys(obj).reduce((acc, key) =>
	`${acc}${obj[key] ? key : `not-${key}`} `
	, '')
