<template>
  <div v-if="isLoading" class="overlay">
    <div class="loader"></div>
  </div>
  <div class="h-full min-h-screen flex flex-col bg-[#f7f7f7] mb-20">
    <div class="flex">
      <div class="w-auto pl-4 py-3">
        <button
          class="text-sm text-gray-500 font-bold py-2 px-2 rounded flex"
          @click="router.push('/customer/customerview')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6b7280"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          กลับ
        </button>
      </div>
    </div>
    <div class="flex flex-col rounded-md bg-[#fff] my-2 mx-4 shadow-md">
      <div class="py-1 border border-b hidden" @click="edituser()">
        <div class="flex gap-2 w-full pl-4 py-3">
          <i class="pi pi-user text-[#7f2cca]"></i>
          <span class="text-[#7f2cca]">แก้ไขรูปโปรไฟล์</span>
        </div>
        <div class="flex py-3 justify-center w-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#7f2cca"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </div>
      <div class="flex py-1 border border-b" @click="edituser()">
        <div class="flex gap-2 w-full pl-4 py-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#7f2cca"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polygon points="14 2 18 6 7 17 3 17 3 13 14 2"></polygon>
            <line x1="3" y1="22" x2="21" y2="22"></line>
          </svg>
          <span class="text-[#7f2cca]">แก้ไขข้อมูลส่วนตัว</span>
        </div>
        <div class="flex py-3 justify-center w-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#7f2cca"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </div>
      <div class="flex py-1 border border-b" @click="navigateUpdateProfile()">
        <div class="flex gap-2 w-full pl-4 py-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#7f2cca"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polygon points="14 2 18 6 7 17 3 17 3 13 14 2"></polygon>
            <line x1="3" y1="22" x2="21" y2="22"></line>
          </svg>
          <span class="text-[#7f2cca]">ตั้งค่าโปรไฟล์</span>
        </div>
        <div class="flex py-3 justify-center w-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#7f2cca"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </div>
      <div
        class="flex py-1 border border-b"
        @click="$router.push('/change-password')"
      >
        <div class="flex gap-2 w-full pl-4 py-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#7f2cca"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <span class="text-[#7f2cca]">เปลี่ยนรหัสผ่าน</span>
        </div>
        <div class="flex py-3 justify-center w-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#7f2cca"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
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

const store = useStore();
const toast = useToast();
const confirm = useConfirm();
const route = useRoute();
const router = useRouter();
const isLoading = ref(false);

const edituser = () => {
  router.push("/profile/");
};

const navigateUpdateProfile = () => {
  router.push("/update-profile/");
};

const logout = async () => {
  const result = await Swal.fire({
    text: "คุณต้องการที่จะออกจากระบบหรือไม่?",
    icon: "warning",
    iconColor: "#8B2FC9",
    showCancelButton: true,
    confirmButtonColor: "#8B2FC9",
    cancelButtonColor: "#E85D40",
    confirmButtonText: "ยืนยันออกจากระบบ",
    cancelButtonText: "ยกเลิก",
  });

  if (result.isConfirmed) {
    // ทำการลบ Token ออกจาก localStorage
    localStorage.clear();
    store.commit("setLoginDefault");

    // ทำการล็อกเอาท์ใน Store
    window.location.assign("/");
  }
};
</script>

<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

@import "@/assets/Loading.css";
</style>
