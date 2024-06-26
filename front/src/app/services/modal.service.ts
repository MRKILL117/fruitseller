import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modalRefs: Array<BsModalRef> = [];

  constructor(
    private modalService: BsModalService,
  ) { }

  OpenModal(template: any, keyboard: boolean = true) {
    const modalRef = this.modalService.show(template, {backdrop: 'static', keyboard});
    this.modalRefs.push(modalRef);
  }

  CloseModal(loading: boolean = false) {
    if(this.modalRefs.length && !loading) this.modalRefs.pop()?.hide();
  }

}
