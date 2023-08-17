import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { priceNumber, onlyNumbers } from 'src/app/common/custom-validators.directive';
import { filter } from 'src/app/common/data-types.interface';
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

  measurementTypes: Array<any> = [];
  products: Array<any> = [];
  productTypes: Array<any> = [];
  buyers: Array<any> = [];
  selectedProduct: any = null;
  isEditing: boolean = false;
  productsCsv: any;
  productsToUpload: Array<any> = [];
  productsFailed: Array<any> = [];
  filters: Array<filter> = [];
  loading: any = {
    updating: false,
    getting: true
  }
  productForm: FormGroup = new FormGroup({
    id: new FormControl(null, []),
    name: new FormControl('', [Validators.required]),
    satCode: new FormControl('', [Validators.required, onlyNumbers()]),
    weightPerPiece: new FormControl('', [Validators.required, priceNumber()]),
    price: new FormControl('', [Validators.required, priceNumber()]),
    tax: new FormControl('', [Validators.required, onlyNumbers()]),
    buyerId: new FormControl(null, [Validators.required]),
    salesMeasurementTypeId: new FormControl(null, [Validators.required]),
    inventoryMeasurementTypeId: new FormControl(null, [Validators.required]),
    productTypeId: new FormControl(null, [Validators.required]),
  });
  dataConversions: Array<any> = [
    {
      oldKey: 'Nombre',
      newKey: 'name'
    },
    {
      oldKey: 'Codigo SAT',
      newKey: 'satCode'
    },
    {
      oldKey: 'Peso promedio por pieza',
      newKey: 'weightPerPiece'
    },
    {
      oldKey: 'Precio',
      newKey: 'price'
    },
    {
      oldKey: 'Impuesto',
      newKey: 'tax'
    },
    {
      oldKey: 'Unidad de medida ventas',
      newKey: 'salesMeasurementType'
    },
    {
      oldKey: 'Unidad de medida inventario',
      newKey: 'inventoryMeasurementType'
    },
    {
      oldKey: 'Comprador',
      newKey: 'buyer'
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
    this.InitializeFilters();
    this.GetBuyers();
    this.GetMeasurementTypes();
    this.GetProducts();
    this.GetProductTypes();
  }

  GoHome() {
    this.nav.GoToRoleRoute('');
  }

  InitializeFilters() {
    // Text filter
    this.filters.push({
      type: 'text',
      name: 'text',
      placeholder: 'Buscar'
    });
  }

  OnSalesMeasurementTypeChanges(measurementType: any) {
    if(!!measurementType && !this.productForm.get('inventoryMeasurementTypeId')?.value) {
      this.productForm.get('inventoryMeasurementTypeId')?.setValue(measurementType.id);
    }
  }

  GetMeasurementTypes() {
    this.http.Get(`MeasurementTypes`).subscribe((measurementTypes: any) => {
      this.measurementTypes = measurementTypes;
    }, err => {
      console.error("Error getting measurement types", err);
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

  GetProductTypes() {
    this.loading.getting = true;
    this.http.Get(`ProductTypes`).subscribe((productTypes: any) => {
      this.productTypes = productTypes;
      this.loading.getting = false;
    }, err => {
      console.error("Error getting productTypes", err);
      this.loading.getting = false;
    });
  }

  GetProducts(filters: any = null) {
    this.loading.getting = true;
    let endpoint = `/Products`;
    if(!!filters) endpoint += `/FilteredBy/Text/${filters.text}`;
    this.http.Get(endpoint).subscribe((products: any) => {
      this.products = products;
      this.loading.getting = false;
    }, err => {
      console.error("Error getting products", err);
      this.loading.getting = false;
    });
  }

  RegisterProduct() {
    if(this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      this.toast.ShowDefaultWarning(`Favor de llenar los campos obligatorios`);
      return;
    }

    this.loading.updating = true;
    
    if(this.isEditing) {
      this.UpdateProduct();
      return;
    }
    
    this.http.Post(`Products`, {product: this.productForm.value}).subscribe(newProduct => {
      this.GetProducts();
      this.toast.ShowDefaultSuccess(`Producto creado exitosamente`);
      this.productForm.reset();
      this.modal.CloseModal();
      this.loading.updating = false;
    }, err => {
      this.toast.ShowDefaultDanger(`Error al crear producto`);
      console.error("Error creating Product", err);
      this.loading.updating = false;
    });
  }
  
  RegisterProducts() {
    this.loading.updating = true;
    this.http.Post(`Products/Array`, {products: this.productsToUpload}).subscribe((data: any) => {
      this.GetProducts();
      this.productsFailed = data.productsFailed;
      if(!!data.productsSuccess.length) this.toast.ShowDefaultSuccess(`${data.productsSuccess.length} productos creados correctamente`);
      if(data.productsFailed.length) {
        this.toast.ShowDefaultWarning(`${data.productsFailed.length} productos no se pudieron crear`);
      }
      else {
        this.modal.CloseModal();
        this.productsToUpload = [];
      }
      this.loading.updating = false;
    }, err => {
      console.error("Error creating Products", err);
      this.toast.ShowDefaultDanger(`Error al crear productos`);
      this.loading.updating = false;
    });
  }

  UpdateProduct() {
    const product = this.productForm.value;
    this.http.Patch(`Products`, {product}).subscribe(ProductSaved => {
      this.GetProducts();
      this.toast.ShowDefaultSuccess(`producto actualizado con éxito`);
      this.modal.CloseModal();
      this.isEditing = false;
      this.loading.updating = false;
    }, err => {
      console.error("Error patching Product", err);
      this.toast.ShowDefaultDanger(`Error al actualizar producto`);
      this.loading.updating = false;
    });
  }

  CancelEdition() {
    this.modal.CloseModal(this.loading.updating);
    this.isEditing = false;
    this.productForm.reset();
  }

  EditProduct(product: any) {
    this.isEditing = true;
    for (const key in this.productForm.controls) {
      if (Object.prototype.hasOwnProperty.call(this.productForm.controls, key)) {
        const control = this.productForm.controls[key];
        control.setValue(product[key]);
      }
    }
  }

  DeleteProduct() {
    this.loading.updating = true;
    this.http.Delete(`Products/${this.selectedProduct.id}`, {}).subscribe(deletedProduct => {
      this.GetProducts();
      this.toast.ShowDefaultSuccess(`producto eliminado correctamente`);
      this.modal.CloseModal();
      this.loading.updating = false;
    }, err => {
      console.error("Error deleting Product", err);
      this.toast.ShowDefaultDanger(`Error al eliminar producto`);
      this.loading.updating = false;
    });
  }

  DownloadTemplate() {
    this.http.DownloadFileWithoutApi("assets/templates/plantilla_productos.csv", 'plantilla_productos.csv');
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

  GenerateCsv() {
    let headers: any = ['Nombre', 'Código SAT', 'Peso promedio por pieza', 'Precio', 'Impuesto', 'Unidad de medida para ventas', 'Unidad de medida para inventario', 'Comprador'];
    let keys: any = ['name', 'satCode', 'weightPerPiece', 'price', 'tax', 'salesMeasurementType', 'inventoryMeasurementType', 'buyer'];
    let products: Array<any> = this.products.map((product: any) => {
      return {
        name: product.name,
        satCode: product.satCode,
        weightPerPiece: `${product.weightPerPiece} kg`,
        price: product.price,
        tax: product.tax,
        salesMeasurementType: !!product.salesMeasurementType ? product.salesMeasurementType.abrev : 'No asignado',
        inventoryMeasurementType: !!product.inventoryMeasurementType ? product.inventoryMeasurementType.abrev : 'No asignado',
        buyer: !!product.buyer ? product.buyer.name : 'No asignado',
      }
    })
    this.csv.GenerateCSV("productos", products, keys, headers);
  }

}
