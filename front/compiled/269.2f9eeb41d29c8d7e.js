"use strict";(self.webpackChunkfront=self.webpackChunkfront||[]).push([[269],{269:(Q,g,i)=>{i.r(g),i.d(g,{SellOrdersModule:()=>G});var c=i(6019),m=i(850),s=i(7537),_=i(1435),h=i(3550),p=i(5838),e=i(1514),Z=i(822),f=i(9853),T=i(6588),O=i(7754),v=i(1843),A=i(6155),x=i(5749);function b(r,o){if(1&r){const t=e.EpF();e.TgZ(0,"tr"),e.TgZ(1,"td",29),e.NdJ("click",function(){const d=e.CHM(t).$implicit;return e.oxw(3).nav.GoToRoleRoute("edit-sell-orders/"+d.id)}),e._uU(2),e.qZA(),e.TgZ(3,"td"),e._uU(4),e.qZA(),e.TgZ(5,"td"),e._uU(6),e.ALo(7,"date"),e.qZA(),e.TgZ(8,"td"),e._uU(9),e.qZA(),e.TgZ(10,"td"),e._uU(11),e.qZA(),e.TgZ(12,"td"),e._uU(13),e.qZA(),e.TgZ(14,"td"),e._uU(15),e.qZA(),e.TgZ(16,"td"),e.TgZ(17,"div",30),e.TgZ(18,"i",31),e.NdJ("click",function(){const d=e.CHM(t).$implicit,a=e.oxw(3),u=e.MAs(38);return a.selectedOrder=d,a.modal.OpenModal(u)}),e.qZA(),e.qZA(),e.qZA(),e.qZA()}if(2&r){const t=o.$implicit;e.xp6(2),e.Oqu(t.id),e.xp6(2),e.Oqu(t.status.name),e.xp6(2),e.Oqu(e.xi3(7,7,t.date,"dd/MM/YYYY hh:mm a")),e.xp6(3),e.Oqu(t.client.name),e.xp6(2),e.hij("$",t.taxes,""),e.xp6(2),e.hij("$",t.subtotal,""),e.xp6(2),e.hij("$",t.total,"")}}function q(r,o){if(1&r&&(e.TgZ(0,"table",26),e.TgZ(1,"thead",27),e.TgZ(2,"tr"),e.TgZ(3,"th"),e._uU(4,"#"),e.qZA(),e.TgZ(5,"th"),e._uU(6,"Estatus"),e.qZA(),e.TgZ(7,"th"),e._uU(8,"Fecha"),e.qZA(),e.TgZ(9,"th"),e._uU(10,"Cliente"),e.qZA(),e.TgZ(11,"th"),e._uU(12,"Impuestos"),e.qZA(),e.TgZ(13,"th"),e._uU(14,"Subtotal"),e.qZA(),e.TgZ(15,"th"),e._uU(16,"Total"),e.qZA(),e._UZ(17,"th"),e.qZA(),e.qZA(),e.TgZ(18,"tbody"),e.YNc(19,b,19,10,"tr",28),e.qZA(),e.qZA()),2&r){const t=e.oxw(2);e.xp6(19),e.Q6J("ngForOf",t.orders)}}function C(r,o){if(1&r&&(e.TgZ(0,"div",24),e.YNc(1,q,20,1,"table",25),e.qZA()),2&r){const t=e.oxw(),n=e.MAs(34);e.xp6(1),e.Q6J("ngIf",!(null==t.orders||!t.orders.length))("ngIfElse",n)}}function S(r,o){1&r&&(e.TgZ(0,"div",32),e._UZ(1,"i",33),e.qZA())}function y(r,o){1&r&&(e.TgZ(0,"div",34),e._uU(1," No tiene ordenes registrados "),e.qZA())}function U(r,o){if(1&r&&(e.TgZ(0,"tr"),e.TgZ(1,"td"),e._uU(2),e.qZA(),e.TgZ(3,"td"),e._uU(4),e.qZA(),e.qZA()),2&r){const t=o.$implicit;e.xp6(2),e.Oqu(t.order.name),e.xp6(2),e.Oqu(t.reason?t.reason:"Error al crear")}}function M(r,o){if(1&r&&(e.TgZ(0,"div",48),e.TgZ(1,"div",49),e._uU(2," Error al crear ordenes "),e.qZA(),e.TgZ(3,"table",50),e.TgZ(4,"thead",51),e.TgZ(5,"tr"),e.TgZ(6,"th"),e._uU(7,"Nombre"),e.qZA(),e.TgZ(8,"th"),e._uU(9,"Motivo"),e.qZA(),e.qZA(),e.qZA(),e.TgZ(10,"tbody"),e.YNc(11,U,5,2,"tr",28),e.qZA(),e.qZA(),e.qZA()),2&r){const t=e.oxw(2);e.xp6(11),e.Q6J("ngForOf",t.ordersFailed)}}function F(r,o){1&r&&(e.TgZ(0,"span"),e._uU(1,"Cancelar"),e.qZA())}function k(r,o){1&r&&(e.TgZ(0,"span"),e._uU(1,"Cerrar"),e.qZA())}function w(r,o){if(1&r&&(e.TgZ(0,"span"),e._uU(1),e.qZA()),2&r){const t=e.oxw(2);e.xp6(1),e.Oqu(t.csvAcceptLabel)}}function N(r,o){1&r&&(e.TgZ(0,"span"),e._UZ(1,"i",52),e.qZA())}function I(r,o){if(1&r){const t=e.EpF();e.TgZ(0,"div",35),e.TgZ(1,"h2",36),e._uU(2,"Agregar por CSV"),e.qZA(),e.TgZ(3,"i",37),e.NdJ("click",function(){e.CHM(t);const l=e.oxw();return l.modal.CloseModal(l.loading.updating)}),e.qZA(),e.qZA(),e.TgZ(4,"div",38),e.TgZ(5,"div",39),e.TgZ(6,"div",1),e.TgZ(7,"button",40),e.NdJ("click",function(){return e.CHM(t),e.MAs(12).click()}),e._uU(8," Seleccionar archivo "),e.qZA(),e.TgZ(9,"span"),e._uU(10),e.qZA(),e.TgZ(11,"input",41,42),e.NdJ("change",function(l){return e.CHM(t),e.oxw().OnFileSelected(l)}),e.qZA(),e.qZA(),e.YNc(13,M,12,1,"div",43),e.qZA(),e.qZA(),e.TgZ(14,"div",44),e.TgZ(15,"button",45),e.NdJ("click",function(){return e.CHM(t),e.oxw().modal.CloseModal()}),e.YNc(16,F,2,0,"span",46),e.YNc(17,k,2,0,"span",46),e.qZA(),e.TgZ(18,"button",47),e.NdJ("click",function(){return e.CHM(t),e.oxw().RegisterOrders()}),e.YNc(19,w,2,1,"span",46),e.YNc(20,N,2,0,"span",46),e.qZA(),e.qZA()}if(2&r){const t=e.oxw();e.xp6(10),e.hij(" ",null==t.ordersCsv?null:t.ordersCsv.name," "),e.xp6(3),e.Q6J("ngIf",!(null==t.ordersFailed||!t.ordersFailed.length)),e.xp6(3),e.Q6J("ngIf",!(null!=t.ordersFailed&&t.ordersFailed.length)),e.xp6(1),e.Q6J("ngIf",!(null==t.ordersFailed||!t.ordersFailed.length)),e.xp6(1),e.Q6J("disabled",t.loading.updating),e.xp6(1),e.Q6J("ngIf",!t.loading.updating),e.xp6(1),e.Q6J("ngIf",t.loading.updating)}}function E(r,o){1&r&&(e.TgZ(0,"span"),e._uU(1,"Si, eliminar"),e.qZA())}function z(r,o){1&r&&(e.TgZ(0,"span"),e._UZ(1,"i",52),e.qZA())}function D(r,o){if(1&r){const t=e.EpF();e.TgZ(0,"div",35),e.TgZ(1,"h2",36),e._uU(2,"Eliminar orden"),e.qZA(),e.TgZ(3,"i",37),e.NdJ("click",function(){e.CHM(t);const l=e.oxw();return l.modal.CloseModal(l.loading.updating)}),e.qZA(),e.qZA(),e.TgZ(4,"div",38),e.TgZ(5,"div",4),e._uU(6),e.qZA(),e.qZA(),e.TgZ(7,"div",44),e.TgZ(8,"button",53),e.NdJ("click",function(){return e.CHM(t),e.oxw().modal.CloseModal()}),e._uU(9," No, cancelar "),e.qZA(),e.TgZ(10,"button",54),e.NdJ("click",function(){return e.CHM(t),e.oxw().DeleteOrder()}),e.YNc(11,E,2,0,"span",46),e.YNc(12,z,2,0,"span",46),e.qZA(),e.qZA()}if(2&r){const t=e.oxw();e.xp6(6),e.hij(" \xbfEsta seguro que desea eliminar la orden No. ",null==t.selectedOrder?null:t.selectedOrder.id,"? "),e.xp6(2),e.Q6J("disabled",t.loading.updating),e.xp6(2),e.Q6J("disabled",t.loading.updating),e.xp6(1),e.Q6J("ngIf",!t.loading.updating),e.xp6(1),e.Q6J("ngIf",t.loading.updating)}}const J=function(){return{text:!0,startDate:!0,endDate:!0,options:null}},Y=[{path:"",component:(()=>{class r{constructor(t,n,l,d,a,u){this.form=t,this.modal=n,this.toast=l,this.http=d,this.csv=a,this.nav=u,this.measurementTypes=[],this.orders=[],this.buyers=[],this.selectedOrder=null,this.isEditing=!1,this.ordersToUpload=[],this.ordersFailed=[],this.loading={updating:!1,getting:!0},this.orderForm=new s.cw({id:new s.NI(null,[]),name:new s.NI("",[s.kI.required]),price:new s.NI("",[s.kI.required,(0,p.AW)()]),tax:new s.NI("",[s.kI.required,(0,p.wp)()]),buyerId:new s.NI(null,[s.kI.required]),salesMeasurementTypeId:new s.NI(null,[s.kI.required]),inventoryMeasurementTypeId:new s.NI(null,[s.kI.required])}),this.dataConversions=[{oldKey:"Nombre",newKey:"name"},{oldKey:"Precio",newKey:"price"},{oldKey:"Impuesto",newKey:"tax"},{oldKey:"Unidad de medida ventas",newKey:"salesMeasurementType"},{oldKey:"Unidad de medida inventario",newKey:"inventoryMeasurementType"}]}get csvAcceptLabel(){return this.ordersFailed.length?"Reintentar":"Subir"}ngOnInit(){this.GetBuyers(),this.GetMeasurementTypes(),this.GetOrders()}GoHome(){this.nav.GoToRoleRoute("")}OnSalesMeasurementTypeChanges(t){var n,l;t&&!(null===(n=this.orderForm.get("inventoryMeasurementTypeId"))||void 0===n?void 0:n.value)&&(null===(l=this.orderForm.get("inventoryMeasurementTypeId"))||void 0===l||l.setValue(t.id))}GetMeasurementTypes(){this.http.Get("MeasurementTypes").subscribe(t=>{this.measurementTypes=t},t=>{console.error("Error getting measurement types",t)})}GetBuyers(){this.http.Get("Buyers").subscribe(t=>{this.buyers=t},t=>{console.error("Error getting buyers",t)})}GetOrders(t=null){this.loading.getting=!0;let n="/Orders";t&&(n+=`/FilteredBy/StartDate/${t.startDate}/EndDate/${t.endDate}`),this.http.Get(n).subscribe(l=>{this.orders=l,this.loading.getting=!1},l=>{console.error("Error getting Orders",l),this.loading.getting=!1})}RegisterOrder(){if(this.orderForm.invalid)return this.orderForm.markAllAsTouched(),void this.toast.ShowDefaultWarning("Favor de llenar los campos obligatorios");this.loading.updating=!0,this.isEditing?this.UpdateOrder():this.http.Post("Orders",{Order:this.orderForm.value}).subscribe(t=>{this.GetOrders(),this.toast.ShowDefaultSuccess("Orden creado exitosamente"),this.orderForm.reset(),this.modal.CloseModal(),this.loading.updating=!1},t=>{this.toast.ShowDefaultDanger("Error al crear orden"),console.error("Error creating Order",t),this.loading.updating=!1})}RegisterOrders(){this.loading.updating=!0,this.http.Post("Orders/Array",{Orders:this.ordersToUpload}).subscribe(t=>{this.GetOrders(),this.ordersFailed=t.OrdersFailed,t.OrdersSuccess.length&&this.toast.ShowDefaultSuccess(`${t.OrdersSuccess.length} ordenes creados correctamente`),t.OrdersFailed.length?this.toast.ShowDefaultWarning(`${t.OrdersFailed.length} ordenes no se pudieron crear`):(this.modal.CloseModal(),this.ordersToUpload=[]),this.loading.updating=!1},t=>{console.error("Error creating Orders",t),this.toast.ShowDefaultDanger("Error al crear ordenes"),this.loading.updating=!1})}UpdateOrder(){this.http.Patch("Orders",{Order:this.orderForm.value}).subscribe(n=>{this.GetOrders(),this.toast.ShowDefaultSuccess("Orden actualizado con \xe9xito"),this.modal.CloseModal(),this.isEditing=!1,this.loading.updating=!1},n=>{console.error("Error patching Order",n),this.toast.ShowDefaultDanger("Error al actualizar orden"),this.loading.updating=!1})}EditOrder(t){this.isEditing=!0;for(const n in this.orderForm.controls)Object.prototype.hasOwnProperty.call(this.orderForm.controls,n)&&this.orderForm.controls[n].setValue(t[n])}DeleteOrder(){this.loading.updating=!0,this.http.Delete(`Orders/${this.selectedOrder.id}`,{}).subscribe(t=>{this.GetOrders(),this.toast.ShowDefaultSuccess("Orden eliminado correctamente"),this.modal.CloseModal(),this.loading.updating=!1},t=>{console.error("Error deleting Order",t),this.toast.ShowDefaultDanger("Error al eliminar orden"),this.loading.updating=!1})}DownloadTemplate(){this.http.DownloadFileWithoutApi("assets/templates/plantilla_ordenes.csv","plantilla_ordenes.csv")}OnFileSelected(t){const n=t.target.files[0];if(this.ordersCsv=n,!n)return;const l=new FileReader;l.onload=d=>{this.csv.ReadCSV(l.result).then(a=>{this.ordersToUpload=this.csv.FormatData(a.data,this.dataConversions)})},l.readAsText(n,"ISO-8859-3")}}return r.\u0275fac=function(t){return new(t||r)(e.Y36(Z.o),e.Y36(f.Z),e.Y36(T.k),e.Y36(O.O),e.Y36(v.M),e.Y36(A.f))},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-sell-orders"]],decls:39,vars:5,consts:[[1,"content"],[1,"d-flex","align-items-center","justify-content-between"],[1,"page-title"],[1,"zmdi","zmdi-home","zmdi-hc-lg","mr-2","clickeable",3,"click"],[1,"d-flex"],[1,"btn","btn-success","mx-1",3,"click"],[1,"zmdi","zmdi-plus-circle-o","zmdi-hc-lg","mr-2"],["id","csvordersDropdown","data-toggle","dropdown","aria-haspopup","true","aria-expanded","false",1,"clickeable","px-2"],[1,"btn","btn-success","mx-1"],[1,"zmdi","zmdi-file","zmdi-hc-lg","mr-2"],["aria-labelledby","csvordersDropdown",1,"dropdown-menu","px-1","py-1"],[1,"menu-list"],[1,"d-flex","align-items-center","px-3","my-1","clickeable-hover",3,"click"],[1,"zmdi","zmdi-file-text"],[1,"pl-2"],[1,"zmdi","zmdi-file-plus"],[1,"row","justify-content-center"],[1,"col-12","mb-4"],[3,"timerTrigger","filters","onSearch"],["class","col-12 col-lg-11",4,"ngIf","ngIfElse"],["bigLoading",""],["noOrdersMessage",""],["addordersByCsvModal",""],["deleteorderModal",""],[1,"col-12","col-lg-11"],["class","table table-striped",4,"ngIf","ngIfElse"],[1,"table","table-striped"],[1,"table-thead"],[4,"ngFor","ngForOf"],[1,"clickeable",3,"click"],[1,"d-flex","align-items-center","justify-content-center"],[1,"zmdi","zmdi-delete","zmdi-hc-lg","clickeable","mx-2",3,"click"],[1,"w-100","h-75","d-flex","align-items-center","justify-content-center",2,"min-height","min-content"],[1,"zmdi","zmdi-spinner","zmdi-hc-5x","zmdi-hc-spin"],[1,"no-items-message"],[1,"modal-header"],[1,"modal-title"],[1,"close-modal-button","zmdi","zmdi-close-circle-o","zmdi-hc-2x","clickeable",3,"click"],[1,"modal-body"],[1,"d-flex","flex-column","justify-content-between"],[1,"btn","btn-outline-primary",3,"click"],["type","file","accept",".csv",1,"d-none",3,"change"],["csvFileInput",""],["class","modal-table",4,"ngIf"],[1,"modal-footer"],[1,"btn","btn-secondary",3,"click"],[4,"ngIf"],[1,"btn","btn-success",3,"disabled","click"],[1,"modal-table"],[1,"my-4","text-center",2,"font-size","1.25rem","font-weight","700"],[1,"table","table-danger","table-striped"],[1,"table-thead","bg-danger"],[1,"zmdi","zmdi-spinner","zmdi-hc-lg","zmdi-hc-spin"],[1,"btn","btn-secondary",3,"disabled","click"],[1,"btn","btn-danger",3,"disabled","click"]],template:function(t,n){if(1&t){const l=e.EpF();e.TgZ(0,"div",0),e.TgZ(1,"div",1),e.TgZ(2,"div",2),e.TgZ(3,"i",3),e.NdJ("click",function(){return n.GoHome()}),e.qZA(),e._uU(4," Mis ordenes de venta "),e.qZA(),e.TgZ(5,"div",4),e.TgZ(6,"button",5),e.NdJ("click",function(){return n.nav.GoToRoleRoute("sell-orders/create")}),e._UZ(7,"i",6),e._uU(8," Agregar "),e.qZA(),e.TgZ(9,"div",7),e.TgZ(10,"button",8),e._UZ(11,"i",9),e._uU(12," CSV "),e.qZA(),e.TgZ(13,"div",10),e.TgZ(14,"div",11),e.TgZ(15,"div",12),e.NdJ("click",function(){return n.DownloadTemplate()}),e._UZ(16,"i",13),e.TgZ(17,"span",14),e._uU(18,"Descargar plantilla"),e.qZA(),e.qZA(),e.TgZ(19,"div",12),e.NdJ("click",function(){e.CHM(l);const a=e.MAs(36);return n.modal.OpenModal(a)}),e._UZ(20,"i",15),e.TgZ(21,"span",14),e._uU(22,"Cargar ordenes"),e.qZA(),e.qZA(),e.TgZ(23,"div",12),e.NdJ("click",function(){e.CHM(l);const a=e.MAs(36);return n.modal.OpenModal(a)}),e._UZ(24,"i",15),e.TgZ(25,"span",14),e._uU(26,"Exportar ordenes"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(27,"div",16),e.TgZ(28,"div",17),e.TgZ(29,"app-filters",18),e.NdJ("onSearch",function(a){return n.GetOrders(a)}),e.qZA(),e.qZA(),e.YNc(30,C,2,2,"div",19),e.qZA(),e.qZA(),e.YNc(31,S,2,0,"ng-template",null,20,e.W1O),e.YNc(33,y,2,0,"ng-template",null,21,e.W1O),e.YNc(35,I,21,7,"ng-template",null,22,e.W1O),e.YNc(37,D,13,5,"ng-template",null,23,e.W1O)}if(2&t){const l=e.MAs(32);e.xp6(29),e.Q6J("timerTrigger",!0)("filters",e.DdM(4,J)),e.xp6(1),e.Q6J("ngIf",!n.loading.getting)("ngIfElse",l)}},directives:[x.b,c.O5,c.sg],pipes:[c.uU],styles:[""]}),r})()}];let G=(()=>{class r{}return r.\u0275fac=function(t){return new(t||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({imports:[[s.u5,c.ez,h.F,_.A0,s.UX,m.Bz.forChild(Y)]]}),r})()}}]);