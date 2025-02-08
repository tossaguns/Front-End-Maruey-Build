<template>
     <div v-if="isLoading" class="overlay">
        <div class="loader"></div>
    </div>
    <div class="h-full mb-5">
        <div class="w-full h-full p-8">
             <swiper :pagination="true" :modules="modules" class="mySwiper ">
                <swiper-slide class="flex flex-col justify-center items-center">
                   <img src="@/assets/images/logo.jpg" class="w-100 text-center">
                   <div class="text-2xl text-purple-950">ทุกการใช้จ่ายจะได้มากกว่าเดิม</div>
                   <div class="text-purple-700 px-7 py-4">เพียงซื้อสินค้าหรือบริการผ่าน MARUEY ก็รอรับคะแนนคืนทุกการใช้จ่ายได้เลย</div>
                </swiper-slide>
                <swiper-slide class="flex flex-col justify-center items-center">
                    <img src="@/assets/images/logo.jpg" class="w-100 text-center">
                    <div class="text-2xl text-purple-950">อัพแน่นด้วยแบรนด์ดัง</div>
                    <div class="text-purple-700 px-7 py-4">เลือกซื้อสินค้าหรือบริการจากแบรนด์ดัง และรับคะแนนคืนทุกการใช้จ่าย</div>
                </swiper-slide>
                <swiper-slide class="flex flex-col justify-center items-center">
                    <img src="@/assets/images/logo.jpg" class="w-100 text-center">
                    <div class="text-2xl text-purple-950">รับคะแนนคืนทุกการใช้จ่าย</div>
                    <div class="text-purple-700 px-7 py-4">เมื่อซื้อสินค้าหรือบริการผ่าน MARUEY รับคะแนนคืนทุกการใช้จ่าย</div>
                </swiper-slide>
            
            </swiper>
        </div>
        <div class="w-full  h-auto text-center justify-center items-center flex flex-col">
            <div class="p-buttonset  p-2 text-center md:text-left text-lg ">  
                <Button label="สร้างบัญชีใหม่" class=" py-2.5 px-6 bg-purple-300 text-purple-950"    @click="router.push('/register')" />
                <Button label="เข้าสู่ระบบ" class=" text-white py-2.5 px-6 bg-purple-800"  @click="router.push('/login')"/>
            </div> 
            <div class="text-center  text-pink-500 py-2" @click="router.push('/')">
                เข้าสู่หน้าหลัก
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

import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css/pagination';
import 'swiper/css';
import { Pagination } from 'swiper/modules';


const store = useStore();
const toast = useToast();
const confirm = useConfirm();
const route = useRoute();
const router = useRouter();
const isLoading = ref(false);


</script>

<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

@import "@/assets/Loading.css";


.swiper-slide {
 
 
 
  text-align: center;
}



</style>
