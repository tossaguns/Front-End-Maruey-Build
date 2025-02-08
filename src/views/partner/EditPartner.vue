<template>
  <div v-if="isLoading" class="overlay">
    <div class="loader"></div>
  </div>
  <div class="flex w-full pt-5 justify-center px-2 sm:px-10 ">
    <div class="grow w-full">
      <div class="text-center py-5 bg-white rounded-t-xl drop-shadow-2xl bg-opacity-80">
        <div class="mt-10 font-semibold text-2xl text-[#8B2FC9]">
            แก้ไขข้อมูลส่วนตัว
        </div>
      </div>
      <div class="py-5 bg-white drop-shadow-2xl bg-opacity-80 rounded-b-xl overflow-x-auto " style="min-height: 82vh; max-height:83vh; ">
        <div class="mx-5">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div class="col-span-full">
                <label class="block text-sm font-medium text-gray-700">username</label>
                <input type="text" class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
                v-model="from.username" placeholder="กรอก username" />
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">อีเมล์</label>
                <input  type="text" class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
                v-model="from.email" placeholder="กรอกอีเมล์" />
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">เบอร์โทรศัพท์</label>
                <input  type="text" class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
                v-model="from.telephone" placeholder="กรอกเบอร์โทรศัพท์" />
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">รหัสผ่าน</label>
                <input  type="password" class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
                v-model="from.password" placeholder="กรอกรหัสผ่าน" />
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">ยืนยันรหัสผ่าน</label>
                <input  type="password" class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
                v-model="from.confirmpassword" placeholder="กรอกรหัสผ่าน" />
            </div>
        <div>
            <label class="block text-sm font-medium text-gray-700">ชื่อ - นามสกุล</label>
            <input  type="text" class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
             v-model="from.name" placeholder="กรอกชื่อ - นามสกุล" />
        </div>
       
        <div class="">
            <label class="block text-sm font-medium text-gray-700">เลขบัตรประชาชน</label>
            <input  type="text" class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
             v-model="from.iden.iden_number" placeholder="กรอกเลขบัตรประชาชน" />
        </div>



    </div>

    <div class="font-semibold text-lg my-4">ที่อยู่ของบุคคล</div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
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

    <div class="font-semibold text-lg my-4">ข้อมูลบริษัท</div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
        <div>
            <label class="block text-sm font-medium text-gray-700">ชื่อบริษัท</label>
            <input  type="text" class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
             v-model="from.company_name" placeholder="กรอกชื่อบริษัท" />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700">เลขประจำตัวผู้เสียภาษี</label>
            <input  type="text" class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
             v-model="from.company_taxid" placeholder="กรอกเลขประจำตัวผู้เสียภาษี" />
        </div>
        <div class="col-span-full">
            <label class="block text-sm font-medium text-gray-700">ที่อยู่บริษัท</label>
            <input  type="text" class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
             v-model="from.company_address.address" placeholder="กรอกที่อยู่บริษัท" />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mt-1">จังหวัด</label>
             <Dropdown
                v-model="from.company_address.province"
                :options="optionprovince"
                optionLabel="name_th"
                optionValue="name_th"
                placeholder="กรุณาเลือกจังหวัด"
                class="w-full border focus:outline-none "
                @change="chooseprovicecom()"
                filter 
            />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mt-1">อำเภอ</label>
             <Dropdown
                v-model="from.company_address.amphure"
                :options="optionamphurecom"
                optionLabel="name_th"
                optionValue="name_th"
                placeholder="กรุณาเลือกอำเภอ"
                class="w-full border focus:outline-none "
                @change="chooseamphurecom()"
                filter 
            />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mt-1">ตำบล</label>
           
             <Dropdown
                v-model="from.company_address.tambon"
                :options="optiontamboncom"
                optionLabel="name_th"
                optionValue="name_th"
                placeholder="กรุณาเลือกตำบล"
                class="w-full border focus:outline-none "
                @change="choosetamboncom()"
                filter 
            />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700">รหัสไปรษณีย์</label>
            <input  type="text" class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
             v-model="from.company_address.zipcode" placeholder="กรอกรหัสไปรษณีย์" />
        </div>
    </div>

    <div class="font-semibold text-lg my-4">ข้อมูลบัญชีธนาคาร</div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
         <div>
            <label class="block text-sm font-medium text-gray-700">ชื่อบัญชี</label>
            <input  type="text" class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
             v-model="from.bank.accountname" placeholder="กรอกชื่อบัญชี" />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700">เลขบัญชี</label>
            <input  type="text" class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
             v-model="from.bank.accountnumber" placeholder="กรอกเลขบัญชี" />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mt-1">ชื่อธนาคาร</label>
            
             <Dropdown
                v-model="from.bank.name"
                :options="optionbank"
                optionLabel="name"
                optionValue="name"
                placeholder="กรุณาเลือกธนาคาร"
                class="w-full border focus:outline-none "   
                filter 
                     
            />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700">สาขา</label>
            <input  type="text" class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
             v-model="from.bank.branch" placeholder="กรอกสาขา" />
        </div>
    </div>
    <div class="font-semibold text-lg my-4">ข้อมูลอัพโหลดรูปภาพที่จำเป็น</div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
        <div>
            <span>
                <Image v-if="from.iden.iden_imageold != '' && from.iden.iden_imagepreview == null" :src="getImage(from.iden.iden_imageold)"  width="350" preview />
            </span>
            <Image v-if="from.iden.iden_imagepreview != null" :src="from.iden.iden_imagepreview"  width="350" preview />
            <FileUpload
                mode="basic"
                chooseLabel="แนบบัตรประชาชน"
                :auto="true"
                class="buttonfile "
                @uploader="chooseIden"
                :customUpload="true"
                accept="image/png, image/jpeg,image/jpg"
                :fileLimit="1"
                invalidFileSizeMessage="ขนาดรูปภาพจะต้องไม่เกิน 2 mb"
               
            />
        </div>
        <div>
           <span>
                <Image v-if="from.bank.imgbankold != '' && from.bank.imgbankpreview == null" :src="getImage(from.bank.imgbankold)"  width="350" preview />
           </span>
            <Image v-if="from.bank.imgbankpreview != null" :src="from.bank.imgbankpreview"  width="350" preview />
            <FileUpload
                mode="basic"
                chooseLabel="แนบรูปบัญชีธนาคาร"
                class="buttonfile"
                :auto="true"
                @uploader="choosebank"
                :customUpload="true"
                accept="image/png, image/jpeg,image/jpg"
                :fileLimit="1"
                
                invalidFileSizeMessage="ขนาดรูปภาพจะต้องไม่เกิน 2 mb"
                
            />
        </div>
    </div>

    <div class="flex items-center justify-center w-full">
      <button @click="editdata()"  :disabled="isLoading"   class="mt-9 font-semibold leading-none text-white py-4 px-10 bg-[#8B2FC9] rounded-lg hover:bg-[#E178C5] focus:ring-2 focus:ring-offset-2 focus:ring-[#8B2FC9] focus:outline-none mx-5">
        บันทึก
      </button>
      <button @click="back()" :disabled="isLoading"  class="mt-9 font-semibold leading-none text-white py-4 px-10 bg-[#ff3d32] rounded-lg hover:bg-[#ff6259] focus:ring-2 focus:ring-offset-2 focus:ring-[#8B2FC9] focus:outline-none">
        ยกเลิก
      </button>
    </div>

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


