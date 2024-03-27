import { Component } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../services/user-service.service';
import { CoursMarcheServiceService } from '../services/cours-marche-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserComponent } from '../user/user.component';
import { User } from '../models/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  user!:User;
  listUsers:any;
   closeResult!:string;
   form : boolean = false;
   userComp!:UserComponent

  constructor( private userService:UserService ,private modalService: NgbModal,private http: HttpClient, private router : Router,
    private dataService:CoursMarcheServiceService) { }

    ngOnInit(): void {
      this.getAllUsers();
    /*       this.getByDate(this.date1);
    */
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

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    }
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }
    closeForm(){

    }
    cancel(){
      this.form = false;
    }




}
