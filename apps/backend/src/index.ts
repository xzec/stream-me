import { Readable } from 'node:stream'
import Fastify from 'fastify'
import { fibonacci } from './utils/fibonacci'

const fastify = Fastify({
  logger: true,
})

fastify.get('/stream', (_request, reply) => {
  const stream = Readable.from(fibonacci())

  stream.on('data', (chunk) => fastify.log.info(chunk))
  stream.once('close', () => fastify.log.info('Stream closed.'))

  reply.header('Content-Type', 'application/octet-stream').send(stream)
})

try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
