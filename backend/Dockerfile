# Use slim Node base image
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm install

# Copy project files including .env
COPY . .

# Build TypeScript
RUN npm run build

# Expose backend port
EXPOSE 3001

# Run the app
CMD ["node", "dist/app.js"]
