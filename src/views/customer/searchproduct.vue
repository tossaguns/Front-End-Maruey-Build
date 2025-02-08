<template>
    <div v-if="isLoading" class="overlay">
        <div class="loader"></div>
    </div>
    <div class="h-screen ">
        <div class="w-full bg-[#fff] py-5 mb-20 md:mb-0">
            <div class=" mx-2  xl:w-4/6  md:mx-auto text-center">
               <div class="flex  justify-center items-center  h-60 border  text-xl font-bold " >
                    ค้นหา "{{route.params.id}}"
               </div>
            </div>
        </div>
        <div class="h-full w-full bg-[#f7f7f7]">
            <div class="  xl:w-4/6  mx-2 md:mx-auto py-3">
               <div class="bg-[#fff] text-[#8B2FC9] text-center py-3 font-medium   border-b-4  border-[#8B2FC9]" >
                    สินค้าแนะนำ
               </div>
                <div class="grid grid-cols-2  md:grid-cols-3 xl:grid-cols-6 gap-4 mt-2  mx-2 md:mx-0">
                    <div v-for="(product, _id) in data" :key="_id"  class=" bg-[#fff]" >
                        <div class="md:shrink-0 border" @click="linkproduct(product._id)">
                            <img :src="getImage(product.product_image)"  class="h-48 w-full object-cover " v-if ="product.product_image !='' && product.product_image !=null"/>
                            <img src="@/assets/images/noproduct.png" class="h-48 w-full object-cover " v-else/>
                        </div>
                        <div class="border px-2">
                            <div class="mx-1 my-2 text-base  overflow-hidde truncate" @click="linkproduct(product._id)">
                                {{product.product_name}}
                            </div>
                            <div class="flex  md:flex-row items-center mt-2.5 mb-4 ">
                                <div class="flex ">
                                    <div v-for="starIndex in 5" :key="starIndex"  >
                                        <svg class="w-4 h-4 md:w-5 md:h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" v-if="product?.rating >= starIndex">
						                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
					                    </svg>
                                   
                                        <svg class="w-[15px] h-[15px] md:w-[20px] md:h-[20px] border border-[#fff]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" v-else><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                    </div>
                                </div>
                                 
                                 <div class="w-full text-right">
                                    <span class=" bg-purple-200 text-purple-500 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-purple-200 dark:text-purple-500 ml-3">{{ product?.rating.toFixed(1) }}</span>
                                 </div>

					            
                            </div>
                            <div class="mx-1 my-2 text-base flex justify-center items-center" @click="linkproduct(product._id)">
                                <div class="w-1/3 text-xs md:text-base">
                                    ฿ {{product.product_price}}
                                </div>
                                <div class="w-2/3 text-right text-sm">
                                    <button @click="addproduct(product,1,'')" class="bg-[#8B2FC9] hover:bg-[#6818A5] rounded-md p-2 text-[#fff] " v-if="product?.product_stock >0">
                                        <div class="flex items-center justify-center">
                                            <div class="text-xs"> เพิ่มลงตะกร้า</div>
                                        </div>
                                    </button>
                                    <div v-else>
                                        <div class="text-red-500 p-2">สินค้าหมด !!</div>
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


const data = ref([]);

const getData = async () => {
   
    const config = {
      method: "get",
      url: `${process.env.VUE_APP_MARUEY}product/search/${route.params.id}`,
    };
    await axios(config).then((res) => {
            data.value = res.data?.data;
            if(data.value.length>0)
            {
                data.value = data.value.filter((item) => item?.product_status  == true);
            }
    }).catch((err) => { console.log(err);});
    
};


onMounted(async () => {
    document.title = "Maruey || ช้อปปิ้งออนไลน์";
    isLoading.value = true;
    await getData();
    isLoading.value = false;
});

const getImage = (item) => {
      return `https://drive.google.com/thumbnail?id=${item}&sz=w1000`;
};

const addproduct = (product) =>{
    
}

router.beforeEach((to, from, next) => {

    if(to.name == from.name)
    {
       setTimeout(async() => {
            isLoading.value = true;
            await getData();
            isLoading.value = false;
       }, 200);
    }
    next(); // ไปยังขั้นตอนถัดไป
});

const linkproduct = (id)=>{
    router.push(`/singleproduct/${id}`);
}
</script>




<style scoped>

@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

@import "@/assets/Loading.css";
</style>