<template>
  <div
    v-if="!pageLoading"
    class="bg-gradient-to-br from-purple-500 to-purple-800 min-h-screen w-full h-full"
  >
    <div class="w-full h-full">
      <!--header-->
      <div class="w-full flex items-center justify-center gap-3 py-8">
        <button
          class="flex items-center justify-center bg-white rounded-full w-10 h-10"
          @click="$router.push('/customer/customerview')"
        >
          <i class="pi pi-chevron-left text-gray-500"></i>
        </button>
        <div>
          <h1 v-if="!shop_id" class="text-white text-xl">
            ร่วมเป็นพาร์ทเนอร์ (PN)
          </h1>
          <div v-else class="text-white">
            <p class="truncate text-lg">{{ partner.name }}</p>
            <p class="text-xs">{{ partner.code }}</p>
          </div>
        </div>
      </div>
      <div
        class="w-full bg-white h-full min-h-[calc(100vh-6.8rem)] rounded-t-3xl px-5 pt-5 pb-28 flex flex-col gap-5"
      >
        <p
          v-if="partner?.status === 4"
          class="text-sm bg-yellow-200 px-2 py-1 rounded-lg"
        >
          <span class="pi pi-exclamation-circle mr-2"></span>กรุณาเพิ่ม
          <span class="underline">รูปภาพร้านค้าและแผนที่ร้านค้า</span>
          เพื่อให้บัญชีร้านค้าของท่านสมบูรณ์
        </p>
        <p
          v-else-if="partner?.status === 5"
          class="text-sm bg-purple-200 px-2 py-1 rounded-lg"
        >
          <span class="pi pi-exclamation-circle mr-2"></span
          >ร้านค้าของคุณอยู่ในระหว่างการตรวจสอบข้อมูล
        </p>
        <div v-if="shop_id" class="flex justify-between">
          <div>
            <p class="text-purple-700 font-bold truncate">{{ partner.name }}</p>
            <Rating v-model="partner.stars" :cancel="false" readonly />
          </div>
          <button
            @click="onEdit = !onEdit"
            v-if="!onEdit"
            class="text-orange-500 border px-2 py-1 border-orange-500 rounded"
          >
            แก้ไข <span class="pi pi-pencil"></span>
          </button>
          <button
            @click="onEdit = !onEdit"
            v-if="onEdit"
            class="text-gray-500 border px-2 py-1 border-gray-500 rounded"
          >
            ยกเลิก <span class="pi pi-times"></span>
          </button>
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-purple-700">ประเภทการลงทะเบียน</p>
          <div class="flex justify-center">
            <button
              :disabled="!onEdit && shop_id"
              @click="partner.business_type = 1"
              class="border border-purple-500 p-5 rounded-l-xl w-1/2"
              :class="{
                'bg-purple-700 text-white': partner.business_type == 1,
              }"
            >
              <span
                class="pi pi-check -translate-x-2"
                v-if="partner.business_type == 1"
              ></span>
              บุคคลธรรมดา
            </button>
            <button
              :disabled="!onEdit && shop_id"
              @click="partner.business_type = 2"
              class="border border-purple-500 p-5 rounded-r-xl w-1/2"
              :class="{
                'bg-purple-700 text-white': partner.business_type == 2,
              }"
            >
              <span
                class="pi pi-check -translate-x-2"
                v-if="partner.business_type == 2"
              ></span>
              นิติบุคคล
            </button>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-purple-700">ข้อมูลพาร์ทเนอร์</p>
          <div class="flex flex-col justify-center" ref="nameInput">
            <label for="partner_name">ชื่อร้านค้า</label>
            <p class="text-gray-500" v-if="!onEdit && shop_id">
              {{ partner.name }}
            </p>
            <InputText
              v-else
              id="partner_name"
              v-model="partner.name"
              class="border focus:ring-1 ring-purple-500"
              :class="invalidForm == 'name' ? 'border-red-500' : ''"
            />
            <span class="text-red-500 text-xs">{{
              invalidForm == "name" ? "กรุณากรอกชื่อร้านค้า" : ""
            }}</span>
          </div>
          <div class="flex flex-col justify-center" ref="phoneInput">
            <label for="partner_phone">เบอร์โทรติดต่อ</label>
            <p class="text-gray-500" v-if="!onEdit && shop_id">
              {{ partner.phone }}
            </p>
            <InputText
              v-else
              id="partner_phone"
              v-model="partner.phone"
              class="border focus:ring-1 ring-purple-500"
              :class="invalidForm == 'phone' ? 'border-red-500' : ''"
              :minlength="10"
              :maxlength="10"
            />
            <span class="text-red-500 text-xs">{{
              invalidForm == "phone" ? "กรุณาตรวจสอบเบอร์โทร" : ""
            }}</span>
          </div>
          <div
            v-if="partner.business_type === 2"
            class="flex flex-col justify-center"
            ref="taxIdInput"
          >
            <label for="partner_tax_id">เลขประจำตัวผู้เสียภาษี</label>
            <p class="text-gray-500" v-if="!onEdit && shop_id">
              {{ partner.tax_id }}
            </p>
            <InputText
              v-else
              id="partner_tax_id"
              v-model="partner.tax_id"
              class="border focus:ring-1 ring-purple-500"
              :class="invalidForm == 'tax_id' ? 'border-red-500' : ''"
            />
            <span class="text-red-500 text-xs">{{
              invalidForm == "tax_id" ? "กรุณากรอกเลขประจำตัวผู้เสียภาษี" : ""
            }}</span>
          </div>
          <div class="flex flex-col justify-center" ref="introducedInput">
            <label for="introduced_id">รหัสผู้แนะนำเปิดร้านค้า</label>
            <p class="text-gray-500" v-if="!onEdit && shop_id">
              {{ introduced_id || "ยังไม่มี" }}
            </p>
            <div v-else class="flex w-full">
              <InputText
                id="introduced_id"
                v-model="introduced_id"
                class="border focus:ring-1 ring-purple-500"
                :class="[
                  invalidForm == 'introduced_id' ? 'border-red-500' : '',
                  introducedChecked ? 'bg-green-200 border-green-500' : '',
                ]"
                :minlength="10"
                :maxlength="10"
                :disabled="introducedChecked"
              />
              <Button
                :loading="loading"
                v-if="!introducedChecked"
                label="ตรวจสอบ"
                @click="checkreferralcode"
                class="bg-purple-700 text-white w-full px-2 hover:bg-purple-500"
              />
              <Button
                v-else
                label="แก้ไข"
                @click="
                  () => {
                    introducedChecked = false;
                    introducedData = {};
                  }
                "
                class="bg-gray-400 text-white w-full px-2 hover:bg-purple-500"
              />
            </div>
            <span v-if="introducedChecked" class="text-green-600 text-xs pt-1"
              ><i class="pi pi-check mr-2"></i>{{ introducedData?.name }}
              {{ introducedData?.last_name }}</span
            >
            <span class="text-red-500 text-xs">{{
              invalidForm == "introduced_id" ? "กรุณาตรวจสอบรหัสผู้แนะนำ" : ""
            }}</span>
          </div>
        </div>
        <div class="gap-2 flex flex-col" ref="addressInput">
          <p class="text-purple-700">ที่อยู่ร้านค้า</p>
          <div
            :class="
              !onEdit && shop_id
                ? 'grid grid-cols-2 gap-y-3'
                : 'flex flex-col gap-2'
            "
          >
            <div class="flex flex-col justify-center">
              <label for="address">ที่อยู่</label>
              <p class="text-gray-500" v-if="!onEdit && shop_id">
                {{ partner.address }}
              </p>
              <InputText
                v-else
                id="address"
                v-model="partner.address"
                class="border focus:ring-1 ring-purple-500"
                :class="invalidForm == 'address' ? 'border-red-500' : ''"
              />
              <span class="text-red-500 text-xs">{{
                invalidForm == "address" ? "กรุณากรอกที่อยู่" : ""
              }}</span>
            </div>
            <div
              class="flex w-full gap-2"
              :class="
                !onEdit && shop_id ? 'justify-start gap-8' : 'justify-between'
              "
            >
              <div class="flex flex-col justify-center" ref="mooInput">
                <label for="moo">หมู่</label>
                <p class="text-gray-500 w-full" v-if="!onEdit && shop_id">
                  {{ partner.moo }}
                </p>
                <InputText
                  v-else
                  id="moo"
                  v-model="partner.moo"
                  class="border focus:ring-1 ring-purple-500 w-full"
                  :class="invalidForm == 'moo' ? 'border-red-500' : ''"
                  :maxlength="30"
                />
                <span class="text-red-500 text-xs">{{
                  invalidForm == "moo" ? "กรุณากรอกหมู่" : ""
                }}</span>
              </div>
              <div class="flex flex-col justify-center">
                <label for="soi">ซอย</label>
                <p class="text-gray-500 w-full" v-if="!onEdit && shop_id">
                  {{ partner.soi }}
                </p>
                <InputText
                  v-else
                  id="soi"
                  v-model="partner.soi"
                  class="border focus:ring-1 ring-purple-500 w-full"
                  :maxlength="30"
                />
              </div>
            </div>
            <div class="flex flex-col justify-center">
              <label for="road">ถนน</label>
              <p class="text-gray-500 w-full" v-if="!onEdit && shop_id">
                {{ partner.road }}
              </p>
              <InputText
                v-else
                id="road"
                v-model="partner.road"
                class="border focus:ring-1 ring-purple-500 w-full"
              />
            </div>
            <div class="flex flex-col justify-center" ref="provinceInput">
              <label for="province">จังหวัด</label>
              <p class="text-gray-500 w-full" v-if="!onEdit && shop_id">
                {{ partner.province }}
              </p>
              <Dropdown
                v-else
                @change="handleSelectedProvince()"
                v-model="selectedProvince"
                :options="provinceList"
                filter
                optionLabel="name_th"
                placeholder="เลือกจังหวัด"
                class="w-full border"
                :class="invalidForm == 'province' ? 'border-red-500' : ''"
              >
                <template #value="slotProps">
                  <div v-if="slotProps.value" class="flex items-center">
                    <div>{{ slotProps.value.name_th }}</div>
                  </div>
                  <span v-else>
                    {{ slotProps.placeholder }}
                  </span>
                </template>
                <template #option="slotProps">
                  <div class="flex items-center">
                    <div>{{ slotProps.option.name_th }}</div>
                  </div>
                </template>
              </Dropdown>
              <span class="text-red-500 text-xs">{{
                invalidForm == "province" ? "กรุณากรอกจังหวัด" : ""
              }}</span>
            </div>
            <div class="flex flex-col justify-center" ref="amphureInput">
              <label for="amphure">อำเภอ/เขต</label>
              <p class="text-gray-500 w-full" v-if="!onEdit && shop_id">
                {{ partner.amphure }}
              </p>
              <Dropdown
                v-else
                @change="handleSelectedAmphure()"
                v-model="selectedAmphure"
                :options="amphureList"
                filter
                optionLabel="name_th"
                placeholder="เลือกอำเภอ/เขต"
                class="w-full border"
                :class="invalidForm == 'amphure' ? 'border-red-500' : ''"
              >
                <template #value="slotProps">
                  <div v-if="slotProps.value" class="flex items-center">
                    <div>{{ slotProps.value.name_th }}</div>
                  </div>
                  <span v-else>
                    {{ slotProps.placeholder }}
                  </span>
                </template>
                <template #option="slotProps">
                  <div class="flex items-center">
                    <div>{{ slotProps.option.name_th }}</div>
                  </div>
                </template>
              </Dropdown>
              <span class="text-red-500 text-xs">{{
                invalidForm == "amphure" ? "กรุณากรอกอำเภอ" : ""
              }}</span>
            </div>
            <div class="flex flex-col justify-center" ref="tambonInput">
              <label for="tambon">ตำบล/แขวง</label>
              <p class="text-gray-500 w-full" v-if="!onEdit && shop_id">
                {{ partner.tambon }}
              </p>
              <Dropdown
                v-else
                @change="handleSelectedTambon()"
                v-model="selectedTambon"
                :options="tambonList"
                filter
                optionLabel="name_th"
                placeholder="เลือกตำบล/แขวง"
                class="w-full border"
                :class="invalidForm == 'tambon' ? 'border-red-500' : ''"
              >
                <template #value="slotProps">
                  <div v-if="slotProps.value" class="flex items-center">
                    <div>{{ slotProps.value.name_th }}</div>
                  </div>
                  <span v-else>
                    {{ slotProps.placeholder }}
                  </span>
                </template>
                <template #option="slotProps">
                  <div class="flex items-center">
                    <div>{{ slotProps.option.name_th }}</div>
                  </div>
                </template>
              </Dropdown>
              <span class="text-red-500 text-xs">{{
                invalidForm == "tambon" ? "กรุณากรอกตำบล" : ""
              }}</span>
            </div>
            <div class="flex flex-col justify-center" ref="zipcodeInput">
              <label for="zipcode">รหัสไปร์ษณีย์</label>
              <p class="text-gray-500 w-full" v-if="!onEdit && shop_id">
                {{ partner.zipcode }}
              </p>
              <InputText
                v-else
                id="zipcode"
                v-model="partner.zipcode"
                class="border focus:ring-1 ring-purple-500 w-full"
                :class="invalidForm == 'zipcode' ? 'border-red-500' : ''"
                :maxlength="5"
              />
              <span class="text-red-500 text-xs">{{
                invalidForm == "zipcode" ? "กรุณากรอกรหัสไปร์ษณีย์" : ""
              }}</span>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <p class="text-purple-700">เวลาเปิด-ปิด</p>
          <div class="flex justify-between" ref="openDaysInput">
            <button
              :disabled="!onEdit"
              :class="[
                'border w-10 rounded-xl',
                partner.open_days?.includes('จ')
                  ? 'bg-purple-700 text-white border-purple-500'
                  : '',
              ]"
              @click="handleSelectedDay('จ')"
            >
              จ.
            </button>
            <button
              :disabled="!onEdit"
              :class="[
                'border w-10 rounded-xl',
                partner.open_days?.includes('อ')
                  ? 'bg-purple-700 text-white border-purple-500'
                  : '',
              ]"
              @click="handleSelectedDay('อ')"
            >
              อ.
            </button>
            <button
              :disabled="!onEdit"
              :class="[
                'border w-10 rounded-xl',
                partner.open_days?.includes('พ')
                  ? 'bg-purple-700 text-white border-purple-500'
                  : '',
              ]"
              @click="handleSelectedDay('พ')"
            >
              พ.
            </button>
            <button
              :disabled="!onEdit"
              :class="[
                'border w-10 rounded-xl',
                partner.open_days?.includes('พฤ')
                  ? 'bg-purple-700 text-white border-purple-500'
                  : '',
              ]"
              @click="handleSelectedDay('พฤ')"
            >
              พฤ.
            </button>
            <button
              :disabled="!onEdit"
              :class="[
                'border w-10 rounded-xl',
                partner.open_days?.includes('ศ')
                  ? 'bg-purple-700 text-white border-purple-500'
                  : '',
              ]"
              @click="handleSelectedDay('ศ')"
            >
              ศ.
            </button>
            <button
              :disabled="!onEdit"
              :class="[
                'border w-10 rounded-xl',
                partner.open_days?.includes('ส')
                  ? 'bg-purple-700 text-white border-purple-500'
                  : '',
              ]"
              @click="handleSelectedDay('ส')"
            >
              ส.
            </button>
            <button
              :disabled="!onEdit"
              :class="[
                'border w-10 rounded-xl',
                partner.open_days?.includes('อา')
                  ? 'bg-purple-700 text-white border-purple-500'
                  : '',
              ]"
              @click="handleSelectedDay('อา')"
            >
              อา.
            </button>
          </div>
          <div class="w-full flex gap-3">
            <input
              :disabled="!onEdit"
              type="checkbox"
              id="open_all_time"
              v-model="partner.open_all_time"
              class="w-4 border-purple-400"
              :value="true"
            />
            <label for="open_all_time">เปิดทั้งวัน</label>
          </div>
          <div class="flex justify-between gap-2 w-full">
            <div class="flex flex-col justify-center relative">
              <label for="open_time">ตั้งแต่</label>
              <Calendar
                :disabled="partner.open_all_time || !onEdit"
                ref="openTime"
                id="open_time"
                v-model="partner.open_time"
                timeOnly
                inputClass="border focus:ring-1 ring-purple-500"
              />
              <p class="text-sm absolute bottom-3 text-gray-400 right-3">น.</p>
            </div>
            <div class="flex flex-col justify-center relative">
              <label for="close_time">ถึง</label>
              <Calendar
                :disabled="partner.open_all_time || !onEdit"
                ref="closeTime"
                id="close_time"
                v-model="partner.close_time"
                timeOnly
                inputClass="border focus:ring-1 ring-purple-500"
              />
              <p class="text-sm absolute bottom-3 text-gray-400 right-3">น.</p>
            </div>
          </div>
        </div>
        <div v-if="!shop_id" class="w-full py-3">
          <button
            type="button"
            class="w-full bg-emerald-700 text-white rounded-xl py-2"
            @click="handleCreateNewShop"
            :disabled="loading"
          >
            <span>บันทึก</span>
            <span v-if="loading" class="pi pi-spin pi-spinner ml-3"></span>
          </button>
        </div>
        <div class="flex flex-col gap-2" v-if="shop_id">
          <div class="flex flex-col justify-center" ref="mapUrlInput">
            <label for="map_url"
              >แผนที่ร้านค้า
              <a
                v-if="onEdit"
                href="https://www.google.com/maps"
                target="_blank"
                class="px-3 underline text-xs text-purple-400"
                >ค้นหาจาก google map</a
              ></label
            >
            <a
              :href="partner.map_url"
              target="_blank"
              class="text-blue-500 underline w-full"
              v-if="!onEdit && shop_id"
            >
              {{ partner.map_url }}
            </a>
            <InputText
              v-else
              id="map_url"
              v-model="partner.map_url"
              class="border focus:ring-1 ring-purple-500 w-full"
              :class="invalidForm == 'map_url' ? 'border-red-500' : ''"
              placeholder="https://maps.app.goo.gl/..."
            />
            <span class="text-red-500 text-xs">{{
              invalidForm == "map_url" ? "กรุณากรอกลิงค์แผนที่" : ""
            }}</span>
          </div>
          <div class="flex-col justify-center hidden">
            <label for="map_iframe" v-if="onEdit"
              >iframe
              <a
                v-if="onEdit"
                href="https://www.google.com/maps"
                target="_blank"
                class="px-3 underline text-xs text-purple-400"
                >รายละเอียดเพิ่มเติม</a
              ></label
            >
            <InputText
              v-if="onEdit"
              id="map_iframe"
              v-model="partner.map_iframe"
              class="border focus:ring-1 ring-purple-500 w-full"
              placeholder="<iframe src=..."
            />
            <div
              v-if="partner.map_iframe"
              class="w-full max-w-md h-48 border overflow-auto"
            >
              <div v-html="partner.map_iframe"></div>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-2 w-full" v-if="shop_id">
          <p class="text-purple-700">
            ภาพถ่ายร้านค้า
            <span v-if="!shopImages.length" class="text-red-500 text-xs"
              >(กรุณาเพิ่มรูปภาพร้านค้า 3-5 รูป)</span
            >
          </p>
          <p v-if="!shopImages.length" class="text-gray-500">
            ยังไม่ได้เพิ่มรูปภาพ
          </p>
          <div class="grid grid-cols-4 w-full flex-wrap gap-x-2 gap-y-0.5">
            <div
              v-for="(shopImage, index) in shopImages"
              :key="index"
              class="relative w-20 h-20 border border-purple-400 rounded"
            >
              <img
                :src="shopImage.preview"
                :alt="shopImage.title"
                class="w-full h-full object-cover rounded"
              />
              <i
                v-if="onEdit"
                @click="handleRemoveImage(index)"
                class="pi pi-times absolute top-0 text-red-500 right-0 cursor-pointer"
              ></i>
            </div>
            <div
              v-if="shopImages.length < 5 && onEdit"
              class="relative w-20 h-20 border border-purple-400 rounded"
            >
              <input
                type="file"
                class="w-full h-full opacity-0"
                @change="handleFileChange"
                accept="image/*"
              />
              <i
                class="pi pi-plus absolute top-1/2 text-purple-400 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60"
              ></i>
            </div>
          </div>
        </div>
        <div v-if="shop_id && onEdit" class="w-full py-3">
          <button
            v-if="!loading"
            type="button"
            class="w-full bg-emerald-700 text-white rounded-xl py-2"
            @click="handleUpdateShop"
          >
            บันทึก
          </button>
          <div
            v-else
            class="w-full bg-emerald-700 text-white rounded-xl py-2 flex items-center justify-center"
          >
            <i class="pi pi-spin pi-spinner"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    v-else
    class="bg-gradient-to-br from-purple-500 to-purple-800 min-h-screen w-full h-full"
  >
    <div
      class="w-full min-h-screen h-full flex flex-col gap-3 justify-center items-center"
    >
      <i class="pi pi-spin pi-spinner text-white text-4xl"></i>
      <p class="text-white">กําลังโหลด...</p>
    </div>
  </div>

  <Dialog
    v-model:visible="visibleTerm"
    modal
    :closable="false"
    header="ข้อกำหนดการร่วมเป็นพาร์ทเนอร์ (PN)"
    :style="{ width: '100%' }"
  >
    <article>
      <p class="text-center font-bold py-4">ร่วมเปิดโลกกว้างสร้างรายได้กับ MDK AFFILIATE MARKETING.</p>
      <p class="indent-8 text-justify w-full break-words">
