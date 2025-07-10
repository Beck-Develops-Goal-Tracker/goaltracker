# Database Setup Guide - Supabase

This guide will help you set up the Supabase database for the Goal Tracker application.

## Prerequisites

1. A Supabase account (free tier works fine)
2. Your environment variables configured (see main README.md)

## Database Schema Setup

### 1. Create Goals Table

In your Supabase dashboard, go to the "SQL Editor" and run the following SQL:

```sql
-- Create goals table
CREATE TABLE goals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    description TEXT NOT NULL,
    completed BOOLEAN DEFAULT false NOT NULL
);
```

### 2. Set up Row Level Security (RLS)

Enable RLS on the goals table:

```sql
-- Enable RLS
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
```

### 3. Create RLS Policies

Add the following policies to ensure users can only access their own goals:

```sql
-- Policy: Users can view their own goals
CREATE POLICY "Users can view own goals" ON goals
    FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can insert their own goals
CREATE POLICY "Users can insert own goals" ON goals
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own goals
CREATE POLICY "Users can update own goals" ON goals
    FOR UPDATE USING (auth.uid() = user_id);

-- Policy: Users can delete their own goals
CREATE POLICY "Users can delete own goals" ON goals
    FOR DELETE USING (auth.uid() = user_id);
```

### 4. Test the Setup

You can test your setup by running this query (replace 'your-user-id' with an actual user ID):

```sql
-- Test inserting a goal (this should work for authenticated users)
INSERT INTO goals (user_id, description) VALUES (auth.uid(), 'Test goal');

-- Test selecting goals (should only return goals for the current user)
SELECT * FROM goals;
```

## Environment Variables

Create a `.env.local` file in your project root with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase project dashboard:
- Go to Settings → API
- Copy the "Project URL" and "anon public" key

## Verification

1. ✅ Goals table created with proper schema
2. ✅ RLS enabled on goals table
3. ✅ All four RLS policies created (SELECT, INSERT, UPDATE, DELETE)
4. ✅ Environment variables configured
5. ✅ Authentication working (users can sign up/in)

## Next Steps

Once your database is set up, you can:
1. Test user authentication
2. Create your first goal
3. View your goals in the dashboard
4. Mark goals as complete/incomplete

## Troubleshooting

**Issue**: RLS policies not working
- **Solution**: Make sure the policies are created exactly as shown above
- **Verification**: Check the "Authentication" → "Policies" section in your Supabase dashboard

**Issue**: Environment variables not working
- **Solution**: Make sure `.env.local` is in your project root and restart your development server
- **Verification**: Check that the file starts with `NEXT_PUBLIC_` for client-side access

**Issue**: Database connection failing
- **Solution**: Verify your Supabase URL and anon key are correct
- **Verification**: Try accessing your Supabase project dashboard directly 