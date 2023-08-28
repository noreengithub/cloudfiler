import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogModalComponent } from '../common/dialog-modal/dialog-modal.component';

@Injectable({
  providedIn: 'root'
})
export class DialogModalService {

  constructor(private modalService: NgbModal) { }

  confirm(
   typeModal : string,
   title: string,
   message: string,
   secondMessage: string,
   btnCancelText: string = 'Cancel',
   btnOkText: string = 'OK',
   dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
    console.log( "test 444",typeModal);
   const modalRef = this.modalService.open(DialogModalComponent, { size: dialogSize });
   modalRef.componentInstance.typeModal = typeModal;
   modalRef.componentInstance.title = title;
   modalRef.componentInstance.message = message;
   modalRef.componentInstance.secondMessage = secondMessage;
   modalRef.componentInstance.btnOkText = btnOkText;
   modalRef.componentInstance.btnCancelText = btnCancelText;

   console.log( "test",modalRef.result);
   return modalRef.result;
 }
}
