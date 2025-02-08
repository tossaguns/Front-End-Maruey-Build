<template>
  <div v-if="isLoading" class="overlay">
    <div class="loader"></div>
  </div>
  <div class="flex w-full pt-5 justify-center px-2 sm:px-10  "  >
    <div class="overflow-x-auto w-full">
      <div class="text-center py-5 bg-white rounded-t-xl drop-shadow-2xl bg-opacity-80">
        <div class="mt-10 font-semibold text-2xl text-[#8B2FC9]">
           ฝากขายสินค้า
        </div>
      </div>
      <div class="text-center py-5 bg-white drop-shadow-2xl bg-opacity-80 rounded-b-xl overflow-x-auto" style="min-height: 82vh">
        <div class="text-right mb-3 mx-3 ">
          
        </div>
        <DataTable
          :value="Filter"
          :paginator="true"
          :rows="5"
          :rowsPerPageOptions="[5, 10, 20, 50]"
          selectionMode="single"
          class="font mx-2 opacity-100  "
          currentPageReportTemplate="แสดง {first} ถึง {last} ใน {totalRecords} รายการ"
          tableStyle="min-width: 120rem;" 
        >
          <template #empty>
            <p class="font-italic text-center text-2xl">ไม่มีข้อมูลฝากขายสินค้า</p>
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
          <Column header="สถานะ">
            <template #body="item">
                <div v-if="item.data.request_status_detail[item.data?.request_status_detail.length -1]?.status  =='รอการอนุมัติ'"> 
                    <span class="px-2 py-1 bg-[#f97316] text-white rounded-lg">รอการอนุมัติ</span>
                </div>
                <div v-else-if="item.data.request_status_detail[item.data?.request_status_detail.length -1]?.status  =='อนุมัติ'"> 
                    <span class="px-2 py-1 bg-[#1da750] text-white rounded-lg">อนุมัติ</span>
                </div>
                <div v-else-if="item.data.request_status_detail[item.data?.request_status_detail.length -1]?.status  =='ไม่อนุมัติ'"> 
                    <span class="px-2 py-1 bg-[#ff3d32] text-white rounded-lg">ไม่อนุมัติ</span>
                </div>
                <div v-else> - </div>
            </template>  
          </Column>
          <Column header="ชื่อสินค้า" field="product_name" style="width:15%" />
          <Column header="ราคาสินค้า" >
            <template #body="item">
              <div v-if="item.data.product_price !=null "> {{ item.data.product_price.toFixed(2) }} บาท </div>
              <div v-else> ไม่มีราคา </div>
            </template>
          </Column>
  
          <Column header="หมวดหมู่สินค้า" field="product_category.category_name" />
          <Column header="หมวดหมู่สินค้าย่อย" >
            <template #body="item">
                <div v-for="type in item.data.product_type" :key="type._id">
                    {{ type.type_name }}
                </div>
            </template>
          </Column>
          <Column header="คลังสินค้าของ" field="product_store"/>
          <Column header="คู่ค้า (partner)" >
            <template #body="item">
              <div v-if="item.data.product_partner_id !=null &&item.data.product_store =='Partner' "> {{ item.data.product_partner_id?.company_name }} </div>
              <div v-else-if="item.data.product_store =='Maruay'">บริษัท มารวยด้วยกัน จำกัด</div>
              <div v-else> ไม่มีคู่ค้า </div>
            </template>
          </Column>

          <Column header="รูปภาพ" >
            <template #body="item">
              <Image alt="Image"  v-if="item.data.product_image !=''" preview>
                <template #indicatoricon>
                  <i class="pi pi-search"></i>
                  </template>
                  <template #image>
                      <Button class="px-3 py-3 md:px-4 md:py-3 border-2 rounded-lg font-medium hover:bg-[#E178C5]  mt-3
            border-[#DC97FF] bg-[#8B2FC9] text-white paddingtb" >
                          
                          ดูรูปสินค้า
                      </Button>
                  </template>
                  <template #preview="slotProps">
                      <img :src="getImage(item.data.product_image)" alt="preview" :style="slotProps.style" @click="slotProps.onClick" />
                  </template>
              </Image>
              <div v-else> ไม่มีรูปภาพ </div>
            </template>
          </Column>
          <Column header="ดูรายละเอียด">
            <template #body="item">
              <button class="px-4 py-2  border-2 rounded-lg font-medium hover:bg-[#E178C5]   border-[#DC97FF] bg-[#8B2FC9] text-white " @click="opendialog('edit', item)">
                ดูรายละเอียด
              </button>
            </template>
          </Column>
          <Column header="ตัวเลือก">
            <template #body="item">
                <!--  ปุ่มอนุมัติ และไม่อนุมัติ -->
                <button class="px-3 py-2   border-2 rounded-lg font-medium hover:bg-[#1da750]   border-[#22c55e] bg-[#22c55e] text-white  mx-2" @click="appover(item.data._id)">
                    อนุมัติ
                </button>
                <button class="px-3 py-2   border-2 rounded-lg font-medium hover:bg-[#d9342b]   border-[#ff3d32] bg-[#ff3d32] text-white " @click="notappover(item.data._id)">
                    ไม่อนุมัติ
                </button>
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
            <label class="block text-sm font-medium text-gray-700">ชื่อสินค้า</label>
            <input  type="text" class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
             v-model="from.product_name" placeholder="กรอกชื่อสินค้า" readonly />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">เป็นสินค้าของ</label>
              <Dropdown
                v-model="from.product_status_type"
                :options="optionstatustype"
                optionLabel="name"
                optionValue="name"
                placeholder="กรุณาเลือก"
                class="w-full border focus:outline-none"
                :disabled="true"
                @change="addprostore"
              />
        </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">คลังสินค้าของ</label>
            <input type="text" class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
             v-model="from.product_store" :disabled="true" />
        </div>
        <div class="col-span-full" v-if="from.product_status_type == 'ฝากขาย'">
            <label class="block text-sm font-medium text-gray-700 mb-1">คู่ค้า (partner)</label>
             <Dropdown
                v-model="from.product_partner_id"
                :options="optionpartner"
                optionLabel="company_name"
                optionValue="_id"
                placeholder="กรุณาเลือกคู่ค้า (partner)"
                class="w-full border focus:outline-none"
                :disabled="true"
                filter
              />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">หมวดหมู่สินค้า</label> 
             <Dropdown
                v-model="from.product_category"
                :options="optioncategory"
                optionLabel="category_name"
                optionValue="_id"
                placeholder="กรุณาเลือกหมวดหมู่สินค้า"
                class="w-full border focus:outline-none"
                filter
                disabled
              />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">หมวดหมู่สินค้าย่อย</label>
              <MultiSelect v-model="from.product_type" :options="optiontype" optionLabel="type_name"
                  optionValue="_id" class="w-full border focus:outline-none " placeholder="กรุณาเลือกหมวดสินค้าย่อย"  filter  disabled/>
        </div>
         
      
        
        <div>
            <label class="block text-sm font-medium text-gray-700">ราคาทุนสินค้า</label>
            <input @input="calprice"  type="number" class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
             v-model="from.product_costprice" placeholder="กรอกราคาทุนสินค้า" />
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700">ราคาสินค้า</label>
            <input type="number" class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
             v-model="from.product_price" placeholder="กรอกราคาสินค้า" />
        </div> 
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">น้ำหนักสินค้า</label>
            <InputNumber v-model="from.product_weight"   inputId="kg" suffix=" kg" class="w-full" :minFractionDigits="1" />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">ความกว้างสินค้า</label>
            <InputNumber v-model="from.product_width" inputId="cm" suffix=" cm" class="w-full" />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">ความยาวสินค้า</label>
            <InputNumber v-model="from.product_long" inputId="cm" suffix=" cm" class="w-full" />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">ความสูงสินค้า</label>
            <InputNumber v-model="from.product_height" inputId="cm" suffix=" cm" class="w-full" />
        </div>
        <div class="col-span-full">
            <label class="block text-sm font-medium text-gray-700">จำนวนสต็อก</label>
            <input type="number" class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
             v-model="from.product_stock" placeholder="กรอกจำนวนสต็อก" />
        </div>
        <div class="col-span-full">
            <label class="block text-sm font-medium text-gray-700 mb-2">รายละเอียดสินค้า</label>
             <Editor v-model="from.product_detail" editorStyle="height: 200px" placeholder="กรอกรายละเอียดสินค้า" readonly/>
        </div>
        <div class="col-span-full">
            <label class="block text-sm font-medium text-gray-700 mb-2">รูปภาพสินค้า</label>
             <span >
                <Image v-if="from.product_imageold != '' " :src="getImage(from.product_imageold)"  width="350" preview />
                <div v-else class="ml-2">ไม่มีรูปภาพ</div>
            </span>
          
        </div>
    </div>
    <div class="flex items-center justify-center w-full">
      
      <button @click="dialog = false" :disabled="isLoading"  class="mt-9 font-semibold leading-none text-white py-4 px-10 bg-[#ff3d32] rounded-lg hover:bg-[#ff6259] focus:ring-2 focus:ring-offset-2 focus:ring-[#8B2FC9] focus:outline-none">
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
//คู่ค้า
const optionpartner = ref([]);
//หมวดหมู่สินค้า
const optioncategory = ref([]);
//หมวดหมู่สินค้าย่อย
const optiontype = ref([]);
const getData = async () => {
    
    //ของสินค้า
    const config = {
      method: "get",
      headers: {
        "token": token.value,
      },
      url: `${process.env.VUE_APP_MARUEY}requestproduct/`,
    };
    await axios(config).then((res) => {
            data.value = res.data?.data;
            if(data.value.length > 0){
                data.value =  data.value.filter((item) => item.request_status_detail[item.request_status_detail.length-1].status == "รอการอนุมัติ");
                data.value.reverse();              
            }
    }).catch((err) => { console.log(err);});
    
};



const dialog = ref(false);

const from = ref({
  _id:"",
  product_name:"",
  product_status_type: "",
  product_category: "",
  product_type: "",
  product_costprice:0,
  product_price:0,
  product_weight:0,
  product_width:0,
  product_long:0,
  product_height:0,
  product_store: "",
  product_partner_id:"",
  product_detail: "",
  product_stock: 0,
  product_status: false,
  product_image: "",
  product_image_preview: "",
  product_imageold: ""
});


onMounted(async () => {
    document.title = "ข้อมูลฝากขายสินค้า || Maruey";
    isLoading.value = true;
    //ของคู่่ค้า
    const configpartner = {
      method: "get",
      headers: {
        "token": token.value,
      },
      url: `${process.env.VUE_APP_MARUEY}partner/`,
    };
    await axios(configpartner).then((res) => {
            optionpartner.value = res.data?.data;
    }).catch((err) => { console.log(err);});
    //หมวดหมู่สินค้า
    const configcategory = {
      method: "get",
      headers: {
        "token": token.value,
      },
      url: `${process.env.VUE_APP_MARUEY}category/`,
    };
    await axios(configcategory).then((res) => {
            optioncategory.value = res.data?.data;
    }).catch((err) => { console.log(err);});
    //หมวดหมู่สินค้าย่อย
    const configtype = {
      method: "get",
      headers: {
        "token": token.value,
      },
      url: `${process.env.VUE_APP_MARUEY}type/`,
    };
    await axios(configtype).then((res) => {
            optiontype.value = res.data?.data;
    }).catch((err) => { console.log(err);});
    await getData();
    isLoading.value = false;
});

const searchall = ref(""); 
const Filter = computed(() => {
    if(searchall.value !='')
    {
        return data.value.filter((item) => {
            return item.product_name?.toLowerCase()?.includes(searchall.value.toLowerCase()) || item.product_category?.category_name?.toLowerCase()?.includes(searchall.value.toLowerCase()) || item.product_type?.some((type) => type?.type_name.toLowerCase()?.includes(searchall.value.toLowerCase())) || item.product_store?.toLowerCase().includes(searchall.value.toLowerCase()) || item.product_partner_id?.company_name.toLowerCase().includes(searchall.value.toLowerCase()) || item.product_stock?.toString().toLowerCase().includes(searchall.value.toLowerCase()) || item.product_status.toString().toLowerCase().includes(searchall.value.toLowerCase());
        });
    }
    return data.value;
});


const headform = ref("");
const opendialog = (type, item) => {
    if (type === "edit") {
        console.log(item);
        from.value._id = item.data._id;
        from.value.product_name = item.data.product_name;
        from.value.product_status_type = item.data.product_status_type;
        from.value.product_category = item.data.product_category._id;
        const producttype =item.data.product_type.map((item) => item._id);
        from.value.product_type = producttype;
        from.value.product_costprice = item.data.product_costprice;
        from.value.product_price = item.data.product_price;
        from.value.product_weight = item.data.product_weight;
        from.value.product_width = item.data.product_width;
        from.value.product_long = item.data.product_long;
        from.value.product_height = item.data.product_height;
        from.value.product_store = item.data.product_store;
        from.value.product_partner_id = item.data.product_partner_id?._id;
        from.value.product_detail = item.data.product_detail;
        from.value.product_stock = item.data.product_stock;


        from.value.product_image = "";
        from.value.product_image_preview = null;
        from.value.product_imageold = item.data.product_image;
        headform.value = "แก้ไขข้อมูลฝากขายสินค้า";
    } else {
        from.value = {
            _id:"",
            product_name:"",
            product_status_type: "ฝากขาย",
            product_category: "",
            product_type: "",
            product_costprice: 0,
            product_price: 0,
            product_weight: 0,
            product_width: 0,
            product_long: 0,
            product_height: 0,
            product_store: "Partner",
            product_partner_id:store.getters._id,
            product_detail: "",
            product_stock: 0,
            product_status: false,
            product_image: "",
            product_image_preview: "",
            product_imageold: ""
        };
        headform.value = "เพิ่มข้อมูลฝากขายสินค้า";
    }
    dialog.value = true;
};






const deletedata = async (id)=>{
    const result = await Swal.fire({
        text: "คุณต้องการลบข้อมูลฝากขายสินค้าใช่หรือไม่?",
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
            
            url: `${process.env.VUE_APP_MARUEY}requestproduct/${id}`,
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

const getImage = (item) => {
      return `https://drive.google.com/thumbnail?id=${item}&sz=w1000`;
};


// สถานะการขาย
const optionstatustype  = ref([
    { name: "ฝากขาย" },  
    { name: "สินค้าของตัวเอง" },  
]);

const addprostore = async() =>{
    if(from.value.product_status_type == "ฝากขาย"){
        from.value.product_store = "Partner";
    }else{
        from.value.product_store = "Maruay";
        from.value.product_partner_id = "";
    }

}

// อนุมัติ
const appover = async(id)=>{
   const result = await Swal.fire({
        text: "คุณต้องการอนุมัติสินค้าใช่หรือไม่?",
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
            data: {
               admin_id: store.getters._id,
            },
            url: `${process.env.VUE_APP_MARUEY}requestproduct/approve/${id}`,
        };
        await axios(config).then(async(res) => {
            if (res.data?.status === true) {
                toast.add({
                    severity: "success",
                    summary: "อนุมัติสินค้าสำเร็จ",
                    detail: "อนุมัติสินค้าสำเร็จ",
                    life: 3000,
                });
                await getData();
              
            } else {
                toast.add({
                    severity: "error",
                    summary: "อนุมัติสินค้าไม่สำเร็จ",
                    detail: "อนุมัติสินค้าไม่สำเร็จ",
                    life: 3000,
                });
            }
        }).catch((err) => { 
            toast.add({
                    severity: "error",
                    summary: "อนุมัติสินค้าไม่สำเร็จ",
                    detail: "อนุมัติสินค้าไม่สำเร็จ",
                    life: 3000,
            });
        });
        isLoading.value = false;

   }

}
// ไม่อนุมัติ
const notappover = async(id)=>{
    const result = await Swal.fire({
        text: "คุณไม่อนุมัติสินค้าใช่หรือไม่?",
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
              data: {
                 admin_id: store.getters._id,
              },
              url: `${process.env.VUE_APP_MARUEY}requestproduct/disapprove/${id}`,
          };
          await axios(config).then(async(res) => {
              if (res.data?.status === true) {
                  toast.add({
                      severity: "success",
                      summary: "ไม่อนุมัติสินค้าสำเร็จ",
                      detail: "ไม่อนุมัติสินค้าสำเร็จ",
                      life: 3000,
                  });
                  await getData();
                
              } else {
                  toast.add({
                      severity: "error",
                      summary: "ไม่อนุมัติสินค้าไม่สำเร็จ",
                      detail: "ไม่อนุมัติสินค้าไม่สำเร็จ",
                      life: 3000,
                  });
              }
          }).catch((err) => { 
              toast.add({
                      severity: "error",
                      summary: "ไม่อนุมัติสินค้าไม่สำเร็จ",
                      detail: "ไม่อนุมัติสินค้าไม่สำเร็จ",
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

  .paddingtb{
    padding-top: 1.3rem !important;
    padding-bottom: 1.3rem !important;
  }


</style>