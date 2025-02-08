<template>
  <!-- เมนูจอคอม -->
  <div class="h-screen py-5 px-2 ">
  
  <button v-if="isSidebarDesktopOpen == true && isMobile ==false"   aria-label="Close sidebar" class="h-10 w-20 z-0 bg-[#8B2FC9] absolute   items-center rounded-tr rounded-br justify-center cursor-pointer  z-1 font-bold " style="top:85px; left:260px;"  @click="closeDesktop">
     
     <span class="flex justify-end pr-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="text-right" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
     </span>
     
  </button>
  <div v-if="isSidebarDesktopOpen == true"   class="w-72 lg:w-72 h-full  rounded-xl  sticky top-0 overflow-y-auto bg-[#FFFFFF] border-[#8B2FC9] border-r-2  flex-col justify-between hidden lg:flex  shadow-2xl ">
    <div class="">
      <div class="h-10 w-full flex items-center"></div>
     
      <div class="flex items-center justify-center flex-shrink-0 pb-6 ">
       
          <img class=" mb-4 mx-auto  w-40" src="../../assets/images/logo.png" >
           
      </div>
      <div class="hidden border-b border-dashed lg:block "></div>

      <div class="flex items-center justify-between px-4 py-3 bg-[#8B2FC9]">
        <div class="flex items-center mr-5">
          <div class="mr-5">
            <div class="inline-block relative shrink-0 cursor-pointer rounded-[.95rem]">
              <svg
                @click="edituser()"
                class="shrink-0 text-[#FAF5E4] inline-block"
                width="32"
                height="32"
                viewBox="0 0 496 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M248 104c-53 0-96 43-96 96s43 96 96 96s96-43 96-96s-43-96-96-96m0 144c-26.5 0-48-21.5-48-48s21.5-48 48-48s48 21.5 48 48s-21.5 48-48 48m0-240C111 8 0 119 0 256s111 248 248 248s248-111 248-248S385 8 248 8m0 448c-49.7 0-95.1-18.3-130.1-48.4c14.9-23 40.4-38.6 69.6-39.5c20.8 6.4 40.6 9.6 60.5 9.6s39.7-3.1 60.5-9.6c29.2 1 54.7 16.5 69.6 39.5c-35 30.1-80.4 48.4-130.1 48.4m162.7-84.1c-24.4-31.4-62.1-51.9-105.1-51.9c-10.2 0-26 9.6-57.6 9.6c-31.5 0-47.4-9.6-57.6-9.6c-42.9 0-80.6 20.5-105.1 51.9C61.9 339.2 48 299.2 48 256c0-110.3 89.7-200 200-200s200 89.7 200 200c0 43.2-13.9 83.2-37.3 115.9"
                />
              </svg>
            </div>
          </div>
          <div class="mr-2">
            <div
              class="hover:text-[#FFFF] text-[#FAF5E4] transition-colors duration-200 ease-in-out text-sm font-medium text-secondary-inverse"
            >
              {{ $store.getters.name }}
            </div>

            <span class="text-[#FAF5E4] font-medium block text-[0.85rem]"
              >{{ $store.getters.row}}
            </span>
          </div>
        </div>
        <button @click="edituser($store.getters._id)" class="inline-flex relative items-center group justify-end text-base font-medium leading-normal text-center align-middle cursor-pointer rounded-[.95rem] transition-colors duration-150 ease-in-out text-dark bg-transparent shadow-none border-0" title="ตั้งค่าโปรไฟล์">
          <span
            class="leading-none transition-colors duration-200 ease-in-out peer group-hover:text-primary text-secondary-dark"
          >
            <svg
              class="text-[#FAF5E4]"
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
          </span>
        </button>
      </div>

      <div class="hidden border-b border-dashed lg:block border-[#EFD99B]"></div>

      <div class="flex-1 mt-2 px-4 space-y-3 overflow-hidden hover:overflow-auto">
        <div v-for="menuItem in menuItems" :key="menuItem.text">
        <button @click="handleMenuItemClick(menuItem)"
            :class="{
              'bg-#fff] text-[#8B2FC9]': menuItem.showSubmenu,
              'hover:bg-[#8B2FC9] hover:text-[#FFFFEC]': !menuItem.showSubmenu,
            }"
            class="flex items-center w-full space-x-2 group hover:bg-[#8B2FC9] hover:text-[#FFFFEC] text-[#8B2FC9] rounded-lg  py-2 "
          >
            <span
              aria-hidden="true"
              :style="{ background: menuItem.showSubmenu ? '' : '' }"
              class="p-2  items-center group-hover:text-[#FFFFEC] rounded-lg"
            >
              <!-- svg -->
              <div v-html="menuItem.icon"></div>
            </span>
            <span class="font-medium  text-base">{{ menuItem.text }}</span>

            <span class="ml-10">
              <svg
                v-if="menuItem.submenu"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 20 20"
                :class="{
                  'rotate-180': menuItem.showSubmenu,
                  'rotate-0': !menuItem.showSubmenu,
                }"
                class="inline mt-1 ml-1 transition-transform duration-200 transform md:-mt-1"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
          </button>

          <!-- Additional submenu for specific items -->
          <div
            v-if="menuItem.submenu && menuItem.showSubmenu"
            class="mt-2 origin-top-right rounded-md shadow-lg"
          >
            <div class="px-2 py-2 bg-white rounded-md shadow">
              <button
                v-for="subItem in menuItem.submenu"
                :key="subItem.text"
                @click="handleSubmenuItemCick(subItem)"
                class="flex items-center w-full px-4 py-2 mt-2 text-sm font-medium bg-transparent rounded-lg md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              >
                {{ subItem.text }}
              </button>
            </div>
          </div>
        </div>
        <br>
        <div class=" pb-16">
            <button @click="logout" class="w-full mt-10 bg-[#8B2FC9] rounded-full py-2.5   text-white">
              ออกจากระบบ
          </button>
        </div>
       
      </div>
    </div>
  </div>

    <nav
    v-if ="(isSidebarDesktopOpen == false || isMobile)   && (isSidebarOpen == false ||isMobile == false)"
    aria-label="toggle sidebar"
    class="z-20 flex flex-col sticky top-0 items-center flex-shrink-0 w-16  py-4 bg-white border-r-2 border-indigo-100 shadow-md sm:flex rounded-xl h-full "
 
  >
    <!-- Logo -->
    <div class="flex py-4 items-center justify-center">
       <img class=" mb-4 mx-auto h-10 w-10" src="../../assets/images/logo.png" >
    </div>

    <div class="flex flex-col items-center flex-1 p-2 space-y-4 overflow-y-auto min-h-80">
      <!-- ปุ่มปิดเมนู ของคอม -->
      <button
        v-if="!isMobile"
        @click="openDesktop"
        class="p-2 transition-colors rounded-lg shadow-md focus:outline-none focus:ring focus:ring-[#8B2FC9] focus:ring-offset-white focus:ring-offset-2"
        :class="{
          'text-white bg-[#8B2FC9]': isSidebarDesktopOpen,
          'text-[#8B2FC9] bg-white': !isSidebarDesktopOpen,
        }"
      >
        <span class="sr-only">Toggle sidebar</span>
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M2 2h20v20H2zm2 2v5.5h16V4zm16 7.5H4V20h16zM5.996 6H8v2h-.004v.004h-2zM10 6h8v2h-8z"
          />
        </svg>
      </button>
      <!-- ปุ่มปิดเมนู ของมือถือ -->
      <button
        v-if="isMobile"
        @click="toggleMenu"
        class="p-2 transition-colors rounded-lg shadow-md focus:outline-none focus:ring focus:ring-[#12372A] focus:ring-offset-white focus:ring-offset-2"
        :class="{
          'text-white bg-[#8B2FC9]': isSidebarOpen,
          'text-[#8B2FC9] bg-white': !isSidebarOpen,
        }"
      >
        <span class="sr-only">Toggle sidebar</span>
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M2 2h20v20H2zm2 2v5.5h16V4zm16 7.5H4V20h16zM5.996 6H8v2h-.004v.004h-2zM10 6h8v2h-8z"
          />
        </svg>
      </button>

      
    </div>
  </nav>

  <button
        v-if="isSidebarOpen && isMobile"
        aria-label="Close sidebar"
        class="h-10 w-12 z-10 bg-[#8B2FC9] absolute   items-center rounded-tr rounded-br justify-center cursor-pointer   font-bold " style="top:85px; left:255px;"
        @click="closeMenu"
      >
        <span class="flex justify-end pr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="text-right"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFF"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </span>
      </button>
  <!-- mobile -->
  <transition name="fade">
    <div
      v-if="isMobile"
      :class="{ hidden: !isSidebarOpen }"
      style="height:100vh;"
      class="w-64 fixed inset-y-0 z-20 bg-[#FFFFFF] border-[#8B2FC9] flex-shrink-0 border-r-2 shadow-lg left-2 my-5 flex-col rounded-xl   max-h-100 overflow-y-auto "
    >
      <!-- ปุ่มปิดเมนู -->
    

      <div class="">
        <div class="flex items-center justify-center flex-shrink-0 py-10">
          <a href="#">
              <img class="h-14 mb-4 mx-auto h-40 w-40" src="../../assets/images/logo.png" >
          </a>
        </div>
        <!---->
      <div class="flex items-center justify-between px-4 py-3 bg-[#8B2FC9]">
        <div class="flex items-center ">
          <div class="mr-5">
            <div class="inline-block relative shrink-0 cursor-pointer rounded-[.95rem]">
              <svg
                @click="edituser()"
                class="shrink-0 text-[#FAF5E4] inline-block"
                width="32"
                height="32"
                viewBox="0 0 496 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M248 104c-53 0-96 43-96 96s43 96 96 96s96-43 96-96s-43-96-96-96m0 144c-26.5 0-48-21.5-48-48s21.5-48 48-48s48 21.5 48 48s-21.5 48-48 48m0-240C111 8 0 119 0 256s111 248 248 248s248-111 248-248S385 8 248 8m0 448c-49.7 0-95.1-18.3-130.1-48.4c14.9-23 40.4-38.6 69.6-39.5c20.8 6.4 40.6 9.6 60.5 9.6s39.7-3.1 60.5-9.6c29.2 1 54.7 16.5 69.6 39.5c-35 30.1-80.4 48.4-130.1 48.4m162.7-84.1c-24.4-31.4-62.1-51.9-105.1-51.9c-10.2 0-26 9.6-57.6 9.6c-31.5 0-47.4-9.6-57.6-9.6c-42.9 0-80.6 20.5-105.1 51.9C61.9 339.2 48 299.2 48 256c0-110.3 89.7-200 200-200s200 89.7 200 200c0 43.2-13.9 83.2-37.3 115.9"
                />
              </svg>
            </div>
          </div>
          <div class="mr-2">
            <div
              class="hover:text-[#FFFF] text-[#FAF5E4] transition-colors duration-200 ease-in-out text-sm font-medium text-secondary-inverse"
            >
              {{ $store.getters.name }}
            </div>

            <span class="text-[#FAF5E4] font-medium block text-[0.85rem]"
              >{{ $store.getters.row}}
            </span>
          </div>
        </div>
        <button @click="edituser()" class="inline-flex relative items-center group justify-end text-base font-medium leading-normal text-center align-middle cursor-pointer rounded-[.95rem] transition-colors duration-150 ease-in-out text-dark bg-transparent shadow-none border-0" title="ตั้งค่าโปรไฟล์">
          <span
            class="leading-none transition-colors duration-200 ease-in-out peer group-hover:text-primary text-secondary-dark"
          >
            <svg
              class="text-[#FAF5E4]"
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
          </span>
        </button>
      </div>
        <!---->
        <div class="flex-1 mt-2 px-4 space-y-3  max-h-screen overflow-y-auto ">
        <div v-for="menuItem in menuItems" :key="menuItem.text">
        <button @click="handleMenuItemClick(menuItem)"
            :class="{
              'bg-#8B2FC9] text-[#FFFFEC]': menuItem.showSubmenu,
              'hover:bg-[#8B2FC9] hover:text-[#FFFFEC]': !menuItem.showSubmenu,
            }"
            class="flex items-center w-full space-x-2 group hover:bg-[#8B2FC9] hover:text-[#FFFFEC] text-[#8B2FC9] rounded-lg font-semibold py-4"
          >
            <span
              aria-hidden="true"
            
              class="p-2 items-center group-hover:text-[#FFFFEC] rounded-lg"
            >
              <!-- svg -->
               <div v-html="menuItem.icon"></div>
            </span>
            <span class="font-semibold  text-base">{{ menuItem.text }}</span>

            <span class="ml-10">
              <svg
                v-if="menuItem.submenu"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 20 20"
                :class="{
                  'rotate-180': menuItem.showSubmenu,
                  'rotate-0': !menuItem.showSubmenu,
                }"
                class="inline mt-1 ml-1 transition-transform duration-200 transform md:-mt-1"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
          </button>

          <!-- Additional submenu for specific items -->
          <div
            v-if="menuItem.submenu && menuItem.showSubmenu"
            class="mt-2 origin-top-right rounded-md shadow-lg"
          >
            <div class="px-2 py-2 bg-white rounded-md shadow">
              <button
                v-for="subItem in menuItem.submenu"
                :key="subItem.text"
                @click="handleSubmenuItemCick(subItem)"
                class="flex items-center w-full px-4 py-2 mt-2 text-sm font-medium bg-transparent rounded-lg md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              >
                {{ subItem.text }}
              </button>
            </div>
          </div>
        </div>
        <div class=" pb-16">
            <button @click="logout" class="w-full mt-10 bg-[#8B2FC9] rounded-full py-2.5   text-white">
              ออกจากระบบ
          </button>
        </div>
      </div>
    
        
      </div>
    </div>
  </transition>
  
  
  </div>



