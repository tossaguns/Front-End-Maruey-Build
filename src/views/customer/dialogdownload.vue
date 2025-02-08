
<template>
  <div>
    <div
      v-if="dialogVisible"
      @click.self="hideDialog"
      class="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-gray-900 bg-opacity-40  transition-opacity duration-300"
    >
        <div class="px-10 w-80 ">
            <img src="@/assets/images/logo.png"  class="w-full" alt="">
            <!-- ปุ่มดาวน์โหลด -->
            <div class="flex justify-center mt-5">
                <a
                    class="select-none rounded-lg bg-purple-700 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:bg-purple-600 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    href="https://drive.google.com/file/d/1a9g0kHd324Nt_EzWjiojTMydOdg_ThRd/view?usp=drive_link" target="_blank"
                >
                    ดาวน์โหลด
                </a>
            </div>
        </div>
       

    </div>
  </div>
</template>



<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import { useRoute, useRouter } from 'vue-router';

const store = useStore();
const toast = useToast();
const confirm = useConfirm();
const route = useRoute();
const router = useRouter();
const isLoading = ref(false);
const dialogVisible = ref(false);

const showDialog = () => {
  dialogVisible.value = true;
};

const hideDialog = () => {
  dialogVisible.value = false;
  store.commit('setDialog', false);

};

onMounted(async () => {
  //console.log('โง่')
    if(store.getters.dialog == true)
    {
       
        showDialog();
    
    }
  
});
</script>

<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

@import "@/assets/Loading.css";






</style>