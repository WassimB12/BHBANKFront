import { Component } from '@angular/core';
import { UserService } from '../services/user-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { CoursMarcheServiceService } from '../services/cours-marche-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  users!:User;
  username:any;
  password:any;
 public listUsers:any;
  user:any;
  divAlert:any=false;
  message:any;
  constructor(private userService:UserService ,private modalService: NgbModal,private http: HttpClient, private router : Router,
    private dataService:CoursMarcheServiceService) { }

ngOnInit(): void {
  this.getAllUsers();
/*       this.getByDate(this.date1);
*/
  this.users = {
    id:null,
    username:null,
    email:null,
    password:null,
    role:null
}
this.user = {
  id:null,
  username:null,
  email:null,
  password:null,
  role:null
}
}


getAllUsers(){
this.userService.getAllUsers().subscribe(res => this.listUsers = res);
}

getUserByUsername(u:any){
  this.userService.findUserByUsername(u).subscribe(res => this.user = res);}

  navigate(){
  if (this.user.password==this.password&&this.password!=null) {
    // Navigate to another route if the condition is true
    this.dataService.setSharedValue(this.user.role);
     this.router.navigate(['/home']);
}
else if(this.username==null){this.message="Veuillez saisir votre nom d'utilisateur";this.divAlert=true;}
else if(this.password==null){this.message="Veuillez saisir votre mot de passe";this.divAlert=true;}
else {this.message="Nom d'utilisateur ou mot de passe incorrect";this.divAlert=true;}

}




}
