import { defineMiddleware } from "astro/middleware";

export const onRequest = defineMiddleware((context, next) => {
  // If a basic auth header is present, it wil take the string form: "Basic authValue"
  const basicAuth = context.request.headers.get("authorization");

  if (basicAuth) {
    // Get the auth value from string "Basic authValue"
    const authValue = basicAuth.split(" ")[1] ?? "username:password";

    // Decode the Base64 encoded string via atob (https://developer.mozilla.org/en-US/docs/Web/API/atob)
    // Get the username and password. NB: the decoded string is in the form "username:password"
    const [username, pwd] = atob(authValue).split(":");

    // check if the username and password are valid
    if (username === import.meta.env.USERNAME && pwd === import.meta.env.PW) {
      // forward request
      return next();
    }
  }

  return new Response(
    `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="generator" content="Astro v5.1.6">
        <title>Chez Superdad</title>
      </head>
      <body>
        <p>Auth required</p>
      </body>
    </html>
    `,
    {
      status: 401,
      headers: {
        "WWW-authenticate": 'Basic realm="Secure Area"',
        "Content-Type": "text/html",
      },
    }
  );
});
