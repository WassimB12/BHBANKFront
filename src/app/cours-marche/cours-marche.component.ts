import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { CoursMarche } from '../models/cours-marche';
import { CoursMarcheServiceService } from '../services/cours-marche-service.service';
 import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

 import { Chart, registerables } from 'chart.js';
import { first, take } from 'rxjs';
 Chart.register(...registerables);
 import { HttpClient } from '@angular/common/http';
 import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-cours-marche',
  templateUrl: './cours-marche.component.html',

  styleUrls: ['./cours-marche.component.css']
})
export class CoursMarcheComponent implements OnInit {
devi!:string;
marche:any;
    listCours : any;
    element:any;
    public chart: any;
now=new Date();
date1:any;
  form : boolean = false;
   cours!: CoursMarche;
   closeResult! : string;

   columnsToDisplay = [/* 'bctA'
  ,'bctV',
    'bhA',
    'bhV',

    'dte','etatEnv', */
    'dev','bhA',
    'bhV','moy'];
  listCoursAll: any;
  listCours1: any;
  dataPoints: any=[];
  dataPoints2: any=[];

role:any;

  constructor(private coursService:CoursMarcheServiceService ,private modalService: NgbModal,private elementRef: ElementRef,private http: HttpClient,
   private  route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllCours();
/*       this.getByDate(this.date1);
 */      this.getFirstByDate(this.formatDate(this.now));
console.log(this.listCoursAll)
    this.cours = {
    id:null,
bctA:null,
bctV:null,
bhA:null,
bhV:null,
dev:null,
dte:null,
etatEnv:null,
mrch:null,
unt:null
  }
 this.role= this.coursService.getSharedValue();

;}


getAllCours(){
  this.coursService.getAllCours().subscribe(res => this.listCoursAll = res)
}
getCours(date:any,mrch:any){
  this.coursService.getCours(date,mrch).subscribe(res => this.listCours = res)}
getByDate(d:any){
  this.coursService.getCoursByDate(d).subscribe(res => this.listCours = res)
}
getFirstByDate(d:any){
   return this.coursService.getFirtByDate(d).subscribe(res1 => this.listCours1 = res1);
}
addCours(p: any){
  this.coursService.addCours(p).subscribe(() => {
    this.getAllCours();
    this.form = false;
  });
}


editCours(cours : CoursMarche){
  this.coursService.editCours(cours).subscribe();
}
deleteCours(idcours : any){
  this.coursService.deleteCours(idcours).subscribe(() => this.getAllCours())
}
 subtractDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
};


   i=this.getFirstByDate(this.formatDate(this.now));




chartOptions = {
  theme: "light2",
  zoomEnabled: true,
  exportEnabled: true,
  title: {
    text:"Historique cours de change(EUR)"
  },
  subtitles: [{
    text: "",
    fontSize: 24,
    horizontalAlign: "center",
    verticalAlign: "center",
    dockInsidePlotArea: true
  }],
  axisY: {
    title: "EUR",
    prefix: ""
  },
  data: [{
    type: "line",
    name: "Closing Price",
    yValueFormatString: " BHA: #,###.00",
    xValueType: "dateTime",
    dataPoints: this.dataPoints
  },{
    type: "line",
    name: "Closing Price",
    yValueFormatString: "BHV: #,###.00",
    xValueType: "dateTime",
    dataPoints: this.dataPoints2
  }]

}

getChartInstance(chart: object) {
  this.chart = chart;
}

statDev() {
  this.dataPoints.pop();
  this.dataPoints2.pop();

this.div4=false;
  this.http.get('http://localhost:8089/SpringMVC/Cours/getDev/'+this.devi, { responseType: 'json' }).subscribe((response: any) => {
    let data = response;
    for(let i = 0; i < data.length; i++){
      this.dataPoints.push({x:new Date(data[i].dte), y: Number(data[i].bhV) });
      this.dataPoints2.push({x:new Date(data[i].dte), y: Number(data[i].bhA) });

    }
    this.div4=true;

  });
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


   changeDateFormat(inputDate: string): string {
    // Split the input date into parts using "-"
    const dateParts = inputDate.split('-');

    // Check if the input date has three parts (year, month, day)
    if (dateParts.length === 3) {
        const year = dateParts[0];
        const month = dateParts[1];
        const day = dateParts[2];

        // Format the date as dd-mm-yyyy
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate;
    } else {
        // Return an empty string or handle the error as needed
        return '';
    }
}
div1:boolean=false;
div2:boolean=true;
div3:boolean=true;
div4:boolean=false;

div1Function(){
    this.div1=true;
    this.div2=false;
    this.div3=false;

}

div2Function(){
    this.div2=true;

}

div3Function(){
    this.div3=true;

}
x:boolean=false;

exportCheck(){
  for (let p of this.listCours){
if (p.etatEnv!='Confirmé')
{this.x=false;
  break;}
  else{this.x=true;}}
return this.x;}



padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}

 formatDate(date: Date) {
  return (
    [date.getDate(),
      this.padTo2Digits(date.getMonth() + 1)
      ,this.padTo2Digits(date.getFullYear()),

    ].join('-')
  );
}}

// Later, after the observable has emitted a value, you can extract the attribute

/* dataPoints: [
    { label:  this.formatDate(this.subtractDays(this.now,11)), y: 3369160 },
    { label: this.formatDate(this.subtractDays(this.now,10)), y: 37080600 },
    { label: this.formatDate(this.subtractDays(this.now,9)), y: 71392100 },
    { label: this.formatDate(this.subtractDays(this.now,8)), y: 46335100 },
    { label: this.formatDate(this.subtractDays(this.now,7)), y: 31866300 },
    { label: this.formatDate(this.subtractDays(this.now,6)), y: 38828400 },
    { label: this.formatDate(this.subtractDays(this.now,5)), y: 35247000 },
    { label: this.formatDate(this.subtractDays(this.now,4)), y: 37830900 },
    { label: this.formatDate(this.subtractDays(this.now,3)), y: 40567600 },
    { label: this.formatDate(this.subtractDays(this.now,2)), y: 39254200 },
    { label: this.formatDate(this.subtractDays(this.now,1)), y: 35035400 },
    { label: "Dec", y: 31465900 }
  ] */

