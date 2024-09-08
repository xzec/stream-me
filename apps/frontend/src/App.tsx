import { useEffect, useState } from 'react'
import type { FibonacciChunk } from './types'

function App() {
  const [fibonacci, setFibonacci] = useState<FibonacciChunk[]>([])

  useEffect(() => {
    fetch('http://localhost:3001/stream')
      .then((res) => {
        if (!(res.body instanceof ReadableStream)) throw Error('Response body is not a ReadableStream.')
        return res.body
      })
      .then(async (rs) => {
        const decoder = new TextDecoder()
        for await (const chunk of rs) {
          const decoded = decoder.decode(chunk)
          const parsed = JSON.parse(decoded)
          setFibonacci((prev) => [...prev, parsed])
        }
      })
  }, [])

  return (
    <main>
      <h1>Streamed Fibonacci sequence</h1>
      <section>
        {fibonacci.map(({ seq, data }) => (
          <span key={seq}>{data}</span>
        ))}
      </section>
    </main>
  )
}

export default App
