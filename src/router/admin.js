import { createWebHistory, createRouter } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/home",
      name: "homepage",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/admin/admin/AdminView.vue"),  
    },

    {
      path:"/partner",
      name:"partner",
      component:()=>import("../views/admin/partner/PartnerView.vue"),
    },

    {
      path:"/product/category",
      name:"categoryview",
      component:()=>import("../views/admin/product/Categoryview.vue"),
    },
    {
      path:"/product/type",
      name:"typeview",
      component:()=>import("../views/admin/product/Typeview.vue"),
    },
    {
      path:"/product",
      name:"product",
      component:()=>import("../views/admin/product/Productview.vue"),
    },
    //แก้ข้อมูลส่วนตัว 
    {
      path:"/profile/",
      name:"profile",
      component:()=>import("../views/admin/admin/EditAdmin.vue"),
    },{
      path:"/contact/",
      name:"contact",
      component:()=>import("../views/admin/contract/contract.vue"),
    },
    
    {
      path:"/customer",
      name:"customer",
      component:()=>import("../views/admin/customer/CustomerView.vue"),
    },
    {
      path:"/percentprofit",
      name:"percentprofit",
      component:()=>import("../views/admin/percentprofit/PercentProfitView.vue"),
    },
    {
      path:"/product/requestproduct",
      name:"requestproduct",
      component:()=>import("../views/admin/requestproduct/requestproduct.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/Register.vue"),
    },
    {
      path: "/register/:id",
      name: "registerreferral",
      component: () => import("../views/Register.vue"),
    },
    {
      path:"/information",
      name:"information",
      component:()=>import("../views/admin/information/InformationView.vue"),
    },
    {
      path:"/order/all",
      name:"orderall",
      component:()=>import("../views/admin/order/orderallview.vue"),
    },
    {
      path:"/order/getproduct",
      name:"getproduct",
      component:()=>import("../views/admin/order/maruey/sentorder.vue"),
    },
    {
      path:"/order/shareincome",
      name:"shareincome",
      component:()=>import("../views/admin/shareincome/shareincome.vue"),
    },
    {
      path:"/order/marueyall",
      name:"marueyall",
      component:()=>import("../views/admin/order/maruey/ordermaruey.vue"),
    },
    {
      path:"/order/partnerall/",
      name:"partnerall",
      component:()=>import("../views/admin/order/partner/orderpartner.vue"),
    },
    {
      path:"/report/reportsummarytoday",
      name:"reportsummarytoday",
      component:()=>import("../views/admin/report/reportsummarytoday.vue"),
    },
    {
      path:"/withdraw/withdrawmoney",
      name:"withdrawmoney",
      component:()=>import("../views/admin/withdraw/withdrawview.vue"),
    },
    {
      path:"/withdraw/withdrawmoneypartner",
      name:"withdrawmoneypartner",
      component:()=>import("../views/admin/withdraw/withdrawpartner.vue"),
    },
    {
      path:"/report/reportprofitandloss",
      name:"reportprofitandloss",
      component:()=>import("../views/admin/report/reportprofitandloss.vue"),
    },
    {
      path:"/report/reportreturnproduct",
      name:"reportreturnproduct",
      component:()=>import("../views/admin/report/reportreturnproduct.vue"),
    },
    {
      path:"/report/reportprice",
      name:"reportprice",
      component:()=>import("../views/admin/report/reportpriceadmin.vue"),
    }
    
    // {
    //   path: "/:pathMatch(.*)*",
    //   name: "error-page",
    //   component: () => import("../views/ErrorView.vue"),
    // },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { left: 0, top: 0 }; // ใช้ left และ top แทน x และ y สำหรับ Vue Router 4
  }
});

export default router;
