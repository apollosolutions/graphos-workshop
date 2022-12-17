FROM node:19-buster-slim
ENV PORT 3200
ARG SUBGRAPH_DIR

WORKDIR /app

COPY ${SUBGRAPH_DIR} /app/

RUN npm install

EXPOSE ${PORT}
CMD [ "npm", "start" ]
