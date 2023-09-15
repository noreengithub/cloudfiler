import { Component, OnInit, ViewChild } from '@angular/core';
import { PrivateLocationsService } from '../../services/private-locations.service';
import { LocationService } from 'src/app/services/location.service';
import { DialogModalService } from 'src/app/services/dialog-modal.service';
   
@Component({
  selector: 'app-your-private-locations',
  templateUrl: './your-private-locations.component.html',
  styleUrls: ['./your-private-locations.component.css']
})
export class YourPrivateLocationsComponent implements OnInit {

  privateLocations:any = [];
  privateLocationsTotal:any = 0;

  constructor(private privateLocation:PrivateLocationsService ,
    private locationService:LocationService,
    private dialogModalService:DialogModalService) { } 

  ngOnInit(): void { 
    
    this.privateLocation.getPrivateLocations().subscribe((data:any) => {  
      this.privateLocations = data.results; 
      this.privateLocationsTotal = data.total; 
    }); 
    
  }

  addLocation(newLocation : any){ 

    this.locationService.addLocation(newLocation).subscribe(responseData  => {
       this.locationService.getLocations().subscribe(locations  => {
          this.privateLocations = locations.results;
          this.privateLocationsTotal=locations.total;
         //this.locationsPermanent = locations.results;
       });
    });
 }

 deleteLocation(locationId:any){
 
  this.locationService.deleteLocation(locationId).subscribe(locations => {
    this.locationService.getLocations().subscribe(locations => {
      this.privateLocations = locations.results;
      this.privateLocationsTotal=locations.total; 
    });
  });
}

 openConfirmationDeleteDialog(location: any) {
  console.log("location",location);
  this.dialogModalService.confirm('Delete','Confirm Delete?','Are sure you want to delete this location?',location.description, 'Cancel','Delete')
  .then((confirmed) => {
    if(confirmed){
      this.deleteLocation(location.id); 
    }

    console.log('User confirmed:', confirmed)
  })
  .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
}

  

}
