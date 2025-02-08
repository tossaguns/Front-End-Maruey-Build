import { createWebHistory, createRouter } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("../views/partner/HomePartner.vue"),
    },
    {
      path: "/home",
      name: "homepage",
      component: () => import("../views/partner/HomePartner.vue"),
    },
    //แก้ข้อมูลส่วนตัว 
    {
      path:"/profile/",
      name:"profile",
      component:()=>import("../views/partner/EditPartner.vue"),
    },
    {
      path:"/partner/product",
      name:"partnerproduct",
      component:()=>import("../views/partner/product/ProductPartner.vue"),
    },
    {
      path:"/partner/requestproduct/",
      name:"requestproduct",
      component:()=>import("../views/partner/requestproduct/requestproduct.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
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
      path:"/order/sendorder",
      name:"sendorder",
      component:()=>import("../views/partner/order/sendorderpartner.vue"),

    },
    {
      path:"/order/all",
      name:"orderdetail",
      component:()=>import("../views/partner/order/orderview.vue"),
    },
    {
      path:"/partner/historywithdraw",
      name:"historywithdraw",
      component:()=>import("../views/partner/withdraw/historypartner.vue"),
    },
    {
      path:"/partner/reportreturnproduct",
      name:"reportreturnproduct",
      component:()=>import("../views/partner/report/reportreturnproductpartner.vue"),
    },
    {
      path:"/partner/report/reportprice"
      ,name:"reportprice",
      component:()=>import("../views/partner/report/reportprice.vue"),
    }
   
  ],
  scrollBehavior(to, from, savedPosition) {
    return { left: 0, top: 0 }; // ใช้ left และ top แทน x และ y สำหรับ Vue Router 4
  }
});

export default router;
