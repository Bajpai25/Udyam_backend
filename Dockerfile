FROM node:18

# Set working directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

COPY prisma ./prisma

# Copy environment file if it exists (needed for prisma generate)
COPY .env* ./

# Install all dependencies (postinstall will now work since prisma schema exists)
RUN npm install

# Copy rest of the source code
COPY src ./src
COPY tsconfig.json ./

# Build the application
RUN npm run build

# Expose port
EXPOSE 3001

# Start the application (just like local)
CMD ["npm", "run", "dev"]
