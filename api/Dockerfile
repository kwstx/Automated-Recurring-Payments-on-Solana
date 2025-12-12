FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

# Expose port (default 4000)
EXPOSE 4000

# Environment variables should be passed via docker-compose or .env
CMD ["npm", "start"]
