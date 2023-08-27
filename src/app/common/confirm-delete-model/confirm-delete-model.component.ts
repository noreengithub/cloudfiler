import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-delete-model',
  templateUrl: './confirm-delete-model.component.html',
  styleUrls: ['./confirm-delete-model.component.css']
})
export class ConfirmDeleteModelComponent implements OnInit {
  
  @Input() title: any;
  @Input() message: any;
  @Input() second_message: any;
  @Input() btnOkText: any;
  @Input() btnCancelText: any; 

  
  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }
 
  public decline() {
    this.activeModal.close(false);
  }

  public accept() {
    this.activeModal.close(true);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

}
 