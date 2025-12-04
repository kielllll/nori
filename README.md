# Nori

<div style="text-align: center; width: 100vw">
  <img src="public/nori.jpg" alt="Nori the siberian husky" width="200" />
</div>

A Chrome extension that provides lightning-fast, fuzzy searching for your bookmarks. Find the bookmark you're looking for, even if you don't remember the exact title!

## Features

- **⚡️ Fast Fuzzy Search:** Quickly find bookmarks even with typos or partial queries.
- **🔄 Automatic Indexing:** The extension automatically indexes your bookmarks for optimal search performance.
- **🔒 Secure & Local:** All your bookmark data and the search index are stored locally on your machine using `chrome.storage.local`. No data is ever sent to an external server.
- **✨ Simple Interface:** A clean and intuitive popup for searching and navigating results.

## How It Works

This extension leverages the power of a third-party fuzzy search library to provide a superior search experience.

1.  On first use, it reads your bookmarks using the `chrome.bookmarks` API.
2.  It then creates a highly optimized search index from your bookmarks' titles and URLs.
3.  This index is stored securely in `chrome.storage.local`.
4.  When you type in the search bar, the extension queries the local index to find and display relevant bookmarks instantly.

## Installation

### From Source (for Developers)

If you want to install the extension from the source code:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/kielllll/nori
    ```

2.  **Install dependencies and build the application**

    - Run `pnpm i`
    - Run `pnpm build`

3.  **Load the extension in Chrome:**
    - Open Google Chrome and navigate to `chrome://extensions`.
    - Enable **"Developer mode"** using the toggle switch in the top-right corner.
    - Click the **"Load unpacked"** button.
    - Select the directory in your repository where the application is built. Usually can be found on `/dist`.

The extension icon should now appear in your Chrome toolbar.

<!--
### From the Chrome Web Store

> **Note:** This section is a placeholder.

[Link to Chrome Web Store Listing] - Coming Soon!
-->

## Usage

1.  Click the extension icon in your Chrome toolbar.
2.  A popup with a search bar will appear.
3.  Start typing your search query.
4.  Results will update in real-time as you type.
5.  Click on any result to open the bookmark in a new tab.

## Development

### Prerequisites

- A modern web browser like Google Chrome.
- pnpm - Package management tool
- Atleast v22 of Node.js
- A text editor (e.g., VS Code).

### Contributing

Contributions are welcome! If you have ideas for improvements or find a bug, please open an issue or fork the project and submit a pull request.

## Built With

- React - a modern javascript library
- TailwindCSS - utility-first css framework
- Vite - modern frontend bundling
- Fuse.js - lightweight fuzzy-search library

## License

MIT License
