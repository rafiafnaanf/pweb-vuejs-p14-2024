export interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  available: boolean;
}

export interface BookForm {
  title: string;
  author: string;
  category: string;
  available: boolean;
}