ข้อกำหนดและเงื่อนไขจัดทำขึ้น ณ บริษัท มารวยด้วยกันจำกัด ระหว่าง บริษัท มารวยด้วยกันจำกัด ทะเบียนบริษัทเลขที่
090555800431 สำนักงานใหญ่ตั้งอยู่ 219/19 หมู่ที่ 12 ตำบลท่าช้าง
อำเภอบางกล่ำ จังหวัด สงขลา 90110 ซึ่งต่อไปในสัญญาฉบับนี้ เรียกว่า
“บริษัทฯ” ฝ่ายหนึ่งกับ {{ me.name }} ซึ่งต่อไปนี้เรียกว่า
“พาร์ทเนอร์” โดย บริษัท มารวยด้วยกันจำกัด
เป็นบริษัทที่ดำเนินการเป็นตัวกลางในการซื้อขายผลิตภัณฑ์
ในการเปิดศูนย์ให้บริการลูกค้าโดยตรง และแอปพลิเคชัน / Platform.
หรือทุกช่องทางของบริษัทฯ</P><br>
<strong>1. คำจำกัดความ</strong>
<p class="indent-8 text-justify">
1.1 ลายมือชื่ออิเล็กทรอนิกส์
หมายถึง ว่าด้วย พระราชบัญญัติว่าด้วยธุรกรรมทางอิเล็กทรอนิกส์ พ.ศ. 2544
ลายมือชื่ออิเล็กทรอนิกส์ หมายถึง อักษร อักขระ ตัวเลข เสียง
หรือสัญลักษณ์อื่นใดที่สร้างขึ้นให้อยู่ในรูปแบบอิเล็กทรอนิกส์ซึ่งนำมาใช้ประกอบกับข้อมูลอิเล็กทรอนิกส์
เพื่อแสดงความสัมพันธ์ระหว่างบุคคลกับข้อมูลอิเล็กทรอนิกส์
โดยมีวัตถุประสงค์เพื่อระบุตัวบุคคลผู้เป็นเจ้าของลายมือชื่ออิเล็กทรอนิกส์ที่เกี่ยวข้องกับข้อมูลอิเล็กทรอนิกส์นั้น
และเพื่อแสดงว่าบุคคลดังกล่าวยอมรับข้อความในข้อมูลอิเล็กทรอนิกส์นั้น 
</p>
<p class="indent-8 text-justify">1.2 บริษัทฯ หมายถึง บริษัท มารวยด้วยกันจำกัด</p>
<p class="indent-8 text-justify">1.3 ผู้ให้บริการ หมายถึง
บริษัทฯ เป็นตัวกลางในการแลกเปลี่ยน สินค้า และบริการทุกประเภทของบริษัทฯ
เพื่อจำหน่ายสินค้าหรือให้บริการรวมถึงการดำเนินการตามแผนการตลาดของบริษัทฯ
ภายใต้ขอบเขตของบริษัท ฯ</p>
<p class="indent-8 text-justify">1.4 ข้อมูลส่วนบุคคล หมายถึง
ข้อมูลเกี่ยวกับบุคคลซึ่งทำให้สามารถระบุตัวบุคคลนั้นได้ไม่ว่าทางตรง
ทางอ้อม
รวมถึงข้อมูลส่วนบุคคลตามกฎหมายเกี่ยวกับการคุ้มครองข้อมูลส่วนบุคคล</p>
<p class="indent-8 text-justify">1.5
ข้อมูลอันเป็นความลับ หมายถึง ข้อมูลส่วนบุคคล หรือข้อมูลทางการค้า
ความลับเชิงพาณิชย์ ข้อมูลที่เป็นความลับหรือทางการค้าเกี่ยวกับบริษัทฯ
และคู่สัญญาของบริษัทฯ </p>
<p class="indent-8 text-justify">1.6 ทรัพย์สินทางปัญญา หมายถึง
สิทธิในทรัพย์สินทางปัญญาทั้งปวงอันรวมถึงแต่ไม่จำกัดเพียง ลิขสิทธิ์
สิทธิบัตร เครื่องหมายทางการค้า เครื่องหมายบริการ ซึ่งทางการค้า
หรือการออกแบบ ระบบงานใดที่เกิดจากการสร้างสรรค์ คิดค้น ออกแบบ</p>
<p class="indent-8 text-justify">1.7
เหตุสุดวิสัย หมายถึง เหตุใดๆ ที่คู่สัญญาไม่อาจป้องกัน
หรือมิได้เกิดจากการกระทำของคู่สัญญานั้น
แม้ว่าจะได้ใช้ความระมัดระวังอันตามสมควรอันพึงคาดหมายได้จากบุคคลในฐานและภาวะเช่นนั้นซึ่งได้แก่
เหตุที่เกิดจากภัยธรรมชาติ เช่น น้ำท่วม ไฟไหม้ แผ่นดินไหว
หรือเกิดจากการใช้อำนาจรัฐ หรือการกระทำโดยบุคคลภายนอก หรือปัจจัยภายนอก
<p class="indent-8 text-justify">1.8 สินค้า หมายถึง สินค้าที่เจ้าของสินค้าทำการผลิต หรือนำเข้า
หรือสินค้าประเภทอื่นๆ ที่เกี่ยวข้องที่มี ณ ปัจจุบัน
หรือจะมีเพิ่มเติมในอนาคต ที่เจ้าของสินค้าฝากให้แก่บริษัทฯ
เพื่อจำหน่ายให้แก่ลูกค้า หรือสินค้าที่ทางบริษัทฯ จัดหาหรือผลิตเอง</p> 
<p class="indent-8 text-justify">1.9
MDK AFFILIATE MARKETTING หมายถึง แอปพลิเคชัน/Platformหลัก ของบริษัทฯ
ในการซื้อขายสินค้า หรือบริการจัดการธุรกรรมซื้อขายผลิตภัณฑ์ต่างๆ
และให้หมายความรวมถึงเว็บไซต์อื่นๆ ของบริษัทฯ ที่จะมีขึ้นในอนาคตด้วย </p>
<p class="indent-8 text-justify">1.10
ทุกช่องทางของบริษัทฯ หมายถึง ช่องทางออนไลน์อื่นใด
ที่อยู่ภายใต้เว็บไซต์ของบริษัทฯ </p>
<p class="indent-8 text-justify">1.11 ลูกค้า หมายถึง บุคคลธรรมดา ร้านค้า
หรือนิติบุคคลทั่วไปที่เป็นสมาชิก
ซื้อสินค้าจากเจ้าของสินค้าในลักษณะซื้อ-ขายเสร็จเด็ดขาดบนหน้าแอปพลิเคชัน/Platform
หรือทุกช่องทางของบริษัทฯ</p> 
<strong>2. การตีความ</strong>
<p>กฎดังต่อไปนี้ให้ใช้บังคับ เว้นแต่บริบทนั้นๆ จะหมายความเป็นอื่น </p>
<p class="indent-8 text-justify">2.1
ชื่อหัวข้อนั้นมีไว้เพื่อความสะดวกเท่านั้น ไม่ได้มีผลต่อการตีความ</p> 
<p class="indent-8 text-justify">2.2
คำใดที่เป็นเอกพจน์ให้หมายความรวมถึงคำที่เป็นพหูพจน์ด้วยและคำใดที่เป็นพหูพจน์ให้หมายความรวมถึงคำที่เป็นเอกพจน์ด้วยเช่นกัน</p>
<p class="indent-8 text-justify">2.3 หากคำหรือวลีใดได้มีการนิยามไว้
ให้รูปไวยากรณ์ของคำหรือวลีนั้นมีความหมายสอดคล้องกับนิยามนั้น</p>
<p class="indent-8 text-justify">2.4
การอ้างถึงข้อใดให้เป็นการอ้างถึงข้อในข้อกำหนดและเงื่อนไขทั่วไปของสัญญาร้านค้า</p>
<p class="indent-8 text-justify">2.5 การอ้างถึงข้อตกลงหรือเอกสารใดๆ เป็นการอ้างถึงข้อตกลง หรือเอกสาร
(รวมถึงภาคผนวก) ที่ได้แก้ไข เพิ่มเติม โอนสิทธิ หรือมีการแทนที่
เว้นแต่จะถูกต้องห้ามโดยสัญญาร้านค้า ข้อตกลงทางการค้าเพิ่มเติม
และ/หรือข้อกำหนดและเงื่อนไขทั่วไปของสัญญาร้านค้าฉบับนี้ </p>
<p class="indent-8 text-justify">2.6 การอ้างถึง
“ลายลักษณ์อักษร” ให้รวมถึงวิธีการใดๆ ที่แสดงหรือทำซ้ำข้อความ รูปภาพ
รูปเขียน หรือสัญลักษณ์ ในรูปแบบที่มองเห็น หรือจับต้องได้ รวมถึงอีเมล์</p>
<p class="indent-8 text-justify">2.7 การอ้างถึงคู่สัญญา ให้รวมถึงผู้สืบสิทธิของคู่สัญญา
ตัวแทนผู้ได้รับอนุญาต และผู้รับช่วงสิทธิที่ได้รับอนุญาต</p>
<p class="indent-8 text-justify">2.8
การอ้างถึงกฎหมายหรือบทบัญญัติของกฎหมายใด ให้รวมถึงที่แก้ไขเพิ่มเติม
การประกาศใช้ใหม่ บทบัญญัติที่เข้ามาแทนที่ และกฎระเบียบ
หรือตราสารใดที่ออกโดยอาศัยอำนาจของกฎหมายนั้น </p>
<p class="indent-8 text-justify">2.9 การระบุสิ่งใดหลัง
“รวมถึง” “ตัวอย่างเช่น” หรือสำนวนอื่นที่คล้ายคลึงกัน
ไม่เป็นการจำกัดให้รวมถึงสิ่งอื่นด้วย </p>
<p class="indent-8 text-justify">2.10
ไม่มีข้อใดในข้อกำหนดและเงื่อนไขทั่วไปของสัญญาร้านค้านี้ และ/หรือสัญญา
จะถูกตีความเป็นโทษแก่คู่สัญญา
เพียงเพราะคู่สัญญาฝ่ายนั้นเป็นผู้เสนอข้อกำหนดและเงื่อนไขทั่วไปนี้
และ/หรือสัญญา หรือส่วนใดส่วนหนึ่ง </p>
<br>
<strong>3.สิทธิและหน้าที่ของบริษัทฯ </strong>
<p class="indent-8 text-justify">3.1
บริษัทฯ
เป็นผู้มีสิทธิแต่เพียงผู้เดียวในการเรียกเก็บราคาสินค้าจากลูกค้าสำหรับคำสั่งซื้อสินค้าแต่ละครั้งผ่านแอปพลิเคชัน/Platform
ของบริษัทฯ
โดยผู้ฝากขายรับทราบและตกลงว่าลูกค้าอาจเลือกชำระราคาสินค้าด้วยเงินสด
บัตรเครดิต บัตรเดบิต โอนเงินผ่านบัญชีธนาคาร บริการผ่านอินเตอร์เน็ต
ชำระเงินออนไลน์หรือวิธีการชำระล่วงหน้าหรือชำระภายหลังวิธีอื่นซึ่งอาจกระทำได้ผ่านแอปพลิเคชัน/Platform
เป็นบริษัทฯ ทั้งนี้ โดยดุลพินิจของบริษัทฯ แต่เพียงผู้เดียว </p>
<p class="indent-8 text-justify">3.2
ในกรณีที่บริษัทฯ
จัดให้มีวิธีการชำระเงินซึ่งอาจอำนวยความสะดวกให้ลูกค้าชำระเงินล่วงหน้าสำหรับราคาสินค้า
หรือสิ่งอื่นใด ผู้ฝากขายรับทราบและยอมรับว่าบริษัทฯ
มีสิทธิที่จะได้รับดอกเบี้ย
และ/หรือผลประโยชน์อื่นใดที่เกิดขึ้นจากการที่ลูกค้าได้ชำระไว้ล่วงหน้านั้น
(หากมี) ตามข้อกำหนดและเงื่อนไขของวิธีการชำระเงินแต่ละวิธีที่บริษัทฯ
จะเป็นผู้กำหนดเป็นครั้งคราวด้วยดุลพินิจของบริษัทฯ แต่เพียงผู้เดียว </p>
<p class="indent-8 text-justify">3.3
บริษัทฯ จะนำส่งเงินให้ผู้ฝากขายเป็นยอดรวมของ (1) ราคาสินค้า
(รวมภาษีมูลค่าเพิ่มที่เรียกเก็บในนามของบริษัทฯ) ที่
Platformได้รับหักค่าบริการบริษัทฯและ/หรือค่าบริการการส่งเสริมการขายบนแอปพลิเคชัน/Platform
ของบริษัทฯ ต้องชำระให้แก่บริษัทฯ (รวมภาษีมูลค่าเพิ่ม) (3)
หักการคืนเงินใดๆ ให้แก่ลูกค้า และหนี้ค้างชำระอื่นๆ
(ยอดที่นำส่งสุดท้ายเรียกว่า “ราคาต้นทุนสินค้า
ส่วนแบ่งทางการตลาดจากสินค้าสุทธิ”) โดยบริษัทฯ
จะนำส่งรายได้จากสินค้าเป็นรายวัน/เดือน/ปี/ไตรมาส หรือ (หากบริษัทฯ
ตัดสินใจเป็นครั้งคราว) บ่อยกว่านั้น ตามข้อตกลงที่ผู้ฝากขายได้ให้ไว้กับ
บริษัทฯ </p>
<p class="indent-8 text-justify">3.4 บริษัทฯ
จะเป็นผู้อำนวยความสะดวกแก่ผู้ฝากขายในการจัดการการให้บริการลูกค้า
การรับข้อร้องเรียนจากลูกค้า
และส่งข้อมูลที่เกี่ยวข้องให้แก่ผู้ฝากขายเพื่อจัดการข้อร้องเรียนจากลูกค้าต่อไป</p>
<p class="indent-8 text-justify">3.5 บริษัทฯ อาจจะทำหน้าที่ตรวสอบ
หรือไม่มีหน้าที่ตรวจสอบและรับผิดชอบในเนื้อหาหรือข้อมูลที่ผู้ฝากขายนำเสนอบนหน้าแอปพลิเคชัน/Platform
ไม่ว่ากรณีใดๆ ก็ได้ </p>
<p class="indent-8 text-justify">3.6 บริษัทฯ จะไม่รับผิดชอบในบรรดาความบกพร่องอย่างใดๆ
อันเกิดขึ้นกับสินค้า ซึ่งรวมถึงแต่ไม่จำกัดเพียงกรณีที่ สินค้าเสียหาย
สินค้าบุบสลาย สินค้ามีหนอนแมลง สินค้าเน่าเสีย หรือสินค้าที่ส่งกลิ่นเหม็น
ทางผู้ฝากขาย/พาร์ทเนอร์จะต้องเป็นผู้รับผิดชอบในส่วนที่เกิดขึ้นทั้งหมด </p>
<br>
<strong>4.
สิทธิและหน้าที่ของผู้ฝากขาย </strong>
<p class="indent-8 text-justify">4.1 ผู้ฝากขาย ตกลงตั้งราคาขายบนแอปพลิเคชัน /
Platform ตามอัตราที่ระบุในสัญญาร้านค้า
(ตามตกลงแต่ต้องไม่น้อยกว่า..........) -บริษัทฯจะทำการหักภาษี ณ ที่จ่าย 3
%ที่เกิดขึ้นจากยอดขายสินค้าและบริการร้านค้า เพื่อนำส่งกรมสรรพกรต่อไป </p>
<p class="indent-8 text-justify">4.2
ผู้ฝากขายจะไม่เรียกเก็บเงินใดๆ
ที่นอกเหนือจากราคาขายสินค้าและบริการบนแอปพลิเคชัน / Platform จากลูกค้า
ซึ่งเป็นการรับผลประโยชน์ส่วนตัว </p>
<p class="indent-8 text-justify">
4.3
ผู้ฝากขายมีหน้าที่ในการนำเสนอข้อมูลต่างๆ ที่จำเป็นบนหน้าแอปพลิเคชัน /
Platformโดยดำเนินการผ่านทางแอปพลิเคชัน / Platform
ร้านค้าซึ่งรวมถึงข้อมูลของร้านค้า เช่น โลโก้ ภาพถ่าย ราคา
และสื่อสิ่งพิมพ์ต่าง ๆ ที่เป็นจริงโดยไม่ผิดหลักข้อบังคับตามกฎหมาย </p>
<p class="indent-8 text-justify">4.4
ผู้ฝากขายรับรองและรับประกันว่า ราคาสินค้าที่ปรากฏบนหน้าแอปพลิเคชัน /
Platform
เป็นราคาที่สอดคล้องกับกฎหมายว่าด้วยการควบคุมราคาสินค้าหรือกฎหมายใดๆ
ที่เกี่ยวข้อง และข้อมูลที่โฆษณาบนแอปพลิเคชัน / Platform
ที่เกี่ยวข้องกับผู้ฝากขาย และ/หรือสินค้า
เป็นข้อมูลที่ถูกต้องและสอดคล้องกับกฎหมายและกฎระเบียบที่เกี่ยวข้องทุกประการ
รวมถึงไม่เป็นการละเมิดสิทธิในทรัพย์สินทางปัญญาใดๆ ของบุคคลภายนอก </p>
<p class="indent-8 text-justify">4.5
ผู้ฝากขายจะไม่จำหน่ายสินค้าผิดกฎหมาย
หรือสินค้าใดที่ไม่ได้รับอนุญาตหรือไม่มีใบอนุญาตให้จำหน่าย หากบริษัทฯ
ตรวจพบหรือได้รับแจ้งจากผู้ใดว่ามีการจัดจำหน่ายสินค้าดังกล่าว
คู่สัญญาทั้งสองฝ่ายตกลงให้บริษัทฯ มีสิทธิในการดำเนินการใดๆ
กับผู้ฝากขายซึ่งรวมถึงการถอดสินค้ารายการนั้นออกจากแอปพลิเคชัน / Platform
รวมถึงการยกเลิกสิทธิในการฝากขายในแอปพลิเคชัน / Platform
โดยไม่มีการเรียกร้องค่าเสียหายอย่างใดๆ ที่เกิดขึ้นต่อบริษัทฯ
อันเนื่องมาจากการจัดจำหน่ายสินค้าดังกล่าว </p>
<p class="indent-8 text-justify">4.5.1 หากมีความเปลี่ยนแปลงใดๆ
เกี่ยวกับใบอนุญาตใดๆ
ที่เกี่ยวข้องกับการประกอบธุรกิจ/ประกอบกิจการของผู้ฝากขาย
ผู้ฝากขายจะแจ้งให้บริษัทฯ ทราบโดยทันที (และไม่ว่ากรณีใด ต้องไม่เกิน 24
ชั่วโมงนับแต่การเปลี่ยนแปลงดังกล่าว) </p>
<p class="indent-8 text-justify">4.5.2
ผู้ฝากขายจะทำให้แน่ใจว่าสินค้ามีคุณภาพสูง การจัดเก็บ การผลิต
และการตระเตรียมเป็นไปตามกฎหมาย
และระเบียบที่เกี่ยวข้องกับความปลอดภัยและกฎระเบียบอื่นที่เกี่ยวข้อง
หากพบว่ามีการฝ่าฝืนกฎหมาย หรือระเบียบดังกล่าวผู้ฝากขายต้องแจ้งให้บริษัทฯ
ทราบทันที </p>
<p class="indent-8 text-justify">4.5.3 ผู้ฝากขายจะทำให้แน่ใจว่าตลอดระยะเวลาที่ทำธุรกิจร่วม
บริษัทฯ มีสิทธิในการตรวจสอบ ค้นหาข้อมูล และพิจารณาสินค้า ตามเห็นชอบของ
บริษัทฯ </p>
<p class="indent-8 text-justify">4.5.4 ผู้ฝากขายมีหน้าที่ต้องรักษาคุณภาพและปริมาณของสินค้า
ให้เป็นไปตามที่ได้โฆษณาอย่างสุดความสามารถ</p>
<p class="indent-8 text-justify">4.5.5 หากภายหลังตรวจพบหรือได้รับการร้องเรียนเกี่ยวกับการละเมิดลิขสิทธิ์
การไม่รักษาคุณภาพ มาตรฐานตามกำหนด บริษัทฯ
มีสิทธิ์บอกเลิกสัญญาทันทีโดยไม่ต้องบอกกล่าวล่วง
และผู้ฝากขายตกลงจะเป็นผู้รับผิดชอบในความเสียหายที่เกิดขึ้นทั้งหมดโดยบริษัทฯ
จะไม่รับผิดชอบความเสียหายที่เกิดขึ้นกับสินค้าทุกกรณี </p>
<br>
<strong>5. การเตรียมสินค้า</strong>
<p class="indent-8 text-justify">ในกรณีทั่วไป ผู้ฝากขาย
จะตกลงเตรียมสินค้าและจัดส่งให้กับลูกค้าถึงแล้วเท่านั้นหรือได้ทำข้อตกลงในการซื้อขายสินค้า
โดยบริษัทฯ ดำเนินการใดๆ
ที่จำเป็นและเป็นที่น่าพอใจในการอำนวยความสะดวกแก่ลูกค้าในการรับสินค้า </p>
<p class="indent-8 text-justify">5.1
ผู้ฝากขายจะรับผิดชอบในค่าใช้จ่ายใดๆ ที่เกี่ยวข้องกับการคืนเงินให้ลูกค้า
ในกรณีที่ลูกค้าร้องขอการคืนเงิน หรือร้องเรียนเกี่ยวกับสินค้า
ไม่ว่าทั้งหมดหรือแต่บางส่วน (รวมถึง แต่ไม่จำกัดอยู่เพียงค่าใช้จ่ายใดๆ
ที่เกี่ยวข้องกับการเรียกคืนสินค้านั้นๆ (หากมี)
ด้วยเหตุผลที่ตามตกลงกันระหว่างบริษัทฯ และลูกค้า </p>
<p class="indent-8 text-justify"></p>5.2
ผู้ฝากขายให้ความยินยอมแก่บริษัทฯ ในการดำเนินการใดๆ
ซึ่งเกี่ยวกับการวางสื่อทางการตลาด การโฆษณาของบริษัทฯ การให้บริการ
และการให้ข้อมูลที่เกี่ยวข้องใดๆ ในแอปพลิเคชัน / Platform
และ/หรือสถานที่อื่นใดของร้านค้า
(ตามรายละเอียดที่จะตกลงร่วมกันโดยคู่สัญญาทั้งสองฝ่าย)
โดยไม่คิดค่าใช้จ่ายใด ๆ </p>
<p class="indent-8 text-justify">5.3
หากลูกค้าตรวจพบเกี่ยวกับความไม่ครบถ้วนถูกต้องตามคำสั่งซื้อ
หรือความบกพร่องของสินค้า
ผู้ฝากขายยินดีที่จะเปลี่ยนสินค้าเป็นสินค้าคุณภาพดีให้กับลูกค้า
โดยผู้ฝากขายยินดีที่จะรับผิดชอบค่าใช้จ่ายที่เกิดขึ้นเกี่ยวกับการเปลี่ยนสินค้า
ซึ่งรวมถึง ราคาสินค้า ค่าจัดเตรียมสินค้า และค่าจัดส่งสินค้า
แต่เพียงผู้เดียว </p>
<br>
<strong>6. การตลาด</strong> 
  <p class="indent-8 text-justify">6.1
คู่สัญญาฝ่ายใดฝ่ายหนึ่งอาจจัดกิจกรรมการตลาดและโฆษณาที่เกี่ยวข้องกับสินค้าตามที่คู่สัญญาทั้งสองฝ่ายจะได้ตกลงร่วมกัน
โดยกิจกรรมดังกล่าวอาจมีขึ้นผ่านช่องทางใดๆ เช่น โซเชียลมีเดีย เว็บไซต์
หรือบล็อค เพื่อขจัดข้อสงสัยบริษัทฯ
อาจจัดการส่งเสริมการขายให้แก่ลูกค้าด้วยค่าใช้จ่ายของบริษัทฯเอง
เพื่อสนับสนุนธุรกิจและบริการของคู่สัญญาทั้งสองฝ่ายตามที่กำหนดไว้ในข้อกำหนดและเงื่อนไขทั่วไปนี้</p>
<p class="indent-8 text-justify">6.2 ผู้ฝากขายตกลงเปิดเผยรายละเอียดโปรโมชั่น
และ/หรือรายการส่งเสริมการขายต่างๆ ให้แก่ บริษัทฯ
(รวมถึงแต่ไม่จำกัดเฉพาะรายการที่ลดราคา รายละเอียดการส่งเสริมการขาย)
เพื่อการทำการตลาดและวัตถุประสงค์ในการส่งเสริมการขายใดๆ ผ่านแอปพลิเคชัน /
Platform </p>
<p class="indent-8 text-justify">6.3 ผู้ฝากขายให้ความยินยอมแก่บริษัทฯ
ในการใช้สิทธิในทรัพย์สินทางปัญญาของบริษัทฯ
และ/หรือที่ผู้ฝากขายมีสิทธิใช้
และผู้ฝากขายดำเนินการด้วยค่าใช้จ่ายของร้านค้าในการจะส่งภาพถ่ายของสินค้าใดๆ
ให้แก่บริษัทฯ ตามที่บริษัทฯ ร้องขอ เพื่อใช้ในแอปพลิเคชัน / Platform </p>
<br>
<strong>7.
ภาษี </strong>
<p class="indent-8 text-justify">
7.1 คู่สัญญาแต่ละฝ่ายจะรับผิดชอบในค่าภาษีใดๆ
ของตนที่เกิดขึ้นจากการเข้าทำและปฏิบัติตามหน้าที่ตามข้อกำหนดและเงื่อนไขของสัญญาร้านค้า
ข้อตกลงทางการค้าเพิ่มเติม
และ/หรือข้อกำหนดและเงื่อนไขทั่วไปของสัญญาบริษัทฯ เว้นแต่ ภาษีมูลค่าเพิ่ม
ภาษีหัก ณ ที่จ่าย ซึ่งให้ผู้ฝากขายเป็นผู้รับผิดชอบ เพื่อให้สิ้นข้อสงสัย
จำนวนของค่าบริการที่พึงชำระให้แก่บริษัทฯ
นั้นจะเป็นจำนวนที่รวมภาษีมูลค่าเพิ่ม ในกรณีที่บริษัทฯ หักภาษี ณ ที่จ่าย
ผู้ฝากขายมีหน้าที่ออกและมอบหนังสือรับรองภาษีหัก ณ ที่จ่ายให้แก่บริษัทฯ
ภายใน 30 (สามสิบ) วัน </p>
<br>
<strong>8.การส่งมอบเงินค่าสินค้า และส่วนแบ่งรายได้ </strong>
<p class="indent-8 text-justify">8.1
ผู้ฝากขายตกลงจ่ายส่วนแบ่งรายได้ในการดำเนินการจำหน่ายสินค้าให้กับบริษัทฯ
ในอัตราตาม ตกลงของราคาจำหน่าย โดยบริษัทฯ จะทำการเก็บ ค่า GP
(ค่าการส่งเสริมการตลาด) อยู่ที่ 20 %
ของยอดขายสินค้าแต่ละรายการรายละเอียดตามเอกสารแนบท้ายสัญญาฉบับนี้
(ค่าบริการแอปฯควรมีหรือไม่)</p> 
<p class="indent-8 text-justify">8.2 บริษัทฯ จะทำการสรุปยอดขายรวมกันทุกๆ
วันโดยระบบจะเป็นผู้คำนวณและออก Report ให้กับผู้ฝากขายในแต่ละวัน
หากไม่มีข้อพิพาท เกิดขึ้น ผู้ฝากขายสามารถแจ้งทำรายการถอนเงินได้</p><br>

<strong>9.การปฏิเสธความรับผิด </strong>
<p class="indent-8 text-justify">9.1 ทางบริษัทฯ ไม่มีความเกี่ยวข้องใดๆ
สำหรับช่องทางการจำหน่ายของผู้ฝากขาย รวมถึงการนำเสนอ
หรือการให้ข้อมูลต่อสาธารณชนเพื่อจำหน่ายหรือประชาสัมพันธ์
อันเป็นการละเมิดต่อข้อบังคับของบริษัทฯ อันที่เกิดขึ้นนอกเหนือ
แอปพลิเคชัน / Platform</p> 
<p class="indent-8 text-justify">9.2 บริษัทฯ เป็นเพียงตัวแทนการชำระเงิน และบริษัทฯ
ไม่ทราบถึงข้อตกลงที่ทำขึ้น หรือสิทธิ ข้อผูกพันใดๆ ระหว่างผู้บริโภค
หรือผู้เรียกเก็บเงิน บริษัทฯ
ไม่ต้องรับผิดชอบสำหรับความเสียหายที่เกิดขึ้นจากการละเมิดข้อตกลงระหว่างผู้บริโภคกับผู้เรียกเก็บเงิน
ผู้ฝากขายขายรับทราบและตกลงว่าเป็นความรับผิดชอบของแต่เพียงผู้เดียว</p>
<p class="indent-8 text-justify">9.3หากความผิดพลาด ล่าช้า ไม่ว่าจะเกิดขึ้นจากระบบคอมพิวเตอร์
ระบบอินเตอร์เน็ต อุปกรณ์อิเล็กทรอนิกส์ต่างๆ ระบบแอปพลิเคชัน / Platform
ของทางบริษัทฯ ระบบขนส่ง หรือระบบอื่นใดที่เกี่ยวข้องกับการให้บริการ
ไม่ว่าจะเกิดเหตุใดๆ
ผู้ฝากขายตกลงจะไม่ยกเอาเหตุขัดข้องดังกล่าวมาเป็นข้อเรียกร้องค่าเสียหายใดๆ
จากบริษัทฯ </p>
<br>
<strong>10.ความลับทางการค้า </strong>
<p class="indent-8 text-justify">ในการเข้าทำสัญญาฉบับนี้
คู่สัญญาแต่ละฝ่ายอาจได้ล่วงรู้หรือได้รับข้อมูลของคู่สัญญาอีกฝ่ายหนึ่ง
ไม่ว่าจากคู่สัญญาอีกฝ่ายหนึ่งนั้นเองหรือจากบุคคลอื่นใด
คู่สัญญาแต่ละฝ่ายต่างตกลงจะเก็บรักษาข้อมูลของคู่สัญญาอีกฝ่ายไว้เป็นความลับ
ไม่ว่าจะเป็นข้อมูลส่วนบุคคลหรือข้อมูลทางการค้า
และไม่ว่าจะมีมูลค่าหรือไม่ก็ตาม และจะไม่เปิดเผย ตีพิมพ์ ประกาศ รับรอง
หรือเผยแพร่ต่อบุคคลที่สาม ไม่ว่า ณ
เวลาใดและไม่ว่าสัญญาฉบับนี้จะสิ้นสุดลงแล้วหรือไม่ก็ตาม</p> 
<br>
<strong>11.การโอนสิทธิ</strong>
<p class="indent-8 text-justify">เว้นแต่จะได้กำหนดไว้เป็นอย่างอื่นในสัญญานี้
คู่สัญญาแต่ละฝ่ายจะไม่โอนสิทธิ หน้าที่
และความรับผิดชอบตามสัญญาฉบับนี้ให้แก่บุคคลใดโดยมิได้รับความยินยอมเป็นลายลักษณ์อักษรจากคู่สัญญาอีกฝ่ายเป็นการล่วงหน้า
ไม่ว่ากรณีใดๆ
ผู้ฝากขายตกลงจะไม่โอนสิทธิและหน้าที่ตามสัญญาฉบับนี้ไม่ว่าทั้งหมดหรือบางส่วน
ให้แก่บุคคลที่สาม</p> 

<strong>12.โมฆะกรรมแยกส่วน </strong>
<p class="indent-8 text-justify">หากมีข้อความ
หรือข้อตกลงใดในสัญญาฉบับนี้ตกเป็นโมฆะ ไม่สมบูรณ์ หรือไม่มีผลบังคับใช้
ไม่ว่าด้วยเหตุใดๆ ก็ตาม คู่สัญญาตกลงให้ข้อความ และข้อตกลงอื่นๆ
ในสัญญาฉบับนี้ยังคงมีผลสมบูรณ์
ผูกพันธ์คู่สัญญาเสมือนหนึ่งว่าไม่มีส่วนที่เป็นโมฆะ ไม่สมบูรณ์
หรือส่วนที่ไม่มีผลบังคับใช้อยู่ในสัญญาฉบับนี้</p> 

<strong>13.การแก้ไข เปลี่ยนแปลง
ปรับปรุง ระบบทุกรูปแบบ</strong> 
<p class="indent-8 text-justify">13.1 บริษัทฯ มีสิทธิ์อนุมัติ เปลี่ยนแปลง แก้ไข
ยกเลิก ระบบบริหารจัดการ/โปรแกรมออนไลน์
ระบบบัญชีผู้บริหารงานจัดการออนไลน์ และระบบบริหารจัดการศูนย์ทุกรูปแบบ
โดยไม่จำเป็นต้องแจ้งให้ผู้ฝากขายทราบล่วงหน้า
และการที่ผู้ฝากขายได้ใช้งานระบบได้ทำการแก้ไขเรียบร้อยแล้วนั้น
ถือเป็นการยอมรับการแก้ไขในครั้งนั้นแล้ว หากเว้นแต่บริษัทฯ
ได้ตกลงอันนอกเหนือสัญญากับผู้ฝากขาย อื่นไป</p> 
<p class="indent-8 text-justify">13.2 บริษัทฯ
ขอสงวนสิทธิ์ในการปรับปรุง หรือยกเลิกบริการ หรือส่วนใดส่วนหนึ่งของบริการ
ไม่ว่าจะชั่วคราวหรือตลอดไปได้ตลอดเวลา
โดยบริษัทฯจะแจ้งล่วงหน้าให้ทราบหรือไม่ก็ได้แต่ทั้งนี้ การยกเลิก
หรือการระงับบริการ หรือส่วนใดส่วนหนึ่งของบริษัทฯ
ย่อมไม่กระทบถึงหนี้ใดๆที่ผู้ฝากขายยังคงค้างชำระอยู่กับบริษัทฯ
รวมทั้งไม่เป็นการลบล้างสิทธิ์หรือความรับผิดใดๆ ที่บริษัทฯ
และผู้ฝากขายมีอยู่หรือได้เกิดขึ้นก่อนวันที่มีผลของการยกเลิก
หรือการระงับบริการ หรือส่วนหนึ่งส่วนใดของบริการดังกล่าว</p><br>
<strong>14.การยกเลิกสัญญา </strong>

<p class="indent-8 text-justify">14.1 หากคู่สัญญาฝ่ายหนึ่งฝ่ายใดประสงค์จะบอกเลิกสัญญา
จะต้องทำเป็นหนังสือแจ้งความประสงค์ล่วงหน้าแก่คู่สัญญาอีกฝ่ายหนึ่งไม่น้อยกว่า
30 วัน
โดยฝ่ายที่ถูกกระทำละเมิดมีสิทธิเรียกร้องค่าใช้จ่ายหรือค่าเสียหายได้ </p>
<p class="indent-8 text-justify">14.2
สัญญาฉบับนี้ถูกยกเลิกหรือผู้ฝากขายกระทำความผิดตามสัญญาข้อหนึ่งข้อใด
บริษัทฯ มีสิทธิ์บอกเลิกสัญญาทันที
และผู้ฝากขายตกลงจะเป็นผู้รับผิดชอบในความเสียหายที่เกิดขึ้นทั้งหมดโดยบริษัทฯ
จะไม่รับผิดชอบความเสียหายที่เกิดขึ้นกับสินค้าทุกกรณี</p>
<br>
<strong>15.การแก้ไขเพิ่มเติม</strong> 
<p class="indent-8 text-justify">บริษัทฯ
ขอสงวนสิทธิ์ในการแก้ไขเพิ่มเติมข้อกำหนดและเงื่อนไขเหล่านี้ ณ เวลาใดก็ได้
ข้อแก้ไขเพิ่มเติมต่อเงื่อนไขเหล่านี้จะประกาศไว้ในแอปพลิเคชัน / Platform
ของบริษัทฯ อย่างไรก็ตาม
การใช้บริการกับบริษัทฯต่อไปจะถือว่าเป็นการยอมรับเงื่อนไขใหม่
เมื่อผู้ฝากขายใช้บริการกับแพลตฟอร์มของบริษัทฯ บริษัทฯ
ตกลงว่าผู้ฝากขายกระทำการดังกล่าวภายใต้เงื่อนไขเหล่านี้ที่เป็นปัจจุบันขณะนั้น
ณ วันที่ผู้ฝากขายใช้บริการ</p> 
<strong>16.กฎหมายที่บังคับใช้ </strong>
<p class="indent-8 text-justify">ทั้งนี้
ในกรณีที่ไม่สามารถหาข้อยุติในข้อพิพาทดังกล่าวระหว่างคู่สัญญาทั้งสองฝ่ายได้
ข้อพิพาท ข้อโต้เถียง ข้อขัดแย้งใดๆ อันเนื่องมาจากสัญญาฉบับนี้
หากคู่สัญญาไม่สามารถตกลงกันได้
คู่สัญญาตกลงจะนำข้อพิพาทดังกล่าวขึ้นฟ้องต่อศาลในประเทศไทย
สัญญาฉบับนี้ทำขึ้นสองฉบับมีข้อความถูกต้องตรงกัน
คู่สัญญาแต่ละฝ่ายได้อ่านโดยตลอดแล้วยืนยันว่าถูกต้องตามเจตนา
จึงได้ลงลายมือชื่อไว้เป็นสำคัญต่อหน้าพยาน และแต่ละฝ่ายยึดถือไว้หนึ่งฉบับ
หมายเหตุ : การเข้าสู่ระบบโดยใช้ชื่อผู้ใช้ ( username ) และรหัสผ่าน (
password ) เข้าสู่ระบบและ มีการยอมรับเงื่อนไขและข้อตกลงในระบบ
ถือว่าสัญญาฉบับนี้สมบูรณ์แบบ
      </p>
      
    </article>
    <div class="flex justify-end w-full sticky bottom-5 right-5">
      <button @click="scrollToSection" class="bg-black/80 text-white rounded-full px-2 py-2 flex items-center justify-center">
        <i class="pi pi-arrow-down"></i>
      </button>
    </div>
    <div ref="targetSection" class="my-5 w-full py-5 border-t border-dashed flex flex-col gap-3">
      <div class="flex gap-3 items-center">
        <Checkbox
          v-model="checkedTerm"
          :binary="true"
          class="border-2 rounded-lg h-6 w-6 flex items-center justify-center"
          :class="[checkedTerm ? 'border-green-500' : '']"
        />
        <label for="checkedTerm">ยอมรับเงื่อนไขและข้อตกลง</label>
      </div>
      <Button
        :disabled="!checkedTerm"
        label="ยืนยัน"
        @click="visibleTerm = false"
        class="px-2 py-1 w-full"
        :class="[
          checkedTerm ? 'bg-purple-500 text-white ' : 'bg-gray-500 text-white',
        ]"
      />
      <Button
        label="ยกเลิก"
        @click="$router.push('/customer/customerview')"
        class="text-gray-500 px-2 py-1 w-full"
      />
    </div>
  </Dialog>
