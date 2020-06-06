const path = require('path')
const VERSION = require('../package').version

const MODE_0666 = parseInt('0666', 8)
const MODE_0755 = parseInt('0755', 8)
const TEMPLATE_DIR = path.join(__dirname, '..', 'templates')

module.exports = { MODE_0755, MODE_0666, TEMPLATE_DIR, VERSION }
