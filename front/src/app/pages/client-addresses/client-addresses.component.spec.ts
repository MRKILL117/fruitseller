import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAddressesComponent } from './client-addresses.component';

describe('ClientAddressesComponent', () => {
  let component: ClientAddressesComponent;
  let fixture: ComponentFixture<ClientAddressesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientAddressesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
