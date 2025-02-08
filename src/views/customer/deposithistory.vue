<template>
  <div class="h-full bg-[#f7f7f7] min-h-[800px] mb-20">
    <div class="h-full mx-2">
      <div class="md:w-4/6 mx-4 my-2 pb-5">
        <div class="bg-[#fff]">
          <div class="text-[#8B2FC9] text-center py-3 font-medium text-xl border-b-4 border-[#8B2FC9]">
            เงินในระบบ
          </div>
          <div class="flex w-full items-center py-5 px-10">
            <div class="w-full text-sm md:text-xl">
              <i class="pi pi-wallet text-purple-500 mr-3"></i>
              <span class="text-base md:text-lg text-[#8B2FC9]">เงินในกระเป๋า</span>
              <br />
              {{
                parseFloat(from.ewallet || 0)?.toLocaleString("en", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }}
              บาท
            </div>
            <button class="flex h-fit items-center p-1 rounded-full text-white bg-green-500"
              @click="visibleDeposit = true">
              <i class="pi pi-plus"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="flex gap-2 w-full justify-center">
        <button type="button" @click="selectedFilter = 'deposit'" class="px-2 py-1 rounded border" :class="[
          selectedFilter === 'deposit'
            ? 'border-purple-500 text-purple-500'
            : '',
        ]">
          ประวัติเติมเงิน
        </button>
        <button type="button" @click="selectedFilter = 'withdraw'" class="px-2 py-1 rounded border" :class="[
          selectedFilter === 'withdraw'
            ? 'border-purple-500 text-purple-500'
            : '',
        ]">
          ประวัติถอนเงิน
        </button>
      </div>

      <!--deposit history-->
      <div v-if="selectedFilter === 'deposit'" class="lg:w-4/6 mx-4 md:mx-auto py-3">
        <div class="bg-[#fff]">
          <div class="text-[#8B2FC9] text-center py-3 font-medium text-xl border-b-4 border-[#8B2FC9]">
            ข้อมูลการเติมเงิน
          </div>
          <div>
            <DataTable :value="Filter" :paginator="true" :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
              selectionMode="single" class="opacity-100" id="print"
              currentPageReportTemplate="แสดง {first} ถึง {last} ใน {totalRecords} รายการ"
              tableStyle="max-width: 24rem">
              <template #empty>
                <p class="font-italic text-center text-2xl">
                  ไม่มีข้อมูลการเติมเงิน
                </p>
              </template>
              <template #header>
                <div class="flex justify-end">
                  <span class="relative">
                    <i class="pi pi-search absolute inset-y-0 left-0 pl-3 flex items-center"></i>
                    <input v-model="searchall" placeholder="ค้นหา" class="pl-10 border rounded p-1 py-2" />
                  </span>
                </div>
              </template>
              <Column header="จำนวน" style="width: 7rem">
                <template #body="item">
                  <div class="text-sm">
                    <p>
                      {{
                        item.data.amt?.toLocaleString("en", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      }}
                    </p>
                    <p class="text-xs">
                      {{
                        dayjs(item.data.created_at).format(
                          "DD/MM/YYYY HH:mm:ss"
                        )
                      }}
                    </p>
                  </div>
                </template>
              </Column>
              <Column header="สถานะ" style="width: 7rem">
                <template #body="item">
                  <div class="text-xs">
                    <Chip :class="{
                      'bg-[#ddc22a]': item.data.status === '1',
                      'bg-[#119c8d]': item.data.status === '2',
                      'bg-[#f53939]': item.data.status === '3',
                    }" class="text-[#fff] py-1 text-xs">
                      {{
                        item.data.status == "1"
                          ? "รอดำเนินการ"
                          : item.data.status == "2"
                            ? "สำเร็จ"
                            : "ถูกปฏิเสธ"
                      }}
                    </Chip>
                    <div>
                      เมื่อ :
                      {{
                        dayjs(item.data.updated_at).format(
                          "DD/MM/YYYY HH:mm:ss"
                        )
                      }}
                    </div>
                  </div>
                </template>
              </Column>
              
            </DataTable>
          </div>
        </div>
      </div>
      <!--withdraw history-->
      <div v-else class="lg:w-4/6 mx-4 md:mx-auto py-3">
        <div class="bg-[#fff]">
          <div class="text-[#8B2FC9] text-center py-3 font-medium text-xl border-b-4 border-[#8B2FC9]">
            ข้อมูลการถอนเงิน
          </div>
          <div>
            <DataTable :value="FilterWithdraw" :paginator="true" :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
              selectionMode="single" class="opacity-100" id="print"
              currentPageReportTemplate="แสดง {first} ถึง {last} ใน {totalRecords} รายการ"
              tableStyle="max-width: 24rem">
              <template #empty>
                <p class="font-italic text-center text-2xl">
                  ไม่มีข้อมูลการถอนเงิน
                </p>
              </template>
              <template #header>
                <div class="flex justify-end">
                  <span class="relative">
                    <i class="pi pi-search absolute inset-y-0 left-0 pl-3 flex items-center"></i>
                    <input v-model="searchall" placeholder="ค้นหา" class="pl-10 border rounded p-1 py-2" />
                  </span>
                </div>
              </template>
              <Column header="จำนวน" style="width: 7rem">
                <template #body="item">
                  <div class="text-sm">
                    <p>
                      {{
                        item.data.amt?.toLocaleString("en", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      }}
                    </p>
                    <p class="text-xs">
                      {{
                        dayjs(item.data.created_at).format(
                          "DD/MM/YYYY HH:mm:ss"
                        )
                      }}
                    </p>
                  </div>
                </template>
              </Column>
              <Column header="สถานะ" style="width: 7rem">
                <template #body="item">
                  <div class="text-xs">
                    <Chip :class="{
                      'bg-[#ddc22a]': item.data.status === '1',
                      'bg-[#119c8d]': item.data.status === '2',
                      'bg-[#f53939]': item.data.status === '3',
                    }" class="text-[#fff] py-1 text-xs">
                      {{
                        item.data.status == "1"
                          ? "รอดำเนินการ"
                          : item.data.status == "2"
                            ? "สำเร็จ"
                            : "ถูกปฏิเสธ"
                      }}
                    </Chip>
                    <div>
                      เมื่อ :
                      {{
                        dayjs(item.data.updated_at).format(
                          "DD/MM/YYYY HH:mm:ss"
                        )
                      }}
                    </div>
                  </div>
                </template>
              </Column>
              <Column header="" style="width: 3rem">
                <template #body="item">
                  <button disabled @click="opendialog(item.data)"
                    class="bg-white text-gray-500 p-2 flex items-center h-fit rounded">
                    <i class="pi pi-bars"></i>
                  </button>
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Dialog header="เติมเงิน E-wallet" v-model:visible="visibleDeposit" :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <div class="flex flex-col gap-2">
      <div class="flex items-center gap-3 border rounded p-1">
        <div class="flex items-center">
          <img src="https://golf4.orangeworkshop.info/mlm/frontend/images/kbank.png" alt="bookbank" />
        </div>
        <div class="text-sm">
          <p>ธนาคารกสิกรไทย (สาขา เซนทรัล เฟสติวัล หาดใหญ่)</p>
          <strong>035-1-66563-7</strong>
          <p>บริษัท มารวยด้วยกัน จำกัด</p>
        </div>
      </div>
      <div class="flex flex-col">
        <label for="amt" class="bg-yellow-200 text-sm px-2 py-1">จำนวนเงิน (ขั้นต่ำ 100 บาท)</label>
        <input id="amt" v-model="deposit.amt" type="number" :min="100" :step="100"
          class="border p-2 rounded focus:outline-none hidden" placeholder="ระบุจำนวนเงินที่ต้องการฝาก" />
        <small class="text-red-500">* กรุณาตรวจสอบตรวจสอบสลิปโอนให้ถูกต้อง</small>
      </div>
      <div class="flex flex-col">
        <label for="upload">แนบหลักฐานการโอน</label>
        <input id="upload" type="file" @change="uploadHandle" />
        <img v-if="deposit.uploadPreview" :src="deposit.uploadPreview" alt="uploadPreview" width="150" />
      </div>
      <button v-if="deposit.upload" type="button" @click="sendDeposit"
        class="border px-2 py-1 w-full bg-green-500">
        ยืนยัน
      </button>
    </div>
  </Dialog>
  <Dialog v-model:visible="isLoading" :closable="false" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <div class="flex flex-col gap-2 py-2 items-center">
      <p class="text-xl text-purple-500">กำลังดำเนินการ...</p>
      <p>กรุณารอซักครู่</p>
    </div>
  </Dialog>
  <Dialog v-model:visible="dialog" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <template #header>
      <div class="flex justify-between items-center">
        <div class="text-lg font-semibold text-[#000]">
          ดูรายละเอียดเติมเงิน
        </div>
      </div>
    </template>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
      <div>
        <label class="text-[#000] font-semibold">วันที่เติม</label>
        <div class="text-[#000]">
          {{ dayjs(dialogdata.date).format("DD/MM/YYYY HH:mm:ss") }}
        </div>
      </div>
      <div>
        <label class="text-[#000] font-semibold">จำนวนเงิน</label>
        <div class="text-[#000]">
          {{
            dialogdata.money.toLocaleString("en", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          }}
          บาท
        </div>
      </div>
      <!--บัญชี-->
      <div>
        <label class="text-[#000] font-semibold">ชื่อบัญชี</label>
        <div class="text-[#000]">{{ dialogdata.bank.accountname }}</div>
      </div>
      <div>
        <label class="text-[#000] font-semibold">เลขบัญชี</label>
        <div class="text-[#000]">{{ dialogdata.bank.accountnumber }}</div>
      </div>
      <div>
        <label class="text-[#000] font-semibold">ธนาคาร</label>
        <div class="text-[#000]">{{ dialogdata.bank.name }}</div>
      </div>
      <div>
        <label class="text-[#000] font-semibold">สาขา</label>
        <div class="text-[#000]">{{ dialogdata.bank.branch }}</div>
      </div>

      <div>
        <label class="text-[#000] font-semibold">สถานะ</label>
        <div class="text-[#000] mt-2">
          <Chip
          :class="[dialogdata.status ? 'bg-[#119c8d] text-[#fff]' : 'bg-[#f97316] text-[#fff]']"
          class="text-[#fff] py-1.5">
            {{ dialogdata.status == true ? "เติมเงินสำเร็จ" : "รอดำเนินการ" }}
          </Chip>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-center w-full gap-3">
      <button @click="dialog = false" :disabled="isLoading"
        class="mt-9 font-semibold leading-none text-white py-4 px-5 md:px-10 bg-[#000] rounded-lg hover:bg-[#0f0121] focus:ring-2 focus:ring-offset-2 focus:ring-[#000] focus:outline-none">
        ปิด
      </button>
    </div>
  </Dialog>
</template>

<script setup>
import axios from "axios";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { ref, onMounted, computed, watchEffect } from "vue";
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

const selectedFilter = ref("deposit");

const deposit = ref({});
const visibleDeposit = ref(false);

const from = ref({});

const getImage = (item) => {
  return `https://drive.google.com/thumbnail?id=${item}&sz=w1000`;
};

onMounted(async () => {
  document.title = "ประวัติการถอนเงิน || Maruey";
  isLoading.value = true;
  await getdata();
  isLoading.value = false;
});

const deposithistory = ref([]);
const getdata = async () => {
  await getUserProfile();
  await getdeposithistory();
};

const getUserProfile = async() => {
      try {
        const response = await axios.get(`${process.env.VUE_APP_MLM}/getUserProfile_token`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        })
        //console.log(response.data)
        if (response.data.status === 'success') {
          const payload = {
            user_id: response.data.data.id,
            username: response.data.data.user_name
          }
          const res = await axios.post(`${process.env.VUE_APP_MLM}/getUserProfile`, payload, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
          })
          //console.log(res.data)
          if (res.data.status === 'success') {
            const loginData = {
              logedIn: true,
              token: localStorage.getItem("token"),
              _id: res.data.data.id,
              username: response.data.data.user_name,
              email: response.data.data.email,
              telephone: response.data.data.phone,
              name: response.data.data.name,
              row: response.data.data.qualification_id,
              position: "customer",
              me: response.data.data,
              code: response.data.code
            }
            store.commit("setLogin", loginData)
            getcustomer();
          }
        }
      }
      catch(err) {
        //console.log(err)
      }
    }

const sendDeposit = async () => {
  const formData = new FormData();
  formData.append("upload", deposit.value.upload);
  //formData.append("amt", deposit.value.amt);
  formData.append("user_id", store.getters.me?.id);
  formData.append("username", store.getters.me?.user_name);
  try {
    isLoading.value = true
    visibleDeposit.value = false
    const { data } = await axios.post(
      `${process.env.VUE_APP_MLM}/deposit`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${store.getters.token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    //console.log(data);
    if (data.status === "success") {
      deposit.value = {};
      visibleDeposit.value = false;
      Swal.fire({
        icon: "success",
        title: 'แนบหลักฐานสำเร็จ',
        text: 'กรุณารอตรวจสอบสลิป',
        showConfirmButton: true,
      })
      getdeposithistory();
    } else {
      Swal.fire({
        icon: "error",
        title: data.message,
        text: 'กรุณาตรวจสอบสลิปอีกครั้ง',
        showConfirmButton: true,
      })
      visibleDeposit.value = true
    }
  } catch (err) {
    Swal.fire({
        icon: "error",
        title: 'เกิดข้อผิดพลาด',
        text: "ไม่สามารถเติมเงินได้ในขณะนี้ กรุณาเก็บหลักฐานไว้ดำเนินการภายหลัง",
        showConfirmButton: true,
      })
      visibleDeposit.value = true
  } finally {
    isLoading.value = false
  }
};

const getcustomer = async () => {
  from.value = store.getters.me;
};

const uploadHandle = (event) => {
  const file = event.target.files[0];
  deposit.value.upload = file;

  const reader = new FileReader();
  reader.onload = (loadEvent) => {
    const base64String = loadEvent.target.result;
    deposit.value.uploadPreview = base64String;
  };
  reader.readAsDataURL(file);
};

const clearUpload = () => {
  deposit.value.upload = null;
  deposit.value.uploadPreview = "";
};

const getdeposithistory = async () => {
  const config = {
    method: "get",
    url: `${process.env.VUE_APP_MARUEY}${from.value.id}/ewallet`,
    headers: {
      token: "Bearer " + localStorage.getItem("token"),
    },
  };
  await axios(config)
    .then(async (res) => {
      //console.log(res.data);
      deposithistory.value = res.data?.data?.reverse();
    })
    .catch((err) => {
      //console.log(err);
    });
};

const searchall = ref("");
const Filter = computed(() => {
  return deposithistory.value?.filter((x) => x.type === 1);
});

const FilterWithdraw = computed(() => {
  return deposithistory.value?.filter((x) => x.type === 3);
});
const dialog = ref(false);
const dialogdata = ref({});
const opendialog = (item) => {
  dialog.value = true;
  dialogdata.value = { ...item };
};
</script>

<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

@import "@/assets/Loading.css";
</style>
