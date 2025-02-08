import { createWebHistory, createRouter } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("../views/customer/indexcustomer.vue"),
    },
    {
      path: "/shops",
      name: "shops",
      component: () => import("../views/customer/Shops.vue"),
    },
    {
      path: "/download",
      name: "download",
      component: () => import("../views/DownloadAppView.vue"),
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
      path: "/:pathMatch(.*)*",
      name: "error-page",
      component: () => import("../views/ErrorView.vue"),
    },
    {
      path: "/searchproduct/:id",
      name: "searchproduct",
      component: () => import("../views/customer/searchproduct.vue"),
    },
    {
      path: "/singleproduct/:id",
      name: "singleproduct",
      component: () => import("../views/customer/singleproduct.vue"),
    },
    {
      path: "/change-password",
      name: "change-password",
      component: () => import("../views/customer/changePassword.vue"),
    },
    {
      path: "/profile/",
      name: "profile",
      component: () => import("../views/customer/editcustomer.vue"),
    },
    {
      path: "/update-profile/",
      name: "update-profile",
      component: () => import("../views/customer/updateProfilePage.vue"),
    },
    {
      path: "/singleproduct/:id/:sharelinkcode",
      name: "singleproductsharelink",
      component: () => import("../views/customer/singleproduct.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/Register.vue"),
    },
    {
      path: "/register/:username",
      name: "registerreferral",
      component: () => import("../views/Register.vue"),
    },
    {
      path: "/checkout",
      name: "checkout",
      component: () => import("../views/customer/checkout.vue"),
    },
    {
      path: "/checkout-partner",
      name: "checkout-partner",
      component: () => import("../views/customer/checkoutPartner.vue"),
    },
    {
      path: "/order/successful/:id",
      name: "ordersuccessful",
      component: () => import("../views/customer/ordersuccessful.vue"),
    },
    {
      path: "/customer/order",
      name: "customerorder",
      component: () => import("../views/customer/orderview.vue"),
    },
    {
      path: "/customer/order/:order_id",
      name: "customerordersingle",
      component: () => import("../views/customer/ordersingle.vue"),
    },
    {
      path: "/customer/order-partner/:order_id",
      name: "order-partner-single",
      component: () => import("../views/customer/ordersinglePartner.vue"),
    },
    {
      path: "/customer/customerview",
      name: "customerview",
      component: () => import("../views/customer/customerview.vue"),
    },
    {
      path: "/customer/withdrawhistory",
      name: "withdrawhistory",
      component: () => import("../views/customer/withdrawhistory.vue"),
    },
    {
      path: "/customer/deposithistory",
      name: "deposithistory",
      component: () => import("../views/customer/deposithistory.vue"),
    },
    {
      path: "/customer/menucustomer",
      name: "menucustomer",
      component: () => import("../views/customer/menucustomer.vue"),
    },
    {
      path: "/customer/upgradeset",
      name: "upgradeset",
      component: () => import("../views/customer/upgradeset.vue"),
    },
    {
      path: "/customer/pvchain",
      name: "pvchain",
      component: () => import("../views/customer/PVChain.vue"),
    },
    {
      path: "/invitefriend",
      name: "invitefriend",
      component: () => import("../views/customer/InvitefriendView.vue"),
    },
    {
      path: "/customer/jangpvhistory",
      name: "jangpv-history",
      component: () => import("../views/customer/JangPvHistory.vue"),
    },
    {
      path: "/customer/ewallethistory",
      name: "ewallet-history",
      component: () => import("../views/customer/EwalletHistory.vue"),
    },
    {
      path: "/customer/register-downline",
      name: "register-downline",
      component: () => import("../views/customer/RegisterDownline.vue"),
    },
    {
      path: "/customer/register-downline/success",
      name: "register-downline-success",
      component: () => import("../views/customer/RegisterDownlineSuccess.vue"),
    },
    {
      path: "/indexregister",
      name: "indexregister",
      component: () => import("../views/customer/indexregister.vue"),
    },
    {
      path: "/partner/register",
      name: "partner-register",
      component: () => import("../views/partner/RegisterPartner.vue"),
    },
    {
      path: "/partner/register/success",
      name: "partner-register-success",
      component: () => import("../views/partner/RegisterSuccess.vue"),
    },
    {
      path: "/partner/setting",
      name: "partner-setting",
      component: () => import("../views/partner/RegisterPartner.vue"),
    },
    {
      path: "/partner/home",
      name: "partner-home",
      component: () => import("../views/partner/HomePartner.vue"),
    },
    {
      path: "/partner/product",
      name: "partner-product",
      component: () => import("../views/partner/product/ProductPartner.vue"),
    },
    {
      path: "/partner/order",
      name: "partner-order",
      component: () => import("../views/partner/order/orderview.vue"),
    },
    {
      path: "/partner/product/add",
      name: "partner-product-add",
      component: () => import("../views/partner/product/ProductAdd.vue"),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { left: 0, top: 0 }; // ใช้ left และ top แทน x และ y สำหรับ Vue Router 4
  },
});

export default router;
