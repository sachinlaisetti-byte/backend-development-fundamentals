# Lab 1: Node.js and Express server

**Name:** Sachin Laisetti  
**Registration number:** 252U1R3080  
**Section:** CSE-DS-2B  
**Faculty:** Yugandhar Gurjalwar  
**Course:** Backend Development Fundamentals

**Live link:** https://REPLACE-AFTER-DEPLOYMENT

## Objective

In this lab I created and ran a small web server with Node.js. I first used Node's built-in `http` module to see the basic request and response process. I then installed Express and made routes for a home message, student details, and the current date and time. I added a final route handler that returns a 404 response when a requested path does not exist. I used the command-line HTTP client to inspect the status, content type, and response body for each route. This exercise helps me understand how a browser or client asks a server for information and how a server sends a response.

## Project structure

The repository is named `backend-development-fundamentals`. The `lab-01` folder holds the files for this exercise. Its important files are:

```text
backend-development-fundamentals/
├── .gitignore
└── lab-01/
    ├── app.js
    ├── package.json
    ├── package-lock.json
    ├── plain-server.js
    ├── test-results.txt
    ├── node_modules/       (installed locally; ignored by Git)
    └── screenshots/        (screenshots will be added during the browser phase)
```

The root `.gitignore` keeps `node_modules/`, `.env`, and `*.log` out of version control. The screenshot directory is part of the planned report evidence. I will only describe a screenshot as captured after checking the actual image file.

## How to run

I need Node.js, npm, and a terminal to run the application. From a terminal, I change to the `lab-01` directory. If I have just cloned the repository or removed local dependencies, I run `npm install`. This reads the package manifest and lock file and installs the declared Express dependency and its required packages into `node_modules`.

To start the Express server I run `npm start`. The server listens on port 3000 by default. I can open `http://localhost:3000/` in a browser or request it from another terminal. To stop a foreground server, I press Ctrl+C in the terminal where it is running. I should stop the Express server before starting the plain server because both use the same default port.

To run the built-in HTTP example I use `npm run plain`. It also listens on port 3000 and returns the short text `Hello`. This command is useful for comparing the basic Node API with the Express version. The two servers are separate examples, so only one should be running on the default port at a time.

The application reads `process.env.PORT` first and uses 3000 when that variable is not set. I do not need to create an environment file for local use. On a hosting service the platform can provide `PORT` automatically. I should not commit credentials, keys, or a `.env` file to this repository.

## Endpoints table

| Method | Path | Description |
|---|---|---|
| GET | `/` | Returns the welcome message as text. |
| GET | `/about` | Returns my name and section as JSON. |
| GET | `/time` | Returns the current date and time as JSON. |
| GET | Any unknown path | Returns a not-found message with status 404. |

## package.json explained field by field

The `package.json` file is the project manifest for this Node.js application. Its `name` identifies this package as `lab-01`. The `version` is the package's initial version number. The `description` summarizes the lab as a simple Node.js and Express server. The `main` field names `app.js` as the primary application file. The `scripts` field gives short names to commands: `start` runs `node app.js`, while `plain` runs `node plain-server.js`. npm also left its initial `test` placeholder in the scripts object; that placeholder prints an error because no npm test suite has been set up. I did not run that placeholder. The `keywords` field is an array intended for search terms; it is empty because the project has no chosen tags. The `author` field records Sachin Laisetti. The `license` field records `ISC`, the value provided during npm initialization. The `dependencies` field lists Express, the package the app needs at runtime.

I can inspect these fields by opening the JSON file. JSON uses braces for an object, quoted property names, commas between entries, and square brackets for arrays. The scripts do not contain the server code; they tell npm which Node command to run. When I type `npm start`, npm looks up the `start` script and runs it from this folder. When I type `npm run plain`, npm looks up the script named `plain`.

## package.json vs node_modules vs package-lock.json

These three items have related but different jobs. `package.json` is the short declaration of the project and its direct dependency. It tells another developer which package the project needs. `node_modules` is the installed directory on this computer. It contains Express and the packages Express depends on. It can be recreated by running `npm install`, so it is normally excluded from Git. `package-lock.json` records the resolved package versions and dependency tree used by npm. The lock file helps make installs more consistent across computers. I keep the manifest and lock file in the repository but do not commit `node_modules`.

