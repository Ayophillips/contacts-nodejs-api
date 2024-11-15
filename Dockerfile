FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./

# Development stage
FROM base AS development
RUN npm install
COPY . .
ENV NODE_ENV=development
CMD ["nodemon", "server.js"]  # Adjust if your entry point is different

# Production stage
FROM base AS production
RUN npm install --only=production
COPY . .
ENV NODE_ENV=production
CMD ["npm", "start"]
