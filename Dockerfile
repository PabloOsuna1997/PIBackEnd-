FROM node:8.4.0-alpine
COPY ./backend/ /usr/src/backend
WORKDIR /usr/src/backend
EXPOSE 8000
CMD ["npm","start"]