const optionbank =  ref([
  {"name": "ธนาคารกสิกรไทย"},
  {"name": "ธนาคารกรุงไทย"},
  {"name": "ธนาคารทหารไทย"},
  {"name": "ธนาคารไทยพาณิชย์"},
  {"name": "ธนาคารกรุงศรีอยุธยา"},
  {"name": "ธนาคารธนชาต"},
  {"name": "ธนาคารออมสิน"},
  {"name": "ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร"},
  {"name": "Industrial and Commercial Bank of China Limited(THAI)"},
  {"name": "ธนาคารซิตี้แบงก์"},
  {"name": "UOB(THAI)"},
  {"name": "ธนาคารซีไอเอ็มบีไทย"},
  {"name": "ธนาคารแลนด์ แอนด์ เฮ้าส์"},
  {"name": "ธนาคารสแตนดาร์ดชาร์เตอร์ด(ไทย)"},
  {"name": "ธนาคารทิสโก้"},
  {"name": "ธนาคารอาคารสงเคราะห์"},
  {"name": "ธนาคารเกียรตินาคินภัทร"},
  {"name": "HSBC Thailand"},
  {"name": "ธนาคารกรุงเทพ"}
])

const getData = async () => {
    const config = {
      method: "get",
      headers: {
        "token": token.value,
      },
      url: `${process.env.VUE_APP_MARUEY}partner/byid/${store.getters._id}`,
    };
    await axios(config).then(async(res) => {
       
        from.value._id = res.data.data._id;
        from.value.username = res.data.data.username;
        from.value.email = res.data.data.email;
        from.value.password = "";
        from.value.telephone = res.data.data.telephone;
        from.value.name = res.data.data.name;
        from.value.iden.iden_number = res.data.data.iden.iden_number;

        from.value.company_name = res.data.data.company_name;
        from.value.company_taxid = res.data.data.company_taxid;
        from.value.address.address = res.data.data.address.address;

        from.value.address.province = res.data.data.address.province;
        await chooseprovice('edit').then(async() => {
            from.value.address.amphure = res.data.data.address.amphure;
            return chooseamphure('edit').then(async() => {
                from.value.address.tambon = res.data.data.address.tambon;
                return choosetambon().then(async() => {
                    from.value.address.zipcode = res.data.data.address.zipcode;
                })
            })
        });
       
       

        from.value.company_address.address = res.data.data.company_address.address;
            
        from.value.company_address.province = res.data.data.company_address.province;
        await chooseprovicecom('edit').then(async() => {
            from.value.company_address.amphure = res.data.data.company_address.amphure;
            return chooseamphurecom('edit').then(async() => {
                from.value.company_address.tambon = res.data.data.company_address.tambon;
                return choosetamboncom().then(async() => {
                    from.value.company_address.zipcode = res.data.data.company_address.zipcode;
                })
            })
        });


        from.value.bank.accountname = res.data.data.bank.accountname;
        from.value.bank.accountnumber = res.data.data.bank.accountnumber;
       
        from.value.bank.name = res.data.data.bank.name;
        from.value.bank.branch = res.data.data.bank.branch;
       
        
        from.value.bank.imgbank ="";
        from.value.iden.iden_image ="";
   
        from.value.bank.imgbankold = res.data.data.bank.imgbank;
        from.value.iden.iden_imageold =res.data.data.iden?.iden_image;
        from.value.bank.imgbankpreview = null;
        from.value.iden.iden_imagepreview = null;
           
    }).catch((err) => { console.log(err);});
    
};

