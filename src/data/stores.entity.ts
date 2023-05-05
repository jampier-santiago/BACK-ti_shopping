export interface StoreResponseEntity {
  Id_stores: number;
  name_store: string;
  Id_sellers: number;
  Address: string;
  Page_web: string;
  Facebook: string;
  Instagram: string;
  Num_telephone: number;
  Email: string;
  business_description: string;
  Logo: string;
  main_color: string;
  keyword: string;
  active_bank_account_number: number | string;
  state: 1 | 0;
}
