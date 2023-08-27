import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDeleteModelComponent } from '../common/confirm-delete-model/confirm-delete-model.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDeleteModelService {

  constructor(private modalService: NgbModal) { }

   confirm(
    title: string,
    message: string,
    second_message: string,
    btnCancelText: string = 'Cancel',
    btnOkText: string = 'OK',
    dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {

    const modalRef = this.modalService.open(ConfirmDeleteModelComponent, { size: dialogSize });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.second_message = second_message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;
    return modalRef.result;
  }

}
