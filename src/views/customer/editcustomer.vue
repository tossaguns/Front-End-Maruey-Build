<template>
  <!--<div v-if="isLoading" class="overlay">
        <div class="loader"></div>
    </div>-->
  <div class="h-full bg-[#f7f7f7]">
    <div class="h-full mx-2 md:mb-0">
      <div class="lg:w-4/6 mb-20 mx-4 md:mx-auto py-3">
        <div class="bg-[#fff]">
          <div
            class="text-[#8B2FC9] text-center py-3 font-medium text-xl flex justify-center gap-3 border-b-4 border-[#8B2FC9]"
          >
            ข้อมูลของฉัน
            <button
              v-if="!onEdit"
              type="button"
              @click="onEdit = true"
              class="shadow text-sm py-1 px-2 rounded bg-orange-400 text-white"
            >
              <span class="pi pi-pencil text-sm mr-1"></span>แก้ไขข้อมูล
            </button>
            <button
              v-if="onEdit"
              type="button"
              @click="onEdit = false"
              class="shadow text-sm py-1 px-2 rounded bg-gray-400 text-gray-600"
            >
              <span class="pi pi-times text-sm mr-1"></span>ยกเลิก
            </button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 py-4 px-4">
            <div class="col-span-full">
              <label class="block text-sm font-medium text-gray-700"
                >username :</label
              >
              <input
                v-model="from.user_name"
                type="text"
                class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
                placeholder="กรุณากรอกชื่อผู้ใช้"
                disabled
              />
            </div>
            <div class="hidden">
              <label class="block text-sm font-medium text-gray-700"
                >email :</label
              >
              <input
                :disabled="!onEdit"
                v-model="from.email"
                type="text"
                :class="onEdit ? 'border-purple-500 bg-purple-50 focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]' : ''"
                class="mt-1 p-2 w-full border rounded-md focus:outline-none"
                placeholder="กรุณากรอกอีเมล์"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >เบอร์โทรศัพท์ :</label
              >
              <input
                disabled
                v-model="from.phone"
                type="text"
                class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
                placeholder="กรุณากรอกเบอร์โทรศัพท์"
              />
            </div>
            <div class="col-span-full" :class="from?.qualification_id === 'MC' ? 'hidden' : ''">
              <label class="block text-sm font-medium text-gray-700"
                >รหัสผู้แนะนำ :</label
              >
              <input
                v-model="from.introduce_id"
                type="text"
                class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
                placeholder="กรุณากรอกรหัสผู้แนะนำ"
                disabled
              />
            </div>
            <!-- แชร์ลิงค์ ส่งลิงค์สมัครสมาชิกให้เพื่อน  -->
            <div class="col-span-full hidden">
              <label class="block text-sm font-medium text-gray-700"
                >แชร์ลิงค์สมัครสมาชิก :</label
              >
              <div class="flex w-full justify-center items-center">
                <div class="w-2/5 md:w-3/5 lg:w-4/5">
                  <input
                    v-model="from.linkregistercode"
                    type="text"
                    class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
                    placeholder="กรุณากรอกรหัสผู้แนะนำ"
                    disabled
                  />
                </div>
                <div class="w-3/5 md:w-2/5 lg:w-1/5 text-sm">
                  <button
                    @click="copylink()"
                    class="bg-[#8B2FC9] text-white mt-1 p-2 rounded ml-2 w-full"
                  >
                    คัดลอกลิงค์สมัครสมาชิก
                  </button>
                </div>
              </div>
            </div>

            <div class="hidden">
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >คำนำหน้า :</label
              >
              <Dropdown
                v-model="from.prefix"
                :options="optionprefix"
                optionLabel="label"
                optionValue="value"
                placeholder="กรุณาเลือกคำนำหน้า"
                class="border border-gray-300 p-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600"
              >
              </Dropdown>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >ชื่อทางธุรกิจ :</label
              >
              <input
                :disabled="!onEdit"
                v-model="from.business_name"
                type="text"
                :class="onEdit ? 'border-purple-500 bg-purple-50 focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]' : ''"
                class="mt-1 p-2 w-full border rounded-md focus:outline-none"
                placeholder="กรุณากรอกชื่อทางธุรกิจ"
              />
            </div>
            <div class="mt-3 w-full">
              <button
                :disabled="!onEdit"
                :class="!onEdit ? 'hidden' : ''"
                @click="updateProfile"
                type="button"
                class="w-full py-1 text-center bg-purple-500 text-white rounded"
              >
                บันทึก
              </button>
            </div>
            <div class="hidden">
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >เพศ :</label
              >
              <Dropdown
                v-model="from.sex"
                :options="optionsex"
                optionLabel="name"
                optionValue="name"
                placeholder="กรุณาเลือกเพศ"
                class="border border-gray-300 p-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600"
              >
              </Dropdown>
            </div>
            <div class="hidden">
              <label class="block text-sm font-medium text-gray-700"
                >วันเดือนปีเกิด :</label
              >
              <input
                v-model="from.birthday"
                type="date"
                class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
              />
            </div>
            <div class="hidden">
              <label class="block text-sm font-medium text-gray-700"
                >สัญชาติ :</label
              >
              <input
                v-model="from.nationality"
                type="text"
                class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
                placeholder="กรุณากรอกสัญชาติ"
              />
            </div>
            <div class="hidden">
              <label class="block text-sm font-medium text-gray-700"
                >เลขบัตรประชาชน :</label
              >
              <input
                v-model="from.idcard"
                type="text"
                class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
                placeholder="กรุณากรอกเลขบัตรประชาชน"
              />
            </div>
            <div class="hidden">
              <label class="block text-sm font-medium text-gray-700"
                >เฟสบุ๊ค :</label
              >
              <input
                v-model="from.facebook"
                type="text"
                class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
                placeholder="กรุณากรอกเฟสบุ๊ค"
              />
            </div>
            <div class="hidden">
              <label class="block text-sm font-medium text-gray-700"
                >ไลน์ไอดี :</label
              >
              <input
                v-model="from.line_id"
                type="text"
                class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
                placeholder="กรุณากรอกไลน์ไอดี"
              />
            </div>
          </div>
        </div>

        <div class="bg-[#fff] mt-5 hidden">
          <div
            class="text-[#8B2FC9] text-center py-3 font-medium text-xl border-b-4 border-[#8B2FC9]"
          >
            ข้อมูลบัญชีธนาคาร
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 p-4">
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >ชื่อบัญชี :</label
              >
              <input
                v-model="from.bankaccountname"
                type="text"
                class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
                placeholder="กรุณากรอกชื่อบัญชี"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >เลขบัญชี :</label
              >
              <input
                v-model="from.bankaccountnumber"
                type="text"
                class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
                placeholder="กรุณากรอกเลขบัญชี"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >ชื่อธนาคาร :</label
              >
              <Dropdown
                v-model="from.bankname"
                :options="optionbank"
                optionLabel="name"
                optionValue="name"
                placeholder="กรุณาเลือกธนาคาร"
                filter
                class="border border-gray-300 p-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >สาขา :</label
              >
              <input
                v-model="from.bankbranch"
                type="text"
                class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
                placeholder="กรุณากรอกสาขา"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >รูปภาพบัญชี :</label
              >
              <span>
                <Image
                  v-if="
                    from.bankimgbankold != '' && from.bankimgbankpreview == null
                  "
                  :src="getImage(from.bankimgbankold)"
                  width="100%"
                  preview
                />
              </span>
              <Image
                v-if="from.bankimgbankpreview != null"
                :src="from.bankimgbankpreview"
                width="350"
                preview
              />
              <FileUpload
                mode="basic"
                chooseLabel="แนบบัญชี"
                :auto="true"
                class="buttonfile"
                @uploader="choosebank"
                :customUpload="true"
                accept="image/png, image/jpeg,image/jpg"
                :fileLimit="1"
                invalidFileSizeMessage="ขนาดรูปภาพจะต้องไม่เกิน 2 mb"
              />
            </div>
          </div>
        </div>

        <div class="bg-[#fff] mt-5">
          <div
            class="text-[#8B2FC9] text-center py-3 font-medium text-xl border-b-4 border-[#8B2FC9]"
          >
            <span class="mr-3">ข้อมูลที่อยู่ตามบัตรประชาชน</span>
            <button
              v-if="!onEditAddress"
              type="button"
              @click="onEditAddress = true"
              class="shadow text-sm py-1 px-2 rounded bg-orange-400 text-white"
            >
              <span class="pi pi-pencil text-sm mr-1"></span>แก้ไขข้อมูล
            </button>
            <button
              v-if="onEditAddress"
              type="button"
              @click="onEditAddress = false"
              class="shadow text-sm py-1 px-2 rounded bg-gray-400 text-gray-600"
            >
              <span class="pi pi-times text-sm mr-1"></span>ยกเลิก
            </button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 p-4">
            <div class="flex gap-3 items-center">
              <div v-if="!onEditAddress" class="flex items-center w-full gap-3">
                <label class="block text-sm font-medium text-gray-700"
                >ที่อยู่ :</label>
                {{ myFormatAddress.address || '-' }}
              </div>
              <div v-else class="flex items-center w-full gap-3">
                <label class="block text-sm font-medium text-gray-700 min-w-fit"
                >ที่อยู่ :</label>
                <input
                  v-model="myFormatAddress.address"
                  type="text"
                  class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF] text-sm"
                  placeholder="ระบุที่อยู่ / บ้านเลขที่"
                />
              </div>
            </div>
            <div class="flex gap-3 items-center">
              <div v-if="!onEditAddress" class="flex items-center w-full gap-3">
                <label class="block text-sm font-medium text-gray-700"
                >หมู่ :</label>
                {{ myFormatAddress.moo || '-' }}
              </div>
              <div v-else class="flex items-center w-full gap-3">
                <label class="block text-sm font-medium text-gray-700 min-w-fit"
                >หมู่ :</label>
                <input
                  v-model="myFormatAddress.moo"
                  type="text"
                  class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF] text-sm"
                  placeholder="ระบุหมู่"
                />
              </div>
            </div>
            <div class="flex gap-3 items-center">
              <div v-if="!onEditAddress" class="flex items-center w-full gap-3">
                <label class="block text-sm font-medium text-gray-700"
                >ถนน :</label>
                {{ myFormatAddress.road || '-' }}
              </div>
              <div v-else class="flex items-center w-full gap-3">
                <label class="block text-sm font-medium text-gray-700 min-w-fit"
                >ถนน :</label>
                <input
                  v-model="myFormatAddress.road"
                  type="text"
                  class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF] text-sm"
                  placeholder="ระบุถนน"
                />
              </div>
            </div>
            <div class="flex gap-3 items-center">
              <div v-if="!onEditAddress" class="flex items-center w-full gap-3">
                <label class="block text-sm font-medium text-gray-700"
                >ซอย :</label>
                {{ myFormatAddress.soi || '-' }}
              </div>
              <div v-else class="flex items-center w-full gap-3">
                <label class="block text-sm font-medium text-gray-700 min-w-fit"
                >ซอย :</label>
                <input
                  v-model="myFormatAddress.soi"
                  type="text"
                  class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF] text-sm"
                  placeholder="ระบุซอย"
                />
              </div>
            </div>
            <div class="flex gap-3 items-center">
              <div v-if="!onEditAddress" class="flex items-center w-full gap-3">
                <label class="block text-sm font-medium text-gray-700"
                >จังหวัด :</label
              >
              {{ myFormatAddress.province || '-' }}
              </div>
              <div v-else class="flex items-center w-full gap-3">
                <label class="block text-sm font-medium text-gray-700 min-w-fit"
                >จังหวัด :</label>
                <Dropdown
                  v-model="myAddress.province"
                  :options="optionprovince"
                  optionLabel="name_th"
                  optionValue="code"
                  placeholder="กรุณาเลือกจังหวัด"
                  class="w-full border focus:outline-none text-sm"
                  @change="chooseprovice()"
                  filter
                />
              </div>
            </div>
            <div class="flex gap-3 items-center">
              <div v-if="!onEditAddress" class="flex items-center w-full gap-3">
                <label class="block text-sm font-medium text-gray-700"
                >อำเภอ :</label>
                {{ myFormatAddress.amphure || '-' }}
              </div>
              <div v-else class="flex items-center w-full gap-3">
                <label class="block text-sm font-medium text-gray-700 min-w-fit"
                >อำเภอ :</label>
                <Dropdown
                  v-model="myAddress.amphure"
                  :options="optionamphure"
                  optionLabel="name_th"
                  optionValue="code"
                  placeholder="กรุณาเลือกอำเภอ"
                  class="w-full border focus:outline-none text-sm"
                  @change="chooseamphure()"
                  filter
                />
              </div>
            </div>
            <div class="flex gap-3 items-center">
              <div v-if="!onEditAddress" class="flex items-center w-full gap-3">
                <label class="block text-sm font-medium text-gray-700"
                >ตำบล :</label>
                {{ myFormatAddress.tambon || '-' }}
              </div>
              <div v-else class="flex items-center w-full gap-3">
                <label class="block text-sm font-medium text-gray-700 min-w-fit"
                >ตำบล :</label>
                <Dropdown
                  v-model="myAddress.tambon"
                  :options="optiontambon"
                  optionLabel="name_th"
                  optionValue="id"
                  placeholder="กรุณาเลือกตำบล"
                  class="w-full border focus:outline-none text-sm"
                  @change="choosetambon()"
                  filter
                />
              </div>
            </div>
            <div class="flex gap-3 items-center">
              <label class="block text-sm font-medium text-gray-700"
                >รหัสไปรษณีย์ :</label
              >
              {{ myFormatAddress.zipcode || '-' }}
            </div>
            <div class="mt-3 w-full">
              <button
                :disabled="!onEditAddress"
                :class="!onEditAddress ? 'hidden' : ''"
                @click="updateAddress"
                type="button"
                class="w-full py-1 text-center bg-purple-500 text-white rounded"
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>

        <div class="bg-[#fff] mt-5">
          <div
            class="text-[#8B2FC9] text-center py-3 font-medium text-xl border-b-4 border-[#8B2FC9]"
          >
            <span class="mr-3">ข้อมูลที่อยู่จัดส่ง</span>
            <button
              v-if="!onEditDelivery"
              type="button"
              @click="onEditDelivery = true"
              class="shadow text-sm py-1 px-2 rounded bg-orange-400 text-white"
            >
              <span class="pi pi-pencil text-sm mr-1"></span>แก้ไขข้อมูล
            </button>
            <button
              v-if="onEditDelivery"
              type="button"
              @click="onEditDelivery = false"
              class="shadow text-sm py-1 px-2 rounded bg-gray-400 text-gray-600"
            >
              <span class="pi pi-times text-sm mr-1"></span>ยกเลิก
            </button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 p-4">
            <div class="flex gap-3 items-center">
              <div v-if="!onEditDelivery" class="flex items-center w-full gap-3">
                <label class="block text-sm font-medium text-gray-700"
                >ที่อยู่ :</label>
                {{ myFormatDelivery.address || '-' }}
              </div>
              <div v-else class="flex items-center w-full gap-3">
                <label class="block text-sm font-medium text-gray-700 min-w-fit"
                >ที่อยู่ :</label>
                <input
                  v-model="myFormatDelivery.address"
                  type="text"
                  class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF] text-sm"
                  placeholder="ระบุที่อยู่ / บ้านเลขที่"
                />
              </div>
            </div>
            <div class="flex gap-3 items-center">
              <div v-if="!onEditDelivery" class="flex items-center w-full gap-3">
                <label class="block text-sm font-medium text-gray-700"
                >หมู่ :</label>
                {{ myFormatDelivery.moo || '-' }}
              </div>
              <div v-else class="flex items-center w-full gap-3">
                <label class="block text-sm font-medium text-gray-700 min-w-fit"
                >หมู่ :</label>
                <input
                  v-model="myFormatDelivery.moo"
                  type="text"
                  class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF] text-sm"
                  placeholder="ระบุหมู่"
                />
              </div>
            </div>
            <div class="flex gap-3 items-center">
              <div v-if="!onEditDelivery" class="flex items-center w-full gap-3">
                <label class="block text-sm font-medium text-gray-700"
                >ถนน :</label>
                {{ myFormatDelivery.road || '-' }}
              </div>
              <div v-else class="flex items-center w-full gap-3">
                <label class="block text-sm font-medium text-gray-700 min-w-fit"
                >ถนน :</label>
                <input
                  v-model="myFormatDelivery.road"
                  type="text"
                  class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF] text-sm"
                  placeholder="ระบุถนน"
                />
              </div>
            </div>
            <div class="flex gap-3 items-center">
              <div v-if="!onEditDelivery" class="flex items-center w-full gap-3">
                <label class="block text-sm font-medium text-gray-700"
                >ซอย :</label>
                {{ myFormatDelivery.soi || '-' }}
              </div>
              <div v-else class="flex items-center w-full gap-3">
                <label class="block text-sm font-medium text-gray-700 min-w-fit"
                >ซอย :</label>
                <input
                  v-model="myFormatDelivery.soi"
                  type="text"
                  class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF] text-sm"
                  placeholder="ระบุซอย"
                />
              </div>
            </div>
            <div class="flex gap-3 items-center">
              <div v-if="!onEditDelivery" class="flex items-center w-full gap-3">
                <label class="block text-sm font-medium text-gray-700"
                >จังหวัด :</label
              >
              {{ myFormatDelivery.province || '-' }}
              </div>
              <div v-else class="flex items-center w-full gap-3">
                <label class="block text-sm font-medium text-gray-700 min-w-fit"
                >จังหวัด :</label>
                <Dropdown
                  v-model="myDelivery.province"
                  :options="optionprovince"
                  optionLabel="name_th"
                  optionValue="code"
                  placeholder="กรุณาเลือกจังหวัด"
                  class="w-full border focus:outline-none text-sm"
                  @change="chooseproviceD()"
                  filter
                />
              </div>
            </div>
            <div class="flex gap-3 items-center">
              <div v-if="!onEditDelivery" class="flex items-center w-full gap-3">
                <label class="block text-sm font-medium text-gray-700"
                >อำเภอ :</label>
                {{ myFormatDelivery.amphure || '-' }}
              </div>
              <div v-else class="flex items-center w-full gap-3">
                <label class="block text-sm font-medium text-gray-700 min-w-fit"
                >อำเภอ :</label>
                <Dropdown
                  v-model="myDelivery.amphure"
                  :options="optionamphure"
                  optionLabel="name_th"
                  optionValue="code"
                  placeholder="กรุณาเลือกอำเภอ"
                  class="w-full border focus:outline-none text-sm"
                  @change="chooseamphureD()"
                  filter
                />
              </div>
            </div>
            <div class="flex gap-3 items-center">
              <div v-if="!onEditDelivery" class="flex items-center w-full gap-3">
                <label class="block text-sm font-medium text-gray-700"
                >ตำบล :</label>
                {{ myFormatDelivery.tambon || '-' }}
              </div>
              <div v-else class="flex items-center w-full gap-3">
                <label class="block text-sm font-medium text-gray-700 min-w-fit"
                >ตำบล :</label>
                <Dropdown
                  v-model="myDelivery.tambon"
                  :options="optiontambon"
                  optionLabel="name_th"
                  optionValue="id"
                  placeholder="กรุณาเลือกตำบล"
                  class="w-full border focus:outline-none text-sm"
                  @change="choosetambonD()"
                  filter
                />
              </div>
            </div>
            <div class="flex gap-3 items-center">
              <label class="block text-sm font-medium text-gray-700"
                >รหัสไปรษณีย์ :</label
              >
              {{ myFormatDelivery.zipcode || '-' }}
            </div>
            <div class="mt-3 w-full">
              <button
                :disabled="!onEditDelivery"
                :class="!onEditDelivery ? 'hidden' : ''"
                @click="updateDelivery"
                type="button"
                class="w-full py-1 text-center bg-purple-500 text-white rounded"
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>

        <div class="bg-[#fff] mt-5">
          <div class="flex items-center justify-center w-full gap-2 py-4">
            <button
              @click="editdata()"
              class="hidden font-semibold leading-none text-white py-4 px-10 bg-[#8B2FC9] rounded-lg hover:bg-[#E178C5] focus:ring-2 focus:ring-offset-2 focus:ring-[#8B2FC9] focus:outline-none"
            >
              บันทึก
            </button>
            <button
              @click="$router.go(-1)"
              type="button"
              class="font-semibold leading-none text-white py-4 px-10 bg-gray-500 rounded-lg hover:bg-[#ff6259] focus:ring-2 focus:ring-offset-2 focus:ring-[#8B2FC9] focus:outline-none"
            >
              กลับหน้าหลัก
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Dialog
    v-model:visible="dialog"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <template #header>
      <div class="flex justify-between items-center">
        <div class="text-lg font-semibold">{{ headform }}</div>
      </div>
    </template>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
      <div class="col-span-full">
        <label class="block text-sm font-medium text-gray-700"
          >ชื่อเรียก :</label
        >
        <input
          v-model="dialogaddress.name"
          type="text"
          class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
          placeholder="กรุณากรอกชื่อเรียก"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700"
          >ชื่อคนรับสินค้า :</label
        >
        <input
          v-model="dialogaddress.namedelivery"
          type="text"
          class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
          placeholder="กรุณากรอกชื่อคนรับสินค้า"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700"
          >เบอร์โทรศัพท์ :</label
        >
        <input
          v-model="dialogaddress.telephone"
          type="text"
          class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
          placeholder="กรุณากรอกเบอร์โทรศัพท์"
        />
      </div>
      <div class="col-span-full">
        <label class="block text-sm font-medium text-gray-700">ที่อยู่ :</label>
        <input
          v-model="dialogaddress.address"
          type="text"
          class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
          placeholder="กรุณากรอกที่อยู่"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">จังหวัด :</label>
        <Dropdown
          v-model="dialogaddress.province"
          :options="optionprovince"
          optionLabel="name_th"
          optionValue="name_th"
          placeholder="กรุณาเลือกจังหวัด"
          class="w-full border focus:outline-none"
          @change="chooseprovicediglog()"
          filter
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">อำเภอ :</label>
        <Dropdown
          v-model="dialogaddress.amphure"
          :options="optionamphurediglog"
          optionLabel="name_th"
          optionValue="name_th"
          placeholder="กรุณาเลือกอำเภอ"
          class="w-full border focus:outline-none"
          @change="chooseamphurediglog()"
          filter
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">ตำบล :</label>
        <Dropdown
          v-model="dialogaddress.tambon"
          :options="optiontambondiglog"
          optionLabel="name_th"
          optionValue="name_th"
          placeholder="กรุณาเลือกตำบล"
          class="w-full border focus:outline-none"
          @change="choosetambondiglog()"
          filter
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700"
          >รหัสไปรษณีย์ :</label
        >
        <input
          v-model="dialogaddress.zipcode"
          disabled
          type="text"
          class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
          placeholder="กรุณากรอกรหัสไปรษณีย์"
        />
      </div>
    </div>
    <div class="flex items-center justify-center w-full">
      <button
        @click="
          headform == 'เพิ่มข้อมูลที่อยู่จัดส่ง'
            ? adddelivery()
            : editDelivery()
        "
        class="mt-9 font-semibold leading-none text-white py-4 px-10 bg-[#8B2FC9] rounded-lg hover:bg-[#E178C5] focus:ring-2 focus:ring-offset-2 focus:ring-[#8B2FC9] focus:outline-none mx-5"
      >
        บันทึก
      </button>
      <button
        @click="dialog = false"
        class="mt-9 font-semibold leading-none text-white py-4 px-10 bg-[#ff3d32] rounded-lg hover:bg-[#ff6259] focus:ring-2 focus:ring-offset-2 focus:ring-[#8B2FC9] focus:outline-none"
      >
        ยกเลิก
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

