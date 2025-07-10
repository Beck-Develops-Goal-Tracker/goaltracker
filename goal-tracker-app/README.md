# Goal Tracker App

A modern, full-stack goal tracking application built with Next.js and Supabase. Track your personal goals, mark them as complete, and visualize your progress with an intuitive dashboard.

![Goal Tracker](https://via.placeholder.com/800x400?text=Goal+Tracker+Dashboard)

## ✨ Features

- **🔐 User Authentication** - Secure signup and login with Supabase Auth
- **📝 Goal Management** - Create, read, update, and delete your goals
- **✅ Progress Tracking** - Mark goals as complete/incomplete
- **📊 Statistics Dashboard** - View your goal completion stats
- **🎨 Modern UI** - Beautiful, responsive design with dark mode support
- **🔒 Secure** - Row-level security ensures users only see their own goals
- **📱 Responsive** - Works perfectly on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Supabase account (free tier works perfectly)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd goal-tracker-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Follow the instructions in [`DATABASE_SETUP.md`](./DATABASE_SETUP.md) to set up your database
   - Get your project URL and anon key from Settings → API

4. **Configure environment variables**
   - Copy the example environment file: `cp .env.example .env.local`
   - Add your Supabase credentials to `.env.local`:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open the app**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Architecture

- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth)
- **Authentication**: Supabase Auth with Row Level Security
- **Deployment**: Ready for Railway, Vercel, or any Node.js hosting

## 🗂️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   │   ├── login/         # Login page
│   │   └── signup/        # Signup page
│   ├── goals/             # Goals dashboard
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # Reusable React components
│   └── protected-route.tsx
├── lib/                   # Utilities and configurations
│   ├── auth-context.tsx   # Authentication context
│   └── supabase.ts        # Supabase client
└── types/                 # TypeScript type definitions
    └── index.ts
```

## 🔐 Security Features

- **Row Level Security (RLS)**: Users can only access their own goals
- **Authentication Required**: All goal operations require authentication
- **Secure Environment Variables**: API keys are properly managed
- **Input Validation**: Forms include proper validation and error handling

## 📱 Usage

1. **Sign Up**: Create a new account with your email and password
2. **Add Goals**: Use the "Add New Goal" form to create your first goal
3. **Track Progress**: Click the circle next to any goal to mark it as complete
4. **View Statistics**: See your progress with the stats dashboard
5. **Manage Goals**: Edit or delete goals as needed

## 🎨 Customization

The app uses Tailwind CSS for styling. You can customize the design by:
- Modifying the color scheme in the Tailwind config
- Updating component styles in the respective files
- Adding new themes or layouts

## 📊 Database Schema

The app uses a simple but effective database schema:

```sql
Table: goals
- id: UUID (Primary Key)
- created_at: Timestamp
- user_id: UUID (Foreign Key to auth.users)
- description: Text
- completed: Boolean
```

## 🚀 Deployment

### Railway (Recommended)
1. Push your code to GitHub
2. Connect your repository to Railway
3. Add environment variables in Railway dashboard
4. Deploy automatically

### Vercel
1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 📧 Support

If you have any questions or need help setting up the project, please open an issue or reach out!

---

Built with ❤️ using Next.js and Supabase
