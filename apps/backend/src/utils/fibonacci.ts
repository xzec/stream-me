import { setTimeout } from 'node:timers/promises'

export async function* fibonacci(frequencyMs = 200) {
  let a = 0n
  let b = 1n

  while (true) {
    yield String(a)
    b = a + b
    a = b - a

    await setTimeout(frequencyMs)
  }
}
