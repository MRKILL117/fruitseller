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
  productsWithInventories: Array<any> = [];
  productsObj: any = {};
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
    this.GetClients();
    this.GetProductWithInventories();
  }

  GoHome() {
    this.nav.GoToRoleRoute('');
  }

  GetBuyers() {
    this.http.Get(`Buyers`).subscribe((buyers: any) => {
      this.buyers = buyers;
      this.filters.push({
        type: 'select',
        name: 'buyer',
        placeholder: 'Comprador',
        config: {
          multiple: false,
          options: buyers
        }
      });
    }, err => {
      console.error("Error getting buyers", err);
    });
  }

  OnFiltersChanged(filters: any = null) {
    this.SetProductsArray(filters?.buyer);
  }

  GetClients() {
    this.http.Get(`/Clients`).subscribe((clients: any) => {
      this.clients = clients;
    }, err => {
      console.error("Error getting clients", err);
    });
  }

  GetProductWithInventories() {
    this.http.Get(`Products/WithInventory`).subscribe((productsWithInventories: any) => {
      this.productsWithInventories = productsWithInventories;

      this.GetOrders();
    }, err => {
      console.error("Error getting products inventories", err);
    });
  }

  GetOrders() {
    this.loading.getting = true;
    let endpoint = `/Orders`;
    let yesterday = moment().tz(environment.timezone).subtract(1, 'day').startOf('day').add(6, 'hours').toISOString();
    endpoint += `/FilteredBy/StartDate/${yesterday}/EndDate/*/Statuses/${JSON.stringify([{id: 1},{id: 2},{id: 3}])}`;
    this.http.Get(endpoint).subscribe((orders: any) => {
      this.orders = orders;
      this.OnFiltersChanged();
      this.loading.getting = false;
    }, err => {
      console.error("Error getting orders", err);
      this.loading.getting = false;
    });
  }

  SetProductsArray(buyer: any = null) {
    let productsMap: Map<number, any> = new Map<number, any>();
    let isAccurate = true;
    this.orders.forEach((order: any) => {
      order.items.forEach((item: any) => {
        const productInventory: any = this.productsWithInventories.find(product => product.id == item.product.id);
        let productQuantity = 0;
        let productQuantityInInventory = !!productInventory ? productInventory.inventories[0].quantity : 0;
        isAccurate = true;
        switch (item.product.inventoryMeasurementType.abrev) {
          case 'kg':
            if(!!item.quantity) {
              productQuantity = Number(item.quantity) * item.product.weightPerPiece;
              isAccurate = false;
            }
            else productQuantity = Number(item.weight);
            break;
          case 'pz':
            if(!!item.weight) {
              productQuantity = Number(item.weight) / item.product.weightPerPiece;
              isAccurate = false;
            }
            else productQuantity = Number(item.quantity);
            break;
        }

        if(!!buyer) {
          if(buyer.id == item.product.buyer.id) {
            if(productsMap.has(item.product.id)) {
              let productMapped: any = productsMap.get(item.product.id);
              let orderMatch = productMapped.orders.slice(-1)[0];
              productMapped.totalOrders += productQuantity;
              productMapped.totalToBuy += productQuantity;
              productMapped.orders.push({
                id: order.id,
                currentInventory: orderMatch.nextInventory,
                nextInventory: orderMatch.nextInventory > productQuantity ? orderMatch.nextInventory - productQuantity : 0,
                measurementType: !!item.quantity ? 'pz' : 'kg',
                oldQuantity: !!item.quantity ? Number(item.quantity) : (!!item.weight ? Number(item.weight) : 0),
                quantity: productQuantity,
                isAccurate
              });
            } else {
              productsMap.set(item.product.id, {
                name: item.product.name,
                measurementType: item.product.inventoryMeasurementType.abrev,
                buyer: item.product.buyer,
                inventory: productQuantityInInventory,
                totalOrders: productQuantity,
                totalToBuy: productQuantity,
                orders: [
                  {
                    id: order.id,
                    currentInventory: productQuantityInInventory,
                    nextInventory: productQuantityInInventory > productQuantity ? productQuantityInInventory - productQuantity : 0,
                    measurementType: !!item.quantity ? 'pz' : 'kg',
                    oldQuantity: !!item.quantity ? Number(item.quantity) : (!!item.weight ? Number(item.weight) : 0),
                    quantity: productQuantity,
                    isAccurate
                  }
                ],
              });
            }
          }
        }
        else {
          if(productsMap.has(item.product.id)) {
            let productMapped: any = productsMap.get(item.product.id);
            let orderMatch = productMapped.orders.slice(-1)[0];
            productMapped.totalOrders += productQuantity;
            productMapped.totalToBuy += productQuantity;
            productMapped.orders.push({
              id: order.id,
              currentInventory: orderMatch.nextInventory,
              nextInventory: orderMatch.nextInventory > productQuantity ? orderMatch.nextInventory - productQuantity : 0,
              measurementType: !!item.quantity ? 'pz' : 'kg',
              oldQuantity: !!item.quantity ? Number(item.quantity) : (!!item.weight ? Number(item.weight) : 0),
              quantity: productQuantity,
              isAccurate
            });
          } else {
            productsMap.set(item.product.id, {
              name: item.product.name,
              measurementType: item.product.inventoryMeasurementType.abrev,
              buyer: item.product.buyer,
              inventory: productQuantityInInventory,
              totalOrders: productQuantity,
              totalToBuy: productQuantity,
              orders: [
                {
                  id: order.id,
                  currentInventory: productQuantityInInventory,
                  nextInventory: productQuantityInInventory > productQuantity ? productQuantityInInventory - productQuantity : 0,
                  measurementType: !!item.quantity ? 'pz' : 'kg',
                  oldQuantity: !!item.quantity ? Number(item.quantity) : (!!item.weight ? Number(item.weight) : 0),
                  quantity: productQuantity,
                  isAccurate
                }
              ],
            });
          }
        }
      });
    });

    this.products = Array.from(productsMap.values());
  }

  ExportData() {
    let headers: any = ['Comprador', 'Producto', 'Unidad de medida', 'Inventario incial', 'Total odenes', 'Total a comprar'];
    let keys: any = ['buyer', 'product', 'measurement', 'inventory', 'totalOrders', 'totalToBuy'];
    let productsMapped = this.products.map(product => {
      let productMapped: any = {
        buyer: product.buyer.name,
        product: product.name,
        measurement: product.measurementType,
        inventory: `${product.inventory.toFixed(2)} ${product.measurementType}`,
        totalOrders: `${product.totalOrders.toFixed(2)} ${product.measurementType}`,
        totalToBuy: `${(product.inventory < product.totalToBuy ? product.totalToBuy - product.inventory : 0).toFixed(2)} ${product.measurementType}`,
      };

      return productMapped;
    });

    this.csv.GenerateCSV('compras_del_dia', productsMapped, keys, headers);
  }

}
