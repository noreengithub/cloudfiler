import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { LocationsComponent } from "./locations/locations.component";
import {AccountsComponent} from "./accounts/accounts.component";
import {GroupsComponent} from "./groups/groups.component";
import {PagenotfoundComponent} from "./page-not-found/pagenotfound.component";
import {AccessdeniedComponent} from "./accessdenied/accessdenied.component";
import {LicenseComponent} from "./license/license.component";
import {YoursettingsComponent} from "./your-settings/yoursettings.component";
import { ManagersComponent } from './managers/managers.component';
import { AuthguardGuard } from "./shared/authguard.guard";
import { DefaultSettingsComponent } from './default-settings/default-settings.component';
import { YourPrivateLocationsComponent } from './your-private-locations/your-private-locations.component';

const routes: Routes = [
  { path: '', component: LocationsComponent,canActivate:[AuthguardGuard] },
  { path: 'locations', component: LocationsComponent,canActivate:[AuthguardGuard]},
  { path: 'accounts', component: AccountsComponent ,canActivate:[AuthguardGuard]},
  { path: 'groups', component: GroupsComponent,canActivate:[AuthguardGuard ]},
  { path: 'managers', component: ManagersComponent ,canActivate:[AuthguardGuard]},
  { path: 'your-settings', component: YoursettingsComponent,canActivate:[AuthguardGuard]},
  { path: 'license', component: LicenseComponent,canActivate:[AuthguardGuard]},
  { path: 'default-settings', component: DefaultSettingsComponent,canActivate:[AuthguardGuard]},
  { path: 'your-private-locations', component: YourPrivateLocationsComponent,canActivate:[AuthguardGuard]},

  { path: 'notfound', pathMatch: 'full',
    component: PagenotfoundComponent },
  { path: 'accessdenied', pathMatch: 'full',
    component: AccessdeniedComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
