FROM node:22-alpine

WORKDIR /app

# Install git and other useful dev tools
RUN apk add --no-cache git

# Set up non-root user (node user already exists in node:alpine)
USER node
