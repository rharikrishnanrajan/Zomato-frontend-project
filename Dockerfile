# Stage 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package manifests from the React project
COPY my-react-app/package*.json ./

# Install dependencies cleanly
RUN npm ci

# Copy full application source
COPY my-react-app/ ./

# Build production bundle using Vite (outputs to dist/)
RUN npm run build

# Stage 2: Production Nginx Server (Lightweight, Secure & High Performance)
FROM nginx:alpine AS runner

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built production assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Custom Nginx configuration to support SPA client-side routing
RUN echo 'server {' \
         '    listen 80;' \
         '    server_name localhost;' \
         '    location / {' \
         '        root /usr/share/nginx/html;' \
         '        index index.html index.htm;' \
         '        try_files $uri $uri/ /index.html;' \
         '    }' \
         '    error_page 500 502 503 504 /50x.html;' \
         '    location = /50x.html {' \
         '        root /usr/share/nginx/html;' \
         '    }' \
         '}' > /etc/nginx/conf.d/default.conf

# Expose HTTP port
EXPOSE 80

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
