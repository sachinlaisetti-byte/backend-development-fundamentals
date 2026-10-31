# Lab 1: Node.js and Express server

**Student:** Sachin Laisetti  
**Registration number:** 252U1R3080  
**Section:** CSE-DS-2B  
**Faculty:** Yugandhar Gurjalwar  
**Course:** Backend Development Fundamentals

**Live service:** https://backend-development-fundamentals-8d8i.onrender.com

## Objective

This exercise demonstrates the request-response cycle using Node.js. It begins with a minimal server built on Node's built-in `http` module, then uses Express to define routes and return text, JSON, and a not-found response. The server reads the hosting platform's `PORT` environment variable and uses port 3000 for local runs.

## Project files

- `app.js` defines the Express server and its routes.
- `plain-server.js` demonstrates Node's built-in HTTP server.
- `package.json` declares the Express dependency and the `start` and `plain` scripts.
- `package-lock.json` records the resolved npm dependency tree.
- `test-results.txt` stores the output recorded during local route checks.

## Setup and execution

From this directory, install the packages and start Express:

```bash
npm install
npm start
```

Open `http://localhost:3000/` or request any route below. To compare the built-in HTTP example, stop Express and run `npm run plain`; it returns `Hello` on port 3000. Only one of the examples can use that port at a time.

## Routes and recorded results

| Method | Path | Expected status | Response |
| --- | --- | --- | --- |
| GET | `/` | 200 | Welcome text |
| GET | `/about` | 200 | JSON containing the student's name and section |
| GET | `/time` | 200 | JSON containing the request date and time |
| GET | `/does-not-exist` | 404 | `404 - Route not found` |

The 404 handler is registered after the known routes so it only handles unmatched paths. `test-results.txt` contains a captured local request log; `/time` naturally changes with each request.

## Deployment

The public Render service is [https://backend-development-fundamentals-8d8i.onrender.com](https://backend-development-fundamentals-8d8i.onrender.com). The service is configured to run this project from `lab-01`, install dependencies with `npm install`, and start with `npm start`. The platform supplies the port through `PORT`.

## Evidence

The route output recorded in `test-results.txt` documents the local checks. Screenshot evidence should be added to a `screenshots/` folder only after genuine screenshots have been captured; this README does not claim that missing images exist.

## Concepts learned

The plain server shows the core Node HTTP flow: create a server, receive a request, set a status and content type, send a body, and listen on a port. Express builds on that foundation and makes route handling more direct. The lab also demonstrates npm scripts, dependency installation, the purpose of the lock file, environment-based ports, JSON responses, HTTP status codes, and the importance of putting a fallback route after specific routes.
