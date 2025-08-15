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
# postinstall script will run prisma generate
RUN npx prisma generate

# Copy rest of the source code
COPY src ./src
COPY tsconfig.json ./

# Build the application
RUN npm run build

# Expose port
EXPOSE 3001

# Start the application (just like local)
# CMD ["npm", "run", "dev"]

# Run migrations (or push schema) before starting the app
# If you have migrations, keep migrate deploy; if not, use db push
CMD npx prisma migrate deploy && npm run dev
# For dev/test DBs without migrations, replace with:
# CMD npx prisma db push && npm run dev
