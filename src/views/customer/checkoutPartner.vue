<template>
  <div v-if="isLoading" class="overlay">
    <div class="loader"></div>
  </div>
  <div class="h-full bg-[#f7f7f7] py-8">
    <div class="flex justify-between my-3 mx-3">
      <Button label="ย้อนกลับ" @click="$router.push('/')" icon="pi pi-chevron-left" class="text-[#8B2FC9]"/>
      <Button label="โหลดใหม่" @click="reload()" icon="pi pi-refresh" class="text-[#8B2FC9]"/>
    </div>
    <div class="h-full py-3 mx-2 lg:mx-0">
      <div
        class="xl:w-4/6 mx-2 md:mx-auto p-5 shadow border-t-2 border-[#8B2FC9] bg-purple-200"
      >
        <div class="text-lg flex items-center gap-2">
          <div class="text-[#8B2FC9] flex flex-col gap-3 w-full">
            <div class="flex items-center gap-3">
              <svg class=" " height="24" viewBox="0 0 12 16" width="15">
                <path
                  d="M6 3.2c1.506 0 2.727 1.195 2.727 2.667 0 1.473-1.22 2.666-2.727 2.666S3.273 7.34 3.273 5.867C3.273 4.395 4.493 3.2 6 3.2zM0 6c0-3.315 2.686-6 6-6s6 2.685 6 6c0 2.498-1.964 5.742-6 9.933C1.613 11.743 0 8.498 0 6z"
                  fill-rule="evenodd"
                  fill="#8B2FC9"
                ></path>
              </svg>
              ที่อยู่ในการจัดส่ง
            </div>
            <div class="flex gap-5 items-center border px-2 py-2 border-purple-600 justify-center">
              <div class="flex items-center gap-1">
                <input type="radio" id="system" v-model="addressType" value="system" class="w-5 h-5" :disabled="!myFormatAddress?.province" />
                <label for="system" class="text-sm text-black"
                  >ที่อยู่ในระบบ</label
                >
              </div>
              <div class="flex items-center gap-1">
                <input
                  type="radio"
                  id="newAddress"
                  v-model="addressType"
                  value="newAddress"
                  class="w-5 h-5"
                />
                <label for="newAddress" class="text-sm text-black"
                  >ที่อยู่ใหม่</label
                >
              </div>
            </div>
          </div>
        </div>
        <div v-if="addressType === 'system'" class="mt-2 pl-1 md:flex gap-5">
          <span class="font-bold text-sm"
            >{{ "(ที่อยู่ในระบบ)" }}
          </span>
          <br />
          <div class="flex flex-col">
              <label>ชื่อผู้รับ</label>
              <input
                type="text"
                v-model="myFormatAddress.name"
                class="border px-2 py-1 rounded"
              />
            </div>
            <div class="flex flex-col">
              <label>เบอร์โทร</label>
              <input
                type="text"
                v-model="myFormatAddress.phone"
                class="border px-2 py-1 rounded"
              />
            </div>
            <br>
          <div class="text-sm flex flex-wrap gap-x-1" v-if="myFormatAddress?.province">
            <span class="pi pi-map-marker text-red-500"></span>
            <span>{{ myFormatAddress?.address }}</span>
            <span>ม.{{ myFormatAddress?.moo }}</span>
            <span>ถนน.{{ myFormatAddress?.road }}</span>
            <span>ซอย.{{ myFormatAddress?.soi }}</span>
            <span>ต.{{ myFormatAddress?.tambon }}</span>
            <span>อ.{{ myFormatAddress?.amphure }}</span>
            <span>จ.{{ myFormatAddress?.province }}</span>
            <span>{{ myFormatAddress?.zipcode }}</span>
          </div>
          <div v-else>
            <span class="text-red-500">*ไม่พบข้อมูลที่อยู่จัดส่งในระบบ กรุณาเลือกที่อยู่ใหม่</span>
          </div>
        </div>
        <div v-else class="mt-2 pl-1 gap-5">
          <div class="text-sm flex flex-col gap-2">
            <div class="flex flex-col mt-3">
              <label>ชื่อผู้รับ</label>
              <input
                type="text"
                v-model="newAddress.receiver"
                class="border px-2 py-2 rounded"
              />
            </div>
            <div class="flex flex-col">
              <label>เบอร์โทร</label>
              <input
                type="text"
                v-model="newAddress.phone"
                class="border px-2 py-2 rounded"
                :maxlength="10"
              />
            </div>
            <div class="flex flex-col mt-3 pt-3 border-t border-dashed border-purple-500">
              <label>บ้านเลขที่</label>
              <input
                type="text"
                v-model="newAddress.address"
                class="border px-2 py-2 rounded"
              />
            </div>
            <div class="flex flex-col">
              <label>หมู่</label>
              <input
                type="text"
                v-model="newAddress.moo"
                class="border px-2 py-2 rounded"
              />
            </div>
            <div class="flex flex-col">
              <label
                >ถนน
                <span class="text-xs text-gray-500">(ไม่จำเป็นต้องกรอก)</span></label
              >
              <input
                type="text"
                v-model="newAddress.road"
                class="border px-2 py-2 rounded"
              />
            </div>
            <div class="flex flex-col">
              <label
                >ซอย
                <span class="text-xs text-gray-500">(ไม่จำเป็นต้องกรอก)</span></label
              >
              <input
                type="text"
                v-model="newAddress.soi"
                class="border px-2 py-2 rounded"
              />
            </div>
            <div class="flex flex-col">
              <label>จังหวัด</label>
              <Dropdown
                v-model="newAddress.province"
                :options="optionprovince"
                filter
                optionLabel="name_th"
                placeholder="เลือกจังหวัด"
                class="w-full border"
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
            </div>
            <div class="flex flex-col">
              <label>อำเภอ/แขวง</label>
              <Dropdown
                v-model="newAddress.amphure"
                :options="optionamphures"
                filter
                optionLabel="name_th"
                placeholder="เลือกอำเภอ/แขวง"
                class="w-full border"
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
            </div>
            <div class="flex flex-col">
              <label>ตำบล/เขต</label>
              <Dropdown
                v-model="newAddress.tambon"
                @change="getZipCode"
                :options="optiontambons"
                filter
                optionLabel="name_th"
                placeholder="เลือกตำบล/เขต"
                class="w-full border"
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
            </div>
            <div class="flex flex-col">
              <label>รหัสไปรษณีย์</label>
              <input
                readonly
                type="text"
                v-model="newAddress.zipcode"
                class="border px-2 py-2 rounded"
              />
            </div>
          </div>
        </div>
      </div>

      <div v-if="partner_id.length > 0">
        <div
          class="xl:w-4/6 mx-2 md:mx-auto mt-5 pt-5 bg-[#fff] shadow"
          v-for="item in partner_id"
          :key="item._id"
        >
          <div class="text-lg flex items-center mx-5">
            <div class="text-[#8B2FC9] flex-grow text-sm md:text-base">
              {{ item.partner_name }}
            </div>
            <div class="text-sm w-2/12 hidden md:block">ราคาต่อหน่วย</div>
            <div class="text-sm w-2/12 hidden md:block">จำนวน</div>
            <div class="text-sm w-2/12 hidden md:block text-right">
              รายการย่อย
            </div>
          </div>
          <div
            class="mt-2 mb-5 pl-1 flex items-center mx-5"
            v-for="product in item.product"
            :key="product._id"
          >
            <div class="text-[#8B2FC9] flex gap-4 w-full">
              <div class="w-fit">
                <img
                  class="w-14 h-14 object-cover"
                  :src="product.product_image"
                  v-if="product.product_image && !product.product_imageError"
                  @error="product.product_imageError = true"
                />
                <img
                  class="w-14 h-14 object-cover"
                  src="@/assets/images/logo.jpg"
                  v-else
                />
              </div>
              <div class="flex flex-col justify-center w-full overflow-hidden">
                <div class="line-clamp-1 text-sm">
                  {{ product.product_name }}
                </div>
                <div class="flex gap-3">
                  <div class="text-xs sm:text-sm">
                    ฿
                    {{
                      product.product_price?.toLocaleString("en", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    }}
                  </div>
                  <div class="text-xs sm:text-sm">
                    x{{ product.product_qty }}
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-col w-full max-w-fit items-end text-right">
              <div class="text-xs truncate w-full max-w-fit text-right">
                ฿
                {{
                  product.product_totalprice?.toLocaleString("en", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                }}
              </div>
              <div
                class="text-xs text-green-500 truncate w-full max-w-fit text-right"
              >
                PV
                {{
                  product.product_totalpv?.toLocaleString("en", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                }}
              </div>
            </div>
          </div>
          <div class="w-full md:flex border-y border-dashed bg-[#fafdff]">
            <div
              class="w-full hidden md:w-2/3 justify-normal items-center gap-2 md:border-r md:border-dashed text-xs md:text-sm p-5"
            >
              <div class="">หมายเหตุ:</div>
              <div class="w-full md:w-2/3">
                <input
                  v-model="item.note"
                  type="text"
                  placeholder="(ไม่บังคับ) ฝากข้อความถึงผู้ขายหรือบริษัทขนส่ง"
                  class="mt-1 p-1.5 w-full border focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
                />
              </div>
            </div>
          </div>
          <div
            class="w-full flex flex-col justify-center md:justify-normal items-center bg-[#fafdff] p-5"
          >
            <div class="md:text-right md:w-auto">
              จำนวน ({{ item.product?.length }} รายการ)
            </div>
          </div>
        </div>
      </div>
      <div class="lg:w-4/6 mx-2 md:mx-auto mt-5 bg-[#fff] shadow hidden">
        <div class="p-5 text-lg flex items-center gap-2 text-[#8B2FC9]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              d="M17.5 4.23V8m0 2v4m0 2v3.77M.5 3.5v6a2.5 2.5 0 0 1 0 5v6H1l3.04-.434a56.277 56.277 0 0 1 15.92 0L23 20.5h.5v-6a2.5 2.5 0 0 1 0-5v-6H23l-3.04.434a56.285 56.285 0 0 1-15.92 0L1 3.5H.5Z"
            />
          </svg>
          <div class="text-sm md:text-base">โค้ดส่วนลดของ Maruey</div>
          <div class="text-sm md:text-base text-right flex-grow">
            <button class="text-[#8B2FC9] hover:underline text-sm">
              กดใช้โค้ด
            </button>
          </div>
        </div>
        <div
          class="p-5 text-lg border-t border-b-gray-200 flex items-center gap-2 text-[#8B2FC9]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
            >
              <path
                d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10Z"
              />
              <path
                d="M15 8.5c-.685-.685-1.891-1.161-3-1.191M9 15c.644.86 1.843 1.35 3 1.391m0-9.082c-1.32-.036-2.5.561-2.5 2.191c0 3 5.5 1.5 5.5 4.5c0 1.711-1.464 2.446-3 2.391m0-9.082V5.5m0 10.891V18.5"
              />
            </g>
          </svg>
          <div class="text-sm">Maruey Coins</div>
          <div class="text-[#000] text-sm mt-1 flex-grow pl-5 hidden md:block">
            ไม่สามารถแลกเหรียญได้
          </div>
          <div class="text-left text-sm w-1/2 md:w-1/12">
            <input
              type="number"
              value="0"
              class="mt-1 p-1.5 w-full border focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
            />
          </div>
        </div>
      </div>

      <div class="bg-[#fff] shadow mt-5 mx-2 p-5">
        <h1 class="text-start font-bold text-purple-600">วิธีการจัดส่ง</h1>
        <div class="flex justify-center mt-3">
          <div class="flex gap-5 justify-center">
            <div class="flex flex-col items-center gap-2 border p-2" :class="{ 'border-[#DC97FF] border-2': tracking_type === 'Kerry' }">
              <img src="/src/assets/images/KERRY.jpg" alt="kerry" width="100" />
              <div class="flex items-center">
                <input
                  type="radio"
                  v-model="tracking_type"
                  id="tracking_type1"
                  name="Kerry"
                  value="Kerry"
                  class="border rounded-full border-black w-5 h-5"
                />
                <label for="tracking_type1" class="ml-2">Kerry</label>
              </div>
            </div>
            <div class="flex flex-col items-center gap-2 border p-2" :class="{ 'border-[#DC97FF] border-2': tracking_type === 'Flash' }">
              <img src="/src/assets/images/FLASH.jpg" alt="kerry" width="100" />
              <div class="flex items-center">
                <input
                  type="radio"
                  v-model="tracking_type"
                  id="tracking_type2"
                  name="Flash"
                  value="Flash"
                  class="border rounded-full border-black w-5 h-5"
                />
                <label for="tracking_type2" class="ml-2">Flash</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:w-4/6 mx-2 md:mx-auto mt-5 pt-5 bg-[#fff] shadow mb-14">
        <h1 class="ml-5 mb-5 font-semibold text-purple-600">สรุปรายการชำระเงิน</h1>
        <div
          class="flex w-full justify-start items-center px-5 pb-3 text-sm"
        >
          <div class="text-center">ราคาสินค้า :</div>
          <div class="text-right ml-3">
            {{
              ((total.totalprice * 100) / 107)?.toLocaleString("en", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }}
          </div>
        </div>
        <div
          class="flex w-full justify-start items-center px-5 pb-3 text-sm"
        >
          <div class="text-center">VAT 7% :</div>
          <div class="text-right ml-3">
            {{
              ((total.totalprice * 7) / 107)?.toLocaleString("en", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }}
          </div>
        </div>
        <div
          class="flex w-full justify-start items-center px-5 pb-3 text-sm"
        >
          <div class="text-center">
            ราคาสินค้ารวมภาษี :
          </div>
          <div class="text-right ml-3">
            {{
              total.totalprice?.toLocaleString("en", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }}
          </div>
        </div>
        <div
          class="flex w-full justify-start items-center px-5 pb-3 text-sm"
        >
          <div class="text-center sm:text-right sm:w-10/12">ส่วนลด <span class="text-white px-2 rounded-xl bg-[#a24add]">bonus {{ discount.bonus }} %</span> :</div>
          <div class="text-right ml-3 text-red-500">- {{ discount.dis?.toLocaleString("en", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) }}</div>
        </div>
        <div
          class="flex w-full justify-start items-center px-5 pb-3 text-sm"
        >
          <div class="text-center sm:text-right sm:w-10/12">ค่าจัดส่ง :</div>
          <div class="text-right ml-3 hidden">{{ (shippingCost+tracking_price)?.toLocaleString("en", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) }}
            <span v-if="tracking_price > 0" class="ml-3 text-orange-500">( พื้นที่ห่างไกล )</span> 
            <span v-else class="ml-3 text-blue-500">( จัดส่งทั่วไป )</span>      
          </div>
          <div v-if="tracking_price > 0">
            <div class="text-right ml-3">{{ (tracking_price)?.toLocaleString("en", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) }}
              <span class="ml-3 text-orange-500">( พื้นที่ห่างไกล )</span>    
            </div>
          </div>
          <div v-else>
            <span class="ml-3 text-green-500">( ส่งฟรี )</span>    
          </div>
        </div>
        <div
          class="flex w-full justify-start items-center px-5 pb-3 text-sm"
        >
          <div class="text-center sm:text-right sm:w-10/12">รวมยอดชำระทั้งสิ้น :</div>
          <div class="text-right ml-3">
            {{ (total.alltotal + (shippingCost+tracking_price) - discount.dis)?.toLocaleString("en", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) }}
          </div>
        </div>

        <div
          class="flex flex-col gap-y-3 w-full px-5 pb-5 items-center border-t pt-3"
        >
          <div class="md:w-2/12 text-base text-[#8B2FC9]">
            ชำระเงินโดย
          </div>
          <div class="w-full p-2 border border-purple-600 rounded">
            <div class="flex justify-between items-center">
              <div class="flex items-center gap-3 border-r pr-3 border-r-purple-500">
                <i class="pi pi-wallet text-4xl text-purple-600"></i>
                <p class="text-lg font-bold text-purple-600">E-wallet</p>
              </div>
              <p class="text-lg text-purple-500">
                ฿ {{
                  parseFloat(userdata.ewallet || 0).toLocaleString("en", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                }}
              </p>
            </div>
          </div>
          <div class="hidden">
            <!-- ปุ่มเลือกประเภทชำระเงิน   QR พร้อมเพย์ , เก็บเงินปลายทาง  -->
            <button
              @click="choosepayment('บัญชีธนาคาร')"
              class="mx-2 hidden text-sm leading-none py-4 px-3 border hover:border-[#8B2FC9] hover:text-[#8B2FC9] focus:outline-none"
              :class="
                payment == 'บัญชีธนาคาร'
                  ? 'border-[#8B2FC9] text-[#8B2FC9]'
                  : 'border-gray-200 text-[#000]'
              "
            >
              บัญชีธนาคาร
            </button>

            <button
              @click="choosepayment('cod')"
              class="mx-2 text-sm hidden leading-none py-4 px-3 border hover:border-[#8B2FC9] hover:text-[#8B2FC9] focus:outline-none"
              :class="
                payment == 'cod'
                  ? 'border-[#8B2FC9] text-[#8B2FC9]'
                  : 'border-gray-200 text-[#000]'
              "
            >
              เก็บเงินปลายทาง
            </button>

            <button
              @click="choosepayment('ewallet')"
              class="mx-2 rounded text-sm leading-none py-4 px-3 border hover:border-[#8B2FC9] focus:outline-none"
              :class="
                payment == 'ewallet'
                  ? 'border-[#8B2FC9] bg-purple-400 text-white'
                  : 'border-gray-200 text-[#000]'
              "
            >
              E-wallet
            </button>
          </div>
        </div>
        <div
          class="w-full p-5 text-xs sm:text-base justify-center md:justify-normal hidden"
          v-if="payment == 'ewallet'"
        >
          <div class="font-bold">ชำระโดย E-wallet</div>
          <div class="flex items-center gap-3">
            เงินในกระเป๋า :
            {{
              parseFloat(userdata.ewallet).toLocaleString("en", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }}
          </div>
          ยอดชำระ :
          <span class="text-red-500"
            >(-{{
              (total.alltotal + (shippingCost+tracking_price) - discount.dis)?.toLocaleString("en", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }})</span
          >
          <br />
          คงเหลือ :
          <span class="">{{
            (parseFloat(userdata.ewallet) - (total.alltotal + (shippingCost+tracking_price) - discount.dis)).toLocaleString(
              "en",
              { minimumFractionDigits: 2, maximumFractionDigits: 2 }
            )
          }}</span
          ><br />
          <span
            v-if="parseFloat(userdata.ewallet) - (total.alltotal + (shippingCost+tracking_price) - discount.dis) < 0"
            class="text-red-500"
            >* ยอดเงินในกระเป๋าไม่เพียงพอ กรุณาเติมเงินก่อนสั่งซื้อ</span
          ><br />
          <button
            v-if="parseFloat(userdata.ewallet) - (total.alltotal + (shippingCost+tracking_price) - discount.dis) < 0"
            type="button"
            class="border py-1 px-2"
            @click="$router.push('/customer/deposithistory')"
          >
            เติมเงิน wallet
          </button>
        </div>

        <div
          class="flex w-full justify-center items-center px-5 pb-2 gap-1"
        >
          <div class="text-center">
            ยอดชำระทั้งสิ้น :
          </div>
          <div class="text-right text-2xl text-[#8B2FC9]">
            ฿{{
              (total.alltotal + (shippingCost+tracking_price) - discount.dis)?.toLocaleString("en", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }}
          </div>
        </div>
        <div
          class="flex w-full justify-center items-center px-5 pb-8 gap-1"
        >
          <div class="text-center sm:text-right sm:w-10/12">
            PV รวมทั้งหมด :
          </div>
          <div class="text-right sm:w-2/12 text-xl text-green-600">
            {{
              total.allpv?.toLocaleString("en", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }}
          </div>
        </div>

        <div
          v-if="payment === 'บัญชีธนาคาร'"
          class="flex flex-col gap-2 p-2 bg-yellow-200"
        >
          <p class="font-bold">กรุณาแนบหลักฐานการชำระเงิน</p>
          <div class="border-2 border-dashed p-2 border-[#8B2FC9]">
            <input id="paymentSlip" type="file" />
          </div>
          <div class="flex justify-between">
            <label for="paymentAmount">ยอดชำระ</label>
            <input id="paymentAmount" type="number" class="border px-2" />
            <span>บาท</span>
          </div>
          <div class="flex justify-between">
            <label for="paymentDate">เวลาที่ชำระ</label>
            <input id="paymentDate" type="datetime-local" class="border px-2" />
          </div>
        </div>

        <div
          class="w-full flex flex-col gap-y-4 items-center border-y p-5 border-dashed bg-purple-600 text-white"
          v-if="canPaid"
        >
          <div class="w-full text-sm flex gap-2">
            <Checkbox :binary="true" v-model="acceptedTerm" />
            <p>ฉันได้ตรวจสอบข้อมูลการสั่งซื้อแล้ว และยืนยันคำสั่งซื้อ</p>
          </div>
          <div class="w-full text-center md:text-right">
            <button
              @click="addOrderPartner"
              :disabled="!acceptedTerm"
              :class="
                !acceptedTerm
                  ? 'opacity-50 bg-gray-300'
                  : 'bg-green-500  hover:bg-green-600'
              "
              class="leading-none text-white py-4 px-10 focus:ring-2 focus:ring-offset-2 focus:ring-[#8B2FC9] focus:outline-none"
            >
              สั่งสินค้า
            </button>
          </div>
        </div>
        <div
          class="w-full flex flex-col gap-y-1 items-center border-y p-5 border-dashed bg-red-600 text-white"
          v-else
        >
          <p>ไม่สามารถทำรายการสั่งซื้อนี้ได้</p>
          <p>กรุณาตรวจสอบยอด E-wallet ของท่าน</p>
          <Button icon="pi pi-plus" label="เติมเงิน" @click="$router.push('/customer/deposithistory')" class="bg-white text-purple-500 px-3 py-2" />
        </div>
        
      </div>
    </div>
  </div>

  <Dialog
    v-model:visible="dialogdelivery"
    :closable="false"
    :style="{ width: '40rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <template #header>
      <div
        class="flex justify-between items-center pb-2 border-b border-gray-200 w-full"
      >
        <div class="text-lg font-semibold">ที่อยู่ของฉัน</div>
      </div>
    </template>
    <div>
      <div class="w-full">
        <div class="min-h-[350px] max-h-[350px] overflow-y-auto">
          <div>
            <div class="flex" v-for="item in delivery" :key="item._id">
              <div class="w-auto p-2 mt-1">
                <input
                  type="radio"
                  v-model="radiodelivery"
                  :value="item"
                  v-if="addressdelivery._id == item._id"
                  checked
                />
                <input
                  type="radio"
                  v-model="radiodelivery"
                  :value="item"
                  v-else
                />
              </div>
              <div class="w-full p-2">
                <div>
                  <span class="font-bold text-sm">{{
                    "(" + item.name + ") " + item.namedelivery
                  }}</span>
                  | {{ item.telephone }}
                </div>
                <div class="text-xs mt-1">
                  {{
                    item.address +
                    " " +
                    item.tambon +
                    " " +
                    item.amphure +
                    " " +
                    item.province +
                    " " +
                    item.zipcode
                  }}
                </div>
              </div>
              <div class="w-auto p-2">
                <button
                  class="text-[#8B2FC9] font-bold hover:underline"
                  @click="openfromdelivery('edit', item)"
                >
                  แก้ไข
                </button>
              </div>
            </div>
          </div>
          <div class="pl-2">
            <button
              @click="openfromdelivery('add', item)"
              :disabled="isLoading"
              class="mt-4 font-semibold leading-none text-[#8B2FC9] text-xs sm:text-sm py-3 px-5 border border-[#8B2FC9] hover:bg-[#8B2FC9] hover:text-white focus:ring-2 focus:ring-offset-2 focus:ring-[#8B2FC9] focus:outline-none"
            >
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="hover:text-[#fff]"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <div class="w-full h-full">เพิ่มที่อยู่ใหม่</div>
              </div>
            </button>
          </div>
        </div>
        <div
          class="flex items-center justify-center w-full border-t border-gray-200 gap-2 text-xs sm:text-base"
        >
          <button
            @click="selecteddelivery()"
            :disabled="isLoading"
            class="mt-4 font-semibold leading-none text-white py-4 px-10 bg-[#8B2FC9] rounded-lg hover:bg-[#E178C5] focus:ring-2 focus:ring-offset-2 focus:ring-[#8B2FC9] focus:outline-none"
          >
            ยืนยัน
          </button>
          <button
            @click="dialogdelivery = false"
            :disabled="isLoading"
            class="mt-4 font-semibold leading-none text-[#ff3d32] py-4 px-10 border border-[#ff3d32] rounded-lg hover:bg-[#ff3d32] hover:text-white focus:ring-2 focus:ring-offset-2 focus:ring-[#ff3d32] focus:outline-none"
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  </Dialog>

  <Dialog
    v-model:visible="dialogfromdelivery"
    :style="{ width: '30rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <template #header>
      <div class="flex justify-between items-center">
        <div class="text-lg font-semibold">{{ headformdelivery }}</div>
      </div>
    </template>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
      <div class="col-span-full">
        <label class="block text-sm font-medium text-gray-700">ชื่อเรียก</label>
        <input
          v-model="fromdelivery.name"
          type="text"
          placeholder="กรุณากรอกชื่อเรียก เช่น บ้าน , ที่ทำงาน"
          class="mt-1 p-1.5 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
        />
      </div>
      <div class="col-span-full">
        <label class="block text-sm font-medium text-gray-700"
          >ชื่อผู้รับ</label
        >
        <input
          v-model="fromdelivery.namedelivery"
          type="text"
          placeholder="กรุณากรอกชื่อผู้รับ"
          class="mt-1 p-1.5 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
        />
      </div>
      <div class="col-span-full">
        <label class="block text-sm font-medium text-gray-700">เบอร์โทร</label>
        <input
          v-model="fromdelivery.telephone"
          placeholder="กรุณาเบอร์โทรศัพท์"
          type="text"
          class="mt-1 p-1.5 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
        />
      </div>
      <div class="col-span-full">
        <label class="block text-sm font-medium text-gray-700">ที่อยู่</label>
        <input
          v-model="fromdelivery.address"
          type="text"
          placeholder="กรุณาที่อยู่"
          class="mt-1 p-1.5 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >จังหวัด</label
        >
        <Dropdown
          v-model="fromdelivery.province"
          :options="optionprovince"
          optionLabel="name_th"
          optionValue="name_th"
          placeholder="กรุณาเลือกจังหวัด"
          class="w-full border focus:outline-none"
          @change="chooseprovice()"
          filter
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >อำเภอ</label
        >
        <Dropdown
          v-model="fromdelivery.amphure"
          :options="optionamphure"
          optionLabel="name_th"
          optionValue="name_th"
          placeholder="กรุณาเลือกอำเภอ"
          class="w-full border focus:outline-none"
          @change="chooseamphure()"
          filter
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">ตำบล</label>
        <Dropdown
          v-model="fromdelivery.tambon"
          :options="optiontambon"
          optionLabel="name_th"
          optionValue="name_th"
          placeholder="กรุณาเลือกตำบล"
          class="w-full border focus:outline-none"
          @change="choosetambon()"
          filter
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700"
          >รหัสไปรษณีย์</label
        >
        <input
          v-model="fromdelivery.zipcode"
          type="text"
          class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
        />
      </div>
    </div>
    <div
      class="flex items-center justify-center w-full text-xs sm:text-base gap-2"
    >
      <button
        @click="
          headformdelivery == 'เพิ่มที่อยู่ใหม่'
            ? addnewaddress()
            : editnewaddress()
        "
        :disabled="isLoading"
        class="mt-9 font-semibold leading-none text-white py-4 px-10 bg-[#8B2FC9] rounded-lg hover:bg-[#E178C5] focus:ring-2 focus:ring-offset-2 focus:ring-[#8B2FC9] focus:outline-none"
      >
        บันทึก
      </button>
      <button
        @click="backdeilvery()"
        :disabled="isLoading"
        class="mt-9 font-semibold leading-none text-white py-4 px-10 bg-[#ff3d32] rounded-lg hover:bg-[#ff6259] focus:ring-2 focus:ring-offset-2 focus:ring-[#8B2FC9] focus:outline-none"
      >
        ยกเลิก
      </button>
    </div>
  </Dialog>
</template>
<script setup>
import axios from "axios";
import Swal from "sweetalert2";
import { ref, onMounted, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { parse } from "vue/compiler-sfc";

const store = useStore();
const router = useRouter();
const isLoading = ref(false);
const token = ref("Bearer " + localStorage.getItem("token"));
const acceptedTerm = ref(false);
const route = useRoute();
const partnerId = ref(route.query.partner_id);

const newAddress = ref({});

const addressType = ref("system");

const reload = () => {
  window.location.reload();
}

onMounted(async () => {
  if (!partnerId.value) {
    router.push('/');
  }
  document.title = "สั่งซื้อ || MDK มารวยด้วยกัน";
  isLoading.value = true;
  await Promise.all([
    await getData(),
    await getstore(),
    await getprovince(),
    await getAmphures(),
    await getTambons(),
    //await getMyAddress();
    await getAddressDelevery()
  ])
  if (!myFormatAddress.value?.province) {
    addressType.value = "newAddress";
  }
  isLoading.value = false;
});

const canPaid = computed(() => {
  const userWallet = parseFloat(userdata.value.ewallet || 0)
  const toPaid = total.value.alltotal + (shippingCost.value+tracking_price.value) - discount.value.dis
  const result =
    userWallet >= toPaid
    ? true : false
  return result
})

const tracking_price = ref(0)

const getShippingPrice = async (zipcode) => {
    try {
        const { data } = await axios.get(`${process.env.VUE_APP_MARUEY}shipping/far/${zipcode}`)
        //console.log(data)
        if (data.status) {
            tracking_price.value = data.price
        }
    }
    catch(err) {
        //console.log(err)
    }
}

watchEffect(() => {
    if(addressType.value !== 'system' && newAddress.value.zipcode) {
        getShippingPrice(newAddress.value.zipcode)
    }
})

const discount = computed(() => {
    const pv_upgrade = store.getters.me?.pv_upgrad || 0;
    const pv_total = total.value.allpv || 0
    let dis = 0
    let bonus = 0
    if (pv_upgrade >= 1200) {
        dis = parseFloat((pv_total* 50/100).toFixed(2))
        bonus = 50
    } else {
        dis = Math.floor(pv_total* 30/100)
        bonus = 30
    }

    return {
        dis,
        bonus
    }
})

const addressDelivery = ref({});

const getAddressDelevery = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.VUE_APP_MARUEY}${store.getters.me?.id}/delivery`
    );
    //console.log(data);
    addressDelivery.value = data.data.reverse()[0] || [];
    getShippingPrice(addressDelivery.value.zipcode)
    const address = {
      address: addressDelivery.value.address,
      moo: addressDelivery.value.moo,
      road: addressDelivery.value.road,
      soi: addressDelivery.value.soi,
      province: optionprovince.value.find(
        (x) => x.code + "" === addressDelivery.value.province+""
      )?.name_th,
      province_id: optionprovince.value.find(
        (x) => x.code + "" === addressDelivery.value.province+""
      )?.id,
      amphure: optionamphure.value.find(
        (x) => x.code+"" === addressDelivery.value.district+""
      )?.name_th,
      amphure_id: optionamphure.value.find(
        (x) => x.code + "" === addressDelivery.value.district + ""
      )?.id,
      tambon: optiontambon.value.find((x) => x.id+"" === addressDelivery.value.tambon+"")
        ?.name_th,
      tambon_id: optiontambon.value.find((x) => x.id+"" === addressDelivery.value.tambon+"")
        ?.id,
      zipcode: addressDelivery.value.zipcode,
    };
    myFormatAddress.value = address;
    myFormatAddress.value.name = userdata.value.name
    myFormatAddress.value.phone = userdata.value.phone
    console.log(myFormatAddress.value);
  } catch (err) {
    //console.log(err);
  }
};

const total = ref({
  totalprice: 0,
  totaldelivery: 0,
  totaldiscount: 0,
  totalmaruaycoins: 0,
  alltotal: 0,
});
const partner_id = ref([]);
const getstore = async () => {
  partner_id.value = [];
  const product = store.getters.cart?.filter(p => p.product_store === 'partner' && p.product_partner_id === partnerId.value);

  if (product.length == 0) {
    return;
  }

  // นำสินค้า มาหา ว่าเป็นของเจ้าไหนบ้าง
  // ถ้า store มีสินค้า  product_store = Maruay  ให้ + เพิ่ม อีก 1 เจ้า
  const Partner = product.find((item) => item.product_store === "partner");
  // เช็ค product_partner_id ว่ามีกี่ เจ้า

  if (Partner) {
    partner_id.value.push({
      partner_id: Partner.product_partner_id,
      partner_name: Partner.product_partner_name,
    });
  }

  //เอาสินค้าไปใส่ไว้เจ้า ที่ตัวเองมีสินค้า
  product.forEach((element) => {
    if (element.product_store == "partner") {
      const find = partner_id.value.findIndex(
        (item) => item.partner_id == element.product_partner_id
      );
      if (find != -1) {
        partner_id.value[find].product = product.filter(
          (item) =>
            item.product_partner_id == partner_id.value[find].partner_id
        );
        partner_id.value[find].product = partner_id.value[find].product.map(
          (item) => {
            return {
              product_id: item.product_id, //(รหัสสินค้า)
              product_image: item.product_image, //(รูปสินค้า)
              product_name: item.product_name, //(ชื่อสินค้า)
              product_store: item.product_store, //(เป็นคลังของใคร)
              product_stock: item.product_stock, //(สต็อกสินค้า)
              sharelinkcode: item.sharelinkcode, //(รหัสคนแชร์ลิงค์)
              promotioncode: item.promotioncode, //(รหัสโปรโมชั่น)
              product_price: item.product_price, //(ราคาสินค้า)
              product_qty: item.product_qty, //(จำนวน)
              product_totalprice: item.product_price * item.product_qty, //(ราคารวม)
              product_totalpv: item.product_pv * item.product_qty, //(ราคารวม)
            };
          }
        );
      }
    }

    if (element.product_store !== "partner") {
      const find = partner_id.value.findIndex(
        (item) =>
          item?.partner_id == null &&
          item?.partner_name == "บริษัท มารวยด้วยกัน จำกัด"
      );
      if (find != -1) {
        partner_id.value[find].product = product.filter(
          (item) => item.product_store !== "partner"
        );
        partner_id.value[find].product = partner_id.value[find].product.map(
          (item) => {
            return {
              product_id: item.product_id, //(รหัสสินค้า)
              product_image: item.product_image, //(รูปสินค้า)
              product_name: item.product_name, //(ชื่อสินค้า)
              product_store: item.product_store, //(เป็นคลังของใคร)
              product_stock: item.product_stock, //(สต็อกสินค้า)
              sharelinkcode: item.sharelinkcode, //(รหัสคนแชร์ลิงค์)
              promotioncode: item.promotioncode, //(รหัสโปรโมชั่น)
              product_price: item.product_price, //(ราคาสินค้า)
              product_qty: item.product_qty, //(จำนวน)
              product_totalprice: item.product_price * item.product_qty, //(ราคารวม)
              product_totalpv: item.product_pv * item.product_qty, //(ราคารวม)
            };
          }
        );
      }
    }
  });

  // total ของ สินค้าทั้งหมด
  total.value.totalprice = product.reduce(
    (acc, item) => acc + item.product_totalprice,
    0
  );
  total.value.allpv = product.reduce(
    (acc, item) => acc + item.product_pv * item.product_qty,
    0
  );
  total.value.alltotal = total.value.totalprice;

  // //console.log(partner_id.value);
};

const userdata = ref({});
const addressdelivery = ref({});
const getData = async () => {
  await getUserProfile()
  userdata.value = store.getters.me;
};

const getUserProfile = async () => {
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
          }
        }
      }
      catch(err) {
        //console.log(err)
      }
}

function fc_shipping(pv) {
    if (pv === 0) {
        return 0;
    }

    if (pv < 400) {
        if (pv >= 200) {
            return 35;
        } else {
            return 45;
        }
    } else {
        const shipping = pv % 400;

        if (shipping === 0) {
            return 0;
        } else if (shipping >= 20 && shipping <= 40) {
            return 0;
        } else if (shipping >= 200) {
            return 35;
        } else {
            return 45;
        }
    }
}

const shippingCost = computed(() => {
  //return fc_shipping(total.value.allpv);
  return 0;
})

const dialogdelivery = ref(false);
const delivery = ref([]);
const fromdelivery = ref({
  name: "",
  namedelivery: "",
  telephone: "",
  address: "",
  tambon: "",
  amphure: "",
  province: "",
  zipcode: "",
});
const opendialogdelivery = async () => {
  delivery.value = userdata.value.addressdelivery;
  radiodelivery.value = addressdelivery.value;
  dialogdelivery.value = true;
};
const radiodelivery = ref("");
const selecteddelivery = async () => {
  addressdelivery.value = radiodelivery.value;
  dialogdelivery.value = false;
};
const dialogfromdelivery = ref(false);

const headformdelivery = ref("");
const openfromdelivery = async (type, item) => {
  if (type == "add") {
    fromdelivery.value = {
      name: "",
      namedelivery: "",
      telephone: "",
      address: "",
      tambon: "",
      amphure: "",
      province: "",
      zipcode: "",
    };
    headformdelivery.value = "เพิ่มที่อยู่ใหม่";
  } else {
    fromdelivery.value = { ...item };
    headformdelivery.value = "แก้ไขที่อยู่";
  }
  dialogdelivery.value = false;
  dialogfromdelivery.value = true;
};

//จังหวัด
const optionprovince = ref([]);
const optionamphure = ref([]);
const optiontambon = ref([]);

const quantity = computed(() => {
  const products_qty =
    store.getters.cart?.map((x) => {
      return x.product_qty;
    }) || [];
  let result = products_qty.reduce((a, b) => a + b, 0);
  return result;
});

const addnewaddress = async () => {
  const result = await Swal.fire({
    text: "คุณต้องการเพิ่มที่อยู่ใหม่หรือไม่?",
    icon: "question",
    iconColor: "#8B2FC9",
    showCancelButton: true,
    confirmButtonColor: "#8B2FC9",
    cancelButtonColor: "#E85D40",
    confirmButtonText: "ยืนยัน",
    cancelButtonText: "ยกเลิก",
  });
  if (result.isConfirmed) {
    isLoading.value = true;
    const config = {
      method: "put",
      headers: {
        token: token.value,
      },
      data: { addressdelivery: fromdelivery.value },
      url: `${process.env.VUE_APP_MARUEY}customer/addressdelivery/${store.getters._id}`,
    };
    await axios(config)
      .then(async (res) => {
        if (res.data?.status === true) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "เพิ่มข้อมูลที่อยู่ใหม่สำเร็จ",
            showConfirmButton: false,
            timer: 1500,
          });
          await getData();
          dialogfromdelivery.value = false;
          await opendialogdelivery();
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "เพิ่มข้อมูลที่อยู่ใหม่ไม่สำเร็จ",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "เพิ่มข้อมูลที่อยู่ใหม่ไม่สำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    isLoading.value = false;
  }
};

const editnewaddress = async () => {
  const result = await Swal.fire({
    text: "คุณต้องการแก้ไขที่อยู่หรือไม่?",
    icon: "question",
    iconColor: "#8B2FC9",
    showCancelButton: true,
    confirmButtonColor: "#8B2FC9",
    cancelButtonColor: "#E85D40",
    confirmButtonText: "ยืนยัน",
    cancelButtonText: "ยกเลิก",
  });
  if (result.isConfirmed) {
    isLoading.value = true;
    const config = {
      method: "put",
      headers: {
        token: token.value,
      },
      data: { addressdelivery: fromdelivery.value },
      url: `${process.env.VUE_APP_MARUEY}customer/addressdelivery/edit/${store.getters._id}`,
    };
    await axios(config)
      .then(async (res) => {
        if (res.data?.status === true) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "แก้ไขข้อมูลที่อยู่สำเร็จ",
            showConfirmButton: false,
            timer: 1500,
          });
          await getData();
          dialogfromdelivery.value = false;
          await opendialogdelivery();
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "แก้ไขข้อมูลที่อยู่ไม่สำเร็จ",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "แก้ไขข้อมูลที่อยู่ไม่สำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    isLoading.value = false;
  }
};

const backdeilvery = async () => {
  dialogfromdelivery.value = false;
  dialogdelivery.value = true;
};

const payment = ref("ewallet");
const choosepayment = async (type) => {
  payment.value = type;
};

const tracking_type = ref("Kerry");

const addOrderPartner = async () => {
  const result = await Swal.fire({
    text: "คุณต้องการสั่งซื้อออเดอร์นี้ใช่หรือไม่?",
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
    let data = {};
    if (addressType.value === "system") {
      data = {
        to_address: {...myFormatAddress.value},
        buyer_id: userdata.value.id,
        buyer_username: userdata.value.user_name,
        
        shop_id: partnerId.value,
        //shop_username: "",

        line_product: product_id_fk.value,
        //total_qty: product_amt.value,
        total_qty: quantity.value,
        total_product_price: total.value.totalprice,
        total_discount: discount.value.dis,
        bill_discount: discount.value.dis,
        transfer_method: 'delivery',
        delivery_provider: tracking_type.value,
        delivery_price: tracking_price.value,
        net_price: total.value.alltotal - discount.value.dis,
        total_pv: total.value.allpv,
      };
    } else {
      data = {
        to_address: {...newAddress.value},

        buyer_id: userdata.value.id,
        buyer_username: userdata.value.user_name,
        
        shop_id: partnerId.value,
        //shop_username: "",

        line_product: product_id_fk.value,
        //total_qty: product_amt.value,
        total_qty: quantity.value,
        total_product_price: total.value.totalprice,
        total_discount: discount.value.dis,
        bill_discount: discount.value.dis,
        transfer_method: 'delivery',
        delivery_provider: tracking_type.value,
        delivery_price: tracking_price.value,
        net_price: total.value.alltotal - discount.value.dis,
        total_pv: total.value.allpv,
      };
    }

    const config = {
      method: "post",
      data: data,
      url: `${process.env.VUE_APP_MARUEY}order/partner/create`,
    };
    await axios(config)
      .then(async (res) => {
        if (res.data?.status) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "สั่งซื้อสำเร็จ",
            showConfirmButton: false,
            timer: 1500,
          });
          ////console.log(res.data);
          store.commit("clearCartPartner", partnerId.value);
          router.push(`/order/successful/1`);
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "สั่งซื้อไม่สำเร็จ",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        //console.log(err);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "สั่งซื้อไม่สำเร็จ",
          text: err.response?.data?.message ? err.response.data?.message : "เกิดข้อผิดพลาดบางประการ",
          showConfirmButton: true,
          //timer: 1500,
        });
      });
    isLoading.value = false;
  }
};

const myFormatAddress = ref({});

const product_id_fk = computed(() => {
  let result = [];
  const products = partner_id.value[0]?.product || [];
  result = products;
  return result;
});

const product_amt = computed(() => {
  const products =
    store.getters.cart?.map((x) => {
      return {
        [x.product_id]: x.product_qty,
      };
    }) || [];
  return products;
});

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
const optionamphures = computed(() => {
  const result = optionamphure.value.filter(
    (x) => x.changwat_id + "" === newAddress.value.province?.id + ""
  );
  return result;
});
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
const optiontambons = computed(() => {
  const result = optiontambon.value.filter(
    (x) => x.amphure_id + "" === newAddress.value.amphure?.id + ""
  );
  return [...new Set(result)];
});
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

const getZipCode = () => {
  newAddress.value.zipcode = newAddress.value.tambon?.zip_code;
};
</script>

<style>
input[type="radio"] {
  width: 15px;
  height: 15px;
  accent-color: #8b2fc9;
}
</style>
<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

@import "@/assets/Loading.css";
</style>
