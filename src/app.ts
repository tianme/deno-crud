import { Application } from "https://deno.land/x/oak/mod.ts";

import userRouter from './router/user.ts';

import { oakCors } from "https://deno.land/x/cors/mod.ts";

const app = new Application();

app.use(oakCors())

app.use(userRouter.routes());

const port = 8088;
app.addEventListener('listen', ({ hostname, port, secure }) => {
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${hostname ??
      "localhost"}:${port}`,
  );
})

app.addEventListener("error", (evt) => {
  // Will log the thrown error to the console.
  console.log(evt.error);
});

await app.listen({
  port,
})
