<template>
  <div class="w-full h-full min-h-screen bg-white pb-28">
    <div class="flex w-full px-5 py-5 justify-start">
      <Button
        :loading="loading"
        icon="pi pi-chevron-left"
        label="ย้อนกลับ"
        @click="$router.push('/partner/product?shop_id=' + shop_id)"
        class="text-black"
      />
      <h1 v-if="!onEdit" class="text-black ml-10 text-xl">เพิ่มสินค้า</h1>
      <h1 v-else class="text-black ml-10 text-xl">แก้ไขสินค้า</h1>
    </div>
    <div class="mb-3 bg-yellow-200 py-5 rounded">
      <p
        class="text-sm underline text-purple-500 text-center"
        @click="showComDesc = true"
      >
        คลิกที่นี่เพื่อศึกษาข้อมูลเพิ่มเติม
      </p>
    </div>
    <div
      v-if="onEdit && shop_id"
      class="py-3 px-5 border-y my-2"
      :class="product.active ? 'bg-green-500' : 'bg-gray-500'"
    >
      <div class="flex items-center gap-2 w-full justify-between">
        <label
          class="text-lg text-white px-2 py-1 rounded"
          v-if="product.active"
          for="active"
          >วางขาย</label
        >
        <label class="text-lg text-white px-2 py-1 rounded" v-else for="active"
          >หยุดขายชั่วคราว</label
        >
        <InputSwitch
          :disabled="product.status !== 1 && product.status !== 2"
          v-model="product.active"
          inputId="active"
        />
      </div>
    </div>
    <div class="px-3">
      <p class="px-2">
        รูปภาพ <span class="text-sm">(3-5 รูป)</span>
        <span
          class="ml-2"
          :class="images.length === 5 ? 'text-purple-500' : 'text-gray-400'"
          >{{ images.length }}/5</span
        >
      </p>
      <div class="grid grid-cols-3 px-3 py-2 gap-1">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="border flex justify-center items-center relative border-purple-500 rounded"
        >
          <Image :src="image.preview" preview width="150" class="p-1" />
          <Button
            :loading="loading"
            icon="pi pi-times"
            class="absolute top-1 right-1 text-sm w-fit rounded-full px-1 bg-white text-red-500"
            @click="deleteImage(index)"
          />
        </div>
        <div
          class="border border-purple-500 relative rounded flex justify-center items-center hover:bg-purple-200"
        >
          <input
            type="file"
            multiple
            @change="onFileChange"
            ref="fileInput"
            class="absolute top-0 left-0 w-full h-full opacity-0 z-10"
          />
          <i class="pi pi-plus text-6xl text-purple-500 opacity-50"></i>
        </div>
      </div>
    </div>
    <div class="w-full flex flex-col gap-2 px-5">
      <div class="flex flex-col gap-2">
        <label for="product_type">ประเภท</label>
        <Dropdown
          @change="onProductTypeChange"
          id="product_type"
          v-model="product.product_type"
          class="w-full border focus:ring-0"
          :options="['สินค้า', 'บริการ']"
          placeholder="เลือกประเภท"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="name">ชื่อสินค้า/บริการ</label>
        <InputText
          id="name"
          v-model="product.name"
          class="w-full border focus:ring-0"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="category">หมวดหมู่{{ product.product_type }}</label>
        <Dropdown
          v-if="product.product_type === 'สินค้า'"
          inputId="category"
          v-model="product.category"
          class="w-full border focus:ring-0"
          :options="categories"
          placeholder="เลือกหมวดสินค้า"
        />
        <InputText
          v-model="product.category"
          v-else
          class="w-full border focus:ring-0"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="tags"
          >คีย์เวิร์ด
          <span class="text-gray-500 text-sm"
            >{{ product.tags.length }}/5</span
          ></label
        >
        <div class="flex overflow-x-auto gap-2">
          <div
            v-for="(tag, index) in product.tags"
            :key="index"
            class="relative pr-4 bg-gray-200 rounded-full min-w-fit"
          >
            <Chip :label="tag" class="text-xs" />
            <i
              class="absolute top-0 right-0 p-1 cursor-pointer pi pi-times-circle text-gray-500"
              @click="handleRemoveTag(index)"
            ></i>
          </div>
        </div>
        <div class="flex relative">
          <InputText
            v-model="inputTag"
            class="w-full border focus:ring-0"
            inputId="inputTag"
            placeholder="คีย์เวิร์ดค้นหาสินค้า"
            :maxlength="20"
          />
          <Button
            :disabled="!inputTag || product.tags?.length === 5"
            @click="handleInputTag"
            label="เพิ่ม"
            class="bg-purple-500 text-white px-5 py-2"
          />
          <span
            class="text-gray-400 text-xs absolute top-1 translate-y-1/2 right-16"
            >{{ inputTag?.length || 0 }}/20</span
          >
        </div>
        <MultiSelect
          :disabled="!product.category"
          v-model="product.tags"
          display="chip"
          :options="tags"
          optionLabel="name"
          placeholder="เลือกหมวดสินค้าย่อย"
          :maxSelectedLabels="5"
          class="w-full border text-xs focus:ring-0 focus:outline-none hidden"
          panelClass="w-full focus:ring-0 focus:outline-none bg-slate-100 text-sm"
        />
      </div>
      <div class="flex flex-col gap-2 relative">
        <label for="name">คำอธิบาย</label>
        <Textarea
          id="name"
          v-model="product.description"
          cols="30"
          rows="5"
          class="w-full border focus:ring-0"
        />
        <small class="absolute bottom-1 right-2 text-gray-500"
          >{{ product.description?.length || 0 }}/300</small
        >
      </div>

      <div class="flex flex-col gap-2">
        <label for="raw_price">ราคาสินค้า/บริการ</label>
        <InputNumber
          prefix="฿ "
          :minFractionDigits="2"
          :maxFractionDigits="2"
          inputId="raw_price"
          v-model="product.raw_price"
          inputClass="w-full border focus:ring-0 border-purple-500 bg-purple-100"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="discount">ส่วนลด</label>
        <InputNumber
          placeholder="ไม่มีส่วนลด"
          prefix="฿ "
          :minFractionDigits="2"
          :maxFractionDigits="2"
          inputId="discount"
          v-model="product.discount"
          inputClass="w-full border focus:ring-0"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="selling_price">ราคาวางขาย (หลังหักส่วนลด)</label>
        <InputNumber
          placeholder="คำนวณอัตโนมัติ"
          disabled
          prefix="฿ "
          :minFractionDigits="2"
          :maxFractionDigits="2"
          inputId="selling_price"
          v-model="product.selling_price"
          inputClass="w-full border focus:ring-0"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="unit">หน่วย</label>
        <InputText
          id="unit"
          v-model="product.unit"
          class="w-full border focus:ring-0"
          placeholder="ชิ้น อัน ..."
        />
      </div>
      <div class="w-full p-2 border bg-purple-200">
        <div class="flex flex-col gap-2">
          <label
            >ค่าสนับสนุนการตลาด<span
              class="ml-2 pi pi-exclamation-circle cursor-pointer"
              @click="showComDesc = true"
            ></span
          ></label>
          <small>อัตรา 1 PV = 10 บาท</small>
          <div class="w-full gap-3 justify-between">
            <button
              class="border w-full py-3 rounded hidden"
              :class="
                selectedCommission === 'percentage'
                  ? 'bg-purple-500 text-white'
                  : ''
              "
              @click="selectedCommission = 'percentage'"
            >
              ร้อยละ (%)
            </button>
            <button
              class="border w-full py-3 rounded hidden"
              :class="
                selectedCommission === 'flat' ? 'bg-purple-500 text-white' : ''
              "
              @click="selectedCommission = 'flat'"
            >
              บาท
            </button>
            <button
              class="border w-full py-3 rounded hidden"
              :class="
                selectedCommission === 'pv' ? 'bg-purple-500 text-white' : ''
              "
              @click="selectedCommission = 'pv'"
            >
              รายชิ้น
            </button>
            <button
              class="border w-full py-3 rounded hidden"
              :class="
                selectedCommission === 'group' ? 'bg-purple-500 text-white' : ''
              "
              @click="selectedCommission = 'group'"
            >
              แบบกลุ่ม
            </button>
          </div>
          <InputNumber
            placeholder="0.00 บาท"
            v-if="selectedCommission === 'flat'"
            prefix="฿ "
            :minFractionDigits="2"
            :maxFractionDigits="2"
            inputId="commission"
            v-model="product.commission"
            inputClass="w-full border focus:ring-0"
          />
          <InputNumber
            placeholder="0.00 %"
            v-else-if="selectedCommission === 'percentage'"
            suffix=" %"
            :minFractionDigits="2"
            :maxFractionDigits="2"
            inputId="commission_percent"
            v-model="product.commission_percent"
            inputClass="w-full border focus:ring-0"
          />
          <InputNumber
            placeholder="0.1 PV"
            v-else-if="selectedCommission === 'pv'"
            suffix=" PV"
            :min="0.1"
            :minFractionDigits="1"
            :maxFractionDigits="1"
            inputId="pv"
            v-model="product.pv"
            inputClass="w-full border focus:ring-0"
          />
          <div class="flex" v-else>
            <div>
              <label for="r_commission">ทุก ๆ ยอดขาย</label>
              <InputNumber
                placeholder="0.00 บาท"
                suffix=" บาท"
                :min="0.1"
                :minFractionDigits="2"
                :maxFractionDigits="2"
                inputId="r_commission"
                v-model="product.r_commission"
                inputClass="w-full border focus:ring-0"
              />
            </div>
            <div>
              <label for="r_pv">จะได้รับ</label>
              <InputNumber
                placeholder="0.1 PV"
                suffix=" PV"
                :min="0.1"
                :minFractionDigits="1"
                :maxFractionDigits="1"
                inputId="r_pv"
                v-model="product.r_pv"
                inputClass="w-full border focus:ring-0"
              />
            </div>
          </div>
          <div class="flex justify-end gap-3">
            <Button
              label="คำนวณ"
              @click="calculating"
              icon="pi pi-calculator pl-2"
              iconPos="right"
              class="bg-purple-500 text-white py-2 px-5 w-fit"
            />
            <Button
              label="ล้าง"
              @click="clearCalculating"
              icon="pi pi-times pl-2"
              iconPos="right"
              class="bg-gray-400 text-white py-2 px-5 w-fit"
            />
          </div>
        </div>
        <div class="mt-3">
          <p>
            ราคาสินค้า/บริการ วางขาย : ฿ {{ product.selling_price || "0.00" }}
          </p>
          <p v-if="selectedCommission === 'percentage'">
            ค่าสนับสนุนการตลาด : {{ product.commission_percent || "0.00" }} %
          </p>
          <p v-if="selectedCommission === 'percentage'">
            คิดเป็น : ฿ {{ product.commission || "0.00" }}
          </p>
          <p v-if="selectedCommission === 'percentage'">
            จำนวน PV : {{ product.pv || "0.0" }} <span class="ml-3">PV</span>
          </p>
          <p v-if="selectedCommission === 'flat'">
            ค่าสนับสนุนการตลาด : ฿ {{ product.commission || "0.00" }}
          </p>
          <p v-if="selectedCommission === 'flat'">
            คิดเป็นร้อยละ : {{ product.commission_percent || "0.00" }} %
          </p>
          <p v-if="selectedCommission === 'flat'">
            จำนวน PV : {{ product.pv || "0.0" }} <span class="ml-3">PV</span>
          </p>
          <p v-if="selectedCommission === 'pv'">
            ค่าสนับสนุนการตลาด : {{ product.pv || "0.0" }}
            <span class="ml-3">PV</span>
          </p>
          <p v-if="selectedCommission === 'pv'">
            คิดเป็น : ฿ {{ product.commission || "0.00" }}
          </p>
          <p v-if="selectedCommission === 'pv'">
            คิดเป็นร้อยละ : {{ product.commission_percent || "0.00" }} %
          </p>
          <p v-if="selectedCommission === 'group'">
            ค่าสนับสนุนการตลาด : {{ product.r_pv || "0.0" }}
            <span class="ml-1">PV</span> / {{ product.r_commission || "0.0" }}
            <span class="ml-1">บาท</span>
          </p>
          <p v-if="selectedCommission === 'group'">
            คิดเป็นร้อยละ : {{ product.commission_percent || "0.00" }} %
          </p>
          <p v-if="selectedCommission !== 'group'">
            รายได้ที่จะได้รับ/หน่วย : ฿
            {{ product.selling_price - product.commission || "0.00" }}
          </p>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <label for="stock">จำนวนในสต๊อก</label>
        <InputNumber
          :placeholder="`xxx ${product.unit || 'หน่วย'}`"
          :suffix="` ${product.unit || 'หน่วย'}`"
          :minFractionDigits="0"
          :maxFractionDigits="0"
          inputId="stock"
          v-model="product.stock"
          inputClass="w-full border focus:ring-0"
        />
      </div>
      <div class="flex flex-col gap-3 mt-5 w-full">
        <p class="text-sm text-yellow-600" v-if="!validInput">
          * กรุณาตรวจสอบข้อมูลให้ครบถ้วนก่อนบันทึก
        </p>
        <Button
          :loading="loading"
          v-if="onEdit"
          :disabled="!validInput"
          class="w-full bg-orange-500 text-white py-2"
          label="แก้ไขสินค้า"
          @click="handleSubmit"
        />
        <Button
          :loading="loading"
          v-if="onEdit"
          class="w-full text-red-500 py-2"
          label="ลบสินค้า"
          @click="deleteProductHandle"
        />
        <Button
          :loading="loading"
          v-else
          :disabled="!validInput"
          class="w-full bg-emerald-500 text-white py-2"
          label="เพิ่มสินค้า"
          @click="handleSubmit"
        />
      </div>
    </div>

    <!--Modal-->
    <Dialog
      v-model:visible="visibleSubmit"
      modal
      :closable="false"
      header=" "
      :style="{ width: '25rem' }"
    >
      <div v-if="onEdit" class="w-full flex flex-col items-center">
        <p class="font-semibold text-purple-500 mb-3">ยืนยันแก้ไขสินค้า</p>
        <p>{{ product.name }}</p>
        <p>ราคาวางขาย : ฿ {{ product.selling_price }}</p>
        <p>
          ค่าสนับสนุนการตลาด : ฿ {{ product.commission }} ({{
            product.commission_percent
          }}%)
        </p>
        <p>จำนวน {{ product.stock }} {{ product.unit }}</p>
      </div>
      <div v-else class="w-full flex flex-col items-center">
        <p class="font-semibold text-purple-500 mb-3">ยืนยันการเพิ่มสินค้า</p>
        <p>{{ product.name }}</p>
        <p>ราคาวางขาย : ฿ {{ product.selling_price }}</p>
        <p>
          ค่าสนับสนุนการตลาด : ฿ {{ product.commission }} ({{
            product.commission_percent
          }}%)
        </p>
        <p>จำนวน {{ product.stock }} {{ product.unit }}</p>
      </div>
      <div class="flex justify-center gap-10 border-t pt-3 mt-3">
        <Button
          :loading="loading"
          type="button"
          label="ยกเลิก"
          severity="secondary"
          @click="visibleSubmit = false"
        ></Button>
        <Button
          :loading="loading"
          v-if="!onEdit"
          type="button"
          label="ยืนยัน"
          class="bg-purple-500 text-white px-3 py-2"
          @click="addProduct"
        ></Button>
        <Button
          :loading="loading"
          v-else
          type="button"
          label="ยืนยันแก้ไข"
          class="bg-orange-500 text-white px-3 py-2"
          @click="updateProduct"
        ></Button>
      </div>
    </Dialog>

    <Dialog
      v-model:visible="visibleDelete"
      modal
      :closable="false"
      header=" "
      :style="{ width: '25rem' }"
    >
      <div class="w-full flex flex-col items-center">
        <p class="font-semibold text-purple-500 mb-3">ยืนยันลบสินค้า</p>
        <p>{{ product.name }}</p>
        <p>{{ product.code }}</p>
      </div>
      <div class="flex justify-center gap-10 border-t pt-3 mt-3">
        <Button
          :loading="loading"
          type="button"
          label="ยกเลิก"
          severity="secondary"
          @click="visibleDelete = false"
        ></Button>
        <Button
          :loading="loading"
          type="button"
          label="ยืนยันลบ"
          class="bg-red-500 text-white px-3 py-2"
          @click="deleteProduct"
        ></Button>
      </div>
    </Dialog>

    <Dialog
      v-model:visible="showComDesc"
      :showHeader="false"
      :style="{ width: '100%' }"
    >
      <div class="w-full flex flex-col items-center pt-5">
        <div>
          <img src="/src/assets/images/commTerm.jpg" />
        </div>
      </div>
      <div class="flex justify-center gap-2 mt-5">
        <Button
          :loading="loading"
          type="button"
          label="เข้าใจแล้ว"
          severity="secondary"
          class="bg-purple-500 text-white px-3 py-2"
          @click="showComDesc = false"
        ></Button>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

