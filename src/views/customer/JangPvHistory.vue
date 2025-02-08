<template>
    <div class="text-xl p-5 w-full flex justify-between items-center">
        
        <button type="button" class="rounded-full text-purple-500 flex justify-center items-center" @click="$router.go(-1)">
            <i class="pi pi-caret-left"></i>
        </button>
        
        <div class="flex gap-3 items-center">
            <i class="pi pi-history"></i>
            <p>ประวัติการแจง pv</p>
        </div>
        
        <button type="button" class="rounded-full bg-[#8B2FC9] text-white p-2 flex justify-center items-center" @click="fetchJangPv">
            <i class="pi pi-refresh"></i>
        </button>
        
    </div>
    <div class="flex w-full justify-center">
        <div class="relative">
            <input type="text" v-model="searchInput" placeholder="ค้นหา" class="w-full px-2 py-1 border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]" >
            <i class="pi pi-search absolute text-zinc-400 end-2 top-1/2 -translate-y-1/2"></i>
        </div>
    </div>
    
    <div class="flex w-full px-5 mt-2">
        <button class="border px-2 py-1 w-full max-w-[5rem]" @click="filterDateType = 'today'" :class="filterDateType === 'today' ? 'bg-[#8B2FC9] text-white' : ''">
            วันนี้
        </button>
        <button class="border px-2 py-1 w-full max-w-[5rem]" @click="filterDateType = 'custom'" :class="filterDateType === 'custom' ? 'bg-[#8B2FC9] text-white' : ''">
            เลือกวันที่
        </button>
        <div class="relative" v-if="filterDateType === 'custom'">
            <input type="date" v-model="filterDateInput" placeholder="วว/ดด/ปปปป" class="w-full placeholder:text-zinc-400 px-2 py-1 border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]" >
        </div>
    </div>

    <div class="w-full" v-if="!pvs.length">
        <div>
           <img src="@/assets/images/empty-data.jpg" class="w-full opacity-30" >
           <p class="text-center text-gray-500">ไม่พบข้อมูล แจง pv ของวันที่เลือก</p>
        </div>
    </div>
    
    <div class="w-full" v-else>
        <Accordion :activeIndex="0">
            <AccordionTab v-for="pv in pvs" :key="pv.id">
                <template #header>
                    <div class="w-full flex justify-between px-3">
                        <span class="text-sm">{{ pv.code }} <span class="text-purple-500 text-xs">{{ pv.pv }} pv</span></span>
                        <span class="text-gray-500 text-xs">{{ dateShortTH(pv.created_at) }}</span>
                    </div>
                </template>
                <div>
                    <div class="flex gap-2">
                        <p>ผู้ทำรายการ : </p>
                        <p>{{ pv.customer_username || $store.getters.me?.user_name }}</p>
                    </div>
                    <div class="flex gap-2">
                        <p>ผู้รับ PV : </p>
                        <p>{{ pv.to_customer_username || $store.getters.me?.user_name }}</p>
                        <p class="truncate">({{ pv.to_customer_name || 'ฉัน' }})</p>
                    </div>
                    <div class="flex gap-2">
                        <p>จำนวน PV : </p>
                        <p>{{ pv.pv }}</p>
                    </div>
                    <div class="flex gap-2">
                        <p>ประเภทการแจง : </p>
                        <p>{{ getJangType(pv.type) }}</p>
                    </div>
                </div>
            </AccordionTab>
        </Accordion>
    </div>
</template>

<script setup>
import axios from "axios"
import { ref, onMounted, computed, watch } from "vue"
// import dayjs from "dayjs";
//import "dayjs/locale/th";
//import buddhistEra from "dayjs/plugin/buddhistEra";
import { useStore } from "vuex";

//dayjs.extend(buddhistEra);
const store = useStore();

onMounted(() => {
    fetchJangPv()
})

const searchInput = ref("")
const filterDateInput = ref(new Date())
const filterDateType = ref("today")

const filterDate = computed(() => {
    return dateShortDateTH(filterDateInput.value);
})

watch(filterDateType, () => {
    if (filterDateType.value === "today") {
        filterDateInput.value = new Date();
    }
})

const dateShortTH = (isoDate) => {
    //dayjs.locale("th");
    //return dayjs(date).format("DD/MM/YYYY HH:mm");
    //const isoDate = date;
    const date = new Date(isoDate);
    const formattedDate = `${String(date.getUTCDate()).padStart(2, '0')}/${String(date.getUTCMonth() + 1).padStart(2, '0')}/${date.getUTCFullYear()+543} ${String(date.getUTCHours()).padStart(2, '0')}:${String(date.getUTCMinutes()).padStart(2, '0')}`;
    return formattedDate
}

const dateShortDateTH = (isoDate) => {
    //dayjs.locale("th");
    //return dayjs(date).format("DD/MM/YYYY HH:mm");
    //const isoDate = date;
    const date = new Date(isoDate);
    const formattedDate = `${String(date.getUTCDate()).padStart(2, '0')}/${String(date.getUTCMonth() + 1).padStart(2, '0')}/${date.getUTCFullYear()+543}`;
    return formattedDate
}

const originalPvs = ref([])

const pvs1 = computed(() => {
    let result = originalPvs.value?.filter(pv =>  dateShortDateTH(pv.created_at) === filterDate.value)
    return result
})

const pvs = computed(() => {
    let result = pvs1.value
    if (searchInput.value && searchInput.value?.trim() !== '') {
        result = pvs1.value?.filter(pv => 
            pv.code?.trim()?.includes(searchInput.value?.trim())
            || pv.to_customer_username?.trim()?.includes(searchInput.value?.trim())
            || pv.pv?.toString()?.includes(searchInput.value?.trim())
        )
    } else{
        result = pvs1.value
    }

    return result
})

const pvTypes = ref([
    { id: 1, type: "ยืนยันรับสิทธิ์" },
    { id: 2, type: "ReCashback" },
    { id: 3, type: "Fast Start" },
    { id: 4, type: "สมัครสมาชิก" },
    { id: 5, type: "ซื้อสินค้า" },
    { id: 6, type: "โอน PV" },
])

const getMemberName = async (pv) => {
    try {
        const { data } = await axios.get(`${process.env.VUE_APP_MARUEY}member-name/${pv.to_customer_username}`)
        if (data.status) {
            pv.to_customer_name = data.data?.name
        }
    }
    catch(err) {
        //console.log(err)
    }
}

const fetchJangPv = async () => {
    try {
        const { data } = await axios.get(`${process.env.VUE_APP_MARUEY}jangpv/users/${store.getters.me?.user_name}`)
        //console.log(data)
        if (data.status) {
            originalPvs.value = data.data?.reverse() || []
            if (originalPvs.value.length) {
                await Promise.all(originalPvs.value.map( async (x) => {
                    getMemberName(x)
                }))
            }
        }
    }
    catch(err) {
        //console.log(err)
    }
} 

const getJangType = (type) => {
    return pvTypes.value.find((pvType) => pvType.id == type).type
}
</script>