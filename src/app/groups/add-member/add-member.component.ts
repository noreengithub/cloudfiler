import { Component,EventEmitter, OnInit, Output, Input} from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/shared/user.service';
 

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {

  closeModal='';
  memberDescription !: string;
  memberError=false; 
  searchGroup:any;
  searchMember:any;
  AllGroupCopy:any;
  AllMembersCopy:any;
  @Output() groupMemberToAdd = new EventEmitter<string>();
  @Input() selectedMembers: any;
  @Input() selectedGroup:any;
  @Input() allGroups:any;
  preSelectedUsers:any;
  @Input() allUserLists: any;
 
  constructor(private modalService: NgbModal ) { 
   
  }

  ngOnInit(): void { 
    this.preSelectedUsers  = [...this.selectedMembers];  
    this.AllGroupCopy =   (this.allGroups);
    this.AllMembersCopy =   (this.allUserLists);

    console.log("sssssssss",this.selectedGroup);
    console.log("aaaaa",this.allGroups);
    console.log("bb",this.allUserLists);
    console.log("bbb",this.AllMembersCopy);
  }

  open(content:any) {
    this.memberError=false;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

   

  private getDismissReason(reason: any): string {
     
    if (reason === ModalDismissReasons.ESC) { 
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) { 
      this.selectedMembers  = [...this.preSelectedUsers];
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onAddGroupMember(){
    
    this.memberError=false; 
      this.groupMemberToAdd.emit(this.selectedMembers);
      this.modalService.dismissAll(); 
  }

  checkedImage(user:any){
    
    let memberData = this.selectedMembers.filter((member: any) =>
        member.email.includes(user)
      );

    if(memberData.length >0) { 
      return true;
     }else{ 
      return false;
    };
  }

  clickMember(user:any, status:any){
    if(status){
      let memberData = this.selectedMembers.forEach((member: any, index:any) =>{ 
        if(member.email==user.email){
          this.selectedMembers.splice(index, 1);
        } 
      }); 
    }else{
      this.selectedMembers.push({"email":user.email});
    } 
  } 
  

  filterGroup(value:string){ 
    if( value!==undefined && value!='' && value !=null) {
      this.allGroups = this.AllGroupCopy.filter((groups: any) =>
      groups.description.toLowerCase().includes(value.toLowerCase())
      );
    }else{ 
      this.allGroups = this.AllGroupCopy;
    }
  }

  filterMembers(value:string){ 
    console.log("zz", value,this.allUserLists,this.AllMembersCopy);
    if (this.AllMembersCopy.length == 0) {
      this.AllMembersCopy =   (this.allUserLists);
    }
    if( value!==undefined && value!='' && value !=null) {
      this.allUserLists = this.AllMembersCopy.filter((member: any) =>
      member.email.toLowerCase().includes(value.toLowerCase())
      );
    }else{
      this.allUserLists= this.AllMembersCopy;
    }
  }

}
