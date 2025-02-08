<template>
  <div v-if="isLoading" class="overlay">
    <div class="loader"></div>
  </div>
  <!-- bg-[#f7f7f7] -->
  <div class="h-full bg-[#f7f7f7] border mt-10">
    <div class="h-full w-full mb-16">
      <div class="w-full lg:w-4/6 md:mx-auto py-7">
        <div class="flex-cols md:flex mx-4 bg-[#fff] text-center py-3 font-medium">
          <div class="flex w-full md:w-1/2 md:mx-2 md:my-3 justify-center items-center">
            <Image
              :src="data.product_image"
              width="100%"
              class="m-2"
              v-if="data.product_image != '' && data.product_image != null"
              preview
            />
            <Image
              src="/src/assets/images/noproduct.png"
              width="100%"
              class="m-2"
              v-else
              preview
            />
          </div>
          <div class="md:shrink md:flex-grow-0 w-full mx-2 my-3">
            <div class="text-left mt-2 text-2xl pl-2 text-[#8B2FC9]">
              <div class="text-sm text-[#000]">
                {{ data.category_id }}
              </div>
              <div class="md:w-full">{{ data.product_name }}</div>
              <div class="flex md:flex-row items-center mt-2.5 mb-4">
                <div class="flex mt-2">
                  <div v-for="starIndex in 5" :key="starIndex">
                    <svg
                      class="w-5 h-5 text-yellow-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      v-if="data?.rating >= starIndex"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      ></path>
                    </svg>

                    <svg
                      class="w-[19px] h-[19px] border border-[#fff]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      v-else
                    >
                      <polygon
                        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                      ></polygon>
                    </svg>
                  </div>
                </div>
                <div class="text-right">
                  <span
                    class="bg-purple-200 text-purple-500 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-purple-200 dark:text-purple-500 ml-3"
                    >{{ data?.rating?.toFixed(1) }}</span
                  >
                </div>
              </div>
            </div>
            <div
              class="bg-[#f7f7f7] text-3xl mt-7 mr-5 text-left pl-5 py-2 text-[#8B2FC9]"
            >
              ฿
              {{
                data.selling_price?.toLocaleString("en", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }}
            </div>
            <div
              class="flex justify-center items-center gap-2 text-center md:text-left pl-0 md:pl-5 mt-10 text-sm mr-5"
            >
              <div>จำนวน :</div>
              <button class="text-[#000] px-2 py-1 rounded border">
                <div class="flex items center py-1.5">
                  <div @click="minusquantity()" class="p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </div>
                  <div class="px-4 text-base font-bold">
                    {{ data.product_qty }}
                  </div>
                  <div @click="addquantity()" class="p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </div>
                </div>
              </button>
              <div>มีสินค้า {{ data.product_stock }} ชิ้น</div>
            </div>
            <div class="text-left mt-10 border mr-5" v-if="data.product_stock > 0">
              <div class="flex justify-center items-center md:justify-normal gap-2">
                <button
                  @click="addproduct(data, data.product_qty, sharelinkcode)"
                  class="border-2 border-[#8B2FC9] bg-[#DC97FF] hover:bg-[#D283FF] rounded p-2.5 md:px-5 text-[#8B2FC9] w-full"
                >
                  <div class="flex items-center justify-center">
                    <svg
                      class="mr-2 hidden md:block"
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#8B2FC9"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <circle cx="10" cy="20.5" r="1" />
                      <circle cx="18" cy="20.5" r="1" />
                      <path
                        d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1"
                      />
                    </svg>
                    <div class="text-sm">เพิ่มไปยังรถเข็น</div>
                  </div>
                </button>
                <button
                  @click="paymentproduct(data, data.product_qty, sharelinkcode)"
                  class="bg-[#8B2FC9] hover:bg-[#6818A5] rounded py-2.5 px-4 md:px-16 text-[#fff] w-full"
                >
                  ซื้อสินค้า
                </button>
              </div>
            </div>
            <div class="text-left md:pl-5 mt-10" v-else>
              <div class="flex justify-center md:justify-normal">
                <div class="text-red-500 text-2xl p-2 w-full text-center md:text-left">
                  สินค้าหมด !!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full lg:w-4/6 my-2 md:my-0 mx-0 md:mx-auto pb-3">
        <div class="bg-[#fff] text-center flex flex-col mx-4 font-medium">
          <div class="text-left font-semibold px-3 py-3 text-base md:text-xl mb-3">
            แชร์ลิงค์สินค้า
          </div>
          <div class="flex justify-center items-center pb-3 lg:w-full">
            <div class="w-3/5 lg:w-4/5 md:pl-3">
              <input
                v-model="data.sharelinkcode"
                type="text"
                class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
                placeholder="กรุณากรอกรหัสผู้แนะนำ"
                disabled
                id="copyInput"
              />
            </div>
            <div class="w-auto md:w-2/5 lg:w-1/5">
              <button
                @click="copylink()"
                class="bg-[#8B2FC9] text-white mt-1 p-2 rounded ml-2 md:px-10 w-full"
              >
                คัดลอกลิงค์
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full lg:w-4/6 my-2 md:my-0 md:mx-auto pb-5">
        <div class="bg-[#fff] text-center mx-4 py-3 pb-5 font-medium">
          <div class="text-left pl-5 font-semibold text-xl">รายละเอียดสินค้า</div>
          <div class="mx-7 mt-4" v-html="data.product_detail"></div>
        </div>
      </div>

      <div class="w-full lg:w-4/6 my-2 md:my-0 md:mx-auto pb-4" v-if="review.length > 0">
        <div
          class="bg-[#fff] text-[#8B2FC9] text-center mx-4 py-3 font-medium border-b-4 border-[#8B2FC9]"
        >
          รีวิวสินค้า
        </div>
        <div class="grid grid-cols-1 pt-5 pb-2 bg-[#fff] mx-4">
          <div
            class="flex w-full border border-gray-200 py-2"
            v-for="item in visibleReviews"
            :key="item._id"
          >
            <div class="w-2/12 md:w-1/12 flex justify-center pt-2.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" />
                <circle cx="12" cy="10" r="3" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>

            <div class="w-10/12 md:w-11/12 px-2 pt-1 pb-2">
              <div>{{ item.customer_id.name }}</div>
              <div>
                <Rating
                  v-model="item.rating"
                  readonly
                  :cancel="false"
                  size="small"
                  class="reviewicon"
                />
              </div>
              <div class="pt-2">
                {{ dayjs(item.createdAt).format("DD/MM/YYYY HH:mm") }}
              </div>
              <div class="pt-2">{{ item.comment }}</div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="pagination lg:w-4/6 my-2 md:my-0 md:mx-auto pb-10 flex gap-2 justify-center items-center mx-4"
        v-if="review.length > 0"
      >
        <button
          @click="previousPage"
          :disabled="currentPage === 1"
          class="bg-[#8B2FC9] hover:bg-[#6818A5] rounded p-2 text-[#fff]"
        >
          ก่อนหน้า
        </button>
        <span
          class="bg-[#8B2FC9] hover:bg-[#6818A5] rounded p-2 text-[#fff] px-7 text-lg"
          >{{ currentPage }}</span
        >
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="bg-[#8B2FC9] hover:bg-[#6818A5] rounded p-2 text-[#fff]"
        >
          ถัดไป
        </button>
      </div>

      <div class="w-full lg:w-4/6 my-2 md:my-0 md:mx-auto pb-4">
        <div
          class="bg-[#fff] text-[#8B2FC9] text-center py-3 font-medium mx-1 border-b-4 border-[#8B2FC9]"
        >
          สินค้าแนะนำ
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-2 mx-1">
          <div
            v-for="(product, _id) in recommend"
            :key="_id"
            class="bg-[#fff]"
            @click="linkproduct(product._id)"
          >
            <div class="md:shrink-0 border">
              <img
                :src="product.product_image"
                class="h-48 w-full object-cover"
                v-if="product.product_image != '' && product.product_image != null"
              />
              <img
                src="@/assets/images/noproduct.png"
                class="h-48 w-full object-cover"
                v-else
              />
            </div>
            <div class="border px-2">
              <div
                class="mx-1 my-2 text-base overflow-hidde truncate"
                @click="linkproduct(product._id)"
              >
                {{ product.product_name }}
              </div>
              <div class="flex md:flex-row items-center mt-2.5 mb-4">
                <div class="flex">
                  <div v-for="starIndex in 5" :key="starIndex">
                    <svg
                      class="w-4 h-4 md:w-5 md:h-5 text-yellow-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      v-if="product?.rating >= starIndex"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      ></path>
                    </svg>

                    <svg
                      class="w-[15px] h-[15px] md:w-[20px] md:h-[20px] border border-[#fff]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      v-else
                    >
                      <polygon
                        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                      ></polygon>
                    </svg>
                  </div>
                </div>

                <div class="w-full text-right">
                  <span
                    class="bg-purple-200 text-purple-500 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-purple-200 dark:text-purple-500 ml-3"
                    >{{ product?.rating.toFixed(1) }}</span
                  >
                </div>
              </div>
              <div
                class="mx-1 my-2 text-base flex justify-center items-center"
                @click="linkproduct(product._id)"
              >
                <div class="w-1/3 text-xs md:text-base">
                  ฿ {{ product.product_price }}
                </div>
                <div class="w-2/3 text-right text-sm">
                  <button
                    @click="addproduct(product, 1, '')"
                    class="bg-[#8B2FC9] hover:bg-[#6818A5] rounded-md p-2 text-[#fff]"
                    v-if="product?.product_stock > 0"
                  >
                    <div class="flex items-center justify-center">
                      <div class="text-xs">เพิ่มลงตะกร้า</div>
                    </div>
                  </button>
                  <div v-else>
                    <div class="text-red-500 text-xs md:text-base p-2">สินค้าหมด !!</div>
                  </div>
                </div>
              </div>
            </div>
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
import { ref, onMounted, computed, watchEffect } from "vue";
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

const data = ref({});
const recommend = ref([]);
const userdata = ref({});
const getData = async () => {
  const config = {
    method: "get",
    url: `${process.env.VUE_APP_MLM}/productDetail`,
    params: {product_id: route.params.id}
  };
  await axios(config)
    .then(async (res) => {
      data.value = res.data?.data;
      data.value.product_qty = 1;
      data.value.product_image = res.data?.data?.full_image_url
      data.value.sharelinkcode = `${process.env.VUE_APP_LINKSHARE}singleproduct/${data.value._id}/${userdata.value.referralcode}`;
      await getRecommend(data.value.category_id);
    })
    .catch((err) => {
      //console.log(err);
    });
};

const getRecommend = async (category) => {
  const config = {
    method: "get",
    url: `${process.env.VUE_APP_MARUEY}product/recommend/${category}`,
  };
  await axios(config)
    .then((res) => {
      recommend.value = res.data?.data;
      if (recommend.value.length > 0) {
        recommend.value = recommend.value.filter((item) => item?.product_status == true);
      }
    })
    .catch((err) => {
      //console.log(err);
    });
};
const sharelinkcode = ref("");

onMounted(async () => {
  document.title = "Maruey || ช้อปปิ้งออนไลน์";
  isLoading.value = true;
  //userdata.value.referralcode = "";
  if (store.getters._id) {
    await getuser();
  }
  await getData();
  //await getreview();
  if (route.params.sharelinkcode) {
    sharelinkcode.value = route.params.sharelinkcode;
  }
  isLoading.value = false;
});

const getuser = async () => {
  /* const config = {
    method: "get",
    url: `${process.env.VUE_APP_MARUEY}customer/byid/${store.getters._id}`,
    headers: {
      token: "Bearer " + localStorage.getItem("token"),
    },
  };
  await axios(config)
    .then((res) => {
      userdata.value = res.data?.data;
    })
    .catch((err) => {
      //console.log(err);
    }); */
    userdata.value = store.getters.me
};

const getImage = (item) => {
  return `https://drive.google.com/thumbnail?id=${item}&sz=w1000`;
};

const addproduct = (product, quantity, sharelinkcode) => {
  const data = {
    product: product,
    quantity: quantity,
    sharelinkcode: sharelinkcode,
  };
  // ใช้ store เพื่อเก็บข้อมูลลงตะกร้าสินค้า ด้วยฟังก์ชั่น addToCart
  store.commit("addToCart", data);
};

const paymentproduct = (product, quantity, sharelinkcode) => {
  const data = {
    product: product,
    quantity: quantity,
    sharelinkcode: sharelinkcode,
  };
  // ใช้ store เพื่อเก็บข้อมูลลงตะกร้าสินค้า ด้วยฟังก์ชั่น addToCart
  store.commit("addToCart", data);
  router.push("/checkout");
};

const linkproduct = (id) => {
  router.push({ name: "singleproduct", params: { id: id } });
};

const addquantity = () => {
  /* if (data.value.product_qty < data.value.product_stock) {
    data.value.product_qty += 1;
  } else {
    Swal.fire({
      icon: "error",
      title: "สินค้ามีไม่พอ!",
      text: "สินค้ามีไม่พอในสต็อก!",
    });
  } */
  data.value.product_qty++
};
const minusquantity = () => {
  if (data.value.product_qty > 1) {
    data.value.product_qty--
  }
};

const copylink = () => {
  const tempElement = document.createElement("textarea");
  tempElement.value = data.value.sharelinkcode;
  document.body.appendChild(tempElement);
  tempElement.select();
  document.execCommand("copy");
  document.body.removeChild(tempElement);
  // navigatorref.clipboard.writeText(data.value.sharelinkcode);

  Swal.fire({
    text: "คัดลอกลิงค์สำเร็จ",
    icon: "success",
    iconColor: "#8B2FC9",
    confirmButtonColor: "#8B2FC9",
  });
};
const review = ref([]);
const getreview = async () => {
  const config = {
    method: "get",
    url: `${process.env.VUE_APP_MARUEY}review/byproduct/${route.params.id}`,
  };
  await axios(config)
    .then((res) => {
      review.value = res.data?.data;
    })
    .catch((err) => {
      //console.log(err);
    });
};

router.beforeEach((to, from, next) => {
  if (to.name == from.name) {
    setTimeout(async () => {
      isLoading.value = true;
      await getData();
      isLoading.value = false;
    }, 200);
  }
  next(); // ไปยังขั้นตอนถัดไป
});

const currentPage = ref(1);
const reviewsPerPage = 5;

// คำนวณหน้าที่แสดงและรีวิวที่แสดงในแต่ละหน้า
const visibleReviews = computed(() => {
  const startIndex = (currentPage.value - 1) * reviewsPerPage;
  return review.value.slice(startIndex, startIndex + reviewsPerPage);
});

// คำนวณหน้าทั้งหมด
const totalPages = computed(() => Math.ceil(review.value.length / reviewsPerPage));

// ฟังก์ชันสำหรับเลื่อนหน้าก่อนหน้า
const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// ฟังก์ชันสำหรับเลื่อนหน้าถัดไป
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};
</script>

<style>
.p-inputnumber input {
  width: 70px !important; /* ปรับขนาดของ input ตามต้องการ */
}

.p-image img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* ปรับขนาดรูปภาพเพื่อครอบคลุมพื้นที่ทั้งหมดของ element */
  object-position: center; /* ตำแหน่งของภาพซึ่งให้กึ่งกลางตามแกนแนวตั้งและแนวนอน */
}
.p-image-preview {
  width: 90%;
  height: 90%;
}
.p-rating .p-rating-item .p-rating-icon.p-icon {
  width: 15px !important;
  height: 15px !important;
}
</style>

<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

@import "@/assets/Loading.css";
</style>
