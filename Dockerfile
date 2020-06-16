FROM node

WORKDIR /home/app
COPY . .
RUN npm install
EXPOSE 10000

CMD npm run serve