import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment-timezone';
import { onlyNumbers, priceNumber } from 'src/app/common/custom-validators.directive';
import { filter } from 'src/app/common/data-types.interface';
import { CsvService } from 'src/app/services/csv.service';
import { FormService } from 'src/app/services/form.service';
import { HttpService } from 'src/app/services/http.service';
import { ModalService } from 'src/app/services/modal.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-sell-orders',
  templateUrl: './sell-orders.component.html',
  styleUrls: ['./sell-orders.component.css']
})
export class SellOrdersComponent implements OnInit {

  measurementTypes: Array<any> = [];
  orders: Array<any> = [];
  buyers: Array<any> = [];
  selectedOrder: any = null;
  isEditing: boolean = false;
  ordersCsv: any;
  ordersToUpload: Array<any> = [];
  ordersFailed: Array<any> = [];
  loading: any = {
    updating: false,
    getting: true
  }
  orderForm: FormGroup = new FormGroup({
    id: new FormControl(null, []),
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, priceNumber()]),
    tax: new FormControl('', [Validators.required, onlyNumbers()]),
    buyerId: new FormControl(null, [Validators.required]),
    salesMeasurementTypeId: new FormControl(null, [Validators.required]),
    inventoryMeasurementTypeId: new FormControl(null, [Validators.required]),
  });
  dataConversions: Array<any> = [
    {
      oldKey: 'Nombre',
      newKey: 'name'
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
  ];

  public get csvAcceptLabel() {
    if(!!this.ordersFailed.length) return 'Reintentar';
    return `Subir`;
  }

  constructor(
    public form: FormService,
    public modal: ModalService,
    private toast: ToastService,
    private http: HttpService,
    private csv: CsvService,
    public nav: NavigationService
  ) { }

  ngOnInit(): void {
    this.GetBuyers();
    this.GetMeasurementTypes();
    this.GetOrders();
  }

  GoHome() {
    this.nav.GoToRoleRoute('');
  }

  OnSalesMeasurementTypeChanges(measurementType: any) {
    if(!!measurementType && !this.orderForm.get('inventoryMeasurementTypeId')?.value) {
      this.orderForm.get('inventoryMeasurementTypeId')?.setValue(measurementType.id);
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
    this.http.Get(`Buyers`).subscribe((buyers: any) => {
      this.buyers = buyers;
    }, err => {
      console.error("Error getting buyers", err);
    });
  }

  GetOrders(filters: filter | null = null) {
    this.loading.getting = true;
    let endpoint = `/Orders`;
    if(!!filters) endpoint += `/FilteredBy/StartDate/${filters.startDate}/EndDate/${filters.endDate}`;
    this.http.Get(endpoint).subscribe((Orders: any) => {
      this.orders = Orders;
      this.loading.getting = false;
    }, err => {
      console.error("Error getting Orders", err);
      this.loading.getting = false;
    });
  }

  RegisterOrder() {
    if(this.orderForm.invalid) {
      this.orderForm.markAllAsTouched();
      this.toast.ShowDefaultWarning(`Favor de llenar los campos obligatorios`);
      return;
    }

    this.loading.updating = true;
    
    if(this.isEditing) {
      this.UpdateOrder();
      return;
    }
    
    this.http.Post(`Orders`, {Order: this.orderForm.value}).subscribe(newOrder => {
      this.GetOrders();
      this.toast.ShowDefaultSuccess(`Orden creado exitosamente`);
      this.orderForm.reset();
      this.modal.CloseModal();
      this.loading.updating = false;
    }, err => {
      this.toast.ShowDefaultDanger(`Error al crear orden`);
      console.error("Error creating Order", err);
      this.loading.updating = false;
    });
  }
  
  RegisterOrders() {
    this.loading.updating = true;
    this.http.Post(`Orders/Array`, {Orders: this.ordersToUpload}).subscribe((data: any) => {
      this.GetOrders();
      this.ordersFailed = data.OrdersFailed;
      if(!!data.OrdersSuccess.length) this.toast.ShowDefaultSuccess(`${data.OrdersSuccess.length} ordenes creados correctamente`);
      if(data.OrdersFailed.length) {
        this.toast.ShowDefaultWarning(`${data.OrdersFailed.length} ordenes no se pudieron crear`);
      }
      else {
        this.modal.CloseModal();
        this.ordersToUpload = [];
      }
      this.loading.updating = false;
    }, err => {
      console.error("Error creating Orders", err);
      this.toast.ShowDefaultDanger(`Error al crear ordenes`);
      this.loading.updating = false;
    });
  }

  UpdateOrder() {
    const Order = this.orderForm.value;
    this.http.Patch(`Orders`, {Order}).subscribe(OrderSaved => {
      this.GetOrders();
      this.toast.ShowDefaultSuccess(`Orden actualizado con éxito`);
      this.modal.CloseModal();
      this.isEditing = false;
      this.loading.updating = false;
    }, err => {
      console.error("Error patching Order", err);
      this.toast.ShowDefaultDanger(`Error al actualizar orden`);
      this.loading.updating = false;
    });
  }

  EditOrder(Order: any) {
    this.isEditing = true;
    for (const key in this.orderForm.controls) {
      if (Object.prototype.hasOwnProperty.call(this.orderForm.controls, key)) {
        const control = this.orderForm.controls[key];
        control.setValue(Order[key]);
      }
    }
  }

  DeleteOrder() {
    this.loading.updating = true;
    this.http.Delete(`Orders/${this.selectedOrder.id}`, {}).subscribe(deletedOrder => {
      this.GetOrders();
      this.toast.ShowDefaultSuccess(`Orden eliminado correctamente`);
      this.modal.CloseModal();
      this.loading.updating = false;
    }, err => {
      console.error("Error deleting Order", err);
      this.toast.ShowDefaultDanger(`Error al eliminar orden`);
      this.loading.updating = false;
    });
  }

  DownloadTemplate() {
    this.http.DownloadFileWithoutApi("assets/templates/plantilla_ordenes.csv", 'plantilla_ordenes.csv');
  }

  OnFileSelected(event: any) {
    const file = event.target.files[0];
    this.ordersCsv = file;
    if(!file) return;
    const FILE_READER = new FileReader();
    FILE_READER.onload = (reader) => {
      this.csv.ReadCSV(FILE_READER.result).then(res => {
        this.ordersToUpload = this.csv.FormatData(res.data, this.dataConversions);
      });
    };
    FILE_READER.readAsText(file, 'ISO-8859-3');
  }

  GenerateCsv() {
    let headers: any = ['id', 'Estatus', 'Fecha', 'Cliente', 'Impuestos', 'Subtotal', 'Total'];
    let keys: any = ['id', 'status', 'date', 'client', 'taxes', 'subtotal', 'total'];
    let orders: Array<any> = this.orders.map(order => {
      return {
        id: order.id,
        status: order.status?.name,
        date: moment(order.date).format('DD/MM/YYYY'),
        client: order.client?.name,
        taxes: `$${order.taxes}`,
        subtotal: `$${order.subtotal}`,
        total: `$${order.total}`,
      }
    });
    this.csv.GenerateCSV("ordenes_de_venta", orders, keys, headers);
  }

}
