import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { priceNumber, onlyNumbers } from 'src/app/common/custom-validators.directive';
import { CsvService } from 'src/app/services/csv.service';
import { FormService } from 'src/app/services/form.service';
import { HttpService } from 'src/app/services/http.service';
import { ModalService } from 'src/app/services/modal.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Array<any> = [];
  selectedProduct: any = null;
  isEditing: boolean = false;
  productsCsv: any;
  productsToUpload: Array<any> = [];
  productsFailed: Array<any> = [];
  productForm: FormGroup = new FormGroup({
    id: new FormControl(null, []),
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, priceNumber]),
    tax: new FormControl('', [Validators.required, onlyNumbers]),
    salesMeasurementTypeId: new FormControl('', [Validators.required]),
    inventoryMeasurementTypeId: new FormControl('', [Validators.required]),
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
    if(!!this.productsFailed.length) return 'Reintentar';
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
  }

  GoHome() {
    this.nav.GoToRoleRoute('');
  }

  GetProducts() {
    this.http.Get(`Products`).subscribe((products: any) => {
      this.products = products;
    }, err => {
      console.error("Error getting products", err);
    });
  }

  RegisterProduct() {
    if(this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      this.toast.ShowDefaultWarning(`Favor de llenar los campos obligatorios`);
    }

    if(this.isEditing) {
      this.UpdateProduct();
      return;
    }

    this.http.Post(`Products`, {Product: this.productForm.value}).subscribe(newProduct => {
      this.GetProducts();
      this.toast.ShowDefaultSuccess(`Producte creado exitosamente`);
      this.productForm.reset();
      this.modal.CloseModal();
    }, err => {
      this.toast.ShowDefaultDanger(`Error al crear Producte`);
      console.error("Error creating Product", err);
    });
  }

  RegisterProducts() {
    this.http.Post(`Products/Array`, {Products: this.productsToUpload}).subscribe((data: any) => {
      this.productsFailed = data.productsFailed;
      if(!!data.ProductsSuccess.length) this.toast.ShowDefaultSuccess(`${data.ProductsSuccess.length} Productes creados correctamente`);
      if(data.productsFailed.length) {
        this.toast.ShowDefaultWarning(`${data.productsFailed.length} Productes no se pudieron crear`);
      }
      else {
        this.modal.CloseModal();
        this.productsToUpload = [];
      }
    }, err => {
      console.error("Error creating Products", err);
      this.toast.ShowDefaultDanger(`Error al crear Productes`);
    });
  }

  UpdateProduct() {
    const Product = this.productForm.value;
    this.http.Patch(`Products`, {Product}).subscribe(ProductSaved => {
      this.GetProducts();
      this.toast.ShowDefaultSuccess(`Producte actualizado con éxito`);
      this.modal.CloseModal();
      this.isEditing = false;
    }, err => {
      console.error("Error patching Product", err);
      this.toast.ShowDefaultDanger(`Error al actualizar Producte`);
    });
  }

  EditProduct(Product: any) {
    this.isEditing = true;
    for (const key in this.productForm.controls) {
      if (Object.prototype.hasOwnProperty.call(this.productForm.controls, key)) {
        const control = this.productForm.controls[key];
        control.setValue(Product[key]);
      }
    }
  }

  DeleteProduct() {
    this.http.Delete(`Products/${this.selectedProduct.id}`, {}).subscribe(deletedProduct => {
      this.GetProducts();
      this.toast.ShowDefaultSuccess(`Producte eliminado correctamente`);
      this.modal.CloseModal();
    }, err => {
      console.error("Error deleting Product", err);
      this.toast.ShowDefaultDanger(`Error al eliminar Producte`);
    });
  }

  DownloadTemplate() {
    this.http.DownloadFileWithoutApi("assets/templates/plantilla_Productes.csv", 'plantilla_Productes.csv');
  }

  OnFileSelected(event: any) {
    const file = event.target.files[0];
    this.productsCsv = file;
    if(!file) return;
    const FILE_READER = new FileReader();
    FILE_READER.onload = (reader) => {
      this.csv.ReadCSV(FILE_READER.result).then(res => {
        this.productsToUpload = this.FormatData(res.data);
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
