import { Component, OnInit } from '@angular/core';
import { DefaultSettingsService } from 'src/app/services/defaultSettings.service';

@Component({
  selector: 'app-default-settings',
  templateUrl: './default-settings.component.html',
  styleUrls: ['./default-settings.component.css']
})
export class DefaultSettingsComponent implements OnInit {

  defaultSetting : any;

  constructor(private defaultSettingService : DefaultSettingsService) { }

  ngOnInit(): void {

    this.defaultSettingService.defaultSettings().subscribe(response => { 
      this.defaultSetting  = response;
      console.log("default setting", this.defaultSetting);
    });
  }

  changeFiledMessageLocationSetting(value: any) {
    this.defaultSetting.addin_settings_move_filed_messages_to_value = value;
    this.changeSetting("addin_settings_move_filed_messages_to_value", value);
  }

  changeFiledSentMessageLocationSetting(value: any) {
    this.defaultSetting.addin_settings_move_filed_sent_messages_to_value = value;
    this.changeSetting("addin_settings_move_filed_sent_messages_to_value", value);
  }

  markMessageSubject(){
    //console.log("markMessageSubject");
    this.defaultSetting.addin_settings_mark_filed_messages_subject_value = !this.defaultSetting.addin_settings_mark_filed_messages_subject_value;
    
    //this.yourSetting.emit(this.yourSetting);
    this.changeSetting("addin_settings_mark_filed_messages_subject_value", this.defaultSetting.addin_settings_mark_filed_messages_subject_value);
  }

  markMessageCategory(){
    //console.log("markMessageCategory");
    this.defaultSetting.addin_settings_mark_filed_messages_category_value = !this.defaultSetting.addin_settings_mark_filed_messages_category_value;
    this.changeSetting("addin_settings_mark_filed_messages_category_value", this.defaultSetting.addin_settings_mark_filed_messages_category_value);
  }

  toggleAutoFileSentEmails(){
    
    this.defaultSetting.addin_settings_auto_file_sent_emails_value = !this.defaultSetting.addin_settings_auto_file_sent_emails_value;
    this.changeSetting("addin_settings_auto_file_sent_emails_value", this.defaultSetting.addin_settings_auto_file_sent_emails_value);
  }

  toggleLock(key: any) {
    this.defaultSetting[key] = !this.defaultSetting[key];
    this.changeSetting(key, this.defaultSetting[key]);
  }

  changeSetting(key: any, value:any) : void {
    console.log(`change setting with key: ${key} to have value: ${value}`);

    this.defaultSettingService.updateSetting(key, value).subscribe(()  => {} );
  }

}
