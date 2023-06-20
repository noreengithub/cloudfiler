import {Location} from "./location.model";
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {AuthService} from "../shared/auth.sevice";

@Injectable({
  providedIn: 'root'
})
export class LocationService{

    constructor(private http:HttpClient  , private authService: AuthService   ) { }
    private  locations:any;
    APP_URL = this.authService.getBaseURl();
    token =  this.authService.getToken();
    getLocations(){
        return this.http.get ( this.APP_URL +'locations/access?all_groups=true', {
            headers: {  "Authorization": "Bearer "+this.token}
        }).
        pipe(
            map( (responseData:any) => {
                return   responseData;
            })
        );
    }

    getAccessLocations(){
      return this.http.get ( this.APP_URL +'locations/access', {
        headers: {  "Authorization": "Bearer "+this.token}
      }).
      pipe(
          map( (responseData:any) => {
            return   responseData;
        })
      );
    }
    addLocation(newLocation : string){
        const body =  ({ description: newLocation,sync_path:'' });
        return this.http.post( this.APP_URL +'locations',  (body),{
            headers: { "Authorization": "Bearer "+this.token }
        });
   }
    updateLocation(location:any){

      let locationUpdated= {
        "description": location.description,
        "sync_path": location.sync_path ,
        //"autofile_alias": location.autofile_alias ,
        "type": location.type
      }

      return this.http.patch(this.APP_URL+ 'locations/'+location.id,locationUpdated,{
          headers: {  "Authorization": "Bearer "+this.token }
      });
    }

    deleteLocation(id:string){
        return this.http.delete( this.APP_URL+'locations/'+id,{
            headers: {  "Authorization": "Bearer "+this.token }
        });
    }

   getLocation(id:string){

    return this.http.get ( this.APP_URL+'locations/'+id , {
      headers: {  "Authorization": "Bearer "+this.token}
    }).
    pipe(
      map( (responseData:any) => {
        return   responseData;
      })
    );
   }

  updateGroupPermission(data:any){
    return this.http.patch( this.APP_URL+'locations/'+data.locationId+"/access"  ,([{"permission":data.permission,"group_id":data.groupId}]), {
      headers: {  "Authorization": "Bearer "+this.token}
    });
  }
}
