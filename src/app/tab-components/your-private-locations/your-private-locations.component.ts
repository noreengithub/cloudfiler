import { Component, OnInit, ViewChild } from '@angular/core';
import { PrivateLocationsService } from '../../services/private-locations.service';
   
@Component({
  selector: 'app-your-private-locations',
  templateUrl: './your-private-locations.component.html',
  styleUrls: ['./your-private-locations.component.css']
})
export class YourPrivateLocationsComponent implements OnInit {

  privateLocations:any = [];
  privateLocationsTotal:any = 0;

  constructor(private privateLocation:PrivateLocationsService ) { } 

  ngOnInit(): void { 
    
    this.privateLocation.getPrivateLocations().subscribe((data:any) => {  
      this.privateLocations = data.results; 
      this.privateLocationsTotal = data.total; 
    }); 
    
  }

  

}
