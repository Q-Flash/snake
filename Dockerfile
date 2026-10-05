FROM node:22.23.2-alpine3.24 as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

##################################################################################

RUN npm run build

FROM nginx:1.31.6-alpine

# The official nginx entrypoint renders templates in /etc/nginx/templates
# using environment variables before nginx starts.
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
