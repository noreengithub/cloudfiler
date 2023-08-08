import { Component } from '@angular/core';
import {LocationService} from "./locations/location.service";
import {GroupService} from "./shared/group.service";
import {UserService} from "./shared/user.service";
import {ActivatedRoute, Router,RoutesRecognized,Event} from "@angular/router";
import {AuthService} from "./shared/auth.sevice";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cloudfiler'; 
  tokeStatus = false;
  hideMenu = false;

  constructor( private  route : ActivatedRoute , private userService: UserService, private authService: AuthService , private router : Router  ) {
    console.log('Environment config');
  }
  ngOnInit(): void {

    let token = this.getParameterByName('access_token');
    //alert("ssdsd");
    // if(token){
    //   this.authService.setToken(token);
    // }else{
    //   this.authService.setToken("");
    // }
 
    this.loadUerData(token);
    
   
    
  }
  
  getParameterByName(name: any) {
    let url = window.location.href;
    name = name.replace(/[[]]/g, "\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);

      console.log("fff",url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2]);
  }

  async loadUerData(token:any)
  {
    
    const httpData = await this.userService.checkUserAuthication(token).toPromise().catch((error)=>{
        this.hideMenu = true; 
        this.tokeStatus = true;
        console.log( this.tokeStatus); 
        this.router.navigate(['/notfound'])
        return false;
    });

    if(httpData ){

      this.tokeStatus = true;  
      this.authService.setToken(token);  
     // this.authService.setUserPersmission(httpData['is_manager'] ? 'manager':'user');
      this.authService.setUserData(httpData);   
     }
 
  }

}

