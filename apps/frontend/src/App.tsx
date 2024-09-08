import { useEffect, useRef, useState } from 'react'
import Item from './components/Item'
import type { FibonacciChunk } from './types'

function App() {
  const [fibonacci, setFibonacci] = useState<FibonacciChunk[]>([])
  const mounted = useRef(false)

  useEffect(function fetchFibonacci() {
    if (!mounted.current) {
      mounted.current = true
      return
    }

    fetch('http://localhost:3001/stream')
      .then((res) => {
        if (!(res.body instanceof ReadableStream)) throw Error('Response body is not a ReadableStream.')
        return res.body
      })
      .then(async (rs) => {
        const decoder = new TextDecoder()
        for await (const chunk of rs) {
          const decoded = decoder.decode(chunk)
          try {
            const parsed = JSON.parse(decoded)
            setFibonacci((prev) => [...prev, parsed])
          } catch (error) {
            console.error('JSON.parse failed:', error)
          }
        }
      })
  }, [])

  return (
    <main>
      <h1>Streamed Fibonacci sequence</h1>
      <section>
        {fibonacci.map(({ seq, data }) => (
          <Item key={seq}>{data}</Item>
        ))}
      </section>
    </main>
  )
}

export default App
