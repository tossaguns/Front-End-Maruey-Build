<template>
    <div class="flex flex-col pt-20 items-center h-screen bg-gradient-to-br from-[#8B2FC9] to-[#670380]">
        <i class="pi pi-check-circle text-[5rem] text-green-300"></i>
        <div class="text-2xl text-center my-5 font-bold text-green-300">
            <p>ยินดีด้วย</p>
            <p>คุณได้มอบโอกาสทางธุรกิจให้</p>
        </div>
        <div class="text-white">
            <p>คุณ {{ query.business_name }}</p>
            <p>ในตำแหน่ง {{ query.sizebusiness }}</p>
            <p>รหัสสมาชิก {{ query.user_name }}</p>
            <p v-if="seePassword">รหัสผ่าน {{ query.password }} 
                <span @click="seePassword = !seePassword" class="pi pi-eye ml-5 opacity-50"></span>
            </p>
            <p v-else>รหัสผ่าน ****
                <span @click="seePassword = !seePassword" class="pi pi-eye-slash ml-7 opacity-50"></span>
            </p>
        </div>
        <p class="text-yellow-200 text-sm mt-2">* รหัสผ่านสมาชิกคือเลข 4 ตัวท้ายของบัตรประชาชน</p>
        <div class="absolute bottom-14 right-0">
            <img src="/src/assets/images/congrad.png" alt="congrad" width="200" />
        </div>
        <div class="flex flex-col w-full max-w-[12rem] gap-3 mt-10 z-10">
            <button @click="shareContent" class="text-white border-white border px-3 py-3 rounded">แชร์ <i class="pi pi-share-alt ml-3"></i></button>
            <button @click="goHome" class="bg-white text-black px-3 py-3 rounded">กลับหน้าหลัก</button>
        </div>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const route = useRoute();
const query = route.query;

const seePassword = ref(false);

const goHome = () => {
    router.push('/');
}

const shareContent = () => {
    if (navigator.share) {
        navigator.share({
            title: 'ยินดีต้อนรับ ! สมาชิกรหัส : ' + query.username,
            text: 'รหัสผ่านของคุณคือเลข 4 ตัวท้ายของบัตรประชาชน',
            url: process.env.VUE_APP_WEBSITE+'/login?username='+query.user_name,
        })
        .then(() => {
            //console.log('Successfully shared');
        })
        .catch((error) => {
            console.error('Error sharing:', error);
        });
    } else {
        alert('Web Share API is not supported in your browser.');
    }
}
</script>