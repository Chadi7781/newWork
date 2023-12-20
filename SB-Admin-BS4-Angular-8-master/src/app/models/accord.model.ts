import { User } from './user.model';

export interface Accord {
  user: User;
  _id: any;
  idUser: any;
  userId: string;
  etatAccord: string;
  // Add other properties as needed
}
