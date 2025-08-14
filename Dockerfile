FROM node:18

# Set working directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install all dependencies (including dev dependencies)
RUN npm install

# Copy prisma directory first (important for schema detection)
COPY prisma ./prisma

# Copy environment file if it exists
COPY .env* ./

# Generate Prisma client (now that schema is available)
RUN npx prisma generate

# Copy rest of the source code
COPY src ./src
COPY tsconfig.json ./

# Build the application
RUN npm run build

# Expose port
EXPOSE 3001

# Start the application (just like local)
CMD ["npm", "run", "dev"]
