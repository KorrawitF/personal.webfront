ARG NODE_VERSION=24.13.0-slim

FROM node:${NODE_VERSION} AS deps
WORKDIR /workspace
COPY package.json package-lock.json ./
RUN npm ci

FROM node:${NODE_VERSION} AS build
WORKDIR /workspace
COPY --from=deps /workspace/node_modules node_modules
COPY . .

RUN npm run build

FROM node:${NODE_VERSION}
WORKDIR /app

COPY --from=build --chown=node:node /workspace/.next/standalone ./
COPY --from=build --chown=node:node /workspace/.next/static ./.next/static
COPY --from=build /workspace/public ./public
USER node

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
EXPOSE 3000
ENTRYPOINT ["node", "server.js"]