</template>

<script setup>
import Swal from "sweetalert2";
import { ref, onMounted, watch, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { useStore } from "vuex";

onMounted(async () => {
  pageLoading.value = true;
  if (openTime.value) {
    openTime.value.currentHour = 8;
    openTime.value.currentMinute = 0;
  }
  if (closeTime.value) {
    closeTime.value.currentHour = 22;
    closeTime.value.currentMinute = 0;
  }
  await Promise.all([
    getProvinceList(),
    getAmphureList(),
    getTambonList(),
    getMe(),
  ]);
  if (query.introduced_id && !shop_id.value) {
    introduced_id.value = query.introduced_id;
  } else if (!query.introduced_id && !shop_id.value) {
    introduced_id.value = me.value.introduce_id;
  }
  if (query.shop_id) {
    shop_id.value = query.shop_id;
    onEdit.value = false;
    await getShop();
  }
  if (!shop_id.value && partner.value) {
    partner.value.business_type = 1;
    partner.value.open_days = ["จ", "อ", "พ", "พฤ", "ศ", "ส"];
    partner.value.open_time = "08:00";
    partner.value.close_time = "22:00";
    partner.value.stars = 0;
    visibleTerm.value = true;
  }
  pageLoading.value = false;
});

const checkedTerm = ref(false);
const visibleTerm = ref(false);
const pageLoading = ref(false);
const onEdit = ref(true);
const route = useRoute();
const query = route.query;
const loading = ref(false);
const openTime = ref(null);
const closeTime = ref(null);
const partner = ref({});
const shop_id = ref(null);
const store = useStore();
const introduced_id = ref(null);
const router = useRouter();

const me = ref({});
const getMe = () => {
  me.value = { ...store.getters.me };
};

watch(
  () => partner.value.open_all_time,
  () => {
    if (partner.value.open_all_time) {
      partner.value.open_time = "00:00";
      partner.value.close_time = "00:00";
    } else {
      partner.value.open_time = "08:00";
      partner.value.close_time = "22:00";
    }
  }
);

const invalidForm = ref("");
const nameInput = ref(null);
const phoneInput = ref(null);
const taxIdInput = ref(null);
const addressInput = ref(null);
const mooInput = ref(null);
const provinceInput = ref(null);
const amphureInput = ref(null);
const tambonInput = ref(null);
const zipcodeInput = ref(null);
const mapUrlInput = ref(null);
const openDaysInput = ref(null);
const openTimeInput = ref(null);

const targetSection = ref(null);

const scrollToSection = () => {
  const section = targetSection.value;
  section.scrollIntoView({ behavior: 'smooth' });
}

const validationCheck = async () => {
  const scrollToInput = async (inputRef) => {
    await nextTick();
    if (inputRef?.value) {
      inputRef.value.$el?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  if (!partner.value.name) {
    Swal.fire({
      icon: "error",
      title: "กรุณากรอกชื่อร้านค้า",
    });
    invalidForm.value = "name";
    await scrollToInput(nameInput);
    return false;
  }

  if (!partner.value.phone) {
    Swal.fire({
      icon: "error",
      title: "กรุณากรอกเบอร์โทรติดต่อ",
    });
    invalidForm.value = "phone";
    await scrollToInput(phoneInput);
    return false;
  }

  if (partner.value.phone?.length < 10) {
    Swal.fire({
      icon: "error",
      title: "กรุณาตรวจสอบเบอร์โทรติดต่อให้ถูกต้อง",
    });
    invalidForm.value = "phone";
    await scrollToInput(phoneInput);
    return false;
  }

  if (!partner.value.tax_id && partner.value.business_type === 2) {
    Swal.fire({
      icon: "error",
      title: "กรุณากรอกเลขประจําตัวผู้เสียภาษี",
    });
    invalidForm.value = "tax_id";
    await scrollToInput(taxIdInput);
    return false;
  }

  if (!partner.value.address) {
    Swal.fire({
      icon: "error",
      title: "กรุณากรอกที่อยู่ร้านค้า",
    });
    invalidForm.value = "address";
    await scrollToInput(addressInput);
    return false;
  }

  if (!partner.value.moo) {
    Swal.fire({
      icon: "error",
      title: "กรุณากรอกหมู่",
    });
    invalidForm.value = "moo";
    await scrollToInput(mooInput);
    return false;
  }

  if (!partner.value.province) {
    Swal.fire({
      icon: "error",
      title: "กรุณากรอกจังหวัด",
    });
    invalidForm.value = "province";
    await scrollToInput(provinceInput);
    return false;
  }

  if (!partner.value.amphure) {
    Swal.fire({
      icon: "error",
      title: "กรุณากรอกอำเภอ/เขต",
    });
    invalidForm.value = "amphure";
    await scrollToInput(amphureInput);
    return false;
  }

  if (!partner.value.tambon) {
    Swal.fire({
      icon: "error",
      title: "กรุณากรอกตำบล/แขวง",
    });
    invalidForm.value = "tambon";
    await scrollToInput(tambonInput);
    return false;
  }

  if (!partner.value.zipcode) {
    Swal.fire({
      icon: "error",
      title: "กรุณากรอกรหัสไปรษณีย์",
    });
    invalidForm.value = "zipcode";
    await scrollToInput(zipcodeInput);
    return false;
  }

  if (partner.value.open_days?.length === 0) {
    Swal.fire({
      icon: "error",
      title: "กรุณาเพิ่มวันเปิด-ปิดร้านค้า",
    });
    invalidForm.value = "open_days";
    await scrollToInput(openDaysInput);
    return false;
  }

  if (!partner.value.open_time || !partner.value.close_time) {
    Swal.fire({
      icon: "error",
      title: "กรุณาเวลาเปิด-ปิดร้านค้า",
    });
    invalidForm.value = "open_time";
    await scrollToInput(openTimeInput);
    return false;
  }

  return true;
};

const getShop = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.VUE_APP_MARUEY}partner/${shop_id.value}`
    );
    //console.log(data);
    if (data.status) {
      partner.value = { ...data.data };
      partner.value.business_type =
        data.data.business_type === "บุคคลธรรมดา" ? 1 : 2;
      introduced_id.value = data.data.introduced_id
        ? data.data.introduced_id
        : me.value.introduce_id;
      getShopImages();
    }
  } catch (err) {
    //console.log(err);
  }
};

const introducedChecked = ref(false);
const introducedData = ref({});
const checkreferralcode = async () => {
  if (introduced_id.value === me.value.user_name) {
    Swal.fire({
      icon: "error",
      title: "กรุณาตรวจสอบรหัสผู้แนะนำ",
      //text: "กรุณาตรวจสอบรหัสผู้แนะนำ",
      showConfirmButton: false,
      timer: 1500,
    });
    introducedChecked.value = false;
    introducedData.value = {};
    return false;
  }
  loading.value = true;
  await axios
    .get(`${process.env.VUE_APP_MARUEY}check-user/${introduced_id.value}`)
    .then((res) => {
      //console.log(res.data?.data?.length)
      if (res.data.status && res.data?.data?.length) {
        introducedChecked.value = true;
        introducedData.value = res.data.data[0];
        return true;
      } else {
        Swal.fire({
          icon: "error",
          title: "กรุณาตรวจสอบรหัสผู้แนะนำ",
          //text: "กรุณาตรวจสอบรหัสผู้แนะนำ",
          showConfirmButton: false,
          timer: 1500,
        });
        introducedChecked.value = false;
        introducedData.value = {};
      }
    })
    .catch(() => {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "กรุณาลองใหม่อีกครั้ง",
        showConfirmButton: false,
        timer: 1500,
      });
      loading.value = false;
      return false;
    });
  loading.value = false;
};

const provinceList = ref([]);
const getProvinceList = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.VUE_APP_MLM}/dataset_changwat`
    );
    provinceList.value = data.data || [];
  } catch (err) {
    console.log(err);
  }
};

