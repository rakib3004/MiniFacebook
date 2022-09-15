FROM nginx:alpine

WORKDIR /var/www/html

COPY ../FrontEnd/dist .

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 100