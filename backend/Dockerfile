FROM node:18-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

# Install TypeScript in case it's not installed globally
RUN npm install -g typescript

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["node", "dist/app.js"]
