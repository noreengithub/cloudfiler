import { Component, OnInit } from '@angular/core';
import { GroupService } from '../shared/group.service';
import {Group} from "../shared/group.model";
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.css']
})
export class ManagersComponent implements OnInit {

  groups !: Group[];
  activeGroup : any;
  selectGroup : any; 
  userLists = []; 
  
  constructor(private groupService : GroupService ,  private userService : UserService) { }
 
  groupDetails :any ;
 
  ngOnInit(): void {

    this.userService.getAllUsers().subscribe(users => { 
      this.userLists = users;
    }); 

    this.groupService.getGroupsMembers(0).subscribe(groups => { 
      this.selectGroup = groups; 
      
    });   

    this.activeGroup = 0;

    this.groupService.getGroups().subscribe(groups => { 
      this.groups = groups;  
    });
 
  }
  addMember(newMebers:any){ 
    this.groupService.getGroupsMembers(this.activeGroup).subscribe(group => {
      if(group.users.length>0){ 
        group.users.forEach((groupMember:any,index:any)=>{  
          this.groupService.deleteGroupMember(this.activeGroup,groupMember.email).subscribe(response => {
              if(group.users.length == index+1 ){
                this.groupService.addGroupMember(newMebers,this.activeGroup).subscribe(()  => { 
                  
                  this.activeGroup= 0; 
                  this.groupService.getGroupsMembers(0).subscribe(groups => { 
                    this.selectGroup = groups;
                  });  
                 });
              }
          });  
        });  
      }else{
        this.groupService.addGroupMember(newMebers,this.activeGroup).subscribe(()  => { 
          
         this.activeGroup= 0; 
         this.groupService.getGroupsMembers(0).subscribe(groups => {
           
           this.selectGroup = groups;
          }); 
        });
      }   
    });  
  }

  deleteGroup(groupId:any){
    
    if(window.confirm('Are sure you want to delete this group?')){
      this.groupService.deleteGroup(groupId).subscribe(groups => {
        this.groupService.getGroups().subscribe(groups => {
        
          this.groups = groups;
          if(groups[0]){
            this.activeGroup = groups[groups.length -1].group_id;
            this.activeGroup= 0; 
            this.groupService.getGroupsMembers(0).subscribe(groups => {
              
              this.selectGroup = groups;
            });
             
          }
        });
      });
    }
   
  }

  deleteGroupMember(groupMember:string){
    
    if(window.confirm('Are sure you want to delete this member?')){
      this.groupService.deleteGroupMember(this.activeGroup,groupMember).subscribe(() => {
        this.activeGroup= 0; 
        this.groupService.getGroupsMembers(0).subscribe(groups => {
          
          this.selectGroup = groups;
        });
      });
    }
  }

}
