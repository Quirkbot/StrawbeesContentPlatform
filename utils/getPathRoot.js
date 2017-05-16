export default path =>
	(path.match(/\//g) || []).reduce(path => path + '../', './')
