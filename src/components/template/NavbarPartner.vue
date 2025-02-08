<template>
  <nav v-if="!closeServerMLM && !closeServerMain && $route.path !== '/download' && $route.path !== '/partner/register' && $route.path !== '/partner/register/success' && $route.path.includes('/partner') && !loading" 
  class="w-full fixed bottom-0 h-20 bg-purple-500 flex items-center z-[1000]">
    <div class="w-full grid grid-cols-5">
      <div class="flex justify-center px-3">
        <button v-if="me?.shop_partner" @click="router.push('/partner/home')" class="flex flex-col items-center justify-center w-full" :class="route.path === '/partner/home' ? 'border-purple-300 border-b-2' : ''">
          <i class="pi pi-home text-2xl" :class="route.path === '/partner/home' ? 'text-purple-300' : 'text-white'"></i>
          <small :class="route.path === '/partner/home' ? 'text-purple-300' : 'text-white'">หน้าแรก</small>
        </button>
        <div v-else class="flex flex-col items-center justify-center w-full">
          <span class="pi pi-spin pi-spinner text-white text-2xl"></span>
          <small :class="route.path === '/partner/setting' ? 'text-purple-300' : 'text-white'">หน้าแรก</small>
        </div>
      </div>
      <div class="flex justify-center px-3">
        <button v-if="me?.shop_partner" @click="router.push('/partner/product?shop_id=' + me?.shop_partner?._id)" class="flex flex-col items-center justify-center w-full" :class="route.path === '/partner/product' ? 'border-purple-300 border-b-2' : ''">
          <i class="pi pi-box text-2xl" :class="route.path === '/partner/product' ? 'text-purple-300' : 'text-white'"></i>
          <small :class="route.path === '/partner/product' ? 'text-purple-300' : 'text-white'">สินค้า</small>
        </button>
        <div v-else class="flex flex-col items-center justify-center w-full">
          <span class="pi pi-spin pi-spinner text-white text-2xl"></span>
          <small :class="route.path === '/partner/setting' ? 'text-purple-300' : 'text-white'">สินค้า</small>
        </div>
      </div>
      <div class="flex justify-center px-3">
        <button v-if="me?.shop_partner" @click="router.push('/partner/order')" class="flex flex-col items-center justify-center w-full" :class="route.path === '/partner/order' ? 'border-purple-300 border-b-2' : ''">
          <i class="pi pi-shopping-cart text-2xl" :class="route.path === '/partner/order' ? 'text-purple-300' : 'text-white'"></i>
          <small :class="route.path === '/partner/order' ? 'text-purple-300' : 'text-white'">ออเดอร์</small>
        </button>
        <div v-else class="flex flex-col items-center justify-center w-full">
          <span class="pi pi-spin pi-spinner text-white text-2xl"></span>
          <small :class="route.path === '/partner/setting' ? 'text-purple-300' : 'text-white'">ออเดอร์</small>
        </div>
      </div>
      <div class="flex justify-center px-3">
        <button v-if="me?.shop_partner?._id" @click="router.push('/partner/setting?shop_id=' + me?.shop_partner?._id)" class="flex flex-col relative items-center justify-center w-full" :class="route.path === '/partner/setting' ? 'border-purple-300 border-b-2' : ''">
          <i class="pi pi-cog text-2xl" :class="route.path === '/partner/setting' ? 'text-purple-300' : 'text-white'"></i>
          <small :class="route.path === '/partner/setting' ? 'text-purple-300' : 'text-white'">ตั้งค่า</small>
          <i v-if="me?.shop_partner?.status === 4" class="pi pi-exclamation-circle absolute -top-1 right-1 bg-red-500 text-white rounded-full"></i>
        </button>
        <div v-else class="flex flex-col items-center justify-center w-full">
          <span class="pi pi-spin pi-spinner text-white text-2xl"></span>
          <small :class="route.path === '/partner/setting' ? 'text-purple-300' : 'text-white'">ตั้งค่า</small>
        </div>
      </div>
      <div class="flex justify-center px-3">
        <button @click="router.push('/')" class="flex flex-col items-center justify-center w-full bg-gradient-to-tr from-purple-500 to-purple-800 rounded py-2">
          <span class="pi pi-user text-white text-2xl"></span>
          <small class="text-white">กลับ</small>
        </button>
      </div>
    </div>
  </nav>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from "vue-router";
import axios from 'axios';
import { useStore } from 'vuex';

const loading = ref(false);
const store = useStore();
const router = useRouter();
const route = useRoute();

onMounted(async () => {
  await checkServer()
  await checkServerStatus()
  getMe()
})

const me = ref({});
const getMe = async () => {
  me.value = { ...store.getters?.me };
  if (me.value?.user_name) {
    getMyShopPartner();
  }
};
const getMyShopPartner = async () => {
  loading.value = true;
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
  } finally {
    loading.value = false;
  }
};

const closeServerMain = ref(false);

const checkServer = async() => {
  try {
    const response = await axios.get(`${process.env.VUE_APP_MARUEY}product`)
    if (!response.data.status) {
      closeServerMain.value = true
    } else {
      //console.log('server running')
      closeServerMain.value = false
    }
  } catch (error) {
    //console.log(error)
    closeServerMain.value = true
  }
}

const closeServerMLM = ref(false)
const checkServerStatus = async() => {
  try {
    await axios.get(`${process.env.VUE_APP_MLM}/dataset_qualification`)
    //console.log(data)
    closeServerMLM.value = false
  }
  catch(err) {
    //console.log(err)
    closeServerMLM.value = true
  }
}

</script>

<style scoped>

</style>