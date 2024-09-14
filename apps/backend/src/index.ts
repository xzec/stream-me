import { createReadStream } from 'node:fs'
import { PassThrough, type Readable } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { setImmediate, setTimeout } from 'node:timers/promises'
import Fastify from 'fastify'
import { highlight, languages } from 'prismjs'

const fastify = Fastify({
  logger: true,
})

fastify.get('/stream', (_request, reply) => {
  const source = createReadStream('./src/assets/readable-implementation.txt')
  const lineByLine = async function* (source: Readable) {
    for await (const chunk of source) {
      const text = String(chunk)
      for (const rawLine of text.split('\n')) {
        const line = highlight(`${rawLine}\n`, languages.js, 'js')
        yield line
        if (line === '\n') {
          await setImmediate()
          continue
        }
        await setTimeout(1000)
      }
    }
  }
  const pt = new PassThrough()

  pt.on('data', (chunk) => console.log('[DATA]', String(chunk)))
  pt.on('error', (err) => console.error('[ERROR]', err))
  void pipeline(source, lineByLine, pt).catch((err) => console.error('[ERROR]', err))

  reply.header('Access-Control-Allow-Origin', '*')
  reply.header('Content-Type', 'application/octet-stream')
  reply.send(pt)
})

try {
  await fastify.listen({ port: 3001 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
