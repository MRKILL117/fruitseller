"use strict";(self.webpackChunkfront=self.webpackChunkfront||[]).push([[109],{7109:(X,g,a)=>{a.r(g),a.d(g,{UsersModule:()=>V});var d=a(6019),Z=a(3697),r=a(7537),f=a(107),T=a(3550),e=a(1514),v=a(822),U=a(9853),x=a(6588),A=a(6845),b=a(1843),C=a(6155),q=a(5749),p=a(1105),h=a(1435);function F(s,i){1&s&&e._UZ(0,"div",27)}function N(s,i){if(1&s){const t=e.EpF();e.TgZ(0,"i",28),e.NdJ("click",function(){e.CHM(t);const o=e.oxw().$implicit;return e.oxw(3).ToggleEnabled(o)}),e.qZA()}2&s&&e.Q6J("adaptivePosition",!0)}function w(s,i){if(1&s){const t=e.EpF();e.TgZ(0,"i",29),e.NdJ("click",function(){e.CHM(t);const o=e.oxw().$implicit;return e.oxw(3).ToggleEnabled(o)}),e.qZA()}2&s&&e.Q6J("adaptivePosition",!0)}function k(s,i){1&s&&e._UZ(0,"i",30)}const E=function(s,i){return{"badge-success":s,"badge-danger":i}};function y(s,i){if(1&s&&(e.TgZ(0,"tr"),e.TgZ(1,"td"),e._uU(2),e.qZA(),e.TgZ(3,"td"),e._uU(4),e.qZA(),e.TgZ(5,"td"),e._uU(6),e.qZA(),e.TgZ(7,"td"),e.TgZ(8,"span",21),e._uU(9),e.qZA(),e.qZA(),e.TgZ(10,"td"),e.TgZ(11,"div",22),e.YNc(12,F,1,0,"div",23),e.YNc(13,N,1,1,"i",24),e.YNc(14,w,1,1,"i",25),e.YNc(15,k,1,0,"i",26),e.qZA(),e.qZA(),e.qZA()),2&s){const t=i.$implicit,n=e.oxw(3);e.xp6(2),e.Oqu(t.username),e.xp6(2),e.Oqu(t.email),e.xp6(2),e.Oqu(null==t.role?null:t.role.name),e.xp6(2),e.Q6J("ngClass",e.WLB(9,E,t.isEnabled,!t.isEnabled)),e.xp6(1),e.hij(" ",t.isEnabled?"Habilitado":"Deshabilitado"," "),e.xp6(3),e.Q6J("ngIf",null==n.loading.de_activating||n.loading.de_activating!=t.id),e.xp6(1),e.Q6J("ngIf",t.isEnabled),e.xp6(1),e.Q6J("ngIf",!t.isEnabled),e.xp6(1),e.Q6J("ngIf",n.loading.de_activating==t.id)}}function z(s,i){if(1&s&&(e.TgZ(0,"table",18),e.TgZ(1,"thead",19),e.TgZ(2,"tr"),e.TgZ(3,"th"),e._uU(4,"Username"),e.qZA(),e.TgZ(5,"th"),e._uU(6,"Email"),e.qZA(),e.TgZ(7,"th"),e._uU(8,"Rol"),e.qZA(),e.TgZ(9,"th"),e._uU(10,"Estatus"),e.qZA(),e._UZ(11,"th"),e.qZA(),e.qZA(),e.TgZ(12,"tbody"),e.YNc(13,y,16,12,"tr",20),e.qZA(),e.qZA()),2&s){const t=e.oxw(2);e.xp6(13),e.Q6J("ngForOf",t.users)}}function J(s,i){if(1&s&&(e.TgZ(0,"div",16),e.YNc(1,z,14,1,"table",17),e.qZA()),2&s){const t=e.oxw(),n=e.MAs(16);e.xp6(1),e.Q6J("ngIf",!(null==t.users||!t.users.length))("ngIfElse",n)}}function I(s,i){1&s&&(e.TgZ(0,"div",31),e._UZ(1,"i",32),e.qZA())}function M(s,i){1&s&&(e.TgZ(0,"div",16),e.TgZ(1,"div",33),e._uU(2," No se encontraron usuarios "),e.qZA(),e.qZA())}function S(s,i){if(1&s&&(e.TgZ(0,"tr"),e.TgZ(1,"td"),e._uU(2),e.qZA(),e.TgZ(3,"td"),e._uU(4),e.qZA(),e.TgZ(5,"td"),e._uU(6),e.qZA(),e.qZA()),2&s){const t=i.$implicit;e.xp6(2),e.Oqu(t.user.name),e.xp6(2),e.Oqu(t.user.rfc),e.xp6(2),e.Oqu(t.reason?t.reason:"Error al crear")}}function G(s,i){if(1&s&&(e.TgZ(0,"div",46),e.TgZ(1,"div",47),e._uU(2," Error al crear usuarios "),e.qZA(),e.TgZ(3,"table",48),e.TgZ(4,"thead",49),e.TgZ(5,"tr"),e.TgZ(6,"th"),e._uU(7,"Nombre"),e.qZA(),e.TgZ(8,"th"),e._uU(9,"RFC"),e.qZA(),e.TgZ(10,"th"),e._uU(11,"Motivo"),e.qZA(),e.qZA(),e.qZA(),e.TgZ(12,"tbody"),e.YNc(13,S,7,3,"tr",20),e.qZA(),e.qZA(),e.qZA()),2&s){const t=e.oxw(2);e.xp6(13),e.Q6J("ngForOf",t.usersFailed)}}function D(s,i){1&s&&(e.TgZ(0,"span"),e._uU(1,"Cancelar"),e.qZA())}function Y(s,i){1&s&&(e.TgZ(0,"span"),e._uU(1,"Cerrar"),e.qZA())}function R(s,i){if(1&s){const t=e.EpF();e.TgZ(0,"div",34),e.TgZ(1,"h2",35),e._uU(2,"Agregar por CSV"),e.qZA(),e.TgZ(3,"i",36),e.NdJ("click",function(){e.CHM(t);const o=e.oxw();return o.modal.CloseModal(o.loading.updating)}),e.qZA(),e.qZA(),e.TgZ(4,"div",37),e.TgZ(5,"div",38),e.TgZ(6,"div",1),e.TgZ(7,"button",39),e.NdJ("click",function(){return e.CHM(t),e.MAs(12).click()}),e._uU(8," Seleccionar archivo "),e.qZA(),e.TgZ(9,"span"),e._uU(10),e.qZA(),e.TgZ(11,"input",40,41),e.NdJ("change",function(o){return e.CHM(t),e.oxw().OnFileSelected(o)}),e.qZA(),e.qZA(),e.YNc(13,G,14,1,"div",42),e.qZA(),e.qZA(),e.TgZ(14,"div",43),e.TgZ(15,"button",44),e.NdJ("click",function(){return e.CHM(t),e.oxw().modal.CloseModal()}),e.YNc(16,D,2,0,"span",45),e.YNc(17,Y,2,0,"span",45),e.qZA(),e.TgZ(18,"button",5),e.NdJ("click",function(){return e.CHM(t),e.oxw().RegisterUsers()}),e._uU(19),e.qZA(),e.qZA()}if(2&s){const t=e.oxw();e.xp6(10),e.hij(" ",null==t.usersCsv?null:t.usersCsv.name," "),e.xp6(3),e.Q6J("ngIf",!(null==t.usersFailed||!t.usersFailed.length)),e.xp6(3),e.Q6J("ngIf",!(null!=t.usersFailed&&t.usersFailed.length)),e.xp6(1),e.Q6J("ngIf",!(null==t.usersFailed||!t.usersFailed.length)),e.xp6(2),e.hij(" ",t.csvAcceptLabel," ")}}function O(s,i){if(1&s){const t=e.EpF();e.TgZ(0,"div",34),e.TgZ(1,"h2",35),e._uU(2,"Eliminar usuario"),e.qZA(),e.TgZ(3,"i",36),e.NdJ("click",function(){return e.CHM(t),e.oxw().modal.CloseModal()}),e.qZA(),e.qZA(),e.TgZ(4,"div",37),e.TgZ(5,"div",50),e._uU(6),e.qZA(),e.qZA(),e.TgZ(7,"div",43),e.TgZ(8,"button",44),e.NdJ("click",function(){return e.CHM(t),e.oxw().modal.CloseModal()}),e._uU(9," No, cancelar "),e.qZA(),e.TgZ(10,"button",51),e.NdJ("click",function(){return e.CHM(t),e.oxw().DeleteUser()}),e._uU(11," Si, eliminar "),e.qZA(),e.qZA()}if(2&s){const t=e.oxw();e.xp6(6),e.hij(' \xbfEsta seguro que desea eliminar a "',null==t.selectedUser?null:t.selectedUser.username,'"? ')}}function P(s,i){1&s&&(e.TgZ(0,"span",68),e._uU(1," Campo obligatorio "),e.qZA())}function Q(s,i){if(1&s&&(e.TgZ(0,"div",66),e.YNc(1,P,2,0,"span",67),e.qZA()),2&s){const t=e.oxw(2);let n;e.xp6(1),e.Q6J("ngIf",null==(n=t.form.GetFormControlByName(t.userForm,"username"))?null:n.errors.required)}}function H(s,i){1&s&&(e.TgZ(0,"span",68),e._uU(1," Campo obligatorio "),e.qZA())}function B(s,i){1&s&&(e.TgZ(0,"span",68),e._uU(1," Valor con formato inv\xe1lido "),e.qZA())}function j(s,i){if(1&s&&(e.TgZ(0,"div",66),e.YNc(1,H,2,0,"span",67),e.YNc(2,B,2,0,"span",67),e.qZA()),2&s){const t=e.oxw(2);let n,o;e.xp6(1),e.Q6J("ngIf",null==(n=t.form.GetFormControlByName(t.userForm,"email"))?null:n.errors.required),e.xp6(1),e.Q6J("ngIf",null==(o=t.form.GetFormControlByName(t.userForm,"email"))?null:o.errors.email)}}function $(s,i){1&s&&(e.TgZ(0,"span",68),e._uU(1," Campo obligatorio "),e.qZA())}function W(s,i){if(1&s&&(e.TgZ(0,"div",66),e.YNc(1,$,2,0,"span",67),e.qZA()),2&s){const t=e.oxw(2);let n;e.xp6(1),e.Q6J("ngIf",null==(n=t.form.GetFormControlByName(t.userForm,"role"))?null:n.errors.required)}}function L(s,i){if(1&s){const t=e.EpF();e.TgZ(0,"div",34),e.TgZ(1,"h2",35),e._uU(2),e.qZA(),e.TgZ(3,"i",36),e.NdJ("click",function(){return e.CHM(t),e.oxw().CancelEdition()}),e.qZA(),e.qZA(),e.TgZ(4,"div",37),e.TgZ(5,"div",52),e.TgZ(6,"form",53),e.TgZ(7,"div",54),e.TgZ(8,"div",55),e.TgZ(9,"div",56),e.TgZ(10,"label"),e._uU(11,"Username "),e.TgZ(12,"span",57),e._uU(13,"*"),e.qZA(),e.qZA(),e.TgZ(14,"div",58),e._UZ(15,"i",59),e.TgZ(16,"input",60),e.NdJ("keyup.enter",function(){return e.CHM(t),e.oxw().RegisterUser()}),e.qZA(),e.qZA(),e.YNc(17,Q,2,1,"div",61),e.qZA(),e.qZA(),e.TgZ(18,"div",55),e.TgZ(19,"div",56),e.TgZ(20,"label"),e._uU(21,"Email "),e.TgZ(22,"span",57),e._uU(23,"*"),e.qZA(),e.qZA(),e.TgZ(24,"div",58),e._UZ(25,"i",62),e.TgZ(26,"input",63),e.NdJ("keyup.enter",function(){return e.CHM(t),e.oxw().RegisterUser()}),e.qZA(),e.qZA(),e.YNc(27,j,3,2,"div",61),e.qZA(),e.qZA(),e.TgZ(28,"div",55),e.TgZ(29,"div",56),e.TgZ(30,"label"),e._uU(31,"Rol "),e.TgZ(32,"span",57),e._uU(33,"*"),e.qZA(),e.qZA(),e._UZ(34,"ng-select",64),e.YNc(35,W,2,1,"div",61),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(36,"div",43),e.TgZ(37,"button",44),e.NdJ("click",function(){return e.CHM(t),e.oxw().CancelEdition()}),e._uU(38," Cancelar "),e.qZA(),e.TgZ(39,"button",65),e.NdJ("click",function(){return e.CHM(t),e.oxw().RegisterUser()}),e._uU(40),e.qZA(),e.qZA()}if(2&s){const t=e.oxw();let n,o,l;e.xp6(2),e.hij("",t.isEditing?"Actualizar":"Agregar"," usuario"),e.xp6(4),e.Q6J("formGroup",t.userForm),e.xp6(11),e.Q6J("ngIf",(null==(n=t.form.GetFormControlByName(t.userForm,"username"))?null:n.touched)&&(null==(n=t.form.GetFormControlByName(t.userForm,"username"))?null:n.errors)),e.xp6(10),e.Q6J("ngIf",(null==(o=t.form.GetFormControlByName(t.userForm,"email"))?null:o.touched)&&(null==(o=t.form.GetFormControlByName(t.userForm,"email"))?null:o.errors)),e.xp6(7),e.Q6J("items",t.roles),e.xp6(1),e.Q6J("ngIf",(null==(l=t.form.GetFormControlByName(t.userForm,"role"))?null:l.touched)&&(null==(l=t.form.GetFormControlByName(t.userForm,"role"))?null:l.errors)),e.xp6(5),e.hij(" ",t.isEditing?"Actualizar":"Agregar"," ")}}const K=[{path:"",component:(()=>{class s{constructor(t,n,o,l,c,u){this.form=t,this.modal=n,this.toast=o,this.http=l,this.csv=c,this.nav=u,this.user=null,this.users=[],this.roles=[],this.selectedUser=null,this.isEditing=!1,this.usersToUpload=[],this.usersFailed=[],this.filters=[{name:"text",type:"text",placeholder:"Buscar"}],this.loading={de_activating:null,updating:!1,getting:!0},this.userForm=new r.cw({id:new r.NI(null,[]),username:new r.NI("",[r.kI.required]),email:new r.NI("",[r.kI.required,r.kI.email]),role:new r.NI(null,[r.kI.required])}),this.changePasswordForm=new r.cw({password:new r.NI("",[]),confirmPassword:new r.NI("",[r.kI.required])}),this.dataConversions=[{oldKey:"Nombre",newKey:"username"},{oldKey:"Correo",newKey:"email"},{oldKey:"Rol",newKey:"role"}]}get csvAcceptLabel(){return this.usersFailed.length?"Reintentar":"Subir"}ngOnInit(){this.GetRoles(),this.GetUsers()}GoHome(){this.nav.GoToRoleRoute("")}GetTooltipUserLabel(t){let n="Deshabilitar";return t&&(n=t.isEnabled?"Deshabilitar":"Habilitar"),n}GoToUserAddresses(t){this.nav.GoToRoleRoute(`/Accounts/${t.id}/addresses`)}GetRoles(){this.http.Get("Accounts/Roles").subscribe(t=>{this.roles=t,this.filters.push({type:"select",name:"roles",placeholder:"Roles",config:{multiple:!0,options:t}})},t=>{console.error("Error getting roles",t)})}GetUsers(t=null){this.loading.getting=!0;let n="/Accounts";t&&(n+=`/FilteredBy/Text/${t.text}/Roles/${JSON.stringify(t.roles)}`),this.http.Get(n).subscribe(o=>{this.users=o,this.loading.getting=!1},o=>{console.error("Error getting users",o),this.loading.getting=!1})}RegisterUser(){if(this.userForm.invalid)return this.userForm.markAllAsTouched(),void this.toast.ShowDefaultWarning("Favor de llenar los campos obligatorios");this.isEditing?this.UpdateUser():this.http.Post("/Accounts/WithRole",{user:this.userForm.value}).subscribe(t=>{this.GetUsers(),this.toast.ShowDefaultSuccess("Usuario creado exitosamente"),this.userForm.reset(),this.modal.CloseModal()},t=>{this.toast.ShowDefaultDanger(t||"Error al crear el usuario"),console.error("Error creating user",t)})}RegisterUsers(){this.http.Post("/Accounts/Array",{users:this.usersToUpload}).subscribe(t=>{this.usersFailed=t.usersFailed,t.usersSuccess.length&&this.toast.ShowDefaultSuccess(`${t.usersSuccess.length} usuarios creados correctamente`),t.usersFailed.length?this.toast.ShowDefaultWarning(`${t.usersFailed.length} usuarios no se pudieron crear`):(this.modal.CloseModal(),this.usersToUpload=[]),this.GetUsers()},t=>{console.error("Error creating users",t),this.toast.ShowDefaultDanger("Error al crear usuarios")})}UpdateUser(){this.http.Patch("/Accounts",{user:this.userForm.value}).subscribe(n=>{this.GetUsers(),this.toast.ShowDefaultSuccess("Usuario actualizado con \xe9xito"),this.modal.CloseModal(),this.isEditing=!1},n=>{console.error("Error patching user",n),this.toast.ShowDefaultDanger(n||"Error al actualizar el usuario")})}CancelEdition(){this.modal.CloseModal(this.loading.updating),this.isEditing=!1,this.userForm.reset()}EditUser(t){this.isEditing=!0,this.userForm.setValue({id:t.id?t.id:null,username:t.username?t.username:null,email:t.email?t.email:null,role:t.role?t.role:null})}DeleteUser(){this.http.Delete(`/Accounts/${this.selectedUser.id}`,{}).subscribe(t=>{this.GetUsers(),this.toast.ShowDefaultSuccess("Usuario eliminado correctamente"),this.modal.CloseModal()},t=>{console.error("Error deleting user",t),this.toast.ShowDefaultDanger(t||"Error al eliminar usuario")})}ChangePassword(){var t;if(!this.changePasswordForm.valid)return this.toast.ShowDefaultWarning("Favor de llenar el formulario correctamente","Formulario incompleto"),void this.changePasswordForm.markAllAsTouched();this.loading.restoringPassword=!0;let n={newPassword:this.changePasswordForm.value.password,generateToken:this.selectedUser.id==(null===(t=this.user)||void 0===t?void 0:t.id)};this.http.Patch(`/Accounts/${this.selectedUser?this.selectedUser.id:0}/SetPassword`,n).subscribe(o=>{if(o.token){const l=o.token;delete o.token,localStorage.setItem("token",l.id),localStorage.setItem("user",JSON.stringify(o))}this.toast.ShowDefaultSuccess("Contrase\xf1a actualizada correctamente"),this.modal.CloseModal(),this.form.ResetForm(this.changePasswordForm),this.loading.restoringPassword=!1},o=>{console.error("Error al cambiar contrase\xf1a",o),this.toast.ShowDefaultDanger("Error al cambiar contrase\xf1a"),this.loading.restoringPassword=!1})}ToggleEnabled(t){this.loading.de_activating=t.id,this.http.Patch(`/Accounts/${t.id}/ToggleEnabled`,{}).subscribe(n=>{this.toast.ShowDefaultSuccess(`Usuario ${n.isEnabled?"activado":"desactivado"} correctamente`),this.GetUsers(),this.loading.de_activating=null},n=>{console.error("Error toggling user enable",n),this.loading.de_activating=null})}DownloadTemplate(){this.http.DownloadFileWithoutApi("assets/templates/plantilla_usuarios.csv","plantilla_usuarios.csv")}OnFileSelected(t){const n=t.target.files[0];if(this.usersCsv=n,!n)return;const o=new FileReader;o.onload=l=>{this.csv.ReadCSV(o.result).then(c=>{console.log(c.data),this.usersToUpload=this.csv.FormatData(c.data,this.dataConversions).map(u=>{var m,_;return{username:u.username,email:u.email,rol:u.rol,status:null===(_=null===(m=u.role)||void 0===m?void 0:m.role)||void 0===_?void 0:_.name}})})},o.readAsText(n,"ISO-8859-3")}GenerateuserAddress(t){return t.addresses.length?t.addresses[0].street+" #"+t.addresses[0].externalNumber+(t.addresses[0].internalNumber?" int. "+t.addresses[0].internalNumber:""):"Sin direccio\xf3n"}GenerateCsv(){let o=this.users.map(l=>{var c,u;return{username:l.username,email:l.email,rol:l.rol,status:null===(u=null===(c=l.role)||void 0===c?void 0:c.role)||void 0===u?void 0:u.name}});this.csv.GenerateCSV("usuarios",o,["username","email","rol","status"],["Nombre","Correo","Rol","Estatus"])}}return s.\u0275fac=function(t){return new(t||s)(e.Y36(v.o),e.Y36(U.Z),e.Y36(x.k),e.Y36(A.O),e.Y36(b.M),e.Y36(C.f))},s.\u0275cmp=e.Xpm({type:s,selectors:[["app-users"]],decls:23,vars:4,consts:[[1,"content"],[1,"d-flex","align-items-center","justify-content-between"],[1,"page-title"],[1,"zmdi","zmdi-home","zmdi-hc-lg","mr-2","clickeable",3,"click"],[1,"d-flex",2,"gap","12px"],[1,"btn","btn-success",3,"click"],[1,"zmdi","zmdi-plus-circle-o","zmdi-hc-lg","mr-2"],[1,"row","justify-content-center"],[1,"col-12","col-lg-11","mt-3","mb-4"],[3,"timerTrigger","filters","onSearch"],["class","col-12 col-lg-11",4,"ngIf","ngIfElse"],["bigLoading",""],["noUsersMessage",""],["addClientsByCsvModal",""],["deleteUserModal",""],["addOrEditUserModal",""],[1,"col-12","col-lg-11"],["class","table table-striped",4,"ngIf","ngIfElse"],[1,"table","table-striped"],[1,"table-thead"],[4,"ngFor","ngForOf"],[1,"badge",3,"ngClass"],[1,"d-flex","align-items-center","justify-content-center",2,"gap","6px"],["class","sign-in-disabled-container clickeable",4,"ngIf"],["class","zmdi zmdi-block-alt zmdi-hc-lg clickeable","tooltip","Desactivar","placement","top",3,"adaptivePosition","click",4,"ngIf"],["class","zmdi zmdi-sign-in zmdi-hc-lg clickeable","tooltip","Activar","placement","top",3,"adaptivePosition","click",4,"ngIf"],["class","zmdi zmdi-spinner zmdi-hc-lg zmdi-hc-spin",4,"ngIf"],[1,"sign-in-disabled-container","clickeable"],["tooltip","Desactivar","placement","top",1,"zmdi","zmdi-block-alt","zmdi-hc-lg","clickeable",3,"adaptivePosition","click"],["tooltip","Activar","placement","top",1,"zmdi","zmdi-sign-in","zmdi-hc-lg","clickeable",3,"adaptivePosition","click"],[1,"zmdi","zmdi-spinner","zmdi-hc-lg","zmdi-hc-spin"],[1,"col-12","w-100","h-75","d-flex","align-items-center","justify-content-center",2,"min-height","min-content"],[1,"zmdi","zmdi-spinner","zmdi-hc-5x","zmdi-hc-spin"],[1,"no-items-message"],[1,"modal-header"],[1,"modal-title"],[1,"close-modal-button","zmdi","zmdi-close-circle-o","zmdi-hc-2x","clickeable",3,"click"],[1,"modal-body"],[1,"d-flex","flex-column","justify-content-between"],[1,"btn","btn-outline-primary",3,"click"],["type","file","accept",".csv",1,"d-none",3,"change"],["csvFileInput",""],["class","modal-table",4,"ngIf"],[1,"modal-footer"],[1,"btn","btn-secondary",3,"click"],[4,"ngIf"],[1,"modal-table"],[1,"my-4","text-center",2,"font-size","1.25rem","font-weight","700"],[1,"table","table-danger","table-striped"],[1,"table-thead","bg-danger"],[1,"d-flex"],[1,"btn","btn-danger",3,"click"],[1,"w-100"],[3,"formGroup"],[1,"row"],[1,"col-12"],[1,"form-group"],[1,"text-danger"],[1,"input-container"],[1,"input-icon","zmdi","zmdi-account-o","zmdi-hc-lg"],["type","text","placeholder","Nombre del usuario","formControlName","username",1,"form-control",3,"keyup.enter"],["class","error-messages",4,"ngIf"],[1,"input-icon","zmdi","zmdi-email","zmdi-hc-lg"],["type","text","placeholder","Correo del usuario","formControlName","email",1,"form-control",3,"keyup.enter"],["bindLabel","description","bindValue","name","placeholder","Rol","formControlName","role",1,"",3,"items"],[1,"btn","btn-primary",3,"click"],[1,"error-messages"],["class","d-block",4,"ngIf"],[1,"d-block"]],template:function(t,n){if(1&t){const o=e.EpF();e.TgZ(0,"div",0),e.TgZ(1,"div",1),e.TgZ(2,"div",2),e.TgZ(3,"i",3),e.NdJ("click",function(){return n.GoHome()}),e.qZA(),e._uU(4," Mis usuarios "),e.qZA(),e.TgZ(5,"div",4),e.TgZ(6,"button",5),e.NdJ("click",function(){e.CHM(o);const c=e.MAs(22);return n.modal.OpenModal(c)}),e._UZ(7,"i",6),e._uU(8," Agregar "),e.qZA(),e.qZA(),e.qZA(),e.TgZ(9,"div",7),e.TgZ(10,"div",8),e.TgZ(11,"app-filters",9),e.NdJ("onSearch",function(c){return n.GetUsers(c)}),e.qZA(),e.qZA(),e.YNc(12,J,2,2,"div",10),e.qZA(),e.qZA(),e.YNc(13,I,2,0,"ng-template",null,11,e.W1O),e.YNc(15,M,3,0,"ng-template",null,12,e.W1O),e.YNc(17,R,20,5,"ng-template",null,13,e.W1O),e.YNc(19,O,12,1,"ng-template",null,14,e.W1O),e.YNc(21,L,41,7,"ng-template",null,15,e.W1O)}if(2&t){const o=e.MAs(14);e.xp6(11),e.Q6J("timerTrigger",!0)("filters",n.filters),e.xp6(1),e.Q6J("ngIf",!n.loading.getting)("ngIfElse",o)}},directives:[q.b,d.O5,d.sg,d.mk,p.i9,r._Y,r.JL,r.sg,r.Fj,r.JJ,r.u,h.w9],styles:[""]}),s})()}];let V=(()=>{class s{}return s.\u0275fac=function(t){return new(t||s)},s.\u0275mod=e.oAB({type:s}),s.\u0275inj=e.cJS({imports:[[r.u5,d.ez,f.O,T.F,h.A0,r.UX,p.z8.forRoot(),Z.Bz.forChild(K)]]}),s})()}}]);