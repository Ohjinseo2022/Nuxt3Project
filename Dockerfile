FROM node:16-alpine as build-stage
ARG profile=build
WORKDIR /app
COPY package*.json ./
COPY package-lock*.json ./
# COPY ["package.json", "package-lock.json*"] ./
RUN npm config set "strict-ssl" false -g
ENV GENERATE_SOURCEMAP=false
ENV NODE_OPTIONS=--max-old-space-size=16384
# RUN apk add --update python3 make g++
RUN npm cache clean --force
RUN npm install --legacy-peer-deps
# RUN npm install --legacy-peer-deps
COPY . .
RUN npx kendo-ui-license activate
RUN npm run $profile
ENV HOST 0.0.0.0
EXPOSE 3000
ENTRYPOINT ["node", ".output/server/index.mjs"]
