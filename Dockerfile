# Step 1: Use the official Node.js image as a base image
FROM node:16

# Step 2: Set the working directory in the container/ effectively work as pwd for the application
WORKDIR /usr/src/app

# Step 3: Copy the package.json and package-lock.json to install dependencies also tsconfig.json
COPY package*.json ./
COPY tsconfig.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the entire backend codebase to the working directory in the container
COPY . .

# Step 6: Expose the port the backend is running on 
EXPOSE 5000

# Step 5: Build the TypeScript code
RUN npm run build

# Step 7: Start the backend application
CMD ["npm", "start"]

# 1. Optimizing Docker Images
# Goal: To reduce the build time and image size of your Docker containers, making them faster to deploy, easier to update, and more efficient to run.
#
# Multi-Stage Builds: This is a Docker feature that allows you to use multiple stages in a single Dockerfile. It’s especially useful for building applications because you can separate the build process from the final deployment stage, significantly reducing the size of the final image.
#
# Example in a Node.js App:
#
# In the first stage, install dependencies and build the app.
# In the final stage, only include the compiled code and necessary runtime dependencies.
# This avoids the need to install tools like npm in the final image, keeping it lightweight.
# Here’s an example:
#
# dockerfile
# Copy code
# # First stage: Build the app
# FROM node:18 AS builder
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build
#
# # Second stage: Run the app
# FROM node:18-slim
# WORKDIR /app
# COPY --from=builder /app/dist ./dist
# COPY package*.json ./
# RUN npm install --only=production
# CMD ["node", "./dist/index.js"]
# In this example, only the dist folder and production dependencies make it to the final image, so it’s much smaller.
#
# Reducing Layers and Image Size:
#
# Use a slim or alpine base image (e.g., node:18-slim or node:18-alpine).
# Remove unnecessary files and dependencies to avoid bloat.
# Combine commands where possible to reduce the number of Docker image layers, as each layer adds size.
# Benefits: Smaller, faster images mean your containers start up faster and use less memory and disk space. It’s particularly valuable in production where server resources and costs are a concern.
