<template>
  <div>
    <Toast></Toast>
    <div v-if="isLoading" class="overlay">
      <div class="loader"></div>
    </div>
    <div
      class="bg-gradient-to-r from-[#AB51E3] to-[#8B2FC9] min-h-screen py-16 px-4 md:px-6 2xl:px-0 flex justify-center items-center 2xl:mx-auto">
      <div class="flex flex-col justify-start items-start w-full space-y-9">
        <div
          class="flex flex-col xl:flex-row justify-center xl:justify-between space-y-6 xl:space-y-0 xl:space-x-6 w-full">
          <div class="p-8 bg-[#AB51E3] text-white flex flex-col lg:w-full xl:w-3/5 relative rounded">
            <img src="../assets/images/logo.png" alt="logo" width="100"
              class="mx-auto absolute -top-16 rounded-md left-1/2 -translate-x-1/2">
            <div class="text-3xl text-center pt-4 pb-5">ทุกการจ่ายได้เงินคืน</div>
            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">
              <!-- รหัสผู้แนะนำ -->
              <div class="md:col-span-full">
                <div class="flex items-center gap-2 w-full">
                  <label v-if="lockrefcode == false" class="truncate min-w-fit"> รหัสผู้แนะนำ </label>
                  <div v-if="!hasRef" class="w-2/3 pr-3">
                    <input v-model="recommendedcode" type="text" placeholder="" :disabled="lockrefcode"
                      :class="lockrefcode ? '!bg-purple-300' : ''"
                      class="border border-gray-300 p-2 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600"
                      @keyup.enter="checklogin()" />
                  </div>
                  <div class="w-1/3">
                    <button v-if="lockrefcode == false && !hasRef" @click="checkreferralcode()"
                      class="border border-transparent hover:border-gray-300 bg-[#ec4899] hover:bg-[#c93d82] text-white hover:text-gray-50 flex justify-center items-center p-1 truncate rounded w-full">
                      ตรวจสอบ
                    </button>
                    <button v-else-if="!hasRef" :disabled="hasRef" @click="() => {
                        lockrefcode = false;
                        recommendedcode = '';
                      }
                      "
                      class="border border-transparent hover:border-gray-300 bg-[#000] hover:bg-[#5A108F] text-white hover:text-gray-50 flex justify-center items-center p-1 truncate rounded w-full">
                      ยกเลิก
                    </button>
                  </div>
                </div>
              </div>

              <!-- เบอร์โทรศัพท์ -->
              <div class="md:col-span-full" v-if="step == 0">
                <label>เบอร์โทรศัพท์</label>
                <input minlength="10" maxlength="10" v-model="telephone" type="text" placeholder="กรอกเบอร์โทรศัพท์"
                  class="border border-gray-300 p-4 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600"
                  :class="telephoneInvalid ? 'ring-red-500 ring-1' : ''" @keyup.enter="sendOtp()" />
                <span :class="[
                  'text-red-200 text-xs mt-1',
                  telephoneInvalid ? 'block' : 'hidden',
                ]">*กรุณาตรวจสอบเบอร์โทรศัพท์อีกครั้ง
                </span>
              </div>

              <!-- รหัส OTP -->
              <div class="col-span-full" v-if="step == 1">
                <label>รหัส OTP</label>
                <div class="flex gap-1">
                  <input v-model="otpcode" type="text" placeholder="กรอกรหัส OTP"
                    class="w-full border border-gray-300 p-4 rounded text-sm leading-4 placeholder-gray-600 text-gray-600"
                    @keyup.enter="verifyotp()" />
                  <button @click="sendOtp()"
                    class="text-xs w-full border border-transparent hover:border-gray-300 p-1 bg-[#ec4899] hover:bg-[#c93d82] text-white hover:text-gray-50 flex justify-center items-center py-4 rounded ml-2">
                    ส่ง OTP อีกครั้ง
                  </button>
                </div>
              </div>

              <!-- เวลาเหลือสำหรับ OTP -->
              <div class="col-span-full text-center mt-3" v-if="step == 1">
                <div v-if="timeexp != 0">เหลือเวลา {{ timeexp }} วินาที</div>
                <div v-else>หมดเวลา กรุณากดขอ OTP ใหม่</div>
              </div>

              <!-- ข้อมูลส่วนตัว (ขั้นตอนที่ 2) -->
              <div v-if="step == 2">
                <div class="md:col-span-4">
                  <label> ชื่อ - นามสกุล </label>
                  <input v-model="name" type="text" placeholder="กรอกชื่อ - นามสกุล"
                    class="border border-gray-300 p-4 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600"
                    @keyup.enter="checklogin()" />
                </div>
                <div class="md:col-span-3">
                  <label>อีเมลล์ <small>(ไม่บังคับ)</small></label>
                  <input v-model="email" type="text" placeholder="example@gmail.com"
                    class="border border-gray-300 p-4 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600"
                    @keyup.enter="checklogin()" />
                </div>
                <div class="md:col-span-3">
                  <label> รหัสผ่าน</label>
                  <div class="relative">
                    <input v-model="password" :type="seePassword ? 'text' : 'password'"
                      placeholder="ภาษาอังกฤษหรือตัวเลข 8-10 ตัว"
                      class="border border-gray-300 p-4 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600"
                      @keyup.enter="checklogin()" />
                    <i v-if="seePassword" class="pi pi-eye absolute text-gray-500 right-3 top-1/2 -translate-y-1/2"
                      @click="seePassword = !seePassword"></i>
                    <i v-else class="pi pi-eye-slash absolute text-gray-500 right-3 top-1/2 -translate-y-1/2"
                      @click="seePassword = !seePassword"></i>
                  </div>
                </div>
                <div class="md:col-span-3">
                  <label> ยืนยันรหัสผ่าน</label>
                  <div class="relative">
                    <input v-model="confirmpassword" :type="seePassword2 ? 'text' : 'password'"
                      placeholder="กรอกรหัสผ่านอีกครั้ง"
                      class="border border-gray-300 p-4 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600"
                      @keyup.enter="checklogin()" />
                    <i v-if="seePassword2" class="pi pi-eye absolute text-gray-500 right-3 top-1/2 -translate-y-1/2"
                      @click="seePassword2 = !seePassword2"></i>
                    <i v-else class="pi pi-eye-slash absolute text-gray-500 right-3 top-1/2 -translate-y-1/2"
                      @click="seePassword2 = !seePassword2"></i>
                  </div>
                </div>
              </div>
            </div>

            <!-- ปุ่มดำเนินการ -->
            <button @click="sendOtp()" v-if="step == 0"
              class="mt-8 border border-transparent hover:border-gray-300 bg-[#ec4899] hover:bg-[#c93d82] text-white hover:text-gray-50 flex justify-center items-center py-4 rounded w-full">
              <div>
                <p class="text-sm leading-4">ส่ง OTP</p>
              </div>
            </button>
            <button @click="verifyotp()" v-if="step == 1 && timeexp != 0"
              class="mt-8 border border-transparent hover:border-gray-300 bg-orange-600 hover:bg-orange-700 text-white hover:text-gray-50 flex justify-center items-center py-4 rounded w-full">
              <div>
                <p class="text-sm leading-4">ยืนยัน OTP</p>
              </div>
            </button>
            <button @click="checklogin()" v-if="step == 2"
              class="mt-8 border border-transparent hover:border-gray-300 bg-[#ec4899] hover:bg-[#c93d82] text-white hover:text-gray-50 flex justify-center items-center py-4 rounded w-full">
              <div>
                <p class="text-sm leading-4">สมัครสมาชิก</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

