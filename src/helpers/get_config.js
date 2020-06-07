import readline from 'readline'
import { exit, createApplication } from './index'
import { ASSERTION } from '../constants'

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
  if (useDefault) {
    process.stdin.destroy()
    return createApplication(appName, destinationPath, {})
  }
  const useCors = await getInput('Do you want to configure cors? [y/N] ').then(response => ASSERTION.test(response))
  const useJwt = await getInput('Do you want to use jwt for authentication? [y/N] ').then(response => ASSERTION.test(response))
  const useMongoose = await getInput('Do you want to use mongoose? [y/N] ').then(response => ASSERTION.test(response))
  const useEnv = await getInput('Do you want to use the dotenv for environment variable \n (By default a deploy.sh file will be created)? [y/N] ').then(response => ASSERTION.test(response))
  process.stdin.destroy()
  return createApplication(appName, destinationPath, { useEnv, useCors, useJwt, useMongoose })
}

const getInput = (msg) => new Promise((resolve, reject) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.question(msg, function (input) {
    rl.close()
    resolve(input)
  })
})
