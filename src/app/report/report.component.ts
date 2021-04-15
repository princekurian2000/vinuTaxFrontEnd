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
  today = new Date();  
  selectedYear="";  
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
    if((this.today.getTime()> new Date('2020-06-01').getTime())&&(this.today.getTime()< new Date('2021-05-31').getTime())){
      this.selectedYear="20";
    }
    if((this.today.getTime()> new Date('2021-06-01').getTime())&&(this.today.getTime()< new Date('2022-05-31').getTime())){
      this.selectedYear="21";
    }
    if((this.today.getTime()> new Date('2022-06-01').getTime())&&(this.today.getTime()< new Date('2023-05-31').getTime())){
      this.selectedYear="22";
    }
    this.getIncomesAndExpences();
  }

  ngOnInit(): void {
  }
  yearChange(){
    this.getIncomesAndExpences();    
  }
  getIncomesAndExpences(){ 
    this.incomes=[]   ;
    this.expences=[];
    this.consolidatedincomes.clear();
    this.consolidatedexpences.clear();
    this.totalincome=0;
    this.totalexpence=0;
    this.netincome=0;
    this.email=localStorage.getItem("uEmail");   
    this.api.getAllIncomeAndExpences(this.email).subscribe(async (data:any)=>{     
      this.incomes=data[0].incomes;
      this.expences=data[0].expences;
      //year wise income fetching
      for(var i=0;i<this.incomes.length;i++){
        var dateString=this.incomes[i].date;
        let incomeDate = new Date(dateString);  
        if(this.selectedYear=="19"){
          if((incomeDate.getTime()< new Date('2019-06-01').getTime())||(incomeDate.getTime()> new Date('2020-05-31').getTime())){
            this.incomes.splice(i,1);
            i--;
          }
        } 
        else if(this.selectedYear=="20"){
          if((incomeDate.getTime()< new Date('2020-06-01').getTime())||(incomeDate.getTime()> new Date('2021-05-31').getTime())){
            this.incomes.splice(i,1);
            i--;
          }
        }   
        else if(this.selectedYear=="21"){
          if((incomeDate.getTime()< new Date('2021-06-01').getTime())||(incomeDate.getTime()> new Date('2022-05-31').getTime())){
            this.incomes.splice(i,1);
            i--;
          }
        }   
        else if(this.selectedYear=="22"){
          if((incomeDate.getTime()< new Date('2022-06-01').getTime())||(incomeDate.getTime()> new Date('2023-05-31').getTime())){
            this.incomes.splice(i,1);
            i--;
          }
        }  
        else if(this.selectedYear=="23"){
          if((incomeDate.getTime()< new Date('2023-06-01').getTime())||(incomeDate.getTime()> new Date('2024-05-31').getTime())){
            this.incomes.splice(i,1);
            i--;
          }
        } 
        else if(this.selectedYear=="24"){                 
          if((incomeDate.getTime()< new Date('2024-06-01').getTime())||(incomeDate.getTime()> new Date('2025-05-31').getTime())){
            this.incomes.splice(i,1);
            i--;           
          }
        } 
        if(this.selectedYear=="25"){
          if((incomeDate.getTime()< new Date('2025-06-01').getTime())||(incomeDate.getTime()> new Date('2026-05-31').getTime())){
            this.incomes.splice(i,1);
            i--;
          }
        } 
      }
      //yearwise expence fetching
      for(var i=0;i<this.expences.length;i++){
        var dateString=this.expences[i].date;
        let expenceDate = new Date(dateString);  
        if(this.selectedYear=="19"){
          if((expenceDate.getTime()< new Date('2019-06-01').getTime())||(expenceDate.getTime()> new Date('2020-05-31').getTime())){
            this.expences.splice(i,1);
            i--;
          }
        } 
        else if(this.selectedYear=="20"){
          if((expenceDate.getTime()< new Date('2020-06-01').getTime())||(expenceDate.getTime()> new Date('2021-05-31').getTime())){
            this.expences.splice(i,1);
            i--;
          }
        }   
        else if(this.selectedYear=="21"){
          if((expenceDate.getTime()< new Date('2021-06-01').getTime())||(expenceDate.getTime()> new Date('2022-05-31').getTime())){
            this.expences.splice(i,1);
            i--;
          }
        }   
        else if(this.selectedYear=="22"){
          if((expenceDate.getTime()< new Date('2022-06-01').getTime())||(expenceDate.getTime()> new Date('2023-05-31').getTime())){
            this.expences.splice(i,1);
            i--;
          }
        }  
        else if(this.selectedYear=="23"){
          if((expenceDate.getTime()< new Date('2023-06-01').getTime())||(expenceDate.getTime()> new Date('2024-05-31').getTime())){
            this.expences.splice(i,1);
            i--;
          }
        } 
        else if(this.selectedYear=="24"){                 
          if((expenceDate.getTime()< new Date('2024-06-01').getTime())||(expenceDate.getTime()> new Date('2025-05-31').getTime())){
            this.expences.splice(i,1);
            i--;           
          }
        } 
        if(this.selectedYear=="25"){
          if((expenceDate.getTime()< new Date('2025-06-01').getTime())||(expenceDate.getTime()> new Date('2026-05-31').getTime())){
            this.expences.splice(i,1);
            i--;
          }
        } 
      }

      this.incomes.forEach(element => {        
        this.totalincome=this.totalincome+element.amount;
      });
      //for display categorywise in front end
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
