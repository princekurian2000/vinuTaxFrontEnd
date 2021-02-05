import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../api.service'

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
   options = [];  
  selectedUser: any; 
  email="";
//category drop down ends
  constructor(private router:Router,private api:ApiService) { 
    if(localStorage.getItem("loggedIn")!="true"){
      this.router.navigate(['']);
    }
    this.username=localStorage.getItem("uName"); 
    this.api.getCategories().subscribe((data:any)=>{
      console.log(data);
      // data.forEach(myFunction);
      // function myFunction(value) {
      //  this.options.push(value.category);
      // }
      data.forEach(element => {
        this.options.push(element.category);
      });

    });  
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
    //window.alert("Saved Successfully");
    this.email=localStorage.getItem("uEmail");
    this.api.updateIncomes(this.email,this.incomes).subscribe((data:any)=>{
      if(data.msg=="Updated"){
        window.alert("Saved Successfully");
      }
      else{
        window.alert("Please Try after some time");
      }  
    });
    this.router.navigate(['/expence']);
  }
  addNewIncomeField(i: number){
    this.incomes.push({
      description: '',
      amount: '',
       date: '' 
    });
    //Add category to database
    
    this.incomes[i].category=this.incomes[i].category.trim();
    if(this.incomes[i].category!=""){
      this.api.checkCategoryAvailable(this.incomes[i].category).subscribe((data:any)=>{
        if(data.msg=="Available"){
          window.alert("New Category Found");   
        this.api.insertNewCategory(this.incomes[i].category).subscribe((data:any)=>{
           console.log(data.msg);
           window.alert(data.msg);          
          });
          this.options.push(this.incomes[i].category);
        }
        else{       
          //window.alert("Old category");
        }  
      }); 
    }
    
  }


  removeIncomeField(i: number) {
    this.incomes.splice(i, 1);
  }
  

}
