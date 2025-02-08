<template>
    <div v-if="isLoading" class="overlay">
        <div class="loader"></div>
    </div>
    <div class="h-screen bg-[#f7f7f7] mt-20">
         <div class="h-full w-full py-3">
             <div class="lg:w-4/6  mx-2 md:mx-auto p-5 bg-[#fff] shadow border-t-2 border-[#22c55e]">
                    
                     <div class="w-full flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg"  width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    </div>
                    <div class="mt-3 font-bold text-xl text-center">สั่งซื้อออเดอร์สำเร็จ !</div>
                    <div class="mt-3 text-center text-lg">{{order?.orderref}} ได้การสั่งซื้อออเดอร์สำเร็จแล้ว  </div>
                    <div class="flex justify-center gap-3 mt-4">
                        <button @click="router.push('/customer/order')" class="bg-[#8B2FC9] hover:bg-[#b040fa] text-white px-3 py-2 rounded">ดูรายการสั่งซื้อ</button>
                        <button @click="router.push('/')" class="hover:bg-[#000] hover:text-[#fff] border border-[#000] text-[#000] px-3 py-2 rounded">กลับหน้าหลัก</button>
                        
                    </div>
             </div>
         </div>  
    </div>

</template>
<script setup>
import axios from "axios";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { ref, onMounted, computed,watchEffect } from "vue";
import { useStore } from "vuex";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { useRoute, useRouter } from "vue-router";

const store = useStore();
const toast = useToast();
const confirm = useConfirm();
const route = useRoute();
const router = useRouter();
const isLoading = ref(false);
const token = ref("Bearer "+localStorage.getItem("token")) 

const order_id = ref(route.params.id);
onMounted(async () => {
    document.title = "สั่งซิ้อออเดอร์สำเร็จ || Maruey";
    //isLoading.value = true;
    //await getData ();
    //isLoading.value = false;
});

const order = ref({})
/* const getData = async()=>{
    
    const config = {
        method: "get",
        url: `${process.env.VUE_APP_MARUEY}order/byid/${order_id.value}`,
        headers: {
                "token": "Bearer "+localStorage.getItem("token"),
        },
    };
    await axios(config).then(async(res) => {
        order.value = res?.data?.data;
       
    }).catch((err) => { //console.log(err);});
} */
</script>
<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

@import "@/assets/Loading.css";
</style>