# Use Node image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the app
COPY . .

# Expose port
EXPOSE 3000

# Start the app
CMD ["node", "index.js"]

