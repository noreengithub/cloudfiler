import {Group} from "./group.model";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.sevice";

@Injectable({
  providedIn: 'root'
})

export class GroupService{

  constructor( private http:HttpClient, private authService: AuthService  ) { }
  private groups:any = [] ;
  APP_URL = this.authService.getBaseURl();
  Token =  this.authService.getToken();

  getGroups(){
    
    return this.http.get ( this.APP_URL +'groups' , {
      headers: {  "Authorization": "Bearer "+this.Token}
    }).
    pipe(
      map( (responseData:any) => {
        return   responseData;
      })
    );
  }

  getGroupsMembers(groupId:number){

    return this.http.get ( this.APP_URL +'groups/'+groupId+'/members' , {
      headers: {  "Authorization": "Bearer "+this.Token}
    }).
    pipe(
      map( (responseData:any) => {
        return   responseData;
      })
    );
  }

  addGroup(newGroup : string){

    const body =  ({ description: newGroup });
    return this.http.post( this.APP_URL +'groups',  (body),{
        headers: { "Authorization": "Bearer "+this.Token }
    });
  }
  
  addGroupMember(newGroupMember : any,groupId: number){
              
    return this.http.post( this.APP_URL +'groups/'+groupId+'/members',  ( newGroupMember),{
      headers: { "Authorization": "Bearer "+this.Token }
    });  
  }
 
  deleteGroup(id:string){
     
    return this.http.delete( this.APP_URL+'groups/'+id,{
        headers: {  "Authorization": "Bearer "+this.Token }
    });
  }

  deleteGroupMember(id:number,email:string){ 

    return this.http.delete( this.APP_URL+'groups/'+id+"/members/"+email,{
      headers: {  "Authorization": "Bearer "+this.Token }
    });
  }

  updateGroup(group:any){

    let groupUpdated= {
      "description": group.description,
    }

    return this.http.patch(this.APP_URL+ 'groups/'+group.group_id,groupUpdated,{
        headers: {  "Authorization": "Bearer "+this.Token }
    });
  }

}
