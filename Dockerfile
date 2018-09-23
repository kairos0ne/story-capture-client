FROM nginx

# Copy over static assets from the client application
COPY ./dist /usr/share/nginx/html