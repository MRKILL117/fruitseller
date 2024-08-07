import { Component, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';
import { HttpService } from 'src/app/services/http.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-create-sell-order',
  templateUrl: './create-sell-order.component.html',
  styleUrls: ['./create-sell-order.component.scss']
})
export class CreateSellOrderComponent implements OnInit {

  IVA: number = 0.16;
  clients: Array<any> = [];
  selectedClient: any = null;
  selectedAddress: any = null;
  measurementTypes: Array<any> = [];
  products: Array<any> = [];
  comments: string = '';
  orderItems: Array<any> = [];
  orderItem: any = {
    product: null,
    quantity: null,
    weight: null,
    tax: 0,
    price: 0,
    total: 0,
  }
  orderDate: moment.Moment = moment().tz(environment.timezone).add(4, 'hours');
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
    this.http.Get(`Products/WithPriceHistory/FilteredBy/Text/*/StartDate/${this.orderDate.format('YYYY-MM-DD')}/EndDate/${this.orderDate.format('YYYY-MM-DD')}`).subscribe((products: any) => {
      this.products = products;
    }, err => {
      console.error("Error getting products", err);
    });
  }

  GetClients() {
    let endpoint = `/Clients`;
    this.http.Get(endpoint).subscribe((clients: any) => {
      this.clients = clients;
    }, err => {
      console.error("Error getting clients", err);
    });
  }

  PushItem() {
    this.orderItems.push(Object.assign({}, this.orderItem));
  }
  RemoveItem(idx: number) {
    if(this.orderItems.length > 1) this.orderItems.splice(idx, 1);
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
        const utilityPercentage = item?.product?.type?.utility != null ? item?.product?.type?.utility : Number(this.selectedClient.utilityPercentage);
        const clientCommission = productPrice * utilityPercentage / 100;
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
      date: this.orderDate.toISOString(),
      items: this.orderItems,
      subtotal: this.orderSubtotal,
      taxes: this.orderTaxes,
      total: this.orderTotal,
      client: this.selectedClient,
      clientId: this.selectedClient.id,
      clientAddress: this.selectedAddress,
      comments: this.comments
    }
    this.http.Post(`Orders`, {order}).subscribe(newOrder => {
      this.toast.ShowDefaultSuccess(`Orden creada exitosamente`);
      this.nav.GoToRoleRoute('sell-orders');
    }, err => {
      console.error("Error creating order", err);
    });
  }

  ValidateOrderData() {
    let errorMessage = null;
    if(!this.selectedClient) return `No ha seleccionado cliente`;
    if(!this.selectedAddress) return `No ha seleccionado una dirección`;
    this.orderItems.forEach((item, idx): any => {
      if(!item.product) return errorMessage = `La fila ${idx+1} no tiene producto seleccionado`;
      // switch (item.product.salesMeasurementType.abrev) {
      //   case 'kg': if(!item.weight || Number.isNaN(item.weight)) return errorMessage = `El producto ${item.product.name} no tiene cantidad de Kg valida`; break;
      //   case 'pz': if(!item.quantity || Number.isNaN(item.quantity)) return errorMessage = `El producto ${item.product.name} no tiene cantidad de Pz valida`; break;
      //   default: if(!item.weight || Number.isNaN(item.weight)) return errorMessage = `El producto ${item.product.name} no tiene cantidad de Kg valida`; break;
      // }
    });
    return errorMessage;
  }

  OnClientSelected(client: any) {
    if(!!client) {
      const defaultAddress = client.addresses.find((address: any) => address.isDefault);
      if(!!defaultAddress) this.selectedAddress = defaultAddress;
      else this.selectedAddress = client.addresses[0];
    }
  }

  GenerateClientAddress(address: any) {
    if(!!address) return address.street + " #" + address.externalNumber + (!!address.internalNumber ? (" int. " + address.internalNumber) : "")
    return '';
  }

}
