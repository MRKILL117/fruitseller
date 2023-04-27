import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-price-history',
  templateUrl: './product-price-history.component.html',
  styleUrls: ['./product-price-history.component.css']
})
export class ProductPriceHistoryComponent implements OnInit {

  @Input() product: any = null;
  showHistory: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
