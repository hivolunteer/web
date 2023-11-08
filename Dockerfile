FROM node:21-alpine3.17

# Create and set /app as current directory
WORKDIR /app

# Copy source code in container /app dir from repository
COPY tsconfig.json /app/
COPY public/ /app/public
COPY src/ /app/src
COPY package.json /app/
COPY assets/ /app/assets

# Install server dependencies
RUN npm install --force

# Disable host check, required to run
ENV DANGEROUSLY_DISABLE_HOST_CHECK true

# And finally run server
CMD ["npm", "start"]
