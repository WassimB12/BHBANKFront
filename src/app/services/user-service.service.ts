import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly API_URL = 'http://localhost:8089/SpringMVC/User';

  constructor(private httpClient: HttpClient) { }

  getAllUsers() {
    return this.httpClient.get(`${this.API_URL}/Users`)
  }


  addUsers(User : any) {
    return this.httpClient.post(`${this.API_URL}/add`, User)
  }
  editUsers(User : any){
    return this.httpClient.put(`${this.API_URL}/update`, User)
  }
  deleteUsers(idUser : any){
    return  this.httpClient.delete(`${this.API_URL}/delete/${idUser}`)
  }
findUserByUsername(u:any){
  return this.httpClient.get(`${this.API_URL}/user1/${u}`)
}

}
