<template>
    <div v-if="isLoading" class="overlay">
        <div class="loader"></div>
    </div>
    <div class="flex w-full pt-5 justify-center px-2 sm:px-10">
         <div class="grow w-full">
            <div class="text-center py-5 bg-white rounded-t-xl drop-shadow-2xl bg-opacity-80">
                <div class="mt-10 font-semibold text-2xl text-[#8B2FC9]">
                    ข้อมูลพื้นฐาน
                </div>
            </div>
            <div class="text-center py-5 bg-white drop-shadow-2xl bg-opacity-80 rounded-b-xl" style="min-height: 82vh" v-if="data != null">
               <div class="text-center font-bold text-xl border bg-[#fff] border-[#fff] mx-5  mt-5 rounded shadow-md">
                <div class="text-left text-2xl m-3 pb-3 border-b border-[#000] ">ที่อยู่จัดส่งสินค้าของมารวย</div>
                    <ul class="text-left text-sm pl-5">
                        <li class="pb-3"><div class="flex"><div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b2fc9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg></div><div>ชื่อผู้ส่ง : {{data?.address?.namedelivery}} </div></div></li>
                        <li class="pb-3"><div class="flex"><div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b2fc9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg></div><div>เบอร์โทร: {{data?.address?.telephone}} </div></div></li>
                        <li class="pb-3"><div class="flex"><div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b2fc9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg></div><div>ที่อยู่ : {{data?.address?.address+" "+data?.address?.tambon+" "+data?.address?.amphure+" "+data?.address?.province+" "+data?.address?.zipcode}}</div></div></li>

                    </ul>
              

                <div class=" border-t border-[#000] m-3 py-4  ">
                    <button @click="opendialog('edit',data)" class="bg-purple-600 text-white font-bold py-4 text-base rounded w-full">แก้ไขข้อมูลพื้นฐาน</button>
                </div> 
            </div>
              

            </div>
            <div class="text-center py-5 bg-white drop-shadow-2xl bg-opacity-80 rounded-b-xl" style="min-height: 82vh" v-else >
                <div class="text-center text-2xl font-bold">คุณยังไม่สร้างข้อมูลพื้นฐาน</div>
                <div class="text-center mt-5">
                    <button @click="opendialog('add', {})" class="bg-[#8B2FC9] text-white font-bold py-4 px-10 rounded-lg hover:bg-[#E178C5] focus:ring-2 focus:ring-offset-2 focus:ring-[#8B2FC9] focus:outline-none">สร้างข้อมูลพื้นฐาน</button>
                </div>
            </div>
         </div>
    </div>

    <Dialog v-model:visible="dialog" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"  >
        <template #header>
            <div class="flex justify-between items-center">
                <div class="text-lg font-semibold">{{headform}}</div>
            </div>
        </template>
         <div class="font-semibold text-lg my-4">ที่อยู่จัดส่งสินค้าของมารวย</div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div>
                <label class="block text-sm font-medium text-gray-700">ชื่อผู้รับ</label>
                <input  type="text" class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
                v-model="from.address.namedelivery" placeholder="กรอกชื่อผู้รับ" />
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">เบอร์โทร</label>
                <input  type="text" class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
                v-model="from.address.telephone" placeholder="กรอกเบอร์โทร" />
            </div>
            <div class="col-span-full">
                <label class="block text-sm font-medium text-gray-700">ที่อยู่</label>
                <input  type="text" class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
                v-model="from.address.address" placeholder="กรอกที่อยู่" />
            </div>
        <div>   
            <label class="block text-sm font-medium text-gray-700 mt-1">จังหวัด</label>
             <Dropdown
                v-model="from.address.province"
                :options="optionprovince"
                optionLabel="name_th"
                optionValue="name_th"
                placeholder="กรุณาเลือกจังหวัด"
                class="w-full border focus:outline-none "
                @change="chooseprovice()"
                filter 
            />
            
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mt-1">อำเภอ</label>
             <Dropdown
                v-model="from.address.amphure"
                :options="optionamphure"
                optionLabel="name_th"
                optionValue="name_th"
                placeholder="กรุณาเลือกอำเภอ"
                class="w-full border focus:outline-none "
                @change="chooseamphure()"
                filter 
                
            />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700">ตำบล</label>
            <Dropdown
                v-model="from.address.tambon"
                :options="optiontambon"
                optionLabel="name_th"
                optionValue="name_th"
                placeholder="กรุณาเลือกตำบล"
                class="w-full border focus:outline-none "
                @change="choosetambon()"
                filter 
                
            />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700">รหัสไปรษณีย์</label>
            <input  type="text" class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
             v-model="from.address.zipcode" placeholder="กรอกรหัสไปรษณีย์" />
        </div>
    
        </div>
        <div class="flex items-center justify-center w-full">
            <button @click="headform == 'เพิ่มข้อมูลพื้นฐาน' ? adddata() : editdata()"  :disabled="isLoading"   class="mt-9 font-semibold leading-none text-white py-4 px-10 bg-[#8B2FC9] rounded-lg hover:bg-[#E178C5] focus:ring-2 focus:ring-offset-2 focus:ring-[#8B2FC9] focus:outline-none mx-5">
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

onMounted(async() => {
     document.title = "ข้อมูลพื้นฐาน || Maruey";
    isLoading.value = true;
    await getData();
    await getProvince();
    isLoading.value = false;
});

