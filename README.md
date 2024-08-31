# News Aggregator Project

This project is a **News Aggregator** application built using React. It aggregates news from various sources and displays them in a user-friendly interface. This project is set up for development purposes using Docker, ensuring a consistent environment across different systems.

## Table of Contents
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project with Docker](#running-the-project-with-docker)
- [Project Structure](#project-structure)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The News Aggregator application allows users to view the latest news from multiple sources. It uses `React` for the frontend, and it fetches news data from external APIs using `axios`.

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **Bootstrap**: CSS framework for styling.
- **Axios**: Promise-based HTTP client for making requests to APIs.
- **Docker**: Containerization platform to manage development environments.
- **Node.js**: JavaScript runtime for the backend.
- **TypeScript**: Superset of JavaScript that adds static typing.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v16.x recommended)
- **Docker** (with Docker Compose)
- **Git** (optional, for cloning the repository)

## Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/news-aggregator.git
    cd news-aggregator
    ```

2. **Install dependencies**:

   If you're not using Docker for development:

    ```bash
    npm install
    ```

## Running the Project with Docker

You can run the development environment using Docker, which avoids any dependency issues:

1. **Build the Docker image**:

    ```bash
    docker build -t news-aggregator .
    ```

2. **Run the Docker container**:

    ```bash
    docker run -p 3000:3000 news-aggregator
    ```

   This command maps your local port 3000 to the container's port 3000, so you can access the application at `http://localhost:3000`.

3. **For alternative ports**:

   If port 3000 is in use, you can map the application to a different port:

    ```bash
    docker run -p 3001:3000 news-aggregator
    ```

   Then access the application at `http://localhost:3001`.

## Project Structure

The project is organized as follows:




