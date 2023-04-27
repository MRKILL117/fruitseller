import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSellOrderComponent } from './create-sell-order.component';

describe('CreateSellOrderComponent', () => {
  let component: CreateSellOrderComponent;
  let fixture: ComponentFixture<CreateSellOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSellOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSellOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
