import {Component, Input, OnInit} from '@angular/core';
import {LocationService} from "../locations/location.service";
import {UserService} from "../shared/user.service";
import { AuthService } from '../shared/auth.sevice';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userDetail: any ;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.userDetail = this.authService.getUserData();
    console.log("ssbbbbbbbbbbbss",this.userDetail);
    
  }

}
