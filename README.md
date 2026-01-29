# Pastebin Lite

Pastebin Lite is a lightweight, high-performance web application designed for sharing code snippets and plain text. Built with a minimalist philosophy, it leverages a robust Express backend and a clean, framework-free vanilla JavaScript frontend.

## 🚀 Features

Quick Paste: Create and share snippets instantly.

Minimalist UI: Fast-loading frontend built with vanilla HTML/CSS/JS.

Reliable Persistence: Powered by PostgreSQL for ACID-compliant data storage.

Automated Workflow: Database migrations are integrated into the application startup script.

## 🛠️ Tech Stack

Frontend: Vanilla HTML5, CSS3, and JavaScript.

Backend: Node.js & Express.

Database: PostgreSQL.

Tooling: Dotenv for environment management, PG-node for database communication.

## 🏗️ Installation & Setup

Follow these steps to get your local development environment running.

1. Clone the Repository

`git clone https://github.com/rajkhare05/pastebin-lite.git`

`cd pastebin-lite`


2. Install Dependencies

`npm install`


3. Database Setup

Ensure you have PostgreSQL installed and running on your machine.

Log into your PostgreSQL instance (via psql or a GUI like pgAdmin).

Create the project database:

`CREATE DATABASE pastebin_lite;`


4. Configure Environment Variables

Create a .env file in the root directory and set the following environment variables:
```
EXPRESS_PORT= 
DB_URL=
```


## 🚦 Running the Application

This project uses integrated scripts to handle both database migrations and server execution in one go.

- Development

Run with hot-reloading (via nodemon):

`npm run dev`


- Production

Run the optimized production server:

`npm run start`


Note: Both commands automatically check for and apply any pending SQL migrations to the pastebin_lite database before the server starts.

🐘 Why PostgreSQL?

For a Pastebin application, data integrity and reliability are paramount. We chose PostgreSQL as the persistence layer for several key reasons:

ACID Compliance: PostgreSQL ensures that every "paste" is processed as a reliable transaction. If a crash occurs during a save, your data remains consistent and uncorrupted.

Relational Structure: Using a relational schema allows us to easily expand features in the future, such as linking pastes to user accounts or adding tagging systems with efficient indexing.

Advanced Data Types: PostgreSQL's native support for TEXT and JSONB makes it ideal for storing large snippets of code or metadata without the performance penalties found in other SQL variants.

Performance at Scale: With its sophisticated query planner and indexing capabilities, PostgreSQL handles high-concurrency read/write loads effortlessly as the number of pastes grows.
