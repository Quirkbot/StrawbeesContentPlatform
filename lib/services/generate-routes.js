const path = require('path')
const getRoutes = require('../utils/getRoutes')
const saveJson = require('../utils/saveJson')

const init = async () => {
	const routes = await getRoutes()
	await saveJson(path.join(__dirname, '..', '..', 'static', 'routes.json'), routes)
}
init()
