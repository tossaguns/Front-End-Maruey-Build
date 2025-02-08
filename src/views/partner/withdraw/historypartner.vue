<template>
  <div v-if="isLoading" class="overlay">
    <div class="loader"></div>
  </div>
  <div class="flex w-full pt-5 justify-center px-2 sm:px-10">
    <div class="grow w-full">
      <div class="text-center py-5 bg-white rounded-t-xl drop-shadow-2xl bg-opacity-80">
        <div class="mt-10 font-semibold text-2xl text-[#8B2FC9]">
          ข้อมูลการภอนเงิน
        </div>
      </div>
      <div class="text-center py-5 bg-white drop-shadow-2xl bg-opacity-80 rounded-b-xl" style="min-height: 82vh">
      
        <DataTable
              :value="Filter"
              :paginator="true"
              :rows="5"
              :rowsPerPageOptions="[5, 10, 20, 50]"
              selectionMode="single"
              class="font mx-2 opacity-100"
              id="print"
              currentPageReportTemplate="แสดง {first} ถึง {last} ใน {totalRecords} รายการ"
              tableStyle="min-width: 50rem"
            >
              <template #empty>
                <p class="font-italic text-center text-2xl">
                  ไม่มีข้อมูลการถอนเงิน
                </p>
              </template>
              <template #header>
                <div class="flex justify-end">
                  <span class="relative">
                    <i
                      class="pi pi-search absolute inset-y-0 left-0 pl-3 flex items-center"
                    ></i>
                    <input
                      v-model="searchall"
                      placeholder="ค้นหา"
                      class="pl-10 border rounded p-1 py-2"
                    />
                  </span>
                </div>
              </template>
              <Column header="วันที่ถอน" >
                <template #body="item">
                  {{dayjs(item.data.created_at).format("DD/MM/YYYY HH:mm:ss")}}
                </template>
              </Column>
              <Column header="จำนวนเงิน" >
                <template #body="item">
                  {{
                    item.data.money.toLocaleString("en", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                    }}บาท
                </template>
                </Column>
    
              <Column header="สถานะ" >
                <template #body="item">
                 <Chip :class="{
                'bg-[#f97316]': item.data.status == false,
                'bg-[#119c8d]': item.data.status === true,
               
              }"  class="text-[#fff] py-1.5">
                {{item.data.status == true ? 'จ่ายเงินสำเร็จ' : 'รอดำเนินการ'}}
              </Chip>
                </template>
              </Column>
              <Column header="ดูรายละเอียด">
                <template #body="item">
                  <button
                    @click="opendialog(item.data)"
                    class="bg-[#8B2FC9] text-white p-2 rounded"
                  >
                    ดูรายละเอียด
                  </button>
                </template>
              </Column>
            </DataTable>
            
      </div>
    </div>
  </div>

<Dialog
    v-model:visible="dialog"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <template #header>
      <div class="flex justify-between items-center">
        <div class="text-lg font-semibold text-[#000]">ดูรายละเอียดถอนเงิน</div>
      </div>
    </template>
       <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
            <div>
                <label class="text-[#000] font-semibold">วันที่ถอน</label>
                <div class="text-[#000]">{{dayjs(dialogdata.date).format("DD/MM/YYYY HH:mm:ss")}}</div>
            </div>
            <div>
                <label class="text-[#000] font-semibold">จำนวนเงิน</label>
                <div class="text-[#000]">{{dialogdata.money.toLocaleString("en", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}} บาท</div>
            </div>
            <!--บัญชี-->
            <div>
                <label class="text-[#000] font-semibold">ชื่อบัญชี</label>
                <div class="text-[#000]">{{dialogdata.bank.accountname}}</div>
            </div>
            <div>
                <label class="text-[#000] font-semibold">เลขบัญชี</label>
                <div class="text-[#000]">{{dialogdata.bank.accountnumber}}</div>
            </div>
            <div>
                <label class="text-[#000] font-semibold">ธนาคาร</label>
                <div class="text-[#000]">{{dialogdata.bank.name}}</div>
            </div>
            <div>
                <label class="text-[#000] font-semibold">สาขา</label>
                <div class="text-[#000]">{{dialogdata.bank.branch}}</div>
            </div>
            
            <div>
            <label class="text-[#000] font-semibold ">สถานะ</label>
            <div class="text-[#000] mt-2">
              <Chip :class="{
                'bg-[#f97316] text-[#fff]': dialogdata.status == false,
                'bg-[#119c8d] text-[#fff]': dialogdata.status === true,
               
              }"  class="text-[#fff ] py-1.5">
                {{dialogdata.status == true ? 'จ่ายเงินสำเร็จ' : 'รอดำเนินการ'}}
                </Chip>
            </div>
            </div>
       </div>
    

    <div class="flex items-center justify-center w-full gap-3">
     
      <button
        @click="dialog = false"
        :disabled="isLoading"
        class="mt-9 font-semibold leading-none text-white py-4 px-5 md:px-10 bg-[#000] rounded-lg hover:bg-[#0f0121] focus:ring-2 focus:ring-offset-2 focus:ring-[#000] focus:outline-none"
      >
        ปิด
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
const from = ref({});
const getdata = async () => {
 
  await getwithdrawhistory();
};



const getwithdrawhistory = async()=>{
    const config = {
        method: "get",
        url: `${process.env.VUE_APP_MARUEY}withdrawmoney/bypartner/${store.getters._id}`,
        headers: {
        token: "Bearer " + localStorage.getItem("token"),
        },
    };
    await axios(config)
    .then(async (res) => {
            data.value = res.data?.data;
            if(data.value.length>0)
            {
              data.value.reverse();
            }
    })
    .catch((err) => {
        console.log(err);
    });
    
}

const dialog = ref(false);



const optionposition = ref([
    { name: "admin" },  
]);

onMounted(async () => {
    document.title = "ข้อมูลการถอนเงิน || Maruey";
    isLoading.value = true;
    await getdata();
    isLoading.value = false;
});

const searchall = ref(""); 
const Filter = computed(() => {
    if (searchall.value != "") {
        return data.value.filter((item) => {
          return item.category_name.toLowerCase().includes(searchall.value.toLowerCase());
        })
    }
    return data.value;
});


const headform = ref("");
const dialogdata = ref({});
const opendialog = (item) => {
    dialog.value = true;
    dialogdata.value = {...item};
 
};

const adddata = async () => {
    //เช็คก่อนกรอกค่าครบไหม
    if (from.value.category_name === "") {
        toast.add({
            severity: "error",
            summary: "กรุณากรอกข้อมูลให้ครบ",
            detail:"กรุณากรอกข้อมูลให้ครบ",
            life: 3000,
        });
        return;
    }

    const result = await Swal.fire({
        text: "คุณต้องการเพิ่มข้อมูลหมวดหมู่สินค้าใช่หรือไม่?",
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
            url: `${process.env.VUE_APP_MARUEY}category/`,
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
    if (from.value.category_name === "") {
        toast.add({
            severity: "error",
            summary: "กรุณากรอกข้อมูลให้ครบ",
            detail:"กรุณากรอกข้อมูลให้ครบ",
            life: 3000,
        });
        return;
    }

    const result = await Swal.fire({
        text: "คุณต้องการแก้ไขข้อมูลหมวดหมู่สินค้าหรือไม่?",
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
            url: `${process.env.VUE_APP_MARUEY}category/${from.value._id}`,
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
        text: "คุณต้องการลบข้อมูลหมวดหมู่สินค้าใช่หรือไม่?",
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
            url: `${process.env.VUE_APP_MARUEY}category/${id}`,
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