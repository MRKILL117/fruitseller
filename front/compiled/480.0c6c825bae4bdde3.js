"use strict";(self.webpackChunkfront=self.webpackChunkfront||[]).push([[480],{480:($,_,s)=>{s.r(_),s.d(_,{BuyersModule:()=>j});var d=s(6019),g=s(850),l=s(7537),p=s(1435),e=s(1514),m=s(822),Z=s(9853),y=s(6588),f=s(7754),h=s(1843),b=s(6155);function T(n,i){if(1&n&&(e.TgZ(0,"div",34),e._uU(1),e.qZA()),2&n){const t=i.$implicit;e.xp6(1),e.Oqu(t.name)}}function x(n,i){if(1&n&&(e.TgZ(0,"td"),e.TgZ(1,"div",30),e.YNc(2,T,2,1,"div",33),e.qZA(),e.qZA()),2&n){const t=e.oxw().$implicit;e.xp6(2),e.Q6J("ngForOf",t.products)}}function A(n,i){1&n&&(e.TgZ(0,"td"),e._uU(1," No tiene productos asignados "),e.qZA())}function v(n,i){if(1&n){const t=e.EpF();e.TgZ(0,"tr"),e.TgZ(1,"td"),e._uU(2),e.qZA(),e.YNc(3,x,3,1,"td",29),e.YNc(4,A,2,0,"td",29),e.TgZ(5,"td"),e.TgZ(6,"div",30),e.TgZ(7,"i",31),e.NdJ("click",function(){const c=e.CHM(t).$implicit,a=e.oxw(3),u=e.MAs(33);return a.EditBuyer(c),a.modal.OpenModal(u)}),e.qZA(),e.TgZ(8,"i",32),e.NdJ("click",function(){const c=e.CHM(t).$implicit,a=e.oxw(3),u=e.MAs(31);return a.selectedBuyer=c,a.modal.OpenModal(u)}),e.qZA(),e.qZA(),e.qZA(),e.qZA()}if(2&n){const t=i.$implicit;e.xp6(2),e.Oqu(t.name),e.xp6(1),e.Q6J("ngIf",t.products.length),e.xp6(1),e.Q6J("ngIf",!t.products.length)}}function C(n,i){if(1&n&&(e.TgZ(0,"div",23),e._UZ(1,"div",24),e.TgZ(2,"div",25),e.TgZ(3,"table",26),e.TgZ(4,"thead",27),e.TgZ(5,"tr"),e.TgZ(6,"th"),e._uU(7,"Nombre"),e.qZA(),e.TgZ(8,"th"),e._uU(9,"Productos"),e.qZA(),e._UZ(10,"th"),e.qZA(),e.qZA(),e.TgZ(11,"tbody"),e.YNc(12,v,9,3,"tr",28),e.qZA(),e.qZA(),e.qZA(),e.qZA()),2&n){const t=e.oxw(2);e.xp6(12),e.Q6J("ngForOf",t.buyers)}}function B(n,i){if(1&n&&(e.ynx(0),e.YNc(1,C,13,1,"div",22),e.BQk()),2&n){const t=e.oxw(),o=e.MAs(27);e.xp6(1),e.Q6J("ngIf",!(null==t.buyers||!t.buyers.length))("ngIfElse",o)}}function q(n,i){1&n&&(e.TgZ(0,"div",35),e._UZ(1,"i",36),e.qZA())}function F(n,i){1&n&&(e.TgZ(0,"div",37),e._uU(1," No tiene compradores registrados "),e.qZA())}function N(n,i){if(1&n&&(e.TgZ(0,"tr"),e.TgZ(1,"td"),e._uU(2),e.qZA(),e.TgZ(3,"td"),e._uU(4),e.qZA(),e.qZA()),2&n){const t=i.$implicit;e.xp6(2),e.Oqu(t.buyer.name),e.xp6(2),e.Oqu(t.reason?t.reason:"Error al crear")}}function k(n,i){if(1&n&&(e.TgZ(0,"div",50),e.TgZ(1,"div",51),e._uU(2," Error al crear compradores "),e.qZA(),e.TgZ(3,"table",52),e.TgZ(4,"thead",53),e.TgZ(5,"tr"),e.TgZ(6,"th"),e._uU(7,"Nombre"),e.qZA(),e.TgZ(8,"th"),e._uU(9,"Motivo"),e.qZA(),e.qZA(),e.qZA(),e.TgZ(10,"tbody"),e.YNc(11,N,5,2,"tr",28),e.qZA(),e.qZA(),e.qZA()),2&n){const t=e.oxw(2);e.xp6(11),e.Q6J("ngForOf",t.buyersFailed)}}function w(n,i){1&n&&(e.TgZ(0,"span"),e._uU(1,"Cancelar"),e.qZA())}function U(n,i){1&n&&(e.TgZ(0,"span"),e._uU(1,"Cerrar"),e.qZA())}function J(n,i){if(1&n&&(e.TgZ(0,"span"),e._uU(1),e.qZA()),2&n){const t=e.oxw(2);e.xp6(1),e.Oqu(t.csvAcceptLabel)}}function M(n,i){1&n&&(e.TgZ(0,"span"),e._UZ(1,"i",54),e.qZA())}function z(n,i){if(1&n){const t=e.EpF();e.TgZ(0,"div",38),e.TgZ(1,"h2",39),e._uU(2,"Agregar por CSV"),e.qZA(),e.TgZ(3,"i",40),e.NdJ("click",function(){e.CHM(t);const r=e.oxw();return r.modal.CloseModal(r.loading.updating)}),e.qZA(),e.qZA(),e.TgZ(4,"div",41),e.TgZ(5,"div",42),e.TgZ(6,"div",1),e.TgZ(7,"button",43),e.NdJ("click",function(){return e.CHM(t),e.MAs(12).click()}),e._uU(8," Seleccionar archivo "),e.qZA(),e.TgZ(9,"span"),e._uU(10),e.qZA(),e.TgZ(11,"input",44,45),e.NdJ("change",function(r){return e.CHM(t),e.oxw().OnFileSelected(r)}),e.qZA(),e.qZA(),e.YNc(13,k,12,1,"div",46),e.qZA(),e.qZA(),e.TgZ(14,"div",47),e.TgZ(15,"button",48),e.NdJ("click",function(){return e.CHM(t),e.oxw().modal.CloseModal()}),e.YNc(16,w,2,0,"span",29),e.YNc(17,U,2,0,"span",29),e.qZA(),e.TgZ(18,"button",49),e.NdJ("click",function(){return e.CHM(t),e.oxw().RegisterBuyers()}),e.YNc(19,J,2,1,"span",29),e.YNc(20,M,2,0,"span",29),e.qZA(),e.qZA()}if(2&n){const t=e.oxw();e.xp6(10),e.hij(" ",null==t.buyersCsv?null:t.buyersCsv.name," "),e.xp6(3),e.Q6J("ngIf",!(null==t.buyersFailed||!t.buyersFailed.length)),e.xp6(3),e.Q6J("ngIf",!(null!=t.buyersFailed&&t.buyersFailed.length)),e.xp6(1),e.Q6J("ngIf",!(null==t.buyersFailed||!t.buyersFailed.length)),e.xp6(1),e.Q6J("disabled",t.loading.updating),e.xp6(1),e.Q6J("ngIf",!t.loading.updating),e.xp6(1),e.Q6J("ngIf",t.loading.updating)}}function I(n,i){1&n&&(e.TgZ(0,"span"),e._uU(1,"Si, eliminar"),e.qZA())}function E(n,i){1&n&&(e.TgZ(0,"span"),e._UZ(1,"i",54),e.qZA())}function Y(n,i){if(1&n){const t=e.EpF();e.TgZ(0,"div",38),e.TgZ(1,"h2",39),e._uU(2,"Eliminar comprador"),e.qZA(),e.TgZ(3,"i",40),e.NdJ("click",function(){e.CHM(t);const r=e.oxw();return r.modal.CloseModal(r.loading.updating),r.buyerForm.reset()}),e.qZA(),e.qZA(),e.TgZ(4,"div",41),e.TgZ(5,"div",4),e._uU(6),e.qZA(),e.qZA(),e.TgZ(7,"div",47),e.TgZ(8,"button",55),e.NdJ("click",function(){e.CHM(t);const r=e.oxw();return r.modal.CloseModal(),r.buyerForm.reset()}),e._uU(9," No, cancelar "),e.qZA(),e.TgZ(10,"button",56),e.NdJ("click",function(){return e.CHM(t),e.oxw().DeleteBuyer()}),e.YNc(11,I,2,0,"span",29),e.YNc(12,E,2,0,"span",29),e.qZA(),e.qZA()}if(2&n){const t=e.oxw();e.xp6(6),e.hij(' \xbfEsta seguro que desea eliminar a "',null==t.selectedBuyer?null:t.selectedBuyer.name,'"? '),e.xp6(2),e.Q6J("disabled",t.loading.updating),e.xp6(2),e.Q6J("disabled",t.loading.updating),e.xp6(1),e.Q6J("ngIf",!t.loading.updating),e.xp6(1),e.Q6J("ngIf",t.loading.updating)}}function O(n,i){1&n&&(e.TgZ(0,"span",70),e._uU(1," Campo obligatorio "),e.qZA())}function Q(n,i){if(1&n&&(e.TgZ(0,"div",68),e.YNc(1,O,2,0,"span",69),e.qZA()),2&n){const t=e.oxw(2);let o;e.xp6(1),e.Q6J("ngIf",null==(o=t.form.GetFormControlByName(t.buyerForm,"name"))?null:o.errors.required)}}function S(n,i){1&n&&(e.TgZ(0,"span",70),e._uU(1," Campo obligatorio "),e.qZA())}function D(n,i){if(1&n&&(e.TgZ(0,"div",68),e.YNc(1,S,2,0,"span",69),e.qZA()),2&n){const t=e.oxw(2);let o;e.xp6(1),e.Q6J("ngIf",null==(o=t.form.GetFormControlByName(t.buyerForm,"products"))?null:o.errors.required)}}function G(n,i){if(1&n&&(e.TgZ(0,"span"),e._uU(1),e.qZA()),2&n){const t=e.oxw(2);e.xp6(1),e.Oqu(t.isEditing?"Actualizar":"Agregar")}}function H(n,i){1&n&&(e.TgZ(0,"span"),e._UZ(1,"i",54),e.qZA())}function P(n,i){if(1&n){const t=e.EpF();e.TgZ(0,"div",38),e.TgZ(1,"h2",39),e._uU(2),e.qZA(),e.TgZ(3,"i",40),e.NdJ("click",function(){e.CHM(t);const r=e.oxw();return r.modal.CloseModal(r.loading.updating),r.buyerForm.reset()}),e.qZA(),e.qZA(),e.TgZ(4,"div",41),e.TgZ(5,"div",57),e.TgZ(6,"form",58),e.TgZ(7,"div",59),e.TgZ(8,"div",60),e.TgZ(9,"div",61),e.TgZ(10,"label"),e._uU(11,"Nombre"),e.qZA(),e.TgZ(12,"div",62),e._UZ(13,"i",63),e.TgZ(14,"input",64),e.NdJ("keyup.enter",function(){return e.CHM(t),e.oxw().RegisterBuyer()}),e.qZA(),e.qZA(),e.YNc(15,Q,2,1,"div",65),e.qZA(),e.qZA(),e.TgZ(16,"div",60),e.TgZ(17,"div",61),e.TgZ(18,"label"),e._uU(19,"Productos que compra"),e.qZA(),e._UZ(20,"ng-select",66),e.YNc(21,D,2,1,"div",65),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(22,"div",47),e.TgZ(23,"button",55),e.NdJ("click",function(){e.CHM(t);const r=e.oxw();return r.modal.CloseModal(),r.buyerForm.reset()}),e._uU(24," Cancelar "),e.qZA(),e.TgZ(25,"button",67),e.NdJ("click",function(){return e.CHM(t),e.oxw().RegisterBuyer()}),e.YNc(26,G,2,1,"span",29),e.YNc(27,H,2,0,"span",29),e.qZA(),e.qZA()}if(2&n){const t=e.oxw();let o,r;e.xp6(2),e.Oqu(t.isEditing?"Actualizar comprador":"Agregar un comprador"),e.xp6(4),e.Q6J("formGroup",t.buyerForm),e.xp6(9),e.Q6J("ngIf",(null==(o=t.form.GetFormControlByName(t.buyerForm,"name"))?null:o.touched)&&(null==(o=t.form.GetFormControlByName(t.buyerForm,"name"))?null:o.errors)),e.xp6(5),e.Q6J("items",t.products)("multiple",!0),e.xp6(1),e.Q6J("ngIf",(null==(r=t.form.GetFormControlByName(t.buyerForm,"products"))?null:r.touched)&&(null==(r=t.form.GetFormControlByName(t.buyerForm,"products"))?null:r.errors)),e.xp6(2),e.Q6J("disabled",t.loading.updating),e.xp6(2),e.Q6J("disabled",t.loading.updating),e.xp6(1),e.Q6J("ngIf",!t.loading.updating),e.xp6(1),e.Q6J("ngIf",t.loading.updating)}}const R=[{path:"",component:(()=>{class n{constructor(t,o,r,c,a,u){this.form=t,this.modal=o,this.toast=r,this.http=c,this.csv=a,this.nav=u,this.buyers=[],this.products=[],this.selectedBuyer=null,this.isEditing=!1,this.buyersToUpload=[],this.buyersFailed=[],this.loading={updating:!1,getting:!0},this.buyerForm=new l.cw({id:new l.NI(null,[]),name:new l.NI("",[l.kI.required]),products:new l.NI(null,[])}),this.dataConversions=[{oldKey:"Nombre",newKey:"name",type:"string"},{oldKey:"Productos",newKey:"products",type:"array"}]}get csvAcceptLabel(){return this.buyersFailed.length?"Reintentar":"Subir"}ngOnInit(){this.GetProducts(),this.GetBuyers()}GoHome(){this.nav.GoToRoleRoute("")}GetProducts(){this.loading.getting=!0,this.http.Get("Products").subscribe(t=>{this.products=t.filter(o=>!o.buyerId),this.loading.getting=!1},t=>{console.error("Error getting products",t),this.loading.getting=!1})}GetBuyers(){this.loading.getting=!0,this.http.Get("Buyers").subscribe(t=>{this.buyers=t,this.loading.getting=!1},t=>{console.error("Error getting buyers",t),this.loading.getting=!1})}RegisterBuyer(){this.buyerForm.invalid&&(this.buyerForm.markAllAsTouched(),this.toast.ShowDefaultWarning("Favor de llenar los campos obligatorios")),this.loading.updating=!0,this.isEditing?this.UpdateBuyer():this.http.Post("Buyers",{buyer:this.buyerForm.value}).subscribe(t=>{this.GetProducts(),this.GetBuyers(),this.toast.ShowDefaultSuccess("Comprador creado exitosamente"),this.buyerForm.reset(),this.modal.CloseModal(),this.loading.updating=!1},t=>{this.toast.ShowDefaultDanger("Error al crear comprador"),console.error("Error creating buyer",t),this.loading.updating=!1})}RegisterBuyers(){this.loading.updating=!0,this.http.Post("Buyers/Array",{buyers:this.buyersToUpload}).subscribe(t=>{this.GetProducts(),this.GetBuyers(),this.buyersFailed=t.buyersFailed,t.buyersSuccess.length&&this.toast.ShowDefaultSuccess(`${t.buyersSuccess.length} compradors creados correctamente`),t.buyersFailed.length?this.toast.ShowDefaultWarning(`${t.buyersFailed.length} compradors no se pudieron crear`):(this.modal.CloseModal(),this.buyersToUpload=[]),this.loading.updating=!1},t=>{console.error("Error creating buyers",t),this.toast.ShowDefaultDanger("Error al crear compradors"),this.loading.updating=!1})}UpdateBuyer(){this.http.Patch("Buyers",{buyer:this.buyerForm.value}).subscribe(o=>{this.GetProducts(),this.GetBuyers(),this.toast.ShowDefaultSuccess("Comprador actualizado con \xe9xito"),this.modal.CloseModal(),this.isEditing=!1,this.loading.updating=!1},o=>{console.error("Error patching buyer",o),this.toast.ShowDefaultDanger("Error al actualizar comprador"),this.loading.updating=!1})}EditBuyer(t){this.isEditing=!0;for(const o in this.buyerForm.controls)Object.prototype.hasOwnProperty.call(this.buyerForm.controls,o)&&this.buyerForm.controls[o].setValue(t[o])}DeleteBuyer(){this.loading.updating=!0,this.http.Delete(`Buyers/${this.selectedBuyer.id}`,{}).subscribe(t=>{this.GetProducts(),this.GetBuyers(),this.toast.ShowDefaultSuccess("Comprador eliminado correctamente"),this.modal.CloseModal(),this.loading.updating=!1},t=>{console.error("Error deleting buyer",t),this.toast.ShowDefaultDanger("Error al eliminar comprador"),this.loading.updating=!1})}DownloadTemplate(){this.http.DownloadFileWithoutApi("assets/templates/plantilla_compradores.csv","plantilla_compradores.csv")}OnFileSelected(t){const o=t.target.files[0];if(this.buyersCsv=o,!o)return;const r=new FileReader;r.onload=c=>{this.csv.ReadCSV(r.result).then(a=>{this.buyersToUpload=this.csv.FormatData(a.data,this.dataConversions)})},r.readAsText(o,"ISO-8859-3")}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(m.o),e.Y36(Z.Z),e.Y36(y.k),e.Y36(f.O),e.Y36(h.M),e.Y36(b.f))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-buyers"]],decls:34,vars:2,consts:[[1,"content"],[1,"d-flex","align-items-center","justify-content-between"],[1,"page-title"],[1,"zmdi","zmdi-home","zmdi-hc-lg","mr-2","clickeable",3,"click"],[1,"d-flex"],[1,"btn","btn-success","mx-1",3,"click"],[1,"zmdi","zmdi-plus-circle-o","zmdi-hc-lg","mr-2"],["id","csvBuyersDropdown","data-toggle","dropdown","aria-haspopup","true","aria-expanded","false",1,"clickeable","px-2"],[1,"btn","btn-success","mx-1"],[1,"zmdi","zmdi-file","zmdi-hc-lg","mr-2"],["aria-labelledby","csvBuyersDropdown",1,"dropdown-menu","px-1","py-1"],[1,"menu-list"],[1,"d-flex","align-items-center","px-3","my-1","clickeable-hover",3,"click"],[1,"zmdi","zmdi-file-text"],[1,"pl-2"],[1,"zmdi","zmdi-file-plus"],[4,"ngIf","ngIfElse"],["bigLoading",""],["noBuyersMessage",""],["addBuyersByCsvModal",""],["deleteBuyerModal",""],["addOrEditBuyerModal",""],["class","row justify-content-center",4,"ngIf","ngIfElse"],[1,"row","justify-content-center"],[1,"col-12","mb-4"],[1,"col-12","col-lg-11"],[1,"table","table-striped"],[1,"table-thead"],[4,"ngFor","ngForOf"],[4,"ngIf"],[1,"d-flex","align-items-center","justify-content-center"],[1,"zmdi","zmdi-edit","zmdi-hc-lg","clickeable","mx-2",3,"click"],[1,"zmdi","zmdi-delete","zmdi-hc-lg","clickeable","mx-2",3,"click"],["class","badge badge-primary mx-2",4,"ngFor","ngForOf"],[1,"badge","badge-primary","mx-2"],[1,"w-100","h-75","d-flex","align-items-center","justify-content-center",2,"min-height","min-content"],[1,"zmdi","zmdi-spinner","zmdi-hc-5x","zmdi-hc-spin"],[1,"no-items-message"],[1,"modal-header"],[1,"modal-title"],[1,"close-modal-button","zmdi","zmdi-close-circle-o","zmdi-hc-2x","clickeable",3,"click"],[1,"modal-body"],[1,"d-flex","flex-column","justify-content-between"],[1,"btn","btn-outline-primary",3,"click"],["type","file","accept",".csv",1,"d-none",3,"change"],["csvFileInput",""],["class","modal-table",4,"ngIf"],[1,"modal-footer"],[1,"btn","btn-secondary",3,"click"],[1,"btn","btn-success",3,"disabled","click"],[1,"modal-table"],[1,"my-4","text-center",2,"font-size","1.25rem","font-weight","700"],[1,"table","table-danger","table-striped"],[1,"table-thead","bg-danger"],[1,"zmdi","zmdi-spinner","zmdi-hc-lg","zmdi-hc-spin"],[1,"btn","btn-secondary",3,"disabled","click"],[1,"btn","btn-danger",3,"disabled","click"],[1,"w-100"],[3,"formGroup"],[1,"row"],[1,"col-12"],[1,"form-group"],[1,"input-container"],[1,"input-icon","zmdi","zmdi-collection-text","zmdi-hc-lg"],["type","text","placeholder","Nombre del comprador","formControlName","name",1,"form-control",3,"keyup.enter"],["class","error-messages",4,"ngIf"],["bindLabel","name","placeholder","Productos","formControlName","products",1,"",3,"items","multiple"],[1,"btn","btn-primary",3,"disabled","click"],[1,"error-messages"],["class","d-block",4,"ngIf"],[1,"d-block"]],template:function(t,o){if(1&t){const r=e.EpF();e.TgZ(0,"div",0),e.TgZ(1,"div",1),e.TgZ(2,"div",2),e.TgZ(3,"i",3),e.NdJ("click",function(){return o.GoHome()}),e.qZA(),e._uU(4," Mis compradores "),e.qZA(),e.TgZ(5,"div",4),e.TgZ(6,"button",5),e.NdJ("click",function(){e.CHM(r);const a=e.MAs(33);return o.modal.OpenModal(a)}),e._UZ(7,"i",6),e._uU(8," Agregar "),e.qZA(),e.TgZ(9,"div",7),e.TgZ(10,"button",8),e._UZ(11,"i",9),e._uU(12," CSV "),e.qZA(),e.TgZ(13,"div",10),e.TgZ(14,"div",11),e.TgZ(15,"div",12),e.NdJ("click",function(){return o.DownloadTemplate()}),e._UZ(16,"i",13),e.TgZ(17,"span",14),e._uU(18,"Descargar plantilla"),e.qZA(),e.qZA(),e.TgZ(19,"div",12),e.NdJ("click",function(){e.CHM(r);const a=e.MAs(29);return o.modal.OpenModal(a)}),e._UZ(20,"i",15),e.TgZ(21,"span",14),e._uU(22,"Subir archivo"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.YNc(23,B,2,2,"ng-container",16),e.qZA(),e.YNc(24,q,2,0,"ng-template",null,17,e.W1O),e.YNc(26,F,2,0,"ng-template",null,18,e.W1O),e.YNc(28,z,21,7,"ng-template",null,19,e.W1O),e.YNc(30,Y,13,5,"ng-template",null,20,e.W1O),e.YNc(32,P,28,10,"ng-template",null,21,e.W1O)}if(2&t){const r=e.MAs(25);e.xp6(23),e.Q6J("ngIf",!o.loading.getting)("ngIfElse",r)}},directives:[d.O5,d.sg,l._Y,l.JL,l.sg,l.Fj,l.JJ,l.u,p.w9],styles:[""]}),n})()}];let j=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[[l.u5,d.ez,p.A0,l.UX,g.Bz.forChild(R)]]}),n})()}}]);