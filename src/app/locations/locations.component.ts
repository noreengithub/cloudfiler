import {Component, Injectable, Input, OnInit} from '@angular/core';

import  {Location} from "./location.model";
import {LocationService} from "./location.service";
import {Group} from "../shared/group.model";
import {GroupService} from "../shared/group.service";
import {UserService} from "../shared/user.service";

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css'],
})

export class LocationsComponent implements OnInit {
  
  filter: any;
  searchTerm:any;
  openLocation:any;
  locations !: any;
  locationsPermanent !:any ;
  totalLocations !: any;

  isLoading!:true;
  groups !: Group[];

  clickLocation:any;
  clickedGroup:any;
  userInfo : any;
  is_manager:any = false;
  is_admin:any = false;

  permissionsObj = [
    {
      "key" : "None",
      "value" : "None",
    },
    {
      "key" : "User",
      "value" : "User",
    },
    {
      "key" : "Config",
      "value" : "Config",
    },
    {
      "key" : "Full",
      "value" : "Full",
    }
    ] ;

  constructor( private locationService:LocationService,private groupService:GroupService,private userService:UserService) {}

  ngOnInit(): void {

    this.userInfo = this.userService.getUserData();
    this.is_manager = this.userInfo.is_manager || this.userInfo.is_admin;
    this.is_admin = this.userInfo.is_admin;

    // this.userService.data$.subscribe(data => {
    //   this.userInfo = data;
    //   this.is_manager = this.userInfo.is_manager || this.userInfo.is_admin;
    // });
      this.locationService.getLocations().subscribe(locations => {
          this.locations = locations.results;
          this.locationsPermanent = locations.results;
          this.totalLocations=locations.total;
          // this.is_manager = this.userInfo.is_manager || this.userInfo.is_admin;
      });
      this.groupService.getGroups().subscribe(groups => {
         this.groups = groups;
      });


  }

  changeGroupPermission(permission:string, groupId: string, locationId:string ){

    //if(window.confirm('Are sure you want to update the group permissions?')){
      this.locationService.updateGroupPermission( {
        permission: permission,
        groupId: groupId ,
        locationId:locationId
      }).subscribe(response => {
        if(response){
          this.locationService.getLocations().subscribe(locations => {
            this.locations = locations.results;
            this.totalLocations=locations.total;
            this.locationsPermanent = locations.results;
          });
        }
      });
    //}
  }
  changePermission(groupId:any){
    if(this.is_manager){
      this.clickedGroup = groupId;
    }
  }
  deleteLocation(locationId:any){

    //this.openLocation=this.locations[selectedIndex];
    //this.locations.splice(selectedIndex, 1);

    this.locationService.deleteLocation(locationId).subscribe(locations => {
      this.locationService.getLocations().subscribe(locations => {
        this.locations = locations.results;
        this.totalLocations=locations.total;
        this.locationsPermanent = locations.results;
      });
    });
  }

  updatedClickedLocationStatus(click_location:any){

    this.clickLocation =  click_location
  }
  addLocation(newLocation : any){

     this.locationService.addLocation(newLocation).subscribe(responseData => {
        this.locationService.getLocations().subscribe(locations => {
           this.locations = locations.results;
           this.totalLocations=locations.total;
          this.locationsPermanent = locations.results;
        });
     });
  }

  updateLocation(Location:any){

    this.locationService.updateLocation(Location).subscribe(locations => {
      this.locationService.getLocations().subscribe(locations => {
        this.locations = locations.results;
        this.totalLocations=locations.total;
        this.locationsPermanent = locations.results;
      });
    });
  }

  search(value:string){

    //if(this.locations[0].description){
       // this.locations.filter( (locationTest:any) => {
       //   return locationTest.location_id==1;
      //  })
   // }
    if( value!==undefined && value!='' && value !=null) {
      this.locations = this.locations.filter((locationData: any) =>
        locationData.description.toLowerCase().includes(value.toLowerCase())
      );
    }else{
      this.locations= this.locationsPermanent;
    }
  }

  editLocation(locationId:any,canManage:boolean){
    if (canManage) {
      this.clickLocation = locationId;
    }
    else
    {
      this.clickLocation = null;
    }

  }

}
