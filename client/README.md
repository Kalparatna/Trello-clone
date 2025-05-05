# Trello Clone

A frontend-only Trello clone built with React, Vite, and Tailwind CSS. This project implements the core functionality of Trello, including board management, lists, cards, and drag-and-drop features.

## Features

- Create, rename, and delete boards
- Create, rename, and delete lists within boards
- Create, edit, and delete cards within lists
- Drag and drop cards between lists
- Drag and drop lists to reorder them
- Card features:
  - Title and description
  - Due date picker
  - Label system with colored tags
  - Member assignment
  - Dark mode support
  - Responsive design

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- @dnd-kit for drag and drop
- React Router for navigation
- Context API for state management
- LocalStorage for data persistence

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd trello-clone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
client/
├── public/
├── src/
│   ├── assets/            # Images, icons, etc.
│   ├── components/        # Reusable UI components
│   ├── pages/             # Page-level views
│   ├── utils/             # Utility functions
│   ├── hooks/             # Custom React hooks
│   ├── context/           # Context API for state
│   ├── App.jsx            # Main app component
│   └── main.jsx           # Entry point
└── package.json
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 