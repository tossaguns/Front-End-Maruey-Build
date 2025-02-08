<template>
  <Sidebar
    v-model:visible="isLoading"
    header=" "
    position="bottom"
    style="height: 100%"
    :showCloseIcon="false"
    class="!bg-gradient-to-br from-[#745abd] to-[#9540ce]"
  >
    <div class="text-white flex justify-center items-center mt-20">
      <div class="text-center flex flex-col items-center gap-3">
        <p class="text-3xl">กำลังทำรายการ</p>
        <div class="loader my-10"></div>
        <p class="text-xl opacity-50">กรุณารอซักครู่ . . .</p>
      </div>
    </div>
  </Sidebar>
  <Toast></Toast>
  <ConfirmDialog></ConfirmDialog>
  <UserRegisterTermDialog v-model:visible="visibleTerms" @sendRegister="sendRegister" />
  <div
    class="bg-slate-100 w-full min-h-[calc(100vh-4rem)] pt-10 flex flex-col items-center"
  >
    <div
      class="bg-white rounded-xl w-full max-w-3xl h-full px-5 pb-10 mb-[10rem]"
    >
      <button
        class="absolute top-14 left-3 pi pi-caret-left text-3xl text-gray-400"
        @click="$router.push('/customer/customerview')"
      ></button>
      <p class="py-5 text-xl font-bold text-center">ตั้งค่าข้อมูลส่วนตัว</p>

      <div class="w-full mt-5">
        <div class="p-2 bg-purple-200 rounded-xl">
          <p>ข้อมูลสมาชิก {{`( ขนาดธุรกิจ ​${from.qualification_id} )`}}</p>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-2">
          <div>
            <p>คำนำหน้า</p>
            <Dropdown
              class="border w-full"
              v-model="from.prefix_name"
              :options="['นาย', 'นาง', 'นางสาว']"
              placeholder="เลือกคำนำหน้า"
            />
          </div>
          <div>
            <p>เพศ</p>
            <Dropdown
              class="border w-full"
              v-model="from.gender"
              :options="['ชาย', 'หญิง', 'ไม่ระบุ']"
              placeholder="เลือกเพศ"
            />
          </div>
          <div>
            <label for="first_name">ชื่อ</label>
            <input
              type="text"
              id="first_name"
              v-model="from.name"
              class="border border-gray-300 p-2 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none"
            />
          </div>
          <div>
            <label for="last_name">นามสกุล</label>
            <input
              type="text"
              id="last_name"
              v-model="from.last_name"
              class="border border-gray-300 p-2 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none"
            />
          </div>
          <div class="col-span-2">
            <label for="business_name">ชื่อทางธุรกิจ</label>
            <input
              type="text"
              id="business_name"
              v-model="from.business_name"
              class="border border-gray-300 p-2 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none"
            />
          </div>
          <div class="col-span-2">
            <label for="birth_date">วันเกิด</label>
            <div id="birth_date" class="flex justify-between gap-2">
              <Dropdown
                class="border w-full"
                v-model="user.birth_day"
                :options="days"
                placeholder="วัน"
              />
              <Dropdown
                class="border w-full"
                v-model="user.birth_month"
                :options="months"
                optionLabel="name"
                optionValue="value"
                placeholder="เดือน"
              />
              <Dropdown
                class="border w-full"
                v-model="user.birth_year"
                :options="years()"
                optionLabel="name"
                optionValue="value"
                placeholder="ปี"
              />
            </div>
          </div>
          <div>
            <p>สัญชาติ</p>
            <Dropdown
              class="border w-full"
              v-model="from.nation_id"
              :options="regions"
              placeholder="เลือกสัญชาติ"
            />
          </div>
          <div class="relative">
            <label for="id_number">เลขบัตรประชาชน</label>
            <input
              minlength="13"
              maxlength="13"
              type="text"
              id="id_number"
              v-model="from.id_card"
              class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none"
            />
            <small v-if="from.id_card?.length != 13" class="text-red-500"
              >*กรุณากรอกเลขบัตรประชาชนให้ครบ 13 หลัก</small
            >
          </div>
          <div>
            <label for="phone">โทรศัพท์</label>
            <input
              minlength="10"
              maxlength="10"
              type="text"
              id="phone"
              v-model="from.phone"
              class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none"
            />
            <small v-if="from.phone?.length != 10" class="text-red-500"
              >*กรุณากรอกเบอร์โทรให้ครบ 10 หลัก</small
            >
          </div>
          <div>
            <label for="email"
              >E-mail
              <span class="text-gray-400 text-xs font-normal"
                >(ไม่จำเป็นต้องกรอก)</span
              ></label
            >
            <input
              type="text"
              id="email"
              v-model="from.email"
              class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none"
            />
          </div>
          <div>
            <label for="line_id" class="truncate"
              >Line ID
              <span class="text-gray-400 text-xs font-normal"
                >(ไม่จำเป็นต้องกรอก)</span
              ></label
            >
            <input
              type="text"
              id="line_id"
              v-model="from.line_id"
              class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none"
            />
          </div>
          <div>
            <label for="facebook" class="truncate"
              >Facebook
              <span class="text-gray-400 text-xs font-normal"
                >(ไม่จำเป็นต้องกรอก)</span
              ></label
            >
            <input
              type="text"
              id="facebook"
              v-model="from.facebook"
              class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none"
            />
          </div>
        </div>
      </div>
      <div class="w-full mt-8">
        <div class="p-2 bg-purple-200 rounded-xl">
          <p>ที่อยู่ตามบัตรประชาชน</p>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-2">
          <div>
            <label for="address">ที่อยู่</label>
            <input
              type="text"
              id="address"
              v-model="address.address"
              class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none"
            />
          </div>
          <div>
            <label for="moo">หมู่ที่</label>
            <input
              type="text"
              id="moo"
              v-model="address.moo"
              class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none"
            />
          </div>
          <div>
            <label for="soi">ซอย</label>
            <input
              type="text"
              id="soi"
              v-model="address.soi"
              class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none"
            />
          </div>
          <div>
            <label for="road">ถนน</label>
            <input
              type="text"
              id="road"
              v-model="address.road"
              class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none"
            />
          </div>
          <div>
            <label for="province">จังหวัด</label>
            <AutoComplete
              inputId="province"
              dropdownClass="bg-purple-200"
              inputClass="border"
              v-model="selected_province"
              optionLabel="name_th"
              dropdown
              :suggestions="provinces"
              @complete="searchProvince"
            />
          </div>
          <div>
            <label for="district">เขต/อำเภอ</label>
            <AutoComplete
              :disabled="!selected_province"
              inputId="district"
              dropdownClass="bg-purple-200"
              inputClass="border"
              v-model="selected_district"
              optionLabel="name_th"
              dropdown
              :suggestions="districts"
              @complete="searchDistrict"
            />
          </div>
          <div>
            <label for="subdistrict">แขวง/ตำบล</label>
            <AutoComplete
              :disabled="!selected_district"
              inputId="subdistrict"
              dropdownClass="bg-purple-200"
              inputClass="border"
              v-model="selected_subdistrict"
              optionLabel="name_th"
              dropdown
              :suggestions="subdistricts"
              @complete="searchSubDistrict"
            />
          </div>
          <div>
            <label for="zipcode">รหัสไปรษณีย์</label>
            <input
              disabled
              type="text"
              id="zipcode"
              v-model="address.zipcode"
              class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none"
            />
          </div>
          <div class="">
            <label for="address_phone">เบอร์มือถือ</label>
            <input
              type="text"
              id="address_phone"
              v-model="address.phone"
              class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none"
            />
          </div>
          <div class="col-span-2">
            <label for="upload_idcard"
              >อัพโหลดรูปบัตรประชาชน
              <span
                v-if="upload.id_card"
                class="ml-2 text-white bg-green-500 rounded px-1"
                >เลือกไฟล์แล้ว</span
              ></label
            >
            <input
              @change="handleUploadIdCard"
              type="file"
              id="upload_idcard"
              :class="upload.id_card ? 'border-green-500' : ''"
              class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none"
            />
          </div>
        </div>
      </div>
      <div class="w-full mt-8">
        <div class="p-2 bg-purple-200 rounded-xl flex items-center gap-5">
          <p>ที่อยู่จัดส่ง</p>
          <div class="flex items-center gap-2">
            <Checkbox v-model="useLikeAddress" :binary="true" />
            <label for="useLikeAddress" class="text-purple-700"
              >ใช้ที่อยู่เดียวกับที่อยู่ตามบัตรประชาชน</label
            >
          </div>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-2">
          <div>
            <label for="address">ที่อยู่</label>
            <input
              type="text"
              id="address"
              v-model="delivery_address.address"
              class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none"
            />
          </div>
          <div>
            <label for="moo">หมู่ที่</label>
            <input
              type="text"
              id="moo"
              v-model="delivery_address.moo"
              class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none"
            />
          </div>
          <div>
            <label for="soi">ซอย</label>
            <input
              type="text"
              id="soi"
              v-model="delivery_address.soi"
              class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none"
            />
          </div>
          <div>
            <label for="road">ถนน</label>
            <input
              type="text"
              id="road"
              v-model="delivery_address.road"
              class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none"
            />
          </div>
          <div>
            <label for="province">จังหวัด</label>
            <AutoComplete
              inputId="province"
              dropdownClass="bg-purple-200"
              inputClass="border"
              v-model="d_selected_province"
              optionLabel="name_th"
              dropdown
              :suggestions="d_provinces"
              @complete="dsearchProvince"
            />
          </div>
          <div>
            <label for="district">เขต/อำเภอ</label>
            <AutoComplete
              :disabled="!d_selected_province || useLikeAddress"
              inputId="district"
              dropdownClass="bg-purple-200"
              inputClass="border"
              v-model="d_selected_district"
              optionLabel="name_th"
              dropdown
              :suggestions="d_districts"
              @complete="dsearchDistrict"
            />
          </div>
          <div>
            <label for="subdistrict">แขวง/ตำบล</label>
            <AutoComplete
              :disabled="!d_selected_district || useLikeAddress"
              inputId="subdistrict"
              dropdownClass="bg-purple-200"
              inputClass="border"
              v-model="d_selected_subdistrict"
              optionLabel="name_th"
              dropdown
              :suggestions="d_subdistricts"
              @complete="dsearchSubDistrict"
            />
          </div>
          <div>
            <label for="zipcode">รหัสไปรษณีย์</label>
            <input
              disabled
              type="text"
              id="zipcode"
              v-model="delivery_address.zipcode"
              class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none"
            />
          </div>
          <div class="">
            <label for="address_phone">เบอร์มือถือ</label>
            <input
              type="text"
              id="address_phone"
              v-model="delivery_address.phone"
              class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none"
            />
          </div>
        </div>
      </div>
      <div class="w-full mt-5">
        <div class="p-2 bg-purple-200 rounded-xl">
          <p>ข้อมูลบัญชีธนาคารเพื่อรับรายได้</p>
          <div class="flex items-center gap-3">
            <span class="pi pi-exclamation-triangle text-purple-700"></span>
            <p class="text-sm text-purple-700">
              สมาชิกจะใส่หรือไม่ใส่ก็ได้
              หากไม่ได้ใส่จะมีผลกับการโอนเงินให้สมาชิก
            </p>
          </div>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-2">
          <div>
            <p>ธนาคาร</p>
            <Dropdown
              inputId="bank_provider"
              optionLabel="name"
              optionValue="id"
              class="border w-full"
              v-model="bank.id"
              :options="bankProviders"
              placeholder="เลือกธนาคาร"
            />
          </div>
          <div>
            <label for="bank_branch">สาขา</label>
            <input
              type="text"
              id="bank_branch"
              v-model="bank.branch"
              class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none"
            />
          </div>
          <div>
            <label for="bank_number">เลขที่บัญชี</label>
            <input
              type="text"
              id="bank_number"
              v-model="bank.number"
              class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none"
            />
          </div>
          <div>
            <label for="bank_holder">ชื่อบัญชี</label>
            <input
              type="text"
              id="bank_holder"
              v-model="bank.account_name"
              class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none"
            />
          </div>
          <div class="col-span-2">
            <label for="upload_bookbank"
              >อัพโหลดรูปหน้าบัญชีธนาคาร
              <span
                v-if="upload.bookbank"
                class="ml-2 text-white bg-green-500 rounded px-1"
                >เลือกไฟล์แล้ว</span
              ></label
            >
            <input
              @change="handleUploadBookbank"
              type="file"
              id="upload_bookbank"
              :class="upload.bookbank ? 'border-green-500' : ''"
              class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none"
            />
          </div>
        </div>
      </div>
      <div class="w-full mt-5">
        <div class="p-2 bg-purple-200 rounded-xl">
          <p>ผู้รับผลประโยชน์</p>
          <div class="flex items-center gap-3">
            <span class="pi pi-exclamation-triangle text-purple-700"></span>
            <p class="text-sm text-purple-700">
              ถ้าไม่กรอกถือว่าผู้รับผลประโยชน์จะเป็นผู้รับผลประโยชน์ตามกฎหมาย
            </p>
          </div>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-2">
          <div>
            <label for="valuable_firstname">ชื่อ</label>
            <input
              type="text"
              id="valuable_firstname"
              v-model="valuable.first_name"
              class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none"
            />
          </div>
          <div>
            <label for="valuable_lastname">นามสกุล</label>
            <input
              type="text"
              id="valuable_lastname"
              v-model="valuable.last_name"
              class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none"
            />
          </div>
          <div>
            <label for="valuable_relation">เกี่ยวข้องเป็น</label>
            <input
              type="text"
              id="valuable_relation"
              v-model="valuable.relation"
              class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none"
            />
          </div>
        </div>
      </div>
      <div class="w-full mt-10 border-t pt-10 flex justify-center">
        <button
          @click="sendRegisterHandler"
          class="font-semibold leading-none text-white py-4 px-10 bg-[#8B2FC9] rounded-lg hover:bg-[#E178C5] focus:ring-2 focus:ring-offset-2 focus:ring-[#8B2FC9] focus:outline-none"
        >
          บันทึกข้อมูล
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import Swal from "sweetalert2";
import { ref, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import UserRegisterTermDialog from "@/components/UI/UserRegisterTermDialog.vue";

onMounted(async() => {
  getMyData();
  
  await Promise.all([
    fetchProvinces(),
    fetchDistricts(),
    fetchSubDistricts(),
  ])
  getMyAddress();
});

const store = useStore();
const router = useRouter();
const isLoading = ref(false);
const visibleTerms = ref(false);
const upload = ref({});
const bank = ref({});
const valuable = ref({});

const handleUploadIdCard = (e) => {
  upload.value.id_card = e.target.files[0];
};

const handleUploadBookbank = (e) => {
  upload.value.bookbank = e.target.files[0];
};

const from = ref({});
const getMyData = async() => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${process.env.VUE_APP_MARUEY}${store.getters.me.id}/me`);
    const userData = res.data.data[0];
    from.value = {...userData};
  } catch(err) {
    from.value = {};
  } finally {
    isLoading.value = false;
    console.log(from.value);
  }
};
const address = ref({});
const getMyAddress = async() => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${process.env.VUE_APP_MARUEY}${store.getters.me.id}/address`);
    const userAddress = res.data.data[0];

    address.value = {...userAddress};
    const province = provinceRef.value.find(pro => pro.code+"" === address.value.province+"");
    selected_province.value = province
    selected_district.value = districtRef.value.find(dis => dis.code+"" === address.value.district+"")
    selected_subdistrict.value = subdistrictRef.value.find(sub => sub.id+"" === address.value.tambon+"")
  } catch(err) {
    console.log(err)
  } finally {
    isLoading.value = false;
    console.log(selected_subdistrict.value);
    console.log(address.value.tambon)
  }
};
const user = ref({
  nation_id: "ไทย",
});
const qualification_list = ref([
  {
    id: 1,
    name: "MB",
    pv: 20,
  },
  {
    id: 2,
    name: "MO",
    pv: 400,
  },
  {
    id: 3,
    name: "VIP",
    pv: 800,
  },
  {
    id: 4,
    name: "VVIP",
    pv: 1200,
  },
]);

