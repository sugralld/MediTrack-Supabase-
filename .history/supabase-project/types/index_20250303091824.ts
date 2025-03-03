export interface Medicine {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    classification: string;
    category: string;
    image_url: string;
  }
  
  export interface Bookmark {
    id: string;
    medicine_id: string;
    medicines: Medicine;
  }
  