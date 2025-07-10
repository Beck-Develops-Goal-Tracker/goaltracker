Simple Goal Tracker App (Next.js & Supabase)

This is a basic full-stack Goal Tracker application designed to demonstrate easy deployment on platforms like Railway. It allows users to sign up, log in, and manage their personal goals.
Technologies Used

    Frontend:

        Next.js (React Framework)

        Tailwind CSS (Utility-first CSS framework)

    Backend & Database:

        Supabase (Open-source Firebase alternative providing a PostgreSQL database, authentication, and instant APIs)

Features

    User Authentication (Sign Up, Log In)

    Create New Goals

    View Existing Goals

    Delete Goals

Architecture Overview

The application follows a modern JAMstack-like architecture where the Next.js frontend directly interacts with Supabase for all its backend needs.

    Next.js Frontend:

        Handles all UI rendering, client-side routing, and data fetching.

        Communicates directly with the Supabase API for user authentication and CRUD operations on goal data.

        Utilizes environment variables (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY) to securely connect to the Supabase project.

    Supabase Backend:

        PostgreSQL Database: Stores all user and goal information.

        Authentication: Manages user registration and login.

        Auto-generated APIs: Provides RESTful and GraphQL APIs directly from your database schema, which the Next.js app consumes.

        Handles Row Level Security (RLS) to ensure users can only access their own data.

Local Development Setup

To run this project locally, you will need:

    Node.js (LTS recommended)

    npm or Yarn

    A Supabase project (free tier available)

    Clone the repository:

    git clone https://github.com/your-username/goal-tracker-app.git
    cd goal-tracker-app

    Install dependencies:

    npm install
    # or
    yarn install

    Set up Supabase:

        Go to your Supabase dashboard and create a new project.

        Create a goals table and configure any necessary RLS policies.

        Navigate to "Project Settings" -> "API" to find your Project URL and Anon Public Key.

    Create a .env.local file:
    In the root of your project, create a file named .env.local and add your Supabase credentials:

    NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_PUBLIC_KEY

    Replace YOUR_SUPABASE_PROJECT_URL and YOUR_SUPABASE_ANON_PUBLIC_KEY with the values from your Supabase dashboard.

    Run the development server:

    npm run dev
    # or
    yarn dev

    The app will be available at http://localhost:3000.

Deployment on Railway

This application is designed for seamless deployment on Railway due to its auto-detection capabilities for Next.js applications and its robust environment variable management.

    Prerequisites:

        Your code pushed to a GitHub repository.

        A Railway account.

    Steps:

        Log in to your Railway dashboard.

        Click "New Project" and select "Deploy from GitHub Repo".

        Connect your GitHub account and select your goal-tracker-app repository.

        Railway will automatically detect it's a Next.js application and begin the build process (which may initially fail as it lacks environment variables).

        Go to the "Variables" tab in your Railway project settings.

        Add two new variables:

            NEXT_PUBLIC_SUPABASE_URL (with your Supabase Project URL as the value)

            NEXT_PUBLIC_SUPABASE_ANON_KEY (with your Supabase Anon Public Key as the value)

        Railway will automatically trigger a new deployment. Once complete, your application will be live at the provided Railway domain.

        Future git pushes to your connected branch will automatically trigger new deployments on Railway, enabling Continuous Deployment (CI/CD).