const days = ref([
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
]);

const months = ref([
  {
    name: "มกราคม",
    value: 1,
  },
  {
    name: "กุมภาพันธ์",
    value: 2,
  },
  {
    name: "มีนาคม",
    value: 3,
  },
  {
    name: "เมษายน",
    value: 4,
  },
  {
    name: "พฤษภาคม",
    value: 5,
  },
  {
    name: "มิถุนายน",
    value: 6,
  },
  {
    name: "กรกฎาคม",
    value: 7,
  },
  {
    name: "สิงหาคม",
    value: 8,
  },
  {
    name: "กันยายน",
    value: 9,
  },
  {
    name: "ตุลาคม",
    value: 10,
  },
  {
    name: "พฤศจิกายน",
    value: 11,
  },
  {
    name: "ธันวาคม",
    value: 12,
  },
]);

const years = () => {
  const currentYear = new Date().getFullYear() - 18; // Convert to Thai year
  const years = [];
  for (let i = currentYear; i >= 1947; i--) {
    years.push({
      name: i + 543,
      value: i,
    });
  }
  return years;
};

const regions = ref([
  "ไทย",
  "ลาว",
  "พม่า",
  "กัมพูชา",
  "เวียดนาม",
  "มาเลเซีย",
  "จีน",
  "สิงคโปร์",
  "บรูไน",
  "อินโดนีเซีย",
  "ฟิลิปปินส์",
  "อเมริกา",
  "ออสเตรเรีย",
  "เยอรมัน",
  "เบลเยี่ยม",
]);

