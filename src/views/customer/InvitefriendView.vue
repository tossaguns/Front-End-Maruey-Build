<template>
    <div class="w-full px-5 mt-5">
        <Button icon="pi pi-arrow-left" label="ย้อนกลับ" class="text-purple-500" @click="$router.go(-1)" />
    </div>
    <div class="flex flex-col items-center relative">
        <img src="../../assets/images/logo.jpg" alt="logo" class="">
        <p class="text-2xl absolute bottom-0 text-purple-600 font-semibold">ชวนเพื่อนมารวยด้วยกัน</p>
    </div>
    <div class="mt-5">
        <div class="flex flex-col items-center px-5">
            <label for="introduce_username">
                รหัสแนะนำของคุณ
            </label>
            <input disabled :value="introduce_username" type="text" id="introduce_username" class="border text-xl px-2 py-2 rounded text-center w-full" />
        </div>
        <div class="mt-5 px-5">
            <Button class="bg-purple-500 text-white w-full py-2 flex gap-3 justify-center" @click="copylink">
                <span>คัดลอกลิงค์</span>
                <i class="pi pi-copy"></i>
            </Button>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Swal from "sweetalert2";

const route = useRoute();
const introduce_username = route.query.username;

const copylink = () => {
  const tempElement = document.createElement("textarea");
  tempElement.value = `${process.env.VUE_APP_REGISTERLINK}/register/${introduce_username}`
  document.body.appendChild(tempElement);
  tempElement.select();
  document.execCommand("copy");
  document.body.removeChild(tempElement);
  //navigator.clipboard.writeText(`${process.env.VUE_APP_REGISTERLINK}/register/${introduce_username}`);
  Swal.fire({
    text: "คัดลอกลิงค์สำเร็จ",
    icon: "success",
    iconColor: "#8B2FC9",
    confirmButtonColor: "#8B2FC9",
  });
};
</script>