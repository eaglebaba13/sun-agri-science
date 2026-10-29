# Stage 1: Build
FROM oven/bun:1.2-alpine AS builder

ARG VITE_BACKEND_URL=https://api.sunagriscience.in
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

# Ensure /app/dist exists with index.html for nginx SPA
RUN if [ -d ".output/public" ] && [ ! -f "dist/index.html" ]; then \
      mkdir -p dist && cp -r .output/public/* dist/ && \
      if [ -f "dist/_shell.html" ]; then cp dist/_shell.html dist/index.html; fi; \
    fi

# Stage 2: Serve with Nginx
FROM nginx:alpine AS runner

RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
