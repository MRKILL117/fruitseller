import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { onlyNumbers } from 'src/app/common/custom-validators.directive';
import { FormService } from 'src/app/services/form.service';
import { HttpService } from 'src/app/services/http.service';
import { ModalService } from 'src/app/services/modal.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-client-addresses',
  templateUrl: './client-addresses.component.html',
  styleUrls: ['./client-addresses.component.css']
})
export class ClientAddressesComponent implements OnInit {

  clientId: any = null;
  addresses: Array<any> = [];
  selectedAddress: any = null;
  isEditing: boolean = false;
  loading: any = {
    getting: false,
    updating: false
  }
  addressForm: FormGroup = new FormGroup({
    id: new FormControl(null, []),
    alias: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    externalNumber: new FormControl('', [Validators.required, onlyNumbers()]),
    internalNumber: new FormControl(null, [onlyNumbers()]),
    city: new FormControl('', [Validators.required]),
    province: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    postalCode: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5), onlyNumbers()]),
    clientId: new FormControl(null, [Validators.required]),
  });

  constructor(
    private nav: NavigationService,
    private http: HttpService,
    private toast: ToastService,
    public modal: ModalService,
    public form: FormService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.GetParams();
  }

  GetParams() {
    this.activatedRoute.params.subscribe(params => {
      this.clientId = params['clientId'];

      this.addressForm.get('clientId')?.setValue(this.clientId);
      this.GetAddresses();
    });
  }

  GoBack() {
    this.nav.GoToRoleRoute(`clients`);
  }

  GenerateClientAddress(address: any) {
    if(!!address) return address.street + " #" + address.externalNumber + (!!address.internalNumber ? (" int. " + address.internalNumber) : "")
    return '';
  }

  GetAddresses() {
    this.http.Get(`Addresses/OfClient/${this.clientId}`).subscribe((addresses: any) => {
      this.addresses = addresses;
    }, err => {
      console.error("Error getting client addresses");
    })
  }

  Create() {
    if(this.addressForm.invalid) {
      this.addressForm.markAllAsTouched();
      this.toast.ShowDefaultWarning(`Favor de llenar los campos obligatorios`);
      return;
    }

    if(this.isEditing) {
      this.Update();
      return;
    }

    this.http.Post(`Addresses`, {address: this.addressForm.value}).subscribe(newAddress => {
      this.GetAddresses();
      this.toast.ShowDefaultSuccess(`Dirección creada exitosamente`);
      this.modal.CloseModal();
      this.addressForm.reset();
    }, err => {
      let defaultMessage = `Error al crear la dirección`;
      this.toast.ShowDefaultDanger(err || defaultMessage);
      console.error("Error creating address", err);
    });
  }

  Update() {
    const address = this.addressForm.value;
    this.http.Patch(`Addresses`, {address}).subscribe(clientSaved => {
      this.GetAddresses();
      this.toast.ShowDefaultSuccess(`Dirección actualizada con éxito`);
      this.modal.CloseModal();
      this.addressForm.reset();
      this.isEditing = false;
    }, err => {
      let defaultMessage = `Error al actualizar la dirección`;
      this.toast.ShowDefaultDanger(err || defaultMessage);
      console.error("Error patching address", err);
    });
  }

  CancelEdition() {
    this.modal.CloseModal(this.loading.updating);
    this.isEditing = false;
    this.addressForm.reset();
  }

  EnableEdition(address: any) {
    this.isEditing = true;
    this.addressForm.setValue({
      id: !!address.id ? address.id : null,
      alias: !!address.alias ? address.alias : null,
      street: !!address.street ? address.street : null,
      externalNumber: !!address.externalNumber ? address.externalNumber : null,
      internalNumber: !!address.internalNumber ? address.internalNumber : null,
      city: !!address.city ? address.city : null,
      province: !!address.province ? address.province : null,
      country: !!address.country ? address.country : null,
      postalCode: !!address.postalCode ? address.postalCode : null,
      clientId: !!address.clientId ? address.clientId : null,
    });
  }

  Delete() {
    this.http.Delete(`Addresses/${this.selectedAddress.id}`, {}).subscribe(deletedClient => {
      this.GetAddresses();
      this.toast.ShowDefaultSuccess(`Dirección eliminada correctamente`);
      this.modal.CloseModal();
    }, err => {
      let defaultMessage = `Error al eliminar la dirección`;
      this.toast.ShowDefaultDanger(err || defaultMessage);
      console.error("Error deleting address", err);
    });
  }

  SetAsDefault(address: any) {
    this.http.Patch(`Addresses/${address.id}/SetAsDefault`, {}).subscribe(address => {
      this.toast.ShowDefaultSuccess(`Dirección establecida como predeterminada`);
      this.GetAddresses();
    }, err => {
      let defaultMessage = `Error al actualizar la dirección`;
      this.toast.ShowDefaultDanger(err || defaultMessage);
      console.error("Error setting as default", err);
    });
  }

  ResetForm() {
    this.addressForm.reset();
    this.addressForm.get('clientId')?.setValue(this.clientId);
  }

}
