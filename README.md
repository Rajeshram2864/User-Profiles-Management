# User-Profiles-Management

A modern React application for managing user profiles with a clean, responsive UI built using TypeScript, Tailwind CSS, and Supabase.

## Features

- 👥 User Management
  - View list of users
  - Add new users
  - Delete users
  - View detailed user profiles

- 👤 Profile Management
  - Basic Info (Personal details, contact information)
  - Education & Skills (Academic background, technical skills)
  - Experience (Work history, projects, resume)
  - Profile picture upload

- 🎨 Modern UI/UX
  - Clean and responsive design
  - Tab-based navigation
  - Interactive form elements
  - Loading states and feedback

## Tech Stack

- [React](https://reactjs.org/) - UI Framework
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Supabase](https://supabase.com/) - Backend & Database
- [Vite](https://vitejs.dev/) - Build Tool
- [Lucide React](https://lucide.dev/) - Icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account and project

### Installation

1. Clone the repository
```bash
git clone https://github.com/rajesh-4307/User-Profiles-Management
cd User-Profiles-Management
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Create a `.env` file in the root directory with your Supabase credentials
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

### Database Setup

Run the following SQL migration in your Supabase project:

```sql
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  contact text DEFAULT '',
  -- Additional fields as defined in migrations
);
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run typecheck` - Run TypeScript type checking
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/         # React components
│   ├── tabs/          # Tab-specific components
│   └── ...
├── lib/               # Utility functions and configurations
├── types/             # TypeScript type definitions
├── App.tsx           # Root component
└── main.tsx          # Entry point
```

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
