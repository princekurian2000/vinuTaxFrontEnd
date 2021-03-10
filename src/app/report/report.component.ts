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
  result=[];
  totalincome=0;
  totalexpence=0;
  netincome=0;
  consolidatedincomes = new Map<string, number>();
  consolidatedexpences= new Map<string, number>();
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
    this.api.getAllIncomeAndExpences(this.email).subscribe(async (data:any)=>{     
      this.incomes=data[0].incomes;
      this.expences=data[0].expences;    
      //finding total income      
      this.incomes.forEach(element => {        
        this.totalincome=this.totalincome+element.amount;
      });
      //cumiative income category wise
      for(const {category, amount} of this.incomes) {
              await new Promise<void>(resolve => {                
                  this.consolidatedincomes.set(category, (this.consolidatedincomes.get(category) || 0) + amount);                  
                  resolve();                
            }); 
      }
      //cumiative expence category wise
      for(const {category, amount} of this.expences) {
            await new Promise<void>(resolve => {                
                this.consolidatedexpences.set(category, (this.consolidatedexpences.get(category) || 0) + amount);                  
                resolve();                
             }); 
      }
      
      
     // let jsonString = JSON.stringify(jsonObject);
      
      //finding total expence      
      this.expences.forEach(element => {        
        this.totalexpence=this.totalexpence+element.amount;
      });
      this.netincome=this.totalincome-this.totalexpence;
    }); 
  }

}
