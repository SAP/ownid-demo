FROM nginx:alpine

COPY ./dist /usr/share/nginx/html
 
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/nginx.conf
 
#ENV NETCORE3_SERVICE="localhost:5002"

EXPOSE 80
 
#CMD ["/bin/sh",  "-c",  "envsubst '$${NETCORE3_SERVICE}' < /etc/nginx/nginx.template.conf > /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'"]
CMD ["nginx", "-g", "daemon off;"]
# docker build -t ownid-client-app:latest .
# docker run --rm -it -p 80:80/tcp ownid-client-app:latest
