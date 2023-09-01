"use strict";(self.webpackChunkfront=self.webpackChunkfront||[]).push([[224],{7224:(z,c,a)=>{a.r(c),a.d(c,{PaymentsModule:()=>M});var l=a(6019),u=a(850),d=a(7537),g=a(1435),p=a(3550),m=a(4684),h=a(8260),t=a(1514),_=a(6588),Z=a(7754),f=a(1843),T=a(6155),v=a(5749);function x(s,o){if(1&s){const e=t.EpF();t.TgZ(0,"div",14),t.TgZ(1,"label"),t._uU(2,"Cambiar estatus de ordenes seleccionadas"),t.qZA(),t.TgZ(3,"div",23),t.TgZ(4,"i",24),t.NdJ("click",function(){return t.CHM(e),t.oxw().SaveOrdersStatuses()}),t.qZA(),t.TgZ(5,"ng-select",25),t.NdJ("ngModelChange",function(i){return t.CHM(e),t.oxw().globalStatus=i}),t.qZA(),t.qZA(),t.qZA()}if(2&s){const e=t.oxw();t.xp6(5),t.Q6J("items",e.orderStatuses)("loading",e.loading.updatingOrders)("ngModel",e.globalStatus)}}function A(s,o){if(1&s){const e=t.EpF();t.TgZ(0,"div",34),t.NdJ("click",function(){t.CHM(e);const i=t.oxw().$implicit;return t.oxw(3).ToggleStatusEdition(i)}),t._UZ(1,"i",35),t._uU(2),t.qZA()}if(2&s){const e=t.oxw().$implicit;t.xp6(2),t.hij(" ",e.status.name," ")}}function S(s,o){if(1&s){const e=t.EpF();t.TgZ(0,"div",23),t.TgZ(1,"i",24),t.NdJ("click",function(){t.CHM(e);const i=t.oxw().$implicit;return t.oxw(3).SaveOrderStatus(i)}),t.qZA(),t.TgZ(2,"ng-select",36),t.NdJ("ngModelChange",function(i){return t.CHM(e),t.oxw().$implicit.statusId=i}),t.qZA(),t.qZA()}if(2&s){const e=t.oxw().$implicit,n=t.oxw(3);t.xp6(2),t.Q6J("items",n.orderStatuses)("loading",n.loading.updating)("disabled",n.loading.updating)("ngModel",e.statusId)}}function b(s,o){if(1&s){const e=t.EpF();t.TgZ(0,"tr"),t.TgZ(1,"td",30),t.TgZ(2,"input",31),t.NdJ("ngModelChange",function(i){return t.CHM(e).$implicit.isSelected=i}),t.qZA(),t.qZA(),t.TgZ(3,"td",30),t._uU(4),t.qZA(),t.TgZ(5,"td",30),t.YNc(6,A,3,1,"div",32),t.YNc(7,S,3,4,"div",33),t.qZA(),t.TgZ(8,"td",30),t._uU(9),t.ALo(10,"date"),t.qZA(),t.TgZ(11,"td",30),t._uU(12),t.qZA(),t.TgZ(13,"td",30),t._uU(14),t.qZA(),t.TgZ(15,"td",30),t._uU(16),t.qZA(),t.TgZ(17,"td",30),t._uU(18),t.qZA(),t.qZA()}if(2&s){const e=o.$implicit;t.xp6(2),t.Q6J("ngModel",e.isSelected),t.xp6(2),t.Oqu(e.id),t.xp6(2),t.Q6J("ngIf",!e.editStatus),t.xp6(1),t.Q6J("ngIf",!!e.editStatus),t.xp6(2),t.Oqu(t.xi3(10,9,e.date,"dd/MM/YYYY hh:mm a")),t.xp6(3),t.Oqu(e.client.name),t.xp6(2),t.hij("$",e.taxes,""),t.xp6(2),t.hij("$",e.subtotal,""),t.xp6(2),t.hij("$",e.total,"")}}function y(s,o){if(1&s&&(t.TgZ(0,"table",27),t.TgZ(1,"thead",28),t.TgZ(2,"tr"),t._UZ(3,"th"),t.TgZ(4,"th"),t._uU(5,"#"),t.qZA(),t.TgZ(6,"th"),t._uU(7,"Estatus"),t.qZA(),t.TgZ(8,"th"),t._uU(9,"Fecha"),t.qZA(),t.TgZ(10,"th"),t._uU(11,"Cliente"),t.qZA(),t.TgZ(12,"th"),t._uU(13,"Impuestos"),t.qZA(),t.TgZ(14,"th"),t._uU(15,"Subtotal"),t.qZA(),t.TgZ(16,"th"),t._uU(17,"Total"),t.qZA(),t._UZ(18,"th"),t.qZA(),t.qZA(),t.TgZ(19,"tbody"),t.YNc(20,b,19,12,"tr",29),t.qZA(),t.qZA()),2&s){const e=t.oxw(2);t.xp6(20),t.Q6J("ngForOf",e.orders)}}function C(s,o){if(1&s&&(t.TgZ(0,"div",17),t.YNc(1,y,21,1,"table",26),t.qZA()),2&s){const e=t.oxw(),n=t.MAs(44);t.xp6(1),t.Q6J("ngIf",!(null==e.orders||!e.orders.length))("ngIfElse",n)}}function O(s,o){1&s&&(t.TgZ(0,"div",37),t._UZ(1,"i",38),t.qZA())}function q(s,o){1&s&&(t.TgZ(0,"div",39),t._uU(1," No tiene ordenes por cobrar "),t.qZA())}const P=[{path:"",component:(()=>{class s{constructor(e,n,i,r){this.toast=e,this.http=n,this.csv=i,this.nav=r,this.clients=[],this.orders=[],this.orderStatuses=[],this.filters=[],this.globalStatus=null,this.loading={updatingOrders:!1,updating:!1,getting:!0},this.InitializeFilters()}get areSomeOrdersSelected(){return!!this.orders.length&&this.orders.some(e=>!!e.isSelected)}ngOnInit(){this.GetOrderStatuses(),this.GetOrders()}InitializeFilters(){this.filters.push({type:"datepicker",name:"startDate",placeholder:"Fecha de inicio",config:null}),this.filters.push({type:"datepicker",name:"endDate",placeholder:"Fecha de fin",config:null})}GoHome(){this.nav.GoToRoleRoute("")}FormatDate(e){return e&&"*"!=e?m(e).tz(h.N.timezone).toISOString().split("T").shift():"*"}GetOrders(e=null){this.loading.getting=!0;let n="/Orders/OfPayments";e&&(n+=`/FilteredBy/StartDate/${this.FormatDate(e.startDate)}/EndDate/${this.FormatDate(e.endDate)}/Statuses/${JSON.stringify(e.status?[e.status]:[])}/Clients/${JSON.stringify(e.client?[e.client]:[])}`),this.http.Get(n).subscribe(i=>{this.orders=i,this.loading.getting=!1},i=>{console.error("Error getting orders",i),this.loading.getting=!1})}GetClients(){this.http.Get("/Clients").subscribe(e=>{this.filters.push({type:"select",name:"client",placeholder:"Cliente",config:{multiple:!1,options:e}})},e=>{console.error("Error getting clients",e)})}GetOrderStatuses(){this.http.Get("/OrderStatuses").subscribe(e=>{this.GetClients(),this.orderStatuses=e.filter(n=>n.id>=3),this.filters.push({type:"select",name:"status",placeholder:"Estado",config:{multiple:!1,options:this.orderStatuses}})},e=>{console.error("Error getting order statuses",e)})}GenerateCsv(){let i=this.orders.map(r=>({}));this.csv.GenerateCSV("cobranza",i,["id","status","date","client","taxes","subtotal","total"],["id","Estatus","Fecha","Cliente","Impuestos","Subtotal","Total"])}GetTotalOrdersByStatus(e){let n=0;return this.orders.forEach(i=>{e==i.status.name&&(n+=i.total)}),n}GoToOrder(e){localStorage.setItem("paymentMode",JSON.stringify(!0)),this.nav.GoToRoleRoute("edit-sell-orders/"+e.id)}ToggleStatusEdition(e){e.editStatus=!e.editStatus}SaveOrderStatus(e){e.statusId?(this.loading.updating=!0,this.http.Patch(`/Orders/${e.id}`,{order:e}).subscribe(n=>{this.toast.ShowDefaultSuccess("Estatus actualizado"),this.ToggleStatusEdition(e),this.GetOrders(),this.loading.updating=!1},n=>{console.error("Error updating order status",n),this.loading.updating=!1})):this.toast.ShowDefaultWarning("Selecciona un status")}SaveOrdersStatuses(){let e=this.orders.filter(n=>!!n.isSelected).map(n=>n.id);this.loading.updatingOrders=!0,this.http.Patch("/Orders/UpdateStatus",{ordersIds:e,status:this.globalStatus}).subscribe(n=>{this.toast.ShowDefaultSuccess("Ordenes actualizadas correctamente"),this.GetOrders(),this.loading.updatingOrders=!1},n=>{console.error("Error updating orders status",n),this.toast.ShowDefaultDanger("Error al actualizar el estado de las ordenes"),this.loading.updatingOrders=!1})}}return s.\u0275fac=function(e){return new(e||s)(t.Y36(_.k),t.Y36(Z.O),t.Y36(f.M),t.Y36(T.f))},s.\u0275cmp=t.Xpm({type:s,selectors:[["app-payments"]],decls:45,vars:17,consts:[[1,"content"],[1,"d-flex","align-items-center","justify-content-between"],[1,"page-title"],[1,"zmdi","zmdi-home","zmdi-hc-lg","mr-2","clickeable",3,"click"],[1,"d-flex"],["id","csvordersDropdown","data-toggle","dropdown","aria-haspopup","true","aria-expanded","false",1,"clickeable","px-2"],[1,"btn","btn-success","mx-1"],[1,"zmdi","zmdi-file","zmdi-hc-lg","mr-2"],["aria-labelledby","csvordersDropdown",1,"dropdown-menu","px-1","py-1"],[1,"menu-list"],[1,"d-flex","align-items-center","px-3","my-1","clickeable-hover",3,"click"],[1,"zmdi","zmdi-download"],[1,"pl-2"],[1,"row","justify-content-center"],[1,"col-12","mb-4"],[3,"timerTrigger","filters","onSearch"],["class","col-12 mb-4",4,"ngIf"],[1,"col-12","col-lg-11"],[1,"total-card"],[1,"total"],["class","col-12 col-lg-11",4,"ngIf","ngIfElse"],["bigLoading",""],["noOrdersMessage",""],[1,"d-flex","align-items-center",2,"gap","12px"],[1,"zmdi","zmdi-save","zmdi-hc-lg","clickeable",3,"click"],["bindLabel","name","placeholder","Selecciona un estatus",1,"flex-grow-1",3,"items","loading","ngModel","ngModelChange"],["class","table table-striped","style","overflow: visible;",4,"ngIf","ngIfElse"],[1,"table","table-striped",2,"overflow","visible"],[1,"table-thead"],[4,"ngFor","ngForOf"],[1,"align-middle"],["type","checkbox",3,"ngModel","ngModelChange"],["class","d-flex align-items-center clickeable","style","gap: 12px;",3,"click",4,"ngIf"],["class","d-flex align-items-center","style","gap: 12px;",4,"ngIf"],[1,"d-flex","align-items-center","clickeable",2,"gap","12px",3,"click"],[1,"zmdi","zmdi-edit","zmdi-hc-lg"],["bindLabel","name","bindValue","id","placeholder","Selecciona un estatus",1,"flex-grow-1",3,"items","loading","disabled","ngModel","ngModelChange"],[1,"w-100","h-75","d-flex","align-items-center","justify-content-center",2,"min-height","min-content"],[1,"zmdi","zmdi-spinner","zmdi-hc-5x","zmdi-hc-spin"],[1,"no-items-message"]],template:function(e,n){if(1&e&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"div",2),t.TgZ(3,"i",3),t.NdJ("click",function(){return n.GoHome()}),t.qZA(),t._uU(4," Cobranza "),t.qZA(),t.TgZ(5,"div",4),t.TgZ(6,"div",5),t.TgZ(7,"button",6),t._UZ(8,"i",7),t._uU(9," CSV "),t.qZA(),t.TgZ(10,"div",8),t.TgZ(11,"div",9),t.TgZ(12,"div",10),t.NdJ("click",function(){return n.GenerateCsv()}),t._UZ(13,"i",11),t.TgZ(14,"span",12),t._uU(15,"Exportar ordenes"),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.TgZ(16,"div",13),t.TgZ(17,"div",14),t.TgZ(18,"app-filters",15),t.NdJ("onSearch",function(r){return n.GetOrders(r)}),t.qZA(),t.qZA(),t.YNc(19,x,6,3,"div",16),t.TgZ(20,"div",17),t.TgZ(21,"div",18),t.TgZ(22,"div",19),t.TgZ(23,"span"),t._uU(24,"Pendientes:"),t.qZA(),t.TgZ(25,"span"),t._uU(26),t.ALo(27,"number"),t.qZA(),t.qZA(),t.TgZ(28,"div",19),t.TgZ(29,"span"),t._uU(30,"Pagadas:"),t.qZA(),t.TgZ(31,"span"),t._uU(32),t.ALo(33,"number"),t.qZA(),t.qZA(),t.TgZ(34,"div",19),t.TgZ(35,"span"),t._uU(36,"Incobrables:"),t.qZA(),t.TgZ(37,"span"),t._uU(38),t.ALo(39,"number"),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.YNc(40,C,2,2,"div",20),t.qZA(),t.qZA(),t.YNc(41,O,2,0,"ng-template",null,21,t.W1O),t.YNc(43,q,2,0,"ng-template",null,22,t.W1O)),2&e){const i=t.MAs(42);t.xp6(18),t.Q6J("timerTrigger",!0)("filters",n.filters),t.xp6(1),t.Q6J("ngIf",n.areSomeOrdersSelected),t.xp6(7),t.hij("$",t.xi3(27,8,n.GetTotalOrdersByStatus("Pendiente de pago"),"0.2-2"),""),t.xp6(6),t.hij("$",t.xi3(33,11,n.GetTotalOrdersByStatus("Pagado"),"0.2-2"),""),t.xp6(6),t.hij("$",t.xi3(39,14,n.GetTotalOrdersByStatus("Incobrable"),"0.2-2"),""),t.xp6(2),t.Q6J("ngIf",!n.loading.getting)("ngIfElse",i)}},directives:[v.b,l.O5,g.w9,d.JJ,d.On,l.sg,d.Wl],pipes:[l.JJ,l.uU],styles:[".total-card[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;border:1px solid #ccc;border-radius:12px;margin:1rem 0;padding:1.5rem}.total[_ngcontent-%COMP%]{display:flex;grid-gap:12px;gap:12px;font-size:2rem}.total[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child{font-weight:700}"]}),s})()}];let M=(()=>{class s{}return s.\u0275fac=function(e){return new(e||s)},s.\u0275mod=t.oAB({type:s}),s.\u0275inj=t.cJS({imports:[[d.u5,l.ez,p.F,g.A0,d.UX,u.Bz.forChild(P)]]}),s})()}}]);