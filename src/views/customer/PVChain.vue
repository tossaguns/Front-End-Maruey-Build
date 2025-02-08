<template>
    <div class="bg-gradient-to-br from-[#8B2FC9] to-[#5e2e7e] min-h-screen pb-20">
        
        <div class="px-3 pt-10 pb-5 text-center justify-center flex gap-2 items-center relative">
            <button type="button" class="rounded-full text-white flex justify-center items-center absolute left-3" @click="$router.go(-1)">
                <i class="pi pi-caret-left"></i>
            </button>
            <h1 class="text-white text-xl">สาย PV</h1>
        </div>
        <div class="grid grid-cols-3 px-3 py-5 border-dotted rounded gap-2 border-t-4 border-purple-300">
            
            <div class="border-2 border-white text-white flex flex-col p-2 col-span-3 text-center hover:bg-purple-200 relative rounded-lg shadow" @click="getDownline1Data(userData.user_name)">
                <p class="text-sm truncate">{{ userData.name }}</p>
                <p class="text-sm">{{ userData.user_name }}</p>
            </div>

            <div v-if="downlines1.length" class="w-full col-span-3 mt-10 relative">
                <div  class="flex w-full gap-3 overflow-auto px-1 pt-6 border-t border-dashed rounded-t-xl">
                    <div v-for="(downline, index) in downlines1" :key="index">
                        <div :class="selectedDownline1 === downline.user_name ? 'bg-purple-500 text-white border-white' : 'bg-white'" class="border border-purple-500 flex flex-col p-2 w-[6rem] hover:bg-purple-200 rounded-lg shadow relative" @click="getDownline2Data(downline?.user_name)">
                            <i v-if="selectedDownline1 === downline.user_name" class="pi pi-arrow-down text-white absolute -top-6 right-1/2 translate-x-1/2"></i>
                            <p class="text-sm truncate">{{ downline?.name }}</p>
                            <p class="text-sm">{{ downline?.user_name }}</p>
                        </div>
                    </div>
                </div>
                <div class="absolute right-1/2 translate-x-1/2 -top-9 text-black bg-yellow-400 px-3 py-1 rounded-full">ชั้นที่ 1</div>
            </div>

            <div v-if="downlines2.length" class="w-full col-span-3 mt-16 relative">
                <div  class="flex w-full gap-3 overflow-auto px-1 pt-6 border-t border-dashed rounded-t-xl">
                    <div v-for="(downline, index) in downlines2" :key="index">
                        <div :class="selectedDownline2 === downline.user_name ? 'bg-purple-500 text-white border-white' : 'bg-white'" class="border border-purple-500 flex flex-col p-2 w-[6rem] hover:bg-purple-200 rounded-lg shadow relative" @click="getDownline3Data(downline?.user_name)">
                            <i v-if="selectedDownline2 === downline.user_name" class="pi pi-arrow-down text-white absolute -top-6 right-1/2 translate-x-1/2"></i>
                            <p class="text-sm truncate">{{ downline?.name }}</p>
                            <p class="text-sm">{{ downline?.user_name }}</p>
                        </div>
                    </div>
                </div>
                <div class="absolute right-1/2 translate-x-1/2 -top-9 text-black bg-yellow-400 px-3 py-1 rounded-full">ชั้นที่ 2</div>
            </div>

            <div v-if="downlines3.length" class="w-full col-span-3 mt-16 relative">
                <div  class="flex w-full gap-3 overflow-auto px-1 pt-6 border-t border-dashed rounded-t-xl">
                    <div v-for="(downline, index) in downlines3" :key="index">
                        <div :class="selectedDownline3 === downline.user_name ? 'bg-purple-500 text-white border-white' : 'bg-white'" class="border border-purple-500 flex flex-col p-2 w-[6rem] hover:bg-purple-200 rounded-lg shadow relative" @click="getDownline4Data(downline?.user_name)">
                            <i v-if="selectedDownline3 === downline.user_name" class="pi pi-arrow-down text-white absolute -top-6 right-1/2 translate-x-1/2"></i>
                            <p class="text-sm truncate">{{ downline?.name }}</p>
                            <p class="text-sm">{{ downline?.user_name }}</p>
                        </div>
                    </div>
                </div>
                <div class="absolute right-1/2 translate-x-1/2 -top-9 text-black bg-yellow-400 px-3 py-1 rounded-full">ชั้นที่ 3</div>
            </div>

            <div v-if="downlines4.length" class="w-full col-span-3 mt-16 relative">
                <div  class="flex w-full gap-3 overflow-auto px-1 pt-6 border-t border-dashed rounded-t-xl">
                    <div v-for="(downline, index) in downlines4" :key="index">
                        <div :class="selectedDownline4 === downline.user_name ? 'bg-purple-500 text-white border-white' : 'bg-white'" class="border border-purple-500 flex flex-col p-2 w-[6rem] hover:bg-purple-200 rounded-lg shadow relative" @click="getDownline5Data(downline?.user_name)">
                            <i v-if="selectedDownline4 === downline.user_name" class="pi pi-arrow-down text-white absolute -top-6 right-1/2 translate-x-1/2"></i>
                            <p class="text-sm truncate">{{ downline?.name }}</p>
                            <p class="text-sm">{{ downline?.user_name }}</p>
                        </div>
                    </div>
                </div>
                <div class="absolute right-1/2 translate-x-1/2 -top-9 text-black bg-yellow-400 px-3 py-1 rounded-full">ชั้นที่ 4</div>
            </div>

            <div v-if="downlines5.length" class="w-full col-span-3 mt-16 relative">
                <div  class="flex w-full gap-3 overflow-auto px-1 pt-6 border-t border-dashed rounded-t-xl">
                    <div v-for="(downline, index) in downlines5" :key="index">
                        <div :class="selectedDownline5 === downline.user_name ? 'bg-purple-500 text-white border-white' : 'bg-white'" class="border border-purple-500 flex flex-col p-2 w-[6rem] hover:bg-purple-200 rounded-lg shadow relative" @click="getDownline6Data(downline?.user_name)">
                            <i v-if="selectedDownline5 === downline.user_name" class="pi pi-arrow-down text-white absolute -top-6 right-1/2 translate-x-1/2"></i>
                            <p class="text-sm truncate">{{ downline?.name }}</p>
                            <p class="text-sm">{{ downline?.user_name }}</p>
                        </div>
                    </div>
                </div>
                <div class="absolute right-1/2 translate-x-1/2 -top-9 text-black bg-yellow-400 px-3 py-1 rounded-full">ชั้นที่ 5</div>
            </div>

            <div v-if="downlines6.length" class="w-full col-span-3 mt-16 relative">
                <div  class="flex w-full gap-3 overflow-auto px-1 pt-6 border-t border-dashed rounded-t-xl">
                    <div v-for="(downline, index) in downlines6" :key="index">
                        <div :class="selectedDownline6 === downline.user_name ? 'bg-purple-500 text-white border-white' : 'bg-white'" class="border border-purple-500 flex flex-col p-2 w-[6rem] hover:bg-purple-200 rounded-lg shadow relative" @click="getDownline7Data(downline?.user_name)">
                            <i v-if="selectedDownline6 === downline.user_name" class="pi pi-arrow-down text-white absolute -top-6 right-1/2 translate-x-1/2"></i>
                            <p class="text-sm truncate">{{ downline?.name }}</p>
                            <p class="text-sm">{{ downline?.user_name }}</p>
                        </div>
                    </div>
                </div>
                <div class="absolute right-1/2 translate-x-1/2 -top-9 text-black bg-yellow-400 px-3 py-1 rounded-full">ชั้นที่ 6</div>
            </div>

            <div v-if="downlines7.length" class="w-full col-span-3 mt-16 relative">
                <div  class="flex w-full gap-3 overflow-auto px-1 pt-6 border-t border-dashed rounded-t-xl">
                    <div v-for="(downline, index) in downlines7" :key="index">
                        <div :class="selectedDownline7 === downline.user_name ? 'bg-purple-500 text-white border-white' : 'bg-white'" class="border border-purple-500 flex flex-col p-2 w-[6rem] hover:bg-purple-200 rounded-lg shadow relative" @click="getDownline8Data(downline?.user_name)">
                            <i v-if="selectedDownline7 === downline.user_name" class="pi pi-arrow-down text-white absolute -top-6 right-1/2 translate-x-1/2"></i>
                            <p class="text-sm truncate">{{ downline?.name }}</p>
                            <p class="text-sm">{{ downline?.user_name }}</p>
                        </div>
                    </div>
                </div>
                <div class="absolute right-1/2 translate-x-1/2 -top-9 text-black bg-yellow-400 px-3 py-1 rounded-full">ชั้นที่ 7</div>
            </div>

            <div v-if="downlines8.length" class="w-full col-span-3 mt-16 relative">
                <div  class="flex w-full gap-3 overflow-auto px-1 pt-6 border-t border-dashed rounded-t-xl">
                    <div v-for="(downline, index) in downlines8" :key="index">
                        <div :class="selectedDownline8 === downline.user_name ? 'bg-purple-500 text-white border-white' : 'bg-white'" class="border border-purple-500 flex flex-col p-2 w-[6rem] hover:bg-purple-200 rounded-lg shadow relative" @click="getDownline9Data(downline?.user_name)">
                            <i v-if="selectedDownline8 === downline.user_name" class="pi pi-arrow-down text-white absolute -top-6 right-1/2 translate-x-1/2"></i>
                            <p class="text-sm truncate">{{ downline?.name }}</p>
                            <p class="text-sm">{{ downline?.user_name }}</p>
                        </div>
                    </div>
                </div>
                <div class="absolute right-1/2 translate-x-1/2 -top-9 text-black bg-yellow-400 px-3 py-1 rounded-full">ชั้นที่ 8</div>
            </div>

            <div v-if="downlines9.length" class="w-full col-span-3 mt-16 relative">
                <div  class="flex w-full gap-3 overflow-auto px-1 pt-6 border-t border-dashed rounded-t-xl">
                    <div v-for="(downline, index) in downlines9" :key="index">
                        <div :class="selectedDownline9 === downline.user_name ? 'bg-purple-500 text-white border-white' : 'bg-white'" class="border border-purple-500 flex flex-col p-2 w-[6rem] hover:bg-purple-200 rounded-lg shadow relative" @click="getDownline10Data(downline?.user_name)">
                            <i v-if="selectedDownline9 === downline.user_name" class="pi pi-arrow-down text-white absolute -top-6 right-1/2 translate-x-1/2"></i>
                            <p class="text-sm truncate">{{ downline?.name }}</p>
                            <p class="text-sm">{{ downline?.user_name }}</p>
                        </div>
                    </div>
                </div>
                <div class="absolute right-1/2 translate-x-1/2 -top-9 text-black bg-yellow-400 px-3 py-1 rounded-full">ชั้นที่ 9</div>
            </div>

            <div v-if="downlines10.length" class="w-full col-span-3 mt-16 relative">
                <div  class="flex w-full gap-3 overflow-auto px-1 pt-6 border-t border-dashed rounded-t-xl">
                    <div v-for="(downline, index) in downlines10" :key="index">
                        <div :class="selectedDownline10 === downline.user_name ? 'bg-purple-500 text-white border-white' : 'bg-white'" class="border border-purple-500 flex flex-col p-2 w-[6rem] hover:bg-purple-200 rounded-lg shadow relative" @click="selectedDownline10 = downline?.user_name">
                            <i v-if="selectedDownline10 === downline.user_name" class="pi pi-arrow-down text-white absolute -top-6 right-1/2 translate-x-1/2"></i>
                            <p class="text-sm truncate">{{ downline?.name }}</p>
                            <p class="text-sm">{{ downline?.user_name }}</p>
                        </div>
                    </div>
                </div>
                <div class="absolute right-1/2 translate-x-1/2 -top-9 text-black bg-yellow-400 px-3 py-1 rounded-full">ชั้นที่ 10</div>
            </div>
            
        </div>
    </div>
