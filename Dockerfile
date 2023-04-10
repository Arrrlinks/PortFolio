FROM nginx:latest
COPY . /usr/share/nginx/html
# Exposez le port 80 pour le trafic HTTP
EXPOSE 80