const from = ref({});
const myAddress = ref({
  province: "",
  amphure: "",
  tambon: "",
  zipcode: "",
});

const myDelivery = ref({
  province: "",
  amphure: "",
  tambon: "",
  zipcode: "",
});

const myFormatAddress = ref({});
const myFormatDelivery = ref({});

const optionprefix = ref([
  { label: "นาย", value: "นาย" },
  { label: "นาง", value: "นาง" },
  { label: "นางสาว", value: "นางสาว" },
]);

const optionsex = ref([{ name: "ชาย" }, { name: "หญิง" }, { name: "ไม่ระบุ" }]);

const onEdit = ref(false);
const onEditAddress = ref(false);
const onEditDelivery = ref(false);

const getImage = (item) => {
  return `https://drive.google.com/thumbnail?id=${item}&sz=w1000`;
};

onMounted(async () => {
  document.title = "แก้ไขข้อมูลส่วนตัว || Maruey";
  isLoading.value = true;
  await getdata();
  isLoading.value = false;
});

const optionprovince = ref([]);

const getdata = async () => {
  await getprovince();
  await getAmphures();
  await getTambons();
  await getcustomer();
  await getMyMember(from.value.user_name)
  await getAddressDelevery();
};

const getMyMember = async (myusername) => {
  //isLoading.value = true
  try {
    const { data } = await axios.get(`${process.env.VUE_APP_MARUEY}member/${myusername}`, {
      headers: {
        token: "Bearer " + localStorage.getItem("token"),
      }
    })
    from.value = {...data.data}
    ////console.log(data)
  }
  catch(err) {
    //console.log(err)
    getMyMember(myusername)
    //checkMember()
  }
  finally {
    //isLoading.value = false
  }
}

