import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyShoppingListComponent } from './daily-shopping-list.component';

describe('DailyShoppingListComponent', () => {
  let component: DailyShoppingListComponent;
  let fixture: ComponentFixture<DailyShoppingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyShoppingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyShoppingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
