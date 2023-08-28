import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dialog-modal',
  templateUrl: './dialog-modal.component.html',
  styleUrls: ['./dialog-modal.component.css']
})
export class DialogModalComponent implements OnInit {

  @Input() typeModal: any;
  @Input() title: any;
  @Input() message: any;
  @Input() secondMessage: any;
  @Input() btnOkText: any;
  @Input() btnCancelText: any; 
  image:string= '';

  constructor(private activeModal: NgbActiveModal) {
 
   
  }

  ngOnInit(): void {
    if(this.typeModal=='Delete'){
      this.image = 'bomb.svg';
    }else if(this.typeModal=='NotImplement'){
      this.image = 'rench2.png';
    }else{
      this.image = 'flushed.svg';
    }
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