const getAddressDelevery = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.VUE_APP_MARUEY}${from.value.id}/delivery`
    );
    //console.log(data);
    myDelivery.value = data.data.reverse()[0] || {};
    const address = {
      address: myDelivery.value.address,
      moo: myDelivery.value.moo,
      road: myDelivery.value.road,
      soi: myDelivery.value.soi,
      province: optionprovince.value.find(
        (x) => x.code + "" === myDelivery.value.province + ""
      )?.name_th,
      amphure: optionamphure.value.find(
        (x) => x.code + "" === myDelivery.value.district + ""
      )?.name_th,
      tambon: optiontambon.value.find((x) => x.id+"" === myDelivery.value.tambon+"")
        ?.name_th,
      zipcode: myDelivery.value.zipcode,
    };
    myFormatDelivery.value = address;
  } catch (err) {
    //console.log(err);
  }
};

const getcustomer = async () => {
  from.value = store.getters.me;
  from.value.linkregistercode = `${process.env.VUE_APP_MARUEY}register?id=${from.value.id}&username=${from.value.user_name}`;
  await getMyAddress();
};

const optionamphure = ref([]);
const chooseprovice = async (edit) => {
  const config = {
    method: "get",
    url: `https://golf4.orangeworkshop.info/mlm/api/dataset_amphuress`,
  };
  await axios(config)
    .then((res) => {
      const province = optionprovince.value.find(
        (item) =>
          item.name_th === myAddress.value.province ||
          item.code === myAddress.value.province
      );
      optionamphure.value = res.data?.data.filter(
        (item) => item.changwat_id + "" === province.id + ""
      );
      if (!edit) {
        myAddress.value.amphure = "";
        myAddress.value.tambon = "";
        myAddress.value.zipcode = "";
      }
    })
    .catch((err) => {
      //console.log(err);
    });
};

