FROM node:19.1.0-alpine AS builder

WORKDIR /app

COPY ./client/package.json ./
COPY ./client/package-lock.json ./
RUN npm install --force

COPY ./client ./
RUN npm run build

# Bundle static assets with nginx
FROM nginx:1.23.2-alpine AS production
ENV NODE_ENV production
# Copy built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
# Add your nginx.conf
COPY ./client/nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]