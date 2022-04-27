FROM node:14-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm install -g live-server
RUN npm run build
CMD [ "live-server","build" ]