# Goal Tracker App

A modern goal tracking application built with Next.js and Supabase.

## Features

- User authentication (sign up, sign in, sign out)
- Create, view, update, and delete personal goals
- Mark goals as completed
- Real-time data synchronization with Supabase
- Responsive design with dark mode support

## Tech Stack

- **Frontend:** Next.js 15, React, TypeScript
- **Backend:** Supabase (PostgreSQL, Authentication, Real-time API)
- **Styling:** Tailwind CSS
- **Deployment:** Railway

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file with:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Setup

Make sure to configure the following environment variables in your deployment platform:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous/public key

## Database Schema

The app uses a simple `goals` table in Supabase with the following structure:

- `id`: UUID (Primary Key)
- `created_at`: Timestamp
- `user_id`: UUID (Foreign Key to auth.users)
- `description`: Text
- `completed`: Boolean

## Deployment

This app is configured for deployment on Railway with automatic deployments from the main branch.

**Latest Version:** v0.1.1 - Production ready with all ESLint issues resolved.
