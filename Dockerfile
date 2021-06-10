FROM node:lts-alpine

ENV NODE_PATH "/usr/local/lib/node_modules"

ENV NODE_ENV "production"

ENV MQTT_HOST ""

ENV MQTT_TOPIC ""

ADD . /app

WORKDIR /app

RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        libc-dev \
        g++ \
        hidapi \
        libusb-dev \
        eudev-dev \
        linux-headers \
        && yarn install \
        && yarn add mqtt \
        && apk del .gyp \
        && apk add --no-cache eudev libusb

CMD ["node", "mqtt.js"]

LABEL org.label-schema.name="Docker dcled" \
      org.label-schema.vcs-ref=${VCS_REF} \
      org.label-schema.build-date=${BUILD_DATE} \
      org.label-schema.vcs-url="https://github.com/b2un0/node-dcled" \
      org.label-schema.schema-version="1.0"

