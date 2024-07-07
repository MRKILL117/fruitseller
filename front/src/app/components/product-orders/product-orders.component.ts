import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormService } from 'src/app/services/form.service';
import { HttpService } from 'src/app/services/http.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-product-orders',
  templateUrl: './product-orders.component.html',
  styleUrls: ['./product-orders.component.scss']
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
    let orderQuantityNeeded;
    switch (this.product.measurementType) {
      case 'kg': orderQuantityNeeded = Number(!!order.weight ? order.weight : 0); break;
      case 'pz': orderQuantityNeeded = Number(!!order.quantity ? order.quantity : 0); break;
      default: orderQuantityNeeded = Number(!!order.weight ? order.weight : 0); break;
    }
    return orderQuantityNeeded;
  }

}
