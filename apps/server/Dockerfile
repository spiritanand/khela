FROM node:21.7.3

RUN useradd -ms /bin/bash leo

COPY package*.json /home/leo

WORKDIR /home/leo

RUN corepack enable pnpm

RUN pnpm install

COPY . .

RUN chown -R leo /home/leo
RUN chmod -R 755 /home/leo/src/controllers/compute

USER leo

ENV PORT 8081

EXPOSE 8081

CMD ["pnpm", "start"]