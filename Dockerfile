FROM nginx:latest

# Copy over static assets from the client application
COPY ./dist /usr/share/nginx/html
COPY default.conf /etc/nginx/sites-enabled/default
COPY default.conf /etc/nginx/conf.d/default.conf
