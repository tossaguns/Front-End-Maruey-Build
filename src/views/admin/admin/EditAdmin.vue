<template>
  <div v-if="isLoading" class="overlay">
    <div class="loader"></div>
  </div>
  <div class="flex w-full pt-5 justify-center px-2 sm:px-10">
    <div class="grow w-full">
      <div class="text-center py-5 bg-white rounded-t-xl drop-shadow-2xl bg-opacity-80">
        <div class="mt-10 font-semibold text-2xl text-[#8B2FC9]">
            แก้ไขข้อมูลส่วนตัว
        </div>
      </div>
      <div class="py-5 bg-white drop-shadow-2xl bg-opacity-80 rounded-b-xl" style="min-height: 82vh">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 mx-5">
      <div class="col-span-full">
        <label class="block text-sm font-medium text-gray-700">ชื่อผู้ใช้ :</label>
        <input
          v-model="from.username"
          type="text"
          class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
          placeholder="กรุณากรอกชื่อผู้ใช้"
        />
      </div>
      <div class="col-span-full">
        <label class="block text-sm font-medium text-gray-700">email :</label>
        <input
          v-model="from.email"
          type="text"
          class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
          placeholder="กรุณากรอกอีเมล์"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">รหัสผ่าน :</label>
        <input
          v-model="from.password"
          type="password"
          class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
          placeholder="กรุณากรอกรหัสผ่าน"
        />
      </div>
       <div>
        <label class="block text-sm font-medium text-gray-700">ยืนยันรหัสผ่าน :</label>
        <input
          v-model="from.confirmpassword"
          type="password"
          class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
          placeholder="กรุณากรอกรหัสผ่าน"
        />
      </div>
       <div>
        <label class="block text-sm font-medium text-gray-700">ชื่อ - นามสกุล :</label>
        <input
          v-model="from.name"
          type="text"
          class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
          placeholder="กรุณากรอกชื่อ - นามสกุล"
        />
      </div>
       <div>
        <label class="block text-sm font-medium text-gray-700">เบอร์โทรศัพท์ :</label>
        <input
          v-model="from.telephone"
          type="number"
          class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
          placeholder="กรุณากรอกเบอร์โทรศัพท์"
        />
      </div>
      <div class="col-span-full">
        <label class="block text-sm font-medium text-gray-700 mb-1">ตำแหน่ง :</label>
        <Dropdown
          v-model="from.position"
          :options="optionposition"
          optionLabel="name"
          optionValue="name"
          placeholder="กรุณาเลือกตำแหน่ง"
          class="w-full border focus:outline-none "
        />
      </div>

    </div>
    <div class="flex items-center justify-center w-full">
      <button @click="editdata()"  :disabled="isLoading"   class="mt-9 font-semibold leading-none text-white py-4 px-10 bg-[#8B2FC9] rounded-lg hover:bg-[#E178C5] focus:ring-2 focus:ring-offset-2 focus:ring-[#8B2FC9] focus:outline-none mx-5">
        บันทึก
      </button>
      <button @click="back" :disabled="isLoading"  class="mt-9 font-semibold leading-none text-white py-4 px-10 bg-[#ff3d32] rounded-lg hover:bg-[#ff6259] focus:ring-2 focus:ring-offset-2 focus:ring-[#8B2FC9] focus:outline-none">
        ยกเลิก
      </button>
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


const getData = async () => {
    const config = {
      method: "get",
      headers: {
        "token": token.value,
      },
      url: `${process.env.VUE_APP_MARUEY}admin/byid/${store.getters._id}`,
    };
    await axios(config).then((res) => {
           from.value = res.data.data;
           from.value.password = "";
          from.value.confirmpassword = "";
    }).catch((err) => { console.log(err);});
    
};

const from = ref({
    _id: "",
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    name: "",
    telephone: "",
    position: "",
});

const optionposition = ref([
    { name: "admin" },  
]);

onMounted(async () => {
    document.title = "แก้ไขข้อมูลส่วนตัว || Maruey";
    isLoading.value = true;
    await getData();
    isLoading.value = false;
});

const editdata = async () => {
    //เช็คก่อนกรอกค่าครบไหม
    if ( from.value.username  == ""||from.value.email === "" || from.value.name === "" || from.value.telephone === "" || from.value.position === "") {
        toast.add({
            severity: "error",
            summary: "กรุณากรอกข้อมูลให้ครบ",
            detail:"กรุณากรอกข้อมูลให้ครบ",
            life: 3000,
        });
        return;
    }
    if(from.value.password != from.value.confirmpassword){
        toast.add({
            severity: "error",
            summary: "รหัสผ่านไม่ตรงกัน",
            detail:"รหัสผ่านไม่ตรงกัน",
            life: 3000,
        });
        return;
    }

    const result = await Swal.fire({
        text: "คุณต้องการแก้ไขข้อมูล admin หรือไม่?",
        icon: "question",
        iconColor: "#8B2FC9",
        showCancelButton: true,
        confirmButtonColor: "#8B2FC9",
        cancelButtonColor: "#E85D40",
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
      });
    
    if(result.isConfirmed){
        isLoading.value = true;
        const config = {
            method: "put",
            headers: {
                "token": token.value,
            },
            data: from.value,
            url: `${process.env.VUE_APP_MARUEY}admin/${from.value._id}`,
        };
        await axios(config).then((res) => {
            if (res.data?.status === true) {
                toast.add({
                    severity: "success",
                    summary: "แก้ไขข้อมูลสำเร็จ",
                    detail: "แก้ไขข้อมูลสำเร็จ",
                    life: 3000,
                });
               
                getData();
            } else {
                toast.add({
                    severity: "error",
                    summary: "แก้ไขข้อมูลไม่สำเร็จ",
                    detail: "แก้ไขข้อมูลไม่สำเร็จ",
                    life: 3000,
                });
            }
        }).catch((err) => { 
          if(err?.response?.status == 409){
              toast.add({
                    severity: "error",
                    summary: "ข้อมูลซ้ำกัน",
                    detail: err.response.data.message,
                    life: 3000,
            });
          }else{
          
            toast.add({
                    severity: "error",
                    summary: "แก้ไขข้อมูลไม่สำเร็จ",
                    detail: "แก้ไขข้อมูลไม่สำเร็จ",
                    life: 3000,
            });
          }
        });
        isLoading.value = false;
    }
};

const back = () => {
    router.push('/home');
};





</script>

<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

@import "../../../assets/Loading.css";
</style>

<style>
div:where(.swal2-container) {
  z-index: 9000;
}

@media (max-width: 1199px) {
  .dialog-class {
    width: 75vw;
  }
}

@media (max-width: 575px) {
  .dialog-class {
    width: 90vw;
  }
}
</style>

<style>
  .p-inputtext {
   padding: 0.5rem;
  }
</style>