const from = ref({
    _id: "",
    username: "",
    email: "",
    telephone: "",
    password: "",
    confirmpassword: "",
    name: "",
    address: {
        address: "", //(ที่อยู่)
        province :"", //(จังหวัด)
        amphure: "", //(อำเภอ)
        tambon: "",//(ตำบล)
        zipcode: "" //(รหัสไปรษณีย์)	
    },
    company_name: "", //(ชื่อบริษัท)
    company_taxid: "", //(เลขประจำตัวผู้เสียภาษี)
    company_address: {
        address: "", //(ที่อยู่)
        province : "", //(จังหวัด)
        amphure: "", //(อำเภอ)
        tambon: "",//(ตำบล)
        zipcode: "" //(รหัสไปรษณีย์)	
    }, //(ที่อยู่บริษัท)
    bank:{
        accountname:"",  //(ชื่อบัญชี)
        accountnumber: "", //(เลขบัญชี) 
	    namebank: "", //(ชื่อธนาคาร)
        branch: "" , //(สาขา) 
        imgbank: "", //(รูปภาพบัญชีธนาคาร)
        imgbankold: "", //(ตอนอัพเดท)
        imgbankpreview:null //(รูปภาพบัญชีธนาคาร)
    },
    iden:{ //(บัตรประชาชน)
	    iden_number : "", //(เลขบัตรประชาชน)
        iden_image:"",
        iden_imageold:"",
        iden_imagepreview:null,
    }
});



onMounted(async () => {
    document.title = "แก้ไขข้อมูลส่วนตัว || Maruey";
    isLoading.value = true;
    await getProvince();
    await getData();
   
    isLoading.value = false;
});

