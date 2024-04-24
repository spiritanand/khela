# Khela

## Introduction

Khela is an online Integrated Development Environment (IDE) playground designed to support the seamless execution of
Node.js and Vanilla JavaScript code.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Dependencies](#dependencies)
- [Contributors](#contributors)
- [License](#license)

## Installation

Before you can run Khela locally, you'll need to have Node.js, Redis, and npm (or Yarn) installed on your machine.
Follow these steps to get Khela up and running:

1. Clone the repository:
    ```bash
    git clone https://github.com/spiritanand/khela.git
    cd khela
    ```
2. Install the dependencies:
    ```bash
    pnpm install
    ```
   Note: If you are on macOS you will need to install XCode for compiling the source code of the dependency `node-pty`.
3. Configure the environment variables:
    ```bash
    cd apps/web
    cp .env.example .env.local
    ```
   Update the `.env.local` file with the required environment variables i.e. `REDIS_URL` and `NEXT_PUBLIC_WS_URL`. Refer
   to - [Redis local setup using Docker](https://redis.io/learn/operate/orchestration/docker)
   and [Redis Insight](https://redis.io/insight/) for viewing your Redis DB in a GUI.
4. Start the development server
    ```bash
   pnpm dev
    ```

## Usage

To use Khela, navigate to `http://localhost:3000` in your web browser after starting the development server. From there,
you can create new playgrounds for Node.js or Vanilla JavaScript, write your code, and execute it in real-time within
the integrated terminal.

## Features

- **Interactive Coding Environment:** Supports Node.js and Vanilla JavaScript execution.
- **Real-time Execution:** Instant code execution in the browser + Hot reload for the frontend.
- **Persistent Storage:** Uses Redis to store playground IDs and code snippets.
- **Real-time Communication:** Utilizes WebSockets for seamless frontend and backend communication.

## Dependencies

- Next.js
- Express
- Redis
- WebSocket (ws for node and native WebSocket for browser)

Please refer to the `package.json` file for a detailed list of dependencies and their respective versions.

## License

Khela is open source and available under the [MIT License](https://opensource.org/license/mit).

