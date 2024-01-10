# Use an official Node runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the local code to the container
COPY . .

# Build the production-ready application
RUN npm run build

# Expose port 3000 to the outside world
EXPOSE 3000

# Define environment variable to skip prompt during build
ENV CI=true

# Command to run the application
CMD ["npm", "start"]
