import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LocationsComponent } from './locations/locations.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './menu/menu.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AddLocationComponent } from './locations/add-location/add-location.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from "@angular/forms";
import { LocationService } from "./locations/location.service";
import { GroupService } from "./shared/group.service";
import { EditLocationComponent } from './locations/edit-location/edit-location.component';
import { HttpClientModule , HTTP_INTERCEPTORS } from "@angular/common/http";
import { PathLocationComponent } from './locations/edit-location/path-location/path-location.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoadingInterceptor } from './loading.interceptor';
import { GroupsComponent } from './groups/groups.component';
import { AddGroupComponent } from './groups/add-group/add-group.component';
import { PagenotfoundComponent } from './page-not-found/pagenotfound.component';
import { AccessdeniedComponent } from './accessdenied/accessdenied.component';
import { LicenseComponent } from './license/license.component';
import { YoursettingsComponent } from './your-settings/yoursettings.component';
import { AddMemberComponent } from './groups/add-member/add-member.component';
import { EditGroupComponent } from './groups/edit-group/edit-group.component';
import { ManagersComponent } from './managers/managers.component';
import { CommonModule } from '@angular/common';
import { YourPrivateLocationsComponent } from './your-private-locations/your-private-locations.component';


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
   ],
  imports: [
      BrowserModule,
      AppRoutingModule,
      NgbModule,
      FormsModule,
      HttpClientModule,
      CommonModule
  ],
  providers: [LocationService,GroupService,{
    provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