</template>
<script setup>
import axios from "axios"
import { ref, onMounted } from "vue"
import { useStore } from "vuex"

const store = useStore()
const userData = ref({})
const upline = ref([])
const selectedDownline1 = ref("")
const selectedDownline2 = ref("")
const selectedDownline3 = ref("")
const selectedDownline4 = ref("")
const selectedDownline5 = ref("")
const selectedDownline6 = ref("")
const selectedDownline7 = ref("")
const selectedDownline8 = ref("")
const selectedDownline9 = ref("")
const selectedDownline10 = ref("")

const downlines1 = ref([])
const downlines2 = ref([])
const downlines3 = ref([])
const downlines4 = ref([])
const downlines5 = ref([])
const downlines6 = ref([])
const downlines7 = ref([])
const downlines8 = ref([])
const downlines9 = ref([])
const downlines10 = ref([])

onMounted(() => {
    getFullUserData()
})

const getFullUserData = async () => {
    try {
        const { data } = await axios.get(`${process.env.VUE_APP_MARUEY}${store.getters._id}/me`)
        //console.log(data)
        userData.value = data.data[0] || {}
        getUplineData(data.data[0].upline_id)
    }
    catch(err){
        //console.log(err)
    }
}

const getUplineData = async (username) => {
    try {
        const { data } = await axios.get(`${process.env.VUE_APP_MARUEY}upline/${username}`)
        //console.log(data)
        const exist_upline = upline.value.some(x => x.user_name === data.data.user_name)
        if (!exist_upline) {
            upline.value.push(data.data)
        }
    }
    catch(err){
        //console.log(err)
    }
}

