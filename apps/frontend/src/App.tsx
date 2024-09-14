import { useEffect, useRef, useState } from 'react'
import Code from './components/Code'

function App() {
  const [code, setCode] = useState<string[]>([])
  const mounted = useRef(false)
  const codeRef = useRef<HTMLPreElement>(null)

  useEffect(() => {
    if (!mounted.current && import.meta.env.DEV) {
      mounted.current = true
      return
    }

    const controller = new AbortController()
    fetch('http://localhost:3001/stream', { signal: controller.signal })
      .then((res) => {
        if (!(res.body instanceof ReadableStream)) throw Error('Response body is not a ReadableStream.')
        return res.body
      })
      .then(async (rs) => {
        try {
          const stream = rs.pipeThrough(new TextDecoderStream())
          for await (const chunk of stream) {
            setCode((prev) => [...prev, chunk])
          }
        } catch (error) {
          console.error(error)
        }
      })
      .catch(console.error)

    return () => {
      controller.abort()
      setCode([])
    }
  }, [])

  return (
    <main>
      <h1>
        Streamed implementation of the Node.js{' '}
        <a href="https://github.com/nodejs/readable-stream/blob/main/lib/internal/streams/readable.js">Readable</a>.
        Kick back and relax.
      </h1>
      <Code ref={codeRef} code={code} />
    </main>
  )
}

export default App
