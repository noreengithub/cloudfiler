import { Component, OnInit ,Input,Output,EventEmitter } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {LocationService} from "../../../services/location.service";
import { DialogModalService } from 'src/app/services/dialog-modal.service';

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.css']
})

export class EditLocationComponent implements OnInit {
  closeModal='';
  showEditInput=false;
  purpleLocation:any ;
  location_title = '';
  @Input() selectedLocation: any;
  @Input() clickedLocation: any;

  @Input() selectedIndex: any;
  @Output() locationToDelete = new EventEmitter<string>();
  @Output() editLocationData = new EventEmitter<string>();
  @Output() parentClicklocation = new EventEmitter<string>();
  constructor(private dialogModalService: DialogModalService ,private modalService: NgbModal,private locationService:LocationService) {}

  ngOnInit(): void {

  }

  open(content:any) {

    this.modalService.open(content, {size: 'lg', backdrop: 'static' ,ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {

      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });

    this.location_title = this.selectedLocation.description;

    if(this.selectedLocation.type){

      (<HTMLInputElement>document.getElementById("checked")).style.display='inline';
      (<HTMLInputElement>document.getElementById("unchecked")).style.display='none';
    }else{

      (<HTMLInputElement>document.getElementById("checked")).style.display='none';
      (<HTMLInputElement>document.getElementById("unchecked")).style.display='inline';
    }
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

    this.selectedLocation.description =  this.location_title;
    this.editLocationData.emit(this.selectedLocation);
    this.showEditInput=false;
  }

  onDeleteLocation(location:any ){

    //if(window.confirm('Are sure you want to delete this location?')){
    //if(window.confirm('Are sure you want to delete this location?')){
    
    //}
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

  openConfirmationDeleteDialog(location: any) {
    this.dialogModalService.confirm('Delete','Confirm Delete?','Are sure you want to delete this location?',location.description, 'Cancel','Delete')
    .then((confirmed) => {
      if(confirmed){
        this.locationToDelete.emit(location.location_id);
        this.modalService.dismissAll();
      }

      console.log('User confirmed:', confirmed)
    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  openNotImplementDialog(){
    this.dialogModalService.confirm('NotImplement','Not yet implemented','','', 'Close','')
    .then((confirmed) => {
      if(confirmed){ 
      } 
      console.log('User confirmed:', confirmed)
    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
}
