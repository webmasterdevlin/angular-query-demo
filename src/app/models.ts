export interface Post {
  userId: number;
  id?: number;
  title: string;
  body: string;
}

export interface Todo {
  userId: number;
  id?: number;
  title: string;
  completed: boolean;
}

export interface Contact {
  id: string;
  first?: string;
  last?: string;
  avatar?: string;
  email?: string;
  twitter?: string;
  favorite?: boolean;
  notes?: string;
}
