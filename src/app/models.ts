export interface Movie {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  year: number;
  director: string;
  duration: string;
  genre: string[];
  rate: number;
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface Comodity {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface Album {
  userId: number;
  id: number;
  title: string;
}

export interface Report {
  id: number;
  title: string;
  description: string;
  date: string;
}
