<template>
    

  <div v-if="isLoading" class="overlay">
    <div class="loader"></div>
  </div>
  <div class="flex w-full pt-5 justify-center px-2 sm:px-10">
    <div class="grow w-full">
      <div class="text-center py-5 bg-white rounded-t-xl drop-shadow-2xl bg-opacity-80">
        <div class="mt-10 font-semibold text-lg  md:text-2xl text-[#8B2FC9]">
           ข้อมูลการแบ่งรายได้
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
            <p class="font-italic text-center text-2xl">ไม่มีข้อมูลแบ่งรายได้</p>
          </template>
          <template #header>
            <div class="flex md:justify-end ">
              <span class="relative">
                <i class="pi pi-search absolute inset-y-0 left-0 pl-3 flex items-center"></i>
                <input
                  v-model="searchall"
                  placeholder="ค้นหา"
                  class=" pl-10 border rounded p-1 py-2 w-36 md:w-full" 
                />
              </span>
            </div>
          </template>
          
          <Column header="หมายเลขสั่งซื้อ" field="order_id.orderref" />
            <Column header="ร้าน" >
                <template #body="item">
                <div>{{item.data.delivery_id?.partner_name}}</div>
                </template>
            </Column> 
          <Column header="วันที่สั่งซื้อ" >
            <template #body="item">
              <div>{{dayjs(item.data?.order_id?.createdAt).format("DD/MM/YYYY HH:mm")}}</div>
            </template>
          </Column>

          <Column header="ราคา" >
            <template #body="item">
              <div>฿ {{item.data?.alltotal?.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}}</div>
            </template>
          </Column>
          <Column header="ตัวเลือก">
            <template #body="item">
              <Button
                icon="pi pi-eye"
                label="ดูรายละเอียดการแบ่งรายได้"
                class="bg-[#8B2FC9]  hover:bg-[#5e2e7e] py-2.5 px-4 text-[#fff] w-full md:w-60"
                @click="opendialog(item)"
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
    <div class="flex flex-col md:flex-row p-2  md:py-5 md:pl-5 text-base  md:text-lg  text-[#8B2FC9] border border-[#8B2FC9] ">
            <div class="w-full flex pb-2 md:pb-0  " >ร้านค้า: {{from?.delivery_id?.partner_name}}</div>
            <div class="w-full flex pb-2 md:pb-0 ">จำนวน : ฿ {{from.alltotal?.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}}</div>
    </div>   
    <div class="flex flex-col  p-2  mt-3 md:py-5 md:pl-5 text-base  md:text-lg   border border-[#8B2FC9] ">
           <div class="w-full text-center py-3 px-2 text-[#8B2FC9] font-semibold text-xl"> ส่วนแบ่งทางการกำไร </div>
           <table class="items-center w-full border-collapse text-blueGray-700  overflow-x-auto ">
          <thead class="thead-light  ">
            <tr>
              <th class=" px-6 bg-[#8B2FC9] text-[#fff] align-middle border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0  whitespace-nowrap font-semibold text-left">
                ชื่อบริษัท
              </th>
              <th class="px-6 bg-[#8B2FC9] text-[#fff] align-middle border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0  whitespace-nowrap font-semibold text-left">
                รายได้
              </th>
              
            </tr>
          </thead>
          <tbody>
            <tr class="border-y border-gray-200  hover:bg-gray-200">
              <th class=" px-6 align-middle  text-sm whitespace-nowrap p-4 text-left">
                บริษัท มารวยด้วยกัน 
              </th>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 ">
                ฿ {{from.maruey?.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}}
              </td>
            </tr>
            <tr v-if="from.partner != null" class="border-y border-gray-200  hover:bg-gray-200">
                <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left">
                {{ from.partner?.partner_id?.company_name}}
              </th>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 ">
                  ฿ {{ from.partner?.money?.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
              </td>
            </tr>
            <tr v-if="from.customer != null" class="border-y border-gray-200  hover:bg-gray-200">
                <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left">
                  ส่วนแบ่งของลูกค้า
              </th>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 ">
                  ฿ {{ from.customer?.totalcustomer?.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
              </td>
            </tr>
            <tr v-if="from.other != null" class="border-y border-gray-200  hover:bg-gray-200">
                <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left">
                  ส่วนแบ่งที่ไม่มีใครรับ
              </th>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 ">
                  ฿ {{ from.other?.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
              </td>

            </tr>
          
          </tbody>
          </table>
    </div>

    <div class="flex flex-col  p-2  mt-3 md:py-5 md:pl-5 text-base  md:text-lg   border border-[#8B2FC9] ">
        <div class="w-full text-center pt-2 pb-5 px-2 text-[#8B2FC9] font-semibold text-xl"> ส่วนแบ่งของลูกค้า </div>
        <table class="items-center w-full border-collapse text-blueGray-700  overflow-x-auto ">
          <thead class="thead-light  ">
            <tr>
              <th class=" px-6 bg-[#8B2FC9] text-[#fff] align-middle border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0  whitespace-nowrap font-semibold text-left">
                ชื่อลูกค้า
              </th>
              <th class="px-6 bg-[#8B2FC9] text-[#fff] align-middle border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0  whitespace-nowrap font-semibold text-left">
                รายได้
              </th>
            </tr>
          </thead>
          <tbody>
              <tr  v-if="from?.customer?.shareproduct != null" class="border-y border-gray-200  hover:bg-gray-200">
                <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left">
                   {{ getCustomer(from?.customer?.shareproduct?.customer_id) }}
              </th>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 ">
                   ฿ {{ from?.customer?.shareproduct?.money?.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
              </td>
            </tr>
            <tr v-if="from?.customer?.level_one !=null" class="border-y border-gray-200  hover:bg-gray-200">
              <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left">
                {{ getCustomer(from?.customer?.level_one?.customer_id) }}
              </th>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 ">
                ฿ {{ from?.customer?.level_one.money?.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
              </td>
            </tr>
            <tr v-if="from?.customer?.level_two !=null" class="border-y border-gray-200  hover:bg-gray-200">
              <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left">
                {{ getCustomer(from?.customer?.level_two?.customer_id) }}
              </th>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 ">
                ฿ {{ from?.customer?.level_two.money?.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
              </td>
            </tr>
            <tr v-if="from?.customer?.level_three !=null" class="border-y border-gray-200  hover:bg-gray-200">
              <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left">
                {{ getCustomer(from?.customer?.level_three?.customer_id) }}
              </th>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 ">
                ฿ {{ from?.customer?.level_three.money?.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
              </td>
            </tr>
            <tr v-if="from?.customer?.level_four !=null" class="border-y border-gray-200  hover:bg-gray-200">
              <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left">
                {{ getCustomer(from?.customer?.level_four?.customer_id) }}
              </th>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 ">
                ฿ {{ from?.customer?.level_four.money?.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
              </td>
            </tr>
            <tr v-if="from?.customer?.level_five !=null" class="border-y border-gray-200  hover:bg-gray-200">
              <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left">
                {{ getCustomer(from?.customer?.level_five?.customer_id) }}
              </th>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 ">
                ฿ {{ from?.customer?.level_five.money?.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
              </td>
            </tr>
            <tr v-if="from?.customer?.level_six !=null" class="border-y border-gray-200  hover:bg-gray-200">
              <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left">
                {{ getCustomer(from?.customer?.level_six?.customer_id) }}
              </th>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 ">
                ฿ {{ from?.customer?.level_six.money?.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
              </td>
            </tr>
            <tr v-if="from?.customer?.level_seven !=null" class="border-y border-gray-200  hover:bg-gray-200">
              <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left">
                {{ getCustomer(from?.customer?.level_seven?.customer_id) }}
              </th>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 ">
                ฿ {{ from?.customer?.level_seven.money?.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
              </td>
            </tr>
            <tr v-if="from?.customer?.level_eight !=null" class="border-y border-gray-200  hover:bg-gray-200">
              <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left">
                {{ getCustomer(from?.customer?.level_eight?.customer_id) }}
              </th>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 ">
                ฿ {{ from?.customer?.level_eight.money?.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
              </td>
            </tr>
            <tr v-if="from?.customer?.level_nine !=null" class="border-y border-gray-200  hover:bg-gray-200">
              <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left">
                {{ getCustomer(from?.customer?.level_nine?.customer_id) }}
              </th>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 ">
                ฿ {{ from?.customer?.level_nine.money?.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
              </td>
            </tr>
            <tr v-if="from?.customer?.level_ten !=null" class="border-y border-gray-200  hover:bg-gray-200">
              <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left">
                {{ getCustomer(from?.customer?.level_ten?.customer_id) }}
              </th>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 ">
                ฿ {{ from?.customer?.level_ten.money?.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
              </td>
            </tr>
          </tbody>

        </table>
       
    
    </div>

    
    <div class="flex items-center justify-center w-full">
      
      <button @click="dialog = false" :disabled="isLoading"  class="mt-9 font-semibold leading-none text-white py-4 px-10 bg-[#000] rounded-lg hover:bg-[#1a1919] focus:ring-2 focus:ring-offset-2 focus:ring-[#8B2FC9] focus:outline-none">
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
      url: `${process.env.VUE_APP_MARUEY}shareincome/`,
    };
    await axios(config).then((res) => {
        data.value = res.data?.data;
        if(data.value.length > 0){
            data.value.reverse();
        }
    }).catch((err) => { console.log(err);});

    
    
};

const dialog = ref(false);

const from = ref({});
const customer = ref([]);
onMounted(async () => {
    document.title = "ข้อมูลการแบ่งรายได้ || Maruey";
    isLoading.value = true;
    await getData();
    const config = {
      method: "get",
      headers: {
        "token": token.value,
      },
      url: `${process.env.VUE_APP_MARUEY}customer/`,
    };
    await axios(config).then((res) => {
        customer.value = res.data?.data;
    }).catch((err) => { console.log(err);});
    isLoading.value = false;
});

const searchall = ref(""); 
const Filter = computed(() => {
    if (searchall.value != "") {
        return data.value.filter((item) => {
            //ค้นหาหมายเลขคำสั่งซื้อ ชื่อลูกค้า
            return item.orderref?.toLowerCase().includes(searchall.value.toLowerCase()) || item.customer_id?.name?.toLowerCase().includes(searchall.value.toLowerCase());
        })
    }
    return data.value;
});


const headform = ref("");
const opendialog = (item) => {
    from.value = { ...item.data };
    headform.value = "หมายเลขคำสั่งซื้อ #"+from.value.order_id.orderref;
    dialog.value = true;
};

const getImage = (item) => {
      return `https://drive.google.com/thumbnail?id=${item}&sz=w1000`;
};

const getCustomer = (id) => {
    const cus = customer.value.find((item) => item._id == id);
    return cus?.name;
};


</script>

<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

@import "@/assets/Loading.css";
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