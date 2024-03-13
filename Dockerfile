FROM node:20-alpine

WORKDIR /usr/app
RUN mkdir -p /usr/app/uploads \
    && chown -R node:node /usr/app/uploads

COPY package*.json ./

RUN npm install --omit=dev

COPY src/ ./src

# USER node
ENV HTTP_HOST=0.0.0.0
EXPOSE 3000
VOLUME [ "/usr/app/uploads" ]

CMD ["node", "src/index.js"]
