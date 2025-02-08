<template>
  <Sidebar
    v-model:visible="isLoading"
    header=" "
    position="bottom"
    style="height: 100%"
    :showCloseIcon="false"
    class="!bg-gradient-to-br from-[#745abd] to-[#9540ce]"
  >
    <div class="text-white flex justify-center items-center mt-20">
      <div class="text-center flex flex-col items-center gap-3">
        <div class="loader my-10"></div>
        <p class="text-xl opacity-50">กรุณารอซักครู่ . . .</p>
      </div>
    </div>
  </Sidebar>
  <ScrollTop
    :threshold="100"
    icon="pi pi-arrow-up"
    :pt="{
      root: 'w-2rem h-2rem border-round-sm bg-black/80 -translate-y-14',
      icon: {
        class: 'text-base',
      },
    }"
  />

  <div v-if="partner_products.length">
    <div
      v-if="!closeServerMLM && !closeServerMain"
      class="h-full mt-[4.5rem] pb-12"
    >
      <div class="flex w-full pt-5 pb-2 px-4 bg-[#8B2FC9]">
        <div
          v-if="store.getters._id && store.getters._id != ''"
          class="w-full flex items-center justify-between"
        >
          <div class="flex flex-col items-center relative">
            <Knob
              :max="10000"
              valueColor="#facc15"
              :strokeWidth="18"
              textColor="white"
              rangeColor="white"
              :size="60"
              v-model="userData.pv_upgrad"
              :valueTemplate="`${userData?.pv_upgrad || '???'}`"
              readonly
            />
            <span class="text-white text-[0.50rem] absolute bottom-0 text-center"
              >PV <i class="pi pi-arrow-up text-[0.50rem]"></i
            ></span>
          </div>

          <div class="flex gap-1 ml-3">
            <div
              class="px-2 flex gap-2 items-center py-1 shadow rounded bg-gradient-to-br from-yellow-400 to-yellow-600"
            >
              <i class="text-white pr-2 text-sm border-r">PV</i>
              <span class="text-white w-16 truncate text-right">{{
                userData?.pv?.toLocaleString()
              }}</span>
            </div>
            <div
              class="px-2 flex gap-2 items-center py-1 shadow rounded bg-gradient-to-br from-emerald-500 to-emerald-700"
            >
              <i class="pi pi-wallet text-white pr-2 border-r"></i>
              <span class="text-white w-16 truncate text-right">{{
                userData?.ewallet || "0.00"
              }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full pb-5 bg-[#9540ce]">
        <div class="md:mx-auto text-center">
          <img src="@/assets/images/banner.png" class="w-full" alt="" />
        </div>
      </div>
      <div class="py-5 pl-2">
        <div class="flex w-full gap-2 overflow-x-auto">
          <button
            v-for="category in categories"
            :key="category.id"
            type="button"
            class="border px-2 py-1 flex gap-1 min-w-fit"
            @click="selectedCategory = category.category_id"
            :class="[
              category.category_id === selectedCategory
                ? 'font-bold text-purple-600 border-purple-600'
                : '',
            ]"
          >
            <img
              v-if="category.category_icon"
              :src="category.category_icon"
              :alt="category.category_name"
              width="20"
            />
            <span class="min-w-fit">{{ category.category_name }}</span>
          </button>
        </div>
      </div>

      <div class="w-full px-5">
        <!-- max-w-md   mx-auto-->
        <div class="relative">
          <input
            type="search"
            autocomplete="off"
            id="default-search"
            class="block w-full px-4 py-2 text-sm text-[#000] border rounded bg-white border-[#8B2FC9] placeholder-[#000] focus:border-blue-500 focus:ring-blue-500"
            placeholder="ค้นหาสินค้า"
            v-model="searchQuery"
          />
          <button
            @click="linksearch()"
            class="text-white absolute hidden end-2.5 bottom-1.5 bg-[#8B2FC9] hover:bg-[#E178C5] focus:ring-2 focus:outline-none focus:ring-[#DC97FF] font-medium rounded text-sm px-4 py-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          <button
            v-if="searchQuery && searchQuery?.trim() !== ''"
            class="absolute right-20 bg-gray-500 rounded-full flex items-center p-1 text-white top-1/2 -translate-y-1/2"
            type="button"
            @click="clearSearch"
          >
            <i class="pi pi-times"></i>
          </button>
        </div>
      </div>

      <div
        class="h-full w-full pb-20 bg-gradient-to-r from-[#E178C5] to-[#8B2FC9]"
      >
        <!--partner-->
        <div class="mt-5">
          <!--recomend-->
          <div>
            <div
              class="bg-white py-2 text-purple-500 text-center font-medium text-xl"
            >
              สินค้าแนะนำ
            </div>
            <div
              class="pb-2 !border-0 bg-gradient-to-r from-[#E178C5] to-[#8B2FC9]"
            >
              <swiper
                :watchSlidesProgress="true"
                :slidesPerView="2.5"
                class="mySwiper !border-0"
              >
                <swiper-slide
                  class="text-center flex flex-col text-xs sm:text-base"
                  v-for="product in partner_products"
                  :key="product._id"
                  @click="selectProductPartnerHandle(product)"
                >
                  <div
                    class="md:shrink-0 border relative"
                    @click="linkproduct(product._id)"
                  >
                    <img
                      :src="getImage(product.images[0]?.path)"
                      class="h-36 w-full object-cover"
                      v-if="product.images?.length"
                    />

                    <img
                      src="@/assets/images/logo.jpg"
                      class="h-36 w-full object-cover"
                      v-else
                    />
                    <div
                      v-if="product?.discount > 0"
                      class="px-2 absolute top-1 left-1 bg-gradient-to-r from-[#ff6d6d] to-[#d61b1b] text-white shadow text-sm"
                    >
                      ลดราคา
                    </div>
                    <div
                      class="px-2 absolute bottom-5 right-1 rounded-xl bg-yellow-500 text-white shadow text-sm"
                    >
                      PV {{ product?.pv || 0 }}
                    </div>
                    <p class="px-2 bg-white text-black/80 text-xs truncate">
                      {{ product?.category }}
                    </p>
                  </div>
                  <div class="border px-2 bg-white">
                    <div
                      class="pt-1 text-sm text-left line-clamp-1 text-purple-600"
                      @click="linkproduct(product._id)"
                    >
                      {{ product.name }}
                    </div>
                    <div class="text-xs text-gray-500 line-clamp-1 text-left">
                      {{ product.description }}
                    </div>

                    <div
                      class="hidden items-center py-2"
                      @click="linkproduct(product._id)"
                    >
                      <div class="flex">
                        <div v-for="starIndex in 5" :key="starIndex">
                          <svg
                            class="w-4 h-4 md:w-5 md:h-5 text-yellow-300"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                            v-if="product?.stars >= starIndex"
                          >
                            <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            ></path>
                          </svg>

                          <svg
                            class="w-[15px] h-[15px] md:w-[20px] md:h-[20px] border border-[#fff]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            v-else
                          >
                            <polygon
                              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                            ></polygon>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div class="pb-2 flex justify-between items-center">
                      <div class="text-sm flex items-center gap-1">
                        <span
                          v-if="product?.discount > 0"
                          class="line-through text-gray-500 text-xs"
                          >{{
                            parseFloat(
                              product?.raw_price?.toFixed(2)
                            )?.toLocaleString()
                          }}</span
                        >
                        <span
                          >฿
                          {{
                            parseFloat(
                              product?.selling_price?.toFixed(2)
                            )?.toLocaleString()
                          }}</span
                        >
                      </div>
                      <div class="text-right text-sm">
                        <button
                          v-if="
                            !checkItemAlreadyAdd(product._id) &&
                            product.partner_id !== userData.shop_partner?._id
                          "
                          class="bg-[#8B2FC9] hover:bg-[#6818A5] rounded-md p-1.5 sm:p-2 text-[#fff]"
                        >
                          <div class="flex items-center justify-center">
                            <div class="text-xs">
                              <i class="pi pi-shopping-cart"></i>
                            </div>
                          </div>
                        </button>

                        <button
                          v-else-if="
                            product.partner_id === userData.shop_partner?._id
                          "
                          class="rounded-md p-1.5 sm:p-2 text-purple-500 cursor-default"
                        >
                          <div class="flex items-center justify-center">
                            <div class="text-xs py-0.5">ร้านของฉัน</div>
                          </div>
                        </button>
                        <button
                          v-else
                          class="rounded-md p-1.5 sm:p-2 text-green-500 cursor-default"
                        >
                          <div class="flex items-center justify-center">
                            <div class="text-xs"><i class="pi pi-check"></i></div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </swiper-slide>
              </swiper>
            </div>
          </div>

          <!--recomend-->
          <div class="">
            <div
              class="bg-gradient-to-r from-red-500 to-yellow-500 py-2 text-white text-center font-medium text-xl rounded-t-xl"
            >
              สินค้าราคาพิเศษ
            </div>
            <div
              class="pb-2 !border-0 bg-gradient-to-r from-red-500 to-yellow-500"
            >
              <swiper
                :watchSlidesProgress="true"
                :slidesPerView="
                  partner_products.filter((item) => item.discount > 0)?.length > 2
                    ? 2.5
                    : 2
                "
                class="mySwiper !border-0"
              >
                <swiper-slide
                  class="text-center flex flex-col text-xs sm:text-base"
                  v-for="product in partner_products.filter(
                    (item) => item.discount > 0
                  )"
                  :key="product._id"
                  @click="selectProductPartnerHandle(product)"
                >
                  <div
                    class="md:shrink-0 border relative"
                    @click="linkproduct(product._id)"
                  >
                    <img
                      :src="getImage(product.images[0]?.path)"
                      class="h-36 w-full object-cover"
                      v-if="product.images?.length"
                    />

                    <img
                      src="@/assets/images/logo.jpg"
                      class="h-36 w-full object-cover"
                      v-else
                    />
                    <div
                      v-if="product?.discount > 0"
                      class="px-2 absolute top-1 left-1 bg-gradient-to-r from-[#ff6d6d] to-[#d61b1b] text-white shadow text-sm"
                    >
                      ลดราคา
                    </div>
                    <div
                      class="px-2 absolute bottom-5 right-1 rounded-xl bg-yellow-500 text-white shadow text-sm"
                    >
                      PV {{ product?.pv || 0 }}
                    </div>
                    <p class="px-2 bg-white text-black/80 text-xs truncate">
                      {{ product?.category }}
                    </p>
                  </div>
                  <div class="border px-2 bg-white">
                    <div
                      class="pt-1 text-sm text-left line-clamp-1 text-purple-600"
                      @click="linkproduct(product._id)"
                    >
                      {{ product.name }}
                    </div>
                    <div class="text-xs text-gray-500 line-clamp-1 text-left">
                      {{ product.description }}
                    </div>

                    <div
                      class="hidden items-center py-2"
                      @click="linkproduct(product._id)"
                    >
                      <div class="flex">
                        <div v-for="starIndex in 5" :key="starIndex">
                          <svg
                            class="w-4 h-4 md:w-5 md:h-5 text-yellow-300"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                            v-if="product?.stars >= starIndex"
                          >
                            <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            ></path>
                          </svg>

                          <svg
                            class="w-[15px] h-[15px] md:w-[20px] md:h-[20px] border border-[#fff]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            v-else
                          >
                            <polygon
                              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                            ></polygon>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div class="pb-2 flex justify-between items-center">
                      <div class="text-sm flex items-center gap-1">
                        <span
                          v-if="product?.discount > 0"
                          class="line-through text-gray-500 text-xs"
                          >{{
                            parseFloat(
                              product?.raw_price?.toFixed(2)
                            )?.toLocaleString()
                          }}</span
                        >
                        <span
                          >฿
                          {{
                            parseFloat(
                              product?.selling_price?.toFixed(2)
                            )?.toLocaleString()
                          }}</span
                        >
                      </div>
                      <div class="text-right text-sm">
                        <button
                          v-if="
                            !checkItemAlreadyAdd(product._id) &&
                            product.partner_id !== userData.shop_partner?._id
                          "
                          class="bg-[#8B2FC9] hover:bg-[#6818A5] rounded-md p-1.5 sm:p-2 text-[#fff]"
                        >
                          <div class="flex items-center justify-center">
                            <div class="text-xs">
                              <i class="pi pi-shopping-cart"></i>
                            </div>
                          </div>
                        </button>
                        <button
                          v-else-if="
                            product.partner_id === userData.shop_partner?._id
                          "
                          class="rounded-md p-1.5 sm:p-2 text-purple-500 cursor-default"
                        >
                          <div class="flex items-center justify-center">
                            <div class="text-xs py-0.5">ร้านของฉัน</div>
                          </div>
                        </button>
                        <button
                          v-else
                          class="rounded-md p-1.5 sm:p-2 text-green-500 cursor-default"
                        >
                          <div class="flex items-center justify-center">
                            <div class="text-xs"><i class="pi pi-check"></i></div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </swiper-slide>
              </swiper>
            </div>
          </div>

          <!--all-->
          <div>
            <div
              class="bg-[#fff] text-[#8B2FC9] text-center py-2 font-medium mt-2"
            >
              สินค้าทั้งหมด
            </div>
            <div
              class="bg-[#fff] text-[#8B2FC9] pb-3 font-medium pt-1 border-b-4 border-[#8B2FC9] px-3"
            >
              <p class="min-w-fit">เรียงตาม :</p>
              <div class="flex gap-1 w-full text-sm">
                <button
                  class="border border-[#8B2FC9] py-1 px-2 rounded-md"
                  :class="
                    selectedSort == 'ยอดนิยม' ? 'bg-[#8B2FC9] text-[#fff]' : ''
                  "
                  @click="selectedSort = 'ยอดนิยม'"
                >
                  ยอดนิยม
                </button>
                <button
                  class="border border-[#8B2FC9] py-1 px-2 rounded-md"
                  :class="
                    selectedSort == 'ล่าสุด' ? 'bg-[#8B2FC9] text-[#fff]' : ''
                  "
                  @click="selectedSort = 'ล่าสุด'"
                >
                  ล่าสุด
                </button>
                <button
                  class="border border-[#8B2FC9] py-1 px-2 rounded-md"
                  :class="
                    selectedSort == 'ขายดี' ? 'bg-[#8B2FC9] text-[#fff]' : ''
                  "
                  @click="selectedSort = 'ขายดี'"
                >
                  ขายดี
                </button>
                <button
                  class="border border-[#8B2FC9] py-1 px-2 rounded-md"
                  :class="
                    selectedSort == 'ราคาน้อยไปมาก'
                      ? 'bg-[#8B2FC9] text-[#fff]'
                      : ''
                  "
                  @click="selectedSort = 'ราคาน้อยไปมาก'"
                >
                  ราคาน้อยไปมาก
                </button>
              </div>
            </div>
            <div
              class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mt-2 mx-2 md:mx-0"
            >
              <div
                v-for="product in partner_products"
                :key="product._id"
                class="bg-[#fff]"
                @click="selectProductPartnerHandle(product)"
              >
                <div class="md:shrink-0 border relative">
                  <img
                    :src="getImage(product.images[0]?.path)"
                    class="h-36 w-full object-cover"
                    v-if="product.images?.length"
                  />

                  <img
                    src="@/assets/images/logo.jpg"
                    class="h-36 w-full object-cover"
                    v-else
                  />
                  <div
                    v-if="product?.discount > 0"
                    class="px-2 absolute top-1 left-1 bg-gradient-to-r from-[#ff6d6d] to-[#d61b1b] text-white shadow text-sm"
                  >
                    ลดราคา
                  </div>
                  <div
                    class="px-2 absolute bottom-5 right-1 rounded-xl bg-yellow-500 text-white shadow text-sm"
                  >
                    PV {{ product?.pv || 0 }}
                  </div>
                  <p class="px-2 rounded bg-white text-black/80 text-xs truncate">
                    {{ product?.category }}
                  </p>
                </div>
                <div class="border px-2 bg-white pb-2">
                  <div
                    class="pt-1 text-sm text-left line-clamp-1 text-purple-600"
                    @click="linkproduct(product._id)"
                  >
                    {{ product.name }}
                  </div>
                  <div class="text-xs text-gray-500 line-clamp-1 text-left">
                    {{ product.description }}
                  </div>

                  <div
                    class="hidden items-center py-2"
                    @click="linkproduct(product._id)"
                  >
                    <div class="flex">
                      <div v-for="starIndex in 5" :key="starIndex">
                        <svg
                          class="w-4 h-4 md:w-5 md:h-5 text-yellow-300"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                          v-if="product?.stars >= starIndex"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          ></path>
                        </svg>

                        <svg
                          class="w-[15px] h-[15px] md:w-[20px] md:h-[20px] border border-[#fff]"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          v-else
                        >
                          <polygon
                            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                          ></polygon>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div class="pb-2 flex justify-center items-center">
                    <div class="w-1/2 text-sm flex gap-1">
                      <span
                        v-if="product?.discount > 0"
                        class="line-through text-gray-500 text-xs"
                        >{{
                          parseFloat(
                            product?.raw_price?.toFixed(2)
                          )?.toLocaleString()
                        }}</span
                      >
                      <span
                        >฿
                        {{
                          parseFloat(
                            product?.selling_price?.toFixed(2)
                          )?.toLocaleString()
                        }}</span
                      >
                    </div>
                    <div class="w-1/2 text-right text-sm">
                      <button
                        v-if="
                          !checkItemAlreadyAdd(product._id) &&
                          product.partner_id !== userData.shop_partner?._id
                        "
                        class="bg-[#8B2FC9] hover:bg-[#6818A5] rounded-md p-1.5 sm:p-2 text-[#fff]"
                      >
                        <div class="flex items-center justify-center">
                          <div class="text-xs">
                            <i class="pi pi-shopping-cart"></i>
                          </div>
                        </div>
                      </button>
                      <button
                        v-else-if="
                          product.partner_id === userData.shop_partner?._id
                        "
                        class="rounded-md p-1.5 sm:p-2 text-purple-500 cursor-default"
                      >
                        <div class="flex items-center justify-center">
                          <div class="text-xs py-0.5">ร้านของฉัน</div>
                        </div>
                      </button>
                      <button
                        v-else
                        class="rounded-md p-1.5 sm:p-2 text-green-500 cursor-default"
                      >
                        <div class="flex items-center justify-center">
                          <div class="text-xs"><i class="pi pi-check"></i></div>
                        </div>
                      </button>
                    </div>
                  </div>
                  <div class="flex justify-between">
                    <div class="text-xs flex">
                      <i
                        v-for="starIndex in product.stars"
                        :key="starIndex"
                        class="pi pi-star-fill text-yellow-400"
                        style="font-size: 12px"
                      ></i>
                      <i
                        v-for="starIndex in 5 - product.stars"
                        :key="starIndex"
                        class="pi pi-star text-gray-500"
                        style="font-size: 12px"
                      ></i>
                    </div>
                    <p class="text-xs text-gray-500">
                      ขายแล้ว {{ product.sold }} ชิ้น
                    </p>
                  </div>
                  <div class="text-xs text-gray-500 pb-2 hidden">
                    กรุงเทพมหานคร
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="h-full mt-[5rem]">
      <div class="flex flex-col items-center justify-center h-full">
        <p class="text-xl font-bold text-purple-500">
          ขณะนี้ระบบปิดปรับปรุงชั่วคราว
        </p>
        <p>เพื่อประสิทธิภาพที่ดียิ่งขึ้น</p>
        <img src="/src/assets/images/maintanance.jpg" />
        <p>ขออภัยในความไม่สะดวก</p>
        <Button
          label="ลองเชื่อมต่ออีกครั้ง"
          class="mt-5 border px-2 py-1 bg-slate-100"
          @click="router.go(0)"
        />
      </div>
    </div>
  </div>
  <div v-else class="h-full mt-[5rem]">
    <img src="/src/assets/images/empty-data.jpg" />
    <p class="text-xl text-gray-500 text-center">ยังไม่มีรายการสินค้า</p>
  </div>
  <Sidebar
    v-model:visible="visibleOneProduct"
    header=" "
    position="bottom"
    style="height: 90%"
  >
    <div>
      <h1 class="text-center pb-2">
        ร้าน : <span class="">{{ selectedProduct.shop_name }}</span>
      </h1>
      <div class="flex flex-col gap-2 items-center justify-center w-full">
        <div
          class="w-full h-28"
          v-for="image in selectedProduct?.images?.filter(
            (x) => x.desc === selectedProduct?.selectedPic
          )"
          :key="image"
        >
          <img
            :src="getImage(image?.path)"
            class="w-full h-full object-contain"
            :alt="image.desc"
          />
        </div>
        <div class="flex">
          <div
            @click="selectedProduct.selectedPic = image.desc"
            class="w-14 h-14"
            v-for="image in selectedProduct?.images"
            :key="image"
          >
            <img
              :src="getImage(image?.path)"
              class="w-full h-full object-cover"
              :class="
                selectedProduct.selectedPic === image.desc
                  ? 'opacity-100'
                  : 'opacity-50'
              "
              :alt="image.desc"
            />
          </div>
        </div>
      </div>
      <div class="mt-3">
        <p class="font-bold text-center text-purple-600">
          {{ selectedProduct?.name }}
        </p>
        <p class="text-sm text-center">{{ selectedProduct?.description }}</p>
      </div>
      <div class="flex w-full justify-center px-5 mt-2">
        <div class="w-full flex flex-col items-center">
          <label for="horizontal-buttons" class="block">
            จำนวน
            <span class="text-xs"
              >(คงเหลือ {{ selectedProduct?.stock }})</span
            ></label
          >
          <InputNumber
            v-model="selectedProduct.quantity"
            inputId="horizontal-buttons"
            inputClass="w-full border border-purple-500 rounded-xl text-center max-w-20"
            showButtons
            buttonLayout="horizontal"
            :step="1"
            :min="1"
            :max="selectedProduct?.stock"
          >
            <template #incrementbuttonicon>
              <span class="pi pi-plus" />
            </template>
            <template #decrementbuttonicon>
              <span class="pi pi-minus" />
            </template>
          </InputNumber>
        </div>
      </div>
      <p class="text-center text-sm my-2">
        ราคา/หน่วย : ฿
        {{
          parseFloat(
            selectedProduct?.selling_price?.toFixed(2)
          )?.toLocaleString()
        }}
      </p>
      <div
        class="flex justify-center flex-col items-center pl-10 border-t pt-2"
      >
        <div class="flex justify-start items-center gap-5 w-full">
          <p>รวม :</p>
          <p class="font-bold underline text-purple-500">
            ฿
            {{
              parseFloat(
                (
                  selectedProduct?.selling_price * selectedProduct?.quantity
                )?.toFixed(2)
              )?.toLocaleString()
            }}
          </p>
          <p>บาท</p>
        </div>
        <div class="flex justify-start items-center gap-5 w-full">
          <p>PV :</p>
          <p class="font-bold text-purple-500">
            + {{ selectedProduct?.pv * selectedProduct?.quantity }}
          </p>
        </div>
      </div>
      <div class="w-full mt-3">
        <Button
          class="bg-purple-500 w-full text-white py-2"
          label="เพิ่มลงตะกร้า"
          @click="
            addproductPartner(selectedProduct, selectedProduct?.quantity, '')
          "
        />
      </div>
    </div>
  </Sidebar>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import dialogdownload from "@/views/customer/dialogdownload.vue";