onMounted(() => {
  shop_id.value = route.query.shop_id;
  if (route.query.product_id) {
    product.value._id = route.query.product_id;
    onEdit.value = true;
    getProduct();
  } else {
    showComDesc.value = true;
  }
});

const inputTag = ref("");
const store = useStore();
const router = useRouter();
const route = useRoute();
const loading = ref(false);
const onEdit = ref(false);
const product = ref({});
product.value.tags = [];
product.value.product_type = "สินค้า";
const visibleSubmit = ref(false);
const shop_id = ref(null);
const selectedCommission = ref("pv");

const showComDesc = ref(false);

const getProductStatus = (product) => {
  if (product.stock === 0) {
    return "สินค้าหมด";
  } else if (product.status === 1) {
    return "วางขาย";
  } else if (product.status === 2) {
    return "หยุดขายชั่วคราว";
  } else if (product.status === 3) {
    return "ไม่ได้รับอนุญาติ";
  } else if (product.status === 4) {
    return "รอตรวจสอบ";
  }
};

const handleInputTag = () => {
  if (inputTag.value) {
    product.value.tags.push(inputTag.value);
    inputTag.value = "";
  }
};

const handleRemoveTag = (index) => {
  product.value.tags.splice(index, 1);
};

const validInput = computed(() => {
  if (
    !product.value.name ||
    !product.value.description ||
    !product.value.unit ||
    !product.value.product_type ||
    !product.value.category ||
    !product.value.stock ||
    !product.value.selling_price ||
    !product.value.raw_price ||
    !product.value.commission ||
    !product.value.commission_percent ||
    !product.value.pv ||
    !shop_id.value ||
    images.value.length < 3
  ) {
    return false;
  } else {
    return true;
  }
});

