import { Component,OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {SharedService} from '../shared.service';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import {Router} from '@angular/router';
import * as bcrypt from 'bcryptjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email="";
  password="";  
  user: SocialUser;
  loggedIn: boolean;
  constructor( private api:ApiService,private authService: SocialAuthService,private router:Router,private sharedService: SharedService) {    
    if(localStorage.getItem("loggedIn")=="true"){
      this.router.navigate(['/dashboard']);
    }
   }  
  ngOnInit(): void {
    
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log("user=" +user);
      this.loggedIn = (user != null);
      if(this.loggedIn){
        this.sharedService.updateComp1Val(user.name);
        this.router.navigate(['/dashboard']);
        localStorage.setItem("uName",user.name);
        localStorage.setItem("loggedIn","true");
      }
    });
  }
  loginUser(){    
    this.password=this.password.trim();
    this.email=this.email.trim();    
    this.api.authenticateUser(this.email,this.password).subscribe((data:any)=>{
    if(data.length>0){       
        bcrypt.compare(this.password, data[0].userPassword, (err, result) => {
          if (err) {
             console.log('bcrypt - error - ', err);
          } else {
             if(result){
               window.alert("success");
               window.alert(data[0].userFullName);
               this.loggedIn=true;
               this.sharedService.updateComp1Val(data[0].userFullName);
               localStorage.setItem("uName",data[0].userFullName);
               localStorage.setItem("loggedIn","true");               
              this.router.navigate(['/dashboard']);
             }
             else{
              window.alert("Invalid  Credentials");
             }
          }
       });
      }
      else{
        window.alert("Invalid  Credentials");
      }  
    }); 
  }
  LoginViaGoogle(){
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);    
  }

}
