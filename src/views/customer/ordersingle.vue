<template>
  <div class="h-full bg-[#f7f7f7] min-h-screen my-20">
    <div class="h-full mx-2 pb-20 py-3">
      <div
        class="lg:w-4/6 mx-2 md:mx-auto p-5 bg-[#fff] shadow border-t-2 border-[#8B2FC9]"
      >
        <div class="flex justify-between w-full">
          <div class="flex-grow text-base md:text-lg text-[#8B2FC9]">
            หมายเลขคำสั่งซื้อ #{{ order.code_order }}
          </div>
        </div>
        <div class="flex flex-col gap-2 mt-3">
          <div class="w-full text-sm">รหัสลูกค้า : {{ order?.customers_user_name }}</div>
          <div class="w-full text-xs text-gray-400">สั่งซื้อเมื่อ : {{ dateShortTH(order?.created_at) }}</div>
        </div>
        <div class="flex flex-col gap-2 mt-3">
          <div class="w-full text-sm">สถานะ : 
            <span class="bg-gray-300 px-2 rounded-lg">{{ getOrderStatus(order?.order_status_id_fk)?.detail }}</span>
          </div>
          <div class="w-full text-xs text-gray-400">อัพเดทเมื่อ : {{ dateShortTH(order?.updated_at) }}</div>
        </div>
      </div>

      <div class="mx-2 pt-5 bg-[#fff] shadow mt-5 pb-3">
        <div class="flex w-full px-5 pb-3">
          <div class="md:text-right md:flex-grow font-bold">รายละเอียดการจัดส่ง</div>
        </div>
        <div class="flex justify-between w-full px-5 pb-1">
          <p>
            ประเภทการจัดส่ง :
          </p>
          <p class="text-right text-gray-500">
            {{
              order.shipping_cost_name
            }}
          </p>
        </div>
        <div class="flex justify-between w-full px-5 pb-1">
          <p>
            ค่าจัดส่ง :
          </p>
          <p class="text-right text-gray-500">
            {{
              order.shipping_price
            }}
          </p>
        </div>
        <div class="flex justify-start w-full px-5 pb-1">
            <p class="w-fit min-w-fit mr-3">ที่อยู่จัดส่ง :</p>
            <article class="text-gray-500 break-words text-xs flex flex-wrap">
              <span class="mr-1">{{ order.house_no }}</span>
              <span class="mr-1">{{ order.moo ? `ม.${order.moo}` : '' }}</span>
              <span class="mr-1">{{ order.soi ? `ซ.${order.soi}` : '' }}</span>
              <span class="mr-1">{{ order.road ? `ถ.${order.road}` : '' }}</span>
              <span class="mr-1">ตำบล/เขต {{ order.tambon }}</span>
              <span class="mr-1">อำเภอ/แขวง {{ order.amphure }}</span>
              <span class="mr-1">จังหวัด {{ order.province }}</span>
              <span>{{ order.zipcode }}</span>
            </article>
        </div>
      </div>

      <div class="mx-2 mt-5 shadow mb-5 bg-white p-5">
        <p class="font-bold">รายการสินค้า <span class="ml-3 text-gray-400">x{{ products.length }} รายการ</span></p>
        <div class="flex flex-col divide-y-[1px] gap-2 mt-3 pt-3">
          <div v-for="(item, index) in products" :key="item.id" class="flex justify-between items-center gap-2 pt-2">
            <div class="flex items-start gap-2">
              <span class="text-sm">{{ index + 1 }}.</span>
              <div class="flex flex-col">
                <span class="text-sm">{{ item.product_name }}</span>
                <span class="text-xs text-gray-400"><span class="text-xs text-gray-400 mr-2">( {{ item.selling_price }}</span>x{{ item.amt }} )</span>
                <div class="flex items-center gap-2">
                  <span class="text-sm">รวม = {{ parseFloat(item.total_price)?.toLocaleString("en", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) }}.-</span>
                  <span class="ml-3 px-2 py-1 bg-yellow-300 text-xs rounded-lg text-black/75">PV {{ item.pv*item.amt }}</span>
                </div>
              </div>
            </div>
            <div class="h-10 w-10 border">
              <img v-if="item.product_image && !item.product_imageError" :src="item.product_image" :alt="index" class="w-full h-full object-cover" @error="item.product_imageError = true" >
            </div>
          </div>
        </div>
      </div>

      <div class="mx-2 pt-5 bg-[#fff] shadow">
        <div class="flex w-full px-5 pb-3">
          <div class="md:text-right md:flex-grow w-8/12">ราคาสินค้า</div>
          <div class="text-right md:w-2/12 w-4/12">
            {{
              order.product_value?.toLocaleString("en", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }}
          </div>
        </div>
        <div class="flex w-full px-5 pb-3">
          <div class="md:text-right md:flex-grow w-8/12">ภาษีมูลค่าเพิ่ม {{ order.tax?.replace('.00', ' %') }}</div>
          <div class="text-right md:w-2/12 w-4/12">
            {{
              order.tax_total?.toLocaleString("en", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }}
          </div>
        </div>
        <div class="flex w-full px-5 pb-3">
          <div class="md:text-right md:flex-grow w-8/12">รวมการสั่งซื้อ</div>
          <div class="text-right md:w-2/12 w-4/12">
            {{
              order.sum_price?.toLocaleString("en", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }}
          </div>
        </div>
        <div class="flex justify-between w-full px-5 pb-3">
          <div class="">
            ส่วนลด
            <span class="text-xs text-stone-500">(โบนัสลด {{ order.bonus_percent?.replace('.00', ' %') }} ของยอด PV)</span>
          </div>
          <p class="text-right">
            - {{
              order.discount
            }}
          </p>
        </div>
        <div class="flex justify-between w-full px-5 pb-3">
          <div class="">
            ค่าจัดส่ง
            <span class="text-sm text-stone-500">({{ order.shipping_cost_name }})</span>
          </div>
          <p class="text-right">
            {{
              order.shipping_price
            }}
          </p>
        </div>
        <div class="flex w-full px-5 pb-3">
          <div class="md:text-right md:flex-grow w-8/12">ยอดสุทธิ</div>
          <div class="text-right md:w-2/12 w-4/12">
            {{
              order.total_price?.toLocaleString("en", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }}
          </div>
        </div>
      </div>

      <div class="md:w-4/6 mx-2 md:mx-auto mt-5 shadow mb-10">
        <button
          class="bg-[#8B2FC9] hover:bg-[#8f44c2] text-white px-3 py-3 rounded-md w-full"
          @click="router.push('/customer/order')"
        >
          กลับหน้าออเดอร์
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { ref, onMounted, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { useRoute, useRouter } from "vue-router";

import "dayjs/locale/th";
//import buddhistEra from "dayjs/plugin/buddhistEra";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
//dayjs.extend(buddhistEra);

const store = useStore();
const toast = useToast();
const confirm = useConfirm();
const route = useRoute();
const router = useRouter();
const isLoading = ref(false);
const token = ref("Bearer " + localStorage.getItem("token"));

const dateShortTH = (date) => {
  // Parse the date in UTC, then convert to "Asia/Bangkok" timezone
  let parsedDate = dayjs.utc(date).tz("Asia/Bangkok");

  // Manually adjust hours (subtract 7 hours if necessary)
  parsedDate = parsedDate.subtract(7, 'hour'); // You can adjust this value if needed

  // Convert to Buddhist Era year (Add 543 years)
  const buddhistYear = parsedDate.year() + 543;

  // Return the formatted date string with the Buddhist Era year
  return parsedDate.format(`MM/DD/${buddhistYear} HH:mm`);
};

onMounted(async () => {
  document.title = "ดูออเดอร์ || Maruey";
  isLoading.value = true;
  await Promise.all([
    getprovince(),
    getAmphures(),
    getTambons(),
    fetchOrderStatus()
  ])
  await getorder();
  isLoading.value = false;
});

const optionprovince = ref([])
const getprovince = async () => {
  const config = {
    method: "get",
    url: `${process.env.VUE_APP_MLM}/dataset_changwat`,
  };
  await axios(config)
    .then((res) => {
      optionprovince.value = res.data.data;
    })
    .catch((err) => {
      //console.log(err);
    });
};
const optionamphure = ref([]);
const getAmphures = async () => {
  const config = {
    method: "get",
    url: `${process.env.VUE_APP_MLM}/dataset_amphuress`,
  };
  await axios(config)
    .then((res) => {
      optionamphure.value = res.data?.data;
    })
    .catch((err) => {
      //console.log(err);
    });
};
const optiontambon = ref([]);
const getTambons = async () => {
  const config = {
    method: "get",
    url: `${process.env.VUE_APP_MLM}/dataset_tambon`,
  };
  await axios(config)
    .then((res) => {
      optiontambon.value = res.data?.data;
    })
    .catch((err) => {
      //console.log(err);
    });
};

const orderStatuses = ref([]);
const fetchOrderStatus = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.VUE_APP_MARUEY}order-status`
    );
    //console.log(data);
    orderStatuses.value = data.data;
  } catch (err) {
    //console.log(err);
  }
};

const getOrderStatus = (status) => {
  const result = orderStatuses.value.find(
    (x) => x.orderstatus_id + "" === status + ""
  );
  return result;
};

const order = ref({});
const products = ref([]);
const getorder = async () => {
  isLoading.value = true;
  const config = {
    method: "get",
    headers: {
      token: token.value,
    },
    url: `${process.env.VUE_APP_MARUEY}orders/${route.params.order_id}`,
  };
  await axios(config)
    .then(async(res) => {
      order.value = res.data?.data;
      products.value = res.data?.products;
      await Promise.all(products.value.map( async (x) => {
        await getProductDetail(x)
      }))
      order.value.province = optionprovince.value.find(
        (x) => x.code + "" === order.value.province_id + ""
      )?.name_th
      order.value.amphure = optionamphure.value.find(
        (x) => x.code + "" === order.value.district_id + ""
      )?.name_th
      order.value.tambon = optiontambon.value.find(
        (x) => x.id + "" === order.value.tambon_id + ""
      )?.name_th
      //console.log(order.value)
    })
    .catch((err) => {
      //console.log(err);
    });
  isLoading.value = false;
};

const getProductDetail = async (product) => {
  try {
    const { data } = await axios.get(`${process.env.VUE_APP_MLM}/productDetail?product_id=${product.product_id_fk}`)
    product.product_image = data.data.full_image_url
    ////console.log(data)
  }
  catch(err) {
    //console.log(err)
  }
}

</script>
<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
@import "@/assets/Loading.css";
</style>
