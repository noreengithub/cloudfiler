import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-yoursettings',
  templateUrl: './yoursettings.component.html',
  styleUrls: ['./yoursettings.component.css']
})
export class YoursettingsComponent implements OnInit {

  yourSetting : any;

  constructor(private userService : UserService) { }

  ngOnInit(): void {

    this.userService.userPreferences().subscribe(response => { 
      this.yourSetting  = response;
      console.log("your setting", this.yourSetting);
    });
  }

  markMessage(){
    console.log("markMessage");
    this.yourSetting.addin_settings_mark_filed_messages = !this.yourSetting.addin_settings_mark_filed_messages;
  }

}
