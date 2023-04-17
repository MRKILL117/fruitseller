import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { onlyNumbers } from 'src/app/common/custom-validators.directive';
import { CsvService } from 'src/app/services/csv.service';
import { FormService } from 'src/app/services/form.service';
import { HttpService } from 'src/app/services/http.service';
import { ModalService } from 'src/app/services/modal.service';
import { NavigationService } from 'src/app/services/navigation.service';
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
  clientsCsv: any;
  clientsToUpload: Array<any> = [];
  clientsFailed: Array<any> = [];
  clientForm: FormGroup = new FormGroup({
    id: new FormControl(null, []),
    name: new FormControl('', [Validators.required]),
    rfc: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z0-9]{12,13}$/)]),
    address: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    postalCode: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{5}$/)]),
    utilityPercentage: new FormControl('', [onlyNumbers()]),
    paymentDays: new FormControl('', [onlyNumbers()]),
  });
  dataConversions: Array<any> = [
    {
      oldKey: 'Nombre',
      newKey: 'name'
    },
    {
      oldKey: 'RFC',
      newKey: 'rfc'
    },
    {
      oldKey: 'Dirección',
      newKey: 'address'
    },
    {
      oldKey: 'Código postal',
      newKey: 'postalCode'
    },
    {
      oldKey: 'Estado',
      newKey: 'state'
    },
    {
      oldKey: 'País',
      newKey: 'country'
    },
    {
      oldKey: 'Porcentaje de utilidad',
      newKey: 'utilityPercentage'
    },
    {
      oldKey: 'Días de pago',
      newKey: 'paymentDays'
    },
  ];

  public get csvAcceptLabel() {
    if(!!this.clientsFailed.length) return 'Reintentar';
    return `Subir`;
  }

  constructor(
    public form: FormService,
    public modal: ModalService,
    private toast: ToastService,
    private http: HttpService,
    private csv: CsvService,
    private nav: NavigationService
  ) { }

  ngOnInit(): void {
    this.GetClients();
  }

  GoHome() {
    this.nav.GoToRoleRoute('');
  }

  GetClients(filters: any = null) {
    console.log(filters);
    let endpoint = `/Clients`;
    if(!!filters) endpoint += `/FilteredBy/Text/${filters.text}`;
    this.http.Get(endpoint).subscribe((clients: any) => {
      this.clients = clients;
    }, err => {
      console.error("Error getting clients", err);
    });
  }

  RegisterClient() {
    if(this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      this.toast.ShowDefaultWarning(`Favor de llenar los campos obligatorios`);
      return;
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

  RegisterClients() {
    this.http.Post(`Clients/Array`, {clients: this.clientsToUpload}).subscribe((data: any) => {
      this.clientsFailed = data.clientsFailed;
      if(!!data.clientsSuccess.length) this.toast.ShowDefaultSuccess(`${data.clientsSuccess.length} clientes creados correctamente`);
      if(data.clientsFailed.length) {
        this.toast.ShowDefaultWarning(`${data.clientsFailed.length} clientes no se pudieron crear`);
      }
      else {
        this.modal.CloseModal();
        this.clientsToUpload = [];
      }
    }, err => {
      console.error("Error creating clients", err);
      this.toast.ShowDefaultDanger(`Error al crear clientes`);
    });
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

  DownloadTemplate() {
    this.http.DownloadFileWithoutApi("assets/templates/plantilla_clientes.csv", 'plantilla_clientes.csv');
  }

  OnFileSelected(event: any) {
    const file = event.target.files[0];
    this.clientsCsv = file;
    if(!file) return;
    const FILE_READER = new FileReader();
    FILE_READER.onload = (reader) => {
      this.csv.ReadCSV(FILE_READER.result).then(res => {
        this.clientsToUpload = this.FormatData(res.data);
      });
    };
    FILE_READER.readAsText(file, 'ISO-8859-3');
  }

  FormatData(students: Array<any>) {
    return students.map(student => {
      let dataFormatted: any = {};
      this.dataConversions.forEach(conversion => {
        dataFormatted[conversion.newKey] = student[conversion.oldKey];
      });
      return dataFormatted;
    });
  }

}