const delivery_address = ref({});
const useLikeAddress = ref(false);
watch(useLikeAddress, () => {
  if (useLikeAddress.value) {
    delivery_address.value = address.value;
    d_selected_province.value = selected_province.value;
    d_selected_district.value = selected_district.value;
    d_selected_subdistrict.value = selected_subdistrict.value;
  } else {
    delivery_address.value = {};
    d_selected_province.value = null;
    d_selected_district.value = null;
    d_selected_subdistrict.value = null;
  }
});

// province
const selected_province = ref(null);
const d_selected_province = ref(null);
const provinces = ref([]);
const d_provinces = ref([]);
const provinceRef = ref([]);
const searchProvince = (event) => {
  let _items = [...provinceRef.value];
  provinces.value = event.query
    ? [..._items].filter((item) =>
        item.name_th.includes(selected_province.value)
      )
    : [..._items].map((item) => item);
};
const dsearchProvince = (event) => {
  let _items = [...provinceRef.value];
  d_provinces.value = event.query
    ? [..._items].filter((item) =>
        item.name_th.includes(d_selected_province.value)
      )
    : [..._items].map((item) => item);
};
const fetchProvinces = async () => {
  const { data } = await axios.get(
    `${process.env.VUE_APP_MLM}/dataset_changwat`
  );
  //console.log(data)
  if (data.status === "success") {
    provinceRef.value = data.data.filter((x) => x.status === 0);
  }
};
/*watch(selected_province, () => {
  if (selected_province.value) {
    selected_district.value = null;
    selected_subdistrict.value = null;
  }
});*/

