import path from 'path'
import sortedObject from 'sorted-object'

import { MODE_0755, PKG_DEFAULT, DEPENDENCIES, USE_OPTIONS } from '../constants'
import { copyTemplate, copyTemplateMulti, Template, write, mkdir, launchedFromCmd } from './index'

/**
 * Create application at the given directory.
 *
 * @param {string} name
 * @param {string} dir
 */
export function createApplication (name, dir, config = []) {
  console.log()

  // Package
  const pkg = { ...PKG_DEFAULT }
  pkg.name = name

  const optionalDeps = config.reduce((prev, curr) => ({ ...prev, ...DEPENDENCIES[curr] }), {})
  pkg.dependencies = { ...pkg.dependencies, ...optionalDeps }
  const useEnv = config.includes(USE_OPTIONS.dotenv)
  const useCors = config.includes(USE_OPTIONS.cors)
  const useJwt = config.includes(USE_OPTIONS.jwt)
  const useMongoose = config.includes(USE_OPTIONS.mongoose)

  const sampleVal = { mongoUrl: '', mongoDebug: '', nodeEnv: '', port: '', debug: '' }
  const setVal = { mongoUrl: 'mongodb://localhost:27017/test', mongoDebug: 'enable', nodeEnv: 'dev', port: '3000', debug: 'app:*' }
  const app = new Template('app-index.js', { useCors, useJwt, useMongoose })
  const server = new Template('main-index.js', { useEnv, useMongoose, name })
  const deploy = new Template('deploy_sh', { useEnv, useCors, useJwt, useMongoose, ...setVal })
  const deploySample = new Template('deploy_sh', { useEnv, useCors, useJwt, useMongoose, ...sampleVal })
  const configIndex = new Template('config/index.js', { useJwt, useMongoose })
  const configEnv = new Template('config/environment.js', { useCors, useJwt, useMongoose })

  if (dir !== '.') {
    mkdir(dir, '.')
  }

  createDirectoryStructure(dir)
  if (useJwt) {
    copyTemplate('config/auth_helper.ejs', path.join(dir, 'src/config/auth_helper.js'))
  }
  if (useJwt) {
    copyTemplate('config/connect_mongo.ejs', path.join(dir, 'src/config/connect_mongo.js'))
  }

  // sort dependencies like npm(1)
  pkg.dependencies = sortedObject(pkg.dependencies)
  pkg.devDependencies = sortedObject(pkg.devDependencies)

  // write files
  write(path.join(dir, 'src/config/index.js'), configIndex.render())
  write(path.join(dir, 'src/config/environment.js'), configEnv.render())
  write(path.join(dir, 'src/index.js'), app.render())
  write(path.join(dir, 'package.json'), JSON.stringify(pkg, null, 2) + '\n')
  write(path.join(dir, 'index.js'), server.render(), MODE_0755)
  write(path.join(dir, useEnv ? '.env' : 'deploy.sh'), deploy.render(), MODE_0755)
  write(path.join(dir, useEnv ? '.env.sample' : 'deploy_sh.sample'), deploySample.render(), MODE_0755)

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

  if (useEnv) {
    console.log('     %s npm run dev', prompt)
  } else {
    console.log('     %s bash deploy.sh', prompt)
  }

  console.log()
}

/**
 * Create an app name from a directory path, fitting npm naming requirements.
 *
 * @param {String} pathName
 */
export function createAppName (pathName) {
  return path.basename(pathName)
    .replace(/[^A-Za-z0-9.-]+/g, '-')
    .replace(/^[-_.]+|-+$/g, '')
    .toLowerCase()
}

const createDirectoryStructure = (dir) => {
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
}
