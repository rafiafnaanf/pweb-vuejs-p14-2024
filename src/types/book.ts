export interface Book {
  _id: string;
  title: string;
  author: string;
  category: string; // assuming category is part of the book data
  publishedDate: string;
  publisher: string;
  description: string;
  coverImage: string;
  rating: {
    average: number;
    count: number;
  };
  tags: string[];
  initialQty: number;
  qty: number;
}


export interface BookForm {
  title: string;
  author: string;
  tags: string[];
  publisher: string;
  description: string;
  coverImage: string;
  rating: {
    average: number;
    count: number;
  };
  initialQty: number;
  qty: number;
  publishedDate: string;
}