const chooseproviceD = async (edit) => {
  const config = {
    method: "get",
    url: `https://golf4.orangeworkshop.info/mlm/api/dataset_amphuress`,
  };
  await axios(config)
    .then((res) => {
      const province = optionprovince.value.find(
        (item) =>
          item.name_th === myDelivery.value.province ||
          item.code === myDelivery.value.province
      );
      optionamphure.value = res.data?.data.filter(
        (item) => item.changwat_id === province.id
      );
      if (!edit) {
        myDelivery.value.amphure = "";
        myDelivery.value.tambon = "";
        myDelivery.value.zipcode = "";
      }
    })
    .catch((err) => {
      //console.log(err);
    });
};

const getprovince = async () => {
  const config = {
    method: "get",
    url: `https://golf4.orangeworkshop.info/mlm/api/dataset_changwat`,
  };
  await axios(config)
    .then((res) => {
      optionprovince.value = res.data.data;
    })
    .catch((err) => {
      //console.log(err);
    });
};

const getAmphures = async () => {
  const config = {
    method: "get",
    url: `https://golf4.orangeworkshop.info/mlm/api/dataset_amphuress`,
  };
  await axios(config)
    .then((res) => {
      optionamphure.value = res.data?.data;
    })
    .catch((err) => {
      //console.log(err);
    });
};

