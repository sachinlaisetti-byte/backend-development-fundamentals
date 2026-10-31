# Backend Development Fundamentals — Lab 1

This repository contains Lab 1: a small Node.js project that demonstrates a plain HTTP server and an Express server.

## Project layout

```text
backend-development-fundamentals/
├── .gitignore
├── README.md
└── lab-01/
    ├── .gitkeep              (left from initial folder setup)
    ├── README.md
    ├── app.js
    ├── package.json
    ├── package-lock.json
    ├── plain-server.js
    └── test-results.txt
```

The project source files are in `lab-01`. The root-level duplicate copies have been removed.

## Run locally

From a terminal, enter the `lab-01` folder, install the packages, then start Express:

```bash
npm install
npm start
```

The app uses `process.env.PORT` when provided, otherwise it listens on port 3000. To run the built-in Node HTTP example, stop Express and run `npm run plain`.

## Express routes

| Method | Path | Result |
| --- | --- | --- |
| GET | `/` | Welcome message |
| GET | `/about` | Student name and section as JSON |
| GET | `/time` | Current request date-time as JSON |
| GET | Any unknown path | `404 - Route not found` with status 404 |

The recorded local responses are in [lab-01/test-results.txt](lab-01/test-results.txt).

## Deployment

The Render service is [https://backend-development-fundamentals-8d8i.onrender.com](https://backend-development-fundamentals-8d8i.onrender.com).

## Student details

Sachin Laisetti · 252U1R3080 · CSE-DS-2B  
Faculty: Yugandhar Gurjalwar  
Course: Backend Development Fundamentals
