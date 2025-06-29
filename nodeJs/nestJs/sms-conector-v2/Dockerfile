# Install dependencies only when needed
FROM node:lts-alpine AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json ./
RUN npm install --frozen-lockfile

# Build the app with cache dependencies
FROM node:lts-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build


# Production image, copy all the files and run next
FROM node:lts-alpine AS runner

# Set working directory
WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --prod

COPY --from=builder /app/dist ./dist
USER node
EXPOSE 3000

CMD [ "node","dist/main" ]
