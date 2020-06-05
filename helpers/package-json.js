export const defaults = {
  name: '',
  version: '0.0.1',
  description: 'API created by create-node-express-app',
  main: 'index.js',
  scripts: {
    start: 'node index.js',
    build: 'rimraf build && npm run lint && babel ./src --out-dir build/src',
    dev: 'nodemon --exec babel-node index.js',
    'dev-inspect': 'babel-node --inspect index.js',
    lint: "eslint 'index.js' 'src/**/*.js' 'src/index.js' ",
    precommit: 'npm run lint',
    prepush: 'npm run lint'
  },
  repository: {
    type: 'git',
    url: ''
  },
  author: 'Create node express app',
  license: 'ISC'
}

export const dependencies = [
  'cors',
  'express',
  'express-jwt',
  'jsonwebtoken',
  'mongoose'
]

export const devDependencies = [
  '@babel/cli',
  '@babel/core',
  '@babel/node',
  '@babel/preset-env',
  'eslint',
  'eslint-config-standard',
  'eslint-plugin-import',
  'eslint-plugin-node',
  'eslint-plugin-promise',
  'eslint-plugin-standard',
  'husky',
  'nodemon',
  'rimraf'
]