// district
const selected_district = ref(null);
const d_selected_district = ref(null);
const districts = ref([]);
const d_districts = ref([]);
const districtRef = ref([]);
const districtOptions = computed(() => {
  return selected_province.value
    ? districtRef.value.filter(
        (x) => x.changwat_id + "" === selected_province.value.id + ""
      )
    : [];
});
const d_districtOptions = computed(() => {
  return d_selected_province.value
    ? districtRef.value.filter(
        (x) => x.changwat_id + "" === d_selected_province.value.id + ""
      )
    : [];
});
const searchDistrict = (event) => {
  let _items = [...districtOptions.value];
  districts.value = event.query
    ? [..._items].filter((item) =>
        item.name_th.includes(selected_district.value)
      )
    : [..._items].map((item) => item);
};
const dsearchDistrict = (event) => {
  let _items = [...d_districtOptions.value];
  d_districts.value = event.query
    ? [..._items].filter((item) =>
        item.name_th.includes(d_selected_district.value)
      )
    : [..._items].map((item) => item);
};
const fetchDistricts = async () => {
  const { data } = await axios.get(
    `${process.env.VUE_APP_MLM}/dataset_amphuress`
  );
  //console.log(data)
  if (data.status === "success") {
    districtRef.value = data.data.filter((x) => x.status === 0);
  }
};
/*watch(selected_district, () => {
  if (selected_district.value) {
    selected_subdistrict.value = null;
  }
});*/

