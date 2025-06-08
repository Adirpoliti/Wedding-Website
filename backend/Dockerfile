# Use slim Node base image
FROM node:18-slim

# Set working directory inside container
WORKDIR /app

# Copy only package files first (cache benefit)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the full project
COPY . .

# Build TypeScript
RUN npm run build

# Expose the backend port
EXPOSE 3001

# Run the app
CMD ["node", "dist/app.js"]
