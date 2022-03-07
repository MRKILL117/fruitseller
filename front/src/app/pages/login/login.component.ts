import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from './../../services/toast.service';
import { FormService } from './../../services/form.service';
import { HttpService } from './../../services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private http: HttpService,
    public form: FormService,
    private toast: ToastService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  Login() {
    if(!this.loginForm.valid) {
      this.toast.ShowDefaultWarning('Favor de llenar todos los campos', 'Formulario incompleto');
      return;
    }
    this.http.Post(`/Account/Login`, {credentials: this.loginForm.value}).subscribe(userLogged => {
      console.log("Login", userLogged);
      this.toast.ShowDefaultSuccess('Sesión iniciada correctamente');
    }, err => {
      console.error("Error al hacer login", err);
    })
  }

}