// subdistrict
const selected_subdistrict = ref(null);
const d_selected_subdistrict = ref(null);
const subdistricts = ref([]);
const d_subdistricts = ref([]);
const subdistrictRef = ref([]);
const subdistrictOptions = computed(() => {
  if (!selected_district.value) return [];
  return subdistrictRef.value.filter(
    (x) => x.amphure_id == selected_district.value.id
  );
});
const d_subdistrictOptions = computed(() => {
  if (!d_selected_district.value) return [];
  return subdistrictRef.value.filter(
    (x) => x.amphure_id == d_selected_district.value.id
  );
});
const searchSubDistrict = (event) => {
  let _items = [...subdistrictOptions.value];
  subdistricts.value = event.query
    ? [..._items].filter((item) =>
        item.name_th.includes(selected_subdistrict.value)
      )
    : [..._items].map((item) => item);
};

const dsearchSubDistrict = (event) => {
  let _items = [...d_subdistrictOptions.value];
  d_subdistricts.value = event.query
    ? [..._items].filter((item) =>
        item.name_th.includes(d_selected_subdistrict.value)
      )
    : [..._items].map((item) => item);
};
const fetchSubDistricts = async () => {
  const { data } = await axios.get(`${process.env.VUE_APP_MLM}/dataset_tambon`);
  //console.log(data)
  if (data.status === "success") {
    subdistrictRef.value = data.data.filter((x) => x.status === 0);
  }
};

