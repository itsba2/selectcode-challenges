# NestJS Challenge - API for a Task Management System

Author: [@itsba2](https://github.com/itsba2)

## Before You Start

### Prerequisites

You need [git](https://git-scm.com/) and [docker](https://www.docker.com/) installed.

### Installation

First clone the repository

```
git clone https://github.com/itsba2/selectcode-challenges.git
```

On your terminal, go to /backend/nestjs directory where you cloned the repository

```
cd ./selectcode-challenges/backend/nestjs
```

Create a .env file here and put the following code inside

```
POSTGRES_USER=example_user
POSTGRES_PASSWORD=example_pass
POSTGRES_PORT=5432
POSTGRES_DB=example_db
DATABASE_URL=postgres://example_user:example_pass@localhost:5432/example_db
NODE_ENV=development
PORT=3000
SESSION_SECRET=youShallNotPass
```

Then, run the docker container

```
docker compose up -d
```

## Usage

### Endpoints

- **`/auth/`**
  - **`POST /auth/register`**: Register user. Provide `{username: string, password: string}` in the request body.
  - **`POST /auth/login`**: Login user. Provide `{username: string, password: string}` in the request body.
  - **`GET /auth/logout`**: Logout user
- **`/projects/`**: Login to use this route.
  - **`GET /projects`**: Retrieve a list of all projects for a user.
  - **`POST /projects`**: Add a new project. Provide `{title: string, description: string}` in the request body.
  - **`PUT /projects/{projectId}`**: Update the details of an existing project. Provide `{title: string, description: string}` in the request body.
  - **`DELETE /projects/{projectId}`**: Remove a project.
- **`/projects/{projectId}/tasks`**: Login to use this route.
  - **`GET /projects/{projectId}/tasks`**: Retrieve a list of tasks in a project.
  - **`POST /projects/{projectId}/tasks`**: Add a new task to a project. Provide `{title: string, description: string}` in the request body.
  - **`PUT /projects/{projectId}/tasks/{taskId}`**: Update the details of a task in a project. Provide `{title: string, description: string}` in the request body.
  - **`DELETE /projects/{projectId}/tasks/{taskId}`**: Remove a task from a project.
