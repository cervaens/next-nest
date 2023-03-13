FROM node:18-alpine

WORKDIR /app
ADD package.json /app/package.json
RUN npm install
ADD . /app
EXPOSE 3001

CMD ["npm", "run", "start"]