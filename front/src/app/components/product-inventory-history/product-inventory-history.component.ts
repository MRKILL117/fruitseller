import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { onlyNumbers, priceNumber } from 'src/app/common/custom-validators.directive';
import { FormService } from 'src/app/services/form.service';
import { HttpService } from 'src/app/services/http.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-product-inventory-history',
  templateUrl: './product-inventory-history.component.html',
  styleUrls: ['./product-inventory-history.component.css']
})
export class ProductInventoryHistoryComponent implements OnInit {

  @Input() product: any = null;
  @Input() history: boolean = false;
  @Input() toggleHistory: EventEmitter<boolean|null> | null = null;

  @Output() onUpdate: EventEmitter<any> = new EventEmitter<any>();

  showHistory: boolean = false;

  productInventoryForm: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required, onlyNumbers()]),
  });

  constructor(
    public form: FormService,
    private toast: ToastService,
    private http: HttpService
  ) { }

  ngOnInit(): void {
    if(this.history) this.productInventoryForm.disable();
    if(this.toggleHistory) {
      this.toggleHistory.subscribe(showHistory => {
        this.history = typeof showHistory === 'boolean' ? showHistory : !this.history;
        if(this.history) this.productInventoryForm.disable();
        else this.productInventoryForm.enable();
      });
    }
    this.productInventoryForm.setValue({
      id: this.product.inventories[0].id,
      quantity: this.product.inventories[0].quantity
    });
  }

  Update() {
    if (this.productInventoryForm.invalid) {
      this.toast.ShowDefaultWarning(`Los valores no son validos`);
      return;
    }

    let inventory = this.productInventoryForm.value;
    this.http.Patch(`/Inventories/${inventory.id}`, { inventory }).subscribe(updated => {
      this.toast.ShowDefaultSuccess(`Precios actualizados`);
    }, err => {
      console.error("Error updating prices", err);
    });
  }

}
