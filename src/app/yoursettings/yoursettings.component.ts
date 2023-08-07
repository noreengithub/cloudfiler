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

  changeFiledMessageLocationSetting(value: any) {
    this.yourSetting.addin_settings_move_filed_messages_to_value = value;
    this.changeSetting("addin_settings_move_filed_messages_to_value", value);
  }

  changeFiledSentMessageLocationSetting(value: any) {
    this.yourSetting.addin_settings_move_filed_sent_messages_to_value = value;
    this.changeSetting("addin_settings_move_filed_sent_messages_to_value", value);
  }

  markMessageSubject(){
    //console.log("markMessageSubject");
    this.yourSetting.addin_settings_mark_filed_messages_subject_value = !this.yourSetting.addin_settings_mark_filed_messages_subject_value;
    
    //this.yourSetting.emit(this.yourSetting);
    this.changeSetting("addin_settings_mark_filed_messages_subject_value", this.yourSetting.addin_settings_mark_filed_messages_subject_value);
  }

  markMessageCategory(){
    //console.log("markMessageCategory");
    this.yourSetting.addin_settings_mark_filed_messages_category_value = !this.yourSetting.addin_settings_mark_filed_messages_category_value;
    this.changeSetting("addin_settings_mark_filed_messages_category_value", this.yourSetting.addin_settings_mark_filed_messages_category_value);
  }

  toggleAutoFileSentEmails(){
    
    this.yourSetting.addin_settings_auto_file_sent_emails_value = !this.yourSetting.addin_settings_auto_file_sent_emails_value;
    this.changeSetting("addin_settings_auto_file_sent_emails_value", this.yourSetting.addin_settings_auto_file_sent_emails_value);
  }

  changeSetting(key: any, value:any) : void {
    console.log(`change setting with key: ${key} to have value: ${value}`);

    this.userService.updateSetting(key, value).subscribe(()  => {} );
  }
}
