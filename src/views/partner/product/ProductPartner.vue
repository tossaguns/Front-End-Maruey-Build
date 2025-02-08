<template>
  <div class="w-full h-full min-h-screen bg-gradient-to-br from-purple-500 to-purple-800">
    <div class="flex w-full px-5 py-5 justify-start">
      <Button icon="pi pi-chevron-left" label="ย้อนกลับ" @click="$router.go(-1)" class="text-white" />
      <h1 class="text-white ml-10 text-xl">สินค้าของฉัน</h1>
    </div>
    <div class="w-full flex justify-center my-3">
      <Button @click="$router.push('/partner/product/add?shop_id=' + shop_id)" label="เพิ่มสินค้า" icon="pi pi-plus" class="text-white py-2 px-3 bg-gradient-to-tl from-orange-500 to-yellow-500" />
    </div>
    <div class="w-full px-3">
      <InputText v-model="searchInput" placeholder="ค้นหาสินค้า..." class="w-full" />
    </div>
    <div class="w-full flex justify-between gap-2 my-3 py-1 px-1 overflow-x-auto">
      <Button @click="handleFilter(null)" label="ทั้งหมด" class="px-2 py-1 rounded min-w-fit focus:ring-0" :class="selectedFilter === null ? 'underline underline-offset-4 bg-white text-purple-500' : 'text-white'" />
      <Button @click="handleFilter(1)" label="วางขาย" class="px-2 py-1 rounded min-w-fit focus:ring-0" :class="selectedFilter === 1 ? 'underline underline-offset-4 bg-white text-purple-500' : 'text-white'" />
      <Button @click="handleFilter(5)" label="สินค้าหมด" class="px-2 py-1 rounded min-w-fit focus:ring-0" :class="selectedFilter === 5 ? 'underline underline-offset-4 bg-white text-purple-500' : 'text-white'" />
      <Button @click="handleFilter(2)" label="ปิดชั่วคราว" class="px-2 py-1 rounded min-w-fit focus:ring-0" :class="selectedFilter === 2 ? 'underline underline-offset-4 bg-white text-purple-500' : 'text-white'" />
    </div>
    <div class="w-full hidden justify-start px-3 my-3 text-sm">
      <p class="text-white px-2 py-1 rounded">เรียงตาม :</p>
      <Button label="ราคา" icon="pi pi-sort-alt" class="text-white px-2 py-1 rounded" />
      <Button label="จำนวนที่ขาย" icon="pi pi-sort-alt" class="text-white px-2 py-1 rounded" />
      <Button label="เรทติ้ง" icon="pi pi-sort-alt" class="text-white px-2 py-1 rounded" />
    </div>
    <div class="w-full px-3 flex flex-col gap-2 mt-5 border-t pt-3 pb-36">
      <div v-for="product in products" :key="product._id" class="flex justify-between bg-white shadow p-3 rounded" @click="$router.push('/partner/product/add?product_id=' + product._id + '&shop_id=' + shop_id)">
        <div class="flex justify-between gap-1 w-2/3">
          <div class="w-full max-w-20 h-24 rounded">
            <img v-if="product.images?.length" :src="product.images[0]?.preview" alt="image" @error="product.error = true" class="w-full h-full object-cover" :class="product.error ? 'hidden' : 'block'" >
            <div v-else class="w-full h-full flex justify-center items-center relative">
              <i class="pi pi-image text-gray-400 text-2xl"></i>
              <i class="pi pi-exclamation-circle text-red-400 absolute top-1 right-1"></i>
            </div>
          </div>
          <div class="flex flex-col gap-1 w-full">
            <p class="line-clamp-2 text-sm text-pretty">{{ product.name }}</p>
            <p class="line-clamp-1 text-xs text-gray-500">{{ product.description }}</p>
            <p class="text-xs">{{ product.category }}</p>
            <p class="text-[0.65rem] bg-gray-200 rounded w-fit px-1">{{ product.tags[0] }} {{ product.tags?.length > 1 ? '+' + (product.tags?.length - 1) : '' }}</p>
          </div>
        </div>
        <div class="flex flex-col items-end justify-between w-1/3">
          <div class="flex flex-col">
            <p :class="getProductClass(product)" class="rounded px-2 text-xs text-center max-w-fit">{{ getProductStatus(product) }}</p>
            <p class="text-xs min-w-fit text-right">x {{ product.stock }}</p>
          </div>
          <p>฿ {{ ((parseFloat(product.selling_price).toFixed(2))) }}</p>
          <div class="hidden">
            <i v-for="i in product.stars" :key="i" class="pi pi-star-fill text-xs text-yellow-400"></i>
            <i v-for="i in (5 - product.stars)" :key="i" class="pi pi-star text-xs text-gray-500"></i>
          </div>
          <p class="text-xs text-gray-500">ขายแล้ว {{ product.sold }} ชิ้น</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();
const shop_id = ref(route.query.shop_id);
const loading = ref(false)
const searchInput = ref("");
const selectedFilter = ref(null);
const selectedSortPrice = ref("min-max");
const selectedSortAmount = ref("max-min");
const selectedSortStar = ref("max-min");

const original_products = ref([]);
const products = ref([]);

const handleFilter = (filter) => {
  selectedFilter.value = filter
  if (filter && filter !== 5) {
    products.value = original_products.value.filter((product) => product.status === filter)
  } else if (filter === 5) {
    products.value = original_products.value.filter((product) => product.stock < 1)
  } else {
    products.value = original_products.value
  }
}

const fetchProducts = async () => {
  loading.value = true
  try {
    const { data } = await axios.get(
      `${process.env.VUE_APP_MARUEY}product/partner?shop_id=${shop_id.value}`,
    )
    console.log(data)
    if (data.status) {
      original_products.value = data.data?.sort((a, b) => a.status - b.status)?.reverse()
      products.value = original_products.value
      original_products.value.map(async (x) => {
        await getProductImages(x)
      })
    }
  }
  catch(err) {
    console.log(err)
  }
  finally {
    loading.value = false
  }
};

const getProductStatus = (product) => {
  if (product.stock === 0) {
    return "สินค้าหมด"
  } else if (product.status === 1) {
    return "วางขาย"
  } else if (product.status === 2) {
    return "หยุดขายชั่วคราว"
  } else if (product.status === 3) {
    return "ไม่ได้รับอนุญาติ"
  } else if (product.status === 4) {
    return "รอตรวจสอบ"
  }
}

const getProductClass = (product) => {
  if (product.stock === 0) {
    return "bg-orange-500 text-white"
  } else if (product.status === 1) {
    return "bg-green-500 text-white"
  } else if (product.status === 2) {
    return "bg-gray-500 text-black"
  } else if (product.status === 3) {
    return "bg-red-500 text-white"
  } else if (product.status === 4) {
    return "bg-yellow-500 text-black"
  }
}

const getProductImages = async (product) => {
  try {
    const { data } = await axios.get(
      `${process.env.VUE_APP_MARUEY}product/partner/product-image/${product._id}`, {
        headers: {
          token: "Bearer " + localStorage.getItem("token")
        }
      }
    );
    if (data.status) {
      product.images = data.data.sort((a, b) => parseInt(a.description) - parseInt(b.description));
      product.images?.forEach((image) => {
        image.preview = `${process.env.VUE_APP_MARUEY}${data.path}${image.path}/product`;
      })
      //console.log(images.value);
    }
  } catch (err) {
    console.log(err);
  }
}

onMounted(() => {
  fetchProducts()
})
</script>

<style scoped>
</style>
