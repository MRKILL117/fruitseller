import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment-timezone';
import { HttpService } from 'src/app/services/http.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-create-sell-order',
  templateUrl: './create-sell-order.component.html',
  styleUrls: ['./create-sell-order.component.css']
})
export class CreateSellOrderComponent implements OnInit {

  clients: Array<any> = [];
  selectedClient: any = null;
  measurementTypes: Array<any> = [];
  products: Array<any> = [];
  orderItems: Array<any> = [];
  orderItem: any = {
    product: null,
    quantity: null,
    weight: null,
    tax: null,
    price: null,
    total: null,
  }
  orderDate: moment.Moment = moment().tz(environment.timezone);
  loading: any = {
    getting: false,
    creating: false
  }

  public get orderSubtotal() {
    let subtotal = 0;
    this.orderItems.forEach(item => {
      if(!!item.price) subtotal += item.price;
    });
    return subtotal;
  }
  public get orderTaxes() {
    let taxes = 0;
    this.orderItems.forEach(item => {
      if(!!item.tax) taxes += item.tax;
    });
    return taxes;
  }
  public get orderTotal() {
    let total = 0;
    this.orderItems.forEach(item => {
      if(!!item.total) total += item.total;
    });
    return total;
  }

  constructor(
    private http: HttpService,
    private toast: ToastService,
    private nav: NavigationService
  ) { }

  ngOnInit(): void {
    this.GetClients();
    this.GetProducts();
    this.PushItem();
  }

  GoBack() {
    this.nav.GoToRoleRoute(`sell-orders`);
  }

  GetMeasurementTypes() {
    this.http.Get(`MeasurementTypes`).subscribe((measurementTypes: any) => {
      this.measurementTypes = measurementTypes;
    }, err => {
      console.error("Error getting measurement types", err);
    });
  }

  GetProducts() {
    this.loading.getting = true;
    this.http.Get(`Products/WithPriceHistory/FilteredBy/Text/*/StartDate/${this.orderDate.format('YYYY-MM-DD')}/EndDate/${this.orderDate.format('YYYY-MM-DD')}`).subscribe((products: any) => {
      this.products = products;
      this.loading.getting = false;
    }, err => {
      console.error("Error getting products", err);
      this.loading.getting = false;
    });
  }

  GetClients() {
    this.loading.getting = true;
    let endpoint = `/Clients`;
    this.http.Get(endpoint).subscribe((clients: any) => {
      this.clients = clients;
      this.loading.getting = false;
    }, err => {
      console.error("Error getting clients", err);
      this.loading.getting = false;
    });
  }

  PushItem() {
    this.orderItems.push(Object.assign({}, this.orderItem));
  }
  RemoveItem(idx: number) {
    if(this.orderItems.length > 1) this.orderItems.splice(idx, 1);
  }

  OnProductSelected(product: any, item: any) {
    item.tax = product.tax;
    item.price = product.prices.length ? product.prices[0] : item.price;
    item.total = this.GetItemTotal(item);
  }

  OnWeightOrQuantityChange(item: any) {
    item.total = this.GetItemTotal(item);
  }

  SaveOrder() {
    if(!this.ValidateOrderData()) {
      this.toast.ShowDefaultWarning(`La orden no es valida`);
    }

    let order = {
      date: this.orderDate.toISOString(),
      items: this.orderItems,
      subtotal: this.orderSubtotal,
      taxes: this.orderTaxes,
      total: this.orderTotal,
      client: this.selectedClient
    }
    this.http.Post(`Orders`, {order}).subscribe(newOrder => {
      this.toast.ShowDefaultSuccess(`Orden creada exitosamente`);
    }, err => {
      console.error("Error creating order", err);
    });
  }

  ValidateOrderData() {
    if(!this.selectedClient) return false;
    return true;
  }

  GetItemTotal(item: any): string | number {
    let total = 0;
    if(!!item && !!item.weight && !!item.product && !!this.selectedClient) {
      total += item.price;
      total += (item.price*item.tax);
      total += (total * this.selectedClient.utilityPersentage / 100);
    }
    return total;
  }

}
