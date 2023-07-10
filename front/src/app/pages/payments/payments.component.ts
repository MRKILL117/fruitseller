import { Component, OnInit } from '@angular/core';
import { filter } from 'src/app/common/data-types.interface';
import { CsvService } from 'src/app/services/csv.service';
import { HttpService } from 'src/app/services/http.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  orders: Array<any> = [];
  orderStatuses: Array<any> = [];
  loading: any = {
    updating: false,
    getting: true
  }

  constructor(
    private toast: ToastService,
    private http: HttpService,
    private csv: CsvService,
    public nav: NavigationService
  ) { }

  ngOnInit(): void {
    this.GetOrderStatuses();
    this.GetOrders();
  }

  GoHome() {
    this.nav.GoToRoleRoute('');
  }

  GetOrders(filters: filter | null = null) {
    this.loading.getting = true;
    let endpoint = `/Orders`;
    if(!!filters) endpoint += `/FilteredBy/StartDate/${filters.startDate}/EndDate/${filters.endDate}/Statuses/${JSON.stringify(filters.options)}`;
    this.http.Get(endpoint).subscribe((Orders: any) => {
      this.orders = Orders;
      this.loading.getting = false;
    }, err => {
      console.error("Error getting Orders", err);
      this.loading.getting = false;
    });
  }

  GetOrderStatuses() {
    this.http.Get(`/OrderStatuses`).subscribe((statuses: any) => {
      this.orderStatuses = statuses.filter((status: any) => status.id >= 3);
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

}