</template>

<script>
import Swal from "sweetalert2";
// import Icon from "../Amin_Icon.vue";

export default {
  components: {
    // Icon,
  },

  data() {
    return {
      isSidebarDesktopOpen: true,
      isSidebarOpen: false,
      isMobile: false,
      isSubmenuOpen: false,

      menuItems: [
        {
          text: "DashBoard",
          action: "/home",
          icon: "<i class='pi pi-home' style='font-size: 1.4rem'></i>",
        },
        {
          text: "จัดการข้อมูลตำแหน่ง",
          submenu: [
            { text: "จัดการข้อมูล Admin", path: "/admin" },
            { text: "จัดการข้อมูล Partner", path: "/partner" },
            { text: "จัดการข้อมูล Customer", path: "/customer" }
          ],
          icon: "<i class='pi pi-users' style='font-size: 1.4rem'></i>",
        },
        {
          text: "จัดการข้อมูลสินค้า",
          submenu: [
            { text: "ข้อมูลสินค้า", path: "/product" },
            { text: "หมวดหมู่สินค้า", path: "/product/category" },
            { text: "หมวดหมู่สินค้าย่อย", path: "/product/type" },
            { text: "คำร้องขอฝากขายสินค้า", path: "/product/requestproduct" }
          ],
          icon: "<i class='pi pi-file' style='font-size: 1.4rem'></i>",
        },
        {
          text: "จัดการข้อมูลพื้นฐาน",
           submenu: [
            { text: "ข้อมูลพื้นฐาน", path: "/information" },
            { text: "กำหนดเปอร์เซ็นต์", path: "/percentprofit" },
             { text: "จัดการข้อมูลสัญญา", path: "/contact/" },
          ],
          icon: "<i class='pi pi-file' style='font-size: 1.4rem'></i>",
        },
        {
          text:"ข้อมูลออเดอร์",
          submenu: [
            { text: "ข้อมูลออเดอร์", path: "/order/all" },
           
            {text: "แบ่งรายได้ตามออเดอร์", path: "/order/shareincome" },
          ],
          icon: "<i class='pi pi-file' style='font-size: 1.4rem'></i>",
        },
        {
          text:"ข้อมูลออเดอร์มารวย",
           submenu: [
            { text: "ดูออเดอร์ของมารวย", path: "/order/marueyall" },
            { text: "ออเดอร์ที่ต้องส่งให้ลูกค้า", path: "/order/getproduct" },
          ],
          icon: "<i class='pi pi-file' style='font-size: 1.4rem'></i>",
        },
        {
          text:"ข้อมูลออเดอร์partner",
           submenu: [
            { text: "ดูออเดอร์ของpartner", path: "/order/partnerall/" },
          ],
          icon: "<i class='pi pi-file' style='font-size: 1.4rem'></i>",
        },
        {
          text:"ข้อมูล Report",
           submenu: [
            {text:"สรุปยอดขายของpartner",path:"/report/reportprice"},
            {text: "สรุปยอดเงินคงเหลือในระบบ", path: "/report/reportsummarytoday/" },
            { text:"สรุปรายรับ-รายจ่าย" , path: "/report/reportprofitandloss" },
            {text:"สรุปรายงานสินค้าสินค้าตีกลับ",path:"/report/reportreturnproduct"}
          ],
          icon: "<i class='pi pi-file' style='font-size: 1.4rem'></i>",
        }
        ,{
          text:"ข้อมูลการถอนเงิน",
           submenu: [
            { text: "ถอนเงิน (ลูกค้า)", path: "/withdraw/withdrawmoney" },
            {text: "ถอนเงิน (partner)", path: "/withdraw/withdrawmoneypartner" },
          ],
          icon: "<i class='pi pi-file' style='font-size: 1.4rem'></i>",
        }
  
        // {
        //   text: "จัดการแผนกงาน",
        //   action: "/AddEmp",
        //   icon: "Form",
        // },

        // {
        //   text: "ลูกค้าทั้งหมด",
        //   action: "/Custumers",
        //   icon: "Customer",
        // },
      ],
    };
  },

  mounted() {
    // ตรวจสอบหน้าจอ mobile หรือไม่

    this.isMobile = window.innerWidth <= 1023;
 
    // เพิ่ม event listener เพื่อตรวจสอบการปรับขนาดหน้าจอ
    window.addEventListener("resize", this.handleResize);
  },
  async created() {},
  methods: {
    async edituser (){
      this.$router.push(`/profile/`);
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
        this.$store.commit("setLoginDefault");

        // ทำการล็อกเอาท์ใน Store
        // window.location.reload();
         window.location.assign("/");
         
        
      }
    },

    handleMenuItemClick(menuItem) {
      if (menuItem.action) {
        this.$router.push(menuItem.action);
      } else if (menuItem.submenu) {
        this.menuItems.forEach((item) => {
          if (item !== menuItem) {
            item.showSubmenu = false;
          }
        });
        menuItem.showSubmenu = !menuItem.showSubmenu;
      }
    },

    handleSubmenuItemCick(subItem) {
      if (subItem.path) {
        this.$router.push(subItem.path);
      }
    },

    handleResize() {
      this.isMobile = window.innerWidth <= 912;
    },
    toggleMenu() {
      this.isSidebarOpen = !this.isSidebarOpen;


    },
    toggleSubmenu(menuItem) {
      menuItem.showSubmenu = !menuItem.showSubmenu;
    },
    closeMenu() {
     
      this.isSidebarOpen = false;

    },
    closeDesktop(){
      this.isSidebarDesktopOpen = false;
    },
    openDesktop(){
      this.isSidebarDesktopOpen = true;
    }
  },
};
</script>

<style scoped>
/* styles.css */
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.menu-btn {
  position: absolute;
  left:280px;
  top: 50px;
  padding: 0.5rem;
  font-size: 1.5rem;
  color: #12372a;
  background-color: #f5cca0;
  border-radius: 0.5rem;
  z-index: 10;
}
</style>