const amphureList = ref([]);
const getAmphureList = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.VUE_APP_MLM}/dataset_amphuress`
    );
    amphureList.value = data.data || [];
  } catch (err) {
    console.log(err);
  }
};

const tambonList = ref([]);
const getTambonList = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.VUE_APP_MLM}/dataset_tambon`
    );
    tambonList.value = data.data || [];
  } catch (err) {
    console.log(err);
  }
};

const selectedProvince = ref(null);
const handleSelectedProvince = () => {
  partner.value.province = selectedProvince.value.name_th;
  amphureList.value = amphureList.value.filter(
    (x) =>
      x.changwat_id + "" === selectedProvince.value.id + "" && x.status === 0
  );
};

const selectedAmphure = ref(null);
const handleSelectedAmphure = () => {
  partner.value.amphure = selectedAmphure.value.name_th;
  tambonList.value = tambonList.value.filter(
    (x) => x.amphure_id + "" === selectedAmphure.value.id + "" && x.status === 0
  );
};

const selectedTambon = ref(null);
const handleSelectedTambon = () => {
  partner.value.tambon = selectedTambon.value.name_th;
  partner.value.zipcode = selectedTambon.value.zip_code;
};

const handleSelectedDay = (day) => {
  if (partner.value.open_days.includes(day)) {
    partner.value.open_days = partner.value.open_days.filter(
      (item) => item != day
    );
  } else {
    partner.value.open_days.push(day);
  }
};

