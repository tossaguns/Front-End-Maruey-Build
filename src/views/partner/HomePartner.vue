<template>
  <div
    class="bg-gradient-to-br from-purple-500 to-purple-800 min-h-screen w-full h-full"
  >
    <div class="w-full h-full">
      <!--header-->
      <div class="w-full flex flex-col items-center justify-center gap-5 py-8">
        <button
          class="flex items-center justify-center bg-white rounded-full px-2 gap-3"
          @click="$router.push('/customer/customerview')"
        >
          <i class="pi pi-chevron-left text-gray-500"></i>
          <span>กลับหน้าผู้ใช้งาน</span>
        </button>
        <div class="text-center flex flex-col items-center gap-2">
          <h1 class="text-white text-xl">{{ me?.shop_partner?.name }}</h1>
          <p class="text-purple-200">
            รหัสร้านค้า : {{ me?.shop_partner?.code || "???" }}
          </p>
          <Rating
            v-if="me.shop_partner"
            v-model="me.shop_partner.stars"
            :cancel="false"
            readonly
            class=""
          >
            <template #onicon>
              <i class="pi pi-star-fill text-yellow-300"></i>
            </template>
            <template #officon>
              <i class="pi pi-star text-yellow-300"></i>
            </template>
          </Rating>
        </div>
      </div>
      <div
        class="w-full bg-white h-full min-h-[calc(100vh-10rem)] rounded-t-3xl px-5 pt-5 pb-20 flex flex-col gap-2"
      >
        <div class="w-full flex border rounded-xl shadow py-2 px-2">
          <div class="w-full">
            <div class="flex justify-between w-full items-center">
              <p class="">ยอดขายทั้งหมด</p>
              <p class="font-bold text-xl text-emerald-600">
              {{ report.total_income || "0.00" }}
              </p>
              <i class="pi pi-chevron-right text-gray-400"></i>
            </div>
          </div>
        </div>
        <div class="w-full flex border rounded-xl shadow py-2 px-2">
          <div class="w-full">
            <div class="flex justify-between w-full items-center">
              <p class="">รายการออร์เดอร์ทั้งหมด</p>
              <i
                class="pi pi-chevron-right text-gray-400"
                @click="$router.push('/partner/order')"
              ></i>
            </div>
            <div class="flex justify-between w-full items-center divide-x-2">
              <div class="text-center flex flex-col items-center w-full">
                <p class="font-bold text-xl">
                  {{ report.order_status?.all || 0 }}
                </p>
                <p class="text-sm">ทั้งหมด</p>
              </div>
              <div class="text-center flex flex-col items-center w-full">
                <p class="font-bold text-xl text-emerald-500">
                  {{
                    report.order_status?.paid + report.order_status?.delivery ||
                    0
                  }}
                </p>
                <p class="text-sm">จ่ายแล้ว</p>
              </div>
              <div class="text-center flex flex-col items-center w-full">
                <p class="font-bold text-xl text-emerald-500">
                  {{ report.order_status?.done || 0 }}
                </p>
                <p class="text-sm">สำเร็จ</p>
              </div>
              <div class="text-center flex flex-col items-center w-full">
                <p class="font-bold text-xl text-red-500">
                  {{ report.order_status?.cancle || 0 }}
                </p>
                <p class="text-sm">ยกเลิก</p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="products.length" class="w-full py-2">
          <p>สินค้าขายดี</p>
          <div
            class="w-full px-3 flex overflow-x-auto gap-2 mt-2 bg-gradient-to-br from-orange-500 to-orange-800 py-2 rounded"
          >
            <div
              v-for="(product, index) in products"
              :key="product._id"
              class="flex justify-between bg-white shadow py-2 rounded w-full min-w-fit px-2 relative"
            >
              <div class="absolute -top-1 -left-1">
                <div
                  class="text-xs text-white bg-purple-500 rounded-full px-3 py-1"
                >
                  {{ index + 1 }}
                </div>
              </div>
              <div class="flex justify-between gap-1 w-2/3">
                <div class="w-full max-w-16 h-24 rounded">
                  <img
                    v-if="product.images?.length"
                    :src="product.images[0]?.preview"
                    alt="image"
                    @error="product.error = true"
                    class="w-full h-full object-cover"
                    :class="product.error ? 'hidden' : 'block'"
                  />
                  <div
                    v-else
                    class="w-full h-full flex justify-center items-center relative"
                  >
                    <i class="pi pi-image text-gray-400 text-2xl"></i>
                    <i
                      class="pi pi-exclamation-circle text-red-400 absolute top-1 right-1"
                    ></i>
                  </div>
                </div>
                <div class="flex flex-col gap-1 w-full">
                  <p class="line-clamp-2 text-sm text-pretty">
                    {{ product.name }}
                  </p>
                  <p class="line-clamp-1 text-xs text-gray-500">
                    {{ product.description }}
                  </p>
                  <p class="text-xs">{{ product.category }}</p>
                  <p class="text-[0.65rem] bg-gray-200 rounded w-fit px-1">
                    {{ product.tags[0] }}
                    {{
                      product.tags?.length > 1
                        ? "+" + (product.tags?.length - 1)
                        : ""
                    }}
                  </p>
                </div>
              </div>
              <div class="flex flex-col items-end justify-between w-1/3">
                <div class="flex flex-col">
                  <p
                    :class="getProductClass(product)"
                    class="rounded px-2 text-xs text-center max-w-fit"
                  >
                    {{ getProductStatus(product) }}
                  </p>
                  <p class="text-xs min-w-fit text-right">
                    x {{ product.stock }}
                  </p>
                </div>
                <p>฿ {{ parseFloat(product.selling_price).toFixed(2) }}</p>
                <div class="hidden">
                  <i
                    v-for="i in product.stars"
                    :key="i"
                    class="pi pi-star-fill text-xs text-yellow-400"
                  ></i>
                  <i
                    v-for="i in 5 - product.stars"
                    :key="i"
                    class="pi pi-star text-xs text-gray-500"
                  ></i>
                </div>
                <p class="text-xs text-gray-500">
                  ขายแล้ว {{ product.sold }} ชิ้น
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-5 flex-col gap-2 hidden">
          <p>
            ออร์เดอร์วันนี้ <span>{{ dateShortTH(new Date()) }}</span>
          </p>
          <div class="flex justify-between">
            <button
              @click="selectedFilter = 'ทั้งหมด'"
              :class="[
                selectedFilter === 'ทั้งหมด'
                  ? 'text-purple-500 border-b border-purple-500'
                  : '',
              ]"
            >
              ทั้งหมด
            </button>
            <button
              @click="selectedFilter = 'ใหม่'"
              :class="[
                selectedFilter === 'ใหม่'
                  ? 'text-purple-500 border-b border-purple-500'
                  : '',
              ]"
            >
              ใหม่
            </button>
            <button
              @click="selectedFilter = 'กำลังเตรียม'"
              :class="[
                selectedFilter === 'กำลังเตรียม'
                  ? 'text-purple-500 border-b border-purple-500'
                  : '',
              ]"
            >
              กำลังเตรียม
            </button>
            <button
              @click="selectedFilter = 'จัดส่งแล้ว'"
              :class="[
                selectedFilter === 'จัดส่งแล้ว'
                  ? 'text-purple-500 border-b border-purple-500'
                  : '',
              ]"
            >
              จัดส่งแล้ว
            </button>
            <button
              @click="selectedFilter = 'เสร็จสิ้น'"
              :class="[
                selectedFilter === 'เสร็จสิ้น'
                  ? 'text-purple-500 border-b border-purple-500'
                  : '',
              ]"
            >
              เสร็จสิ้น
            </button>
          </div>
          <div
            class="flex flex-col py-2 border-t border-dashed mb-5 max-h-[20rem] overflow-y-auto"
          >
            <div
              class="flex justify-between bg-white border shadow rounded px-1 py-1"
            >
              <div class="flex items-center gap-2">
                <div class="bg-purple-300 rounded py-1 px-2 text-center">
                  <p class="text-sm">ใหม่</p>
                  <p class="font-bold">OR00001</p>
                  <p class="text-xs">{{ dateTimeShortTH(new Date()) }}</p>
                </div>
                <div class="py-1 px-2 text-center">
                  <p class="text-sm">รหัสสมาชิก</p>
                  <p class="">0534685</p>
                  <p class="text-xs">นครบาล จามไว</p>
                </div>
              </div>
              <div class="py-1 px-2 text-center">
                <p class="text-sm font-bold">฿ 500.00</p>
                <p class="text-xs text-gray-400">2 รายการ</p>
              </div>
            </div>
            <div
              class="flex justify-between bg-white border shadow rounded px-1 py-1"
            >
              <div class="flex items-center gap-2">
                <div class="bg-green-300 rounded py-1 px-2 text-center">
                  <p class="text-sm">สำเร็จ</p>
                  <p class="font-bold">OR00002</p>
                  <p class="text-xs">{{ dateTimeShortTH(new Date()) }}</p>
                </div>
                <div class="py-1 px-2 text-center">
                  <p class="text-sm">รหัสสมาชิก</p>
                  <p class="">0534685</p>
                  <p class="text-xs">นครบาล จามไว</p>
                </div>
              </div>
              <div class="py-1 px-2 text-center">
                <p class="text-sm font-bold">฿ 500.00</p>
                <p class="text-xs text-gray-400">2 รายการ</p>
              </div>
            </div>
            <div
              class="flex justify-between bg-white border shadow rounded px-1 py-1"
            >
              <div class="flex items-center gap-2">
                <div class="bg-sky-300 rounded py-1 px-2 text-center">
                  <p class="text-sm">กำลังเตรียม</p>
                  <p class="font-bold">OR00003</p>
                  <p class="text-xs">{{ dateTimeShortTH(new Date()) }}</p>
                </div>
                <div class="py-1 px-2 text-center">
                  <p class="text-sm">รหัสสมาชิก</p>
                  <p class="">0534685</p>
                  <p class="text-xs">นครบาล จามไว</p>
                </div>
              </div>
              <div class="py-1 px-2 text-center">
                <p class="text-sm font-bold">฿ 500.00</p>
                <p class="text-xs text-gray-400">2 รายการ</p>
              </div>
            </div>
            <div
              class="flex justify-between bg-white border shadow rounded px-1 py-1"
            >
              <div class="flex items-center gap-2">
                <div class="bg-red-300 rounded py-1 px-2 text-center">
                  <p class="text-sm">ยกเลิก</p>
                  <p class="font-bold">OR00004</p>
                  <p class="text-xs">{{ dateTimeShortTH(new Date()) }}</p>
                </div>
                <div class="py-1 px-2 text-center">
                  <p class="text-sm">รหัสสมาชิก</p>
                  <p class="">0534685</p>
                  <p class="text-xs">นครบาล จามไว</p>
                </div>
              </div>
              <div class="py-1 px-2 text-center">
                <p class="text-sm font-bold">฿ 500.00</p>
                <p class="text-xs text-gray-400">2 รายการ</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);

