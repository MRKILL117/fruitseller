"use strict";(self.webpackChunkfront=self.webpackChunkfront||[]).push([[592],{5838:(D,m,r)=>{function o(){return _=>{const l=_.value;return!l||/^[0-9]*$/.test(l)?null:{onlynumbers:"format invalid"}}}function p(){return _=>{const l=_.value;return!l||/^[0-9]{1,}(\.[0-9]{1,2})?$/.test(l)?null:{pricenumber:"format invalid"}}}r.d(m,{wp:()=>o,AW:()=>p})},5749:(D,m,r)=>{r.d(m,{b:()=>M});var t=r(1514),o=r(7537),p=r(4684),l=r(8260),f=r(822),v=r(6019),d=r(7788),a=r(1435);function g(i,c){if(1&i){const n=t.EpF();t.TgZ(0,"div",7),t.TgZ(1,"div",8),t._UZ(2,"i",9),t.TgZ(3,"input",10),t.NdJ("keyup",function(){return t.CHM(n),t.oxw().Search(!0)})("keyup.enter",function(){return t.CHM(n),t.oxw().Search()}),t.qZA(),t.qZA(),t.qZA()}}function h(i,c){if(1&i){const n=t.EpF();t.TgZ(0,"app-date-picker",11),t.NdJ("onDateChange",function(s){return t.CHM(n),t.oxw().SetDate("startDate",s)}),t.qZA()}}function T(i,c){if(1&i){const n=t.EpF();t.TgZ(0,"app-date-picker",11),t.NdJ("onDateChange",function(s){return t.CHM(n),t.oxw().SetDate("endDate",s)}),t.qZA()}}function C(i,c){1&i&&t._UZ(0,"div",12)}function E(i,c){if(1&i){const n=t.EpF();t.TgZ(0,"div",13),t.TgZ(1,"ng-select",14),t.NdJ("change",function(s){return t.CHM(n),t.oxw().OnOptionSelected(s)}),t.qZA(),t.qZA()}if(2&i){const n=t.oxw();t.xp6(1),t.Q6J("items",n.filters.options)("placeholder",n.filters.optionsLabel)}}function x(i,c){if(1&i){const n=t.EpF();t.TgZ(0,"button",15),t.NdJ("click",function(){return t.CHM(n),t.oxw().Search()}),t._uU(1," Filtrar "),t.qZA()}}let M=(()=>{class i{constructor(n){this.form=n,this.timerTrigger=!1,this.dateIncludesTime=!1,this.filters={text:!0,startDate:!0,endDate:!0,optionsLabel:"Seleccione una opcion",optionsMultiple:!1,options:[]},this.onSearch=new t.vpe,this.timer=null,this.filtersForm=new o.cw({text:new o.NI("",[]),startDate:new o.NI(null,[]),endDate:new o.NI(null,[]),options:new o.NI(null,[])})}ngOnInit(){}SetDate(n,e){var s;let u=p(e).tz(l.N.timezone);n.toLowerCase().includes("start")&&this.dateIncludesTime&&u.startOf("day"),n.toLowerCase().includes("end")&&this.dateIncludesTime&&u.endOf("day"),null===(s=this.filtersForm.get(n))||void 0===s||s.setValue(u.toISOString()),this.Search()}OnOptionSelected(n){var e;null===(e=this.filtersForm.get("options"))||void 0===e||e.setValue(n),this.Search()}Search(n=!1){let e=this.filtersForm.value;e.text=e.text?e.text:"*",e.startDate=e.startDate?this.dateIncludesTime?e.startDate:e.startDate.split("T")[0]:"*",e.endDate=e.endDate?this.dateIncludesTime?e.endDate:e.endDate.split("T")[0]:"*",e.options=e.options?e.options:this.filters.optionsMultiple?[]:"*",this.timerTrigger&&n?(this.timer&&clearTimeout(this.timer),this.timer=setTimeout(()=>{this.onSearch.emit(e)},300)):this.onSearch.emit(e)}}return i.\u0275fac=function(n){return new(n||i)(t.Y36(f.o))},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-filters"]],inputs:{timerTrigger:"timerTrigger",dateIncludesTime:"dateIncludesTime",filters:"filters"},outputs:{onSearch:"onSearch"},decls:8,vars:7,consts:[[3,"formGroup"],[1,"filters"],["class","form-group flex-grow-1 mx-2",4,"ngIf"],["class","flex-grow-1 mx-2",3,"onDateChange",4,"ngIf"],["class","space",4,"ngIf"],["class","form-group flex-grow-1",4,"ngIf"],["class","btn btn-success",3,"click",4,"ngIf"],[1,"form-group","flex-grow-1","mx-2"],[1,"input-container"],[1,"input-icon","zmdi","zmdi-search","zmdi-hc-lg"],["type","text","placeholder","Buscar","formControlName","text",1,"form-control",3,"keyup","keyup.enter"],[1,"flex-grow-1","mx-2",3,"onDateChange"],[1,"space"],[1,"form-group","flex-grow-1"],["bindLabel","name",1,"clients-select",3,"items","placeholder","change"],[1,"btn","btn-success",3,"click"]],template:function(n,e){1&n&&(t.TgZ(0,"form",0),t.TgZ(1,"div",1),t.YNc(2,g,4,0,"div",2),t.YNc(3,h,1,0,"app-date-picker",3),t.YNc(4,T,1,0,"app-date-picker",3),t.YNc(5,C,1,0,"div",4),t.YNc(6,E,2,2,"div",5),t.YNc(7,x,2,0,"button",6),t.qZA(),t.qZA()),2&n&&(t.Q6J("formGroup",e.filtersForm),t.xp6(2),t.Q6J("ngIf",!(null==e.filters||!e.filters.text)),t.xp6(1),t.Q6J("ngIf",!(null==e.filters||!e.filters.startDate)),t.xp6(1),t.Q6J("ngIf",!(null==e.filters||!e.filters.endDate)),t.xp6(1),t.Q6J("ngIf",!(null==e.filters||!e.filters.options)),t.xp6(1),t.Q6J("ngIf",!(null==e.filters||null==e.filters.options||!e.filters.options.length)),t.xp6(1),t.Q6J("ngIf",!e.timerTrigger))},directives:[o._Y,o.JL,o.sg,v.O5,o.Fj,o.JJ,o.u,d.L,a.w9],styles:[".filters[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:end;flex-wrap:wrap}.space[_ngcontent-%COMP%]{margin:0 .4rem}.form-group[_ngcontent-%COMP%]{min-width:min-content;margin:.5rem;flex-basis:225px;max-width:100%}"]}),i})()},3550:(D,m,r)=>{r.d(m,{F:()=>d});var t=r(6019),o=r(7537),p=r(1435),l=(r(5749),r(7591)),f=r(1514);let d=(()=>{class a{}return a.\u0275fac=function(h){return new(h||a)},a.\u0275mod=f.oAB({type:a}),a.\u0275inj=f.cJS({imports:[[o.u5,t.ez,p.A0,l.I,o.UX]]}),a})()}}]);