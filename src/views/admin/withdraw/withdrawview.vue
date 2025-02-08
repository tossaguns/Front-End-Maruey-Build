<template>
  <div v-if="isLoading" class="overlay">
    <div class="loader"></div>
  </div>
  <div class="flex w-full pt-5 justify-center px-2 sm:px-10">
    <div class="grow w-full">
      <div class="text-center py-5 bg-white rounded-t-xl drop-shadow-2xl bg-opacity-80">
        <div class="mt-10 font-semibold text-2xl text-[#8B2FC9]">
          ข้อมูลการถอนเงิน
        </div>
      </div>
      <div class="text-center py-5 bg-white drop-shadow-2xl bg-opacity-80 rounded-b-xl" style="min-height: 82vh">
        
        <DataTable
              v-model:selection="select"
              :value="Filter"
              :paginator="true"
              :rows="5"
              :rowsPerPageOptions="[5, 10, 20, 50]"
              selectionMode="multiple"
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

                <div class=" flex flex-col md:flex-row md:justify-between">
                  <div class="p-buttonset  p-2 text-center md:text-left">  
                    <Button label="ยังไม่ได้อนุมัติ" class="text-white p-2" :class="status==false? 'bg-[#000] hover:bg-[#374151]':'bg-[#8B2FC9] hover:bg-[#E178C5]'"   @click="changeStatus(false)" />
                    <Button label="ทั้งหมด" class=" text-white p-2" :class="status==true? 'bg-[#000] hover:bg-[#374151]':'bg-[#8B2FC9] hover:bg-[#E178C5]'" @click="changeStatus(true)"/>
                   
                  </div> 
                  <span class="relative">
                    <i
                      class="pi pi-search absolute inset-y-0  md:pb-3  pl-3 flex items-center "
                    ></i>
                    <input
                      v-model="searchall"
                      placeholder="ค้นหา"
                      class="pl-10 border rounded p-1 py-2 w-full md:w-auto"
                    />
                  </span>
                </div>
              </template>
              <Column  v-if="status == false" selectionMode="multiple" headerStyle="width: 3rem"></Column>
              <Column header="วันที่ถอน" >
                <template #body="item">
                  {{dayjs(item.data.date).format("DD/MM/YYYY HH:mm:ss")}}
                </template>
              </Column>

              <Column header="ชื่อ" >
                <template #body="item">
                  {{item.data.customer_id?.name}}
                </template>
              </Column>
              <Column header="จำนวนเงิน" >
                <template #body="item">
                  {{item.data.money.toLocaleString("en", { minimumFractionDigits: 2,maximumFractionDigits: 2,}) }} บาท
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
                  <button @click="opendialog(item.data)" class="bg-[#8B2FC9] text-white p-2 rounded">
                    ดูรายละเอียด
                  </button>
                </template>
              </Column>
            </DataTable>
            <div class="flex justify-center items-center mt-5" v-if="status == false && select.length >0">
                <button class="bg-[#8B2FC9] text-white py-2 px-4 rounded text-xl" @click="appovermany()" > อนุมัติถอนเงิน </button>
            </div>
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
                <div class="text-[#000]">{{dayjs(from.date).format("DD/MM/YYYY HH:mm:ss")}}</div>
            </div>
            <div>
                <label class="text-[#000] font-semibold">จำนวนเงิน</label>
                <div class="text-[#000]">{{from.money.toLocaleString("en", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}} บาท</div>
            </div>
            <!--บัญชี-->
            <div>
                <label class="text-[#000] font-semibold">ชื่อบัญชี</label>
                <div class="text-[#000]">{{from.bank.accountname}}</div>
            </div>
            <div>
                <label class="text-[#000] font-semibold">เลขบัญชี</label>
                <div class="text-[#000]">{{from.bank.accountnumber}}</div>
            </div>
            <div>
                <label class="text-[#000] font-semibold">ธนาคาร</label>
                <div class="text-[#000]">{{from.bank.name}}</div>
            </div>
            <div>
                <label class="text-[#000] font-semibold">สาขา</label>
                <div class="text-[#000]">{{from.bank.branch}}</div>
            </div>
            
            <div>
            <label class="text-[#000] font-semibold ">สถานะ</label>
            <div class="text-[#000] mt-2">
              <Chip :class="{
                'bg-[#f97316] text-[#fff]': from.status == false,
                'bg-[#119c8d] text-[#fff]': from.status === true,
               
              }"  class="text-[#fff ] py-1.5">
                {{from.status == true ? 'จ่ายเงินสำเร็จ' : 'รอดำเนินการ'}}
                </Chip>
            </div>
            </div>
       </div>
    

    <div class="flex items-center justify-center w-full gap-3">
      <button
        @click="appover"
        :disabled="isLoading"
        v-if="from.status == false"
        class="mt-9 font-semibold leading-none text-white py-4 px-5 md:px-10 bg-[#8B2FC9] rounded-lg hover:bg-[#6e1f8f] focus:ring-2 focus:ring-offset-2 focus:ring-[#8B2FC9] focus:outline-none">
          อนุมัติการจ่ายเงิน
      </button>
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
const getData = async () => {
    const config = {
      method: "get",
      headers: {
        "token": token.value,
      },
      url: `${process.env.VUE_APP_MARUEY}withdrawmoney/bystatusfalse`,
    };
    await axios(config).then((res) => {
            data.value = res.data?.data;
             if(data.value.length>0)
            {
              data.value.reverse();
            }
           
    }).catch((err) => { console.log(err);});
    
};

const getall = async () => {
    const config = {
      method: "get",
      headers: {
        "token": token.value,
      },
      url: `${process.env.VUE_APP_MARUEY}withdrawmoney`,
    };
    await axios(config).then((res) => {
            data.value = res.data?.data;
            if(data.value.length>0)
            {
              data.value.reverse();
            }
    }).catch((err) => { console.log(err);});
    
};

const status = ref(false);
const changeStatus = async (statusparam) => {
    isLoading.value = true;
    console.log(statusparam);
    if(statusparam == false){
     
        status.value = false;
        await getData();
    }else{
        status.value = true;
        await getall();
    }
    isLoading.value = false;
};

const dialog = ref(false);

const from = ref({
    category_name: "",
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
          return item.category_name.toLowerCase().includes(searchall.value.toLowerCase());
        })
    }
    return data.value;
});