const store = useStore();

onMounted(() => {
  getMe();
});

const selectedFilter = ref("ทั้งหมด");

const report = ref({});

const fetchReportOrders = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.VUE_APP_MARUEY}reports/partner/${store.getters.me?.user_name}?status=1`,
      {
        headers: {
          token: `Bearer ${store.getters.token}`,
        },
      }
    );
    console.log(data);
    if (data.status) {
      report.value = data.data;
    }
  } catch (err) {
    console.log(err);
  }
};

const me = ref({});
const getMe = () => {
  me.value = { ...store.getters?.me };
  if (me.value?.user_name) {
    getMyShopPartner();
  }
};
const getMyShopPartner = async () => {
  if (!store.getters.me?.user_name) return;
  try {
    const { data } = await axios.get(
      `${process.env.VUE_APP_MARUEY}partner/byusername/${store.getters.me?.user_name}`
    );
    if (data.status) {
      //console.log(data.data);
      me.value.shop_partner = data.data;
      fetchReportOrders();
      fetchProducts();
    }
  } catch (err) {
    console.log(err);
  }
};

const dateShortTH = (date) => {
  dayjs.locale("th");
  return dayjs(date).format("DD/MM/BBBB");
};

const dateTimeShortTH = (date) => {
  dayjs.locale("th");
  return dayjs(date).format("DD/MM/BBBB HH:mm");
};

const loading = ref(false);
const original_products = ref([]);
const products = ref([]);

const fetchProducts = async () => {
  loading.value = true;
  try {
    const { data } = await axios.get(
      `${process.env.VUE_APP_MARUEY}product/partner?shop_id=${me.value?.shop_partner?._id}`
    );
    //console.log(data)
    if (data.status) {
      original_products.value = data.data
        ?.sort((a, b) => a.sold - b.sold)
        ?.reverse();
      products.value = original_products.value
        .filter((x) => x.status === 1 && x.stock > 0 && x.sold > 0)
        .slice(0, 4);
      original_products.value.map(async (x) => {
        await getProductImages(x);
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    loading.value = false;
  }
};

const getProductStatus = (product) => {
  if (product.stock === 0) {
    return "สินค้าหมด";
  } else if (product.status === 1) {
    return "วางขาย";
  } else if (product.status === 2) {
    return "หยุดขายชั่วคราว";
  } else if (product.status === 3) {
    return "ไม่ได้รับอนุญาติ";
  } else if (product.status === 4) {
    return "รอตรวจสอบ";
  }
};

const getProductClass = (product) => {
  if (product.stock === 0) {
    return "bg-orange-500 text-white";
  } else if (product.status === 1) {
    return "bg-green-500 text-white";
  } else if (product.status === 2) {
    return "bg-gray-500 text-black";
  } else if (product.status === 3) {
    return "bg-red-500 text-white";
  } else if (product.status === 4) {
    return "bg-yellow-500 text-black";
  }
};

const getProductImages = async (product) => {
  try {
    const { data } = await axios.get(
      `${process.env.VUE_APP_MARUEY}product/partner/product-image/${product._id}`,
      {
        headers: {
          token: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    if (data.status) {
      product.images = data.data.sort(
        (a, b) => parseInt(a.description) - parseInt(b.description)
      );
      product.images?.forEach((image) => {
        image.preview = `${process.env.VUE_APP_MARUEY}${data.path}${image.path}/product`;
      });
      //console.log(images.value);
    }
  } catch (err) {
    console.log(err);
  }
};
</script>
