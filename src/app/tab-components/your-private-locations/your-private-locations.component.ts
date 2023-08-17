import { Component, OnInit, ViewChild } from '@angular/core';
import { PrivateLocationsService } from '../../services/private-locations.service';
import { DeleteModalComponent } from 'src/app/common/delete-modal/delete-modal.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
  
@Component({
  selector: 'app-your-private-locations',
  templateUrl: './your-private-locations.component.html',
  styleUrls: ['./your-private-locations.component.css']
})
export class YourPrivateLocationsComponent implements OnInit {

  privateLocations:any = [];
  privateLocationsTotal:any = 0;

  constructor(private privateLocation:PrivateLocationsService ,private dialog: MatDialog) { } 

  ngOnInit(): void { 
    
    this.privateLocation.getPrivateLocations().subscribe((data:any) => {  
      this.privateLocations = data.results; 
      this.privateLocationsTotal = data.total; 
    }); 
    
  }

  openDialog(): void {
    const dialogRef: MatDialogRef<DeleteModalComponent> = this.dialog.open(DeleteModalComponent, {
      width: '400px',
      data: { message: 'Hello, this is a dialog!' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
