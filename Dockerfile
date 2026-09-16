FROM node:22-alpine AS deps
WORKDIR /workspace
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS build
WORKDIR /workspace
COPY --from=deps /workspace/node_modules node_modules
COPY . .

RUN npm run build

FROM node:22-alpine
RUN addgroup -S app && adduser -S app -G app
WORKDIR /app

COPY --from=build /workspace/.next/standalone ./
COPY --from=build /workspace/.next/static ./.next/static
COPY --from=build /workspace/public ./public
USER app

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
EXPOSE 3000
ENTRYPOINT ["node", "server.js"]