const getDownline1Data = async (username) => {
    try {
        const { data } = await axios.get(`${process.env.VUE_APP_MARUEY}downline/${username}`)
        //console.log(data)
        downlines1.value = data.datas || []
    }
    catch(err){
        //console.log(err)
    }
}

const getDownline2Data = async (username) => {
    try {
        const { data } = await axios.get(`${process.env.VUE_APP_MARUEY}downline/${username}`)
        //console.log(data)
        downlines2.value = data.datas || []
        selectedDownline1.value = username

        downlines3.value = []
        downlines4.value = []
        downlines5.value = []
        downlines6.value = []
        downlines7.value = []
        downlines8.value = []
        downlines9.value = []
        downlines10.value = []

        selectedDownline2.value = ""
        selectedDownline3.value = ""
        selectedDownline4.value = ""
        selectedDownline5.value = ""
        selectedDownline6.value = ""
        selectedDownline7.value = ""
        selectedDownline8.value = ""
        selectedDownline9.value = ""
        selectedDownline10.value = ""
    }
    catch(err){
        //console.log(err)
    }
}

const getDownline3Data = async (username) => {
    try {
        const { data } = await axios.get(`${process.env.VUE_APP_MARUEY}downline/${username}`)
        //console.log(data)
        downlines3.value = data.datas || []
        selectedDownline2.value = username

        downlines4.value = []
        downlines5.value = []
        downlines6.value = []
        downlines7.value = []
        downlines8.value = []
        downlines9.value = []
        downlines10.value = []

        selectedDownline3.value = ""
        selectedDownline4.value = ""
        selectedDownline5.value = ""
        selectedDownline6.value = ""
        selectedDownline7.value = ""
        selectedDownline8.value = ""
        selectedDownline9.value = ""
        selectedDownline10.value = ""
    }
    catch(err){
        //console.log(err)
    }
}

