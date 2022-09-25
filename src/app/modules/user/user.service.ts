import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) { }
  BASE_URL = 'https://shift-app-6e06d-default-rtdb.europe-west1.firebasedatabase.app/users'

  createNewUser(userDetails: Partial<User>) {
    return this.httpClient.post(this.BASE_URL, userDetails);
  }

  editUser(id: string, userDetails: Partial<User>) {
    return this.httpClient.patch(this.BASE_URL + "/" + id, userDetails);
  }


  getUser(id: string) {
    return this.httpClient.get(this.BASE_URL, {
      params: {
        orderBy: '"id"',
        equalTo: `"${id}"`
      }
    });
  }
}