console.log('SMS_URL:', process.env.VUE_APP_SMS_URL);
export default {
  async mounted() { },
  created() {
    document.title = "สมัครสมาชิก || Maruey";
    if (this.$route.params.username) {
      this.recommendedcode = this.$route.params.username;
      this.hasRef = true;
      this.checkreferralcode();
    }
  },
  data: () => ({
    seePassword: false,
    seePassword2: false,
    hasRef: false,
    isLoading: false,
    isDisabled: false,
    username: "",
    email: "",
    telephone: "",
    password: "",
    confirmpassword: "",
    prefix: "",
    name: "",
    sex: "",
    optionsex: [{ name: "ชาย" }, { name: "หญิง" }, { name: "ไม่ระบุ" }],
    titleOptions: [
      { label: "นาย", value: "นาย" },
      { label: "นาง", value: "นาง" },
      { label: "นางสาว", value: "นางสาว" },
    ],
    recommendedcode: "",
    lockrefcode: false,
    token_otp: "",
    otpcode: "",
    step: 0,
    timeexp: 0,
    telephoneInvalid: false,
  }),

  methods: {
    async sendOtp() {
      if (this.telephone === "") {
        this.$toast.add({
          severity: "error",
          summary: "ไม่ถูกต้อง",
          detail: "กรุณากรอกเบอร์โทรศัพท์",
          life: 3000,
        });
      } else if (this.telephone.length !== 10) {
        this.$toast.add({
          severity: "error",
          summary: "เบอร์โทรศัพท์ไม่ถูกต้อง",
          detail: "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง",
          life: 3000,
        });
        this.telephoneInvalid = true;
        return false;
      } else {
        this.isLoading = true;
        this.telephoneInvalid = false;
        const config = {
          method: "post",
          url: `${process.env.VUE_APP_SMS_URL}/otp-send`,
          headers: {
            "Content-Type": "application/json",
            api_key: `${process.env.VUE_APP_SMS_API_KEY}`,
            secret_key: `${process.env.VUE_APP_SMS_SECRET_KEY}`,
          },
          data: JSON.stringify({
            project_key: `${process.env.VUE_APP_SMS_PROJECT_OTP}`,
            phone: `${this.telephone}`,
          }),
        };

        await axios(config)
          .then((data) => {
            if (data.data.code === "000") {
              this.$toast.add({
                severity: "success",
                summary: "สำเร็จ",
                detail: "ส่งรหัส OTP สำเร็จ",
                life: 3000,
              });
              this.token_otp = data?.data?.result.token;
              this.timeexp = 300; // ตั้งเวลา 5 นาที
              this.countDown();
              this.step = 1; // เปลี่ยนไปขั้นตอนที่ 1 (กรอก OTP)
            } else {
              this.$toast.add({
                severity: "error",
                summary: "ไม่สำเร็จ",
                detail: data.data.message,
                life: 3000,
              });
            }
          })
          .catch((error) => {
            this.$toast.add({
              severity: "error",
              summary: "ไม่สำเร็จ",
              detail: error.response.data.message,
              life: 3000,
            });
          });
        this.isLoading = false;
      }
    },


    async verifyotp() {
      if (this.otpcode === "") {
        this.$toast.add({
          severity: "error",
          summary: "ไม่ถูกต้อง",
          detail: "กรุณากรอกรหัส OTP",
          life: 3000,
        });
      } else {
        this.isLoading = true;
        const config = {
          method: "post",
          url: `${process.env.VUE_APP_SMS_URL}/otp-validate`,
          headers: {
            "Content-Type": "application/json",
            api_key: `${process.env.VUE_APP_SMS_API_KEY}`,
            secret_key: `${process.env.VUE_APP_SMS_SECRET_KEY}`,
          },
          data: JSON.stringify({
            token: `${this.token_otp}`,
            otp_code: `${this.otpcode}`,
          }),
        };
        await axios(config)
          .then((data) => {
            if (data.data.code === "000") {
              this.$toast.add({
                severity: "success",
                summary: "สำเร็จ",
                detail: "ยืนยันรหัส OTP สำเร็จ",
                life: 3000,
              });
              this.step = 2; // เปลี่ยนไปขั้นตอนที่ 2 (กรอกข้อมูลส่วนตัว)
            } else {
              this.$toast.add({
                severity: "error",
                summary: "ไม่สำเร็จ",
                detail: data.data.message,
                life: 3000,
              });
            }
          })
          .catch((error) => {
            this.$toast.add({
              severity: "error",
              summary: "ไม่สำเร็จ",
              detail: error.response.data.message,
              life: 3000,
            });
          });
        this.isLoading = false;
      }
    },
    //ฟังก์ชั่นลดเวลา จนหมด
    async countDown() {
      if (this.timeexp > 0) {
        this.timeexp--;
        setTimeout(() => {
          this.countDown();
        }, 1000);
      } else {
        this.timeexp = 0;
      }
    },

    generateRandomString(length) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      const charactersLength = characters.length;

      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }

      return result;
    },

    async checklogin() {
      if (
        this.telephone == "" ||
        this.name == "" ||
        this.password == "" ||
        this.confirmpassword == ""
      ) {
        this.$toast.add({
          severity: "error",
          summary: "ข้อมูลไม่ครบ",
          detail: "กรุณากรอกข้อมูลให้ครบถ้วน",
          life: 3000,
        });
      } else if (this.password !== this.confirmpassword) {
        this.$toast.add({
          severity: "error",
          summary: "รหัสผ่านไม่ตรงกัน",
          detail: "กรุณากรอกรหัสผ่านให้ตรงกัน",
          life: 3000,
        });
      } else {
        const result = await Swal.fire({
          text: "ยืนยันการสมัครสมาชิก",
          icon: "question",
          iconColor: "#8B2FC9",
          showCancelButton: true,
          confirmButtonColor: "#8B2FC9",
          cancelButtonColor: "#E85D40",
          confirmButtonText: "ยืนยัน",
          cancelButtonText: "ยกเลิก",
        });

        if (result.isConfirmed) {
          this.isLoading = true;
          const data = {
            phone: this.telephone,
            password: this.password,
            full_name: this.name,
            sponser: this.recommendedcode,
          };
          await axios
            .post(`${process.env.VUE_APP_MLM}/storeRegister`, data)
            .then((res) => {
              if (res.data?.code === 'success') {
                this.$toast.add({
                  severity: "success",
                  summary: "สำเร็จ",
                  detail: "สมัครสมาชิกสำเร็จ",
                  life: 3000,
                });
                Swal.fire({
                  title: "สมัครสมาชิกสำเร็จ",
                  text: `username: ${res.data?.data?.user_name}, password: ${this.password}`,
                  icon: "success",
                  confirmButtonText: "ตกลง",
                }).then(() => {
                  this.$router.push("/login");
                });
              } else {
                this.$toast.add({
                  severity: "error",
                  summary: "กรุณาตรวจสอบข้อมูลอีกครั้ง",
                  detail: res.data.errors?.phone[0],
                  life: 3000,
                });
              }
            })
            .catch((error) => {
              this.$toast.add({
                severity: "error",
                summary: "เกิดข้อผิดพลาด",
                detail: error.response?.data?.message,
                life: 3000,
              });
            });
          this.isLoading = false;
        }
      }
    },

    async checkreferralcode() {
      this.isLoading = true;
      await axios
        .get(`${process.env.VUE_APP_MARUEY}check-user/${this.recommendedcode}`)
        .then((res) => {
          //console.log(res.data?.data?.length)
          if (res.data.status && res.data?.data?.length) {
            this.lockrefcode = true;
          } else {
            this.$toast.add({
              severity: "error",
              summary: "ไม่สำเร็จ",
              detail: "รหัสแนะนำไม่ถูกต้อง",
              life: 3000,
            });
            this.recommendedcode = "";
          }
        })
        .catch((error) => {
          this.$toast.add({
            severity: "error",
            summary: "ไม่สำเร็จ",
            detail: error.response.data.message,
            life: 3000,
          });
          this.isLoading = false;
        })
      this.isLoading = false;
    },
  },
};
</script>

<style>
.RadioButton {
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
}

/* Hide the original input */
.RadioButton input[type="radio"] {
  display: none;
}

/* Style for the custom radio button */
.RadioButton .radio-inner {
  display: inline-block;
  width: 20px;
  /* Adjust width as needed */
  height: 20px;
  /* Adjust height as needed */
  border: 2px solid #000;
  /* Adjust border color and width as needed */
  border-radius: 50%;
  /* Make it round */
  position: relative;
}

/* Style for the dot inside the radio button */
.RadioButton .radio-inner::after {
  content: "";
  display: block;
  width: 12px;
  /* Adjust dot size as needed */
  height: 12px;
  /* Adjust dot size as needed */
  background-color: #000;
  /* Adjust dot color as needed */
  border-radius: 50%;
  /* Make it round */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  /* Initially hidden */
}

/* Show dot when the radio button is checked */
.RadioButton input[type="radio"]:checked+.radio-inner::after {
  opacity: 1;
}

/* Additional styles for label */
.RadioButton label {
  cursor: pointer;
}

/* Adjust margin between radio button and label as needed */
.RadioButton label.ml-2 {
  margin-left: 8px;
  /* Adjust margin as needed */
}
</style>

<style scoped>
@import "../assets/Loading.css";
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
