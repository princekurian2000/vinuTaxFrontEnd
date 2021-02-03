import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username="";
  public incomes: any[] = [{
    category: '',    
    description: '',
    amount: '',
    date: ''    
  }];  
   options = ["Small", "Medium","Large"];  
  selectedUser: any; 
//category drop down ends
  constructor(private router:Router) { 
    if(localStorage.getItem("loggedIn")!="true"){
      this.router.navigate(['']);
    }
    this.username=localStorage.getItem("uName");    
  }

  ngOnInit(): void {
    this.username=localStorage.getItem("uName");
  }
  logout(){
    localStorage.removeItem("uName");
    localStorage.removeItem("loggedIn");
    this.router.navigate(['']);
  }
  updateIncome(){
    window.alert("Saved Successfully");
  }
  addNewIncomeField(){
    this.incomes.push({
      description: '',
      amount: '',
       date: '' 
    });
  }
  removeIncomeField(i: number) {
    this.incomes.splice(i, 1);
  }
  

}
