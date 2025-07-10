export interface Goal {
  id: string
  created_at: string
  user_id: string
  description: string
  completed: boolean
}

export interface User {
  id: string
  email: string
  created_at: string
} 