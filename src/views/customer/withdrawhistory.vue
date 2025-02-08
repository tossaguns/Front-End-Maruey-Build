<template>
  <div v-if="isLoading" class="overlay">
    <div class="loader"></div>
  </div>
  <div class="h-full bg-[#f7f7f7] min-h-[800px] mb-20">
    <div class="h-full mx-2">
      <div class="md:w-4/6 mx-4 my-2 pb-10">
        <div class="bg-[#fff]">
          <div
            class="text-[#8B2FC9] text-center py-3 font-medium text-xl border-b-4 border-[#8B2FC9]"
          >
            เงินในระบบ
          </div>
          <div class="flex w-full items-center py-5 px-10">
            <div class="w-full text-sm md:text-xl">
              <i class="pi pi-wallet text-purple-500 mr-3"></i>
              <span class="text-base md:text-lg text-[#8B2FC9]">เงินในกระเป๋า</span>
              <br />
              {{
                parseFloat(from.ewallet)?.toLocaleString("en", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }}
              บาท
            </div>
            <button class="flex h-fit items-center p-2 rounded-full text-white bg-red-500" @click="visibleWithdraw = true"><i class="pi pi-download"></i></button>
          </div>
        </div>
      </div>

      <div class="lg:w-4/6 mx-4 md:mx-auto py-3">
        <div class="bg-[#fff]">
          <div
            class="text-[#8B2FC9] text-center py-3 font-medium text-xl border-b-4 border-[#8B2FC9]"
          >
            ข้อมูลการถอนเงิน
          </div>
          <div>
            <DataTable
              :value="Filter"
              :paginator="true"
              :rows="5"
              :rowsPerPageOptions="[5, 10, 20, 50]"
              selectionMode="single"
              class="opacity-100"
              id="print"
              currentPageReportTemplate="แสดง {first} ถึง {last} ใน {totalRecords} รายการ"
              tableStyle="max-width: 24rem"
            >
              <template #empty>
                <p class="font-italic text-center text-2xl">ไม่มีข้อมูลการถอนเงิน</p>
              </template>
              <template #header>
                <div class="flex justify-end">
                  <span class="relative">
                    <i
                      class="pi pi-search absolute inset-y-0 left-0 pl-3 flex items-center"
                    ></i>
                    <input
                      v-model="searchall"
                      placeholder="ค้นหา"
                      class="pl-10 border rounded p-1 py-2"
                    />
                  </span>
                </div>
              </template>
              <Column header="จำนวน" style="width: 7rem;">
                <template #body="item">
                  <div class="text-sm">
                    <p>{{
                      item.data.amt?.toLocaleString("en", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    }}
                    </p>
                    <p class="text-xs">{{ dayjs(item.data.created_at).format("DD/MM/YYYY HH:mm:ss") }}</p>
                  </div>
                </template>
              </Column>
              <Column header="สถานะ" style="width: 7rem;">
                <template #body="item">
                  <div class="text-xs">
                    <Chip
                    :class="{
                      'bg-[#ddc22a]': item.data.status === '1',
                      'bg-[#119c8d]': item.data.status === '2',
                      'bg-[#f53939]': item.data.status === '3',
                    }"
                    class="text-[#fff] py-1 text-xs"
                  >
                    {{ 
                      item.data.status == '1' ? "รอดำเนินการ" 
                      : item.data.status == '2' ? "สำเร็จ"
                      : "ถูกปฏิเสธ" 
                    }}
                  </Chip>
                  <div>
                    เมื่อ : {{ dayjs(item.data.updated_at).format("DD/MM/YYYY HH:mm:ss") }}
                  </div>
                  </div>
                  
                </template>
              </Column>
              <Column header="" style="width: 3rem;">
                <template #body="item">
                  <button
                    @click="opendialog(item.data)"
                    class="bg-white text-gray-500 p-2 flex items-center h-fit rounded"
                  >
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
  <Dialog
    header="ถอนเงิน E-wallet"
    v-model:visible="visibleWithdraw"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <div class="flex flex-col">
      <div class="flex flex-col">
        <label for="amt">จำนวนเงิน (ขั้นต่ำ 100 บาท)</label>
        <input id="amt" v-model="withdraw.amt" type="number" :min="100" :step="100" class="border p-2 rounded focus:outline-none">
      </div>
      <button v-if="withdraw.amt >= 100" type="button" @click="sendWithdraw" class="border px-2 py-1 w-full bg-green-500">
        ยินยัน
      </button>
    </div>
  </Dialog>
  <Dialog
    v-model:visible="dialog"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <template #header>
      <div class="flex justify-between items-center">
        <div class="text-lg font-semibold text-[#000]">ดูรายละเอียดถอนเงิน</div>
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
            :class="{
              'bg-[#f97316] text-[#fff]': dialogdata.status == false,
              'bg-[#119c8d] text-[#fff]': dialogdata.status === true,
            }"
            class="text-[#fff ] py-1.5"
          >
            {{ dialogdata.status == true ? "ถอนเงินสำเร็จ" : "รอดำเนินการ" }}
          </Chip>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-center w-full gap-3">
      <button
        @click="dialog = false"
        :disabled="isLoading"
        class="mt-9 font-semibold leading-none text-white py-4 px-5 md:px-10 bg-[#000] rounded-lg hover:bg-[#0f0121] focus:ring-2 focus:ring-offset-2 focus:ring-[#000] focus:outline-none"
      >
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

const withdraw = ref({})
const visibleWithdraw = ref(false)

const from = ref({})

onMounted(async () => {
  document.title = "ประวัติการถอนเงิน || Maruey";
  isLoading.value = true;
  await getdata();
  isLoading.value = false;
});

const withdrawhistory = ref([]);
const getdata = async () => {
  await getcustomer();
  await getwithdrawhistory();
};

const sendWithdraw = async() => {
  const payload = {
    amt: withdraw.value.amt,
    user_id: store.getters.me?.id,
    username: store.getters.me?.user_name,
  }
  try {
    const { data } = await axios.post(`${process.env.VUE_APP_MLM}/withdraw`, payload, {
      headers: {
        Authorization: `Bearer ${store.getters.token}`,
      }
    })
    //console.log(data)
    if (data.status === 'success') {
      withdraw.value = {}
      visibleWithdraw.value = false
      alert("ดำเนินการสำเร็จ กำลังรอตรวจสอบ")
      getwithdrawhistory()
    }
  }
  catch(err) {
    //console.log(err)
    alert("เกิดข้อผิดพลาด ไม่สามารถถอนเงินได้ในขณะนี้")
  }
}

const getcustomer = async () => {
  from.value = store.getters.me;
};

const uploadHandle = (event) => {
  const file = event.target.files[0]
  withdraw.value.upload = file

  const reader = new FileReader()
  reader.onload = (loadEvent) => {
    const base64String = loadEvent.target.result
    withdraw.value.uploadPreview = base64String
  }
  reader.readAsDataURL(file)
}

const getwithdrawhistory = async () => {
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
      withdrawhistory.value = res.data?.data?.reverse();
    })
    .catch((err) => {
      //console.log(err);
    });
};

const searchall = ref("");
const Filter = computed(() => {
  return withdrawhistory.value.filter(x => x.type === 3)
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