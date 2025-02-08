<template>
    <div class="bg-gradient-to-br from-[#652fc9] to-[#b714e0] text-white text-lg py-2 h-screen">
        <div class="mt-[8rem] p-2 rounded" v-if="deviceType == 'Mobile' && myos === 'Android'">
            <div class="mb-5">
                <img src="/src/assets/images/logo.png" alt="logo" width="150" class="mx-auto rounded" />
            </div>
            <div class="flex justify-center">
              <button type="button" class="flex justify-center items-center gap-2 border p-2 shadow-lg rounded bg-white" @click="downloadAPK">
                <p class="text-lg text-black">ดาวน์โหลดเลย</p>
                <img src="/src/assets/playstore.png" alt="download" width="50" >
              </button>
            </div>
            <p class="text-center rounded w-full text-nowrap mt-1 text-white/80">เวอร์ชั่น v {{ version }}</p>
            <p class="text-center rounded w-full text-nowrap mt-1 text-white">ดาวน์โหลด APP เพื่อรับส่วนลด 30%</p>
        </div>
        <div class="mt-[8rem] p-2 rounded" v-else>
            <div class="mb-5">
                <img src="/src/assets/images/logo.png" alt="logo" width="150" class="mx-auto rounded" />
            </div>
            <div class="flex justify-center">
            </div>
            <p class="text-center rounded w-full mt-1 text-white/80">เวอร์ชั่น v {{ version }}</p>
            <p class="text-center rounded w-full mt-1 text-white">อุปกรณ์ของท่านยังไม่รองรับระบบ APP</p>
            <p class="text-center rounded w-full mt-1 text-white">ท่านสามารถเข้าใช้งานผ่านเว็บไซต์แทนได้</p>
            <div class="flex justify-center mt-5">
              <button type="button" class="flex justify-center items-center gap-2 border p-2 shadow-lg rounded bg-white" @click="useWebsite">
                <p class="text-lg text-black">► เข้าใช้งานผ่านเว็บไซต์</p>
              </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

onMounted(() => {
    checkUpdateApp()
    detectDeviceAndOS()
})

const deviceType = ref('')
const myos = ref('')
const version = ref('')

const detectDeviceAndOS = () => {
      const userAgent = navigator.userAgent;
      // Detect OS
      if (/android/i.test(userAgent)) {
        myos.value = 'Android';
      } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        myos.value = 'iOS';
      } else if (/windows nt/i.test(userAgent)) {
        myos.value = 'Windows';
      } else if (/macintosh|mac os x/i.test(userAgent)) {
        myos.value = 'Mac OS';
      } else {
        myos.value = 'Unknown OS';
      }

      // Detect device type
      if (/mobile/i.test(userAgent)) {
        deviceType.value = 'Mobile';
      } else if (/tablet/i.test(userAgent)) {
        deviceType.value = 'Tablet';
      } else {
        deviceType.value = 'Desktop';
      }
    }

const downloadAPK = () => {
    const apk_url = process.env.VUE_APP_APK
    window.open(apk_url, '_blank')
}

const useWebsite = () => {
    window.location.href = process.env.VUE_APP_WEBSITE
}

const checkUpdateApp = async () => {
  try {
    const response = await axios.get(`${process.env.VUE_APP_MARUEY}product`)
    if (response.data.status) {
      version.value = response.data.version
    }
  } 
  catch(err) {
    //console.log(err)
  }
}
</script>