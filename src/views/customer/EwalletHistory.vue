<template>
    <div class="text-xl p-5 w-full flex justify-between items-center">
        
        <button type="button" class="rounded-full text-purple-500 flex justify-center items-center" @click="$router.go(-1)">
            <i class="pi pi-caret-left"></i>
        </button>
        
        <div class="flex gap-3 items-center">
            <i class="pi pi-history"></i>
            <p>ประวัติ e-wallet</p>
        </div>
        
        <button type="button" class="rounded-full bg-[#8B2FC9] text-white p-2 flex justify-center items-center" @click="fetchEwallets">
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

    <div class="w-full" v-if="!ewallets.length">
        <div>
           <img src="@/assets/images/empty-data.jpg" class="w-full opacity-30" >
           <p class="text-center text-gray-500">ไม่พบข้อมูล ewallet ของวันที่เลือก</p>
        </div>
    </div>
    
    <div class="w-full" v-else>
        <Accordion :activeIndex="0">
            <AccordionTab v-for="ewallet in ewallets" :key="ewallet.id">
                <template #header>
                    <div class="w-full">
                        <div class="w-full flex justify-between px-3">
                            <p>{{ ewallet.transaction_code }}</p>
                            <p class="text-gray-500">{{ dateShortTH(ewallet.created_at) }}</p>
                        </div>
                        <div class="flex justify-between items-center px-3">
                            <p v-if="ewallet.old_balance < ewallet.balance" class="text-emerald-500 text-sm">+ {{ ewallet.amt }}</p>
                            <p v-else class="text-red-500 text-sm">- {{ ewallet.amt }}</p>
                            <p class="text-sm ml-3" :class="getEwalletStatus(ewallet.status)?.class">{{ getEwalletStatus(ewallet.status)?.status }}</p>
                        </div>
                    </div>
                </template>
                <div>
                    <div class="hidden gap-2">
                        <p>ผู้รับ ewallet : </p>
                        <p>{{ ewallet.customers_name_receive }}</p>
                        <p class="truncate">({{ ewallet.customers_receive_name || '???' }})</p>
                    </div>
                    <div class="flex gap-2">
                        <p>คำอธิบาย : </p>
                        <p>{{ ewallet.note_orther }}</p>
                    </div>
                    <div class="flex gap-2">
                        <p>จำนวน : </p>
                        <p v-if="ewallet.old_balance < ewallet.balance" class="text-emerald-500">+ {{ ewallet.amt }}</p>
                        <p v-else class="text-red-500">- {{ ewallet.amt }}</p>
                    </div>
                    <div class="flex gap-2">
                        <p>ยอดบัญชี : </p>
                        <p>{{ ewallet.old_balance }} --> {{ ewallet.balance }}</p>
                    </div>
                </div>
            </AccordionTab>
        </Accordion>
    </div>
</template>

<script setup>
import axios from "axios"
import { ref, onMounted, computed, watch } from "vue"
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import { useStore } from "vuex";
 
dayjs.extend(buddhistEra);
const store = useStore();

onMounted(() => {
    fetchEwallets()
})

const searchInput = ref("")
const filterDateInput = ref(new Date())
const filterDateType = ref("today")

const filterDate = computed(() => {
    return dayjs(filterDateInput.value).format("YYYY-MM-DD");
})

watch(filterDateType, () => {
    if (filterDateType.value === "today") {
        filterDateInput.value = new Date();
    }
})

const dateShortTH = (date) => {
  dayjs.locale("th");
  return dayjs(date).format("DD/MM/BBBB");
}

const original_ewallets = ref([])

const ewallets1 = computed(() => {
    let result = original_ewallets.value?.filter(ewallet =>  dayjs(ewallet.created_at).format("YYYY-MM-DD") === filterDate.value)
    return result
})

const ewallets = computed(() => {
    let result = ewallets1.value
    if (searchInput.value && searchInput.value?.trim() !== '') {
        result = ewallets1.value?.filter(pv => 
            pv.code?.trim()?.includes(searchInput.value?.trim())
            || pv.to_customer_username?.trim()?.includes(searchInput.value?.trim())
            || pv.pv?.toString()?.includes(searchInput.value?.trim())
        )
    } else{
        result = ewallets1.value
    }

    return result
})

const ewalletTypes = ref([
    { id: 1, type: "jangpv" },
    { id: 2, type: "jangpv" },
    { id: 3, type: "jangpv" },
    { id: 4, type: "jangpv" },
    { id: 5, type: "jangpv" },
    { id: 6, type: "jangpv" },
])

const ewalletStatuses = ref([
    { id: 1, status: "รออนุมัติ", class: "text-yellow-500" },
    { id: 2, status: "อนุมัติ", class: "text-green-500" },
    { id: 3, status: "ไม่อนุมัติ", class: "text-red-500" },
    { id: 4, status: "ยกเลิกรายการ", class: "text-red-500" },
])

const getMemberName = async (ewallet) => {
    try {
        const { data } = await axios.get(`${process.env.VUE_APP_MARUEY}member-name/${ewallet.customers_name_receive}`)
        if (data.status) {
            ewallet.customers_receive_name = data.data?.name
        }
    }
    catch(err) {
        //console.log(err)
    }
}

const fetchEwallets = async () => {
    try {
        const { data } = await axios.get(`${process.env.VUE_APP_MARUEY}${store.getters.me?.user_name}/ewallets`)
        //console.log(data)
        if (data.status) {
            original_ewallets.value = data.data?.reverse() || []
            if (original_ewallets.value.length) {
                await Promise.all(original_ewallets.value.map( async (x) => {
                    getMemberName(x)
                }))
            }
        }
    }
    catch(err) {
        //console.log(err)
    }
} 

const getEwalletType = (type) => {
    return ewalletTypes.value.find((ewalletType) => ewalletType.id == type)?.type || '-'
}

const getEwalletStatus = (status) => {
    return ewalletStatuses.value.find((ewalletStatus) => ewalletStatus.id == status) || '-'
}
</script>