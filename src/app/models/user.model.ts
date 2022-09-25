interface IUser {
  id: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  title: string;
  adress: string;

}

export class User implements IUser {
  userName = '';
  email = '';
  id = '';
  firstName = '';
  lastName = '';
  title = '';
  adress = '';
  age = 0;
}
