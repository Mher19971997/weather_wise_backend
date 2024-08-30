# Use Node.js v14 as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

# Copy the rest of the application code
COPY . .

# Install dependencies
RUN pnpm install

# Build the NestJS application
RUN pnpm run build

# Expose port 6001
EXPOSE 6001

# Command to run the application
COPY entrypoint.sh ./
RUN chmod +x ./entrypoint.sh
RUN [ -f ./entrypoint.sh ] && chmod +x ./entrypoint.sh || true

# Define the entrypoint, ensure entrypoint.sh exists
ENTRYPOINT ["./entrypoint.sh"]