FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["/bin/sh", "-c", "exec nginx -g 'daemon off;';"]