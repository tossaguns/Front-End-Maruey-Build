<template>
  <div>
    <div v-if="isLoading" class="overlay">
      <div class="loader"></div>
    </div>
    <div class="mt-6 flex flex-col gap-2 pb-20 px-2">
      <div class="py-3">
        <Button icon="pi pi-chevron-left" @click="$router.push('/partner/home')" label="ย้อนกลับ" class="text-gray-500" />
      </div>
      <div class="w-full flex justify-between items-center">
        <p>ออร์เดอร์วันที่ : <span v-if="currentDate[0]">{{ dateShortTH(currentDate[0]) }} </span><span v-if="currentDate[1]"> - {{ dateShortTH(currentDate[1]) }}</span></p>
        <Calendar inputClass="hidden" showIcon v-model="selectedDate" showButtonBar selectionMode="range" :manualInput="false" class="border rounded bg-purple-400 text-white" />
      </div>
      <div class="flex justify-between w-full overflow-x-auto gap-5 py-3">
        <button class="min-w-fit" @click="selectedFilter = 'ทั้งหมด'" :class="[selectedFilter === 'ทั้งหมด' ? 'text-purple-500 border-b border-purple-500' : '']">ทั้งหมด</button>
        <button class="min-w-fit" @click="selectedFilter = 'ใหม่'" :class="[selectedFilter === 'ใหม่' ? 'text-purple-500 border-b border-purple-500' : '']">ใหม่</button>
        <button class="min-w-fit" @click="selectedFilter = 'กำลังเตรียม'" :class="[selectedFilter === 'กำลังเตรียม' ? 'text-purple-500 border-b border-purple-500' : '']">กำลังเตรียม</button>
        <button class="min-w-fit" @click="selectedFilter = 'กำลังจัดส่ง'" :class="[selectedFilter === 'กำลังจัดส่ง' ? 'text-purple-500 border-b border-purple-500' : '']">กำลังจัดส่ง</button>
        <button class="min-w-fit" @click="selectedFilter = 'จัดส่งแล้ว'" :class="[selectedFilter === 'จัดส่งแล้ว' ? 'text-purple-500 border-b border-purple-500' : '']">จัดส่งแล้ว</button>
        <button class="min-w-fit" @click="selectedFilter = 'เสร็จสิ้น'" :class="[selectedFilter === 'เสร็จสิ้น' ? 'text-purple-500 border-b border-purple-500' : '']">เสร็จสิ้น</button>
      </div>
      <div v-if="orders.length" class="flex flex-col py-2 border-t border-dashed mb-5 overflow-y-auto">
        <div v-for="order in orders" :key="order._id" class="flex justify-between bg-white border shadow rounded px-1 py-1" @click="selectedOrderHandle(order)">
          <div class="flex items-center gap-2">
            <div class="rounded py-1 px-2 text-center" :class="getOrderClass(order.status)">
              <p class="text-sm">{{ getOrderStatus(order.status) }}</p>
              <p class="font-bold text-xs">{{ order.code }}</p>
              <p class="text-xs">{{ dateTimeShortTH(new Date(order.createdAt)) }}</p>
            </div>
            <div class="py-1 px-2 text-center">
              <p class="text-sm">รหัสสมาชิก</p>
              <p class="">{{ order.buyer_username }}</p>
              <p class="text-xs">{{ order.buyer_name || 'ไม่ทราบชื่อ' }}</p>
            </div>
          </div>
          <div class="py-1 px-2 text-center">
            <p class="text-sm font-bold">฿ {{ order.net_price }}</p>
            <p class="text-xs text-gray-400">{{ order.line_product?.length || '?' }} รายการ</p>
          </div>
        </div>
      </div>
      <div v-else class="py-5">
        <img src="/src/assets/images/empty-data.jpg" alt="empty" class="opacity-50" />
        <p class="text-center">ยังไม่มีรายการออร์เดอร์ช่วงวันดังกล่าว</p>
      </div>
    </div>

  <Sidebar v-model:visible="visibleOrder" header=" " position="bottom" style="height: 90%">
    <div>
      <h1 class="text-center pb-2">รหัสสั่งซื้อ : <span class="">#{{ selectedOrder.code }}</span></h1>
      <h1 class="text-center pb-2">จาก : <span class="">{{ selectedOrder?.buyer_username }} {{ selectedOrder?.buyer_name }}</span></h1>
      <div class="border-t border-b py-1 border-dashed border-purple-500 my-2">
        <p>ทำรายการเมื่อ : <span class="">{{ dateTimeShortTH(new Date(selectedOrder?.createdAt)) }}</span></p>
        <p>สถานะ : <span class="">{{ getOrderStatus(selectedOrder?.status) }}</span> <span v-if="selectedOrder?.status === 2" class="ml-2 text-purple-500">#{{ selectedOrder?.tracking_no }}</span></p>
        <p>วิธีจัดส่ง : 
          <span class="">{{ selectedOrder?.transfer_method === 'delivery' ? 'จัดส่ง' : 'รับเอง' }}</span>
          <span v-if="selectedOrder?.transfer_method === 'delivery'" class="ml-2">{{ selectedOrder?.delivery_provider }}</span>
        </p>
        <p class="py-1 my-1 border-y"><span class="pi pi-map-marker text-red-500 mr-1"></span>ที่อยู่จัดส่ง : 
          <span class="text-sm">{{ selectedOrder?.to_address?.address }}</span>
          <span class="text-sm ml-2">ม.{{ selectedOrder?.to_address?.moo || '-' }}</span>
          <span class="text-sm ml-2">ซ.{{ selectedOrder?.to_address?.soi || '-' }}</span>
          <span class="text-sm ml-2">ถ.{{ selectedOrder?.to_address?.road || '-' }}</span>
          <span class="text-sm ml-2">ต.{{ selectedOrder?.to_address?.tambon || '-' }}</span>
          <span class="text-sm ml-2">อ.{{ selectedOrder?.to_address?.amphure || '-' }}</span>
          <span class="text-sm ml-2">จ.{{ selectedOrder?.to_address?.province || '-' }}</span>
          <span class="text-sm ml-2">{{ selectedOrder?.to_address?.zipcode }}</span>
        </p>
        <p>ผู้รับ : <span class="">{{ selectedOrder?.to_address?.name }}</span></p>
        <p>โทร : <span class="">{{ selectedOrder?.to_address?.phone }}</span></p>
      </div>
      <pre class="hidden">{{ selectedOrder }}</pre>
      <div class="w-full flex flex-col divide-y-[1px]">
        <div v-for="product in selectedOrder?.line_product" :key="product._id" class="py-1">
          <div class="flex gap-2 w-full">
            <div class="w-28 h-20">
              <img :src="product.product_image" class="w-full h-full object-cover" :alt="product?.name" />
            </div>
            <div class="w-full">
              <p class="text-sm text-purple-500">{{ product?.product_name }}</p>
              <div class="flex justify-between w-full">
                <p>จำนวน : {{ product?.product_qty }}</p>
                <p>฿ {{ product?.product_totalprice }}</p>
              </div>
              <p class="text-sm">จำนวนในสต็อค : {{ product?.product_stock }} → <span class="text-purple-500">{{ product?.product_stock - product?.product_qty }}</span></p>
            </div>
          </div>
        </div>
        <div class="w-full mt-4">
          <p>ราคารวม : <span class="text-purple-500">฿ {{ selectedOrder?.total_product_price }}</span></p>
          <p>ส่วนลด : <span class="text-purple-500">฿ {{ selectedOrder?.total_discount }}</span></p>
          <p>ราคาสุทธิ : <span class="text-purple-500">฿ {{ selectedOrder?.net_price }}</span></p>
          <p>ค่าสนับสนุนการตลาด : <span class="text-purple-500">฿ {{ selectedOrder?.total_commission || 0 }}</span></p>
          <p>จำนวนเงินที่จะได้รับ : <span class="text-purple-500">฿ {{ selectedOrder?.total_income || 0 }}</span></p>
        </div>
      </div>
      <div class="w-full mt-5">
        <Button v-if="selectedOrder?.status === 4" class="bg-purple-500 w-full text-white py-2" label="ยืนยันออร์เดอร์" @click="confirmOrderHandle" />
        <Button v-if="selectedOrder?.status === 1" class="bg-purple-500 w-full text-white py-2" label="กำลังจัดส่ง" @click="transferOrderHandle" />
      </div>
    </div>
  </Sidebar>
  <Dialog
    v-model:visible="visibleConfirm"
    header=" "
    :style="{ width: '40rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <div>
      <div class="flex flex-col items-center justify-center">
        <p>ต้องการยืนยันออร์เดอร์นี้หรือไม่ ?</p>
        <p>#{{ selectedOrder?.code }}</p>
      </div>
      <div class="flex w-full justify-center gap-5 mt-4">
        <Button class="text-white bg-emerald-500 w-full py-2" label="ยืนยันออร์เดอร์" @click="confirmOrder" />
      </div>
    </div>
  </Dialog>
  <Dialog
    v-model:visible="visibleTransfer"
    header=" "
    :style="{ width: '40rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <div>
      <div class="flex flex-col items-center justify-center">
        <p>ต้องการเปลี่ยนสถานะออร์เดอร์นี้เป็น</p> <strong>กำลังจัดส่ง</strong> หรือไม่ ?
        <p>#{{ selectedOrder?.code }}</p>
      </div>
      <div class="flex flex-col w-full justify-center gap-5 mt-4">
        <InputText v-model="tracking_no" class="border focus:ring-1 ring-purple-500 w-full" placeholder="ใส่หมายเลขติดตามพัศดุ" />
        <Button :disabled="!tracking_no" class="text-white bg-emerald-500 w-full py-2" label="ยืนยัน" @click="transferOrder" />
      </div>
    </div>
  </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);

