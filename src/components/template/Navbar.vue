<template>
  <section class="index sticky top-0 bg-gradient-to-t from-[#DC97FF] to-[#8B2FC9]">
    <div class="items-center mx-0 md:mx-24 flex">
      <div class="pr-4 md:pr-0 w-full flex justify-end text-right pt-3 text-white">
        <div
          v-if="$store.getters.row == 'customer' && $store.getters.logedIn === true"
          class="w-full flex justify-end text-right md:text-left mr-5"
        >
          <div class="">
            <button
              @click="toggleSubMenu()"
              class="transform transition-colors duration-300 rounded text-white"
            >
              <div class="flex">
                <div class="mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" />
                    <circle cx="12" cy="10" r="3" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
                <div>{{ $store.getters.name }}</div>
                <div>
                  <svg
                    v-if="isSubMenuOpen == false"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M18 15l-6-6-6 6" />
                  </svg>
                </div>
              </div>
            </button>
            <div
              v-if="isSubMenuOpen == true"
              @mouseleave="closeSubMenu"
              class="z-20 absolute right-5 md:right-28 mt-2 w-48 bg-white border rounded shadow-lg"
            >
              <button
                @click="profile()"
                class="w-full text-left block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                บัญชีของฉัน
              </button>
              <button
                @click="showorder()"
                class="w-full text-left block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                การซื้อของฉัน
              </button>
              <button
                @click="logout()"
                class="w-full text-left block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                ออกจากระบบ
              </button>
            </div>
          </div>
        </div>
        <div v-else>
          <router-link to="/login">
            <button class="hover:underline">เข้าสู่ระบบ / สมัครสมาชิก</button>
          </router-link>
        </div>
      </div>
    </div>
    <nav class="items-center mx-10 md:mx-24 pb-5 gap-6 flex justify-center">
      <div class="flex items-center text-gray-800">
        <router-link to="/">
          <img src="../../assets/images/logo.jpg" :width="70" alt="" class="" />
        </router-link>
      </div>
      <div class="flex items-center text-gray-800 w-4/6">
        <div class="w-full">
          <!-- max-w-md   mx-auto-->
          <div class="relative">
            <input
              type="search"
              autocomplete="off"
              id="default-search"
              class="block w-full px-4 py-4 text-sm text-[#000] border rounded focus:ring-blue-500 bg-white border-[#8B2FC9] placeholder-[#000] focus:border-blue-500 focus:ring-blue-500"
              placeholder="ค้นหาสินค้า"
              v-model="searchQuery"
              @input="fetchResults"
              @blur="hideResults"
              @focus="fetchResults"
              required
            />
            <button
              @click="linksearch()"
              class="text-white absolute end-2.5 bottom-2.5 bg-[#8B2FC9] hover:bg-[#E178C5] focus:ring-2 focus:outline-none focus:ring-[#DC97FF] font-medium rounded text-sm px-4 py-2"
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
            <div
              class="absolute top-full left-0 z-10 mt-1 w-full bg-white border rounded border-gray-300"
              v-if="searchResults.length && showResults"
            >
              <ul>
                <li
                  v-for="(result, index) in searchResults"
                  :key="index"
                  class="px-4 py-2 hover:bg-gray-100"
                  @click="linkauto(result.product_name)"
                >
                  {{ result.product_name }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center text-gray-800">
        <!--ตะกร้า-->
        <button @click="showcart()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="10" cy="20.5" r="1" />
            <circle cx="18" cy="20.5" r="1" />
            <path
              d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1"
            />
          </svg>
        </button>
      </div>
    </nav>
  </section>
  <Sidebar
    v-model:visible="sidebarshowcart"
    header="ตะกร้าสินค้า"
    position="right"
    style="width: 650px"
  >
    <div class="border-t border-gray-300 pt-5">
      <div v-if="$store.getters.cart.length > 0">
        <div
          v-for="(item, index) in $store.getters.cart"
          :key="index"
          class="flex w-full py-3"
        >
          <div class="w-1/4 flex justify-center items-center">
            <img
              v-if="item.product_image && !item.product_imageError"
              :src="item.product_image"
              @error="item.product_imageError = true"
              class="h-36 w-full object-cover"
            />
            <img
              v-else
              src="@/assets/images/noproduct.png"
              class="h-36 w-full object-cover"
            />
          </div>
          <div class="flex w-3/4">
            <div class="flex flex-col w-full pl-4 text-sm md:text-base">
              {{ item.product_name }}<br />
              <span class="text-xs text-gray-500">{{ item.product_title }}</span>
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
            <div class="flex flex-col h-full w-full">
              <div class="font-semibold text-sm md:text-base">
                ฿
                {{
                  item.selling_price?.toLocaleString("en", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                }}
              </div>
              <!-- <div class="flex-grow"></div> -->
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
      <div v-else>
        <div class="flex justify-center items-center">
          <div class="text-lg font-bold text-[#000]">ไม่มีสินค้าในตะกร้า</div>
        </div>
      </div>
    </div>
    <div v-if="$store.getters.cart.length > 0" class="w-full mt-4">
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
export default {
  components: {},
  data() {
    return {
      isOpen: false,
      isMobile: false,
      isSubMenuOpen: false,
      activeMenuItem: null,
      menuItems: [],
      searchQuery: "",
      searchResults: [],
      data: [],
      showResults: false,
      sidebarshowcart: false,
    };
  },

  async mounted() {
    await this.getData();
  },
  beforeDestroy() {},
  methods: {
    async getData() {
      const config = {
        method: "get",
        url: `${process.env.VUE_APP_MARUEY}product/`,
      };
      await axios(config)
        .then((res) => {
          this.data = res.data?.data;
          if (this.data.length > 0) {
            this.data = this.data.filter((item) => item?.product_status == true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
        localStorage.removeItem("token");
        this.$store.commit("setLoginDefault");

        // ทำการล็อกเอาท์ใน Store
        // window.location.reload();
        window.location.assign("/");
      }
    },

    fetchResults() {
      this.searchResults = this.data.filter((result) => {
        return result.product_name.toLowerCase().includes(this.searchQuery.toLowerCase());
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
    showorder() {
      this.sidebarshowcart = false;
      this.$router.push("/customer/order");
    },
    login() {
      this.$router.push("/login");
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
