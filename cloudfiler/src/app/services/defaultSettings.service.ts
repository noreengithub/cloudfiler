import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {AuthService} from "../services/auth.sevice";
import { Subject } from 'rxjs';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class DefaultSettingsService {

  constructor(private http:HttpClient , private authService :AuthService,private router: Router) { }
  APP_URL = this.authService.getBaseURl();
  token =  this.authService.getToken();

  defaultSettings(){
    this.token = this.authService.getToken();
    
    return this.http.get ( this.APP_URL +'default/preferences' , {
      headers: {  "Authorization": "Bearer "+this.token}
    }).
    pipe(
      map( (responseData:any) => {
        return   responseData;
      })
    ); 
  }

  updateSetting(key: any, value:any) {
    console.log(`updateSetting called with key: ${key} to have value: ${value}`);

    type ValueType = {
      [key: string]: any
    };
    let body : ValueType =  {};
    body[key] = value;
    console.log(`updateSetting called with body: ${body}`);

    return this.http.put ( this.APP_URL + 'default/preferences', body , {
      headers: {  "Authorization": "Bearer "+ this.token}
    }); 
  }

}
