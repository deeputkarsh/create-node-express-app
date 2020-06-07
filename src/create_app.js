import path from 'path'
import sortedObject from 'sorted-object'
import { MODE_0755 } from './constants'
import { copyTemplate, copyTemplateMulti, loadTemplate, write, mkdir, launchedFromCmd } from './helpers'

/**
 * Create application at the given directory.
 *
 * @param {string} name
 * @param {string} dir
 */
export default function (name, dir) {
  console.log()

  // Package
  const pkg = {
    name,
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
    license: 'ISC',
    dependencies: {
      cors: '~2.8.5',
      express: '~4.17.1',
      'express-jwt': '~5.3.3',
      jsonwebtoken: '~8.5.1',
      mongoose: '~5.9.18'
    },
    devDependencies: {
      '@babel/cli': '~7.10.1',
      '@babel/core': '~7.10.2',
      '@babel/node': '~7.10.1',
      '@babel/preset-env': '~7.10.2',
      eslint: '~7.2.0',
      'eslint-config-standard': '~14.1.1',
      'eslint-plugin-import': '~2.20.2',
      'eslint-plugin-node': '~11.1.0',
      'eslint-plugin-promise': '~4.2.1',
      'eslint-plugin-standard': '~4.0.1',
      husky: '~4.2.5',
      nodemon: '~2.0.4',
      rimraf: '~3.0.2'
    }
  }
  // JavaScript
  const app = loadTemplate('app-index.js')
  const server = loadTemplate('main-index.js')
  const deploy = loadTemplate('deploy_sh')
  const deploySample = loadTemplate('deploy_sh')

  // App name
  server.locals.name = name
  deploySample.locals.mongoUrl = ''
  deploySample.locals.mongoDebug = ''
  deploySample.locals.nodeEnv = ''
  deploySample.locals.port = ''
  deploySample.locals.debug = ''
  deploy.locals.mongoUrl = 'mongodb://localhost:27017/test'
  deploy.locals.mongoDebug = 'enable'
  deploy.locals.nodeEnv = 'dev'
  deploy.locals.port = '3000'
  deploy.locals.debug = 'app:*'

  if (dir !== '.') {
    mkdir(dir, '.')
  }

  mkdir(dir, 'src')
  mkdir(dir, 'src/routes')
  copyTemplateMulti('routes', dir + '/src/routes', '*.js')
  mkdir(dir, 'src/models')
  copyTemplateMulti('models', dir + '/src/models', '*.js')
  mkdir(dir, 'src/controllers')
  copyTemplateMulti('controllers', dir + '/src/controllers', '*.js')
  mkdir(dir, 'src/config')
  copyTemplateMulti('config', dir + '/src/config', '*.js')
  mkdir(dir, 'src/constants')
  copyTemplateMulti('constants', dir + '/src/constants', '*.js')
  mkdir(dir, 'src/utils')
  copyTemplateMulti('utils', dir + '/src/utils', '*.js')

  copyTemplate('gitignore', path.join(dir, '.gitignore'))
  copyTemplate('eslintrc', path.join(dir, '.eslintrc.js'))
  copyTemplate('babelrc', path.join(dir, '.babelrc'))

  // sort dependencies like npm(1)
  pkg.dependencies = sortedObject(pkg.dependencies)
  pkg.devDependencies = sortedObject(pkg.devDependencies)

  // write files
  write(path.join(dir, 'src/index.js'), app.render())
  write(path.join(dir, 'package.json'), JSON.stringify(pkg, null, 2) + '\n')
  write(path.join(dir, 'index.js'), server.render(), MODE_0755)
  write(path.join(dir, 'deploy.sh'), deploy.render(), MODE_0755)
  write(path.join(dir, 'deploy_sh.sample'), deploySample.render(), MODE_0755)

  var prompt = launchedFromCmd() ? '>' : '$'

  if (dir !== '.') {
    console.log()
    console.log('   change directory:')
    console.log('     %s cd %s', prompt, dir)
  }

  console.log()
  console.log('   install dependencies:')
  console.log('     %s npm install', prompt)
  console.log()
  console.log('   run the app:')

  console.log('     %s bash deploy.sh', prompt)

  console.log()
}