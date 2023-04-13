FROM php:7.4-apache
COPY . /usr/share/nginx/html
# Exposez le port 80 pour le trafic HTTP
EXPOSE 80
