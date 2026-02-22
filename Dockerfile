# Use official Node image
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon

# Copy source code (without .env)
COPY . .

# Generate Prisma client (requires DATABASE_URL at runtime via env)
RUN npx prisma generate

EXPOSE 5000

# Start the app
CMD ["npm", "start"]