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

export interface ComodityPage {
  first: number;
  prev: number;
  next: number;
  last: number;
  pages: number;
  items: number;
  data: Data[];
}

export interface Data {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
