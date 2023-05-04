import { Person } from "./person.entity";

export interface SellerMakeEntity extends Person {
  dateOfMakeAccount: Date;
}

export interface SellerResponseEntity extends Person {
  dateOfMakeAccount: Date;
  Password: string;
}
