import { Component, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';
import { filter } from 'src/app/common/data-types.interface';
import { CsvService } from 'src/app/services/csv.service';
import { FormService } from 'src/app/services/form.service';
import { HttpService } from 'src/app/services/http.service';
import { ModalService } from 'src/app/services/modal.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-daily-shopping-list',
  templateUrl: './daily-shopping-list.component.html',
  styleUrls: ['./daily-shopping-list.component.css']
})
export class DailyShoppingListComponent implements OnInit {

  today: moment.Moment = moment();
  buyers: Array<any> = [];
  orders: Array<any> = [];
  clients: Array<any> = [];
  products: Array<any> = [];
  productsObj: any = {};
  selectedOrder: any = null;
  isEditing: boolean = false;
  ordersCsv: any;
  ordersToUpload: Array<any> = [];
  ordersFailed: Array<any> = [];
  loading: any = {
    updating: false,
    getting: true
  }

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
    this.GetOrders();
    this.GetClients();
  }

  GoHome() {
    this.nav.GoToRoleRoute('');
  }

  GetBuyers() {
    this.http.Get(`Buyers`).subscribe((buyers: any) => {
      this.buyers = buyers;
    }, err => {
      console.error("Error getting buyers", err);
    });
  }

  OnFiltersChanged(filters: filter | null = null) {
    this.SetProductsArray(filters?.options == '*' ? null : filters?.options);
  }

  GetClients() {
    this.http.Get(`/Clients`).subscribe((clients: any) => {
      this.clients = clients;
    }, err => {
      console.error("Error getting clients", err);
    });
  }

  GetOrders() {
    this.loading.getting = true;
    let endpoint = `/Orders`;
    let yesterday = moment().tz(environment.timezone).subtract(1, 'day').startOf('day').add(6, 'hours').toISOString();
    endpoint += `/FilteredBy/StartDate/${yesterday}/EndDate/*`;
    this.http.Get(endpoint).subscribe((orders: any) => {
      this.orders = orders;
      this.OnFiltersChanged()
      this.loading.getting = false;
    }, err => {
      console.error("Error getting orders", err);
      this.loading.getting = false;
    });
  }

  SetProductsArray(buyer: any = null) {
    this.products = [];
    this.productsObj = {};
    let arrayIdx = 0;
    this.orders.forEach((order: any) => {
      order.items.forEach((item: any) => {
        if(!!buyer) {
          if(buyer.id == item.product.buyer.id) {
            if(!!this.productsObj[item.product.name]) {
              this.products[this.productsObj[item.product.name].arrayIdx].orders.push(order);
              this.products[this.productsObj[item.product.name].arrayIdx].weight += Number(!!item.weight ? item.weight : 0);
              this.products[this.productsObj[item.product.name].arrayIdx].quantity += Number(!!item.quantity ? item.quantity : 0);
              this.productsObj[item.product.name].productsDetected++;
            } else {
              this.products.push({
                ...item.product,
                orders: [order],
                weight: Number(!!item.weight ? item.weight : 0),
                quantity: Number(!!item.quantity ? item.quantity : 0),
              });
              this.productsObj[item.product.name] = {
                productsDetected: 1,
                arrayIdx: arrayIdx++,
              };
            }
          }
        }
        else {
          if(!!this.productsObj[item.product.name]) {
            this.products[this.productsObj[item.product.name].arrayIdx].orders.push(order);
            this.products[this.productsObj[item.product.name].arrayIdx].weight += Number(!!item.weight ? item.weight : 0);
            this.products[this.productsObj[item.product.name].arrayIdx].quantity += Number(!!item.quantity ? item.quantity : 0);
            this.productsObj[item.product.name].productsDetected++;
          } else {
            this.products.push({
              ...item.product,
              orders: [order],
              weight: Number(!!item.weight ? item.weight : 0),
              quantity: Number(!!item.quantity ? item.quantity : 0),
            });
            this.productsObj[item.product.name] = {
              productsDetected: 1,
              arrayIdx: arrayIdx++,
            };
          }
        }
      });
    });
  }

  GetOrderProductShoppingQuantity(order: any, product: any): number {
    if(!order || !product) return 0;
    const itemInOrder = order.items.find((item: any) => item.product.id == product.id);
    if(!itemInOrder) return 0;
    let orderQuantityNeeded;
    switch (itemInOrder.product.inventoryMeasurementType.abrev) {
      case 'kg': orderQuantityNeeded = Number(!!itemInOrder.weight ? itemInOrder.weight : 0); break;
      case 'pz': orderQuantityNeeded = Number(!!itemInOrder.quantity ? itemInOrder.quantity : 0); break;
      default: orderQuantityNeeded = Number(!!itemInOrder.weight ? itemInOrder.weight : 0); break;
    }
    return orderQuantityNeeded;
  }

  GetProductTotal(product: any) {
    let total = 0;
    this.orders.forEach(order => {
      total += this.GetOrderProductShoppingQuantity(order, product);
    });
    return total;
  }

  ExportData() {
    let headers: any = ['Producto', 'Unidad de medida', 'Inventario incial'];
    let keys: any = ['product', 'measurement', 'inventory'];
    headers = headers.concat(this.orders.map(order => `Pedido No. ${order.id}`));
    keys = keys.concat(this.orders.map(order => `order${order.id}`));
    let productsMapped = this.products.map(product => {
      let productMapped: any = {
        product: product.name,
        measurement: product.inventoryMeasurementType.abrev,
        inventory: 0,
        total: this.GetProductTotal(product)
      };
      this.orders.forEach(order => {
        let orderKey = `order${order.id}`;
        productMapped[orderKey] = this.GetOrderProductShoppingQuantity(order, product);
      });

      return productMapped;
    });
    headers.push('Total');
    keys.push('total');

    console.log(headers);
    console.log(keys);
    console.log(productsMapped);

    this.csv.GenerateCSV('compras_del_dia', productsMapped, keys, headers);
  }

}
