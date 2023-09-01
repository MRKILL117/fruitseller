import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsEntranceComponent } from './products-entrance.component';

describe('ProductsEntranceComponent', () => {
  let component: ProductsEntranceComponent;
  let fixture: ComponentFixture<ProductsEntranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsEntranceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsEntranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
