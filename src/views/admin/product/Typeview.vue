<template>
  <div v-if="isLoading" class="overlay">
    <div class="loader"></div>
  </div>
  <div class="flex w-full pt-5 justify-center px-2 sm:px-10">
    <div class="grow w-full">
      <div class="text-center py-5 bg-white rounded-t-xl drop-shadow-2xl bg-opacity-80">
        <div class="mt-10 font-semibold text-2xl text-[#8B2FC9]">
          ข้อมูลหมวดหมู่สินค้าย่อย
        </div>
      </div>
      <div class="text-center py-5 bg-white drop-shadow-2xl bg-opacity-80 rounded-b-xl" style="min-height: 82vh">
        <div class="text-right mb-3 mx-3 ">
            <button  class="px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium hover:bg-[#E178C5] 
            border-[#DC97FF] bg-[#8B2FC9] text-white" @click="opendialog('add')">             
                เพิ่มข้อมูลหมวดหมู่สินค้าย่อย
            </button>

        </div>
        <DataTable
          :value="Filter"
          :paginator="true"
          :rows="5"
          :rowsPerPageOptions="[5, 10, 20, 50]"
          responsiveLayout="stack"
          selectionMode="single"
          class="font mx-2 opacity-100"
          id="print"
          currentPageReportTemplate="แสดง {first} ถึง {last} ใน {totalRecords} รายการ"
        >
          <template #empty>
            <p class="font-italic text-center text-2xl">ไม่มีข้อมูลหมวดหมู่สินค้าย่อย</p>
          </template>
          <template #header>
            <div class="flex justify-end">
              <span class="relative">
                <i class="pi pi-search absolute inset-y-0 left-0 pl-3 flex items-center"></i>
                <input
                  v-model="searchall"
                  placeholder="ค้นหา"
                  class=" pl-10 border rounded p-1 py-2 " 
                />
              </span>
            </div>
          </template>
          <Column  header="อันดับ"  style="width:30%;">
            <template #body="item">
              <span>{{ item.index + 1 }}</span>
            </template>
          </Column>
          <Column header="ชื่อหมวดหมู่สินค้าย่อย" field="type_name" />
          <Column header="ตัวเลือก">
            <template #body="item">
              <Button
                icon="pi pi-file-edit"
                class="bg-[#f97316]  hover:bg-[#d46213] py-2 text-[#fff]"
                @click="opendialog('edit', item)"
              />
              <Button
                icon="pi pi-trash"
                class="bg-[#ff3d32] hover:bg-[#d9342b] py-2 text-[#fff] mx-2"

                @click="deletedata(item.data._id)"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>

  <Dialog v-model:visible="dialog" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"  >
    <template #header>
      <div class="flex justify-between items-center">
        <div class="text-lg font-semibold">{{headform}}</div>
      </div>
    </template>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
      <div class="col-span-full">
        <label class="block text-sm font-medium text-gray-700">ชื่อหมวดหมู่สินค้าย่อย :</label>
        <input
          v-model="from.type_name"
          type="text"
          class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
          placeholder="กรุณากรอกชื่อหมวดหมู่สินค้าย่อย"
        />
      </div>
    </div>
    <div class="flex items-center justify-center w-full">
      <button @click="headform == 'เพิ่มข้อมูลหมวดหมู่สินค้าย่อย' ? adddata() : editdata()"  :disabled="isLoading"   class="mt-9 font-semibold leading-none text-white py-4 px-10 bg-[#8B2FC9] rounded-lg hover:bg-[#E178C5] focus:ring-2 focus:ring-offset-2 focus:ring-[#8B2FC9] focus:outline-none mx-5">
        บันทึก
      </button>
      <button @click="dialog = false" :disabled="isLoading"  class="mt-9 font-semibold leading-none text-white py-4 px-10 bg-[#ff3d32] rounded-lg hover:bg-[#ff6259] focus:ring-2 focus:ring-offset-2 focus:ring-[#8B2FC9] focus:outline-none">
        ยกเลิก
      </button>
    </div>
   
  </Dialog>
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


const data = ref([]);
const getData = async () => {
    const config = {
      method: "get",
      headers: {
        "token": token.value,
      },
      url: `${process.env.VUE_APP_MARUEY}type/`,
    };
    await axios(config).then((res) => {
            data.value = res.data?.data;
    }).catch((err) => { console.log(err);});
    
};

const dialog = ref(false);

const from = ref({
    type_name: "",
});

const optionposition = ref([
    { name: "admin" },  
]);

onMounted(async () => {
    document.title = "ข้อมูล Admin || Maruey";
    isLoading.value = true;
    await getData();
    isLoading.value = false;
});

const searchall = ref(""); 
const Filter = computed(() => {
    if (searchall.value != "") {
        return data.value.filter((item) => {
            return (
                item.type_name.toLowerCase().includes(searchall.value.toLowerCase()) 
            );
        });
    }
    return data.value;
});


const headform = ref("");
const opendialog = (type, item) => {
    if (type === "edit") {
        from.value = { ...item.data };
        headform.value = "แก้ไขข้อมูลหมวดหมู่สินค้าย่อย";
    } else {
        from.value = {
            type_name: "",
        };
        headform.value = "เพิ่มข้อมูลหมวดหมู่สินค้าย่อย";
    }
    dialog.value = true;
};

const adddata = async () => {
    //เช็คก่อนกรอกค่าครบไหม
    if (from.value.type_name === "") {
        toast.add({
            severity: "error",
            summary: "กรุณากรอกข้อมูลให้ครบ",
            detail:"กรุณากรอกข้อมูลให้ครบ",
            life: 3000,
        });
        return;
    }

    const result = await Swal.fire({
        text: "คุณต้องการเพิ่มข้อมูลหมวดหมู่สินค้าย่อยใช่หรือไม่?",
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
            method: "post",
            headers: {
                "token": token.value,
            },
            data: from.value,
            url: `${process.env.VUE_APP_MARUEY}type/`,
        };
        await axios(config).then(async(res) => {
            if (res.data?.status === true) {
                toast.add({
                    severity: "success",
                    summary: "เพิ่มข้อมูลสำเร็จ",
                    detail: "เพิ่มข้อมูลสำเร็จ",
                    life: 3000,
                });
                await getData();
                dialog.value = false;
            } else {
                toast.add({
                    severity: "error",
                    summary: "เพิ่มข้อมูลไม่สำเร็จ",
                    detail: "เพิ่มข้อมูลไม่สำเร็จ",
                    life: 3000,
                });
            }
        }).catch((err) => { 

          if(err.response.status == 409){
              toast.add({
                    severity: "error",
                    summary: "ข้อมูลซ้ำกัน",
                    detail: err.response.data.message,
                    life: 3000,
            });
          }else{
            toast.add({
                    severity: "error",
                    summary: "เพิ่มข้อมูลไม่สำเร็จ",
                    detail: "เพิ่มข้อมูลไม่สำเร็จ",
                    life: 3000,
            });
          }

          

        });
        isLoading.value = false;
    }
};

const editdata = async () => {
    //เช็คก่อนกรอกค่าครบไหม
    if (from.value.type_name === "") {
        toast.add({
            severity: "error",
            summary: "กรุณากรอกข้อมูลให้ครบ",
            detail:"กรุณากรอกข้อมูลให้ครบ",
            life: 3000,
        });
        return;
    }

    const result = await Swal.fire({
        text: "คุณต้องการแก้ไขข้อมูลหมวดหมู่สินค้าย่อยหรือไม่?",
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
            url: `${process.env.VUE_APP_MARUEY}type/${from.value._id}`,
        };
        await axios(config).then((res) => {
            if (res.data?.status === true) {
                toast.add({
                    severity: "success",
                    summary: "แก้ไขข้อมูลสำเร็จ",
                    detail: "แก้ไขข้อมูลสำเร็จ",
                    life: 3000,
                });
                dialog.value = false;
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
          if(err.response.status == 409){
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

const deletedata = async (id)=>{
    const result = await Swal.fire({
        text: "คุณต้องการลบข้อมูลหมวดหมู่สินค้าย่อยใช่หรือไม่?",
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
            method: "delete",
            headers: {
                "token": token.value,
            },
            url: `${process.env.VUE_APP_MARUEY}type/${id}`,
        };
        await axios(config).then(async(res) => {
            if (res.data?.status === true) {
                toast.add({
                    severity: "success",
                    summary: "ลบข้อมูลสำเร็จ",
                    detail: "ลบข้อมูลสำเร็จ",
                    life: 3000,
                });
                await getData();
                dialog.value = false;
            } else {
                toast.add({
                    severity: "error",
                    summary: "ลบข้อมูลไม่สำเร็จ",
                    detail: "ลบข้อมูลไม่สำเร็จ",
                    life: 3000,
                });
            }
        }).catch((err) => { 
            toast.add({
                    severity: "error",
                    summary: "ลบข้อมูลไม่สำเร็จ",
                    detail: "ลบข้อมูลไม่สำเร็จ",
                    life: 3000,
            });
        });
        isLoading.value = false;
    }
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