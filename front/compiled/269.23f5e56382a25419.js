"use strict";(self.webpackChunkfront=self.webpackChunkfront||[]).push([[269],{269:(R,_,s)=>{s.r(_),s.d(_,{SellOrdersModule:()=>Q});var u=s(6019),p=s(850),d=s(7537),m=s(1435),Z=s(3550),h=s(4684),g=s(5838),e=s(1514),f=s(822),T=s(9853),v=s(6588),x=s(7754),A=s(1843),O=s(6155),b=s(5749);function C(n,i){if(1&n){const t=e.EpF();e.TgZ(0,"button",37),e.NdJ("click",function(){e.CHM(t);const r=e.oxw().$implicit;return e.oxw(3).SetAsDelivered(r)}),e._uU(1," Entregar "),e.qZA()}}function q(n,i){if(1&n){const t=e.EpF();e.TgZ(0,"tr"),e.TgZ(1,"td",30),e.NdJ("click",function(){const o=e.CHM(t).$implicit;return e.oxw(3).nav.GoToRoleRoute("edit-sell-orders/"+o.id)}),e._uU(2),e.qZA(),e.TgZ(3,"td",31),e._uU(4),e.qZA(),e.TgZ(5,"td",31),e._uU(6),e.ALo(7,"date"),e.qZA(),e.TgZ(8,"td",31),e._uU(9),e.qZA(),e.TgZ(10,"td",31),e._uU(11),e.qZA(),e.TgZ(12,"td",31),e._uU(13),e.qZA(),e.TgZ(14,"td",31),e._uU(15),e.qZA(),e.TgZ(16,"td"),e.TgZ(17,"div",32),e.TgZ(18,"div",33),e.TgZ(19,"i",34),e.NdJ("click",function(){const o=e.CHM(t).$implicit;return e.oxw(3).nav.GoToRoleRoute("edit-sell-orders/"+o.id)}),e.qZA(),e.TgZ(20,"i",35),e.NdJ("click",function(){const o=e.CHM(t).$implicit,a=e.oxw(3),c=e.MAs(38);return a.selectedOrder=o,a.modal.OpenModal(c)}),e.qZA(),e.qZA(),e.YNc(21,C,2,0,"button",36),e.qZA(),e.qZA(),e.qZA()}if(2&n){const t=i.$implicit;e.xp6(2),e.Oqu(t.id),e.xp6(2),e.Oqu(t.status.name),e.xp6(2),e.Oqu(e.xi3(7,8,t.date,"dd/MM/YYYY hh:mm a")),e.xp6(3),e.Oqu(t.client.name),e.xp6(2),e.hij("$",t.taxes,""),e.xp6(2),e.hij("$",t.subtotal,""),e.xp6(2),e.hij("$",t.total,""),e.xp6(6),e.Q6J("ngIf",1==t.statusId)}}function S(n,i){if(1&n&&(e.TgZ(0,"table",27),e.TgZ(1,"thead",28),e.TgZ(2,"tr"),e.TgZ(3,"th"),e._uU(4,"#"),e.qZA(),e.TgZ(5,"th"),e._uU(6,"Estatus"),e.qZA(),e.TgZ(7,"th"),e._uU(8,"Fecha"),e.qZA(),e.TgZ(9,"th"),e._uU(10,"Cliente"),e.qZA(),e.TgZ(11,"th"),e._uU(12,"Impuestos"),e.qZA(),e.TgZ(13,"th"),e._uU(14,"Subtotal"),e.qZA(),e.TgZ(15,"th"),e._uU(16,"Total"),e.qZA(),e._UZ(17,"th"),e.qZA(),e.qZA(),e.TgZ(18,"tbody"),e.YNc(19,q,22,11,"tr",29),e.qZA(),e.qZA()),2&n){const t=e.oxw(2);e.xp6(19),e.Q6J("ngForOf",t.orders)}}function y(n,i){if(1&n&&(e.TgZ(0,"div",25),e.YNc(1,S,20,1,"table",26),e.qZA()),2&n){const t=e.oxw(),l=e.MAs(34);e.xp6(1),e.Q6J("ngIf",!(null==t.orders||!t.orders.length))("ngIfElse",l)}}function U(n,i){1&n&&(e.TgZ(0,"div",38),e._UZ(1,"i",39),e.qZA())}function k(n,i){1&n&&(e.TgZ(0,"div",40),e._uU(1," No tiene ordenes registrados "),e.qZA())}function M(n,i){if(1&n&&(e.TgZ(0,"tr"),e.TgZ(1,"td"),e._uU(2),e.qZA(),e.TgZ(3,"td"),e._uU(4),e.qZA(),e.qZA()),2&n){const t=i.$implicit;e.xp6(2),e.Oqu(t.order.name),e.xp6(2),e.Oqu(t.reason?t.reason:"Error al crear")}}function I(n,i){if(1&n&&(e.TgZ(0,"div",54),e.TgZ(1,"div",55),e._uU(2," Error al crear ordenes "),e.qZA(),e.TgZ(3,"table",56),e.TgZ(4,"thead",57),e.TgZ(5,"tr"),e.TgZ(6,"th"),e._uU(7,"Nombre"),e.qZA(),e.TgZ(8,"th"),e._uU(9,"Motivo"),e.qZA(),e.qZA(),e.qZA(),e.TgZ(10,"tbody"),e.YNc(11,M,5,2,"tr",29),e.qZA(),e.qZA(),e.qZA()),2&n){const t=e.oxw(2);e.xp6(11),e.Q6J("ngForOf",t.ordersFailed)}}function N(n,i){1&n&&(e.TgZ(0,"span"),e._uU(1,"Cancelar"),e.qZA())}function w(n,i){1&n&&(e.TgZ(0,"span"),e._uU(1,"Cerrar"),e.qZA())}function F(n,i){if(1&n&&(e.TgZ(0,"span"),e._uU(1),e.qZA()),2&n){const t=e.oxw(2);e.xp6(1),e.Oqu(t.csvAcceptLabel)}}function z(n,i){1&n&&(e.TgZ(0,"span"),e._UZ(1,"i",58),e.qZA())}function J(n,i){if(1&n){const t=e.EpF();e.TgZ(0,"div",41),e.TgZ(1,"h2",42),e._uU(2,"Agregar por CSV"),e.qZA(),e.TgZ(3,"i",43),e.NdJ("click",function(){e.CHM(t);const r=e.oxw();return r.modal.CloseModal(r.loading.updating)}),e.qZA(),e.qZA(),e.TgZ(4,"div",44),e.TgZ(5,"div",45),e.TgZ(6,"div",1),e.TgZ(7,"button",46),e.NdJ("click",function(){return e.CHM(t),e.MAs(12).click()}),e._uU(8," Seleccionar archivo "),e.qZA(),e.TgZ(9,"span"),e._uU(10),e.qZA(),e.TgZ(11,"input",47,48),e.NdJ("change",function(r){return e.CHM(t),e.oxw().OnFileSelected(r)}),e.qZA(),e.qZA(),e.YNc(13,I,12,1,"div",49),e.qZA(),e.qZA(),e.TgZ(14,"div",50),e.TgZ(15,"button",51),e.NdJ("click",function(){return e.CHM(t),e.oxw().modal.CloseModal()}),e.YNc(16,N,2,0,"span",52),e.YNc(17,w,2,0,"span",52),e.qZA(),e.TgZ(18,"button",53),e.NdJ("click",function(){return e.CHM(t),e.oxw().RegisterOrders()}),e.YNc(19,F,2,1,"span",52),e.YNc(20,z,2,0,"span",52),e.qZA(),e.qZA()}if(2&n){const t=e.oxw();e.xp6(10),e.hij(" ",null==t.ordersCsv?null:t.ordersCsv.name," "),e.xp6(3),e.Q6J("ngIf",!(null==t.ordersFailed||!t.ordersFailed.length)),e.xp6(3),e.Q6J("ngIf",!(null!=t.ordersFailed&&t.ordersFailed.length)),e.xp6(1),e.Q6J("ngIf",!(null==t.ordersFailed||!t.ordersFailed.length)),e.xp6(1),e.Q6J("disabled",t.loading.updating),e.xp6(1),e.Q6J("ngIf",!t.loading.updating),e.xp6(1),e.Q6J("ngIf",t.loading.updating)}}function D(n,i){1&n&&(e.TgZ(0,"span"),e._uU(1,"Si, eliminar"),e.qZA())}function E(n,i){1&n&&(e.TgZ(0,"span"),e._UZ(1,"i",58),e.qZA())}function Y(n,i){if(1&n){const t=e.EpF();e.TgZ(0,"div",41),e.TgZ(1,"h2",42),e._uU(2,"Eliminar orden"),e.qZA(),e.TgZ(3,"i",43),e.NdJ("click",function(){e.CHM(t);const r=e.oxw();return r.modal.CloseModal(r.loading.updating)}),e.qZA(),e.qZA(),e.TgZ(4,"div",44),e.TgZ(5,"div",4),e._uU(6),e.qZA(),e.qZA(),e.TgZ(7,"div",50),e.TgZ(8,"button",59),e.NdJ("click",function(){return e.CHM(t),e.oxw().modal.CloseModal()}),e._uU(9," No, cancelar "),e.qZA(),e.TgZ(10,"button",60),e.NdJ("click",function(){return e.CHM(t),e.oxw().DeleteOrder()}),e.YNc(11,D,2,0,"span",52),e.YNc(12,E,2,0,"span",52),e.qZA(),e.qZA()}if(2&n){const t=e.oxw();e.xp6(6),e.hij(" \xbfEsta seguro que desea eliminar la orden No. ",null==t.selectedOrder?null:t.selectedOrder.id,"? "),e.xp6(2),e.Q6J("disabled",t.loading.updating),e.xp6(2),e.Q6J("disabled",t.loading.updating),e.xp6(1),e.Q6J("ngIf",!t.loading.updating),e.xp6(1),e.Q6J("ngIf",t.loading.updating)}}const $=function(){return{text:!0,startDate:!0,endDate:!0,options:null}},G=[{path:"",component:(()=>{class n{constructor(t,l,r,o,a,c){this.form=t,this.modal=l,this.toast=r,this.http=o,this.csv=a,this.nav=c,this.measurementTypes=[],this.orders=[],this.selectedOrder=null,this.isEditing=!1,this.ordersToUpload=[],this.ordersFailed=[],this.loading={updating:!1,getting:!0},this.orderForm=new d.cw({id:new d.NI(null,[]),name:new d.NI("",[d.kI.required]),price:new d.NI("",[d.kI.required,(0,g.AW)()]),tax:new d.NI("",[d.kI.required,(0,g.wp)()]),buyerId:new d.NI(null,[d.kI.required]),salesMeasurementTypeId:new d.NI(null,[d.kI.required]),inventoryMeasurementTypeId:new d.NI(null,[d.kI.required])}),this.dataConversions=[{oldKey:"No. Orden",newKey:"orderId"},{oldKey:"Cliente",newKey:"clientRfcOrId"},{oldKey:"Direcci\xf3n",newKey:"addressAliasOrId"},{oldKey:"Fecha",newKey:"date"},{oldKey:"Producto",newKey:"productNameOrId"},{oldKey:"Piezas",newKey:"quantity",type:"number"},{oldKey:"Kilos",newKey:"weight",type:"number"}]}get csvAcceptLabel(){return this.ordersFailed.length?"Reintentar":"Subir"}ngOnInit(){this.GetOrders()}GoHome(){this.nav.GoToRoleRoute("")}OnSalesMeasurementTypeChanges(t){var l,r;t&&!(null===(l=this.orderForm.get("inventoryMeasurementTypeId"))||void 0===l?void 0:l.value)&&(null===(r=this.orderForm.get("inventoryMeasurementTypeId"))||void 0===r||r.setValue(t.id))}GetOrders(t=null){this.loading.getting=!0;let l="/Orders";t&&(l+=`/FilteredBy/StartDate/${t.startDate}/EndDate/${t.endDate}`),this.http.Get(l).subscribe(r=>{this.orders=r,this.loading.getting=!1},r=>{console.error("Error getting Orders",r),this.loading.getting=!1})}RegisterOrders(){this.loading.updating=!0,this.http.Post("Orders/Array",{products:this.ordersToUpload}).subscribe(t=>{console.log(t),this.GetOrders(),this.ordersFailed=t.ordersFailed,t.ordersSuccess.length&&this.toast.ShowDefaultSuccess(`${t.ordersSuccess.length} ordenes creados correctamente`),t.ordersFailed.length?this.toast.ShowDefaultWarning(`${t.ordersFailed.length} ordenes no se pudieron crear`):(this.modal.CloseModal(),this.ordersToUpload=[]),this.loading.updating=!1},t=>{console.error("Error creating Orders",t),this.toast.ShowDefaultDanger("Error al crear ordenes"),this.loading.updating=!1})}DeleteOrder(){this.loading.updating=!0,this.http.Delete(`Orders/${this.selectedOrder.id}`,{}).subscribe(t=>{this.GetOrders(),this.toast.ShowDefaultSuccess("Orden eliminado correctamente"),this.modal.CloseModal(),this.loading.updating=!1},t=>{console.error("Error deleting Order",t),this.toast.ShowDefaultDanger(this.http.GetErrorMessage(t)||"Error al eliminar orden"),this.loading.updating=!1})}SetAsDelivered(t){this.http.Patch(`/Orders/${t.id}/Deliver`,{}).subscribe(l=>{this.toast.ShowDefaultSuccess("Orden actualizada"),this.GetOrders()},l=>{this.toast.ShowDefaultDanger(this.http.GetErrorMessage(l)||"Error al actualizar orden"),console.error("Error delivering order",l)})}DownloadTemplate(){this.http.DownloadFileWithoutApi("assets/templates/plantilla_ordenes.csv","plantilla_ordenes.csv")}OnFileSelected(t){const l=t.target.files[0];if(this.ordersCsv=l,!l)return;const r=new FileReader;r.onload=o=>{this.csv.ReadCSV(r.result).then(a=>{this.ordersToUpload=this.csv.FormatData(a.data,this.dataConversions)})},r.readAsText(l,"ISO-8859-3")}GenerateCsv(){let r=this.orders.map(o=>{var a,c;return{id:o.id,status:null===(a=o.status)||void 0===a?void 0:a.name,date:h(o.date).format("DD/MM/YYYY"),client:null===(c=o.client)||void 0===c?void 0:c.name,taxes:`$${o.taxes}`,subtotal:`$${o.subtotal}`,total:`$${o.total}`}});this.csv.GenerateCSV("ordenes_de_venta",r,["id","status","date","client","taxes","subtotal","total"],["id","Estatus","Fecha","Cliente","Impuestos","Subtotal","Total"])}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(f.o),e.Y36(T.Z),e.Y36(v.k),e.Y36(x.O),e.Y36(A.M),e.Y36(O.f))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-sell-orders"]],decls:39,vars:5,consts:[[1,"content"],[1,"d-flex","align-items-center","justify-content-between"],[1,"page-title"],[1,"zmdi","zmdi-home","zmdi-hc-lg","mr-2","clickeable",3,"click"],[1,"d-flex"],[1,"btn","btn-success","mx-1",3,"click"],[1,"zmdi","zmdi-plus-circle-o","zmdi-hc-lg","mr-2"],["id","csvordersDropdown","data-toggle","dropdown","aria-haspopup","true","aria-expanded","false",1,"clickeable","px-2"],[1,"btn","btn-success","mx-1"],[1,"zmdi","zmdi-file","zmdi-hc-lg","mr-2"],["aria-labelledby","csvordersDropdown",1,"dropdown-menu","px-1","py-1"],[1,"menu-list"],[1,"d-flex","align-items-center","px-3","my-1","clickeable-hover",3,"click"],[1,"zmdi","zmdi-file-text"],[1,"pl-2"],[1,"zmdi","zmdi-file-plus"],[1,"zmdi","zmdi-download"],[1,"row","justify-content-center"],[1,"col-12","mb-4"],[3,"timerTrigger","filters","onSearch"],["class","col-12 col-lg-11",4,"ngIf","ngIfElse"],["bigLoading",""],["noOrdersMessage",""],["addordersByCsvModal",""],["deleteorderModal",""],[1,"col-12","col-lg-11"],["class","table table-striped",4,"ngIf","ngIfElse"],[1,"table","table-striped"],[1,"table-thead"],[4,"ngFor","ngForOf"],[1,"align-middle","clickeable",3,"click"],[1,"align-middle"],[1,"d-flex","flex-column",2,"gap","12px"],[1,"d-flex","align-items-center","justify-content-center",2,"gap","12px"],[1,"zmdi","zmdi-edit","zmdi-hc-lg","clickeable",3,"click"],[1,"zmdi","zmdi-delete","zmdi-hc-lg","clickeable",3,"click"],["class","btn btn-primary",3,"click",4,"ngIf"],[1,"btn","btn-primary",3,"click"],[1,"w-100","h-75","d-flex","align-items-center","justify-content-center",2,"min-height","min-content"],[1,"zmdi","zmdi-spinner","zmdi-hc-5x","zmdi-hc-spin"],[1,"no-items-message"],[1,"modal-header"],[1,"modal-title"],[1,"close-modal-button","zmdi","zmdi-close-circle-o","zmdi-hc-2x","clickeable",3,"click"],[1,"modal-body"],[1,"d-flex","flex-column","justify-content-between"],[1,"btn","btn-outline-primary",3,"click"],["type","file","accept",".csv",1,"d-none",3,"change"],["csvFileInput",""],["class","modal-table",4,"ngIf"],[1,"modal-footer"],[1,"btn","btn-secondary",3,"click"],[4,"ngIf"],[1,"btn","btn-success",3,"disabled","click"],[1,"modal-table"],[1,"my-4","text-center",2,"font-size","1.25rem","font-weight","700"],[1,"table","table-danger","table-striped"],[1,"table-thead","bg-danger"],[1,"zmdi","zmdi-spinner","zmdi-hc-lg","zmdi-hc-spin"],[1,"btn","btn-secondary",3,"disabled","click"],[1,"btn","btn-danger",3,"disabled","click"]],template:function(t,l){if(1&t){const r=e.EpF();e.TgZ(0,"div",0),e.TgZ(1,"div",1),e.TgZ(2,"div",2),e.TgZ(3,"i",3),e.NdJ("click",function(){return l.GoHome()}),e.qZA(),e._uU(4," Mis ordenes de venta "),e.qZA(),e.TgZ(5,"div",4),e.TgZ(6,"button",5),e.NdJ("click",function(){return l.nav.GoToRoleRoute("sell-orders/create")}),e._UZ(7,"i",6),e._uU(8," Agregar "),e.qZA(),e.TgZ(9,"div",7),e.TgZ(10,"button",8),e._UZ(11,"i",9),e._uU(12," CSV "),e.qZA(),e.TgZ(13,"div",10),e.TgZ(14,"div",11),e.TgZ(15,"div",12),e.NdJ("click",function(){return l.DownloadTemplate()}),e._UZ(16,"i",13),e.TgZ(17,"span",14),e._uU(18,"Descargar plantilla"),e.qZA(),e.qZA(),e.TgZ(19,"div",12),e.NdJ("click",function(){e.CHM(r);const a=e.MAs(36);return l.modal.OpenModal(a)}),e._UZ(20,"i",15),e.TgZ(21,"span",14),e._uU(22,"Cargar ordenes"),e.qZA(),e.qZA(),e.TgZ(23,"div",12),e.NdJ("click",function(){return l.GenerateCsv()}),e._UZ(24,"i",16),e.TgZ(25,"span",14),e._uU(26,"Exportar ordenes"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(27,"div",17),e.TgZ(28,"div",18),e.TgZ(29,"app-filters",19),e.NdJ("onSearch",function(a){return l.GetOrders(a)}),e.qZA(),e.qZA(),e.YNc(30,y,2,2,"div",20),e.qZA(),e.qZA(),e.YNc(31,U,2,0,"ng-template",null,21,e.W1O),e.YNc(33,k,2,0,"ng-template",null,22,e.W1O),e.YNc(35,J,21,7,"ng-template",null,23,e.W1O),e.YNc(37,Y,13,5,"ng-template",null,24,e.W1O)}if(2&t){const r=e.MAs(32);e.xp6(29),e.Q6J("timerTrigger",!0)("filters",e.DdM(4,$)),e.xp6(1),e.Q6J("ngIf",!l.loading.getting)("ngIfElse",r)}},directives:[b.b,u.O5,u.sg],pipes:[u.uU],styles:[""]}),n})()}];let Q=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[[d.u5,u.ez,Z.F,m.A0,d.UX,p.Bz.forChild(G)]]}),n})()}}]);