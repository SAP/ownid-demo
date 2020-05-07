FROM nginx:alpine

COPY ./dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# docker build -t ownid-webapp:v1 .
# docker run --rm -it -p 80:80/tcp ownid-webapp:v1