const editdata = async () => {
    //เช็คก่อนกรอกค่าครบไหม
    if ( from.value.username == "" ||from.value.email === "" || from.value.name === "" || from.value.telephone === "" || from.value.address.address === "" || from.value.address.province === "" || from.value.address.amphure === "" || from.value.address.tambon === "" || from.value.address.zipcode === "" || from.value.company_name === "" || from.value.company_taxid === "" || from.value.company_address.address === "" || from.value.company_address.province === "" || from.value.company_address.amphure === "" || from.value.company_address.tambon === "" || from.value.company_address.zipcode === "" || from.value.bank.accountname === "" || from.value.bank.accountnumber === "" || from.value.bank.name === "" || from.value.bank.branch === "" || from.value.iden.iden_number === "") {
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
        text: "คุณต้องการแก้ไขข้อมูล partner หรือไม่?",
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
            url: `${process.env.VUE_APP_MARUEY}partner/${from.value._id}`,
        };
        await axios(config).then(async(res) => {
            if (res.data?.status === true) {
                toast.add({
                    severity: "success",
                    summary: "แก้ไขข้อมูลสำเร็จ",
                    detail: "แก้ไขข้อมูลสำเร็จ",
                    life: 3000,
                });
                if(from.value.iden.iden_image != ""){
                    uploadIden(from.value._id);
                }
                if(from.value.bank.imgbank != ""){
                    uploadbank(from.value._id);
                }
                await getData();
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

const back = () => {
    router.push('/home');
};

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
        }else{
           
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

const optionamphurecom = ref([]);
const optiontamboncom = ref([])
const chooseprovicecom = async (edit)=>{
    const config = {
        method: "get",
        url: `https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json`,
    };
    await axios(config).then((res) => {
        const province = optionprovince.value.find((item) => item.name_th == from.value.company_address.province);
        optionamphurecom.value = res.data.filter((item) => item.province_id == province.id);
        if(edit == undefined)
        {
            from.value.company_address.amphure = "";
            from.value.company_address.tambon = "";
            from.value.company_address.zipcode = "";
        }
    }).catch((err) => { console.log(err);});
};

const chooseamphurecom = async (edit) =>{
    const config = {
        method: "get",
        url: `https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json`,
    };
    await axios(config).then((res) => {
        const amphure = optionamphurecom.value.find((item) => item.name_th == from.value.company_address.amphure);
        optiontamboncom.value = res.data.filter((item) => item.amphure_id == amphure.id);
        if(edit == undefined)
        {
            from.value.company_address.tambon = "";
            from.value.company_address.zipcode = "";
        }
    }).catch((err) => { console.log(err);});
};

const choosetamboncom = async () =>{
    const zipcode = optiontamboncom.value.find((item) => item.name_th == from.value.company_address.tambon);   
    from.value.company_address.zipcode = zipcode?.zip_code
};

const getImage = (item) => {
      return `https://drive.google.com/thumbnail?id=${item}&sz=w1000`;
};

const chooseIden = (e) => {
    from.value.iden.iden_imagepreview = e.files[0].objectURL;
    from.value.iden.iden_image = e.files[0];
};

const choosebank = (e) => {
    from.value.bank.imgbankpreview = e.files[0].objectURL;
    from.value.bank.imgbank = e.files[0];
};

const uploadIden = async (id) => {
    console.log("tesssr")
    const formData = new FormData();
    formData.append("image", from.value.iden.iden_image);
    const config = {
        method: "put",
        headers: {
            "token": token.value,
            "Content-Type": "multipart/form-data",
        },
        data: formData,
        url: `${process.env.VUE_APP_MARUEY}partner/addidcard/${id}`,
    };
    
    await axios(config).then((res) => {
        if (res.data?.status === true) {
           
        } else {
            toast.add({
                severity: "error",
                summary: "อัพโหลดรูปภาพบัตรประชาชนไม่สำเร็จ",
                detail: "อัพโหลดรูปภาพบัตรประชาชนไม่สำเร็จ",
                life: 3000,
            });
        }
    }).catch((err) => { 
        toast.add({
            severity: "error",
            summary: "อัพโหลดรูปภาพบัตรประชาชนไม่สำเร็จ",
            detail: "อัพโหลดรูปภาพบัตรประชาชนไม่สำเร็จ",
            life: 3000,
        });
    });
};

const uploadbank = async (id) => {
    const formData = new FormData();
    formData.append("image", from.value.bank.imgbank);
    const config = {
        method: "put",
        headers: {
            "token": token.value,
            "Content-Type": "multipart/form-data",
        },
        data: formData,
        url: `${process.env.VUE_APP_MARUEY}partner/addbankimage/${id}`,
    };
    await axios(config).then((res) => {
        if (res.data?.status === true) {
           
        } else {
            toast.add({
                severity: "error",
                summary: "อัพโหลดรูปภาพบัญชีธนาคารไม่สำเร็จ",
                detail: "อัพโหลดรูปภาพบัญชีธนาคารไม่สำเร็จ",
                life: 3000,
            });
        }
    }).catch((err) => { 
        toast.add({
            severity: "error",
            summary: "อัพโหลดรูปภาพบัญชีธนาคารไม่สำเร็จ",
            detail: "อัพโหลดรูปภาพบัญชีธนาคารไม่สำเร็จ",
            life: 3000,
        });
    });
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