The manifest is readable and maintained as the project configuration. The lock file is generated and updated by npm when dependencies change. I should avoid editing the lock file by hand. If a new machine checks out this project, npm uses the manifest and lock information to install the packages locally. The installed directory may be large and contains generated package files, so checking it into Git would add unnecessary repository size and noise.

## The plain http server explained line by line

The first line of `plain-server.js` imports Node's built-in `http` module with `require('http')`. Built-in modules are supplied by Node, so I do not install them with npm. The next comment explains the purpose of the following code block. The server is created with `http.createServer((request, response) => { ... })`. Node calls this function when a client makes a request. The `request` parameter contains information about the incoming request, while `response` is the object I use to send data back.

Inside the callback, the code sets a successful response status and a plain-text content type. It then calls `response.end('Hello')`. That ends the response and sends the text to the client. The final `server.listen(3000, ...)` call asks Node to accept connections on port 3000. The callback prints a short message so I know the server has started. This example shows the essential flow without a routing framework: create a server, handle a request, send a response, and listen on a port.

## The Express server explained line by line

The first statement in `app.js` imports Express by using CommonJS `require('express')`. The `PORT` constant reads the hosting environment's port when one is supplied; otherwise it uses 3000 for local development. The `app` constant is created by calling `express()`. This application object provides methods for registering route handlers and starting the web server.

The first route uses `app.get('/', ...)`. This means it handles GET requests for the root path. Its callback receives a request and response. It sends the welcome sentence using `response.send(...)`. The `/about` route sends an object containing my name and section. Express converts that object into a JSON response. The `/time` route creates a `Date` object when a request arrives and sends its ISO date-time string in a JSON object. Because the date is generated inside the route callback, the value represents the time of that request.

After these three routes, the application registers a catch-all handler. It sets the status to 404 and sends the message `404 - Route not found`. This handler must come last because Express checks middleware and routes in their registration order. If the catch-all were placed before the real routes, it could respond to every request first, preventing the later route callbacks from being reached. Keeping it last lets the known routes run before the fallback.

The final `app.listen(PORT, ...)` call starts the Express application and makes it accept connections on the selected port. When a hosting platform sets `PORT`, the app uses that value. On my computer, the fallback makes the address use port 3000. The startup callback prints the selected port so I can see where the server is listening.

## Status code log

I ran `curl.exe -i` against the local Express server for each path. The `-i` option prints the response headers together with the body. These values are from the recorded local requests in `test-results.txt`; the `/time` value changes every time it is requested.

| Method | Path | Status code | Content type | Body |
|---|---|---:|---|---|
| GET | `/` | 200 | `text/html; charset=utf-8` | `Welcome to Lab 1 - Node.js and Express server` |
| GET | `/about` | 200 | `application/json; charset=utf-8` | `{"name":"Sachin Laisetti","section":"CSE-DS-2B"}` |
| GET | `/time` | 200 | `application/json; charset=utf-8` | `{"dateTime":"2026-10-31T09:33:57.737Z"}` |
| GET | `/does-not-exist` | 404 | `text/html; charset=utf-8` | `404 - Route not found` |

The success routes use status 200. The unknown route uses 404, which communicates that the requested path was not found. The returned content type helps a client interpret the body. JSON responses can be parsed as structured data, while the home and error messages are text responses. The time output is copied from the saved request log. It is a snapshot from that test run, not a value that the application returns permanently.

## Viva questions with answers

**1. What is the difference between `package.json` and `node_modules`?**  
`package.json` declares project metadata and dependencies. `node_modules` contains the actual package files installed on my computer.

**2. What does `app.listen` do?**  
It starts the Express application so it can accept network requests on a port.

**3. What do request and response represent?**  
The request describes what the client asked for. The response is the server's way to send a status, headers, and content back.

**4. What is middleware?**  
Middleware is a function that runs during request handling. It can inspect or change the request and response, end the response, or pass control to the next handler.

**5. What is a port?**  
A port is a numbered communication endpoint on a computer. A server listens on a port so clients know where to connect.

