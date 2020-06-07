import fs from 'fs'
import ejs from 'ejs'
import path from 'path'
import util from 'util'
import mkdirp from 'mkdirp'
import minimatch from 'minimatch'
import { TEMPLATE_DIR, MODE_0755, MODE_0666 } from '../constants'
/**
 * Check if the given directory `dir` is empty.
 *
 * @param {String} dir
 */

export const emptyDirectory = dir => new Promise((resolve, reject) => {
  fs.readdir(dir, function (err, files) {
    if (err && err.code !== 'ENOENT') return reject(err)
    resolve(!files || !files.length)
  })
})

/**
 * Copy file from template directory.
 */

export function copyTemplate (from, to) {
  write(to, fs.readFileSync(path.join(TEMPLATE_DIR, from), 'utf-8'))
}

/**
 * Copy multiple files from template directory.
 */

export function copyTemplateMulti (fromDir, toDir, nameGlob) {
  fs.readdirSync(path.join(TEMPLATE_DIR, fromDir))
    .filter(minimatch.filter(nameGlob, { matchBase: true }))
    .forEach(function (name) {
      copyTemplate(path.join(fromDir, name), path.join(toDir, name))
    })
}

/**
 * Load template file.
 */

export function Template (name, initObj = {}) {
  const contents = fs.readFileSync(path.join(TEMPLATE_DIR, (name + '.ejs')), 'utf-8')
  this.locals = initObj
  this.render = function () {
    return ejs.render(contents, this.locals, {
      escape: util.inspect
    })
  }
  return this
}

/**
 * Make the given dir relative to base.
 *
 * @param {string} base
 * @param {string} dir
 */

export function mkdir (base, dir) {
  var loc = path.join(base, dir)

  console.log('   \x1b[36mcreate\x1b[0m : ' + loc + path.sep)
  mkdirp.sync(loc, MODE_0755)
}

/**
 * echo str > file.
 *
 * @param {String} file
 * @param {String} str
 */

export function write (file, str, mode) {
  fs.writeFileSync(file, str, { mode: mode || MODE_0666 })
  console.log('   \x1b[36mcreate\x1b[0m : ' + file)
}
