# Use an official Node.js runtime as the base image
FROM node:18
# Set the working directory in the container
WORKDIR /app
# Copy package.json and package-lock.json to the container
COPY package*.json ./
# Install application dependencies
RUN npm install
# Copy the rest of the application code
COPY . .
# Expose the port the app runs on
EXPOSE 8125

# Specify the command to run your application
CMD ["node", "server.js"]