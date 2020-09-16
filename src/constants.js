import path from 'path'
import packageJson from '../package.json'

export const MODE_0666 = parseInt('0666', 8)
export const MODE_0755 = parseInt('0755', 8)
export const TEMPLATE_DIR = path.join(__dirname, '..', 'templates')
export const VERSION = packageJson.version

export const ASSERTION = /^y|yes|ok|true$/i

export const DEPENDENCIES = {
  env: { dotenv: '^8.2.0' },
  cors: { cors: '^2.8.5' },
  jwt: { 'express-jwt': '^5.3.3', jsonwebtoken: '^8.5.1' },
  mongoose: { mongoose: '^5.9.18' }
}

export const PKG_DEFAULT = {
  name: '',
  version: '0.0.1',
  description: 'Rest API created by create-node-express-app',
  main: 'index.js',
  scripts: {
    start: 'node index.js',
    build: 'rimraf build && npm run lint && babel ./src --out-dir build/src',
    dev: 'nodemon --exec babel-node index.js',
    'dev-inspect': 'babel-node --inspect index.js'
  },
  repository: {
    type: 'git',
    url: ''
  },
  'lint-staged': {
    '*.js': [
      'eslint . --fix',
      'git add'
    ]
  },
  husky: {
    hooks: {
      'pre-commit': 'lint-staged'
    }
  },
  dependencies: {
    express: '^4.17.1'
  },
  devDependencies: {
    '@babel/cli': '^7.10.1',
    '@babel/core': '^7.10.2',
    '@babel/node': '^7.10.1',
    '@babel/preset-env': '^7.10.2',
    eslint: '^7.2.0',
    'eslint-config-standard': '^14.1.1',
    'eslint-plugin-import': '^2.20.2',
    'eslint-plugin-node': '^11.1.0',
    'eslint-plugin-promise': '^4.2.1',
    'eslint-plugin-standard': '^4.0.1',
    husky: '^4.2.5',
    'lint-staged': '^10.2.11',
    nodemon: '^2.0.4',
    rimraf: '^3.0.2'
  }
}