const handleSubmit = async () => {
  visibleSubmit.value = true;
};

const visibleDelete = ref(false);
const deleteProductHandle = async () => {
  visibleDelete.value = true;
};

watch(
  () => product.value.raw_price,
  () => {
    if (product.value.raw_price > 0) {
      product.value.selling_price =
        product.value.raw_price - (product.value.discount || 0);
    }
  }
);

watch(
  () => product.value.discount,
  () => {
    if (product.value.discount > 0) {
      product.value.selling_price =
        (product.value.raw_price || 0) - product.value.discount;
    }
  }
);

const onProductTypeChange = () => {
  if (product.value.product_type === "สินค้า") {
    product.value.category = null;
  } else if (product.value.product_type === "บริการ") {
    product.value.category = null;
  }
}

const calculating = () => {
  console.log(selectedCommission.value);
  if (product.value.selling_price <= 0 || !product.value.selling_price) {
    product.value.commission = null;
    product.value.commission_percent = null;
    product.value.pv = null;
    return;
  }

  if (selectedCommission.value === "percentage") {
    console.log("calling percent");
    product.value.commission = parseFloat(
      (
        (product.value.selling_price * product.value.commission_percent) /
        100
      ).toFixed(2)
    );
    product.value.pv = parseFloat((product.value.commission / 10).toFixed(1));
    if (product.value.pv < 0.1) {
      product.value.pv = 0.1;
    }
  } else if (selectedCommission.value === "flat") {
    console.log("calling flat");
    product.value.commission_percent = parseFloat(
      ((product.value.commission * 100) / product.value.selling_price).toFixed(
        2
      )
    );
    product.value.pv = parseFloat((product.value.commission / 10).toFixed(1));
    if (product.value.pv < 0.1) {
      product.value.pv = 0.1;
    }
  } else if (selectedCommission.value === "pv") {
    console.log(product.value.pv);
    product.value.commission = parseFloat((product.value.pv * 10).toFixed(2));
    product.value.commission_percent = parseFloat(
      ((product.value.commission * 100) / product.value.selling_price).toFixed(
        2
      )
    );
  } else if (selectedCommission.value === "group") {
    product.value.commission_percent = parseFloat(
      ((product.value.r_pv * 1000) / product.value.r_commission).toFixed(2)
    );
    product.value.commission = parseFloat(
      (
        (product.value.selling_price * product.value.commission_percent) /
        100
      ).toFixed(2)
    );
    product.value.pv = parseFloat((product.value.commission / 10).toFixed(1));
    if (product.value.pv < 0.1) {
      product.value.pv = 0.1;
    }
  } else {
    return;
  }
};

