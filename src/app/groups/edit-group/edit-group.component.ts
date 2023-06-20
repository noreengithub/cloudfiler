import { Component,EventEmitter, OnInit, Output,Input} from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent implements OnInit {

  closeModal='';
  groupError=false;
  @Output() groupToEdit = new EventEmitter<string>();
  @Input() selectedGroup: any;
  groupDescription !: string;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.groupDescription = this.selectedGroup.description;
  }

  open(content:any) {
    this.groupError=false;
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
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onEditGroup(){
     
    this.groupError=false;
    if(this.groupDescription){
      
        this.selectedGroup.description = this.groupDescription;
        this.groupToEdit.emit(this.selectedGroup);
        this.modalService.dismissAll();
    }else{
       
       this.groupError=true;
    }
  }

}
