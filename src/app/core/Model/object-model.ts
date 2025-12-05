export class User {
  name!: string;
  mobNumber!: string;
  age!: number;
  dob!: string;
  email!: string;
  password!: string;
  address!: Address;
  language!: string;
  gender!: string;
  aboutYou!: string;
  uploadPhoto!: string;
  role!: string;
  agreetc!: boolean;
}
export class Address {
  id!: number;
  addressLine1!: string;
  addressLine2!: string;
  city!: string;
  state!: string;
  zipCode!: number;
}
export class Product {
  id!: number;
  name!: string;
  photo!: string;
  productDesc!: string;
  mrp!: number;
  dp!: number;
  status!: string;
}
export class Orders {
  id!: number;
  userId!: number;
  product!: Product;
  deliveryAddress!: Address;
  contact!: number;
  dateTime!: string;
}
