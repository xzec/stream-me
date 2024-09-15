import { useEffect, useRef, useState } from 'react'

const useLineCodeStream = () => {
  const [linesOfCode, setLinesOfCode] = useState<string[]>([])
  const mounted = useRef(false)

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
            setLinesOfCode((prev) => [...prev, chunk])
          }
        } catch (error) {
          console.error(error)
        }
      })
      .catch(console.error)

    return () => {
      controller.abort()
      setLinesOfCode([])
    }
  }, [])

  return linesOfCode
}

export default useLineCodeStream