import { useRouter } from "vue-router";

const router = useRouter();

import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

const store = useStore();
const isLoading = ref(false);
const searchQuery = ref("");

//const errorMessage = ref('')

const data = ref([]);
const visibleOneProduct = ref(false);
const selectedProduct = ref({});

const selectProductPartnerHandle = (prod) => {
  if (prod.partner_id === userData.value?.shop_partner?._id) return;
  visibleOneProduct.value = true;
  selectedProduct.value = { ...prod };
  selectedProduct.value.selectedPic = selectedProduct.value?.images[0]?.desc;
  selectedProduct.value.quantity = 1;
};

const getImage = (item) => {
  if (item) {
    return process.env.VUE_APP_MARUEY + item;
  }
};

const calPv = (com) => {
  if (com && com > 0) {
    const result = Math.floor(com / 8);
    return result;
  }
};

const selectedSortPrice = ref("น้อย → มาก");

const getData = async () => {
  const config = {
    method: "get",
    url: `${process.env.VUE_APP_MARUEY}product/`,
  };
  await axios(config)
    .then((res) => {
      data.value = res.data?.data;
      if (data.value?.length > 0) {
        data.value = data.value.filter((item) => item?.product_status == true);
      }
    })
    .catch((err) => {
      //console.log(err);
    });
};

