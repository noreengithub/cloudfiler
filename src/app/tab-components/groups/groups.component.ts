import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../services/group.service';
import {Group} from "../../shared/group.model";
import { UserService } from '../../services/user.service';
import { ConfirmDeleteModelService } from 'src/app/services/confirm-delete-model.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  userDetail: any ;
  
  constructor(private confirmationDeleteModelService: ConfirmDeleteModelService ,private groupService:GroupService, private userService : UserService) { }

  groups !: Group[];
  activeGroup : any;
  selectGroup : any; 
  userLists = []; 

  ngOnInit(): void {
    this.userDetail = this.userService.getUserData();
    // if (!this.userDetail.is_admin && !this.userDetail.is_manager) {
    //   // redirect to /locations
    // }

    this.groupService.getGroups().subscribe(groups => {
      
      this.groups = groups;
      if(this.userDetail.is_admin && groups[1]){
        this.activeGroup = groups[1].group_id;
        //console.log(groups[1]);
        //this.selectGroup=groups[0];
        this.clickGroup(groups[1].group_id);
      }
      else if(groups[2]){ // CF TODO: change this from groups[1] to groups[0];
        this.activeGroup = groups[2].group_id;
        //console.log(groups[2]);
        //this.selectGroup=groups[0];
        this.clickGroup(groups[2].group_id);
      }
    });

    this.userService.getAllUsers().subscribe(users => { 
      this.userLists = users;
    });
  }

  clickGroup(groupId:number){

    this.activeGroup= groupId; 
    this.groupService.getGroupsMembers(groupId).subscribe(groups => {
      
      this.selectGroup = groups;
     }); 
  }

  addMember(newMebers:any){ 
    this.groupService.getGroupsMembers(this.activeGroup).subscribe(group => {
      if(group.users.length>0){ 
        group.users.forEach((groupMember:any,index:any)=>{  
          this.groupService.deleteGroupMember(this.activeGroup,groupMember.email).subscribe(response => {
              if(group.users.length == index+1 ){
                this.groupService.addGroupMember(newMebers,this.activeGroup).subscribe(()  => { 
                  console.log("single added"); 
                   this.clickGroup( this.activeGroup);
                 });
              }
          });  
        });  
      }else{
        this.groupService.addGroupMember(newMebers,this.activeGroup).subscribe(()  => { 
         console.log("single added"); 
          this.clickGroup( this.activeGroup);
        });
      }   
    });  
  }

  addGroup( newGroup:any){
     
    this.groupService.addGroup(newGroup).subscribe(()  => {
      this.groupService.getGroups().subscribe(groups => {
      
        this.groups = groups;
        if(groups[0]){
          this.activeGroup = groups[groups.length -1].group_id;
          this.clickGroup( groups[groups.length -1].group_id);
        }
      });
    });
    
 }

  deleteGroup(groupId:any){
    
    if(window.confirm('Are sure you want to delete this group?')){
      this.groupService.deleteGroup(groupId).subscribe(groups => {
        this.groupService.getGroups().subscribe(groups => {
        
          this.groups = groups;
          if(groups[0]){
            this.activeGroup = groups[groups.length -1].group_id;
            this.clickGroup( this.activeGroup);
             
          }
        });
      });
    }
   
  }

  deleteGroupMember(groupMember:string){
    
    if(window.confirm('Are sure you want to delete this member?')){
     this.groupService.deleteGroupMember(this.activeGroup,groupMember).subscribe(() => {
       this.clickGroup( this.activeGroup); 
      });
    }
  }

  editGroup(group:any){

    this.groupService.updateGroup(group).subscribe(() => {
      this.selectGroup.description = group.description;
      this.groupService.getGroups().subscribe(groups => {
        
        this.groups = groups;
        if(groups[0]){
          this.activeGroup = groups[groups.length -1].group_id;
           
        }
      });
    });
     
  }

  public openConfirmationDeleteDialog(group: any) {
    this.confirmationDeleteModelService.confirm('Confirm Delete?','Are sure you want to delete this group?',group.description, 'Cancel','Delete')
    .then((confirmed) => {
      if(confirmed){
        this.groupService.deleteGroup(group.group_id).subscribe(groups => {
          this.groupService.getGroups().subscribe(groups => {
          
            this.groups = groups;
            if(groups[0]){
              this.activeGroup = groups[groups.length -1].group_id;
              this.clickGroup( this.activeGroup);
               
            }
          });
        });
      }
    console.log('User confirmed:', confirmed)
    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

}
