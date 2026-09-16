ARG NODE_VERSION=24.13.0-slim

FROM node:${NODE_VERSION} AS dependencies
WORKDIR /workspace
COPY package.json package-lock.json ./
RUN npm ci

FROM node:node:${NODE_VERSION} AS build
WORKDIR /workspace
COPY --from=deps /workspace/node_modules node_modules
COPY . .

RUN npm run build

FROM node:node:${NODE_VERSION}
RUN addgroup -S app && adduser -S app -G app
WORKDIR /app

COPY --from=build --chown=app:app /workspace/.next/standalone ./
COPY --from=build /workspace/.next/static ./.next/static
COPY --from=build /workspace/public ./public
USER app

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
EXPOSE 3000
ENTRYPOINT ["node", "server.js"]
