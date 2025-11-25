# Dockerfile for Website Builder Agent
FROM node:18-alpine

WORKDIR /app

# Install build dependencies
COPY package.json package-lock.json* ./
RUN npm ci --only=production || npm install --only=production

# Copy source
COPY . .

# Build TypeScript and CSS
RUN npm run build

EXPOSE 3000

# Run the compiled output
CMD ["node", "dist/index.js"]
