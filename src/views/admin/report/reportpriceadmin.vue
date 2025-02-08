<template>
  <div v-if="isLoading" class="overlay">
    <div class="loader"></div>
  </div>
  <div class="flex w-full pt-5 justify-center px-2 sm:px-10">
    <div class="grow w-full">
      <div class="text-center py-5 bg-white rounded-t-xl drop-shadow-2xl bg-opacity-80">
        <div class="mt-10 font-semibold text-2xl text-[#8B2FC9]">
          report ยอดขายแต่ละร้าน
        </div>
      </div>
   
      <div class="text-center py-5 bg-white drop-shadow-2xl bg-opacity-80 rounded-b-xl" style="min-height: 82vh">
          <!-- <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4 gap-4">
            <div
                class="bg-[#FFF]  shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-[#8B2FC9] text-white font-medium group">
                <div
                    class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B2FC9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>    
                </div>
                <div class="text-right">
                    <p class="text-xl text-[#8B2FC9]">{{data[0]?.partner?.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}}</p>
                    <p class='text-[#8B2FC9]'>ยอดเงินคงเหลือ partner {{ dayjs(data[0]?.date).format("DD/MM/YYYY") }} </p>
                </div>
            </div>
              
            <div class="bg-[#FFF]  shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-[#8B2FC9] text-white font-medium group">
                <div class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B2FC9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
                <div class="text-right">
                   <p class="text-xl text-[#8B2FC9]">{{data[0]?.customer?.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}}</p>
                   <p class='text-[#8B2FC9]'>ยอดเงินคงเหลือ ลูกค้า {{ dayjs(data[0]?.date).format("DD/MM/YYYY") }}</p>
                </div>
            </div>
            <div
                class="bg-[#FFF]  shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-[#8B2FC9] text-white font-medium group">
                <div
                    class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">

                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B2FC9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 3v5h5M16 13H8M16 17H8M10 9H8"/></svg>
                </div>
                <div class="text-right">
                    <p class="text-xl text-[#8B2FC9]">{{data[0]?.money?.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}}</p>
                    <p class="text-[#8B2FC9]">ยอดรวมเงินคงเหลือในระบบ {{ dayjs(data[0]?.date).format("DD/MM/YYYY") }}</p>
                </div>
            </div>
      
        </div> -->
        <DataTable
          :value="Filter"
          :paginator="true"
          :rows="5"
          :rowsPerPageOptions="[5, 10, 20, 50]"
          responsiveLayout="stack"
          selectionMode="single"
          class="font mx-2 opacity-100"
          id="print"
          currentPageReportTemplate="แสดง {first} ถึง {last} ใน {totalRecords} รายการ"
        >
          <template #empty>
            <p class="font-italic text-center text-2xl">ไม่มีข้อมูล</p>
          </template>
          <template #header>
                <div class=" flex flex-col md:flex-row md:justify-between">
                  <div class="p-buttonset  p-2 text-center md:text-left">  
                    <Button label="วัน" class="text-white py-2 px-4  border" :class="status==1? 'bg-[#000] hover:bg-[#374151]':'bg-[#8B2FC9] hover:bg-[#E178C5]'"   @click="changeStatus(1)" />
                    <Button label="เดือน" class=" text-white p-2 px-4 border" :class="status==2? 'bg-[#000] hover:bg-[#374151]':'bg-[#8B2FC9] hover:bg-[#E178C5]'" @click="changeStatus(2)"/>
                    <Button label="ปี" class=" text-white p-2 px-4 border" :class="status==3? 'bg-[#000] hover:bg-[#374151]':'bg-[#8B2FC9] hover:bg-[#E178C5]'" @click="changeStatus(3)"/>
                  </div> 
                  <span class="relative">
                    <i
                      class="pi pi-search absolute inset-y-0  md:pb-3  pl-3 flex items-center "
                    ></i>
                    <input
                      v-model="searchall"
                      placeholder="ค้นหา"
                      class="pl-10 border rounded p-1 py-2 w-full md:w-auto"
                    />
                  </span>
                </div>
          </template>
          <Column header="วันที่" >
            <template #body="item">
                <div v-if="status == 1" >{{ dayjs(item.data.date).format("DD/MM/YYYY") }}</div>
                <div v-else-if="status==2"> {{ dayjs(item.data.date).format("MM/YYYY") }}</div>
                <div v-else-if="status==3"> {{ dayjs(item.data.date).format("YYYY") }}</div>
            </template>
          </Column>
            <Column header="ร้านค้า">
                <template #body="item">
                <div>{{ item.data.name }}</div>
                </template>
            </Column>
          <Column header="ยอดขาย">
            <template #body="item">
              <div> ฿ {{ item.data.total?.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</div>
            </template>
          </Column>         
        </DataTable>
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
const token = ref("Bearer "+localStorage.getItem("token")) 


const data = ref([]);
const getData = async () => {
    const config = {
      method: "post",
      headers: {
        "token": token.value,
      },
      data: { id:"day"},
      url: `${process.env.VUE_APP_MARUEY}report/reportpartner`,
    };
    await axios(config).then((res) => {
            data.value = res.data?.data;
            if(data.value.length > 0)
            {
                data.value.sort((a, b) => {
                    const dateA = new Date(a._id);
                    const dateB = new Date(b._id);
                    return dateB - dateA; // ให้ข้อมูลที่มาใหม่ที่สุดอยู่ด้านบน
                });
            }
    }).catch((err) => { console.log(err);});
    
};

const getMonth = async () => {
    const config = {
      method: "post",
      headers: {
        "token": token.value,
      },
      data: { id:"month"},
      url: `${process.env.VUE_APP_MARUEY}report/reportpartner`,
    };
    await axios(config).then((res) => {
            data.value = res.data?.data;
            if(data.value.length > 0)
            {
               data.value.sort((a, b) => {
                    const dateA = new Date(a._id);
                    const dateB = new Date(b._id);
                    return dateB - dateA; // ให้ข้อมูลที่มาใหม่ที่สุดอยู่ด้านบน
                });
            }
    }).catch((err) => { console.log(err);});
    
};

const getYear  = async () => {
    const config = {
      method: "post",
      headers: {
        "token": token.value,
      },
      data: { id:"year"},
      url: `${process.env.VUE_APP_MARUEY}report/reportpartner`,
    };
    await axios(config).then((res) => {
            data.value = res.data?.data;
            if(data.value.length > 0)
            {
                data.value.sort((a, b) => {
                    const dateA = new Date(a._id);
                    const dateB = new Date(b._id);
                    return dateB - dateA; // ให้ข้อมูลที่มาใหม่ที่สุดอยู่ด้านบน
                });
            }
    }).catch((err) => { console.log(err);});
    
};



onMounted(async () => {
    document.title = "ข้อมูลสรุปรายรับ-รายจ่าย || Maruey";
    isLoading.value = true;
    await getData();
    isLoading.value = false;
});

const searchall = ref(""); 
const Filter = computed(() => {
    if (searchall.value) {
      return data.value.filter((item) => {
        return item.data?._id.toLowerCase().includes(searchall.value.toLowerCase());
      });
    }
    return data.value;
});

const status = ref(1);
const changeStatus = async (value) => {
    status.value = value;
    isLoading.value = true;
    if(value == 1)
    {
        await getData();
     
    }
    else if(value == 2)
    {
        await getMonth();
    }
    else if(value == 3)
    {
        await getYear();
    }
    
    isLoading.value = false;
}
</script>

<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

@import "../../../assets/Loading.css";
</style>

<style>
div:where(.swal2-container) {
  z-index: 9000;
}

@media (max-width: 1199px) {
  .dialog-class {
    width: 75vw;
  }
}

@media (max-width: 575px) {
  .dialog-class {
    width: 90vw;
  }
}
</style>

<style>
  .p-inputtext {
   padding: 0.5rem;
  }
</style>