const shopImages = ref([]);

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      shopImages.value.push({
        title: "shopPicture",
        file: file,
        preview: e.target.result,
        description: "รูปภาพร้านค้า " + (shopImages.value.length + 1),
        shop_id: shop_id,
      });
    };
    reader.readAsDataURL(file);
  }
};

const handleUploadShopImages = async () => {
  const uploadedList = await Promise.all(
    shopImages.value
      ?.filter((x) => x.file)
      ?.map(async (image) => uploadShopImage(image))
  );
  //console.log(uploadedList)
  if (
    uploadedList?.length === shopImages.value?.filter((x) => x.file)?.length
  ) {
    Swal.fire({
      icon: "success",
      title: "บันทึกข้อมูลสําเร็จ",
      showConfirmButton: false,
      timer: 1500,
    });

    if (
      partner.value.map_url &&
      partner.value.map_url?.trim() !== "" &&
      partner.value.status === 4
    ) {
      await updatePartnerStatus();
    }
  }
};

const updatePartnerStatus = async () => {
  try {
    const { data } = await axios.put(
      `${process.env.VUE_APP_MARUEY}partner/${shop_id.value}`,
      { status: 5 },
      {
        headers: {
          token: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    if (data.status) {
      window.location.reload();
    }
  } catch (err) {
    //console.log(err)
  }
};

const uploadShopImage = async (image) => {
  loading.value = true;
  const formData = new FormData();
  formData.append("file", image.file);
  formData.append("title", image.title);
  formData.append("description", image.description);
  formData.append("shop_id", image.shop_id);
  try {
    const { data } = await axios.post(
      `${process.env.VUE_APP_MARUEY}partner/shop-image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("token"),
        },
      }
    );
    //console.log(data)
    return true;
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "เกิดข้อผิดพลาด",
      text: "กรุณาลองใหม่อีกครั้ง",
      showConfirmButton: false,
      timer: 1500,
    });
    console.log(err);
    return false;
  } finally {
    loading.value = false;
  }
};

const handleRemoveImage = (index) => {
  shopImages.value.splice(index, 1);
};

const handleCreateNewShop = async () => {
  const valid = await validationCheck();
  if (!valid) {
    return;
  }
  loading.value = true;
  const payload = {
    business_type:
      partner.value.business_type === 1 ? "บุคคลธรรมดา" : "นิติบุคคล",
    customer_id: me.value.id,
    customer_username: me.value.user_name,
    name: partner.value.name,
    tax_id: partner.value.tax_id,
    address: partner.value.address,
    moo: partner.value.moo,
    soi: partner.value.soi,
    road: partner.value.road,
    tambon: partner.value.tambon,
    amphure: partner.value.amphure,
    province: partner.value.province,
    zipcode: partner.value.zipcode,
    phone: partner.value.phone,
    map_url: partner.value.map_url,
    map_iframe: partner.value.map_iframe,
    map_lat: partner.value.map_lat,
    map_lon: partner.value.map_lon,
    open_days: partner.value.open_days,
    open_time: partner.value.open_time,
    close_time: partner.value.close_time,
    description: partner.value.description,
    introduced_id: introduced_id.value,
  };
  try {
    const { data } = await axios.post(
      `${process.env.VUE_APP_MARUEY}partner`,
      payload,
      {
        headers: {
          token: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    if (data.status) {
      shop_id.value = data.data._id;
      Swal.fire({
        icon: "success",
        title: "สร้างร้านค้าเรียบร้อย",
        text: "สร้างร้านค้าเรียบร้อยแล้ว",
        showConfirmButton: false,
        timer: 1500,
      });
      onEdit.value = false;
      router.push(
        `/partner/register/success?shop_id=${data.data._id}&shop_name=${data.data.name}`
      );
    }
  } catch (err) {
    console.log(err);
    Swal.fire({
      icon: "error",
      title: "เกิดข้อผิดพลาด",
      text: "สร้างร้านค้าเล้มเหลว",
      showConfirmButton: false,
      timer: 1500,
    });
  } finally {
    loading.value = false;
  }
};

const getShopImages = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.VUE_APP_MARUEY}partner/shop/shop-image/${shop_id.value}`
    );
    if (data.status) {
      shopImages.value = data.data;
      shopImages.value.forEach((image) => {
        image.preview = `${process.env.VUE_APP_MARUEY}${data.path}${image.path}`;
      });
      console.log(shopImages.value);
    }
  } catch (err) {
    console.log(err);
  }
};

const handleUpdateShop = async () => {
  const valid = await validationCheck();
  if (!valid) {
    return;
  }
  /* const checked = await checkreferralcode()
  if (!checked) {
    return
  } */
  loading.value = true;
  const payload = {
    //business_type:
    //partner.value.business_type === 1 ? "บุคคลธรรมดา" : "นิติบุคคล",
    //customer_id: me.value.id,
    //customer_username: me.value.user_name,
    name: partner.value.name,
    tax_id: partner.value.tax_id,
    address: partner.value.address,
    moo: partner.value.moo,
    soi: partner.value.soi,
    road: partner.value.road,
    tambon: partner.value.tambon,
    amphure: partner.value.amphure,
    province: partner.value.province,
    zipcode: partner.value.zipcode,
    phone: partner.value.phone,
    map_url: partner.value.map_url,
    map_iframe: partner.value.map_iframe,
    map_lat: partner.value.map_lat,
    map_lon: partner.value.map_lon,
    open_days: partner.value.open_days,
    open_time: partner.value.open_time,
    close_time: partner.value.close_time,
    description: partner.value.description,
    introduced_id: introduced_id.value,
  };
  try {
    const { data } = await axios.put(
      `${process.env.VUE_APP_MARUEY}partner/${shop_id.value}`,
      payload,
      {
        headers: {
          token: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    if (data.status) {
      //shop_id.value = data.data._id;
      Swal.fire({
        icon: "success",
        title: "สำเร็จ",
        text: "อัพเดทร้านค้าเรียบร้อยแล้ว",
        showConfirmButton: false,
        timer: 1500,
      });
      await handleUploadShopImages();
      router.push(`/partner/register?shop_id=${shop_id.value}`);
    }
  } catch (err) {
    console.log(err);
    Swal.fire({
      icon: "error",
      title: "เกิดข้อผิดพลาด",
      text: "อัพเดทร้านค้าเล้มเหลว",
      showConfirmButton: false,
      timer: 1500,
    });
  } finally {
    loading.value = false;
  }
};
</script>
