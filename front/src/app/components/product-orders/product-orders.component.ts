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

}
