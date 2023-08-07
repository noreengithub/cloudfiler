import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { LocationsComponent } from "./locations/locations.component";
import {AccountsComponent} from "./accounts/accounts.component";
import {GroupsComponent} from "./groups/groups.component";
import {PagenotfoundComponent} from "./pagenotfound/pagenotfound.component";
import {AccessdeniedComponent} from "./accessdenied/accessdenied.component";
import {LicenseComponent} from "./license/license.component";
import {SettingsComponent} from "./settings/settings.component";
import {YoursettingsComponent} from "./yoursettings/yoursettings.component";
import {YourprivatesettingsComponent} from "./yourprivatesettings/yourprivatesettings.component";
import { ManagersComponent } from './managers/managers.component';
import { AuthguardGuard } from "./shared/authguard.guard";

const routes: Routes = [
  { path: '', component: LocationsComponent,canActivate:[AuthguardGuard] },
  { path: 'locations', component: LocationsComponent,canActivate:[AuthguardGuard]},
  { path: 'accounts', component: AccountsComponent ,canActivate:[AuthguardGuard]},
  { path: 'groups', component: GroupsComponent,canActivate:[AuthguardGuard ]},
  { path: 'managers', component: ManagersComponent ,canActivate:[AuthguardGuard]},
  { path: 'your-settings', component: YoursettingsComponent,canActivate:[AuthguardGuard]},
  { path: 'license', component: LicenseComponent,canActivate:[AuthguardGuard]},
  { path: 'settings', component: SettingsComponent,canActivate:[AuthguardGuard]},
  { path: 'your-private-settings', component: YourprivatesettingsComponent,canActivate:[AuthguardGuard]},

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
