FROM denoland/deno

EXPOSE 9999

WORKDIR /app

ADD . /app

RUN deno cache app.ts

CMD ["run", "--allow-net", "--allow-read", "./app.ts"]
