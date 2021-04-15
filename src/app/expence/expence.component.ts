import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {ApiService} from '../api.service'
@Component({
  selector: 'app-expence',
  templateUrl: './expence.component.html',
  styleUrls: ['./expence.component.css']
})
export class ExpenceComponent implements OnInit {
  public expences: any[] = [{
    description: '',
    amount: '',
    date: ''    
  }];
  options = [];  
  selectedUser: any; 
  email="";
  categoryadded=false;
  constructor(private router:Router,private api:ApiService) {
    if(localStorage.getItem("loggedIn")!="true"){
      this.router.navigate(['']);
    }
    this.api.getExpenceCategories().subscribe((data:any)=>{
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
  }
  updateExpence(){
    //window.alert("Saved Successfully");
    this.email=localStorage.getItem("uEmail");
    if(this.categoryadded==false){
      
      this.expences[0].category=this.expences[0].category.trim();
      if(this.expences[0].category!=""){
        this.api.checkExpenceCategoryAvailable(this.expences[0].category).subscribe((data:any)=>{
          if(data.msg=="Available"){
            window.alert("New Category Found");   
          this.api.insertNewExpenceCategory(this.expences[0].category).subscribe((data:any)=>{
             console.log(data.msg);
             window.alert(data.msg);          
            });
            this.options.push(this.expences[0].category);
          }
          else{       
            //window.alert("Old category");
          }  
        });
      }  

    }
    this.api.updateExpences(this.email,this.expences).subscribe((data:any)=>{
      if(data.msg=="Updated"){
        window.alert("Saved Successfully");
      }
      else{
        window.alert("Please Try after some time");
      }  
    });
    this.router.navigate(['/report']);

  }
  addNewExpenceField(i: number){
    this.categoryadded=true;
    this.expences.push({
      description: '',
      amount: '',
       date: '' 
    });
      //Add category to database
    
      this.expences[i].category=this.expences[i].category.trim();
      if(this.expences[i].category!=""){
        this.api.checkExpenceCategoryAvailable(this.expences[i].category).subscribe((data:any)=>{
          if(data.msg=="Available"){
            window.alert("New Category Found");   
          this.api.insertNewExpenceCategory(this.expences[i].category).subscribe((data:any)=>{
             console.log(data.msg);
             window.alert(data.msg);          
            });
            this.options.push(this.expences[i].category);
          }
          else{       
            //window.alert("Old category");
          }  
        });
      }    
  }
  removeExpenceField(i: number) {
    this.expences.splice(i, 1);
  }
}
