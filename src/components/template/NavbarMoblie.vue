<template>
  <nav
    :class="
      !$store.getters._id || $store.getters._id == ''
        ? 'min-h-[4.8rem]'
        : 'h-auto'
    "
    class="index fixed pb-3 pt-6 top-0 bg-[#8B2FC9] w-full rounded-b-xl shadow-md z-[1000]"
    v-if="
      ($route.path === '/' || $route.path === '/shops') &&
      !closeServerMLM &&
      !closeServerMain
    "
  >
    <div class="flex justify-between items-center px-3">
      <div class="w-auto" v-if="$store.getters._id && $store.getters._id != ''">
        <div class="w-full flex items-center justify-between">
          <div
            class="text-[#fff] text-xs sm:text-sm w-full flex flex-col justify-center"
          >
            <div class="flex items-center">
              <p class="mr-3">{{ userData?.name }}</p>
              <p class="bg-white text-purple-800 w-fit rounded-xl px-2">
                {{ userData?.user_name }}
                <span>({{ userData?.qualification_id }})</span>
              </p>
            </div>
            <div
              class="opacity-50 mt-2 text-xs"
              :class="userData?.qualification_id === 'MC' ? 'hidden' : ''"
            >
              รหัสผู้แนะนำ : {{ userData?.introduce_id }}
            </div>
          </div>
        </div>
      </div>
      <div v-if="$store.getters._id && $store.getters._id != ''" class="w-fit">
        <div
          v-if="
            updateApp
          "
        >
          <div
            class="flex items-center gap-2 bg-white p-2 rounded-xl"
            @click="goUpdate"
          >
            <img src="/src/assets/playstore.png" alt="download" width="30" />
          </div>
        </div>
        <div
          v-if="
            (deviceType === 'Mobile' || deviceType === 'Tablet') &&
            mode == 'APP' &&
            updateApp
          "
        >
          <div
            v-if="os === 'Android'"
            class="flex items-center gap-2 bg-white p-2 rounded-xl relative"
            @click="
              () => {
                goUpdate();
              }
            "
          >
            <img src="/src/assets/playstore.png" alt="download" width="30" />
            <span
              class="text-xs absolute -top-2 -right-3 truncate bg-red-500 text-white px-1 rounded animate-bounce"
              >new</span
            >
            <span
              class="text-xs absolute -bottom-2 right-2 truncate bg-orange-500 text-white px-1 rounded"
              style="letter-spacing: 2px"
              >{{ newVersion }}</span
            >
          </div>
        </div>
      </div>
      <div
        class="w-auto text-center"
        v-if="$store.getters._id && $store.getters._id != ''"
      >
        <button @click="showcart()" class="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="10" cy="20.5" r="1" />
            <circle cx="18" cy="20.5" r="1" />
            <path
              d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1"
            />
          </svg>
          <div
            v-if="$store.getters.cart?.length"
            class="absolute -bottom-2 -right-2 bg-red-500 text-white rounded-full px-2"
          >
            {{ $store.getters.cart?.length }}
          </div>
        </button>
      </div>

      <div v-else class="flex w-full justify-between items-center">
        <span class="text-white/80"
          >คุณมีรหัสผู้ใช้งานแล้วหรือยัง ? <i class="ml-3 pi pi-caret-right"></i
        ></span>
        <button
          class="bg-purple-400 hover:bg-yellow-500 rounded-md py-1.5 px-4 text-[#000] w-fit"
          @click="$router.push('/login')"
        >
          เข้าสู่ระบบ
        </button>
      </div>
    </div>
  </nav>

  <nav
    v-if="
      !closeServerMLM &&
      !closeServerMain &&
      $route.path !== '/download' &&
      !$route.path.includes('partner')
    "
    class="fixed bottom-0 bg-gradient-to-r from-[#8B2FC9] to-[#c227ff] rounded-t-xl w-full h-[60px] z-[1000]"
  >
    <div class="h-full flex justify-around items-center w-full relative">
      <div
      @click="goUpdate"
      v-if="updateApp"
        class="text-xs flex items-center py-1 text-white bg-orange-500 opacity-100 px-2 rounded truncate absolute -top-4 left-0"
        ><span>อัพเดทเวอร์ชั่น</span><div class="w-2 h-2 animate-ping rounded-full bg-red-500"></div></div
      >
      <span
      v-else
        class="text-xs text-white bg-black opacity-100 px-2 rounded truncate absolute -top-2 left-0"
        >เวอร์ชั่น {{ version }}</span
      >
      <div v-for="menuItem in menuItems" :key="menuItem.text">
        <button
          @click="handleMenuItemClick(menuItem)"
          class="flex flex-col items-center w-full rounded-lg hover:bg-[#b459f0] min-w-fit"
          :class="
            menuItem.text === 'ร้านค้า'
              ? 'bg-gradient-to-r from-orange-500 to-orange-700 px-2'
              : ''
          "
        >
          <span
            aria-hidden="true"
            class="items-center group-hover:text-[#FFFFEC] rounded-lg text-sm"
          >
            <i :class="menuItem.icon"></i>
          </span>
          <span class="text-xs text-[#fff] min-w-fit">{{ menuItem.text }}</span>
        </button>
      </div>
      <button
        v-if="userData?.shop_partner"
        @click="$router.push('/partner/home')"
        class="flex flex-col items-center rounded-lg hover:bg-[#b459f0] min-w-fit bg-gradient-to-r from-orange-500 to-orange-700 px-2"
      >
        <span
          aria-hidden="true"
          class="items-center group-hover:text-[#FFFFEC] rounded-lg text-sm"
        >
          <i class="pi pi-inbox text-white text-xl"></i>
        </span>
        <span class="text-xs text-[#fff] min-w-fit">ร้านค้า</span>
      </button>
    </div>
  </nav>

  <Sidebar
    v-model:visible="sidebarshowcart"
    header="ตะกร้าสินค้า"
    position="right"
    style="width: 650px"
  >
    <div class="border-t border-gray-300 pt-5">
      <div
        v-if="$store.getters.cart.length > 0"
        class="flex flex-col divide-y-[1px]"
      >
        <!--Official-->
        <div
          v-if="
            $store.getters.cart?.filter((i) => i.product_store !== 'partner')
              .length
          "
          class="border-b-[1px] border-dashed border-purple-500 pb-3"
        >
          <p class="text-sm text-purple-500">
            <span class="pi pi-verified text-green-500 mr-1"></span>บริษัท
            มารวยด้วยกัน จำกัด
          </p>
          <div
            v-for="(item, index) in $store.getters.cart?.filter(
              (i) => i.product_store !== 'partner'
            )"
            :key="index"
            class="flex flex-col w-full py-3 border-b"
          >
            <div class="flex w-full">
              <div class="w-1/4 flex flex-col h-20 justify-center items-center">
                <img
                  v-if="item.product_image && !item.product_imageError"
                  :src="item.product_image"
                  @error="item.product_imageError = true"
                  class="h-full w-full object-cover"
                />
                <img
                  v-else
                  src="@/assets/images/logo.jpg"
                  class="h-full w-full object-cover"
                />
              </div>
              <div class="flex justify-between w-full">
                <div class="flex flex-col w-full pl-4 text-sm md:text-base">
                  {{ item.product_name }}<br />
                  <span class="text-xs text-gray-500">{{
                    item.product_title
                  }}</span>
                  <!--ปุ่มเพิ่มลบจำนวน-->
                  <!-- <div class="flex-grow"></div> -->
                  <div class="flex items center my-2 mt-8">
                    <button class="text-[#000] px-2 py-1 rounded border">
                      <div class="flex items center py-1.5">
                        <div @click="minusquantity(item)" class="p-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#000000"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                        </div>
                        <div class="px-4 text-base font-bold">
                          {{ item.product_qty }}
                        </div>
                        <div @click="addquantity(item)" class="p-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#000000"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
                <div
                  class="flex flex-col justify-between items-end h-full w-fit"
                >
                  <div class="font-semibold text-sm md:text-base truncate">
                    ฿
                    {{
                      item.product_totalprice?.toLocaleString("en", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    }}
                  </div>
                  <div
                    class="bg-yellow-500 px-2 rounded-xl text-sm shadow text-white"
                  >
                    PV:
                    <span>{{
                      (item.product_pv || 0) * (item.product_qty || 1)
                    }}</span>
                  </div>
                  <div class="mb-2">
                    <button
                      class="text-[#000] px-2 py-1 rounded mt-9"
                      @click="deleteProduct(item)"
                    >
                      <div class="flex items-center">
                        <div class="pr-1.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#000"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="15" y1="9" x2="9" y2="15"></line>
                            <line x1="9" y1="9" x2="15" y2="15"></line>
                          </svg>
                        </div>
                        <div>ลบ</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full mt-4">
            <div class="flex justify-between mx-2 text-2xl text-[#000]">
              <div>ราคารวม :</div>
              <div class="flex-grow"></div>
              <div class="">
                ฿
                {{
                  $store.getters.total_main.toLocaleString("en", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                }}
              </div>
            </div>
            <div class="flex justify-between mx-2 text-xl text-green-500">
              <div>PV รวม :</div>
              <div class="flex-grow"></div>
              <div class="">
                {{ $store.getters.total_main_pv?.toLocaleString("en") }}
              </div>
            </div>
            <div class="">
              <button
                class="w-full bg-[#8B2FC9] text-white text-lg py-2 mt-4"
                @click="checkout"
                v-if="$store.getters._id != ''"
              >
                สั่งซื้อสินค้า
              </button>
              <button
                class="w-full bg-[#8B2FC9] text-white text-lg py-2 mt-4"
                @click="login"
                v-else
              >
                ล็อคอิน
              </button>
            </div>
          </div>
        </div>

        <!--partner-->
        <div
          v-if="
            $store.getters.cart?.filter((i) => i.product_store === 'partner')
              .length
          "
        >
          <div
            v-for="(pItem, pIndex) in partnerCarts"
            :key="pIndex"
            class="flex flex-col w-full py-3"
          >
            <p class="text-sm text-purple-500">{{ pItem.shop_name }}</p>
            <div v-for="(item, index) in pItem.products" :key="index">
              <div class="flex w-full pt-2 border-b">
                <div
                  class="w-1/4 flex flex-col h-20 justify-center items-center"
                >
                  <img
                    v-if="item.product_image && !item.product_imageError"
                    :src="item.product_image"
                    @error="item.product_imageError = true"
                    class="h-full w-full object-cover"
                  />
                  <img
                    v-else
                    src="@/assets/images/logo.jpg"
                    class="h-full w-full object-cover"
                  />
                </div>
                <div class="flex justify-between w-full">
                  <div class="flex flex-col w-full pl-4 text-sm md:text-base">
                    {{ item.product_name }}<br />
                    <span class="text-xs text-gray-500">{{
                      item.product_title
                    }}</span>
                    <!--ปุ่มเพิ่มลบจำนวน-->
                    <!-- <div class="flex-grow"></div> -->
                    <div class="flex items center my-2 mt-8">
                      <button class="text-[#000] px-2 py-1 rounded border">
                        <div class="flex items center py-1.5">
                          <div @click="minusquantity(item)" class="p-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="10"
                              height="10"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#000000"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                          </div>
                          <div class="px-4 text-base font-bold">
                            {{ item.product_qty }}
                          </div>
                          <div @click="addquantity(item)" class="p-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="10"
                              height="10"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#000000"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <line x1="12" y1="5" x2="12" y2="19"></line>
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                  <div
                    class="flex flex-col justify-between items-end h-full w-fit"
                  >
                    <div class="font-semibold text-sm md:text-base truncate">
                      ฿
                      {{
                        item.product_totalprice?.toLocaleString("en", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      }}
                    </div>
                    <div
                      class="bg-yellow-500 px-2 rounded-xl text-sm shadow text-white"
                    >
                      PV:
                      <span>{{
                        (item.product_pv || 0) * (item.product_qty || 1)
                      }}</span>
                    </div>
                    <div class="mb-2">
                      <button
                        class="text-[#000] px-2 py-1 rounded mt-9"
                        @click="deleteProduct(item)"
                      >
                        <div class="flex items-center">
                          <div class="pr-1.5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#000"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <circle cx="12" cy="12" r="10"></circle>
                              <line x1="15" y1="9" x2="9" y2="15"></line>
                              <line x1="9" y1="9" x2="15" y2="15"></line>
                            </svg>
                          </div>
                          <div>ลบ</div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full mt-4">
              <div class="flex justify-between mx-2 text-2xl text-[#000]">
                <div>ราคารวม :</div>
                <div class="flex-grow"></div>
                <div class="">
                  ฿
                  {{
                    $store.getters.total_partner.toLocaleString("en", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  }}
                </div>
              </div>
              <div class="flex justify-between mx-2 text-xl text-green-500">
                <div>PV รวม :</div>
                <div class="flex-grow"></div>
                <div class="">
                  {{ $store.getters.total_partner_pv?.toLocaleString("en") }}
                </div>
              </div>
              <div class="">
                <button
                  class="w-full bg-[#8B2FC9] text-white text-lg py-2 mt-4"
                  @click="checkoutPartner(pItem.shop_id)"
                  v-if="$store.getters._id != ''"
                >
                  สั่งซื้อสินค้า
                </button>
                <button
                  class="w-full bg-[#8B2FC9] text-white text-lg py-2 mt-4"
                  @click="login"
                  v-else
                >
                  ล็อคอิน
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-4">
          <button @click="clearcart" class="w-full text-[#E0144C] py-2 mt-2">
            ล้างตะกร้าสินค้าทั้งหมด
          </button>
        </div>
      </div>

      <!--empty-->
      <div v-else>
        <div class="flex justify-center items-center">
          <div class="text-lg font-bold text-[#000]">ไม่มีสินค้าในตะกร้า</div>
        </div>
      </div>
    </div>

    <div v-if="$store.getters.cart.length > 0" class="w-full mt-4 hidden">
      <div class="flex justify-between mx-2 text-2xl text-[#000]">
        <div>ราคารวม :</div>
        <div class="flex-grow"></div>
        <div class="">
          ฿
          {{
            $store.getters.total.toLocaleString("en", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          }}
        </div>
      </div>
      <div class="flex justify-between mx-2 text-xl text-green-500">
        <div>PV รวม :</div>
        <div class="flex-grow"></div>
        <div class="">
          {{ $store.getters.total_pv?.toLocaleString("en") }}
        </div>
      </div>
      <div class="">
        <button
          class="w-full bg-[#8B2FC9] text-white text-lg py-2 mt-4"
          @click="checkout"
          v-if="$store.getters._id != ''"
        >
          สั่งซื้อสินค้า
        </button>
        <button
          class="w-full bg-[#8B2FC9] text-white text-lg py-2 mt-4"
          @click="login"
          v-else
        >
          ล็อคอิน
        </button>
        <button
          @click="clearcart"
          class="w-full bg-[#E0144C] text-white text-lg py-2 mt-4"
        >
          ล้างตะกร้าสินค้า
        </button>
      </div>
    </div>
  </Sidebar>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";

const VERSION = process.env.VUE_APP_VERSION;
const MODE = process.env.VUE_APP_MODE;
const WEBSITE = process.env.VUE_APP_WEBSITE;

export default {
  components: {},
  data() {
    return {
      website: WEBSITE,
      version: VERSION,
      newVersion: "",
      mode: MODE,
      closeServerMLM: true,
      closeServerMain: true,
      closePopup: false,
      downloadAppPopup: false,
      updateApp: false,
      deviceType: "",
      os: "",
      userData: {},
      isOpen: false,
      isMobile: false,
      isSubMenuOpen: false,
      activeMenuItem: null,
      searchQuery: "",
      searchResults: [],
      data: [],
      showResults: false,
      sidebarshowcart: false,
      menuItems: [
        {
          text: "หน้าแรก",
          action: "/",
          icon: "pi pi-home text-white text-xl",
        },
        {
          text: "สินค้า",
          action: "/shops",
          icon: "pi pi-shopping-cart text-white text-xl",
        },
        {
          text: "ออเดอร์",
          action: "/customer/order",
          icon: "pi pi-box text-white text-xl",
        },
        {
          text: "โปรไฟล์",
          action: "/customer/customerview",
          icon: "pi pi-user text-white text-xl",
        },
      ],
    };
  },
  computed: {
    partnerCarts() {
      const pcarts = this.$store.getters.cart.filter(
        (item) => item.product_store === "partner"
      );
      const cart_partners = pcarts.map((item) => item.product_partner_name);
      const partnerSet = [...new Set(cart_partners)];
      const partnercarts = partnerSet.map((item) => {
        const pcart = pcarts.filter((c) => c.product_partner_name === item);
        return {
          shop_name: item,
          shop_id: pcart[0].product_partner_id,
          products: pcart,
        };
      });
      return partnercarts || [];
    },
  },

  async mounted() {
    await this.checkServer();
    await this.checkServerStatus();
    this.detectDeviceAndOS();
    await this.getData();
    await this.checkUpdateApp();
  },

  methods: {
    goUpdate() {
      window.open(WEBSITE + "/download", "_blank");
    },
    accptedPopup() {
      sessionStorage.setItem("acceptPopup", "true");
    },
    async checkServerStatus() {
      try {
        await axios.get(`${process.env.VUE_APP_MLM}/dataset_qualification`);
        //console.log(data)
        this.closeServerMLM = false;
      } catch (err) {
        //console.log(err)
        this.closeServerMLM = true;
      }
    },
    async checkUpdateApp() {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_MARUEY}product`
        );
        this.newVersion = response.data.version;
        console.log(response.data)
        if (response.data.version !== process.env.VUE_APP_VERSION) {
          
            this.updateApp = true;
            
        }
      } catch (err) {
        console.log(err);
        //this.closeServerMLM = true
      }
    },
    async getMyShopPartner() {
      if (!this.$store.getters.me?.user_name) return;
      try {
        const { data } = await axios.get(
          `${process.env.VUE_APP_MARUEY}partner/byusername/${this.$store.getters.me?.user_name}`
        );
        if (data.status) {
          this.userData.shop_partner = data.data;
          //console.log('shop: ', data.data)
        }
      } catch (err) {
        //console.log(err)
      }
    },
    async checkServer() {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_MARUEY}product`
        );
        if (!response.data.status) {
          this.closeServerMain = true;
        } else {
          console.log("server running");
          this.closeServerMain = false;
        }
      } catch (error) {
        //console.log(error)
        this.closeServerMain = true;
      }
    },
    downloadAPK() {
      const apk_url = process.env.VUE_APP_APK;
      window.open(apk_url, "_blank");
      this.downloadAppPopup = false;
      this.closePopup = true;
    },
    detectDeviceAndOS() {
      const userAgent = navigator.userAgent;
      
      // Detect OS
      if (/android/i.test(userAgent)) {
        this.os = "Android";
        if (!sessionStorage.getItem("acceptPopup") && this.mode === "WEB") {
          setTimeout(() => {
            this.downloadAppPopup = true;
          }, 5000);
        }
      } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        this.os = "iOS";
      } else if (/windows nt/i.test(userAgent)) {
        this.os = "Windows";
      } else if (/macintosh|mac os x/i.test(userAgent)) {
        this.os = "Mac OS";
      } else {
        this.os = "Unknown OS";
      }

      // Detect device type
      if (/mobile/i.test(userAgent)) {
        this.deviceType = "Mobile";
      } else if (/tablet/i.test(userAgent)) {
        this.deviceType = "Tablet";
      } else {
        this.deviceType = "Desktop";
      }
    },
    async getData() {
      this.userData = this.$store.getters.me;
      await this.getMyShopPartner();
    },
    async confirmLogout() {
      const confirmResult = await Swal.fire({
        text: "คุณต้องการออกจากระบบหรือไม่?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "ใช่, ออกจากระบบ",
        confirmButtonColor: "#E0144C",
        cancelButtonText: "ยกเลิก",
      });

      if (confirmResult.isConfirmed) {
        this.logout();
      }
    },
    profile() {
      this.$router.push("/customer/customerview");
    },

    async logout() {
      const result = await Swal.fire({
        text: "คุณต้องการที่จะออกจากระบบหรือไม่?",
        icon: "warning",
        iconColor: "#8B2FC9",
        showCancelButton: true,
        confirmButtonColor: "#8B2FC9",
        cancelButtonColor: "#E85D40",
        confirmButtonText: "ยืนยันออกจากระบบ",
        cancelButtonText: "ยกเลิก",
      });

      if (result.isConfirmed) {
        // ทำการลบ Token ออกจาก localStorage
        localStorage.clear();
        localStorage.removeItem("token");
        this.$store.commit("setLoginDefault");

        // ทำการล็อกเอาท์ใน Store
        // window.location.reload();
        window.location.assign("/");
      }
    },

    fetchResults() {
      this.searchResults = this.data.filter((result) => {
        return result.product_name
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      });
      if (this.searchResults.length > 0 && this.searchQuery !== "") {
        this.showResults = true; // แสดงกล่องค้นหาเมื่อมีข้อมูลและได้โฟกัสที่ input
      } else {
        this.hideResults(); // ซ่อนกล่องค้นหาเมื่อไม่มีข้อมูลหรือไม่ได้โฟกัสที่ input
      }
    },
    hideResults() {
      setTimeout(() => {
        this.showResults = false;
      }, 200);
    },
    linksearch() {
      this.$router.push(`/searchproduct/${this.searchQuery}`);
      this.hideResults();
    },
    linkauto(name) {
      this.searchQuery = name;
      this.$router.push(`/searchproduct/${name}`);
      //reload();

      this.hideResults();
    },
    toggleSubMenu() {
      console.log("toggleSubMenu");
      this.isSubMenuOpen = !this.isSubMenuOpen;
    },
    closeSubMenu() {
      this.isSubMenuOpen = false;
    },

    async showcart() {
      this.sidebarshowcart = true;
    },
    getImage(item) {
      return `https://drive.google.com/thumbnail?id=${item}&sz=w1000`;
    },
    addquantity(item) {
      this.$store.commit("addquantity", item);
    },
    minusquantity(item) {
      this.$store.commit("minusquantity", item);
    },
    deleteProduct(item) {
      this.$store.commit("deleteProduct", item);
    },
    clearcart() {
      this.$store.commit("clearCart");
    },
    checkout() {
      this.sidebarshowcart = false;
      this.$router.push("/checkout");
    },
    checkoutPartner(partner_id) {
      this.sidebarshowcart = false;
      this.$router.push("/checkout-partner?partner_id=" + partner_id);
    },
    showorder() {
      this.sidebarshowcart = false;
      this.$router.push("/customer/order");
    },
    login() {
      this.$router.push("/login");
    },
    handleMenuItemClick(menuItem) {
      if (localStorage.getItem("token")) {
        this.$router.push(menuItem.action);
      } else {
        if (menuItem.text == "สินค้า") {
          this.$router.push(menuItem.action);
        } else {
          this.$router.push("/login");
        }
      }
    },
  },
};
</script>

<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

.index {
  z-index: 999;
}
</style>
