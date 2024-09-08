export async function* fibonacci(frequencyMs = 500) {
  let a = 0n
  let b = 1n
  while (true) {
    yield new Promise((resolve) => setTimeout(() => resolve(String(b)), frequencyMs))
    b = a + b
    a = b - a
  }
}
