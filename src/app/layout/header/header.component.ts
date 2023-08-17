import {Component, Input, OnInit} from '@angular/core'; 
import { AuthService } from 'src/app/services/auth.sevice';
 
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
    
  }

}
