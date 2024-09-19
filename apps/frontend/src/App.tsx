import Autoscroll from '~/components/Autoscroll'
import Code from '~/components/Code'
import useLineCodeStream from '~/hooks/useLineCodeStream'

function App() {
  const code = useLineCodeStream()

  return (
    <main>
      <h1>
        A Line-by-line streamed implementation of the Node.js{' '}
        <a
          href="https://github.com/nodejs/readable-stream/blob/main/lib/internal/streams/readable.js"
          target="_blank"
          rel="noopener noreferrer"
        >
          Readable
        </a>
        .<br />
        Kick back and relax.
      </h1>
      <Code code={code} />
      <Autoscroll code={code} />
    </main>
  )
}

export default App
