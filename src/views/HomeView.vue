<template>
    <div v-if="isLoading" class="overlay">
        <div class="loader"></div>
    </div>
    <div class="min-h-screen pt-14 sm:px-24 px-2 overflow-x-auto " height='100vh;'>
        
        <!-- Statistics Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
            <div
                class="bg-[#FFF]  shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-[#8B2FC9] text-white font-medium group">
                <div
                    class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B2FC9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>    
                </div>
                <div class="text-right">
                    <p class="text-xl text-[#8B2FC9]">{{dashboard?.totalday?.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}}</p>
                    <p class='text-[#8B2FC9]'>ยอดขายประจำวัน {{ new Date()?.toLocaleDateString('th-TH', { year: 'numeric', month: 'numeric', day: 'numeric' })}}</p>
                </div>
            </div>
              <div
                class="bg-[#FFF]  shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-[#8B2FC9] text-white font-medium group">
                <div
                    class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">

                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B2FC9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 3v5h5M16 13H8M16 17H8M10 9H8"/></svg>
                </div>
                <div class="text-right">
                    <p class="text-xl text-[#8B2FC9]">{{ dashboard?.totalorderday?.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}}</p>
                    <p class="text-[#8B2FC9]">ออเดอร์ประจำวัน {{ new Date()?.toLocaleDateString('th-TH', { year: 'numeric', month: 'numeric', day: 'numeric' })}}</p>
                </div>
            </div>
            <div class="bg-[#FFF]  shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-[#8B2FC9] text-white font-medium group">
                <div class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B2FC9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
                <div class="text-right">
                    <p class="text-xl text-[#8B2FC9]"> {{dashboard?.totalpartner}} </p>
                    <p class="text-[#8B2FC9]"> คู่ค้า (Partner)</p>
                </div>
            </div>
          
            <div
                class="bg-[#FFF]  shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-[#8B2FC9] text-white font-medium group">
                <div
                    class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">

                    <svg width="30" height="30" viewBox="0 0 24 24"
                        class="stroke-current text-[#8B2FC9]  transform transition-transform duration-500 ease-in-out"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill="currentColor"
                            d="M22 3H2v6h1v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9h1zM4 5h16v2H4zm15 15H5V9h14zM9 11h6a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2" />
                    </svg>
                </div>
                <div class="text-right">
                    <p class="text-2xl text-[#8B2FC9]">{{dashboard?.totalcustomer}}</p>
                    <p class="text-[#8B2FC9]">ลูกค้า (Customer)</p>
                </div>
            </div>

        </div>
        <!-- ./Statistics Cards -->

        <div class="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">
            <!-- Recent Activities -->
            <div class="relative flex flex-col min-w-0 break-words bg-[#8B2FC9]  w-full shadow-lg rounded">


                <img class="w-32 h-32 mx-auto rounded-full -mt-4 " src="../assets/man.png" alt="">
                <div class="w-full text-center mt-4">
                    <div class="flex justify-center lg:pt-4 pt-8 pb-0">

                        <div class="p-3 text-center">
                            <span class="text-xl font-bold block uppercase tracking-wide text-white"> ADMIN </span>
                            <span class="text-sm text-white">level: {{userData.position}}</span>
                        </div>


                    </div>
                </div>
                <div class="text-center mt-2">
                    <h3 class="text-2xl text-white font-bold leading-normal mb-1">
                        

                    </h3>
                    <div class="text-base mt-0 mb-2 text-white font-bold uppercase">
                        <i class="fas fa-map-marker-alt mr-2 text-white opacity-75"></i>ชื่อ : {{userData?.name}}
                    </div>
                </div>
                <div class="mt-6 py-6 border-t border-slate-200 text-center">
                        <button @click="edituser(userData)" class="bg-white text-[#8B2FC9] font-bold py-2 px-10 rounded hover:bg-[#DC97FF] hover:text-white">แก้ไขข้อมูลส่วนตัว</button>
                </div>

            </div>


            <!-- Social Traffic -->
            <div class=" flex flex-col items-center justify-center min-w-0 mb-4 lg:mb-0 break-words bg-gray-50 w-full shadow-lg rounded">
               
            </div>

        </div>

        <div class="grid bg-white mx-4 rounded drop-shadow-md py-5">
            <div class="px-4">
                <h1 class="text-2xl font-bold text-[#8B2FC9] text-center py-2">ยอดขายย้อนหลัง</h1>
                 <ChartPriceAdmin  :data ="dashboard?.totalmonth" v-if="dashboard?.totalmonth?.length > 0"/>
            </div>
              
        </div>




    </div>
</template>




<script setup>
import axios from "axios";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { ref, onMounted, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { useRoute, useRouter } from "vue-router";

import ChartPriceAdmin from "@/components/template/Chart/admin/ChartPriceAdmin.vue";

const store = useStore();
const toast = useToast();
const confirm = useConfirm();
const route = useRoute();
const router = useRouter();
const isLoading = ref(false);
const token = ref("Bearer " + localStorage.getItem("token"));

const me = ref({});

const dialogcontract = ref(false);
const dialogpdpa = ref(false);
const checkboxcontract = ref(false);
const statuspdpa = ref(false);
const userData = ref({});

onMounted(async () => {
  document.title = "หน้าแรก admin || Maruey";
  isLoading.value = true;
  await getData();
  await getDashboardadmin();
  isLoading.value = false;
});

const getData = async () => {
  const config = {
    method: "get",
    headers: {
      token: token.value,
    },
    url: `${process.env.VUE_APP_MARUEY}admin/byid/${store.getters._id}`,
  };
  await axios(config)
    .then(async(res) => {
      userData.value = res.data?.data;

    })
    .catch((err) => {
      //console.log(err);
    });


};

const dashboard = ref({
  totalday: 0,
  totalorderday: 0,
  totalpartner: 0,
  totalcustomer: 0,
    totalmonth: [],
});
const getDashboardadmin = async ()=>{
  const config = {
    method: "get",
    headers: {
      token: token.value,
    },
    url: `${process.env.VUE_APP_MARUEY}report/dashboardadmin/`,
  };
  await axios(config)
    .then((res) => {
        dashboard.value.totalday = res.data?.totalday;
        dashboard.value.totalorderday = res.data?.totalorderday;
        dashboard.value.totalpartner = res.data?.totalpartner;
        dashboard.value.totalcustomer = res.data?.totalcustomer;
        dashboard.value.totalmonth = res.data?.totalmonth;
    })
    .catch((err) => {
      //console.log(err);
    });

}

const getImage = (item) => {
      return `https://drive.google.com/thumbnail?id=${item}&sz=w1000`;
};

const edituser = (item) => {
  router.push('/profile/');
};
</script>

<style scoped>
@import "@/assets/Loading.css";
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>