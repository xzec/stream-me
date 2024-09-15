import Code from '~/components/Code'
import useLineCodeStream from '~/hooks/useLineCodeStream'

function App() {
  const code = useLineCodeStream()

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
