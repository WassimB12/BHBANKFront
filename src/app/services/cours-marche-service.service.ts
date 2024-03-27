import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursMarcheServiceService {

  readonly API_URL = 'http://localhost:8089/SpringMVC/Cours';


  constructor(private httpClient: HttpClient) { }

  getAllCours() {
    return this.httpClient.get(`${this.API_URL}/CoursMarches`)
  }
  getCoursByDate(date:any) {
    return this.httpClient.get(`${this.API_URL}/retrieveByDate/${date}`)
  }
  getFirtByDate(date:any) {
    return this.httpClient.get(`${this.API_URL}/firstDate/${date}`)
  }
  addCours(coursMarche : any) {
    return this.httpClient.post(`${this.API_URL}/add`, coursMarche)
  }
  editCours(coursMarche : any){
    return this.httpClient.put(`${this.API_URL}/update`, coursMarche)
  }
  deleteCours(idCour : any){
    return  this.httpClient.delete(`${this.API_URL}/delete/${idCour}`)
  }

  getCours(date:any,mrch:any){
    return this.httpClient.get(`${this.API_URL}/getCours/${date}/${mrch}`)
  }
  private sharedValue!: string ;

  setSharedValue(value: string) {
    this.sharedValue = value;
  }

  getSharedValue(): string {
    return this.sharedValue;
  }
}
