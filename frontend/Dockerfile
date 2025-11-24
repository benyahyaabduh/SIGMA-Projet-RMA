FROM node:19-alpine3.16 as builder
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./.yarnrc ./
COPY ./.npmrc ./
ENV http_proxy=http://helpdeskrwa:rma+2020@proxyrma.rmawatanya.com:8080/
ENV https_proxy=http://helpdeskrwa:rma+2020@proxyrma.rmawatanya.com:8080/
ENV no_proxy=172.22.25.62
RUN yarn
COPY . ./
RUN yarn build

FROM nginx
EXPOSE 9016
COPY --from=builder /app/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
