import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../api.service'

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  email="";
  incomes=[];
  expences=[];
  totalincome=0;
  totalexpence=0;
  netincome=0;
  constructor(private router:Router,private api:ApiService) { 
    if(localStorage.getItem("loggedIn")!="true"){
      this.router.navigate(['']);
    }
    this.getIncomesAndExpences();
  }

  ngOnInit(): void {
  }
  getIncomesAndExpences(){
    this.email=localStorage.getItem("uEmail");
    this.api.getAllIncomeAndExpences(this.email).subscribe((data:any)=>{     
      this.incomes=data[0].incomes;
      this.expences=data[0].expences;
      //finding total income      
      this.incomes.forEach(element => {        
        this.totalincome=this.totalincome+element.amount;
      });
      //finding total expence      
      this.expences.forEach(element => {        
        this.totalexpence=this.totalexpence+element.amount;
      });
      this.netincome=this.totalincome-this.totalexpence;
    }); 
  }

}
