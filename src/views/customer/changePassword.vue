<template>
    <div class="mt-10">
        <div class="w-full px-5">
            <button type="button" @click="$router.go(-1)" class="flex items-center gap-3 text-gray-500">
                <i class="pi pi-arrow-left"></i>
                <span>กลับ</span>
            </button>
        </div>
        <div class="flex flex-col gap-2 p-5">
            <div class="relative">
                <input v-model="newPassword" :type="!seeNewPassword ? 'password' : 'text'" minlength="8" placeholder="กรุณากรอกรหัสผ่านใหม่" class="p-2 border rounded w-full" :class="{ 'border-red-500': invalid }" />
                <i @click="seeNewPassword = !seeNewPassword" v-if="seeNewPassword" class="pi pi-eye absolute right-2 top-1/2 -translate-y-1/2"></i>
                <i @click="seeNewPassword = !seeNewPassword" v-else class="pi pi-eye-slash absolute right-2 top-1/2 -translate-y-1/2"></i>
            </div>
            <small :class="invalid ? 'opacity-100' : 'opacity-0'" class="text-red-500">*รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัว</small>
            
            <div class="relative">
                <input v-model="newPassword2" :type="!seeNewPassword2 ? 'password' : 'text'" placeholder="กรุณายืนยันรหัสผ่านใหม่" class="p-2 border rounded w-full" :class="{ 'border-red-500': invalid2 }" />
                <i @click="seeNewPassword2 = !seeNewPassword2" v-if="seeNewPassword2" class="pi pi-eye absolute right-2 top-1/2 -translate-y-1/2"></i>
                <i @click="seeNewPassword2 = !seeNewPassword2" v-else class="pi pi-eye-slash absolute right-2 top-1/2 -translate-y-1/2"></i>
            </div>
            <small :class="invalid2 ? 'opacity-100' : 'opacity-0'" class="text-red-500">*รหัสผ่านไม่ตรงกัน กรุณาลองใหม่อีกครั้ง</small>

            <button @click="changePassword" class="w-full bg-[#8B2FC9] text-white text-lg py-2 mt-4">
                เปลี่ยนรหัสผ่าน
            </button>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useStore } from "vuex"

const store = useStore()

const userData = ref({})
const newPassword = ref('')
const newPassword2 = ref('')
const invalid = ref(false)
const invalid2 = ref(false)
const seeNewPassword = ref(false)
const seeNewPassword2 = ref(false)

onMounted(() => {
    userData.value = store.getters.me
})

const changePassword = async() => {
    if (newPassword.value.length < 8) {
        alert('รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร')
        invalid.value = true
        return
    } else {
        invalid.value = false
    }
    if (newPassword.value !== newPassword2.value) {
        alert('รหัสผ่านไม่ตรงกัน กรุณากรอกใหม่อีกครั้ง')
        invalid2.value = true
        return
    } else {
        invalid2.value = false
    }
    try {
        const { data } = await axios.post(`${process.env.VUE_APP_MLM}/changePassword`, {
            username: userData.value.user_name,
            new_password: newPassword.value,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (data) {
            //console.log(data)
            newPassword.value = ''
            newPassword2.value = ''
            invalid.value = false
            invalid2.value = false
            alert('เปลี่ยนรหัสผ่านสําเร็จ')
            window.location.href = '/customer/customerview'
        }
    }
    catch(err){
        //console.log(err)
        alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
        window.location.reload()
    }
}
</script>