import { spawn } from 'child_process'

export const exec = (
  cmd: string,
): Promise<{
  stdout: string
  stderr: string
  code: number
}> =>
  new Promise((resolve) => {
    const [prog, ...args] = cmd.split(' ')
    const proc = spawn(prog, args)

    const result = {
      stdout: '',
      stderr: '',
      code: null,
    }

    proc.stdout.on('data', (data) => (result.stdout += data.toString()))
    proc.stderr.on('data', (data) => (result.stderr += data.toString()))

    proc.on('close', (code) =>
      resolve({
        ...result,
        code,
      }),
    )
  })
