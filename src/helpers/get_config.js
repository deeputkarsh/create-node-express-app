import readline from 'readline'
import { exit, createApplication } from './index'
import { ASSERTION, USE_OPTIONS } from '../constants'

export async function startInteractivePrompt (appName, destinationPath, isDirEmpty) {
  if (!isDirEmpty) {
    const abort = await getInput('Destination is not empty, continue? [y/N] ').then(response => !ASSERTION.test(response))
    if (abort) {
      console.error('aborting')
      process.stdin.destroy()
      return exit(1)
    }
  }

  const useDefault = await getInput('Do you want to use the default config? [y/N] ').then(response => ASSERTION.test(response))
  const config = []

  if (!useDefault) {
    await getInput('Do you want to configure cors? [y/N] ')
      .then(response => ASSERTION.test(response) && config.push(USE_OPTIONS.cors))

    await getInput('Do you want to use jwt for authentication? [y/N] ')
      .then(response => ASSERTION.test(response) && config.push(USE_OPTIONS.jwt))

    await getInput('Do you want to use mongoose? [y/N] ')
      .then(response => ASSERTION.test(response) && config.push(USE_OPTIONS.mongoose))

    await getInput('Do you want to use the dotenv for environment variable \n    (By default a deploy.sh file will be created)? [y/N] ')
      .then(response => ASSERTION.test(response) && config.push(USE_OPTIONS.dotenv))
  }

  process.stdin.destroy()
  return createApplication(appName, destinationPath, config)
}

const getInput = (msg) => new Promise((resolve, reject) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  console.log()
  rl.question('   ' + msg, function (input) {
    rl.close()
    resolve(input)
    console.log()
  })
})
