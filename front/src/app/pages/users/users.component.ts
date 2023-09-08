import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { onlyNumbers } from 'src/app/common/custom-validators.directive';
import { filter } from 'src/app/common/data-types.interface';
import { CsvService } from 'src/app/services/csv.service';
import { FormService } from 'src/app/services/form.service';
import { HttpService } from 'src/app/services/http.service';
import { ModalService } from 'src/app/services/modal.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  user: any = null;
  users: Array<any> = [];
  roles: Array<any> = [];
  selectedUser: any = null;
  isEditing: boolean = false;
  usersCsv: any;
  usersToUpload: Array<any> = [];
  usersFailed: Array<any> = [];
  filters: Array<filter> = [
    {
      name: 'text',
      type: 'text',
      placeholder: 'Buscar'
    }
  ];
  loading: any = {
    de_activating: null,
    updating: false,
    getting: true
  }
  userForm: FormGroup = new FormGroup({
    id: new FormControl(null, []),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl(null, [Validators.required]),
  });
  changePasswordForm: FormGroup = new FormGroup({
    password: new FormControl('', []),
    confirmPassword: new FormControl('', [Validators.required]),
  });
  dataConversions: Array<any> = [
    {
      oldKey: 'Nombre',
      newKey: 'username'
    },
    {
      oldKey: 'Correo',
      newKey: 'email'
    },
    {
      oldKey: 'Rol',
      newKey: 'role'
    },
  ];

  public get csvAcceptLabel() {
    if(!!this.usersFailed.length) return 'Reintentar';
    return `Subir`;
  }

  constructor(
    public form: FormService,
    public modal: ModalService,
    private toast: ToastService,
    private http: HttpService,
    private csv: CsvService,
    private nav: NavigationService
  ) { }

  ngOnInit(): void {
    this.GetRoles();
    this.GetUsers();
  }

  GoHome() {
    this.nav.GoToRoleRoute('');
  }

  GetTooltipUserLabel(user: any): string {
    let label = `Deshabilitar`;
    if(!!user) label = user.isEnabled ? 'Deshabilitar' : 'Habilitar';
    return label;
  }

  GoToUserAddresses(user: any) {
    this.nav.GoToRoleRoute(`/Accounts/${user.id}/addresses`);
  }

  GetRoles() {
    this.http.Get(`Accounts/Roles`).subscribe((roles: any) => {
      this.roles = roles;
      this.filters.push({
        type: 'select',
        name: 'roles',
        placeholder: 'Roles',
        config: {
          multiple: true,
          options: roles
        }
      });
    }, err => {
      console.error("Error getting roles", err);
    });
  }

  GetUsers(filters: any = null) {
    this.loading.getting = true;
    let endpoint = `/Accounts`;
    if(!!filters) endpoint += `/FilteredBy/Text/${filters.text}/Roles/${JSON.stringify(filters.roles)}`;
    this.http.Get(endpoint).subscribe((users: any) => {
      this.users = users;
      this.loading.getting = false;
    }, err => {
      console.error("Error getting users", err);
      this.loading.getting = false;
    });
  }

  RegisterUser() {
    if(this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      this.toast.ShowDefaultWarning(`Favor de llenar los campos obligatorios`);
      return;
    }

    if(this.isEditing) {
      this.UpdateUser();
      return;
    }

    this.http.Post(`/Accounts/WithRole`, {user: this.userForm.value}).subscribe(newuser => {
      this.GetUsers();
      this.toast.ShowDefaultSuccess(`Usuario creado exitosamente`);
      this.userForm.reset();
      this.modal.CloseModal();
    }, err => {
      let defaultMessage = `Error al crear el usuario`;
      this.toast.ShowDefaultDanger(err || defaultMessage);
      console.error("Error creating user", err);
    });
  }

  RegisterUsers() {
    this.http.Post(`/Accounts/Array`, {users: this.usersToUpload}).subscribe((data: any) => {
      this.usersFailed = data.usersFailed;
      if(!!data.usersSuccess.length) this.toast.ShowDefaultSuccess(`${data.usersSuccess.length} usuarios creados correctamente`);
      if(data.usersFailed.length) {
        this.toast.ShowDefaultWarning(`${data.usersFailed.length} usuarios no se pudieron crear`);
      }
      else {
        this.modal.CloseModal();
        this.usersToUpload = [];
      }
      this.GetUsers();
    }, err => {
      console.error("Error creating users", err);
      this.toast.ShowDefaultDanger(`Error al crear usuarios`);
    });
  }

  UpdateUser() {
    const user = this.userForm.value;
    this.http.Patch(`/Accounts`, {user}).subscribe(userSaved => {
      this.GetUsers();
      this.toast.ShowDefaultSuccess(`Usuario actualizado con éxito`);
      this.modal.CloseModal();
      this.isEditing = false;
    }, err => {
      console.error("Error patching user", err);
      let defaultMessage = `Error al actualizar el usuario`;
      this.toast.ShowDefaultDanger(err || defaultMessage);
    });
  }

  CancelEdition() {
    this.modal.CloseModal(this.loading.updating);
    this.isEditing = false;
    this.userForm.reset();
  }

  EditUser(user: any) {
    this.isEditing = true;
    this.userForm.setValue({
      id: !!user.id ? user.id : null,
      username: !!user.username ? user.username : null,
      email: !!user.email ? user.email : null,
      role: !!user.role ? user.role : null,
    });
  }

  DeleteUser() {
    this.http.Delete(`/Accounts/${this.selectedUser.id}`, {}).subscribe(deleteduser => {
      this.GetUsers();
      this.toast.ShowDefaultSuccess(`Usuario eliminado correctamente`);
      this.modal.CloseModal();
    }, err => {
      console.error("Error deleting user", err);
      let defaultMessage = `Error al eliminar usuario`;
      this.toast.ShowDefaultDanger(err || defaultMessage);
    });
  }

  ChangePassword() {
    if(!this.changePasswordForm.valid) {
      this.toast.ShowDefaultWarning(`Favor de llenar el formulario correctamente`, `Formulario incompleto`);
      this.changePasswordForm.markAllAsTouched();
      return;
    }
    
    this.loading.restoringPassword = true;
    let postParams = {
      newPassword: this.changePasswordForm.value.password,
      generateToken: this.selectedUser.id == this.user?.id,
    }
    this.http.Patch(`/Accounts/${this.selectedUser ? this.selectedUser.id : 0}/SetPassword`, postParams).subscribe((userUpdated: any) => {
      if(userUpdated.token) {
        const token = userUpdated.token;
        delete userUpdated.token;
        localStorage.setItem('token', token.id);
        localStorage.setItem('user', JSON.stringify(userUpdated));
      }
      this.toast.ShowDefaultSuccess(`Contraseña actualizada correctamente`);
      this.modal.CloseModal();
      this.form.ResetForm(this.changePasswordForm);
      this.loading.restoringPassword = false;
    }, err => {
      console.error("Error al cambiar contraseña", err);
      this.toast.ShowDefaultDanger(`Error al cambiar contraseña`);
      this.loading.restoringPassword = false;
    });
  }

  ToggleEnabled(user: any) {
    this.loading.de_activating = user.id;
    this.http.Patch(`/Accounts/${user.id}/ToggleEnabled`, {}).subscribe((user: any) => {
      this.toast.ShowDefaultSuccess(`Usuario ${user.isEnabled ? 'activado' : 'desactivado'} correctamente`);
      this.GetUsers();
      this.loading.de_activating = null;
    }, err => {
      console.error("Error toggling user enable", err);
      this.loading.de_activating = null;
    });
  }

  DownloadTemplate() {
    this.http.DownloadFileWithoutApi("assets/templates/plantilla_usuarios.csv", 'plantilla_usuarios.csv');
  }

  OnFileSelected(event: any) {
    const file = event.target.files[0];
    this.usersCsv = file;
    if(!file) return;
    const FILE_READER = new FileReader();
    FILE_READER.onload = (reader) => {
      this.csv.ReadCSV(FILE_READER.result).then(res => {
        console.log(res.data);
        this.usersToUpload = this.csv.FormatData(res.data, this.dataConversions).map(user => {
          return {
            username: user.username,
            email: user.email,
            rol: user.rol,
            status: user.role?.role?.name,
          }
        });
      });
    };
    FILE_READER.readAsText(file, 'ISO-8859-3');
  }

  GenerateuserAddress(user: any) {
    if(!!user.addresses.length) return user.addresses[0].street + " #" + user.addresses[0].externalNumber + (!!user.addresses[0].internalNumber ? (" int. " + user.addresses[0].internalNumber) : "")
    else return `Sin direccioón`;
  }

  GenerateCsv() {
    let headers: any = ['Nombre', 'Correo', 'Rol', 'Estatus'];
    let keys: any = ['username', 'email', 'rol', 'status'];
    let users: Array<any> = this.users.map(user => {
      return {
        username: user.username,
        email: user.email,
        rol: user.rol,
        status: user.role?.role?.name,
      }
    })
    this.csv.GenerateCSV("usuarios", users, keys, headers);
  }

}
