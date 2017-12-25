## Setup the Application container

# node current LTS image 
FROM node:8

# create working directory
WORKDIR /app

# copy package.json file to app directory
COPY package.json /app

# install dependencies
RUN npm install

#
COPY . /app

# app port exposed
EXPOSE 8108

# start the app
#CMD ["npm", "start"]
CMD node server.js

# ENTRYPOINT ["node" ]