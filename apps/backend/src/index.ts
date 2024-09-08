import { Readable, Transform } from 'node:stream'
import Fastify from 'fastify'
import { fibonacci } from './utils/fibonacci'

const fastify = Fastify({
  logger: true,
})

fastify.get('/stream', (_request, reply) => {
  const source = Readable.from(fibonacci(500))
  const format = new Transform({
    transform: (chunk, _encoding, callback) => {
      let i = 0
      callback(
        null,
        JSON.stringify({
          seq: ++i,
          data: String(chunk),
          ts: new Date().toISOString(),
        }),
      )
    },
  })

  const result = source.pipe(format)

  result.on('data', (chunk) => fastify.log.info(String(chunk)))
  result.once('close', () => fastify.log.info('Stream closed.'))

  reply.header('Access-Control-Allow-Origin', '*')
  reply.header('Content-Type', 'application/octet-stream')
  reply.send(result)
})

try {
  await fastify.listen({ port: 3001 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
