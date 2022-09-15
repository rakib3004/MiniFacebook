FROM nginx:alpine

WORKDIR /var/www/html

COPY ./../FrontEnd/dist/front-end .

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 100