const store = useStore();
const selectedOrder = ref({});
const visibleOrder = ref(false);

const isLoading = ref(false);
const selectedFilter = ref("ทั้งหมด");

const dateShortTH = (date) => {
  dayjs.locale("th");
  return dayjs(date).format("DD/MM/BBBB");
};

const selectedOrderHandle = (o) => {
  selectedOrder.value = o;
  visibleOrder.value = true;
}

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
      me.value.shop_partner = data.data;
    }
  } catch (err) {
    console.log(err);
  }
};

const selectedDate = ref([]);

const currentDate = computed(() => {
  if (!selectedDate.value.length) {
    return [new Date(), new Date()]
  } else if (selectedDate.value.length === 2) {
    return [selectedDate.value[0],selectedDate.value[1]]
  } else {
    return [selectedDate.value[0], new Date()]
  }
})

const confirmOrder = async () => {
  isLoading.value = true
  try {
    const { data } = await axios.put(`${process.env.VUE_APP_MARUEY}order/partner/update/${selectedOrder.value._id}`, { status: 1 }, {
      headers: {
        'auth-token' : `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (data.status) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "ยืนยันออร์เดอร์สำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      });
      selectedOrder.value = {}
      visibleConfirm.value = false
      visibleOrder.value = false
      fetchMyOrders()
    }
  }
  catch(err) {
    console.log(err)
    Swal.fire({
        position: "center",
        icon: "error",
        title: "ยืนยันออร์เดอร์ไม่สำเร็จ",
        text: err.response?.data?.message ? err.response?.data?.message : 'เกิดข้อผิดพลาดบางประการ',
        showConfirmButton: false,
        timer: 1500,
    });
  }
  finally {
    isLoading.value = false
  }
}

const tracking_no = ref('')
const transferOrder = async () => {
  if  (tracking_no.value === '') {
    Swal.fire({
        position: "center",
        icon: "error",
        title: "กรุณากรอก เลขติดตามพัสดุ",
        showConfirmButton: false,
        timer: 1500,
    });
    return
  }
  isLoading.value = true
  try {
    const { data } = await axios.put(`${process.env.VUE_APP_MARUEY}order/partner/update/${selectedOrder.value._id}`, { status: 2, tracking_no: tracking_no.value }, {
      headers: {
        'auth-token' : `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (data.status) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "ยืนยันออร์เดอร์สำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      });
      selectedOrder.value = {}
      visibleTransfer.value = false
      visibleOrder.value = false
      fetchMyOrders()
    }
  }
  catch(err) {
    console.log(err)
    Swal.fire({
        position: "center",
        icon: "error",
        title: "ยืนยันออร์เดอร์ไม่สำเร็จ",
        text: err.response?.data?.message ? err.response?.data?.message : 'เกิดข้อผิดพลาดบางประการ',
        showConfirmButton: false,
        timer: 1500,
    });
  }
  finally {
    isLoading.value = false
  }
}

const original_orders = ref([]);
const orders = computed(() => {
  if (selectedFilter.value == "ทั้งหมด") {
    return original_orders.value;
  } else if (selectedFilter.value == "ใหม่") {
    return original_orders.value.filter((o) => o.status == 4);
  } else if (selectedFilter.value == "กำลังเตรียม") {
    return original_orders.value.filter((o) => o.status == 1);
  } else if (selectedFilter.value == "กำลังจัดส่ง") {
    return original_orders.value.filter((o) => o.status == 2);
  } else if (selectedFilter.value == "จัดส่งแล้ว") {
    return original_orders.value.filter((o) => o.status == 3);
  } else if (selectedFilter.value == "เสร็จสิ้น") {
    return original_orders.value.filter((o) => o.status == 5);
  } else if (selectedFilter.value == "ยกเลิก") {
    return original_orders.value.filter((o) => o.status == -1);
  }
  else {
    return original_orders.value;
  }
});

const visibleConfirm = ref(false)
const visibleTransfer = ref(false)
const confirmOrderHandle = () => {
  visibleConfirm.value = true
}

const transferOrderHandle = () => {
  visibleTransfer.value = true
}

const raw_orders = ref([]);

const fetchMyOrders = async () => {
  isLoading.value = true
  try {
    const { data } = await axios.post(
      `${process.env.VUE_APP_MARUEY}order/partner-shop/all`,
      {
        username: me.value?.user_name
      },
      {
        headers: {
          'auth-token': `Bearer ${store.getters.token}`,
        },
      }
    );
    console.log(data);
    if (data.status) {
      raw_orders.value = data.data;
      original_orders.value = raw_orders.value?.filter(x => dayjs(x.createdAt).diff(dayjs(currentDate.value[0])) <= 0)?.reverse();
    }
  } catch (err) {
    console.log(err);
  } finally {
    isLoading.value = false
  }
};

watch(currentDate, (newVal) => {
  original_orders.value = raw_orders.value?.filter(x => dayjs(x.createdAt).diff(dayjs(currentDate.value[0])) >= 0 && dayjs(x.createdAt).diff(dayjs(currentDate.value[1])) <= 0)?.reverse();
})

const dateTimeShortTH = (date) => {
  dayjs.locale("th");
  return dayjs(date).format("DD/MM/BBBB HH:mm");
};

onMounted(async () => {
  getMe();
  await fetchMyOrders();
});

const getOrderStatus = (status) => {
  switch (status) {
    case 4:
      return "รอยืนยัน";
    case 1:
      return "กำลังจัดเตรียม";
    case 2:
      return "กำลังจัดส่ง";
    case 3:
      return "จัดส่งแล้ว";
    case 5:
      return "เสร็จสิ้น";
    case -1:
      return "ยกเลิก";
    default:
      return "รอยืนยัน";
  }
}

const getOrderClass = (status) => {
  switch (status) {
    case 4:
      return "bg-yellow-300";
    case 1:
      return "bg-sky-300";
    case 2:
      return "bg-purple-300";
    case 3:
      return "bg-green-300";
    case 5:
      return "bg-green-500 text-white";
    case -1:
      return "bg-red-500 text-white";
    default:
      return "bg-yellow-300";
  }
}
</script>

<style scoped>
@import "@/assets/Loading.css";
</style>