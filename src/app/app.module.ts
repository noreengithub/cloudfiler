import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { LocationsComponent } from './tab-components/locations/locations.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './layout/menu/menu.component';
import { AccountsComponent } from './tab-components/accounts/accounts.component';
import { AddLocationComponent } from './tab-components/locations/add-location/add-location.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from "@angular/forms";
import { LocationService } from "./services/location.service";
import { GroupService } from "./services/group.service";
import { EditLocationComponent } from './tab-components/locations/edit-location/edit-location.component';
import { HttpClientModule , HTTP_INTERCEPTORS } from "@angular/common/http";
import { PathLocationComponent } from './tab-components/locations/edit-location/path-location/path-location.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoadingInterceptor } from './loading.interceptor';
import { GroupsComponent } from './tab-components/groups/groups.component';
import { AddGroupComponent } from './tab-components/groups/add-group/add-group.component';
import { PagenotfoundComponent } from './page-not-found/pagenotfound.component';
import { AccessdeniedComponent } from './accessdenied/accessdenied.component';
import { LicenseComponent } from './tab-components/license/license.component';
import { YoursettingsComponent } from './tab-components/your-settings/yoursettings.component';
import { AddMemberComponent } from './tab-components/groups/add-member/add-member.component';
import { EditGroupComponent } from './tab-components/groups/edit-group/edit-group.component';
import { ManagersComponent } from './tab-components/managers/managers.component';
import { CommonModule } from '@angular/common';
import { YourPrivateLocationsComponent } from './tab-components/your-private-locations/your-private-locations.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteModalComponent } from './common/delete-modal/delete-modal.component';

@NgModule({
  declarations: [
      AppComponent,
      HeaderComponent,
      LocationsComponent,
      MenuComponent,
      AccountsComponent,
      AddLocationComponent,
      EditLocationComponent,
      PathLocationComponent,
      SpinnerComponent,
      GroupsComponent,
      AddGroupComponent,
      PagenotfoundComponent,
      AccessdeniedComponent,
      LicenseComponent,
      YoursettingsComponent,
      AddMemberComponent,
      EditGroupComponent,
      ManagersComponent, 
      YourPrivateLocationsComponent,
      DeleteModalComponent
   ],
  imports: [
      BrowserModule,
      AppRoutingModule,
      NgbModule,
      FormsModule,
      HttpClientModule,
      CommonModule,
      BrowserAnimationsModule,
      MatDialogModule,
   ],
  providers: [LocationService,GroupService,{
    provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
