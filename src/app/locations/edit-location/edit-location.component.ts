import { Component, OnInit ,Input,Output,EventEmitter } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {LocationService} from "../location.service";
import {UserService} from "../../shared/user.service";

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.css']
})

export class EditLocationComponent implements OnInit {
  closeModal='';
  showEditInput=false;
  purpleLocation:any ;
  @Input() selectedLocation: any;
  @Input() clickedLocation: any;

  @Input() selectedIndex: any;
  @Output() locationToDelete = new EventEmitter<string>();
  @Output() editLocationData = new EventEmitter<string>();
  @Output() parentClicklocation = new EventEmitter<string>();
  constructor(private modalService: NgbModal,private locationService:LocationService) {}

  ngOnInit(): void {

  }

  open(content:any) {

    this.modalService.open(content, {size: 'lg', backdrop: 'static' ,ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {

      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });

    if(this.selectedLocation.type){

      (<HTMLInputElement>document.getElementById("checked")).style.display='inline';
      (<HTMLInputElement>document.getElementById("unchecked")).style.display='none';
    }else{

      (<HTMLInputElement>document.getElementById("checked")).style.display='none';
      (<HTMLInputElement>document.getElementById("unchecked")).style.display='inline';
    }
  }

  openSmallModel(content:any) {

    this.modalService.open(content, { size: 'sm', backdrop: 'static' ,ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {

      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

  private getDismissReason(reason: any): string {
    this.clickedLocation = 0;
    this.parentClicklocation.emit(this.clickedLocation);
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }

  }

  allowEditLocationTitle(){

    this.showEditInput=true;
  }

  onSaveLocationTitle(){

    this.editLocationData.emit(this.selectedLocation);
    this.showEditInput=false;
  }

  onDeleteLocation(location:any ){

    if(window.confirm('Are sure you want to delete this location?')){
      this.locationToDelete.emit(location);
      this.modalService.dismissAll();
    }
  }

  setArchive(){

    if(window.confirm('Are sure you want to archive this location?')){

      (<HTMLInputElement>document.getElementById("unchecked")).style.display = 'none';
      this.selectedLocation.type = 1;
      this.editLocationData.emit(this.selectedLocation);
      (<HTMLInputElement>document.getElementById("checked")).style.display = 'inline';

    }else{

      (<HTMLInputElement>document.getElementById("unchecked")).style.display = 'inline';
      (<HTMLInputElement>document.getElementById("checked")).style.display = 'none';

    }

  }

  setUnArchive(){

      if(window.confirm('Are sure you want to unarchive this location?')) {

        (<HTMLInputElement>document.getElementById("checked")).style.display='none';
        this.selectedLocation.type=0;
        this.editLocationData.emit(this.selectedLocation);
        (<HTMLInputElement>document.getElementById("unchecked")).style.display='inline';

      }else{

        (<HTMLInputElement>document.getElementById("checked")).style.display='inline';
        (<HTMLInputElement>document.getElementById("unchecked")).style.display='none';
      }
  }

  saveLocationFile(LocationPathInfo:any){

      this.selectedLocation.path=LocationPathInfo.path;
      this.selectedLocation.sync_path=LocationPathInfo.sync_path;
      this.selectedLocation.autofile_alias=LocationPathInfo.autofile_alias;
      this.editLocationData.emit(this.selectedLocation);
  }

  highlightLocation(locationId:any){
    this.purpleLocation=locationId;
  }
}
