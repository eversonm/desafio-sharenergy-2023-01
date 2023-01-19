FROM node:16-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json /app
COPY package-lock.json /app

# RUN mkdir -p /app/node_modules
# RUN chown -R node:node /app/node_modules
RUN npm install
# RUN npm config set unsafe-perm true

# RUN npm install --force
# If you are building your code for production
# RUN npm ci --only=production
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

# Bundle app source
# COPY . /app
COPY . .

# RUN chown -R node:node /app/node_modules

# USER node

EXPOSE 3000
CMD npm start
