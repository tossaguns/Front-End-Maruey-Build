<template>
  <div class="h-full bg-[#f7f7f7] min-h-screen relative">
    <div
      v-if="isLoading"
      class="!bg-gradient-to-br z-[1000] absolute w-full min-h-screen py-20 h-full from-[#745abd] to-[#9540ce]"
    >
      <div class="text-white flex justify-center items-center mt-20">
        <div class="text-center flex flex-col items-center gap-3">
          <div class="loader my-10"></div>
          <p class="text-xl opacity-50">กรุณารอซักครู่ . . .</p>
        </div>
      </div>
    </div>
    <div class="h-full mx-2 pt-20 pb-20 ">
      <div
        class="lg:w-4/6 mx-2 md:mx-auto p-5 bg-[#fff] shadow border-t-2 border-[#8B2FC9]"
      >
        <div class="flex justify-between w-full">
          <div class="flex-grow text-base md:text-lg text-[#8B2FC9]">
            หมายเลขคำสั่งซื้อ #{{ order.code }}
          </div>
        </div>
        <div class="flex flex-col gap-2 mt-3">
          <div class="w-full text-sm">
            รหัสลูกค้า : {{ order?.buyer_username }}
          </div>
          <div class="w-full text-xs text-gray-400">
            สั่งซื้อเมื่อ : {{ dateShortTH(order?.createdAt) }}
          </div>
        </div>
        <div class="flex flex-col gap-2 mt-3">
          <div class="w-full text-sm">
            สถานะ :
            <span
              class="px-2 rounded-lg"
              :class="getpOrderClass(order?.status)"
              >{{ getpOrderStatus(order?.status) }}</span
            >
          </div>
          <div class="w-full text-xs text-gray-400">
            อัพเดทเมื่อ : {{ dateShortTH(order?.updatedAt) }}
          </div>
        </div>
      </div>

      <div class="mx-2 pt-5 bg-[#fff] shadow mt-5 pb-3">
        <div class="flex w-full px-5 pb-3">
          <div class="md:text-right md:flex-grow font-bold">
            รายละเอียดการจัดส่ง
          </div>
        </div>
        <div class="flex justify-between w-full px-5 pb-1">
          <p>ประเภทการจัดส่ง :</p>
          <p class="text-right text-gray-500">
            จัดส่ง ({{ order.delivery_provider }})
          </p>
        </div>
        <div class="flex justify-between w-full px-5 pb-1">
          <p>เลขติดตามพัสดุ :</p>
          <p class="text-right text-gray-500">
            {{ order.tracking_no || "-" }}
          </p>
        </div>
        <div class="flex justify-between w-full px-5 pb-1">
          <p>ค่าจัดส่ง :</p>
          <p class="text-right text-gray-500">
            {{ order.delivery_price || "ฟรี" }}
          </p>
        </div>
        <div class="flex justify-start w-full px-5 pb-1">
          <p class="w-fit min-w-fit mr-3">ที่อยู่จัดส่ง :</p>
          <article class="text-gray-500 break-words text-xs flex flex-wrap">
            <span class="mr-1">{{ order.to_address?.address }}</span>
            <span class="mr-1">{{
              order.to_address?.moo ? `ม.${order.to_address?.moo}` : ""
            }}</span>
            <span class="mr-1">{{
              order.to_address?.soi ? `ซ.${order.to_address?.soi}` : ""
            }}</span>
            <span class="mr-1">{{
              order.to_address?.road ? `ถ.${order.to_address?.road}` : ""
            }}</span>
            <span class="mr-1">ตำบล/เขต {{ order.to_address?.tambon }}</span>
            <span class="mr-1">อำเภอ/แขวง {{ order.to_address?.amphure }}</span>
            <span class="mr-1">จังหวัด {{ order.to_address?.province }}</span>
            <span>{{ order.to_address?.zipcode }}</span>
          </article>
        </div>
      </div>

      <div class="mx-2 mt-5 shadow mb-5 bg-white p-5">
        <p class="font-bold">
          รายการสินค้า
          <span class="ml-3 text-gray-400">x{{ products.length }} รายการ</span>
        </p>
        <div class="flex flex-col divide-y-[1px] gap-2 mt-3 pt-3">
          <div
            v-for="(item, index) in products"
            :key="item.id"
            class="flex justify-between items-center gap-2 pt-2"
          >
            <div class="flex items-start gap-2">
              <span class="text-sm">{{ index + 1 }}.</span>
              <div class="flex flex-col">
                <span class="text-sm">{{ item.product_name }}</span>
                <span class="text-xs text-gray-400"
                  ><span class="text-xs text-gray-400 mr-2"
                    >( {{ item.product_price }}</span
                  >x{{ item.product_qty }} )</span
                >
                <div class="flex items-center gap-2">
                  <span class="text-sm"
                    >รวม =
                    {{
                      parseFloat(item.product_totalprice)?.toLocaleString(
                        "en",
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )
                    }}</span
                  >
                  <span
                    class="ml-3 px-2 py-1 bg-yellow-300 text-xs rounded-lg text-black/75"
                    >PV {{ item.product_totalpv }}</span
                  >
                </div>
              </div>
            </div>
            <div class="h-14 w-14 border">
              <Image
                v-if="item.product_image && !item.product_imageError"
                preview
                :src="item.product_image"
                :alt="index"
                imageClass="w-full h-full object-cover"
                class="w-full h-full object-cover"
                @error="item.product_imageError = true"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="mx-2 pt-5 bg-[#fff] shadow">
        <div class="flex w-full px-5 pb-3">
          <div class="md:text-right md:flex-grow w-8/12">ราคาสินค้า</div>
          <div class="text-right md:w-2/12 w-4/12">
            {{
              order.total_product_price?.toLocaleString("en", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }}
          </div>
        </div>
        <div class="flex justify-between w-full px-5 pb-3">
          <div class="">
            ส่วนลด
            <span class="text-xs text-stone-500">(โบนัส)</span>
          </div>
          <p class="text-right">
            -
            {{
              order.total_discount?.toLocaleString("en", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }}
          </p>
        </div>
        <div class="flex w-full px-5 pb-3">
          <div class="md:text-right md:flex-grow w-8/12">รวมการสั่งซื้อ</div>
          <div class="text-right md:w-2/12 w-4/12">
            {{
              order.net_price?.toLocaleString("en", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }}
          </div>
        </div>

        <div class="flex justify-between w-full px-5 pb-3">
          <div class="">ค่าจัดส่ง</div>
          <p class="text-right">
            {{ order.delivery_price || "ฟรี" }}
          </p>
        </div>
        <div class="flex w-full px-5 pb-3">
          <div class="md:text-right md:flex-grow w-8/12">ยอดสุทธิ</div>
          <div class="text-right md:w-2/12 w-4/12">
            {{
              order.net_price?.toLocaleString("en", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }}
          </div>
        </div>
      </div>

      <div class="mx-2 mt-5 shadow" v-if="order.status === 2">
        <button
          class="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-3 rounded-md w-full"
          @click="comfirmOrderHandle"
        >
          ยืนยันรับสินค้า
        </button>
      </div>

      <div class="mx-2 mt-5 shadow">
        <button
          class="border-[#8B2FC9] hover:bg-[#8f44c2] text-[#8f44c2] border px-3 py-3 rounded-md w-full"
          @click="router.push('/customer/order')"
        >
          <span class="pi pi-chevron-left pr-3"></span>กลับหน้าออเดอร์
        </button>
      </div>
    </div>
    <Dialog v-model:visible="visibleConfirm" header=" ">
      <div class="mt-5">
        <div class="flex flex-col items-center justify-center">
          <p class="font-bold">ต้องการยืนยันว่ารับสินค้านี้หรือไม่ ?</p>
          <p>#{{ order.code }}</p>
        </div>
        <div class="flex gap-2 items-center my-3">
          <Checkbox
            id="confirmProduct"
            v-model="confirmProduct"
            :binary="true"
            inputClass="border"
            class="border border-emerald-500 rounded"
          />
          <label class="text-sm" for="confirmProduct"
            >ข้าพเจ้ายืนยันว่าได้รับสินค้าตามรายการข้างต้นและตรวจเช็คเรียบร้อยแล้ว</label
          >
        </div>
        <div class="flex w-full justify-center gap-5 mt-4">
          <Button
            :disabled="!confirmProduct"
            :class="[
              confirmProduct
                ? 'bg-emerald-500 text-white '
                : 'bg-gray-500 text-white',
            ]"
            class="w-full py-2"
            label="ยืนยัน"
            @click="confirmOrder"
          />
        </div>
      </div>
    </Dialog>
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
import buddhistEra from "dayjs/plugin/buddhistEra";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(buddhistEra);

const store = useStore();
const toast = useToast();
const confirm = useConfirm();
const route = useRoute();
const router = useRouter();
const isLoading = ref(false);
const token = ref("Bearer " + localStorage.getItem("token"));

const dateShortTH = (date) => {
  return dayjs(date).format("DD/MM/BBBB เวลา HH:mm");
};

onMounted(async () => {
  document.title = "ดูออเดอร์ || Maruey";
  isLoading.value = true;
  await Promise.all([getprovince(), getAmphures(), getTambons()]);
  await getorder();
  isLoading.value = false;
});

const confirmProduct = ref(false);

const optionprovince = ref([]);
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

const confirmOrder = async () => {
  visibleConfirm.value = false;
  isLoading.value = true;
  try {
    const { data } = await axios.put(
      `${process.env.VUE_APP_MARUEY}order/partner/update/${order.value._id}`,
      { status: 5 },
      {
        headers: {
          "auth-token": `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (data.status) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "ยืนยันรับสินค้าสำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      });
      //visibleConfirm.value = false
      getorder();
    }
  } catch (err) {
    console.log(err);
  } finally {
    isLoading.value = false;
  }
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

const visibleConfirm = ref(false);
const comfirmOrderHandle = () => {
  visibleConfirm.value = true;
};

const getpOrderStatus = (status) => {
  switch (status) {
    case 1:
      return "กำลังจัดเตรียม";
    case 2:
      return "กำลังจัดส่ง";
    case 3:
      return "จัดส่งแล้ว";
    case 4:
      return "รอยืนยัน";
    case 5:
      return "สำเร็จ";
    case -1:
      return "ยกเลิก";
    default:
      return "-";
  }
};

const getpOrderClass = (status) => {
  switch (status) {
    case 1:
      return "text-sky-500";
    case 2:
      return "text-purple-500";
    case 3:
      return "text-green-600";
    case 4:
      return "text-orange-500";
    case 5:
      return "text-emerald-500";
    case -1:
      return "text-red-500";
    default:
      return "text-gray-500";
  }
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
    url: `${process.env.VUE_APP_MARUEY}order/partner/${route.params.order_id}`,
  };
  await axios(config)
    .then(async (res) => {
      console.log(res.data);
      order.value = res.data?.data;
      products.value = res.data?.data?.line_product;
    })
    .catch((err) => {
      //console.log(err);
    });
  isLoading.value = false;
};
</script>
<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

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
