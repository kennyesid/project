# Install dependencies only when needed
FROM node:21-alpine3.17 AS deps
WORKDIR /app
COPY package.json ./
RUN apk add --no-cache make g++
RUN apk add --no-cache python3
RUN npm install -g node-gyp
RUN npm install --prod

# Production image
FROM node:21-alpine3.17
RUN apk update \
    && apk upgrade \
    && rm -rf /var/cache/apk/*

# Zona horaria La Paz para la imagen
ENV TZ America/La_Paz
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Ir a la carpeta de trabajo
WORKDIR /usr/src/app
COPY --from=deps /app/node_modules ./node_modules
COPY dataAccess ./dataAccess
COPY helpers ./helpers
COPY middlewares ./middlewares
COPY models ./models
COPY routes ./routes
COPY services ./services
COPY util ./util
COPY package.json ./
COPY index.js ./

RUN addgroup -S int-ps \
    && adduser -S int-ps -G int-ps
RUN chown -R int-ps:int-ps /usr/src/app
USER int-ps

# El comando con el cual se inicializara el contenedor
CMD ["node", "index.js"]