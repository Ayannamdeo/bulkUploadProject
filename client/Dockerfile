# Step 1: Use Node.js for the build stage
FROM node:18 AS build

# Step 2: Set up working directory
WORKDIR /usr/src/app

# Step 3: Install dependencies and build the frontend
COPY package*.json ./
COPY postcss.config.js ./
COPY tailwind.config.js ./
COPY vite.config.js ./
# Add this line to pass the environment variable
# ARG VITE_API_URL  
# Set the ENV variable in the Docker environment
# ENV VITE_API_URL=$VITE_API_URL  

RUN npm install
COPY . .
# Set VITE_API_URL here directly
ENV VITE_API_URL=https://gridify-server-68022144782.asia-south2.run.app/api

RUN npm run build

# Step 4: Use a lightweight Node.js server to serve the static build
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "8080"]
# CMD ["npm", "run", "dev"]

# Step 5: Expose port 3000
EXPOSE 8080