const headform = ref("");
const dialog = ref(false);
const from = ref({
    address:{
        namedelivery: "", //(ชื่อผู้รับ)
        telephone: "", //(เบอร์โทร)
        address: "",
        tambon: "",
        amphure: "",
        province: "",
        zipcode: "",
    }
});
const opendialog = async(type, data) => {
   if (type == "add") {
        dialog.value = true;
        from.value = {
            address:{
                namedelivery: "", //(ชื่อผู้รับ)
                telephone: "", //(เบอร์โทร)
                address: "",
                tambon: "",
                amphure: "",
                province: "",
                zipcode: "",
            }
        };
        headform.value = "เพิ่มข้อมูลพื้นฐาน";
    }else if (type == "edit") {
        
        from.value = {...data};
        await chooseprovice("edit");
        await chooseamphure("edit");
        
        await choosetambon();
    
        headform.value = "แก้ไขข้อมูลพื้นฐาน";
        dialog.value = true;
    }
};
const data = ref({});
const getData = async () => {
    isLoading.value = true;
    const config = {
        method: "get",
        headers: {
            "token": token.value,
        },
        url: `${process.env.VUE_APP_MARUEY}information/`,
    };
    await axios(config).then((res) => {
        data.value = res?.data?.data;
    }).catch((err) => { console.log(err);});
    isLoading.value = false;
}

const optionprovince = ref([]);
const optionamphure = ref([]);
const optiontambon = ref([])
const getProvince = async () => {
    const config = {
        method: "get",
        url: `https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json`,
    };
    await axios(config).then((res) => {
        optionprovince.value = res.data;
    }).catch((err) => { console.log(err);});
};
const chooseprovice = async (edit) =>{
    const config = {
        method: "get",
        url: `https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json`,
    };
    await axios(config).then((res) => {

        const province = optionprovince.value.find((item) => item.name_th == from.value.address.province);
        optionamphure.value = res.data.filter((item) => item.province_id == province.id);
        if(edit == undefined)
        {
            from.value.address.amphure = "";
            from.value.address.tambon = "";
            from.value.address.zipcode = "";
        }
    }).catch((err) => { console.log(err);});

};

const chooseamphure = async (edit) =>{
    const config = {
        method: "get",
        url: `https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json`,
    };
    await axios(config).then((res) => {
        const amphure = optionamphure.value.find((item) => item.name_th == from.value.address.amphure);
        optiontambon.value = res.data.filter((item) => item.amphure_id == amphure.id);
        if(edit == undefined)
        {
            from.value.address.tambon = "";
            from.value.address.zipcode = "";
        }
    }).catch((err) => { console.log(err);});
};

const choosetambon = async () =>{
 
    const zipcode = optiontambon.value.find((item) => item.name_th == from.value.address.tambon);   
    from.value.address.zipcode = zipcode?.zip_code
    
};

const adddata = async()=>{
    //เช็คก่อนกรอกค่าครบไหม
    if(from.value.address.address == "" || from.value.address.province == "" || from.value.address.amphure == "" || from.value.address.tambon == "" || from.value.address.zipcode == "")
    {
        toast.add({
            severity: "error",
            summary: "กรุณากรอกข้อมูลให้ครบ",
            detail:"กรุณากรอกข้อมูลให้ครบ",
            life: 3000,
        });
        return;
    }
    const result = await Swal.fire({
        text: "คุณต้องการข้อมูลพื้นฐานหรือไม่?",
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
            url: `${process.env.VUE_APP_MARUEY}information/`,
        };
        await axios(config).then(async(res) => {
            if (res.data?.status == true) {
                toast.add({
                    severity: "success",
                    summary: "เพิ่มข้อมูลพื้นฐาน สำเร็จ",
                    detail: "เพิ่มข้อมูลสำเร็จ",
                    life: 3000,
                });
                getData();
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
        
          if(err.response?.status == 409){
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
}

const editdata = async ()=>{
    //เช็คก่อนกรอกค่าครบไหม
    if(from.value.address.address == "" || from.value.address.province == "" || from.value.address.amphure == "" || from.value.address.tambon == "" || from.value.address.zipcode == "")
    {
        toast.add({
            severity: "error",
            summary: "กรุณากรอกข้อมูลให้ครบ",
            detail:"กรุณากรอกข้อมูลให้ครบ",
            life: 3000,
        });
        return;
    }
    const result = await Swal.fire({
        text: "คุณต้องการแก้ไขข้อมูลพื้นฐานหรือไม่?",
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
            url: `${process.env.VUE_APP_MARUEY}information/`,
        };
        await axios(config).then(async(res) => {
            if (res.data?.status == true) {
                toast.add({
                    severity: "success",
                    summary: "แก้ไขข้อมูลพื้นฐาน สำเร็จ",
                    detail: "แก้ไขข้อมูลสำเร็จ",
                    life: 3000,
                });
                getData();
                dialog.value = false;
                
            } else {
                toast.add({
                    severity: "error",
                    summary: "แก้ไขข้อมูลไม่สำเร็จ",
                    detail: "แก้ไขข้อมูลไม่สำเร็จ",
                    life: 3000,
                });
            }
        }).catch((err) => { 
        
          if(err.response?.status == 409){
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
}

</script>
<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

@import "../../../assets/Loading.css";
</style>