const getDownline4Data = async (username) => {
    try {
        const { data } = await axios.get(`${process.env.VUE_APP_MARUEY}downline/${username}`)
        //console.log(data)
        downlines4.value = data.datas || []
        selectedDownline3.value = username

        downlines5.value = []
        downlines6.value = []
        downlines7.value = []
        downlines8.value = []
        downlines9.value = []
        downlines10.value = []

        selectedDownline4.value = ""
        selectedDownline5.value = ""
        selectedDownline6.value = ""
        selectedDownline7.value = ""
        selectedDownline8.value = ""
        selectedDownline9.value = ""
        selectedDownline10.value = ""
    }
    catch(err){
        //console.log(err)
    }
}

const getDownline5Data = async (username) => {
    try {
        const { data } = await axios.get(`${process.env.VUE_APP_MARUEY}downline/${username}`)
        //console.log(data)
        downlines5.value = data.datas || []
        selectedDownline4.value = username

        downlines6.value = []
        downlines7.value = []
        downlines8.value = []
        downlines9.value = []
        downlines10.value = []

        selectedDownline5.value = ""
        selectedDownline6.value = ""
        selectedDownline7.value = ""
        selectedDownline8.value = ""
        selectedDownline9.value = ""
        selectedDownline10.value = ""
    }
    catch(err){
        //console.log(err)
    }
}

const getDownline6Data = async (username) => {
    try {
        const { data } = await axios.get(`${process.env.VUE_APP_MARUEY}downline/${username}`)
        //console.log(data)
        downlines6.value = data.datas || []
        selectedDownline5.value = username

        downlines7.value = []
        downlines8.value = []
        downlines9.value = []
        downlines10.value = []

        selectedDownline6.value = ""
        selectedDownline7.value = ""
        selectedDownline8.value = ""
        selectedDownline9.value = ""
        selectedDownline10.value = ""
    }
    catch(err){
        //console.log(err)
    }
}

const getDownline7Data = async (username) => {
    try {
        const { data } = await axios.get(`${process.env.VUE_APP_MARUEY}downline/${username}`)
        //console.log(data)
        downlines7.value = data.datas || []
        selectedDownline6.value = username

        downlines8.value = []
        downlines9.value = []
        downlines10.value = []

        selectedDownline7.value = ""
        selectedDownline8.value = ""
        selectedDownline9.value = ""
        selectedDownline10.value = ""
    }
    catch(err){
        //console.log(err)
    }
}

const getDownline8Data = async (username) => {
    try {
        const { data } = await axios.get(`${process.env.VUE_APP_MARUEY}downline/${username}`)
        //console.log(data)
        downlines8.value = data.datas || []
        selectedDownline7.value = username

        downlines9.value = []
        downlines10.value = []

        selectedDownline8.value = ""
        selectedDownline9.value = ""
        selectedDownline10.value = ""
    }
    catch(err){
        //console.log(err)
    }
}

const getDownline9Data = async (username) => {
    try {
        const { data } = await axios.get(`${process.env.VUE_APP_MARUEY}downline/${username}`)
        //console.log(data)
        downlines9.value = data.datas || []
        selectedDownline8.value = username

        downlines10.value = []

        selectedDownline9.value = ""
        selectedDownline10.value = ""
    }
    catch(err){
        //console.log(err)
    }
}

const getDownline10Data = async (username) => {
    try {
        const { data } = await axios.get(`${process.env.VUE_APP_MARUEY}downline/${username}`)
        //console.log(data)
        downlines10.value = data.datas || []
        selectedDownline9.value = username
    }
    catch(err){
        //console.log(err)
    }
}

</script>