const getTambons = async () => {
  const config = {
    method: "get",
    url: `https://golf4.orangeworkshop.info/mlm/api/dataset_tambon`,
  };
  await axios(config)
    .then((res) => {
      optiontambon.value = res.data?.data;
    })
    .catch((err) => {
      //console.log(err);
    });
};

const getMyAddress = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.VUE_APP_MARUEY}${from.value.id}/address`
    );
    //console.log(data.data[0]);
    myAddress.value = data.data[0] || {};
    const address = {
      address: myAddress.value.address,
      moo: myAddress.value.moo,
      road: myAddress.value.road,
      soi: myAddress.value.soi,
      province: optionprovince.value.find(
        (x) => x.code + "" === myAddress.value.province + ""
      )?.name_th,
      amphure: optionamphure.value.find(
        (x) => x.code + "" === myAddress.value.district + ""
      )?.name_th,
      tambon: optiontambon.value.find((x) => x.id+"" === myAddress.value.tambon+"")
        ?.name_th,
      zipcode: myAddress.value.zipcode,
    };
    myFormatAddress.value = address;
    ////console.log(address)
  } catch (err) {
    //console.log(err);
  }
};

const optiontambon = ref([]);
const chooseamphure = async () => {
  const config = {
    method: "get",
    url: `https://golf4.orangeworkshop.info/mlm/api/dataset_tambon`,
  };
  await axios(config)
    .then((res) => {
      const amphure = optionamphure.value.find(
        (item) =>
          item.name_th == myAddress.value.amphure ||
          item.code == myAddress.value.amphure
      );
      optiontambon.value = res.data?.data.filter(
        (item) => item.amphure_id + "" == amphure.id + ""
      );
    })
    .catch((err) => {
      //console.log(err);
    });
};

