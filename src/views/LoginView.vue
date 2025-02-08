<template>
  <div class="containers">
      <section>
        <div
          class="bg-login pt-8 px-10 pb-8 rounded-xl w-full shadow-md"
        >
          <img
            class="mb-4 mx-auto w-28 h-28 rounded"
            src="../assets/images/logo.jpg"
            @click="back()"
          />
          <div class="mb-5 p-2 rounded hidden" v-if="deviceType == 'Mobile' && os === 'Android'">
            <div class="flex justify-center">
              <button type="button" class="flex justify-center items-center gap-2 border p-2 shadow-lg rounded" @click="downloadAPK">
                <p class="text-lg">ดาวน์โหลดเลย</p>
                <img src="/src/assets/playstore.png" alt="download" width="50" >
              </button>
            </div>
            <p class="hidden rounded w-full text-nowrap mt-1 text-purple-500">ดาวน์โหลด APP เพื่อรับส่วนลด 30%</p>
          </div>
          <div class="space-y-4">
            <div>
              <label class="block mb-1 text-[#8B2FC9] font-semibold text-left"
                >ชื่อผู้ใช้ / username</label
              >
              <input
                v-model="emailandtelephone"
                type="text"
                @keyup.enter="checklogin()"
                class="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                placeholder=""
                :class="invalid === 'username' ? 'border-red-500 border text-red-500' : ''"
              />
            </div>

            <div>
              <label class="block mb-1 text-[#8B2FC9] font-semibold text-left"
                >รหัสผ่าน / password</label
              >
              <div class="relative">
                <input
                v-model="password"
                :type="seePassword ? 'text' : 'password'"
                @keyup.enter="checkloginMLM()"
                placeholder=""
                class="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                :class="invalid === 'password' ? 'border-red-500 border text-red-500' : ''"
                />
                <span v-if="!seePassword" class="pi pi-eye-slash cursor-pointer absolute text-gray-500 right-3 top-1/2 -translate-y-1/2" @click="seePassword = !seePassword"></span>
                <span v-else class="pi pi-eye cursor-pointer absolute text-gray-500 right-3 top-1/2 -translate-y-1/2" @click="seePassword = !seePassword"></span>
              </div>
              <span class="text-sm text-nowrap hidden" v-if="$route.query.username">รหัสผ่านของคุณคือหมายเลขโทรศัพท์ 4 ตัวท้าย</span>
            </div>
          </div>

          <div class="flex flex-col max-w-md space-y-2 md:space-y-5 mt-4">
            <button
              @click="checklogin()"
              class="hidden items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium hover:bg-[#E178C5] border-[#DC97FF] bg-[#8B2FC9] text-white"
            >
              <svg
                v-if="isLoading == true"
                aria-hidden="true"
                role="status"
                class="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              เข้าสู่ระบบ
            </button>
            <button
              @click="checkloginMLM()"
              class="items-center flex justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium hover:bg-[#E178C5] border-[#DC97FF] bg-[#8B2FC9] text-white"
            >
              <svg
                v-if="isLoading == true"
                aria-hidden="true"
                role="status"
                class="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              เข้าสู่ระบบ
            </button>
            <div class="flex justify-center items-center">
              <span class="w-full border border-[#8B2FC9]"></span>
              <span class="px-4 text-[#8B2FC9]">หรือ</span>
              <span class="w-full border border-[#8B2FC9]"></span>
            </div>

            <button
              @click="register()"
              class="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium hover:bg-[#8B2FC9] hover:text-[#FFF] border-[#8B2FC9] text-[#4A0A77] relative"
            >
              <span class="absolute left-4"> </span>
              <span class="font-semibold">สมัครสมาชิก</span>
            </button>

            <button
              @click="back()"
              class="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium bg-[#ec4899] hover:bg-[#c93d82] hover:text-[#FFF] border-[#ec4899] text-[#FFF] relative"
            >
              <span class="absolute left-4"> </span>
              <span class="font-semibold">กลับสู่หน้าหลัก</span>
            </button>
          </div>
          <!-- <button @click="register()" class="mt-4 w-full bg-yellow-500 font-semibold py-2 rounded-md  tracking-wide">เข้าสู่ระบบ</button> -->
        </div>
      </section>
    
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  created() {
    this.detectDeviceAndOS();
    document.title = "เข้าสู่ระบบ | Maruey";
    if (this.$route.query.username || this.$route.query.password) {
      this.emailandtelephone = this.$route.query.username
      this.password = this.$route.query.password
      //this.checkloginMLM()
    }
  },
  data: () => ({
    isLoading: false,
    emailandtelephone: "",
    password: "",
    os: null,
    deviceType: null,
    seePassword: false,
    invalid: null,
  }),
  methods: {
    detectDeviceAndOS() {
      const userAgent = navigator.userAgent;
      if(process.env.VUE_APP_MODE !== 'WEB') {
        return false
      }
      // Detect OS
      if (/android/i.test(userAgent)) {
        this.os = 'Android';
      } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        this.os = 'iOS';
      } else if (/windows nt/i.test(userAgent)) {
        this.os = 'Windows';
      } else if (/macintosh|mac os x/i.test(userAgent)) {
        this.os = 'Mac OS';
      } else {
        this.os = 'Unknown OS';
      }

      // Detect device type
      if (/mobile/i.test(userAgent)) {
        this.deviceType = 'Mobile';
      } else if (/tablet/i.test(userAgent)) {
        this.deviceType = 'Tablet';
      } else {
        this.deviceType = 'Desktop';
      }
    },
    downloadAPK() {
      const apk_url = process.env.VUE_APP_APK
      window.open(apk_url, '_blank')
    },
    async checklogin() {
      if (this.emailandtelephone === "" || this.password === "") {
        this.$toast.add({
          severity: "warn",
          summary: "แจ้งเตือน",
          detail: "กรุณากรอกชื่อผู้ใช้งานและรหัสผ่าน",
          life: 3000,
        });
        return false;
      }
      this.isLoading = true;
      await axios
        .post(`${process.env.VUE_APP_MARUEY}login`, {
          emailandtelephone: this.emailandtelephone,
          password: this.password,
        })
        .then((res) => {
          if (res.data.data.row == "partner") {
            if (res.data.data.partner_status == true) {
              localStorage.setItem("token", res.data.token);
              window.location.assign("/home");
            } else {
              this.isLoading = false;
              this.$toast.add({
                severity: "error",
                summary: "ไอดีของคุณถูกระงับการใช้งาน",
                detail: "ยังไม่อนุมัติ หรือ ถูกระงับการใช้งานโดยผู้ดูแลระบบ",
                life: 3000,
              });
            }
          } else if (res.data.data.row == "customer") {
            localStorage.setItem("token", res.data.token);
            window.location.assign("/");
          } else {
            localStorage.setItem("token", res.data.token);
            window.location.assign("/home");
          }
        })
        .catch(() => {
          this.isLoading = false;
          this.$toast.add({
            severity: "error",
            summary: "เข้าสู่ระบบไม่สำเร็จ",
            detail: "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง",
            life: 3000,
          });
        });
    },
    async checkloginMLM() {
      if (this.emailandtelephone === "" || this.password === "") {
        Swal.fire({
          icon: "error",
          title: "กรุณากรอกข้อมูลให้ครบถ้วน",
          text: "กรุณากรอกชื่อผู้ใช้งานและรหัสผ่าน",
          showConfirmButton: false,
          timer: 2000,
        })
        return false;
      }
      this.isLoading = true;
      await axios
        .post(`${process.env.VUE_APP_MLM}/api_customer_login`, {
          username: this.emailandtelephone,
          password: this.password,
        })
        .then((res) => {
          //console.log(res.data)
          if (res.data.status === 0) {
            if (res.data.code === 'ER03') {
              Swal.fire({
                icon: "error",
                title: res.data.message,
                text: "กรุณาตรวจสอบรหัสผ่านอีกครั้ง",
                showConfirmButton: false,
                timer: 2000,
              })
              this.invalid = 'password'
            } else if (res.data.code === 'ER01') {
              Swal.fire({
                icon: "error",
                title: res.data.message,
                text: "กรุณาตรวจสอบชื่อผู้ใช้งานอีกครั้ง",
                showConfirmButton: false,
                timer: 2000,
              })
              this.invalid = 'username'
            }
            return
          }
          
          localStorage.clear();
          localStorage.setItem("token", res.data.token);
          const loginData = {
            logedIn: true,
            token: res.data.token,
            _id: res.data.data.id,
            username: res.data.data.user_name,
            email: res.data.data.email,
            telephone: res.data.data.phone,
            name: res.data.data.name,
            row: "customer",
            position: res.data.data.qualification_id,
            me: res.data.data,
            code: res.data.code
          }
          this.$store.commit("setLogin", loginData)
          window.location.assign("/");
        })
        .catch(() => {
          this.isLoading = false;
          this.$toast.add({
            severity: "error",
            summary: "เข้าสู่ระบบไม่สำเร็จ",
            detail: "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง",
            life: 3000,
          });
        })
        .finally(()=> this.isLoading = false)
    },
    register() {
      this.$router.push("/register");
    },
    back() {
      this.$router.push("/");
    },
  },
};
</script>
<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
<style>
.containers {
  display: flex;
  justify-content: right;
  text-align: center;
  align-items: center;
  height: 100vh;
  background-image: url("../assets/background.jpg");
  background-position: bottom center;
  background-repeat: no-repeat;
  background-size: cover;
}

.bg-login {
  box-shadow: rgba(195, 2, 221, 0.878);
  background-size: cover;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  background-repeat: no-repeat;
  background-position: center center;
  margin-top: 0px;
}

.button-color {
  background-color: #064635;
}

.button-color:hover {
  background-color: #1f441e;
}

@media screen and (max-width: 768px) {
  .containers {
    justify-content: center;
    background-color: #d283ff;
    /*ปิด background-image  */
    background-position: center right;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .bg-login {
    background-size: contain;
    backdrop-filter: none;
    /* ลบ blur ทิ้งเมื่อเป็นจอมือถือ */
    margin: 0;
  }
}
</style>
