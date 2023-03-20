interface Person {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  birthDate: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  brand: string;
}

export interface Store {
  id: string;
  name: string;
  adress: string;
  urlWebPage?: string;
  facebook?: string;
  instagram?: string;
  phoneNumber: string;
  email?: string;
  description: string;
  logo: string;
  keywords: string;
  bankAccountNumber: number;
  products: Array<Product>;
}

export interface Client extends Person {}

export interface Seller extends Person {
  dateOfMakeAccount: Date;
}

export interface Sales {
  id: string;
  date: Date;
  total: number;
  nameStore: string;
  products: Array<Product>;
}
