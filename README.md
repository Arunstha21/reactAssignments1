# Project Overview

## TODO App

The TODO app helps manage tasks with categorized lists and stores data locally on the user's device. The design is inspired by [Todo Maliksvd](https://todo.maliksvd.ca/).

### Features:
- Mark tasks as completed (cross out text).
- Edit existing tasks.
- Delete tasks with a delete button.
- Data persistence using local storage.

**Access the TODO App:** `/todos`

## URL Shortener

The URL Shortener allows users to shorten long URLs, store the data on [MockAPI](https://mockapi.io/), and avoid duplicate entries (for both long URLs and short codes). It also generates a QR code for each shortened URL.

### Features:
- Checks for duplicate URLs and short codes.
- Stores data on MockAPI.
- Generates a QR code for each shortened URL.

**Access the URL Shortener:** `/urlshortener`

---

## Technologies Used
- **Frontend Components**: [Shadcn](https://shadcn.dev/)

---

## How to Run

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