const clearCalculating = () => {
  product.value.commission = null;
  product.value.commission_percent = null;
  product.value.pv = null;
};

const getProduct = async () => {
  loading.value = true;
  try {
    const { data } = await axios.get(
      `${process.env.VUE_APP_MARUEY}product/partner/${product.value._id}`
    );
    //console.log(data);
    if (data.status) {
      product.value = data.data;
      
      if (product.value.status === 1) {
        product.value.active = true;
      } else {
        product.value.active = false;
      }
      
      getProductImages();
    }
  } catch (err) {
    console.log(err);
  } finally {
    loading.value = false;
  }
};

const onFileChange = (e) => {
  const files = e.target.files;
  const maxFiles = 5;
  //const reader = new FileReader();
  const imagess = [];

  if (files.length > maxFiles) {
    Swal.fire({
      icon: "error",
      title: "ไม่สามารถเลือกได้เกิน " + maxFiles + " รูป",
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  }

  if (files.length + images.value.length > maxFiles) {
    Swal.fire({
      icon: "error",
      title: "ไม่สามารถเลือกได้เกิน " + maxFiles + " รูป",
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  }

  const readFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result); // Return the file's data URL when read
      };
      reader.readAsDataURL(file);
    });
  };

  const readFiles = async () => {
    for (const file of files) {
      const image = await readFile(file);
      imagess.push({
        preview: image,
        file: file,
      }); // Push each image to the array
    }
    images.value = [...images.value, ...imagess]; // Assign the array of images to product
  };

  readFiles();
};

