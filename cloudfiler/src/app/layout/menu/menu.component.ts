import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { AuthService } from 'src/app/services/auth.sevice';
 
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  permission:any = "manager";
  selectedTab =  "";
  userDetail: any ;

  constructor( private route: Router, private authService: AuthService) { }

  ngOnInit(): void {
    //this.permission = this.authService.getUserPermission;
    console.log("-----------");
    console.log( this.permission);
    this.selectedTab = window.location.pathname.split('/')[1] ;
    console.log(this.selectedTab);
    this.userDetail = this.authService.getUserData();
  }

  onSelect(feature:string ){
    this.route.navigate([feature],{ queryParams: {access_token: this.authService.getToken() }});
  }

}