import Autoscroll from '~/components/Autoscroll'
import Code from '~/components/Code'
import useLineCodeStream from '~/hooks/useLineCodeStream'

function App() {
  const code = useLineCodeStream()

  return (
    <main>
      <h1>
        Streamed implementation of the Node.js{' '}
        <a
          href="https://github.com/nodejs/readable-stream/blob/v4.5.2/lib/internal/streams/readable.js"
          target="_blank"
          rel="noopener noreferrer"
        >
          Readable
        </a>
        . Kick back and relax 😏
      </h1>
      <Code code={code} />
      <Autoscroll code={code} />
    </main>
  )
}

export default App
