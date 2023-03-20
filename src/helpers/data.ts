import { Store } from "../data/models";

export const store: Store = {
  adress: "123 #12b-10",
  id: "1",
  name: "Prueba",
  phoneNumber: "3000000000",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  logo: "https://s3.abcstatics.com/media/cultura/2020/10/05/acdc-U11064714571HRm-1248x698@abc.jpg",
  keywords:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum",
  bankAccountNumber: 1234456,
  products: [
    {
      brand: "Apple",
      category: "Computers",
      description:
        " Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has be",
      id: "1",
      name: "Mac",
      price: "1.200",
    },
  ],
};

export const stores: Array<Store> = [store, store];