watch(selected_subdistrict, () => {
  if (selected_subdistrict.value) {
    address.value.zipcode = selected_subdistrict.value.zip_code;
  }
});
watch(d_selected_subdistrict, () => {
  if (d_selected_subdistrict.value) {
    delivery_address.value.zipcode = d_selected_subdistrict.value.zip_code;
  }
});

const bankProviders = ref([
  {
    id: 1,
    name: "กรุงเทพ (BANGKOK)",
  },
  {
    id: 4,
    name: "กสิกรไทย (KASIKORN)",
  },
  {
    id: 2,
    name: "กรุงไทย (KRUNG THAI)",
  },
  {
    id: 7,
    name: "ไทยพาณิชย์ (SIAM COMMERCIAL)",
  },
  {
    id: 3,
    name: "ธนาคารกรุงศรีอยุธยา (AYUDHAYA)",
  },
  {
    id: 12,
    name: "ธนาคารทหารไทยธนชาต",
  },
  {
    id: 8,
    name: "ธกส",
  },
  {
    id: 9,
    name: "ออมสิน (THE GOVERNMENT SAVING)",
  },
  {
    id: 10,
    name: "ธอส",
  },
  {
    id: 11,
    name: "อิสรามแห่งประเทศไทย (ISLAMIC OF THAILAND)",
  },
  {
    id: 5,
    name: "ซีไอเอ็มบี ไทย (CIMB THAI)",
  },
]);

