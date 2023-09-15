import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {LocationService} from "../../../services/location.service";
import {Location} from "../location.model";
import {UserService} from "../../../services/user.service";
@Component({
  selector: 'app-add-location',
   templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})

export class AddLocationComponent implements OnInit {
  closeModal='';
  locationDescription !: string;
  locationError=false;
  userInfo : any;
  userDetail : any;
  is_manager:any = false;
  @Output() locationToAdd = new EventEmitter<string>();
  constructor(private modalService: NgbModal,private locationService:LocationService, private userService:UserService) {
  }

  ngOnInit(): void {

    this.userService.data$.subscribe(data => {
      this.userInfo = data;
      this.is_manager= this.userInfo.is_manager;
    });
    this.userDetail = this.userService.getUserData();
  }

  open(content:any) {
    this.locationError=false;
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

  onAddLocation(){

    this.locationError=false;
    if(this.locationDescription){
        this.locationToAdd.emit(this.locationDescription);
        this.modalService.dismissAll();
    }else{
       this.locationError=true;
    }

  }

}
