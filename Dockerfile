FROM node:12-slim
WORKDIR /app
COPY package* ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "run", "start:prod"]