const checkValidation = () => {
  if (!from.value.qualification_id) {
    Swal.fire({
      icon: "error",
      title: "กรุณาตรวจสอบข้อมูล",
      text: "กรุณากรอกตำแหน่งทางธุรกิจ",
      showConfirmButton: false,
      timer: 3000,
    });
    return;
  }
  if (!from.value.name) {
    Swal.fire({
      icon: "error",
      title: "กรุณาตรวจสอบข้อมูล",
      text: "กรุณากรอกชื่อจริง",
      showConfirmButton: false,
      timer: 3000,
    });
    return;
  }
  if (!from.value.last_name) {
    Swal.fire({
      icon: "error",
      title: "กรุณาตรวจสอบข้อมูล",
      text: "กรุณากรอกนามสกุล",
      showConfirmButton: false,
      timer: 3000,
    });
    return;
  }
  if (!from.value.business_name) {
    Swal.fire({
      icon: "error",
      title: "กรุณาตรวจสอบข้อมูล",
      text: "กรุณากรอกชื่อทางธุรกิจ",
      showConfirmButton: false,
      timer: 3000,
    });
    return;
  }
  if (!from.value.id_card || from.value.id_card?.length != 13) {
    Swal.fire({
      icon: "error",
      title: "กรุณาตรวจสอบข้อมูล",
      text: "กรุณาตรวจสอบเลขบัตรประชาชน",
      showConfirmButton: false,
      timer: 3000,
    });
    return;
  }
  if (!from.value.phone || from.value.phone?.length < 10) {
    Swal.fire({
      icon: "error",
      title: "กรุณาตรวจสอบข้อมูล",
      text: "กรุณาตรวจสอบเบอร์โทรศัพท์",
      showConfirmButton: false,
      timer: 3000,
    });
    return;
  }
  if (!upload.value.id_card) {
    Swal.fire({
      icon: "error",
      title: "กรุณาตรวจสอบข้อมูล",
      text: "กรุณาเพิ่มรูปบัตรประชาชน",
      showConfirmButton: false,
      timer: 3000,
    });
    return;
  }
  if (!address.value.zipcode) {
    Swal.fire({
      icon: "error",
      title: "กรุณาตรวจสอบข้อมูล",
      text: "กรุณากรอกที่อยู่ตามบัตรให้ครบถ้วน",
      showConfirmButton: false,
      timer: 3000,
    });
    return;
  }
  if (!delivery_address.value.zipcode) {
    Swal.fire({
      icon: "error",
      title: "กรุณาตรวจสอบข้อมูล",
      text: "กรุณากรอกที่อยู่จัดส่งให้ครบถ้วน",
      showConfirmButton: false,
      timer: 3000,
    });
    return;
  }
  if (!bank.value.id) {
    Swal.fire({
      icon: "error",
      title: "กรุณาตรวจสอบข้อมูล",
      text: "กรุณาเลือกบัญชีธนาคาร",
      showConfirmButton: false,
      timer: 3000,
    });
    return;
  }
  if (!bank.value.number) {
    Swal.fire({
      icon: "error",
      title: "กรุณาตรวจสอบข้อมูล",
      text: "กรุณากรอกเลขบัญชีธนาคาร",
      showConfirmButton: false,
      timer: 3000,
    });
    return;
  }
  if (!bank.value.branch) {
    Swal.fire({
      icon: "error",
      title: "กรุณาตรวจสอบข้อมูล",
      text: "กรุณากรอกสาขาบัญชีธนาคาร",
      showConfirmButton: false,
      timer: 3000,
    });
    return;
  }
  if (!bank.value.account_name) {
    Swal.fire({
      icon: "error",
      title: "กรุณาตรวจสอบข้อมูล",
      text: "กรุณากรอกชื่อเจ้าของบัญชี",
      showConfirmButton: false,
      timer: 3000,
    });
    return;
  }
  if (!upload.value.bookbank) {
    Swal.fire({
      icon: "error",
      title: "กรุณาตรวจสอบข้อมูล",
      text: "กรุณาเพิ่มรูปหน้าบัญชีธนาคาร",
      showConfirmButton: false,
      timer: 3000,
    });
    return;
  } else {
    return true;
  }
};

const sendRegisterHandler = () => {
  const validatePass = checkValidation();
  if (!validatePass) return;
  visibleTerms.value = true;
};

