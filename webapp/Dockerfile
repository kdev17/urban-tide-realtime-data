FROM node:7
WORKDIR /src
RUN mkdir -p /src
ADD src /src
RUN npm install
COPY src/. /src
CMD node app.js
EXPOSE 3000