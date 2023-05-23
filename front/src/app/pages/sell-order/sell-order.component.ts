import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment-timezone';
import { HttpService } from 'src/app/services/http.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sell-order',
  templateUrl: './sell-order.component.html',
  styleUrls: ['./sell-order.component.css']
})
export class SellOrderComponent implements OnInit {

  IVA: number = 0.16;
  clients: Array<any> = [];
  selectedClient: any = null;
  measurementTypes: Array<any> = [];
  orderId: any = null;
  order: any = null;
  orderStatuses: Array<any> = [];
  orderDate: moment.Moment | null = null;
  orderItem: any = {
    product: null,
    quantity: null,
    weight: null,
    tax: 0,
    price: 0,
    total: 0,
  }
  loading: any = {
    getting: false,
    creating: false
  }

  public get orderSubtotal() {
    let subtotal = 0;
    this.order.items.forEach((item: any) => {
      if(!!item.price) subtotal += item.price;
    });
    return subtotal;
  }
  public get orderTaxes() {
    let taxes = 0;
    this.order.items.forEach((item: any) => {
      if(!!item.tax) taxes += item.tax;
    });
    return taxes;
  }
  public get orderTotal() {
    let total = 0;
    this.order.items.forEach((item: any) => {
      if(!!item.total) total += item.total;
    });
    return total;
  }

  constructor(
    private http: HttpService,
    private toast: ToastService,
    private nav: NavigationService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.GetClients();
    this.GetOrderStatuses();
    this.GetParams();
  }

  GetParams() {
    this.activatedRoute.params.subscribe(params => {
      this.orderId = params['orderId'];

      this.GetOrder();
    });
  }

  GoBack() {
    this.nav.GoToRoleRoute(`sell-orders`);
  }

  GetClients() {
    let endpoint = `/Clients`;
    this.http.Get(endpoint).subscribe((clients: any) => {
      this.clients = clients;
    }, err => {
      console.error("Error getting clients", err);
    });
  }

  GetOrderStatuses() {
    this.http.Get(`OrderStatuses`).subscribe((orderStatuses: any) => {
      this.orderStatuses = orderStatuses;
    }, err => {
      console.error("Error getting order statuses", err);
    })
  }

  GetOrder() {
    this.loading.getting = true;
    this.http.Get(`Orders/${this.orderId}`).subscribe((order: any) => {
      this.order = order;
      this.selectedClient = order.client;
      this.orderDate = moment(order.date);
      this.loading.getting = false;
    }, err => {
      console.error("Error getting order", err);
      this.loading.getting = false;
    });
  }
  
  OnWeightOrQuantityChange(item: any) {
    if(!!item.product) {
      const productPrice = item.product.prices.length ? item.product.prices[0].salePrice : item.product.price;
      let productQuantity = 0;
      switch (item.product.salesMeasurementType.abrev) {
        case 'kg': productQuantity = !!item.weight ? item.weight : 0; break;
        case 'pz': productQuantity = !!item.quantity ? item.quantity : 0; break;
        default: productQuantity = !!item.weight ? item.weight : 0; break;
      }
      if(!Number.isNaN(Number(productQuantity))) {
        const clientCommission = productPrice*Number(this.selectedClient.utilityPercentage)/100;
        item.price = Number(productQuantity) * (productPrice + clientCommission);
        item.tax = item.price * this.IVA;
        item.total = item.price + item.tax;
      }
    }
  }

  SaveOrder() {
    let errorMessage = this.ValidateOrderData();
    if(!!errorMessage) {
      this.toast.ShowDefaultWarning(errorMessage, `La orden no es valida`);
      return;
    }

    let order = {
      id: this.orderId,
      items: this.order.items,
      subtotal: this.orderSubtotal,
      taxes: this.orderTaxes,
      total: this.orderTotal,
      statusId: this.order.statusId,
    }
    this.http.Patch(`Orders`, {order}).subscribe(newOrder => {
      this.toast.ShowDefaultSuccess(`Orden creada exitosamente`);
      this.nav.GoToRoleRoute('sell-orders');
    }, err => {
      console.error("Error creating order", err);
    });
  }

  ValidateOrderData() {
    let errorMessage = null;
    if(!this.order.statusId) return errorMessage = `La orden no tiene un estatus`;
    this.order.items.forEach((item: any, idx: number): any => {
      if(!item.product) return errorMessage = `La fila ${idx+1} no tiene producto seleccionado`;
      switch (item.product.salesMeasurementType.abrev) {
        case 'kg': if(!item.weight || Number.isNaN(item.weight)) return errorMessage = `El producto ${item.product.name} no tiene cantidad de Kg valida`; break;
        case 'pz': if(!item.quantity || Number.isNaN(item.quantity)) return errorMessage = `El producto ${item.product.name} no tiene cantidad de Pz valida`; break;
        default: if(!item.weight || Number.isNaN(item.weight)) return errorMessage = `El producto ${item.product.name} no tiene cantidad de Kg valida`; break;
      }
    });
    return errorMessage;
  }

}