const sendRegister = async () => {
  isLoading.value = true;
  const formdata = new FormData();
  // introducer
  formdata.append("sponser", from.value.introduce_id);

  // qualification
  //formdata.append("sizebusiness", "MC");
  //formdata.append("pv", user.value.pv);

  // main info
  formdata.append("prefix_name", from.value.prefix_name);
  formdata.append("gender", from.value.gender);
  formdata.append("first_name", from.value.first_name);
  formdata.append("first_name", from.value.name);
  formdata.append("last_name", from.value.last_name);
  formdata.append(
    "name",
    `${from.value.prefix_name || ""}${from.value.first_name || ""}`
  );
  formdata.append("business_name", from.value.business_name);
  formdata.append(
    "birth_day",
    `${from.value.birth_year || 1947}-${from.value.birth_month || 1}-${
      from.value.birth_day || 1
    }`
  );
  formdata.append("day", `${from.value.birth_day || 1}`);
  formdata.append("month", `${from.value.birth_month || 1}`);
  formdata.append("year", `${from.value.birth_year || 1947}`);
  formdata.append("nation_id", from.value.nation_id);
  formdata.append("id_card", from.value.id_card);

  // contract
  formdata.append("email", from.value.email || "-");
  formdata.append("phone", from.value.phone);
  formdata.append("line_id", from.value.line_id || "-");
  formdata.append("facebook", from.value.facebook || "-");

  // address
  formdata.append("card_address", address.value.address);
  formdata.append("card_moo", address.value.moo);
  formdata.append("card_soi", address.value.soi || "-");
  formdata.append("card_road", address.value.road || "-");
  formdata.append("card_tambon", selected_subdistrict.value.id);
  formdata.append("card_district", selected_district.value.code);
  formdata.append("card_province", selected_province.value.code);
  formdata.append("card_zipcode", address.value.zipcode);
  formdata.append("card_phone", address.value.phone);

  // address img
  formdata.append("file_card", upload.value.id_card);

  // address delivery
  formdata.append("same_address", delivery_address.value.address);
  formdata.append("same_moo", delivery_address.value.moo);
  formdata.append("same_soi", delivery_address.value.soi);
  formdata.append("same_road", delivery_address.value.road);
  formdata.append("same_tambon", d_selected_subdistrict.value.id);
  formdata.append("same_district", d_selected_district.value.code);
  formdata.append("same_province", d_selected_province.value.code);
  formdata.append("same_zipcode", delivery_address.value.zipcode);
  formdata.append("same_phone", delivery_address.value.phone);
  formdata.append("same_status", useLikeAddress.value ? 1 : 2);

  // bank
  formdata.append("bank_name", bank.value.id);
  formdata.append("bank_branch", bank.value.branch);
  formdata.append("bank_no", bank.value.number);
  formdata.append("account_name", bank.value.account_name);

  // address img
  formdata.append("file_bank", upload.value.bookbank);

  // customer benefit
  formdata.append("name_benefit", valuable.value.first_name);
  formdata.append("last_name_benefit", valuable.value.last_name);
  formdata.append("involved", valuable.value.relation);

  try {
    /*const { data } = await axios.post(
      `${process.env.VUE_APP_MLM}/UpdateProfile`,
      formdata,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    //console.log(data)
    if (data.status === "success") {
      visibleTerms.value = false;
      data_result.value = {
        ...data.data_result,
        sizebusiness: user.value.qualification_id,
      };
      const queryString = new URLSearchParams(data_result.value).toString();
      router.push(`/customer/register-downline/success?${queryString}`);
    } else {
      Swal.fire({
        title: "กรุณาตรวจสอบข้อมูลอีกครั้ง",
        text: data.ms,
        icon: "error",
        confirmButtonColor: "#8B2FC9",
        confirmButtonText: "เข้าใจแล้ว",
      });
    }*/
   console.log([...formdata])
  } catch (error) {
    visibleTerms.value = false;
    //console.log(error)
    Swal.fire({
      title: "เกิดข้อผิดพลาดเล็กน้อย",
      text: "กรุณาตรวจสอบข้อมูลอีกครั้ง หรือติดต่อผู้ดูแลระบบ",
      icon: "error",
    });
  } finally {
    isLoading.value = false;
    visibleTerms.value = false;
  }
};

const data_result = ref({});
</script>

<style scoped>
/* HTML: <div class="loader"></div> */
.loader {
  width: 100px;
  aspect-ratio: 1;
  padding: 10px;
  box-sizing: border-box;
  display: grid;
  background: #fff;
  filter: blur(5px) contrast(10) hue-rotate(0deg);
  mix-blend-mode: darken;
}
.loader:before,
.loader:after {
  content: "";
  grid-area: 1/1;
  width: 40px;
  height: 40px;
  background: #ff34d3;
  animation: l7 2s infinite;
}
.loader:after {
  animation-delay: -1s;
}
@keyframes l7 {
  0% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(100%, 0);
  }
  50% {
    transform: translate(100%, 100%);
  }
  75% {
    transform: translate(0, 100%);
  }
  100% {
    transform: translate(0, 0);
  }
}
</style>
