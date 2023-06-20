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
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AccessdeniedComponent } from './accessdenied/accessdenied.component';
import { LicenseComponent } from './license/license.component';
import { PrivatesettingsComponent } from './privatesettings/privatesettings.component';
import { SettingsComponent } from './settings/settings.component';
import { YoursettingsComponent } from './yoursettings/yoursettings.component';
import { YourprivatesettingsComponent } from './yourprivatesettings/yourprivatesettings.component';
import { AddMemberComponent } from './groups/add-member/add-member.component';
import { EditGroupComponent } from './groups/edit-group/edit-group.component';
import { ManagersComponent } from './managers/managers.component';


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
      PrivatesettingsComponent,
      SettingsComponent,
      YoursettingsComponent,
      YourprivatesettingsComponent,
      AddMemberComponent,
      EditGroupComponent,
      ManagersComponent
   ],
  imports: [
      BrowserModule,
      AppRoutingModule,
      NgbModule,
      FormsModule,
      HttpClientModule
  ],
  providers: [LocationService,GroupService,{
    provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
