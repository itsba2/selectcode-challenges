# Use node version 18
FROM node:18

# Define working directory
WORKDIR /usr/src/app

# Make sure to get both package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Build
RUN npm run build

# Expose port
ARG PORT
EXPOSE ${PORT}

# Run
CMD ["node", "dist/main"]