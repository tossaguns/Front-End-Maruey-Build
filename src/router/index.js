import {createWebHistory, createRouter} from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("../views/customer/indexcustomer.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    
    {
      path: "/:pathMatch(.*)*",
      name: "error-page",
      component: () => import("../views/ErrorView.vue"),
    },
    {
      path:"/searchproduct/:id",
      name:"searchproduct",
      component: () => import("../views/customer/searchproduct.vue"),
    },
    {
      path:"/singleproduct/:id",
      name:"singleproduct",
      component: () => import("../views/customer/singleproduct.vue"),
    },
    {
      path:"/singleproduct/:id/:sharelinkcode",
      name:"singleproductsharelink",
      component: () => import("../views/customer/singleproduct.vue"),
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
      path:"/indexregister",
      name:"indexregister",
      component:()=>import("../views/customer/indexregister.vue"),
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { left: 0, top: 0 }; // ใช้ left และ top แทน x และ y สำหรับ Vue Router 4
  }
});

export default router;
