// Treat this file as a module
export type {}

declare global {
  interface ReadableStream<R> {
    [Symbol.asyncIterator](): AsyncIterableIterator<R>
  }
}
