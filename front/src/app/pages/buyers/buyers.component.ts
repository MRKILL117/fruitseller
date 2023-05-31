import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CsvService } from 'src/app/services/csv.service';
import { FormService } from 'src/app/services/form.service';
import { HttpService } from 'src/app/services/http.service';
import { ModalService } from 'src/app/services/modal.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-buyers',
  templateUrl: './buyers.component.html',
  styleUrls: ['./buyers.component.css']
})
export class BuyersComponent implements OnInit {

  buyers: Array<any> = [];
  products: Array<any> = [];
  selectedBuyer: any = null;
  isEditing: boolean = false;
  buyersCsv: any;
  buyersToUpload: Array<any> = [];
  buyersFailed: Array<any> = [];
  loading: any = {
    updating: false,
    getting: true
  }
  buyerForm: FormGroup = new FormGroup({
    id: new FormControl(null, []),
    name: new FormControl('', [Validators.required]),
    products: new FormControl(null, [])
  });
  dataConversions: Array<any> = [
    {
      oldKey: 'Nombre',
      newKey: 'name',
      type: 'string'
    },
    {
      oldKey: 'Productos',
      newKey: 'products',
      type: 'array'
    },
  ];

  public get csvAcceptLabel() {
    if(!!this.buyersFailed.length) return 'Reintentar';
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
    this.GetProducts();
    this.GetBuyers();
  }

  GoHome() {
    this.nav.GoToRoleRoute('');
  }

  GetProducts() {
    this.loading.getting = true;
    this.http.Get(`Products`).subscribe((products: any) => {
      this.products = products.filter((product: any) => !product.buyerId);
      this.loading.getting = false;
    }, err => {
      console.error("Error getting products", err);
      this.loading.getting = false;
    });
  }

  GetBuyers() {
    this.loading.getting = true;
    this.http.Get(`Buyers`).subscribe((buyers: any) => {
      this.buyers = buyers;
      this.loading.getting = false;
    }, err => {
      console.error("Error getting buyers", err);
      this.loading.getting = false;
    });
  }

  RegisterBuyer() {
    if(this.buyerForm.invalid) {
      this.buyerForm.markAllAsTouched();
      this.toast.ShowDefaultWarning(`Favor de llenar los campos obligatorios`);
      return;
    }

    this.loading.updating = true;
    
    if(this.isEditing) {
      this.UpdateBuyer();
      return;
    }
    
    this.http.Post(`Buyers`, {buyer: this.buyerForm.value}).subscribe(newbuyer => {
      this.GetProducts();
      this.GetBuyers();
      this.toast.ShowDefaultSuccess(`Comprador creado exitosamente`);
      this.buyerForm.reset();
      this.modal.CloseModal();
      this.loading.updating = false;
    }, err => {
      this.toast.ShowDefaultDanger(`Error al crear comprador`);
      console.error("Error creating buyer", err);
      this.loading.updating = false;
    });
  }
  
  RegisterBuyers() {
    this.loading.updating = true;
    this.http.Post(`Buyers/Array`, {buyers: this.buyersToUpload}).subscribe((data: any) => {
      this.GetProducts();
      this.GetBuyers();
      this.buyersFailed = data.buyersFailed;
      if(!!data.buyersSuccess.length) this.toast.ShowDefaultSuccess(`${data.buyersSuccess.length} compradors creados correctamente`);
      if(data.buyersFailed.length) {
        this.toast.ShowDefaultWarning(`${data.buyersFailed.length} compradors no se pudieron crear`);
      }
      else {
        this.modal.CloseModal();
        this.buyersToUpload = [];
      }
      this.loading.updating = false;
    }, err => {
      console.error("Error creating buyers", err);
      this.toast.ShowDefaultDanger(`Error al crear compradors`);
      this.loading.updating = false;
    });
  }

  UpdateBuyer() {
    const buyer = this.buyerForm.value;
    this.http.Patch(`Buyers`, {buyer}).subscribe(buyerSaved => {
      this.GetProducts();
      this.GetBuyers();
      this.toast.ShowDefaultSuccess(`Comprador actualizado con éxito`);
      this.modal.CloseModal();
      this.isEditing = false;
      this.loading.updating = false;
    }, err => {
      console.error("Error patching buyer", err);
      this.toast.ShowDefaultDanger(`Error al actualizar comprador`);
      this.loading.updating = false;
    });
  }

  CancelEdition() {
    this.modal.CloseModal(this.loading.updating);
    this.isEditing = false;
    this.buyerForm.reset();
  }

  EditBuyer(buyer: any) {
    this.isEditing = true;
    for (const key in this.buyerForm.controls) {
      if (Object.prototype.hasOwnProperty.call(this.buyerForm.controls, key)) {
        const control = this.buyerForm.controls[key];
        control.setValue(buyer[key]);
      }
    }
  }

  DeleteBuyer() {
    this.loading.updating = true;
    this.http.Delete(`Buyers/${this.selectedBuyer.id}`, {}).subscribe(deletedbuyer => {
      this.GetProducts();
      this.GetBuyers();
      this.toast.ShowDefaultSuccess(`Comprador eliminado correctamente`);
      this.modal.CloseModal();
      this.loading.updating = false;
    }, err => {
      console.error("Error deleting buyer", err);
      this.toast.ShowDefaultDanger(`Error al eliminar comprador`);
      this.loading.updating = false;
    });
  }

  DownloadTemplate() {
    this.http.DownloadFileWithoutApi("assets/templates/plantilla_compradores.csv", 'plantilla_compradores.csv');
  }

  OnFileSelected(event: any) {
    const file = event.target.files[0];
    this.buyersCsv = file;
    if(!file) return;
    const FILE_READER = new FileReader();
    FILE_READER.onload = (reader) => {
      this.csv.ReadCSV(FILE_READER.result).then(res => {
        this.buyersToUpload = this.csv.FormatData(res.data, this.dataConversions);
      });
    };
    FILE_READER.readAsText(file, 'ISO-8859-3');
  }

}
