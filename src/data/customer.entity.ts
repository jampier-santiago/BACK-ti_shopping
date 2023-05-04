import { Person } from "./person.entity";

export interface CustomerMakeEntity extends Person {}

export interface CustomerResponseEntity extends Person {
  Id_CUSTOMERS: string;
  Password: string;
  N_credit_card: string;
  CVC: string;
  credit_card_experiation_date: string;
}
