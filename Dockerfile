FROM node:18.17.1

WORKDIR /dockerbuild

COPY package.json package.json

RUN yarn

COPY . .

RUN yarn build
CMD yarn start
