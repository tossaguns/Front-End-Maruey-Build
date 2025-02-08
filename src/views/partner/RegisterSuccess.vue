<template>
    <div class="w-full h-full min-h-screen bg-gradient-to-tr from-purple-500 to-purple-800 flex flex-col items-center gap-3 py-28">
        <i class="pi pi-verified text-green-400" style="font-size: 100px"></i>
        <h1 class="font-bold text-white text-center text-2xl">สมัครสมาชิกสําเร็จ</h1>
        <p class="text-center text-white">คุณได้สร้างร้าน <span class="underline">{{ SHOPNAME }}</span> แล้ว</p>
        <p class="text-center text-white">ระบบจะตรวจสอบข้อมูลของคุณประมาณ 1 ชั่วโมง</p>
        <div class="py-5"></div>
        <Button label="กลับไปหน้าหลัก" @click="router.push('/partner/home')" class="px-2 py-1 text-white" />
        <Button label="แก้ไขข้อมูลเพิ่มเติม" @click="router.push(`/partner/register?shop_id=${SHOPID}`)" class="px-2 py-1 bg-white text-purple-500" />
    </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const SHOPID = route.query.shop_id;
const SHOPNAME = route.query.shop_name;
</script>