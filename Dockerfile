FROM node:22-alpine AS deps
WORKDIR /workspace
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS build
WORKDIR /workspace
COPY --from=deps /workspace/node_modules node_modules
COPY . .

ARG NEXT_PUBLIC_OWNER_NAME
ARG NEXT_PUBLIC_SITE_NAME
ARG NEXT_PUBLIC_SITE_BRAND
ARG NEXT_PUBLIC_SITE_TITLE_TEMPLATE
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_SITE_LOCALE
ENV NEXT_PUBLIC_OWNER_NAME=$NEXT_PUBLIC_OWNER_NAME \
    NEXT_PUBLIC_SITE_NAME=$NEXT_PUBLIC_SITE_NAME \
    NEXT_PUBLIC_SITE_BRAND=$NEXT_PUBLIC_SITE_BRAND \
    NEXT_PUBLIC_SITE_TITLE_TEMPLATE=$NEXT_PUBLIC_SITE_TITLE_TEMPLATE \
    NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_SITE_LOCALE=$NEXT_PUBLIC_SITE_LOCALE

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
