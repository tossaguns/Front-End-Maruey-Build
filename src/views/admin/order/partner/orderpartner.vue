<template>
  <div v-if="isLoading" class="overlay">
    <div class="loader"></div>
  </div>
  <div class="flex w-full pt-5 justify-center px-2 sm:px-10">
    <div class="grow w-full">
      <div class="text-center py-5 bg-white rounded-t-xl drop-shadow-2xl bg-opacity-80">
        <div class="mt-10 font-semibold text-lg  md:text-2xl text-[#8B2FC9]">
          ออเดอร์ของคุณ
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
            <p class="font-italic text-center text-2xl">ไม่มีข้อมูลออเดอร์</p>
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
          <Column header="ชื่อพาร์ทเนอร์" >
            <template #body="item">
              <div>{{item.data.partner_name}}</div>
            </template>
          </Column>
          <Column header="วันที่สั่งซื้อ" >
            <template #body="item">
              <div>{{dayjs(item.data?.order_id?.createdAt).format("DD/MM/YYYY HH:mm")}}</div>
            </template>
          </Column>
          <Column header="ชื่อลูกค้า" >
            <template #body="item">
              <div v-if="item.data?.customer_id !=null">{{item.data.customer_id?.name}}</div>
              <div v-else>ไม่มีข้อมูลลูกค้า</div>
            </template>
          </Column>
          <Column header="สถานะ" >
            <template #body="item">
              <Chip :class="{
                'bg-[#f97316]': item.data.order_id?.status === 'กำลังดำเนินการออเดอร์',
                'bg-[#119c8d]': item.data.order_id?.status === 'ออเดอร์สำเร็จ',
                'bg-red-500': item.data.order_id?.status === 'ยกเลิกออเดอร์'
              }"  class="text-[#fff] py-1.5">
                {{item.data.order_id?.status}}
              </Chip>
            </template>
          </Column>
          <Column header="ราคา" >
            <template #body="item">
              <div>฿ {{item.data?.alltotal?.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}}</div>
            </template>
          </Column>
          <Column header="รายได้" >
            <template #body="item">
              <div v-if="item.data.shareincome_id != null"> ฿ {{item.data?.shareincome_id?.partner?.money?.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}}</div>
            </template>
          </Column>
    
          <Column header="ตัวเลือก">
            <template #body="item">
              <Button
                icon="pi pi-eye"
                label="ดูรายละเอียดออเดอร์"
                class="bg-[#8B2FC9]  hover:bg-[#5e2e7e] py-2.5 px-4 text-[#fff]"
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
    <div class="flex flex-col md:flex-row p-2  md:py-5 md:pl-5 text-base  md:text-lg  text-[#8B2FC9] border-t border-x border-[#8B2FC9] ">
            <div class="w-full flex pb-2 md:pb-0  " >ชื่อลูกค้า : {{from?.customer_id?.name}}</div>
            <div class="w-full flex pb-2 md:pb-0 ">ชำระเงินทาง :{{from?.order_id.payment}}</div>
            
    </div>   
    <div class="flex flex-col md:flex-row p-2  md:py-5 md:pl-5 text-base  md:text-lg  text-[#8B2FC9] border-b border-x border-[#8B2FC9] ">
            <div class="w-full flex pb-2 md:pb-0  " >ชื่อพาร์ทเนอร์ : {{from?.partner_name}}</div>
            <div class="w-full flex pb-2 md:pb-0 ">รายได้ : ฿{{from?.shareincome_id?.partner?.money?.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}}</div>
            
    </div> 

   
    <div class="w-full  md:mx-auto mt-5 pt-3 bg-[#fff] border border-[#8B2FC9] " >
        <div class=" text-xs md:text-lg  flex  items-center px-2 md:px-5 py-2 border-b border-gray-200">
            <div class="text-[#8B2FC9] flex-grow ">{{from.partner_name}} </div>    
              <div :class="{
                'text-[#f97316]': from.order_id?.status === 'กำลังดำเนินการออเดอร์',
                'text-[#119c8d]': from.order_id?.status === 'ออเดอร์สำเร็จ',
                'text-red-500': from.order_id?.status === 'ยกเลิกออเดอร์'
              }" v-if="from.order_id != null">
                {{from.order_id?.status}}
              </div>
            </div>
          
            
            <div class="mt-6 mb-5 pl-1 flex items-center ml-2 mr-5 md:mx-5"  v-for="product in from.product" :key="product.product_id">
              <div class="text-[#8B2FC9] flex    md:gap-4   md:w-6/12 ">
                <div class="  md:w-1.5/12  mr-1">
                  <img class="w-14 h-14 object-cover  "  v-if="product.product_image"  :src="getImage(product.product_image)">
                  <img class="w-14 h-14 object-cover" src="@/assets/images/noproduct.png"  v-else>

                </div>
                <div class="md:flex md:items-center  w-10/12 hidden  overflow-hidden  "> 
                    <div class="line-clamp-1">
                        {{product.product_name}}
                    </div>
                </div>
              </div> 
          
              <div class="text-sm w-2/12  hidden md:block">฿ {{product?.product_price?.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</div>
              <div class="text-sm w-2/12  hidden md:block ">x{{product?.product_qty}}</div>
              <div class="text-sm w-2/12  hidden md:block text-right ">฿ {{product?.product_totalprice?.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</div>
              <!--- mobile --->
              <div class="flex flex-col w-full  md:hidden">
                <div class="flex   w-full   overflow-hidden  text-xs"> 
                    <div class="line-clamp-1">
                        {{product?.product_name}}
                    </div>
                </div>
                <div class="text-sm w-full md:hidden text-right">x{{product?.product_qty}}</div>
                <div class="text-sm w-full md:hidden text-right ">฿ {{product?.product_totalprice?.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</div>

              </div>  
            
            </div>
            <div class="w-full flex items-center bg-[#fafdff] py-3 px-5  border-t border-gray-200  text-sm md:text-base">
                <div class="md:text-right md:flex-grow  w-8/12 ">รวมค่าสินค้า: </div>  
                <div class="text-right md:w-2/12 w-4/12">฿ {{from?.totalproduct?.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</div>
            </div>
            <div class="w-full flex items-center bg-[#fafdff] py-3 px-5  text-sm md:text-base ">
                <div class="md:text-right md:flex-grow  w-8/12 ">ค่าจัดส่ง: </div>  
                <div class="text-right md:w-2/12 w-4/12">฿ {{from?.delivery?.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</div>
            </div>
            <div class="w-full flex items-center bg-[#fafdff] p-5  border-t border-gray-200  text-base md:text-lg">
                <div class="md:text-right md:flex-grow  w-6/12 ">รวมการสั่งซื้อ: </div>  
                <div class="text-right md:w-2/12 w-6/12">฿ {{from?.alltotal?.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</div>
            </div>

                    <div class="w-full flex  items-center bg-[#fafdff] pt-5 px-5   border-t-2 border-[#8B2FC9]  text-sm md:text-lg">
                       <div class="flex flex-col md:flex-row  w-full ">
                            <div class="md:flex-grow   pb-2 md:pb-0">ที่อยู่ในการจัดส่ง</div>
                            <div class="text-sm  md:text-base"> เลขทริคกิ้ง : {{from?.tracking}} </div>
                       </div>
                    </div>
                    <div class="flex flex-col md:flex-row w-full py-5">
                        <div class="w-full  md:w-3/12 pl-5 pr-3 text-xs ">
                           <div>{{from?.address?.namedelivery}} </div>
                           <div>{{from?.address?.telephone}}</div>
                           <div>{{from?.address?.address +" "+from?.address?.tambon + " "+from?.address?.amphure+ " "+from?.address?.province+ " "+from?.address?.zipcode}}</div>
                        </div>
                        <div class="w-full md:w-9/12 md:border-l md:border-gray-200">
                            
                        </div>
                    </div>
    </div>


    
    <div class="flex items-center justify-center w-full gap-5">
      <button @click="sendorder(from._id)" v-if="from.status =='กำลังเตรียมจัดส่ง'"  :disabled="isLoading" class="mt-9 font-semibold leading-none text-white py-4 px-10 bg-[#8B2FC9] rounded-lg hover:bg-[#5e2e7e] focus:ring-2 focus:ring-offset-2 focus:ring-[#8B2FC9] focus:outline-none">
        ส่งของให้กับไรเดอร์
      </button>

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
      url: `${process.env.VUE_APP_MARUEY}delivery/bypartnerall/`,
    };
    await axios(config).then((res) => {
        data.value = res.data?.data;
        if(data.value?.length > 0){
            data.value.reverse();
        }
    }).catch((err) => { console.log(err);});
    
};

const dialog = ref(false);

const from = ref({
  orderref:"",
  customer_id:"",
  address:{
    name:"",
    namedelivery:"",
    telephone:"",
    address:"",
    district:"",
    province:"",
    postcode:"",
  },
  suborder:[],
  total:0,
  totaldelivery:0,
  totaldiscount:0,
  totalmarueycoin:0,
  alltotal:0,
  payment:"",
  payment_id:"",
});

onMounted(async () => {
    document.title = "ข้อมูล Order || Maruey";
    isLoading.value = true;
    await getData();
    isLoading.value = false;
});

const searchall = ref(""); 
const Filter = computed(() => {
    if (searchall.value != "") {
        return data.value.filter((item) => {
            //ค้นหาหมายเลขคำสั่งซื้อ ชื่อลูกค้า
            return (
                item.order_id?.orderref?.toLowerCase().includes(searchall.value.toLowerCase()) ||
                item.customer_id?.name?.toLowerCase().includes(searchall.value.toLowerCase())
            );
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

const sendorder = async(id)=>{
    const result = await Swal.fire({
        text: "คุณได้ส่งของในออเดอร์ให้ไรเดอร์เรียบร้อยแล้วใช่หรือไม่ ?",
        icon: "question",
        iconColor: "#8B2FC9",
        showCancelButton: true,
        confirmButtonColor: "#8B2FC9",
        cancelButtonColor: "#E85D40",
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
      });

      if (result.isConfirmed) {
        isLoading.value = true;
        const config = {
          method: "put",
          headers: {
            "token": token.value,
          },
          url: `${process.env.VUE_APP_MARUEY}delivery/sendproduct/${id}`,
          data: {

          },
        };
        await axios(config)
          .then((res) => {
            isLoading.value = false;
            if (res.data?.status == true) {
              toast.add({
                severity: "success",
                summary: "สำเร็จ",
                detail: "ส่งของให้กับไรเดอร์สำเร็จ",
                life: 3000,
              });
              dialog.value = false;
              getData();
            } else {
              toast.add({
                severity: "error",
                summary: "เกิดข้อผิดพลาด",
                detail: "ทำรายการส่งของให้กับไรเดอร์ไม่สำเร็จ",
                life: 3000,
              });
            }
          })
          .catch((err) => {
            isLoading.value = false;
            toast.add({
              severity: "error",
              summary: "เกิดข้อผิดพลาด",
              detail: "ทำรายการส่งของให้กับไรเดอร์ไม่สำเร็จ",
              life: 3000,
            });
          });

          isLoading.value = false;
      }
}

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