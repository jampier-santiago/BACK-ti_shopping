import { StoreModel, Client, Seller, Store, Product } from "../data/models";

export const stores: Array<StoreModel> = [
  {
    id: "1",
    name: "Prueba",
    logo: "https://s3.abcstatics.com/media/cultura/2020/10/05/acdc-U11064714571HRm-1248x698@abc.jpg",
  },
  {
    id: "2",
    name: "Prueba 2",
    logo: "https://s3.abcstatics.com/media/cultura/2020/10/05/acdc-U11064714571HRm-1248x698@abc.jpg",
  },
];

export const storesComplete: Array<Store> = [
  {
    id: "1",
    name: "Prueba",
    logo: "https://s3.abcstatics.com/media/cultura/2020/10/05/acdc-U11064714571HRm-1248x698@abc.jpg",
    adress: "dasasasd",
    bankAccountNumber: 2232332,
    description: "Loasodasndisanidas  ad asi hasi dsauh a",
    keywords: "a vdfvdf dsfssfas dsfssda",
    phoneNumber: "3232323232",
    products: [
      {
        id: "1",
        brand: "Apple",
        category: "Computadores",
        description: "saASDSASADSADSAasdasd s das dasdsa",
        name: "Mac",
        price: "404040",
      },
    ],
  },
  {
    id: "2",
    name: "Prueba 2",
    logo: "https://s3.abcstatics.com/media/cultura/2020/10/05/acdc-U11064714571HRm-1248x698@abc.jpg",
    adress: "dasasasd",
    bankAccountNumber: 2232332,
    description: "Loasodasndisanidas  ad asi hasi dsauh a",
    keywords: "a vdfvdf dsfssfas dsfssda",
    phoneNumber: "3232323232",
    products: [],
  },
];

export const clients: Array<Client> = [
  {
    address: "assaasaa",
    birthDate: new Date(),
    email: "client@gm.co",
    fullName: "Prueba1234",
    id: "1",
    phoneNumber: "232323322332",
    password: "$2a$10$wPVgIwfUmZNOqvnAOOu3aunV8xWxaWfM408gdLN6MguKidGniFhpu",
  },
];

export const sellers: Array<Seller> = [
  {
    address: "assaasaa",
    birthDate: new Date(),
    email: "admin@gm.co",
    fullName: "Prueba1234",
    id: "1",
    phoneNumber: "232323322332",
    password: "$2a$10$wPVgIwfUmZNOqvnAOOu3aunV8xWxaWfM408gdLN6MguKidGniFhpu",
    dateOfMakeAccount: new Date(),
  },
];

export const products: Array<Product> = [
  {
    brand: "Apple",
    category: "Celulares",
    description: "LADASIDNAS sandasij dasj as das dasj das ",
    id: "1",
    name: "Iphone",
    price: "2000",
  },
  {
    brand: "Apple",
    category: "Computadores",
    description: "LADASIDNAS sandasij dasj as das dasj das ",
    id: "2",
    name: "Mac",
    price: "20000",
  },
];
