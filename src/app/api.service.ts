import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  findHash(str:string){   
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(str, 10);
  }
  insertNewUser(userfullname:string,useremail:string,password:string){      
    return this.http.post("http://localhost:3000/insert",{"userFullName":userfullname,"userEmailId":useremail,"userPassword":this.findHash(password)})
  }
  checkUserNameAvailable(userEmail:String){
    //return this.http.post("https://exambackend.herokuapp.com/insert",{"user":user})     
    return this.http.post("http://localhost:3000/checkAvailability",{"userEmailId":userEmail}) ;  
  }
  authenticateUser(userEmail:string,password:string){    
    return this.http.post("http://localhost:3000/authenticate",{"userEmailId":userEmail,"password":this.findHash(password)}) ; 
  }
}
