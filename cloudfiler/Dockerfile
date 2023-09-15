FROM node:16.14.2

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install -g @angular/cli@12.2.18 
RUN npm install -g @angular-devkit/build-angular@12.2.6  --force
RUN npm install

# add app
COPY . /app

# start app
CMD ng serve --host 0.0.0.0 --port 4200