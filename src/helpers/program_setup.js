import { VERSION } from '../constants'

export const setupProgram = (program) => {
  around(program, 'optionMissingArgument', function (fn, args) {
    program.outputHelp()
    fn.apply(this, args)
    return { args: [], unknown: [] }
  })

  before(program, 'outputHelp', function () {
    // track if help was shown for unknown option
    this._helpShown = true
  })

  before(program, 'unknownOption', function () {
    // allow unknown options if help was shown, to prevent trailing error
    this._allowUnknownOption = this._helpShown

    // show help if not yet shown
    if (!this._helpShown) {
      program.outputHelp()
    }
  })

  program
    .name('create-rest-api')
    .version(VERSION, '    --version')
    .usage('[options] [dir]')
    .option('    --git', 'add .gitignore')
    .option('-f, --force', 'force on non-empty directory')
    .parse(process.argv)
}

/**
 * Install an around function; AOP.
 */

function around (obj, method, fn) {
  var old = obj[method]

  obj[method] = function () {
    var args = new Array(arguments.length)
    for (var i = 0; i < args.length; i++) args[i] = arguments[i]
    return fn.call(this, old, args)
  }
}

/**
 * Install a before function; AOP.
 */

function before (obj, method, fn) {
  var old = obj[method]

  obj[method] = function () {
    fn.call(this)
    old.apply(this, arguments)
  }
}
