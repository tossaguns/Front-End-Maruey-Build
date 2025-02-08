<template>
  <div v-if="isLoading" class="overlay">
    <div class="loader"></div>
  </div>
  <div class="flex w-full pt-5 justify-center px-2 sm:px-10">
    <div class="grow w-full">
      <div class="text-center py-5 bg-white rounded-t-xl drop-shadow-2xl bg-opacity-80">
        <div class="mt-10 font-semibold text-2xl text-[#8B2FC9]">
          ข้อมูลคู่ค้า Partner
        </div>
      </div>
      <div class="text-center py-5 bg-white drop-shadow-2xl bg-opacity-80 rounded-b-xl" style="min-height: 82vh">
        <div class="text-right mb-3 mx-3 ">
            <button  class="px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium hover:bg-[#E178C5] 
            border-[#DC97FF] bg-[#8B2FC9] text-white" @click="opendialog('add')">             
                เพิ่มข้อมูล Partner
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
          tableStyle="min-width: 80rem;" 
        >
          <template #empty>
            <p class="font-italic text-center text-2xl">ไม่มีข้อมูลผู้ใช้งาน</p>
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
           <Column header="เปิด - ปิดไอดี" >
            <template #body="item">
                <div v-if="item.data.partner_status != null ">
                    <InputSwitch v-model="item.data.partner_status"  @click="changestatus(item.data.partner_status,item.data._id)" />
                </div>
                <div v-else> ไม่มีสถานะ </div>
            </template>
          </Column>
            <Column header="ชื่อบริษัท" field="company_name" />
            <Column header="เลขประจำตัวผู้เสียภาษี" field="company_taxid" />
            <Column header="ชื่อ - นามสกุล" field="name" />
            <Column header="เบอร์โทรศัพท์" field="telephone" />
          
          
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
            <label class="block text-sm font-medium text-gray-700">ชื่อผู้ใช้</label>
            <input  type="text" class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
             v-model="from.username" placeholder="กรอกชื่อผู้ใช้" />
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
            <label class="block text-sm font-medium text-gray-700">ชื่อ - นามสกุล</label>
            <input  type="text" class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
             v-model="from.name" placeholder="กรอกชื่อ - นามสกุล" />
        </div>
       
        <div class="col-span-full">
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
            <span v-if="headform != 'เพิ่มข้อมูล Partner'">
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
           <span v-if="headform != 'เพิ่มข้อมูล Partner'">
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
      <button @click="headform == 'เพิ่มข้อมูล Partner' ? adddata() : editdata()"  :disabled="isLoading"   class="mt-9 font-semibold leading-none text-white py-4 px-10 bg-[#8B2FC9] rounded-lg hover:bg-[#E178C5] focus:ring-2 focus:ring-offset-2 focus:ring-[#8B2FC9] focus:outline-none mx-5">
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
      url: `${process.env.VUE_APP_MARUEY}partner/`,
    };
    await axios(config).then((res) => {
            data.value = res.data?.data;
    }).catch((err) => { console.log(err);});
    
};

const dialog = ref(false);

const from = ref({
    _id: "",
    username: "",
    email: "",
    telephone: "",
    password: "",
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
    document.title = "ข้อมูล Partner || Maruey";
    isLoading.value = true;
    await getData();
    await getProvince();
    isLoading.value = false;
});

const searchall = ref(""); 
const Filter = computed(() => {
    if(searchall.value != ""){
        return data.value.filter((item) => item.email.toLowerCase().includes(searchall.value.toLowerCase()) || item.telephone.toLowerCase().includes(searchall.value.toLowerCase()) || item.name.toLowerCase().includes(searchall.value.toLowerCase()) || item.company_name.toLowerCase().includes(searchall.value.toLowerCase()));
    }
    return data.value;
});


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


const headform = ref("");
const opendialog = async(type, item) => {
    if (type === "edit") {

        from.value._id = item.data._id;
        from.value.email = item.data.email;
        from.value.telephone = item.data.telephone;
        from.value.name = item.data.name;
        from.value.company_name = item.data.company_name;
        from.value.company_taxid = item.data.company_taxid;
        from.value.address.address = item.data.address.address;

        from.value.address.province = item.data.address.province;
        await chooseprovice('edit');
        from.value.address.amphure = item.data?.address?.amphure;
       
        await chooseamphure('edit');
        from.value.address.tambon = item.data.address.tambon;
        await choosetambon();
        from.value.address.zipcode = item.data.address.zipcode;
        from.value.company_address.address = item.data.company_address.address;
            
        from.value.company_address.province = item.data.company_address.province;
        await chooseprovicecom('edit');

        from.value.company_address.amphure = item.data.company_address.amphure;
        await chooseamphurecom('edit');
        
        from.value.company_address.tambon = item.data.company_address.tambon;
        await choosetamboncom();
        from.value.company_address.zipcode = item.data.company_address.zipcode;
        from.value.bank.accountname = item.data.bank.accountname;
        from.value.bank.accountnumber = item.data.bank.accountnumber;
        from.value.bank.name = item.data.bank.name;
        from.value.bank.branch = item.data.bank.branch;
        from.value.iden.iden_number = item.data.iden.iden_number;


        
        from.value.password = "";
        from.value.bank.imgbank ="";
        from.value.iden.iden_image ="";

        from.value.bank.imgbankold = item.data.bank.imgbank;
        from.value.iden.iden_imageold =item.data.iden.iden_image;
        from.value.bank.imgbankpreview = null;
        from.value.iden.iden_imagepreview = null;
        

        headform.value = "แก้ไขข้อมูล Partner";
    } else {
        from.value = {
            email: "",
            telephone: "",
            password: "",
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
                branch: "",  //(สาขา)
                imgbank: "", //(รูปภาพบัญชีธนาคาร)
                imgbankpreview:null //(รูปภาพบัญชีธนาคาร)
            },
            iden:{ //(บัตรประชาชน)
                iden_number : "", //(เลขบัตรประชาชน)
                iden_image:"",
                iden_imagepreview:null,
            }
        };
        headform.value = "เพิ่มข้อมูล Partner";
    }
    dialog.value = true;
};

