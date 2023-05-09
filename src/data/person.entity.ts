export interface Person {
  Id_people: number;
  f_name: string;
  s_name: string;
  f_lastname: string;
  s_lastname: string;
  num_telephone: number;
  email: string;
  address: string;
  birthdate: string;
  state: number;
  creation_date: string | Date;
  password: string;
  N_credit_card?: string;
  CVC?: string;
  credit_card_expiration_date?: string | Date;
  rol: "ADMIN" | "CLIENT";
}