const chooseamphureD = async () => {
  const config = {
    method: "get",
    url: `https://golf4.orangeworkshop.info/mlm/api/dataset_tambon`,
  };
  await axios(config)
    .then((res) => {
      const amphure = optionamphure.value.find(
        (item) =>
          item.name_th == myDelivery.value.amphure ||
          item.code == myDelivery.value.amphure
      );
      optiontambon.value = res.data?.data.filter(
        (item) => item.amphure_id == amphure.id
      );
    })
    .catch((err) => {
      //console.log(err);
    });
};

const choosetambon = async () => {
  const zipcode = optiontambon.value.find(
    (item) =>
      item.name_th == myAddress.value.tambon ||
      item.id == myAddress.value.tambon
  );
  myAddress.value.zipcode = zipcode?.zip_code;
  myFormatAddress.value.zipcode = zipcode?.zip_code;
};

const choosetambonD = async () => {
  const zipcode = optiontambon.value.find(
    (item) =>
      item.name_th == myDelivery.value.tambon ||
      item.id == myDelivery.value.tambon
  );
  myDelivery.value.zipcode = zipcode?.zip_code;
  myFormatDelivery.value.zipcode = zipcode?.zip_code;
};

const choosebank = (e) => {
  from.value.bankimgbankpreview = e.files[0].objectURL;
  from.value.bankimgbank = e.files[0];
};

const dialog = ref(false);
const headform = ref("");
const dialogaddress = ref({
  name: "",
  namedelivery: "", //(ชื่อคนรับสินค้า)
  telephone: "", //(เบอร์ที่เอาไว้ติดต่อ)
  address: "",
  province: "",
  amphure: "",
  tambon: "",
  zipcode: "",
});

const chooseprovicediglog = async (edit) => {
  const config = {
    method: "get",
    url: `https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json`,
  };
  await axios(config)
    .then((res) => {
      const province = optionprovince.value.find(
        (item) => item.name_th == dialogaddress.value.province
      );
      optionamphurediglog.value = res.data.filter(
        (item) => item.province_id == province.id
      );
      if (edit == undefined) {
        from.value.address.amphure = "";
        from.value.address.tambon = "";
        from.value.address.zipcode = "";
      }
    })
    .catch((err) => {
      //console.log(err);
    });
};

