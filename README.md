# Relay Chat

Real-time team chat service built with Node.js, Express, Socket.IO, and TypeScript.

## Features

- Room-based messaging with server-side validation
- REST endpoint for recent message history
- Socket events for join, message, and presence updates
- TypeScript-first codebase, Docker support, and test-ready structure

## Run locally

```bash
npm install
npm run dev
```

Connect a Socket.IO client and emit `room:join` with `{ "room": "general", "name": "Ammar" }`, then `message:send` with `{ "room": "general", "body": "Hello" }`.

## Stack

Node.js · Express · Socket.IO · TypeScript · Vitest

## License

MIT
