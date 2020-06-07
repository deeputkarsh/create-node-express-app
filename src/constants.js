import path from 'path'
import packageJson from '../package.json'

export const MODE_0666 = parseInt('0666', 8)
export const MODE_0755 = parseInt('0755', 8)
export const TEMPLATE_DIR = path.join(__dirname, '..', 'templates')
export const VERSION = packageJson.version
