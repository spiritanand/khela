FROM node:21.7.3

WORKDIR .

COPY package*.json ./

RUN corepack enable pnpm

RUN pnpm install

COPY . .

ENV PORT 8081

EXPOSE 8081

CMD ["node", "dist/index.js"]