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
  selectedClient: any = null;
  isEditing: boolean = false;
  clientForm: FormGroup = new FormGroup({
    id: new FormControl(null, []),
    name: new FormControl('', [Validators.required]),
    rfc: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z0-9]{12,13}$/)]),
    address: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    postalCode: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{5}$/)]),
    utilityPercentage: new FormControl('', [Validators.pattern(/^[0-9]*$/)]),
    paymentDays: new FormControl('', [Validators.pattern(/^[0-9]*$/)]),
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
    }, err => {
      console.error("Error getting clients", err);
    });
  }

  RegisterClient() {
    if(this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      this.toast.ShowDefaultWarning(`Favor de llenar los campos obligatorios`);
    }

    if(this.isEditing) {
      this.UpdateClient();
      return;
    }

    this.http.Post(`Clients`, {client: this.clientForm.value}).subscribe(newClient => {
      this.GetClients();
      this.toast.ShowDefaultSuccess(`Cliente creado exitosamente`);
      this.clientForm.reset();
      this.modal.CloseModal();
    }, err => {
      this.toast.ShowDefaultDanger(`Error al crear cliente`);
      console.error("Error creating client", err);
    });
  }

  OnFileSelected($event: any) {
    
  }

  RegisterClients() {

  }

  UpdateClient() {
    const client = this.clientForm.value;
    this.http.Patch(`Clients`, {client}).subscribe(clientSaved => {
      this.GetClients();
      this.toast.ShowDefaultSuccess(`Cliente actualizado con éxito`);
      this.modal.CloseModal();
      this.isEditing = false;
    }, err => {
      console.error("Error patching client", err);
      this.toast.ShowDefaultDanger(`Error al actualizar cliente`);
    });
  }

  EditClient(client: any) {
    this.isEditing = true;
    for (const key in this.clientForm.controls) {
      if (Object.prototype.hasOwnProperty.call(this.clientForm.controls, key)) {
        const control = this.clientForm.controls[key];
        control.setValue(client[key]);
      }
    }
  }

  DeleteClient() {
    this.http.Delete(`Clients/${this.selectedClient.id}`, {}).subscribe(deletedClient => {
      this.GetClients();
      this.toast.ShowDefaultSuccess(`Cliente eliminado correctamente`);
      this.modal.CloseModal();
    }, err => {
      console.error("Error deleting client", err);
      this.toast.ShowDefaultDanger(`Error al eliminar cliente`);
    });
  }

}
