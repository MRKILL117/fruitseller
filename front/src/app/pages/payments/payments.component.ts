import { Component, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';
import { filter } from 'src/app/common/data-types.interface';
import { CsvService } from 'src/app/services/csv.service';
import { HttpService } from 'src/app/services/http.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  clients: Array<any> = [];
  orders: Array<any> = [];
  orderStatuses: Array<any> = [];
  filters: Array<filter> = [];
  globalStatus: any = null;
  loading: any = {
    updatingOrders: false,
    updating: false,
    getting: true
  }

  public get areSomeOrdersSelected(): boolean {
    return !!this.orders.length && this.orders.some(order => !!order.isSelected);
  }

  constructor(
    private toast: ToastService,
    private http: HttpService,
    private csv: CsvService,
    public nav: NavigationService
  ) {
    this.InitializeFilters();
  }

  ngOnInit(): void {
    this.GetOrderStatuses();
    this.GetOrders();
  }

  InitializeFilters() {
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

  GetOrders(filters: any = null) {
    this.loading.getting = true;
    let endpoint = `/Orders/OfPayments`;
    if(!!filters) endpoint += `/FilteredBy/StartDate/${this.FormatDate(filters.startDate)}/EndDate/${this.FormatDate(filters.endDate)}/Statuses/${JSON.stringify(!!filters.status ? [filters.status] : [])}/Clients/${JSON.stringify(!!filters.client ? [filters.client] : [])}`;
    this.http.Get(endpoint).subscribe((orders: any) => {
      this.orders = orders;
      this.loading.getting = false;
    }, err => {
      console.error("Error getting orders", err);
      this.loading.getting = false;
    });
  }

  GetClients() {
    this.http.Get(`/Clients`).subscribe((clients: any) => {
      this.filters.push({
        type: 'select',
        name: 'client',
        placeholder: 'Cliente',
        config: {
          multiple: false,
          options: clients
        }
      });
    }, err => {
      console.error("Error getting clients", err);
    });
  }

  GetOrderStatuses() {
    this.http.Get(`/OrderStatuses`).subscribe((statuses: any) => {
      this.GetClients();
      this.orderStatuses = statuses.filter((status: any) => status.id >= 3);
      this.filters.push({
        type: 'select',
        name: 'status',
        placeholder: 'Estado',
        config: {
          multiple: false,
          options: this.orderStatuses
        }
      });
    }, err => {
      console.error("Error getting order statuses", err);
    });
  }

  GenerateCsv() {
    let headers: any = ['id', 'Estatus', 'Fecha', 'Cliente', 'Impuestos', 'Subtotal', 'Total'];
    let keys: any = ['id', 'status', 'date', 'client', 'taxes', 'subtotal', 'total'];
    let orders: Array<any> = this.orders.map(order => {
      return {
      }
    });
    this.csv.GenerateCSV("cobranza", orders, keys, headers);
  }

  GetTotalOrdersByStatus(name: string) {
    let total = 0;
    this.orders.forEach(order => {
      if(name == order.status.name) total += order.total;
    });

    return total;
  }

  GoToOrder(order: any) {
    localStorage.setItem('paymentMode', JSON.stringify(true));
    this.nav.GoToRoleRoute('edit-sell-orders/' + order.id);
  }

  ToggleStatusEdition(order: any) {
    order.editStatus = !!!order.editStatus;
  }

  SaveOrderStatus(order: any) {
    if(!order.statusId) {
      this.toast.ShowDefaultWarning(`Selecciona un status`);
      return;
    }

    this.loading.updating = true;
    this.http.Patch(`/Orders/${order.id}`, {order}).subscribe(orderSaved => {
      this.toast.ShowDefaultSuccess(`Estatus actualizado`);
      this.ToggleStatusEdition(order);
      this.GetOrders();
      this.loading.updating = false;
    }, err => {
      console.error("Error updating order status", err);
      this.loading.updating = false;
    });
  }

  SaveOrdersStatuses() {
    let ordersIds = this.orders.filter(order => !!order.isSelected).map(order => order.id);
    this.loading.updatingOrders = true;
    this.http.Patch(`/Orders/UpdateStatus`, {ordersIds, status: this.globalStatus}).subscribe(updated => {
      this.toast.ShowDefaultSuccess(`Ordenes actualizadas correctamente`);
      this.GetOrders();
      this.loading.updatingOrders = false;
    }, err => {
      console.error("Error updating orders status", err);
      this.toast.ShowDefaultDanger(`Error al actualizar el estado de las ordenes`);
      this.loading.updatingOrders = false;
    })
  }

}
