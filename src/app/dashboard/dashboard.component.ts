import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username="";
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

}
