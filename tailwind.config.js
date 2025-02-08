// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [

    './src/views/**/*.vue', // เลือกทุกไฟล์ .vue ในโฟลเดอร์ views และโฟลเดอร์ย่อยทั้งหมด
    './src/components/**/*.vue', // เลือกทุกไฟล์ .vue ในโฟลเดอร์ components และโฟลเดอร์ย่อยทั้งหมด
    // './src/views/HomeView.vue',
    // './src/views/LoginView.vue',
    // './src/views/RegisterAgent.vue',
    // './src/views/User/AgentHome.vue',
    // './src/views/User/AgenNew.vue',
    // './src/views/User/Contract/contract1.vue',

    // './src/views/product/AddProduct.vue',
    // './src/views/product/ProductView.vue',
    // './src/views/product/DetailPrice.vue',
    // './src/views/product/EditProduct.vue',
    // './src/views/User/Order/AddOrder.vue',
    // './src/views/User/Order/OrderUser.vue',
    // './src/views/Order/OrderView.vue',
    // './src/views/User/Order/Overdueorder.vue',

    // './src/views/Branch/branchAll.vue',
    // './src/views/StockProduct/StockAll.vue',
    // './src/views/Branch/Stock/StockAll.vue',
    // './src/views/Order/ReceiptOrder.vue',

    // './src/views/Branch/AddBranch.vue',
    // './src/views/agent/RowAgent.vue',
    // './src/views/agent/DetailAgent.vue',
    // './src/views/agent/AgentView.vue',

    // './src/views/product/AddPrice.vue',
    // './src/components/template/NavbarAgent.vue',
    // './src/components/template/NavbarAdmin.vue',


  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
