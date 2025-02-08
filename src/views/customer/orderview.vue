<template>
  <div v-if="isLoading" class="overlay">
    <div class="loader"></div>
  </div>
  <div class="h-full bg-[#f7f7f7] min-h-screen mb-20 w-full">
    <div class="flex justify-between items-center pt-10 px-3">
      <Button label="ย้อนกลับ" @click="$router.push('/')" icon="pi pi-chevron-left" class="text-[#8B2FC9]" />
      <input v-model="searchInput" id="search" type="search" placeholder="ค้นหา..." class="border rounded h-fit px-2 py-2" >
      <div class="flex items-center gap-3">
        <span v-if="isLoading">กำลังโหลด...</span>
        <button
          type="button"
          @click="refresh"
          class="bg-[#8B2FC9] text-white py-1 px-2 items-center rounded-full"
        >
          <i class="pi pi-refresh font-bold"></i>
        </button>
      </div>
    </div>
    <div class="flex gap-5 justify-center mt-5">
      <button @click="selectedShopType='Maruey'" class="border-[#8B2FC9] border text-purple-500 py-1 px-2 items-center rounded" :class="selectedShopType==='Maruey' ? 'bg-[#8B2FC9] text-white' : ''">ออร์เดอร์มารวย</button>
      <button @click="selectedShopType='Partner'" class="border-[#8B2FC9] border text-purple-500 py-1 px-2 items-center rounded" :class="selectedShopType==='Partner' ? 'bg-[#8B2FC9] text-white' : ''">ออร์เดอร์ร้านค้า</button>
    </div>
    <div class="h-full mx-2 py-3" v-if="selectedShopType==='Partner'">
      <div class="w-full flex justify-start overflow-x-auto gap-1">
        <Button label="รอยืนยัน" class="border p-2 min-w-fit focus:outline-none focus:ring-0" @click="selectedOrderStatus=4" :class="selectedOrderStatus===4 ? 'bg-purple-500 text-white' : ''" />
        <Button label="กำลังจัดเตรียม" class="border p-2 min-w-fit focus:outline-none focus:ring-0" @click="selectedOrderStatus=1" :class="selectedOrderStatus===1 ? 'bg-purple-500 text-white' : ''" />
        <Button label="กำลังจัดส่ง" class="border p-2 min-w-fit focus:outline-none focus:ring-0" @click="selectedOrderStatus=2" :class="selectedOrderStatus===2 ? 'bg-purple-500 text-white' : ''" />
        <Button label="สำเร็จ" class="border p-2 min-w-fit focus:outline-none focus:ring-0" @click="selectedOrderStatus=5" :class="selectedOrderStatus===5 ? 'bg-purple-500 text-white' : ''" />
        <Button label="ยกเลิก" class="border p-2 min-w-fit focus:outline-none focus:ring-0" @click="selectedOrderStatus=-1" :class="selectedOrderStatus===-1 ? 'bg-purple-500 text-white' : ''" />
      </div>
      <div v-if="pOrders.length > 0">
        <div
          @click="$router.push('/customer/order-partner/' + order._id)"
          class="lg:w-4/6 mx-2 md:mx-auto mt-5 pt-3 bg-white shadow"
          v-for="order in pOrders"
          :key="order._id"
        >
          <div
            class="text-sm flex items-center px-5 pt-2"
          >
            <div class="text-[#8B2FC9] flex-grow">{{ order.code }}</div>
            <div :class="getpOrderClass(order.status)" class="font-bold">
              {{ getpOrderStatus(order.status) }}
            </div>
          </div>
          <div class="text-[#8B2FC9] flex-grow px-5 pb-2">ร้านค้า : {{ order.shop_username }}</div>
          <div class="flex border-b border-gray-200 text-sm text-gray-500 px-5">
            <p>วันที่สั่งซื้อ : {{ dateShortTH2(order.createdAt) }}</p>
          </div>
          <div
            class="w-full flex items-center bg-[#fafdff] p-2 text-base"
          >
            <div class="w-6/12">จำนวน:</div>
            <div class="text-right w-6/12">
              {{ order.total_qty }}
              รายการ
            </div>
          </div>
          <div
            class="w-full flex items-center bg-[#fafdff] p-2 text-base"
          >
            <div class="w-6/12">รวมการสั่งซื้อ:</div>
            <div class="text-right w-6/12">
              ฿
              {{
                parseFloat(order.net_price || 0)?.toLocaleString("en", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }}
            </div>
          </div>
        </div>
      </div>
      <div class="h-full w-full py-3" v-else>
        <div class="md:w-4/6 mx-2 md:mx-auto mt-5 pt-3 bg-[#fff] shadow">
          <div
            class="text-lg flex items-center px-5 py-10 border-b border-gray-200"
          >
            <div class="text-[#8B2FC9] flex-grow text-center">
              ไม่มีรายการสั่งซื้อ
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="h-full mx-2 py-3" v-if="selectedShopType==='Maruey'">
      <div
        @click="$router.push('/customer/order/' + order.id)"
        class="lg:w-4/6 mx-2 md:mx-auto mt-5 pt-3 bg-[#fff] shadow"
        v-for="order in orders"
        :key="order.id"
      >
        <div
          class="text-sm flex items-center px-5 py-2"
        >
          <div class="text-[#8B2FC9] flex-grow">{{ order.code_order }}</div>
          <div
            :class="
              getOrderStatus(order.order_status_id_fk)?.css_class === 'danger'
                ? 'text-red-500'
                : getOrderStatus(order.order_status_id_fk)?.css_class ===
                  'success'
                ? 'text-green-500'
                : 'text-orange-500'
            "
          >
            {{ getOrderStatus(order.order_status_id_fk)?.detail }}
          </div>
        </div>
        <div class="flex border-b border-gray-200 text-sm text-gray-500 px-5">
          <p>วันที่สั่งซื้อ : {{ dateShortTH(order.created_at) }}</p>
        </div>
        <div
          class="w-full flex items-center bg-[#fafdff] p-2 text-base"
        >
          <div class="w-6/12">จำนวน:</div>
          <div class="text-right w-6/12">
            {{ order.quantity }}
            รายการ
          </div>
        </div>
        <div
          class="w-full flex items-center bg-[#fafdff] p-2 text-base"
        >
          <div class="w-6/12">รวมการสั่งซื้อ:</div>
          <div class="text-right w-6/12">
            ฿
            {{
              parseFloat(order.ewallet_price || 0)?.toLocaleString("en", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }}
          </div>
        </div>
      </div>
    </div>

  </div>
  <Dialog
    v-model:visible="dialog"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <template #header>
      <div class="flex justify-between items-center">
        <div class="text-lg font-semibold">รีวิวสินค้า</div>
      </div>
    </template>
    <div class="grid grid-cols-1 gap-4 mt-2">
      <div class="col-span-full">
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >รีวิว :</label
        >
        <Rating v-model="review.rating" :cancel="false" />
        <!-- <input   type="text" class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]" placeholder="กรุณากรอกชื่อเรียก" /> -->
      </div>
      <div class="col-span-full">
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >ความคิดเห็น :</label
        >
        <Textarea
          v-model="review.comment"
          rows="5"
          cols="30"
          class="border border-gray-200 w-full p-2"
        />
      </div>
    </div>
    <div class="flex items-center justify-center w-full">
      <button
        @click="reviewproduct()"
        :disabled="isLoading"
        class="mt-9 font-semibold leading-none text-white py-4 px-10 bg-[#8B2FC9] rounded-lg hover:bg-[#E178C5] focus:ring-2 focus:ring-offset-2 focus:ring-[#8B2FC9] focus:outline-none mx-5"
      >
        รีวิวสินค้า
      </button>
      <button
        @click="dialog = false"
        :disabled="isLoading"
        class="mt-9 font-semibold leading-none text-white py-4 px-10 bg-[#ff3d32] rounded-lg hover:bg-[#ff6259] focus:ring-2 focus:ring-offset-2 focus:ring-[#8B2FC9] focus:outline-none"
      >
        ยกเลิก
      </button>
    </div>
  </Dialog>
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

const store = useStore();
const toast = useToast();
const confirm = useConfirm();
const route = useRoute();
const router = useRouter();
const isLoading = ref(false);
const token = ref("Bearer " + localStorage.getItem("token"));

const selectedShopType = ref('Maruey');

onMounted(async () => {
  document.title = "การสั่งซื้อของคุณ || Maruey";
  isLoading.value = true;
  await getdelivery();
  await fetchOrderStatus();
  await getPartnerOrders();
  isLoading.value = false;
});

const dateShortTH = (date) => {
  // Parse the date in UTC, then convert to "Asia/Bangkok" timezone
  let parsedDate = dayjs.utc(date).tz("Asia/Bangkok");

  // Manually adjust hours (subtract 7 hours if necessary)
  parsedDate = parsedDate.subtract(7, 'hour'); // You can adjust this value if needed

  // Convert to Buddhist Era year (Add 543 years)
  const buddhistYear = parsedDate.year() + 543;

  // Return the formatted date string with the Buddhist Era year
  return parsedDate.format(`DD/MM/${buddhistYear} เวลา HH:mm น.`);
};

const dateShortTH2 = (date) => {
  // Parse the date in UTC, then convert to "Asia/Bangkok" timezone
  let parsedDate = dayjs.utc(date).tz("Asia/Bangkok");

  // Manually adjust hours (subtract 7 hours if necessary)
  parsedDate = parsedDate.subtract(0, 'hour'); // You can adjust this value if needed

  // Convert to Buddhist Era year (Add 543 years)
  const buddhistYear = parsedDate.year() + 543;

  // Return the formatted date string with the Buddhist Era year
  return parsedDate.format(`DD/MM/${buddhistYear} เวลา HH:mm น.`);
};

const refresh = async () => {
  isLoading.value = true;
  await getdelivery();
  await fetchOrderStatus();
  isLoading.value = false;
};

const selectedOrderStatus = ref(4);

const searchInput = ref("");

const delivery = ref([]);
const orders = computed(() => {
  if (searchInput.value) {
    return delivery.value.filter((item) => {
      return item.code_order
        ?.toLowerCase()
        ?.includes(searchInput.value?.toLowerCase());
    });
  } else {
    return delivery.value;
  }
});

const userData = ref(store.getters.me);

const getdelivery = async () => {
  isLoading.value = true;
  const config = {
    method: "get",
    headers: {
      token: token.value,
    },
    url: `${process.env.VUE_APP_MARUEY}${userData.value.id}/orders`,
  };
  await axios(config)
    .then((res) => {
      //console.log(res.data);
      delivery.value = res.data?.data;
      if (delivery.value.length > 0) {
        delivery.value.reverse();
      }
    })
    .catch((err) => {
      //console.log(err);
    })
    .finally(() => {
      isLoading.value = false;
    });
};
const partnerOrders = ref([]);
const pOrders = computed(() => {
  return partnerOrders.value.filter((o) => o.status == selectedOrderStatus.value);
});
const getPartnerOrders = async () => {
  isLoading.value = true;
  const config = {
    method: "post",
    headers: {
      token: token.value,
    },
    data: {
      username: userData.value.user_name,
    },
    url: `${process.env.VUE_APP_MARUEY}order/partner/all`,
  };
  await axios(config)
    .then((res) => {
      console.log(res.data?.data);
      partnerOrders.value = res.data?.data;
      if (partnerOrders.value.length > 0) {
        partnerOrders.value.reverse();
      }
    })
    .catch((err) => {
      //console.log(err);
    })
    .finally(() => {
      isLoading.value = false;
    });
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
}

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
}

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

