# Node Demo

[![Node.js CI](https://github.com/flintSpark/node-demo/actions/workflows/node.js.yml/badge.svg)](https://github.com/flintSpark/node-demo/actions/workflows/node.js.yml)

A production-ready Node.js & Express microservice featuring structured request logging, telemetry endpoints, graceful shutdown handling, and automated matrix CI/CD testing via GitHub Actions.

---

## ✨ Features

- **Express REST API:** Modular structure with custom request timing and error-handling middleware.
- **Health & Telemetry Endpoints:** Includes `/health` and `/api/v1/system-info` routes for container health probes and system monitoring.
- **Graceful Lifecycle Management:** Handles `SIGTERM` and `SIGINT` signals for clean server shutdowns and connection draining.
- **Zero-Dependency Native Testing:** Built using Node's native `node:test` and `node:assert` modules.
- **Multi-Version Matrix CI:** GitHub Actions workflow automatically builds and tests against Node.js `18.x`, `20.x`, and `22.x`.

---

## 🚀 API Endpoints

| Method | Endpoint | Description | Sample Response |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | Service uptime and status probe | `{"status": "UP", "uptime": 14.2}` |
| `GET` | `/api/v1/system-info` | Node environment and memory metrics | `{"nodeVersion": "v20.x", "platform": "linux"}` |

---

## 🛠️ Project Structure

```text
node-demo/
├── .github/
│   └── workflows/
│       └── node.js.yml     # Multi-version CI matrix workflow
├── src/
│   └── app.js              # Express app, routes, and middleware
├── test/
│   └── app.test.js         # Native unit tests
├── index.js                # Server entry point & graceful shutdown
├── package.json            # Scripts & dependencies
├── package-lock.json       # Dependency lockfile
├── .gitignore
├── LICENSE
└── README.md
