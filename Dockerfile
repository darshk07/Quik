# Stage 1: Build the Vite project
FROM node:14-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the built files using NGINX
FROM nginx:alpine

# Remove the default NGINX configuration
RUN rm -rf /etc/nginx/conf.d/*

# Copy the built files from the previous stage to the NGINX HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy a custom NGINX configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port that the NGINX server will run on
EXPOSE 80

# Start the NGINX server
CMD ["nginx", "-g", "daemon off;"]
