# Dockerfile for deploy to heroku
FROM node

ENV NPM_CONFIG_LOGLEVEL warn
ARG app_env
ENV APP_ENV $app_env

WORKDIR /

COPY . .
RUN npm install
RUN npm run build
COPY ./dist /app

RUN npm install -g serve
WORKDIR /app
RUN yarn global add serve

RUN useradd -d /app -m app
USER app

EXPOSE $PORT

CMD exec serve -p $PORT -s .
