import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInventoryHistoryComponent } from './product-inventory-history.component';

describe('ProductInventoryHistoryComponent', () => {
  let component: ProductInventoryHistoryComponent;
  let fixture: ComponentFixture<ProductInventoryHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductInventoryHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInventoryHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
