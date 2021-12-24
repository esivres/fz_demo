FROM node:14-alpine as build
COPY ./ /build
WORKDIR /build
RUN npm install
RUN npm run build

FROM node:14-alpine

RUN npm install -g serve

COPY --from=build /build/* /app/

#DEV ONLY
CMD ["/usr/local/bin/serve","-s","/app"]