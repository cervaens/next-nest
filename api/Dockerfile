FROM node:18

WORKDIR /app
ADD package.json /app/package.json
RUN npm install
ADD . /app
EXPOSE 3001

RUN npm run test
CMD ["npm", "run", "start"]