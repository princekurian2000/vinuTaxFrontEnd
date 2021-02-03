import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-expence',
  templateUrl: './expence.component.html',
  styleUrls: ['./expence.component.css']
})
export class ExpenceComponent implements OnInit {
  public incomes: any[] = [{
    description: '',
    amount: '',
    date: ''    
  }];
  constructor(private router:Router) {
    if(localStorage.getItem("loggedIn")!="true"){
      this.router.navigate(['']);
    }
   }

  ngOnInit(): void {
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
