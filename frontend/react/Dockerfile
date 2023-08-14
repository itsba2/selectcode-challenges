# Use node version 18
FROM node:18

RUN mkdir /app

# Define working directory
WORKDIR /app

# Make sure to get both package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose port
EXPOSE 5173

# Run
CMD ["npm", "run", "dev"]