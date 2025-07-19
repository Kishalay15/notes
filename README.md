# Notey - A Modern Note-Taking App

Notey is a sleek, fast, and intuitive note-taking application that runs entirely in your browser. It's designed for users who need a simple yet powerful tool to capture their thoughts, ideas, and code snippets. With support for both plain text and Markdown, Notey provides a flexible writing experience, complete with a live preview panel.

## Features

*   **Multi-Note Management:** Create, edit, and delete multiple notes. Your notes are automatically sorted by the last modified date.
*   **Dual Document Types:** Choose between writing in plain text (`.txt`) or Markdown (`.md`) for each note.
*   **Live Markdown Preview:** When in Markdown mode, see a beautifully rendered preview of your notes in real-time.
*   **Collapsible Preview:** Focus on your writing by easily hiding the preview panel when you don't need it.
*   **Local Storage Persistence:** All your notes are automatically saved to your browser's local storage, so your data is secure and available across sessions.
*   **Autosave Indicator:** A subtle status indicator lets you know when your note is being saved and when it's safely stored.
*   **Download Notes:** Easily download any of your notes as a `.txt` or `.md` file.
*   **Responsive Design:** A clean, modern, and responsive UI built with Tailwind CSS.

## Tech Stack

*   **Framework:** [React](https://react.dev/) (with [Vite](https://vitejs.dev/))
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) (with the Typography plugin)
*   **Icons:** [Heroicons](https://heroicons.com/)
*   **Markdown Rendering:** [React Markdown](https://github.com/remarkjs/react-markdown)

## Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

*   [Node.js](https://nodejs.org/en) (v18.x or higher recommended)
*   [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone <repository-url>
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd notes-app
    ```
3.  **Install NPM packages:**
    ```sh
    npm install
    ```

### Running the Application

1.  **Start the development server:**
    ```sh
    npm run dev
    ```
2.  **Open your browser:**
    Navigate to `http://localhost:5173` (or the URL provided in your terminal).