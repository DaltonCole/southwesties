FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

# Run as the built-in non-root node user (uid 1000) so generated files
# are owned by the host user when the project dir is volume-mounted.
USER node

CMD ["npm", "run", "start"]
