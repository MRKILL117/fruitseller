import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ModalService } from 'src/app/services/modal.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  constructor(
    public modal: ModalService,
    private toast: ToastService,
    private http: HttpService,
    private nav: NavigationService
  ) { }

  ngOnInit(): void {
  }

  GoHome() {
    this.nav.GoToRoleRoute('');
  }

}
