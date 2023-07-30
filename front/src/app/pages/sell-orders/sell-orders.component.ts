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
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sell-orders',
  templateUrl: './sell-orders.component.html',
  styleUrls: ['./sell-orders.component.css']
})
export class SellOrdersComponent implements OnInit {

  measurementTypes: Array<any> = [];
  orders: Array<any> = [];
  selectedOrder: any = null;
  isEditing: boolean = false;
  ordersCsv: any;
  ordersToUpload: Array<any> = [];
  ordersFailed: Array<any> = [];
  filters: Array<filter> = [];
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
      oldKey: 'No. Orden',
      newKey: 'orderId'
    },
    {
      oldKey: 'Cliente',
      newKey: 'clientRfcOrId'
    },
    {
      oldKey: 'Dirección',
      newKey: 'addressAliasOrId'
    },
    {
      oldKey: 'Fecha',
      newKey: 'date'
    },
    {
      oldKey: 'Producto',
      newKey: 'productNameOrId'
    },
    {
      oldKey: 'Piezas',
      newKey: 'quantity',
      type: 'number'
    },
    {
      oldKey: 'Kilos',
      newKey: 'weight',
      type: 'number'
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
  ) {
    this.InitializeFilters();
  }

  ngOnInit(): void {
    this.GetOrders();
  }

  InitializeFilters() {
    // Text filter
    // this.filters.push({
    //   type: 'text',
    //   name: 'text',
    //   placeholder: 'Buscar'
    // });
    // Start date filter
    this.filters.push({
      type: 'datepicker',
      name: 'startDate',
      placeholder: 'Fecha de inicio',
      config: null
    });
    // End date filter
    this.filters.push({
      type: 'datepicker',
      name: 'endDate',
      placeholder: 'Fecha de fin',
      config: null
    });
  }

  GoHome() {
    this.nav.GoToRoleRoute('');
  }

  FormatDate(date: string) {
    if(!!date && date != '*') {
      return moment(date).tz(environment.timezone).toISOString().split('T').shift();
    }
    return '*';
  }

  OnSalesMeasurementTypeChanges(measurementType: any) {
    if(!!measurementType && !this.orderForm.get('inventoryMeasurementTypeId')?.value) {
      this.orderForm.get('inventoryMeasurementTypeId')?.setValue(measurementType.id);
    }
  }

  GetOrders(filters: any | null = null) {
    this.loading.getting = true;
    let endpoint = `/Orders`;
    if(!!filters) endpoint += `/FilteredBy/StartDate/${this.FormatDate(filters.startDate)}/EndDate/${this.FormatDate(filters.endDate)}`;
    this.http.Get(endpoint).subscribe((Orders: any) => {
      this.orders = Orders;
      this.loading.getting = false;
    }, err => {
      console.error("Error getting Orders", err);
      this.loading.getting = false;
    });
  }
  
  RegisterOrders() {
    this.loading.updating = true;
    this.http.Post(`Orders/Array`, {products: this.ordersToUpload}).subscribe((data: any) => {
      console.log(data);
      this.GetOrders();
      this.ordersFailed = data.ordersFailed;
      if(!!data.ordersSuccess.length) this.toast.ShowDefaultSuccess(`${data.ordersSuccess.length} ordenes creados correctamente`);
      if(data.ordersFailed.length) {
        this.toast.ShowDefaultWarning(`${data.ordersFailed.length} ordenes no se pudieron crear`);
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

  DeleteOrder() {
    this.loading.updating = true;
    this.http.Delete(`Orders/${this.selectedOrder.id}`, {}).subscribe(deletedOrder => {
      this.GetOrders();
      this.toast.ShowDefaultSuccess(`Orden eliminado correctamente`);
      this.modal.CloseModal();
      this.loading.updating = false;
    }, err => {
      console.error("Error deleting Order", err);
      let defaultMessage = `Error al eliminar orden`;
      this.toast.ShowDefaultDanger(this.http.GetErrorMessage(err) || defaultMessage);
      this.loading.updating = false;
    });
  }
  
  SetAsDelivered(order: any) {
    this.http.Patch(`/Orders/${order.id}/Deliver`, {}).subscribe(orderUpdated => {
      this.toast.ShowDefaultSuccess(`Orden actualizada`);
      this.GetOrders();
    }, err => {
      let defaultMessage = `Error al actualizar orden`;
      this.toast.ShowDefaultDanger(this.http.GetErrorMessage(err) || defaultMessage);
      console.error("Error delivering order", err);
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
