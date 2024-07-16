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

export interface CommodityPaginate {
  first: number;
  prev: number;
  next: number;
  last: number;
  pages: number;
  items: number;
  data: Commodity[];
}

export interface Commodity {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
