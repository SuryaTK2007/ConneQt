# ConneQt

A modern campus social network platform that connects students with alumni and faculty for professional networking, mentorship, and event discovery.

## Features

- **Professional Networking**: Connect with alumni and faculty members
- **Mentorship Program**: Find and connect with mentors in your field
- **Event Discovery**: Discover and participate in campus events
- **Alumni Chat**: Direct messaging with alumni network
- **Calendar Integration**: Track important events and deadlines
- **Works Showcase**: Display and discover student/alumni projects
- **Dark/Light Theme**: Customizable user interface

## Tech Stack

- **Frontend**: React 19.1.1 with Vite
- **Styling**: Tailwind CSS 4.1.14 + DaisyUI 5.1.27
- **Routing**: React Router DOM 7.9.3
- **Icons**: React Icons 5.5.0
- **Build Tool**: Vite 7.1.7
- **Linting**: ESLint 9.36.0

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ConneQt
```

2. Navigate to frontend directory:
```bash
cd frontend
```

3. Install dependencies:
```bash
npm install
# or
bun install
```

4. Start development server:
```bash
npm run dev
# or
bun run dev
```

5. Open your browser and visit `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── common/          # Shared components (Header, Footer)
│   │   ├── home/            # Home page components
│   │   └── landing/         # Landing page components
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Page components
│   ├── App.jsx             # Main app component
│   └── main.jsx            # Entry point
├── public/                  # Static assets
└── package.json            # Dependencies and scripts
```

## Pages

- **Landing Page** (`/`) - Welcome page with features overview
- **Authentication** (`/auth`) - Login/Register page
- **Home** (`/home`) - Main dashboard
- **Calendar** (`/calendar`) - Event calendar view
- **Works** (`/works`) - Project showcase
- **Alumni Chat** (`/alumni-chat`) - Messaging interface
- **Events** (`/events`) - Event discovery and management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting: `npm run lint`
5. Submit a pull request

## License

This project is licensed under the MIT License.
