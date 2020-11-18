FROM nginx:alpine

COPY ./dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY .htpasswd /etc/nginx/.htpasswd

EXPOSE 80

CMD ["/bin/sh",  "-c",  "exec nginx -g 'daemon off;'"]

# docker build -t ownid-demo-app:latest .
# docker run --rm -it -p 80:80/tcp ownid-demo-app:latest
