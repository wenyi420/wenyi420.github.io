(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6d552c7c"],{2241:function(t,e,n){"use strict";var i,s=n("c31d"),o=n("2b0e"),a=n("d282"),l=n("ea8e"),c=n("b1d2"),r=n("6605"),u=n("b650"),d=Object(a["a"])("dialog"),m=d[0],f=d[1],h=d[2],v=m({mixins:[Object(r["a"])()],props:{title:String,width:[Number,String],message:String,className:null,callback:Function,beforeClose:Function,messageAlign:String,cancelButtonText:String,cancelButtonColor:String,confirmButtonText:String,confirmButtonColor:String,showCancelButton:Boolean,transition:{type:String,default:"van-dialog-bounce"},showConfirmButton:{type:Boolean,default:!0},overlay:{type:Boolean,default:!0},closeOnClickOverlay:{type:Boolean,default:!1}},data:function(){return{loading:{confirm:!1,cancel:!1}}},methods:{onClickOverlay:function(){this.handleAction("overlay")},handleAction:function(t){var e=this;this.$emit(t),this.value&&(this.beforeClose?(this.loading[t]=!0,this.beforeClose(t,(function(n){!1!==n&&e.loading[t]&&e.onClose(t),e.loading.confirm=!1,e.loading.cancel=!1}))):this.onClose(t))},onClose:function(t){this.close(),this.callback&&this.callback(t)},onOpened:function(){this.$emit("opened")},onClosed:function(){this.$emit("closed")},genButtons:function(){var t,e=this,n=this.$createElement,i=this.showCancelButton&&this.showConfirmButton;return n("div",{class:[c["c"],f("footer",{buttons:i})]},[this.showCancelButton&&n(u["a"],{attrs:{size:"large",loading:this.loading.cancel,text:this.cancelButtonText||h("cancel")},class:f("cancel"),style:{color:this.cancelButtonColor},on:{click:function(){e.handleAction("cancel")}}}),this.showConfirmButton&&n(u["a"],{attrs:{size:"large",loading:this.loading.confirm,text:this.confirmButtonText||h("confirm")},class:[f("confirm"),(t={},t[c["a"]]=i,t)],style:{color:this.confirmButtonColor},on:{click:function(){e.handleAction("confirm")}}})])}},render:function(){var t,e=arguments[0];if(this.shouldRender){var n=this.message,i=this.messageAlign,s=this.slots(),o=this.slots("title")||this.title,a=o&&e("div",{class:f("header",{isolated:!n&&!s})},[o]),c=(s||n)&&e("div",{class:f("content")},[s||e("div",{domProps:{innerHTML:n},class:f("message",(t={"has-title":o},t[i]=i,t))})]);return e("transition",{attrs:{name:this.transition},on:{afterEnter:this.onOpened,afterLeave:this.onClosed}},[e("div",{directives:[{name:"show",value:this.value}],attrs:{role:"dialog","aria-labelledby":this.title||n},class:[f(),this.className],style:{width:Object(l["a"])(this.width)}},[a,c,this.genButtons()])])}}}),C=n("a142");function p(t){return document.body.contains(t)}function g(){i&&i.$destroy(),i=new(o["default"].extend(v))({el:document.createElement("div"),propsData:{lazyRender:!1}}),i.$on("input",(function(t){i.value=t}))}function b(t){return C["e"]?Promise.resolve():new Promise((function(e,n){i&&p(i.$el)||g(),Object(s["a"])(i,b.currentOptions,t,{resolve:e,reject:n})}))}b.defaultOptions={value:!0,title:"",width:"",message:"",overlay:!0,className:"",lockScroll:!0,transition:"van-dialog-bounce",beforeClose:null,overlayClass:"",overlayStyle:null,messageAlign:"",getContainer:"body",cancelButtonText:"",cancelButtonColor:null,confirmButtonText:"",confirmButtonColor:null,showConfirmButton:!0,showCancelButton:!1,closeOnPopstate:!1,closeOnClickOverlay:!1,callback:function(t){i["confirm"===t?"resolve":"reject"](t)}},b.alert=b,b.confirm=function(t){return b(Object(s["a"])({showCancelButton:!0},t))},b.close=function(){i&&(i.value=!1)},b.setDefaultOptions=function(t){Object(s["a"])(b.currentOptions,t)},b.resetDefaultOptions=function(){b.currentOptions=Object(s["a"])({},b.defaultOptions)},b.resetDefaultOptions(),b.install=function(){o["default"].use(v)},b.Component=v,o["default"].prototype.$dialog=b;e["a"]=b},"2cd9":function(t,e,n){},"2fcb":function(t,e,n){},"49d6":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h1",{staticClass:"pageTitle"},[t._v("客戶訂單列表")]),n("div",{staticClass:"orderList"},t._l(t.orderListData,(function(t){return n("orderListItem",{key:t.id,attrs:{item:t}})})),1)])},s=[],o=(n("e17f"),n("2241")),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"item"},[n("div",{staticClass:"item-col item-col-2 time"},[n("label",{staticClass:"title"},[t._v("日期")]),n("p",{staticClass:"content"},[t._v(t._s(t.item.time))])]),n("div",{staticClass:"item-col item-col-4 name"},[n("label",{staticClass:"title"},[t._v("姓名")]),n("p",{staticClass:"content"},[t._v(t._s(t.item.name))])]),n("div",{staticClass:"item-col item-col-3 phone"},[n("label",{staticClass:"title"},[t._v("電話")]),n("p",{staticClass:"content"},[t._v(t._s(t.item.phone))])]),n("div",{staticClass:"item-col item-col-3 email"},[n("label",{staticClass:"title"},[t._v("信箱")]),n("p",{staticClass:"content"},[t._v(t._s(t.item.email))])]),n("div",{staticClass:"item-col item-col-2 totalPrice"},[n("label",{staticClass:"title"},[t._v("總金額")]),n("p",{staticClass:"content"},[t._v(t._s(t.item.totalPrice))])]),n("div",{staticClass:"item-col item-col-2 payStatus"},[n("label",{staticClass:"title"},[t._v("狀態")]),n("p",{staticClass:"content"},[t.item.isPay?n("span",{staticClass:"text-success"},[t._v("已付款")]):n("span",{staticClass:"text-danger"},[t._v("未付款")])])]),n("div",{staticClass:"item-col item-col-2 edit"},[n("label",{staticClass:"title"},[t._v("編輯訂單")]),n("p",{staticClass:"content"},[n("span",{staticClass:"btn edit",on:{click:t.goEditPage}},[t._v("詳細")])])]),t._m(0)])},l=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"item-col item-col-2 delete"},[n("label",{staticClass:"title"},[t._v("刪除訂單")]),n("p",{staticClass:"content"},[n("span",{staticClass:"btn delete"},[t._v("刪除")])])])}],c={name:"orderListItem",data:function(){return{}},props:{item:{type:Object,require:!0}},methods:{goEditPage:function(){this.$router.push("/admin/editOrder/".concat(this.item.id))}}},r=c,u=(n("9a9b"),n("2877")),d=Object(u["a"])(r,a,l,!1,null,"43fe6e58",null),m=d.exports,f={name:"orderList",beforeCreate:function(){var t=localStorage.getItem("Authorization");t||(Object(o["a"])({message:"請登入後台"}),this.$router.push("/login"))},data:function(){return{orderListData:[]}},components:{orderListItem:m},mounted:function(){var t=this;console.log(1),this.$axios.get("https://vueshopcart.herokuapp.com/orderlist").then((function(e){t.orderListData=e.data})).catcg((function(t){console.log(t)}))}},h=f,v=(n("5d80"),Object(u["a"])(h,i,s,!1,null,null,null));e["default"]=v.exports},"5d80":function(t,e,n){"use strict";var i=n("2cd9"),s=n.n(i);s.a},"9a9b":function(t,e,n){"use strict";var i=n("cc17"),s=n.n(i);s.a},cc17:function(t,e,n){},e17f:function(t,e,n){"use strict";n("68ef"),n("a71a"),n("9d70"),n("3743"),n("4d75"),n("e3b3"),n("bc1b"),n("2fcb")}}]);
//# sourceMappingURL=chunk-6d552c7c.74b1307f.js.map