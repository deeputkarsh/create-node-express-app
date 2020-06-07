#!/usr/bin/env node

import path from 'path'
import program from 'commander'

import { setupProgram, exit, emptyDirectory, createAppName, startInteractivePrompt } from './helpers'

setupProgram(program)

if (!exit.exited) {
  main()
}

/**
 * Main program.
 */

async function main () {
  // Path
  const destinationPath = program.args.shift() || '.'

  // App name
  const appName = createAppName(path.resolve(destinationPath)) || 'hello-world'

  // Generate application
  startInteractivePrompt(appName, destinationPath, program.force || await emptyDirectory(destinationPath))
}
