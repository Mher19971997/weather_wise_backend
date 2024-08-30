Weather Wise Backend

 Overview

Weather Wise Backendi a Node.js REST API built with NestJS. to get weather information. The project uses Sequelize for ORM, RabbitMQ for job queues, and Redis for caching.

 Features

- NestJS: Modular framework for building scalable server-side applications.
- Sequelize: ORM for PostgreSQL database management.
- Rabbit: Job queue management.
- Redis: Caching to improve performance.
- Swagger: API documentation with a secure login.
- Docker: Containerization for easy deployment.

 Installation

# Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Docker](https://www.docker.com/) (optional, for Docker deployment)


1. Install Dependencies

   ```bash
   pnpm install
   ```

2. Configure Environment Variables

   Create a `local.env` file in the root directory and set your environment variables

3. Run Migrations

   ```bash
   pnpm run migration:up
   ```

 Usage

# Start the Application

- Development Mode

  ```bash
  pnpm run start:dev
  ```

- Production Mode

  ```bash
  pnpm run start:prod
  ```

# Swagger API Documentation

The API documentation is available via Swagger UI. To access it:

1. Start the application in development mode (`pnpm run start:dev`).
2. Open your browser and navigate to `http://localhost:6001/doc`.

Login Credentials for Swagger UI:

- Username: `swagger`
- Password: `swagger123`

# Docker

To build and run the application using Docker:

```bash
pnpm run docker:run
```

# Testing

- Run Tests

  ```bash
  pnpm test:e2e
  ```

 Scripts

- `build`: Compile the application.
- `format`: Format code using Prettier.
- `lint`: Lint code using ESLint.
- `test:e2e`: Run unit tests.
- `migrate`: Run database migrations.
- `docker:run`: Build and start Docker containers.

 Dependencies

- @nestjs/common, @nestjs/core: Core NestJS modules.
- @nestjs/sequelize: Sequelize integration for NestJS.
- amqplib: RabbitMQ Job queue system.
- redis: Redis client for caching.
- sequelize: ORM for PostgreSQL.
- dotenv: Manage environment variables.
- @nestjs/swagger: Swagger integration for API documentation.