**6. How is Node's `http` module different from Express?**  
The `http` module is the built-in lower-level API. Express builds on Node's HTTP functionality and provides convenient route and response methods.

**7. What is npm?**  
npm is the package manager commonly used with Node.js. I use it to initialize the project, install packages, and run scripts.

**8. What does `process.env.PORT` mean?**  
It reads the `PORT` environment variable from the running process. A hosting platform can set it so the application listens on the port assigned to it.

**9. What is the difference between GET and POST?**  
GET is commonly used to retrieve information. POST is commonly used to submit data to a server. This lab only defines GET routes.

**10. What do status codes 200 and 404 mean?**  
200 means the request succeeded. 404 means the server could not find a matching resource or route.

**11. Why is the 404 handler registered last?**  
Express checks handlers in order. Putting the fallback last lets the specific routes respond before unknown paths reach it.

**12. Why use JSON for `/about` and `/time`?**  
JSON represents named values in a consistent structure that clients can parse and use.

**13. Why is `node_modules` ignored by Git?**  
It can be recreated from the manifest and lock file, and committing it would add many generated files to the repository.

**14. Why does the server use a fallback port?**  
The fallback lets me run the app locally without configuring an environment variable, while still allowing a host to provide its own port.

## Deployment

The intended deployment is a free Render Web Service connected to the public GitHub repository. In Render, the service should use the repository `backend-development-fundamentals`, set the root directory to `lab-01`, use `npm install` as the build command, and use `npm start` as the start command. The service should use the free instance option if available. After deployment, I need to wait until Render reports that the service is live, copy the assigned public URL into the live-link line at the top of this report, and request all four paths from that URL.

The live URL and live response results are not yet recorded here. I will replace this section with the actual Render URL, settings, live curl results, and four live screenshots after completing those steps in the browser.

## Screenshots

The required local screenshots are: `01-home-route.png`, `02-about-route.png`, `03-time-route.png`, `04-404-route.png`, `05-plain-server-hello.png`, `06-terminal-server-running.png`, `07-status-codes-terminal.png`, and `08-node-modules-express.png`. The required live screenshots are `09-live-home.png`, `10-live-about.png`, `11-live-time.png`, and `12-live-404.png`. Each image must be a genuine capture of the actual page or terminal state. I will link each checked image here after capturing it. The screenshots from the messages in this chat show account pages only, so they are not lab screenshots and are not included as project evidence.

Local browser evidence will be linked here when captured:

- Home route: `screenshots/01-home-route.png`
- About route: `screenshots/02-about-route.png`
- Time route: `screenshots/03-time-route.png`
- Not-found route: `screenshots/04-404-route.png`
- Plain server response: `screenshots/05-plain-server-hello.png`
- Server terminal: `screenshots/06-terminal-server-running.png`
- HTTP status log: `screenshots/07-status-codes-terminal.png`
- Installed Express folder: `screenshots/08-node-modules-express.png`

## Notes

The first Express installation attempt encountered a Windows `EPERM` error while npm tried to create a temporary file in the default cache directory under the user profile. I retried with a cache folder inside the writable project workspace, and that installation completed. The cache workaround did not change the application dependencies.

An attempt to set npm metadata from the repository root targeted the wrong working directory. I corrected the package metadata inside `lab-01`, where the package manifest is located. The report and code use the corrected lab metadata.

Launching a new Chrome window with the requested PowerShell `Start-Process` command was blocked by the desktop's command approval policy. I have not treated that failed attempt as a successful screenshot. The GitHub CLI reports that no command-line login is active, although the existing Chrome session does have signed-in GitHub and Render tabs. The browser session can be used directly for web steps; any command-line publishing that requires GitHub CLI authorization must follow the login handoff rule above. Screenshots, publishing, and deployment are still outstanding at this report revision.

## Conclusion

In this lab I set up a small Node.js project, installed Express, wrote a basic built-in HTTP server, and created an Express server with three useful routes and a final not-found handler. The local requests confirmed that the routes return the expected content and status codes. I also learned how npm scripts, dependencies, lock files, environment variables, and ports fit into a basic backend project. The local coding and route checks are complete. The genuine browser screenshots, public GitHub push, and Render deployment still need to be added before the lab report is fully complete.