const optionamphurediglog = ref([]);
const chooseamphurediglog = async (edit) => {
  const config = {
    method: "get",
    url: `https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json`,
  };
  await axios(config)
    .then((res) => {
      const amphure = optionamphurediglog.value.find(
        (item) => item.name_th == dialogaddress.value.amphure
      );
      optiontambondiglog.value = res.data.filter(
        (item) => item.amphure_id == amphure.id
      );
      if (edit == undefined) {
        dialogaddress.value.tambon = "";
        dialogaddress.value.zipcode = "";
      }
    })
    .catch((err) => {
      //console.log(err);
    });
};
const optiontambondiglog = ref([]);
const choosetambondiglog = async () => {
  const zipcode = optiontambondiglog.value.find(
    (item) => item.name_th == dialogaddress.value.tambon
  );
  dialogaddress.value.zipcode = zipcode?.zip_code;
};

const updateProfile = async () => {
  const payload = {
    user_id: from.value.id,
    full_name: from.value.business_name,
    phone: from.value.phone,
    email: 'example@marurey.com',
  };
  try {
    const { data } = await axios.post(
      `${process.env.VUE_APP_MLM}/updateProfile`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    //console.log(data);
    if (data.code === 'success') {
      await Swal.fire({
        icon: "success",
        title: "บันทึกข้อมูลเรียบร้อย",
        showConfirmButton: false,
        timer: 1500,
      })
      window.location.reload();
    }
    //window.location.reload();
  } catch (err) {
    //console.log(err);
  }
};

const updateAddress = async () => {
  const payload = {
    customers_id: from.value.id,
    address: myFormatAddress.value.address,
    moo: myFormatAddress.value.moo,
    soi: myFormatAddress.value.soi,
    road: myFormatAddress.value.road,
    tambon: myAddress.value.tambon,
    district: myAddress.value.amphure,
    province: myAddress.value.province,
    zipcode: myFormatAddress.value.zipcode,
    phone: from.value.phone,
  }
  try {
    ////console.log(payload)
    const { data } = await axios.post(`${process.env.VUE_APP_MARUEY}address-card`, payload)
    //console.log(data)
    if (data.status) {
      await Swal.fire({
        icon: "success",
        title: "บันทึกข้อมูลเรียบร้อย",
        showConfirmButton: false,
        timer: 1500,
      })
      onEditAddress.value = false
    }
  }
  catch(err) {
    //console.log(err)
  }
}

const updateDelivery = async () => {
  const payload = {
    customers_id: from.value.id,
    address: myFormatDelivery.value.address,
    moo: myFormatDelivery.value.moo,
    soi: myFormatDelivery.value.soi,
    road: myFormatDelivery.value.road,
    tambon: myDelivery.value.tambon,
    district: myDelivery.value.amphure,
    province: myDelivery.value.province,
    zipcode: myFormatDelivery.value.zipcode,
    phone: from.value.phone,
  }
  try {
    ////console.log(payload)
    const { data } = await axios.post(`${process.env.VUE_APP_MARUEY}address-delivery`, payload)
    //console.log(data)
    if (data.status) {
      await Swal.fire({
        icon: "success",
        title: "บันทึกข้อมูลเรียบร้อย",
        showConfirmButton: false,
        timer: 1500,
      })
      onEditDelivery.value = false
    }
  }
  catch(err) {
    //console.log(err)
  }
}

const adddelivery = () => {
  //เช็ควค่าว่าง
  if (
    dialogaddress.value.name == "" ||
    dialogaddress.value.address == "" ||
    dialogaddress.value.province == "" ||
    dialogaddress.value.amphure == "" ||
    dialogaddress.value.tambon == "" ||
    dialogaddress.value.zipcode == "" ||
    dialogaddress.value.namedelivery == "" ||
    dialogaddress.value.telephone == ""
  ) {
    toast.add({
      severity: "error",
      summary: "ข้อมูลไม่ครบ",
      detail: "กรุณากรอกข้อมูลให้ครบถ้วน",
      life: 3000,
    });
    return;
  }
  from.value.addressdelivery.push(dialogaddress.value);
  dialog.value = false;
};

const editDelivery = () => {
  //เช็ควค่าว่าง
  if (
    dialogaddress.value.name == "" ||
    dialogaddress.value.address == "" ||
    dialogaddress.value.province == "" ||
    dialogaddress.value.amphure == "" ||
    dialogaddress.value.tambon == "" ||
    dialogaddress.value.zipcode == "" ||
    dialogaddress.value.namedelivery == "" ||
    dialogaddress.value.telephone == ""
  ) {
    toast.add({
      severity: "error",
      summary: "ข้อมูลไม่ครบ",
      detail: "กรุณากรอกข้อมูลให้ครบถ้วน",
      life: 3000,
    });
    return;
  }
  const index = from.value.addressdelivery.findIndex(
    (item) => item.name == dialogaddress.value.name
  );
  from.value.addressdelivery[index] = dialogaddress.value;
  dialog.value = false;
};

const deleteDelivery = async (name) => {
  const result = await Swal.fire({
    text: "คุณต้องการที่จะลบข้อมูลที่อยู่หรือไม่?",
    icon: "warning",
    iconColor: "#8B2FC9",
    showCancelButton: true,
    confirmButtonColor: "#8B2FC9",
    cancelButtonColor: "#E85D40",
    confirmButtonText: "ยืนยัน",
    cancelButtonText: "ยกเลิก",
  });
  if (result.isConfirmed) {
    const index = from.value.addressdelivery.findIndex(
      (item) => item.name == name
    );
    from.value.addressdelivery.splice(index, 1);
  }
};

const editdata = async () => {
  //เช็ค password และ confirmpassword
  if (from.value.password != from.value.confirmpassword) {
    toast.add({
      severity: "error",
      summary: "รหัสผ่านไม่ตรงกัน",
      detail: "กรุณากรอกรหัสผ่านให้ตรงกัน",
      life: 3000,
    });
    return;
  }
  const result = await Swal.fire({
    text: "คุณต้องการแก้ไขข้อมูลส่วนตัวหรือไม่?",
    icon: "warning",
    iconColor: "#8B2FC9",
    showCancelButton: true,
    confirmButtonColor: "#8B2FC9",
    cancelButtonColor: "#E85D40",
    confirmButtonText: "ยืนยัน",
    cancelButtonText: "ยกเลิก",
  });
  if (result.isConfirmed) {
    isLoading.value = true;
    const data = {
      username: from.value.username,
      email: from.value.email,
      telephone: from.value.telephone,
      password: from.value.password,
      referralcode: from.value.referralcode,
      prefix: from.value.prefix,
      name: from.value.name,
      sex: from.value.sex,
      birthday: from.value.birthday,
      nationality: from.value.nationality, //(สัญชาติ)
      idcard: from.value.idcard, //(เลขบัตรประชาชน)
      facebook: from.value.facebook, //(เฟสบุ๊ค)
      line_id: from.value.line_id, //(ไลน์ไอดี)
      bank: {
        accountname: from.value.bank.accountname, //(ชื่อบัญชี)
        accountnumber: from.value.bank.accountnumber, //(เลขบัญชี)
        name: from.value.bank.name, //(ชื่อธนาคาร)
        branch: from.value.bank.branch, //(สาขา)
      },
      address: {
        address: from.value.address.address, //(ที่อยู่)
        province: from.value.address.province, //(จังหวด)
        amphure: from.value.address.amphure, //(อำเภอ)
        tambon: from.value.address.tambon, //(ตำบล)
        zipcode: from.value.address.zipcode, //(รหัสไปรษณีย์)
      }, //(ที่อยู่ตามบัตรประชาชน)
      addressdelivery: from.value.addressdelivery, //ที่อยู่จัดส่ง
    };
    const config = {
      method: "put",
      url: `${process.env.VUE_APP_MARUEY}customer/${store.getters._id}`,
      headers: {
        token: "Bearer " + localStorage.getItem("token"),
      },
      data: data,
    };
    await axios(config)
      .then((res) => {
        if (from.value.bank.imgbank != "") {
          uploadbank(store.getters._id);
        }
        isLoading.value = false;
        Swal.fire({
          text: "บันทึกข้อมูลสำเร็จ",
          icon: "success",
          iconColor: "#8B2FC9",
          confirmButtonColor: "#8B2FC9",
        });
      })
      .catch((err) => {
        Swal.fire({
          text: "บันทึกข้อมูลไม่สำเร็จ",
          icon: "error",
          iconColor: "#8B2FC9",
          confirmButtonColor: "#8B2FC9",
        });
      });

    isLoading.value = false;
  }
};

const uploadbank = async (id) => {
  const formData = new FormData();
  formData.append("image", from.value.bank.imgbank);
  const config = {
    method: "put",
    url: `${process.env.VUE_APP_MARUEY}customer/bank/${id}`,
    headers: {
      "Content-Type": "multipart/form-data",
      token: "Bearer " + localStorage.getItem("token"),
    },
    data: formData,
  };
  await axios(config)
    .then((res) => {
      //console.log("อัพโหลดรูปภาพสำเร็จ");
    })
    .catch((err) => {
      //console.log(err);
    });
};

const optionbank = ref([
  { name: "ธนาคารกสิกรไทย" },
  { name: "ธนาคารกรุงไทย" },
  { name: "ธนาคารทหารไทย" },
  { name: "ธนาคารไทยพาณิชย์" },
  { name: "ธนาคารกรุงศรีอยุธยา" },
  { name: "ธนาคารธนชาต" },
  { name: "ธนาคารออมสิน" },
  { name: "ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร" },
  { name: "Industrial and Commercial Bank of China Limited(THAI)" },
  { name: "ธนาคารซิตี้แบงก์" },
  { name: "UOB(THAI)" },
  { name: "ธนาคารซีไอเอ็มบีไทย" },
  { name: "ธนาคารแลนด์ แอนด์ เฮ้าส์" },
  { name: "ธนาคารสแตนดาร์ดชาร์เตอร์ด(ไทย)" },
  { name: "ธนาคารทิสโก้" },
  { name: "ธนาคารอาคารสงเคราะห์" },
  { name: "ธนาคารเกียรตินาคินภัทร" },
  { name: "HSBC Thailand" },
  { name: "ธนาคารกรุงเทพ" },
]);

const copylink = () => {
  const tempElement = document.createElement("textarea");
  tempElement.value = from.value.linkregistercode;
  document.body.appendChild(tempElement);
  tempElement.select();
  document.execCommand("copy");
  document.body.removeChild(tempElement);
  // navigator.clipboard.writeText(from.value.linkregistercode);
  Swal.fire({
    text: "คัดลอกลิงค์สำเร็จ",
    icon: "success",
    iconColor: "#8B2FC9",
    confirmButtonColor: "#8B2FC9",
  });
};
</script>

<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

@import "@/assets/Loading.css";
</style>