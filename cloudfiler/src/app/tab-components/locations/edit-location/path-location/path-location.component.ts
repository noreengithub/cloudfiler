import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalDismissReasons, NgbModal , NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import {LocationService} from "../../../../services/location.service";

@Component({
  selector: 'app-path-location',
  templateUrl: './path-location.component.html',
  styleUrls: ['./path-location.component.css']
})
export class PathLocationComponent implements OnInit {

  @Input() selectedIndex: any;
  closeModal='';
  systemFile= '';
  systemFileName='';
  LocationPathInfo: any;
  modalSynPathRef : any;
  mainModelRef : any;
  @Output() LocationFile = new EventEmitter<string>();
  @Input() ActionLocation: any;
  constructor(private modalService: NgbModal,private locationService:LocationService) { }

  ngOnInit(): void {
    this.passLocation(this.ActionLocation.id);
  }
  open(content:any) {

    this.passLocation(this.ActionLocation.id);
    this.mainModelRef =this.modalService.open(content, {   windowClass: 'site_model_class',  backdrop: 'static' ,ariaLabelledBy: 'modal-site-location'});
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

  openSiteModel(content:any) {

      this.modalSynPathRef = this.modalService.open(content, {  windowClass: 'site_path_model',  backdrop: 'static' ,ariaLabelledBy: 'modal-site-path' });
    // this.modalReference = this.modalService.open(content, {   windowClass: 'site_path_model',  backdrop: 'static' ,ariaLabelledBy: 'modal-site-path'});
    // this.modalReference.result.then((result) => {
    //   this.closeModal = `Closed with: ${result}`;
    // }, (reason) => {
    //   this.closeModal = `Dismissed ${this.getDismissReason(reason)}`;
    // });
    //this.PathModel = this.modalService.open(content, {   windowClass: 'site_path_model',  backdrop: 'static' ,ariaLabelledBy: 'modal-site-path'}).result.then((res) => {
    //   this.closeModal = `Closed with: ${res}`;
    //}, (res) => {
    //  this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
     //});
  }

  uploadSystemFile(event:any){

    if(event.target.files[0]){
      this.systemFile = event.target.files[0];
      this.systemFileName=event.target.files[0].name;
    }
  }

  AddSystemFile(){

    this.modalSynPathRef.close();
  }

  AddSystemFileAndSave(){

    this.modalSynPathRef.close();
    if(this.LocationPathInfo.path !=''){
      this.LocationFile.emit( this.LocationPathInfo );
    }
  }

  SaveLocationFile(){

    if(this.LocationPathInfo.path !=''){
      this.LocationFile.emit( this.LocationPathInfo );
    }
    this.mainModelRef.close();
  }

  passLocation(id:string){

    this.locationService.getLocation( id).subscribe(location => {
      this.LocationPathInfo = location;
    });
  }

  removeSyncPath(){
    if(window.confirm('Are sure you want to delete this sync path?')){
      this.LocationPathInfo.sync_path = '';
      this.LocationFile.emit( this.LocationPathInfo );
    }
  }
}