const headform = ref("");
const opendialog = (item) => {
        from.value = { 
          ...item,
          admin_id: store.getters._id, 
        };
    dialog.value = true;
};

const appover = async () => {
    const result = await Swal.fire({
        text: "คุณต้องการอนุมัติการจ่ายเงินใช่หรือไม่?",
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
            url: `${process.env.VUE_APP_MARUEY}withdrawmoney/success/${from.value._id}`,
        };
        await axios(config).then(async(res) => {
            if (res.data?.status === true) {
                toast.add({
                    severity: "success",
                    summary: "อนุมัติการจ่ายเงิน",
                    detail: "อนุมัติการจ่ายเงินสำเร็จ",
                    life: 3000,
                });
                await getData();
                dialog.value = false;
            } else {
                toast.add({
                    severity: "error",
                    summary: "อนุมัติไม่สำเร็จ",
                    detail: "อนุมัติไม่สำเร็จ",
                    life: 3000,
                });
            }
        }).catch((err) => { 

            toast.add({
                    severity: "error",
                    summary: "อนุมัติไม่สำเร็จ",
                    detail: "อนุมัติไม่สำเร็จ",
                    life: 3000,
            });
          

          

        });
        isLoading.value = false;
    }
};


const appovermany = async () =>{
   if(select.value.length<=0){
        toast.add({
            severity: "error",
            summary: "กรุณาเลือกข้อมูล",
            detail: "กรุณาเลือกข้อมูล",
            life: 3000,
        });
        return;
    }
    const result = await Swal.fire({
        text: "คุณต้องการอนุมัติการจ่ายเงินใช่หรือไม่?",
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
            data: {id:select.value, admin_id: store.getters._id},
            url: `${process.env.VUE_APP_MARUEY}withdrawmoney/successmany/`,
        };
        await axios(config).then(async(res) => {
            if (res.data?.status === true) {
                toast.add({
                    severity: "success",
                    summary: "อนุมัติการจ่ายเงิน",
                    detail: "อนุมัติการจ่ายเงินสำเร็จ",
                    life: 3000,
                });
                await getData();
                dialog.value = false;
            } else {
                toast.add({
                    severity: "error",
                    summary: "อนุมัติไม่สำเร็จ",
                    detail: "อนุมัติไม่สำเร็จ",
                    life: 3000,
                });
            }
        }).catch((err) => { 

            toast.add({
                    severity: "error",
                    summary: "อนุมัติไม่สำเร็จ",
                    detail: "อนุมัติไม่สำเร็จ",
                    life: 3000,
            });
          

          

        });
        isLoading.value = false;
    }
};


const select = ref([]);



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