# base image node11
FROM node:11

# env parameters
ENV PROJECT_ENV production
ENV NODE_ENV production

# install nginx
RUN apt-get update && apt-get install -y nginx

# copy package.json package-lock.json to /app folder
# for reuse npm install cash
COPY package*.json /app/


WORKDIR /app

# npm install
RUN npm install 

# copy src to /app
COPY . /app

# build
RUN npm run build

# copy config nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# start nginx，daemon off because docker need run after start
CMD ["nginx", "-g", "daemon off;"]