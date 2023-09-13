import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

//the method takes in the user-entered data, specifically the email and password. 
//These values are passed as parameters to the login method when I call it from the login component.

  login(email:string, password:string){

    const loginData ={
      email:email,
      password:password
    };

    return this.http.post('http://localhost:3000/users', loginData)
  }

}
