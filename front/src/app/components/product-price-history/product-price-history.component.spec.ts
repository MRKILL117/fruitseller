import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPriceHistoryComponent } from './product-price-history.component';

describe('ProductPriceHistoryComponent', () => {
  let component: ProductPriceHistoryComponent;
  let fixture: ComponentFixture<ProductPriceHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductPriceHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPriceHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