const checkItemAlreadyAdd = (id) => {
  const carts = store.state.cart;
  const result = carts.some((x) => x.product_id === id);
  return result;
};

const linksearch = async () => {
  try {
    const { data } = await axios.get(
      `${
        process.env.VUE_APP_MLM
      }/producSearch?name=${searchQuery.value?.trim()}`
    );
    if (data.code === 200) {
      original_products.value = data.data;
      original_products.value.forEach((prod) => {
        prod.selling_price = parseFloat(prod.selling_price);
        prod.product_image = prod.full_image_url;
      });
    }
  } catch (err) {
    //console.log(err)
  }
};

const clearSearch = () => {
  searchQuery.value = "";
  getProducts();
};

const userData = ref({});

const getuser = async () => {
  await getUserProfile();
  userData.value = store.getters.me;
  await getMyShopPartner();
  //console.log("ME", userData.value)
};

const getUserProfile = async () => {
  try {
    const response = await axios.get(
      `${process.env.VUE_APP_MLM}/getUserProfile_token`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    //console.log(response.data)
    if (response.data.status === "success") {
      const payload = {
        user_id: response.data.data.id,
        username: response.data.data.user_name,
      };
      const res = await axios.post(
        `${process.env.VUE_APP_MLM}/getUserProfile`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      //console.log(res.data)
      if (res.data.status === "success") {
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
          code: response.data.code,
        };
        store.commit("setLogin", loginData);
      }
    }
  } catch (err) {
    //console.log(err)
  }
};

const getMyShopPartner = async () => {
  if (!store.getters.me?.user_name) return;
  try {
    const { data } = await axios.get(
      `${process.env.VUE_APP_MARUEY}partner/byusername/${store.getters.me?.user_name}`
    );
    if (data.status) {
      userData.value.shop_partner = data.data;
      //console.log('shop: ', data.data)
    }
  } catch (err) {
    //console.log(err)
  }
};

const mode = ref("");

onMounted(async () => {
  mode.value = process.env.MODE;
  document.title = "Maruey || ช้อปปิ้งออนไลน์";
  isLoading.value = true;
  await checkServer();
  await getData();
  await getuser();
  await fetchCategories();
  await getProducts();
  await getProductPartners();
  isLoading.value = false;
});

const original_products = ref([]);
const selectedCategory = ref(1);
const products = computed(() => {
  let result = original_products.value?.filter(
    (prod) => prod.status !== 0 && prod.category_id === 1
  );
  return result;
});

const products2 = computed(() => {
  let result = original_products.value?.filter(
    (prod) => prod.status !== 0 && prod.category_id === 2
  );
  return result;
});

const products3 = computed(() => {
  let result = original_products.value?.filter(
    (prod) => prod.status !== 0 && prod.category_id === 3
  );
  return result;
});

const products8 = computed(() => {
  let result = original_products.value?.filter(
    (prod) => prod.status !== 0 && prod.category_id === 8
  );
  return result;
});

const closeServerMLM = ref(false);
const closeServerMain = ref(false);

const checkServer = async () => {
  try {
    const response = await axios.get(`${process.env.VUE_APP_MARUEY}product`);
    if (!response.data.status) {
      closeServerMain.value = true;
    } else {
      closeServerMain.value = false;
    }
  } catch (error) {
    //console.log(error)
    closeServerMain.value = true;
  }
};

const getProducts = async () => {
  try {
    const { data } = await axios.get(`${process.env.VUE_APP_MLM}/productList`);

    if (data.status === "success") {
      original_products.value = data.data;
      original_products.value.forEach((prod) => {
        prod.selling_price = parseFloat(prod.member_price);
        prod.product_image = prod.full_image_url;
      });
      closeServerMLM.value = false;
      ////console.log(original_products.value)
    }
  } catch (err) {
    //console.log(err)
    closeServerMLM.value = true;
  }
};

const categories = ref([]);
const fetchCategories = async () => {
  /*try {
    const { data } = await axios.get(`${process.env.VUE_APP_MLM}/dataset_categories`)
    categories.value = data.data || []
  }
  catch(err) {
    //console.log(err)
  }*/
  categories.value = [
    {
      category_id: 1,
      category_name: "อาหารและเครื่องดื่ม",
      category_name_en: "Food and Beverages",
      category_icon: "/src/assets/icons/food.png",
    },
    {
      category_id: 2,
      category_name: "เสื้อผ้าผู้ชาย",
      category_name_en: "Men's clothing",
    },
    {
      category_id: 3,
      category_name: "เสื้อผ้าผู้หญิง",
      category_name_en: "Women's clothing",
    },
    {
      category_id: 4,
      category_name: "ความงามและของใช้ส่วนตัว",
      category_name_en: "Personal Care",
    },
    {
      category_id: 5,
      category_name: "ผลิตภัณฑ์เพื่อสุขภาพ",
      category_name_en: "Health Products",
    },
    {
      category_id: 6,
      category_name: "กระเป๋า",
      category_name_en: "Bags",
    },
    {
      category_id: 7,
      category_name: "เครื่องประดับ",
      category_name_en: "Accessories",
    },
    {
      category_id: 8,
      category_name: "เครื่องใช้ในบ้าน",
      category_name_en: "Home Appliances",
    },
    {
      category_id: 9,
      category_name: "รองเท้าผู้ชาย",
      category_name_en: "Men's shoes",
    },
    {
      category_id: 10,
      category_name: "รองเท้าผู้หญิง",
      category_name_en: "Women's shoes",
    },
    {
      category_id: 11,
      category_name: "เครื่องใช้ไฟฟ้า",
      category_name_en: "Electronic tools",
    },
    {
      category_id: 12,
      category_name: "อุปกรณ์อิเล็กทรอนิกส์",
      category_name_en: "Electronics",
    },
    {
      category_id: 13,
      category_name: "ของเล่น สินค้าแม่และเด็ก",
      category_name_en: "Toys and Baby Products",
    },
    {
      category_id: 14,
      category_name: "นาฬิกาและแว่นตา",
      category_name_en: "Jewelry and Watches",
    },
    {
      category_id: 15,
      category_name: "เครื่องเขียน หนังสือ และงานอดิเรก",
      category_name_en: "Stationery, Books and Games",
    },
    {
      category_id: 16,
      category_name: "สัตว์เลี้ยง",
      category_name_en: "Pets",
    },
    {
      category_id: 17,
      category_name: "กีฬาและกิจกรรมกลางแจ้ง",
      category_name_en: "Sports and Fitness",
    },
  ];
};

const addproduct = (product, quantity, sharelinkcode) => {
  const data = {
    product: product,
    quantity: quantity,
    sharelinkcode: sharelinkcode,
  };
  // ใช้ store เพื่อเก็บข้อมูลลงตะกร้าสินค้า ด้วยฟังก์ชั่น addToCart
  store.commit("addToCart", data);
};

const addproductPartner = (product, quantity, sharelinkcode) => {
  product.image = getImage(product.images[0]?.path);
  //product.images = parseFloat(product.selling_price)
  const data = {
    product: product,
    quantity: quantity,
    sharelinkcode: sharelinkcode,
  };
  // ใช้ store เพื่อเก็บข้อมูลลงตะกร้าสินค้า ด้วยฟังก์ชั่น addToCart
  store.commit("addToPartnerCart", data);
  visibleOneProduct.value = false;
  selectedProduct.value = {};
};

const linkproduct = (id) => {
  //router.push(`/singleproduct/${id}`);
  return;
};

const selectedSort = ref("ยอดนิยม");

const partner_original_products = ref([]);
const partner_products = computed(() => {
  let result = partner_original_products.value;
  if (!searchQuery.value || searchQuery.value === "") {
    if (selectedSort.value === "ยอดนิยม") {
      result = partner_original_products.value;
      result = result.sort((a, b) => b.stars - a.stars);
    } else if (selectedSort.value === "ล่าสุด") {
      result = partner_original_products.value;
      result = result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (selectedSort.value === "ขายดี") {
      result = partner_original_products.value;
      result = result.sort((a, b) => b.sold - a.sold);
    } else if (selectedSort.value === "ราคาน้อยไปมาก") {
      result = partner_original_products.value;
      result = result.sort((a, b) => a.selling_price - b.selling_price);
    }
  } else {
    result = partner_original_products.value;
    result = result.filter(
      (product) =>
        product.name
          ?.toLowerCase()
          ?.includes(searchQuery.value.toLowerCase()) ||
        product.description
          ?.toLowerCase()
          ?.includes(searchQuery.value.toLowerCase()) ||
        product.product_type
          ?.toLowerCase()
          ?.includes(searchQuery.value.toLowerCase()) ||
        product.shop_name
          ?.toLowerCase()
          ?.includes(searchQuery.value.toLowerCase()) ||
        product.unit
          ?.toLowerCase()
          ?.includes(searchQuery.value.toLowerCase()) ||
        product.tags
          ?.join(" ")
          ?.toLowerCase()
          ?.includes(searchQuery.value.toLowerCase())
    );
  }

  return result;
});

const getProductPartners = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.VUE_APP_MARUEY}product/partner?status=1`
    );
    //console.log('partners : ', data.data)
    partner_original_products.value = data.data;
  } catch (err) {
    //console.log(err)
  }
};
</script>

<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

.swiper-slide {
  text-align: center;
}

/* HTML: <div class="loader"></div> */
.loader {
  width: 100px;
  aspect-ratio: 1;
  padding: 10px;
  box-sizing: border-box;
  display: grid;
  background: #fff;
  filter: blur(5px) contrast(10) hue-rotate(0deg);
  mix-blend-mode: darken;
}
.loader:before,
.loader:after {
  content: "";
  grid-area: 1/1;
  width: 40px;
  height: 40px;
  background: #ff34d3;
  animation: l7 2s infinite;
}
.loader:after {
  animation-delay: -1s;
}
@keyframes l7 {
  0% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(100%, 0);
  }
  50% {
    transform: translate(100%, 100%);
  }
  75% {
    transform: translate(0, 100%);
  }
  100% {
    transform: translate(0, 0);
  }
}
</style>
