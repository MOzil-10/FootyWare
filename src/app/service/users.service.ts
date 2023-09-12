import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../shared/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {



  constructor(private Http:HttpClient) { }

  getUsers(){
    return this.Http.get(' http://localhost:3000/users')
  }

  addUser(user: User) {
   
    return this.Http.post('http://localhost:3000/users', user);
  }

  getProducts(){
    return this.Http.get(' http://localhost:3000/products ')
  }

}
