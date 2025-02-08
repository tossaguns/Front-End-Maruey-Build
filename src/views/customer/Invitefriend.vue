<template>
    <div v-if="isLoading" class="overlay">
        <div class="loader"></div>
    </div>
    <div class="h-full min:h-screen flex flex-col  mb-20">
        <img src="@/assets/images/logo.jpg" class="w-100 text-center">
        <div class="text-center hidden text-lg">ชวนเพื่อนมารวย</div>
        <div class="text-center text-lg mt-10">รหัสแนะนำของคุณ</div>
        <input type="text" class="w-100 text-center text-lg border border-b-2 border-[#7f2cca] rounded-md py-2 px-2 mx-8 mt-3" v-model="from.id" readonly>
        <button class="bg-[#7f2cca] text-white py-2 px-2 rounded-md mx-8 mt-3" @click="copycode">คัดลอกรหัส</button>
        
        <div class="flex justify-center items-center mx-8 my-2">
            <span class="w-full border border-[#000] "></span>
            <span class="px-4 text-[#000]">หรือ</span>
            <span class="w-full border border-[#000]"></span>
        </div>
        <button class="bg-[#ec4899] text-white py-2 px-2 rounded-md mx-8 " @click="copylink">แชร์ให้เพื่อน</button>
        <div class="flex justify-center items-center mx-8 my-3">
            <span class="w-20 border border-[#000] "></span>
            <span class="w-full px-4 text-[#000]">กรณีที่ลิงค์หลักใข้งานไม่ได้ชั่วคราว</span>
            <span class="w-20 border border-[#000]"></span>
        </div>
        
        <button class="bg-[#fff] border-2 border-[#000] text-purple-600 py-2 px-2 rounded-md mx-8 " @click="copylink">แชร์ผ่านลิงค์ที่สำรอง</button>
        <button @click="router.push('/customer/customerview')" class="bg-red-600 hover:bg-red-700 text-white  p-2 rounded mx-8 my-4">กลับหน้าหลัก</button>
        
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


onMounted(async () => {
    document.title = "เชิญชวนเพื่อน || Maruey";
    isLoading.value = true;
    getcustomer();
    
    isLoading.value = false;
});

const from = ref({});

const getcustomer = async () => {
   /*  const config = {
        method: "get",
        url: `${process.env.VUE_APP_MARUEY}customer/byid/${store.getters._id}`,
        headers: {
                "token": "Bearer "+localStorage.getItem("token"),
        },
    };
    await axios(config).then(async(res) => {
        from.value.referralcode = res.data.data.referralcode;
        from.value.linkregistercode = `${process.env.VUE_APP_LINKSHARE}register/`+res.data.data.referralcode;
    }).catch((err) => { //console.log(err);}); */
    from.value = store.getters.me
};




const copycode = () => {
    const tempElement = document.createElement('textarea');
    tempElement.value = from.value.id;
    document.body.appendChild(tempElement);
    tempElement.select();
    document.execCommand('copy');
    document.body.removeChild(tempElement);
    Swal.fire({
        text: "คัดลอกโค้ดสำเร็จ",
        icon: "success",
        iconColor: "#8B2FC9",
        confirmButtonColor: "#8B2FC9",
    });
}

const copylink = () => {
    const tempElement = document.createElement('textarea');
    tempElement.value = `${process.env.VUE_APP_LINKSHARE}register/`+from.value.id;
    document.body.appendChild(tempElement);
    tempElement.select();
    document.execCommand('copy');
    document.body.removeChild(tempElement);
    // navigator.clipboard.writeText(from.value.linkregistercode);
    Swal.fire({
                text: "คัดลอกลิงค์สำเร็จ",
                icon: "success",
                iconColor: "#8B2FC9",
                confirmButtonColor: "#8B2FC9",
    });
}


</script>

<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

@import "@/assets/Loading.css";
</style>