const receiveproduct = async (id) => {
  const result = await Swal.fire({
    text: "คุณได้รับสินค้าแล้วใช่หรือไม่?",
    icon: "warning",
    iconColor: "#8B2FC9",
    showCancelButton: true,
    confirmButtonColor: "#8B2FC9",
    cancelButtonColor: "#E85D40",
    confirmButtonText: "ยืนยัน",
    cancelButtonText: "ยกเลิก",
  });

  if (result.isConfirmed) {
    //isLoading.value = true;
    const config = {
      method: "put",
      headers: {
        token: token.value,
      },
      url: `${process.env.VUE_APP_MARUEY}delivery/receiveproduct/${id}`,
    };
    await axios(config)
      .then((res) => {
        getdelivery();
        toast.add({
          severity: "success",
          summary: "สำเร็จ",
          detail: "คุณได้รับสินค้าแล้ว",
          life: 3000,
        });
      })
      .catch((err) => {
        //console.log(err);
        Swal.fire({
          position: "center",
          icon: "error",
          title: err,
          showConfirmButton: false,
          timer: 1500,
        });
      });
    //isLoading.value = false;
  }
};

const dialog = ref(false);
const review = ref({
  order_id: "",
  deliivery_id: "",
  customer_id: "",
  rating: 0,
  comment: "",
});
const opendialog = (item) => {
  dialog.value = true;
  review.value.order_id = item.order_id?._id;
  review.value.deliivery_id = item._id;
  review.value.rating = 0;
  review.value.comment = "";
  review.value.customer_id = store.getters._id;
};

const reviewproduct = async () => {
  const result = await Swal.fire({
    text: "คุณต้องการยืนยันการรีวิวสินค้าได้หรือไม่?",
    icon: "warning",
    iconColor: "#8B2FC9",
    showCancelButton: true,
    confirmButtonColor: "#8B2FC9",
    cancelButtonColor: "#E85D40",
    confirmButtonText: "ยืนยัน",
    cancelButtonText: "ยกเลิก",
  });
  if (result.isConfirmed) {
    //isLoading.value = true;
    const config = {
      method: "post",
      headers: {
        token: token.value,
      },
      data: review.value,
      url: `${process.env.VUE_APP_MARUEY}review`,
    };
    await axios(config)
      .then((res) => {
        getdelivery();
        dialog.value = false;
        Swal.fire({
          text: "รีวิวสินค้าสำเร็จ",
          icon: "success",
          iconColor: "#8B2FC9",
          confirmButtonColor: "#8B2FC9",
        });
      })
      .catch((err) => {
        //console.log(err);
        Swal.fire({
          position: "center",
          icon: "error",
          title: err,
          showConfirmButton: false,
          timer: 1500,
        });
      });
    //isLoading.value = false;
  }
};
</script>
<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

@import "@/assets/Loading.css";
</style>