const deleteImage = (index) => {
  images.value.splice(index, 1);
};

const addProduct = async () => {
  loading.value = true;
  const payload = {
    name: product.value.name,
    description: product.value.description,
    partner_id: shop_id.value,
    raw_price: product.value.raw_price,
    discount: product.value.discount,
    unit: product.value.unit,
    product_type: product.value.product_type,
    category: product.value.category, // สินค้า, บริการ, อื่นๆ
    tags: product.value.tags.map((tag) => tag),
    stock: product.value.stock,
    commission: product.value.commission,
    commission_percent: product.value.commission_percent,
    pv: product.value.pv,
  };
  try {
    const { data } = await axios.post(
      `${process.env.VUE_APP_MARUEY}product/partner`,
      payload,
      {
        headers: {
          token: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    if (data.status) {
      product.value._id = data.data._id;
      if (!product.value._id) {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          showConfirmButton: false,
          timer: 1500,
        });
        return false;
      }

      const addedPictures = await addProductPictureHandle();
      if (!addedPictures) {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          showConfirmButton: false,
          timer: 1500,
        });
        return false;
      }

      Swal.fire({
        icon: "success",
        title: "เพิ่มสินค้าสําเร็จ",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push(
        `/partner/product?shop_id=${shop_id.value || route.query.shop_id}`
      );
    }
  } catch (err) {
    //console.log(err)
  } finally {
    loading.value = false;
  }
};

const updateProduct = async () => {
  loading.value = true;
  const payload = {
    name: product.value.name,
    description: product.value.description,
    partner_id: shop_id.value,
    raw_price: product.value.raw_price,
    discount: product.value.discount,
    unit: product.value.unit,
    product_type: product.value.product_type,
    category: product.value.category, // สินค้า, บริการ, อื่นๆ
    tags: product.value.tags.map((tag) => tag),
    stock: product.value.stock,
    commission: product.value.commission,
    commission_percent: product.value.commission_percent,
    status: product.value.active ? 1 : 2,
    pv: product.value.pv,
  };
  try {
    const { data } = await axios.put(
      `${process.env.VUE_APP_MARUEY}product/partner/${product.value._id}`,
      payload,
      {
        headers: {
          token: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    if (data.status) {
      const addedPictures = await addProductPictureHandle();
      if (!addedPictures) {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          showConfirmButton: false,
          timer: 1500,
        });
        return false;
      }

      Swal.fire({
        icon: "success",
        title: "อัพเดทสินค้าสําเร็จ",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push(
        `/partner/product?shop_id=${shop_id.value || route.query.shop_id}`
      );
    }
  } catch (err) {
    //console.log(err)
    if (err?.response?.data?.message) {
      visibleSubmit.value = false;
      Swal.fire({
        icon: "error",
        title: err.response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      return false;
    }
    Swal.fire({
      icon: "error",
      title: "เกิดข้อผิดพลาด",
      showConfirmButton: false,
      timer: 1500,
    });
  } finally {
    loading.value = false;
  }
};

const deleteProduct = async () => {
  loading.value = true;
  try {
    const { data } = await axios.delete(
      `${process.env.VUE_APP_MARUEY}product/partner/${product.value._id}`,
      {
        headers: {
          token: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    if (data.status) {
      Swal.fire({
        icon: "success",
        title: "ลบสินค้าสําเร็จ",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push(
        `/partner/product?shop_id=${shop_id.value || route.query.shop_id}`
      );
    }
  } catch (err) {
    //console.log(err)
    Swal.fire({
      icon: "error",
      title: "เกิดข้อผิดพลาด",
      showConfirmButton: false,
      timer: 1500,
    });
  } finally {
    loading.value = false;
  }
};

const images = ref([]);

const addProductPictureHandle = async () => {
  loading.value = true;
  if (!product.value._id && !images.value.length) {
    return false;
  }
  const uploadedList = await Promise.all(
    images.value
      ?.filter((x) => x.file)
      ?.map(async (image) => {
        const index = images.value.findIndex((x) => x.file === image.file);
        addProductPicture(image, index + "");
      })
  );
  if (uploadedList?.length === images.value?.filter((x) => x.file)?.length) {
    loading.value = false;
    return true;
  } else {
    return false;
  }
};

const addProductPicture = async (image, index) => {
  const formData = new FormData();
  formData.append("file", image.file);
  formData.append("title", "product");
  formData.append("description", index);
  formData.append("product_id", product.value._id);
  formData.append("partner_id", shop_id.value);
  try {
    const { data } = await axios.post(
      `${process.env.VUE_APP_MARUEY}product/partner/product-image`,
      formData,
      {
        headers: {
          token: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (data.status) {
      return true;
    }
  } catch (err) {
    console.log(err);
  }
};

const categories = ref([
  "อาหารและเครื่องดื่ม",
  "เสื้อผ้าผู้ชาย",
  "เสื้อผ้าผู้หญิง",
  "ความงามและของใช้ส่วนตัว",
  "ผลิตภัณฑ์เพื่อสุขภาพ",
  "กระเป๋า",
  "เครื่องประดับ",
  "เครื่องใช้ในบ้าน",
  "รองเท้าผู้ชาย",
  "รองเท้าผู้หญิง",
  "เครื่องใช้ไฟฟ้า",
  "อุปกรณ์อิเล็กทรอนิกส์",
  "ของเล่น สินค้าแม่และเด็ก",
  "นาฬิกาและแว่นตา",
  "เครื่องเขียน หนังสือ และงานอดิเรก",
  "สัตว์เลี้ยง",
  "กีฬาและกิจกรรมกลางแจ้ง",
]);

const original_tags = ref([]);
const tags = ref([]);

const getProductImages = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.VUE_APP_MARUEY}product/partner/product-image/${product.value._id}`,
      {
        headers: {
          token: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log(data);
    if (data.status) {
      images.value = data.data?.sort(
        (a, b) => parseInt(a.description) - parseInt(b.description)
      );
      images.value.forEach((image) => {
        image.preview = `${process.env.VUE_APP_MARUEY}${data.path}${image.path}/product`;
      });
      //console.log(images.value);
    }
  } catch (err) {
    //console.log(err);
  }
};
</script>
