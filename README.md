# stream-me

![Demonstration of the running app.](./showcase.gif)

## Overview

This repo contains a backend and frontend app. The frontend connects to an endpoint on the backend that streams the `Readable` implementation, line-by-line. It’s a simple setup but pretty fun to watch as the file content streams out in real time.

### Backend

Node.js Fastify app. A single `/stream` endpoint streams the actual content of the [readable.js](https://github.com/nodejs/readable-stream/blob/v4.5.2/lib/internal/streams/readable.js) file at a steady pace. Chunks of code are formatted with Prism.js.

### Frontend

Built with React, Vite, and some Framer Motion. Fetches data from the backend and displays the streamed content in real time.

## Try it out

```shell
docker compose up --build
```

👉 That’s it. Just a lightweight streaming demo. Enjoy!
