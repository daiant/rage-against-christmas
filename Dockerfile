FROM node:24.11.0-slim

ENV NODE_ENV=production

WORKDIR /app
COPY . /app/

RUN npm ci --only=production

# CMD ["node", "--watch", "server.js"]