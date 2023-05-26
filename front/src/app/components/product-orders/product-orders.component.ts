import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormService } from 'src/app/services/form.service';
import { HttpService } from 'src/app/services/http.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-product-orders',
  templateUrl: './product-orders.component.html',
  styleUrls: ['./product-orders.component.css']
})
export class ProductOrdersComponent implements OnInit {

  @Input() product: any = null;
  @Input() toggleHistory: EventEmitter<boolean|null> | null = null;

  showHistory: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if(this.toggleHistory) {
      this.toggleHistory.subscribe(showHistory => {
      });
    }
  }

  GetOrderProductShoppingQuantity(order: any): number {
    if(!order || !this.product) return 0;
    const itemInOrder = order.items.find((item: any) => item.product.id == this.product.id);
    if(!itemInOrder) return 0;
    let orderQuantityNeeded;
    switch (itemInOrder.product.inventoryMeasurementType.abrev) {
      case 'kg': orderQuantityNeeded = Number(!!itemInOrder.weight ? itemInOrder.weight : 0); break;
      case 'pz': orderQuantityNeeded = Number(!!itemInOrder.quantity ? itemInOrder.quantity : 0); break;
      default: orderQuantityNeeded = Number(!!itemInOrder.weight ? itemInOrder.weight : 0); break;
    }
    return orderQuantityNeeded;
  }

  GetProductTotal() {
    let total = 0;
    this.product.orders.forEach((order: any) => {
      total += this.GetOrderProductShoppingQuantity(order);
    });
    return total;
  }

}
