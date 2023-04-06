import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';
import { HttpService } from 'src/app/services/http.service';
import { ModalService } from 'src/app/services/modal.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Array<any> = [];
  clientForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    rfc: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    postalCode: new FormControl('', [Validators.required]),
    utilityPercentage: new FormControl('', []),
    paymentDays: new FormControl('', []),
  });

  constructor(
    public form: FormService,
    public modal: ModalService,
    private toast: ToastService,
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.GetClients();
  }

  GetClients() {
    this.http.Get(`Clients`).subscribe((clients: any) => {
      this.clients = clients;
      console.log(clients);
    }, err => {
      console.error("Error getting clients", err);
    });
  }

  RegisterClient() {
    if(this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      this.toast.ShowDefaultWarning(`Favor de llenar los campos obligatorios`);
    }

    this.http.Post(`Clients`, {client: this.clientForm.value}).subscribe(newClient => {
      this.toast.ShowDefaultSuccess(`Cliente creado exitosamente`);
      this.clientForm.reset();
      this.modal.CloseModal();
    }, err => {
      this.toast.ShowDefaultDanger(`Error al crear cliente`);
      console.error("Error creating client", err);
    });
  }

}
