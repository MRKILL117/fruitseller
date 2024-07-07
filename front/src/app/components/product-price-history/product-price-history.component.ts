import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { priceNumber } from 'src/app/common/custom-validators.directive';
import { FormService } from 'src/app/services/form.service';
import { HttpService } from 'src/app/services/http.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-product-price-history',
  templateUrl: './product-price-history.component.html',
  styleUrls: ['./product-price-history.component.scss']
})
export class ProductPriceHistoryComponent implements OnInit {

  @Input() product: any = null;
  @Input() history: boolean = false;
  @Input() toggleHistory: EventEmitter<boolean|null> | null = null;

  @Output() onUpdate: EventEmitter<any> = new EventEmitter<any>();

  showHistory: boolean = false;

  productPriceForm: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
    purchasePrice: new FormControl('', [Validators.required, priceNumber()]),
    salePrice: new FormControl('', [Validators.required, priceNumber()]),
  });

  constructor(
    public form: FormService,
    private toast: ToastService,
    private http: HttpService
  ) { }

  ngOnInit(): void {
    if(this.history) this.productPriceForm.disable();
    if(this.toggleHistory) {
      this.toggleHistory.subscribe(showHistory => {
        this.history = typeof showHistory === 'boolean' ? showHistory : !this.history;
        if(this.history) this.productPriceForm.disable();
        else this.productPriceForm.enable();
      });
    }
    this.productPriceForm.setValue({
      id: this.product.prices[0].id,
      purchasePrice: this.product.prices[0].purchasePrice,
      salePrice: this.product.prices[0].salePrice,
    });
  }

  UpdatePrice() {
    if (this.productPriceForm.invalid) {
      this.toast.ShowDefaultWarning(`Los valores no son validos`);
      return;
    }

    let priceHistory = this.productPriceForm.value;
    this.http.Patch(`/PriceHistories/${priceHistory.id}/UpdatePrices`, { priceHistory }).subscribe(updated => {
      this.toast.ShowDefaultSuccess(`Precios actualizados`);
    }, err => {
      console.error("Error updating prices", err);
    });
  }

}
