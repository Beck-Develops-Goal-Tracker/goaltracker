# Goal Tracker App - Development Guide

This document provides a comprehensive guide for setting up, developing, and contributing to the Goal Tracker application.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Local Development Setup](#local-development-setup)
   * [Clone the Repository](#clone-the-repository)
   * [Install Dependencies](#install-dependencies)
   * [Supabase Setup](#supabase-setup)
   * [Environment Variables](#environment-variables)
   * [Running the Development Server](#running-the-development-server)
4. [Project Structure](#project-structure)
5. [Key Development Practices](#key-development-practices)
   * [Styling](#styling)
   * [Data Fetching & State Management](#data-fetching--state-management)
   * [Authentication](#authentication)
   * [Database Migrations (Supabase)](#database-migrations-supabase)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)
8. [Contributing](#contributing)
9. [Git Versioning System](#git-versioning-system)
   * [Branching Strategy: Feature Branch Workflow](#branching-strategy-feature-branch-workflow)
   * [Commit Message Guidelines: Conventional Commits](#commit-message-guidelines-conventional-commits)

---

## 1. Project Overview

The Goal Tracker App is a full-stack web application built with Next.js and Supabase. It enables users to register, log in, and manage a list of their personal goals (create, view, delete).

* **Frontend:** Next.js (React), Tailwind CSS
* **Backend & Database:** Supabase (PostgreSQL, Authentication, Instant APIs)

## 2. Prerequisites

Before you begin, ensure you have the following installed on your system:

* **Node.js:** LTS version (e.g., 18.x or 20.x). You can download it from [nodejs.org](https://nodejs.org/) or use a version manager like `nvm`.
* **npm or Yarn:** Package managers, typically installed with Node.js.
* **Git:** For version control.
* **Code Editor:** VS Code is highly recommended.
* **Browser:** A modern web browser (Chrome, Firefox, Edge).
* **Supabase Account:** A free-tier Supabase account is sufficient for development. Sign up at [supabase.com](https://supabase.com/).

## 3. Local Development Setup

Follow these steps to get the application running on your local machine.

### Clone the Repository

First, clone the project repository from GitHub:

```bash
git clone https://github.com/your-username/goal-tracker-app.git
cd goal-tracker-app
```

**Note:** Replace `your-username` with the actual GitHub username where the repository is hosted.

### Install Dependencies

Navigate into the cloned directory and install the project's dependencies:

```bash
npm install
# or if you prefer yarn
yarn install
```

### Supabase Setup

The application relies on a Supabase project for its backend and database.

1. **Create a New Supabase Project:**

   * Log in to your [Supabase dashboard](https://app.supabase.com/).
   * Click "New project".
   * Give your project a name, set a strong database password, and choose a region.
   * Wait for the project to provision.

2. **Create the `goals` Table:**

   * Once your project is ready, navigate to the "Table Editor" in the left sidebar.
   * Click "+ New table".
   * Name your table `goals`.
   * Add the following columns (adjust types as needed):
     * `id`: `uuid` (Primary Key, Default Value: `gen_random_uuid()`)
     * `created_at`: `timestampz` (Default Value: `now()`)
     * `user_id`: `uuid` (Foreign Key, links to `auth.users.id`) - *Crucial for RLS*
     * `description`: `text` (or `varchar`)
     * `completed`: `boolean` (Default Value: `false`)

   * **Crucially, set up Row Level Security (RLS):**
     * Go to "Authentication" -> "Policies" in Supabase.
     * For the `goals` table, enable RLS.
     * Add policies:
       * **SELECT policy:** Allow authenticated users to view their own goals.
         * Name: `Enable read access for authenticated users`
         * `USING` expression: `auth.uid() = user_id`
       * **INSERT policy:** Allow authenticated users to create goals.
         * Name: `Enable insert for authenticated users`
         * `WITH CHECK` expression: `auth.uid() = user_id`
       * **UPDATE policy:** Allow authenticated users to update their own goals.
         * Name: `Enable update for authenticated users`
         * `USING` expression: `auth.uid() = user_id`
       * **DELETE policy:** Allow authenticated users to delete their own goals.
         * Name: `Enable delete for authenticated users`
         * `USING` expression: `auth.uid() = user_id`

3. **Retrieve Supabase Credentials:**

   * In your Supabase project dashboard, go to "Project Settings" (gear icon) -> "API".
   * Note down your **`Project URL`** and **`anon (public)` key**. These will be used in your environment variables.

### Environment Variables

The application requires specific environment variables to connect to your Supabase project.

1. Create a file named `.env.local` in the root of your project directory.

2. Add the following lines, replacing the placeholder values with your actual Supabase credentials:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_PUBLIC_KEY
   ```

   * `NEXT_PUBLIC_` prefix is essential for Next.js to expose these variables to the browser-side code.
   * **DO NOT commit this file to Git.** It is already included in `.gitignore` to prevent sensitive data from being pushed to your repository.

### Running the Development Server

Once you have installed dependencies and set up your environment variables, start the Next.js development server:

```bash
npm run dev
# or
yarn dev
```

The application will be accessible in your web browser at `http://localhost:3000`. Any changes you make to the code will trigger a hot reload.

## 4. Project Structure

A typical Next.js project structure will be followed:

```
.
├── public/                 # Static assets (images, fonts)
├── src/                    # Main application source code
│   ├── app/                # Next.js App Router (pages, layouts, API routes)
│   │   ├── (auth)/         # Grouped routes for authentication (e.g., login, signup)
│   │   ├── goals/          # Goal-related pages
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Root index page
│   ├── components/         # Reusable React components
│   ├── lib/                # Utility functions, Supabase client initialization
│   ├── styles/             # Global CSS, Tailwind config
│   └── types/              # TypeScript type definitions
├── .env.local              # Local environment variables (DO NOT COMMIT)
├── .eslintrc.json          # ESLint configuration
├── .gitignore              # Files/directories to ignore in Git
├── next.config.js          # Next.js configuration
├── package.json            # Project dependencies and scripts
├── postcss.config.js       # PostCSS configuration (for Tailwind)
├── README.md               # Project README
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── yarn.lock (or package-lock.json)
```

## 5. Key Development Practices

### Styling

* **Tailwind CSS:** The project uses Tailwind CSS for all styling. Refer to the [Tailwind CSS documentation](https://tailwindcss.com/docs) for utility classes.
* **Global Styles:** Global styles are defined in `src/app/globals.css`.

### Data Fetching & State Management

* Data fetching from Supabase is typically done directly within React Server Components or Client Components using the Supabase client library.
* React's `useState`, `useEffect`, and `useReducer` are used for local component state management.
* Consider using a library like `react-query` or `SWR` for more advanced caching and data synchronization in larger applications, though it's not strictly necessary for this simple app.

### Authentication

* Supabase handles user authentication. The `@supabase/supabase-js` client library provides methods for signing up, logging in, logging out, and managing user sessions.
* The application should redirect unauthenticated users to a login page and authenticated users to the main app dashboard.

### Database Migrations (Supabase)

For production-grade applications, managing database schema changes with migrations is crucial. While this simple app might manage schema directly through the Supabase UI, for any significant schema changes:

1. **Supabase CLI:** Install the [Supabase CLI](https://supabase.com/docs/guides/cli).
2. **Link Project:** Link your local Supabase CLI to your remote project.
3. **Generate Migrations:** Use `supabase db diff` to generate migration files based on local changes, or `supabase migration new` to create new ones.
4. **Apply Migrations:** Apply migrations locally (`supabase db reset`) and push them to your repository to be applied in production.

## 6. Testing

(Add details about your testing setup here. E.g., Jest, React Testing Library, Cypress)

* **Unit Tests:** (e.g., `npm test` or `yarn test`)
* **Integration Tests:** (e.g., `npm run test:e2e` or `yarn run test:e2e`)

## 7. Troubleshooting

* **`npm install` fails:**
  * Check your Node.js version (`node -v`). Ensure it's an LTS version.
  * Clear npm cache (`npm cache clean --force`) and try again.
* **App not connecting to Supabase:**
  * Double-check your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`. Ensure there are no typos or extra spaces.
  * Verify that your Supabase project is up and running.
  * Check your browser's developer console for network errors or API call failures.
  * Ensure your Row Level Security (RLS) policies are correctly configured in Supabase.
* **Tailwind CSS not applying:**
  * Ensure `tailwind.config.ts` has correct `content` paths.
  * Verify `@tailwind` directives are present in `src/app/globals.css`.
* **"Cannot find module" errors:**
  * Ensure all dependencies are installed (`npm install`).
  * Restart your development server.
* **For any other issues:** Check the console for error messages, consult the Next.js, React, or Supabase documentation, and search Stack Overflow.

## 8. Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Write clear, concise commit messages (see [Git Versioning System](#git-versioning-system)).
5. Ensure all tests pass.
6. Open a Pull Request (PR) to the `main` branch of this repository. Provide a clear description of your changes.

---

## 9. Git Versioning System

For a project like this, a simplified but effective Git workflow based on **Conventional Commits** and a **Feature Branch Workflow** is highly recommended.

### Branching Strategy: Feature Branch Workflow

* **`main` branch:** This branch should always represent the latest stable, production-ready code. No direct commits should be made to `main`.
* **`development` branch (Optional but Recommended):** For larger projects, you might have a `development` branch where all features are merged before going to `main`. For a smaller, personal project, directly merging features into `main` after review might suffice, especially with continuous deployment.
* **Feature Branches:** For every new feature, bug fix, or significant change, create a new branch off `main` (or `development`).
  * Naming convention:
    * `feature/descriptive-name` (e.g., `feature/add-goal-editing`)
    * `bugfix/issue-description` (e.g., `bugfix/login-error`)
    * `chore/update-dependencies` (e.g., `chore/update-nextjs`)
    * `refactor/component-name` (e.g., `refactor/auth-forms`)
* **Pull Requests (PRs):** Once work on a feature branch is complete, open a Pull Request to merge it back into `main` (or `development`). This allows for code review and automated checks (like CI/CD on Railway).

**Workflow Summary:**

1. `git checkout main` (or `development`)
2. `git pull origin main` (or `development`) - Ensure you have the latest code.
3. `git checkout -b feature/your-feature-name`
4. Work on your feature, committing regularly (see Conventional Commits below).
5. `git add .`
6. `git commit -m "feat: Add new goal editing functionality"`
7. `git push origin feature/your-feature-name`
8. Open a Pull Request on GitHub from `feature/your-feature-name` to `main` (or `development`).
9. After review and approval, merge the PR.
10. Delete the feature branch (`git branch -d feature/your-feature-name` locally, and via GitHub UI).

### Commit Message Guidelines: Conventional Commits

Using Conventional Commits makes your commit history clean, readable, and can even be used for automated changelog generation and semantic versioning.

**Format:**

```
<type>(<scope>): <short description>

[optional body]

[optional footer(s)]
```

* **`<type>` (Mandatory):** Describes the kind of change.
  * `feat`: A new feature.
  * `fix`: A bug fix.
  * `docs`: Documentation only changes.
  * `style`: Changes that do not affect the meaning of the code (whitespace, formatting, semicolons, etc.).
  * `refactor`: A code change that neither fixes a bug nor adds a feature.
  * `perf`: A code change that improves performance.
  * `test`: Adding missing tests or correcting existing tests.
  * `build`: Changes that affect the build system or external dependencies (npm, yarn, webpack, rollup, etc.).
  * `ci`: Changes to our CI configuration files and scripts (Travis, Jenkins, GitLab CI, Railway, etc.).
  * `chore`: Other changes that don't modify src or test files.
  * `revert`: Reverts a previous commit.

* **`<scope>` (Optional):** Specifies the part of the codebase affected.
  * Examples: `auth`, `goals`, `ui`, `database`, `components`, `layout`, `deps`.
  * If the change affects multiple parts, you can use `(all)` or omit it.

* **`<short description>` (Mandatory):** A very concise summary of the change, in the imperative mood. (e.g., "add", "fix", "update", not "added", "fixed", "updated"). Max 50-72 characters.

* **`<body>` (Optional):** A more detailed explanation of the change. Use bullet points if necessary. Explain *why* the change was made and *what* problem it solves.

* **`<footer>` (Optional):**
  * **`BREAKING CHANGE:`** Indicates a breaking API change.
  * **`Refs:`**, **`Closes:`**, **`Fixes:`**: Reference issues (e.g., `Fixes #123`).

**Examples:**

* **New Feature:**
  ```
  feat(goals): Add ability to mark goals as completed

  Users can now toggle a checkbox next to each goal to mark it as done.
  This updates the 'completed' field in the Supabase database.
  ```

* **Bug Fix:**
  ```
  fix(auth): Correct login redirect loop for unverified users

  Previously, unverified users were stuck in a redirect loop after attempting to log in.
  Now, they are directed to a 'check your email' page.
  Closes #45
  ```

* **Refactor:**
  ```
  refactor(components): Consolidate button styling into shared component

  Extracted common button styles from LoginForm and GoalForm into a new Button component
  to improve reusability and maintainability.
  ```

* **Build/CI:**
  ```
  ci: Update Railway deployment script to use Node 20

  Ensures the production build uses the latest LTS Node.js version for better performance.
  ```

**Benefits:**

* **Clear History:** Easily understand the purpose of each commit at a glance.
* **Better Collaboration:** Makes code reviews easier.
* **Automated Tools:** Enables tools to generate changelogs or automatically determine semantic version bumps.

By following these guidelines, you'll maintain a clean, informative Git history for your Goal Tracker application, making development and collaboration much smoother.
