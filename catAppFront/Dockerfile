FROM node:14-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g live-server
COPY . .
RUN npm run build
CMD [ "live-server","build" ]


