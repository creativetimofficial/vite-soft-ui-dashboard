FROM nginx:1.17-alpine as production-stage
COPY /dist /usr/share/nginx/html
COPY nginx.conf etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