const adddata = async () => {
    //เช็คก่อนกรอกค่าครบไหม
    if ( from.value.username == "" || from.value.email === "" || from.value.name === "" || from.value.telephone === "" || from.value.password === "" || from.value.address.address === "" || from.value.address.province === "" || from.value.address.amphure === "" || from.value.address.tambon === "" || from.value.address.zipcode === "" || from.value.company_name === "" || from.value.company_taxid === "" || from.value.company_address.address === "" || from.value.company_address.province === "" || from.value.company_address.amphure === "" || from.value.company_address.tambon === "" || from.value.company_address.zipcode === "" || from.value.bank.accountname === "" || from.value.bank.accountnumber === "" || from.value.bank.name === "" || from.value.bank.branch === "" || from.value.iden.iden_number === "") {
        toast.add({
            severity: "error",
            summary: "กรุณากรอกข้อมูลให้ครบ",
            detail:"กรุณากรอกข้อมูลให้ครบ",
            life: 3000,
        });
        return;
    }

    const result = await Swal.fire({
        text: "คุณต้องการเพิ่มข้อมูล Partner หรือไม่?",
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
            url: `${process.env.VUE_APP_MARUEY}partner/`,
        };
        await axios(config).then(async(res) => {
            if (res.data?.status == true) {
                if(from.value.iden.iden_image != ""){
                    await uploadIden(res.data.data._id);
                }
                if(from.value.bank.imgbank != ""){
                    await uploadbank(res.data.data._id);
                }

                toast.add({
                    severity: "success",
                    summary: "เพิ่มข้อมูล Partner สำเร็จ",
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
            console.log(err)
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
};



const editdata = async () => {
    //เช็คก่อนกรอกค่าครบไหม
    if ( from.value.username == "" || from.value.email === "" || from.value.name === "" || from.value.telephone === "" || from.value.address.address === "" || from.value.address.province === "" || from.value.address.amphure === "" || from.value.address.tambon === "" || from.value.address.zipcode === "" || from.value.company_name === "" || from.value.company_taxid === "" || from.value.company_address.address === "" || from.value.company_address.province === "" || from.value.company_address.amphure === "" || from.value.company_address.tambon === "" || from.value.company_address.zipcode === "" || from.value.bank.accountname === "" || from.value.bank.accountnumber === "" || from.value.bank.name === "" || from.value.bank.branch === "" || from.value.iden.iden_number === "") {
        toast.add({
            severity: "error",
            summary: "กรุณากรอกข้อมูลให้ครบ",
            detail:"กรุณากรอกข้อมูลให้ครบ",
            life: 3000,
        });
        return;
    }

    const result = await Swal.fire({
        text: "คุณต้องการแก้ไขข้อมูล Partner หรือไม่?",
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
        text: "คุณต้องการลบข้อมูล Partner หรือไม่?",
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
            url: `${process.env.VUE_APP_MARUEY}partner/${id}`,
        };
        await axios(config).then((res) => {
            if (res.data?.status === true) {
                toast.add({
                    severity: "success",
                    summary: "ลบข้อมูลสำเร็จ",
                    detail: "ลบข้อมูลสำเร็จ",
                    life: 3000,
                });
                dialog.value = false;
                getData();
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


const chooseIden = (e) => {
    from.value.iden.iden_imagepreview = e.files[0].objectURL;
    from.value.iden.iden_image = e.files[0];
};

const choosebank = (e) => {
    from.value.bank.imgbankpreview = e.files[0].objectURL;
    from.value.bank.imgbank = e.files[0];
};

const getImage = (item) => {
      return `https://drive.google.com/thumbnail?id=${item}&sz=w1000`;
};

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

const changestatus = async(status,id)=>{
     const config = {
            method: "put",
            headers: {
                "token": token.value,
            },
            data: {Partner_status:!status},
            url: `${process.env.VUE_APP_MARUEY}Partner/status/${id}`,
        };
        await axios(config).then(async(res) => {
            if (res.data?.status === true) {
                toast.add({
                    severity: "success",
                    summary: "เปลี่ยนสถานะเรียบร้อย",
                    detail: "เปลี่ยนสถานะเรียบร้อย",
                    life: 3000,
                });
                
                dialog.value = false;
            } else {
                toast.add({
                    severity: "error",
                    summary: "เปลี่ยนสถานะไม่สำเร็จ",
                    detail: "เปลี่ยนสถานะไม่สำเร็จ",
                    life: 3000,
                });
            }
        }).catch((err) => { 
            toast.add({
                    severity: "error",
                    summary: "เปลี่ยนสถานะไม่สำเร็จ",
                    detail: "เปลี่ยนสถานะไม่สำเร็จ",
                    life: 3000,
            });
        });
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
.p-inputtext {
   padding: 0.5rem;
}
</style>


