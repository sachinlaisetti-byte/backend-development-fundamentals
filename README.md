# Backend Development Fundamentals — Lab 1

This repository contains Lab 1, a small Node.js project demonstrating a plain HTTP server and an Express server.

## Project layout

```text
backend-development-fundamentals/
├── .gitignore
├── app.js                 (original root-level copy)
├── package.json           (original root-level copy)
├── package-lock.json      (original root-level copy)
├── plain-server.js        (original root-level copy)
├── test-results.txt       (original root-level copy)
└── lab-01/                (canonical Lab 1 project)
    ├── app.js
    ├── package.json
    ├── package-lock.json
    ├── plain-server.js
    ├── test-results.txt
    └── README.md
```

Use the `lab-01` folder as the source of truth for the exercise. The root copies remain from the first upload.

## Run locally

From the `lab-01` directory, install dependencies and start the Express server:

```bash
npm install
npm start
```

The server uses `process.env.PORT` when provided and otherwise uses port 3000. To run the built-in HTTP example, stop Express and use `npm run plain`.

## Express routes

| Method | Path | Result |
| --- | --- | --- |
| GET | `/` | Welcome message |
| GET | `/about` | Student name and section as JSON |
| GET | `/time` | Current request date-time as JSON |
| GET | Any unknown path | `404 - Route not found` with status 404 |

Recorded local request output is in [lab-01/test-results.txt](lab-01/test-results.txt).

## Deployment

The Render service is [https://backend-development-fundamentals-8d8i.onrender.com](https://backend-development-fundamentals-8d8i.onrender.com). It runs the project from `lab-01`, with `npm install` as the build command and `npm start` as the start command.

## Student details

Sachin Laisetti · 252U1R3080 · CSE-DS-2B  
Faculty: Yugandhar Gurjalwar  
Course: Backend Development Fundamentals
