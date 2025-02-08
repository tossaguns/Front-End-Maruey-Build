<template>
  <div v-if="$route.path === '/register' || $route.name === 'registerreferral' || $route.path === '/login'">
      <router-view />
  </div>
  <div v-else-if="$store.getters.logedIn&& userPosition !== 'customer'" class="w-full h-full bodyback" >
      <div class="flex  ">
        <div class="flex flex-no-wrap">
          <NavbarAdmin v-if="userPosition === 'admin'" />  
          <NavbarPartner v-if="userPosition === 'partner'" />
        </div>
         <div class="container w-full mx-auto py-2 px-2 overflow-x-auto">
          <router-view />
        </div>
      </div>
      <!-- <NavbarAdmin v-if="userPosition === 'admin'" />  
      <router-view /> -->
  </div>
  <div v-else-if="userPosition === 'customer' && $store.getters.logedIn">
    <div v-if="mode == 'WEBSITE'">
      <Navbar v-if="$route.path === '/'" />
    </div>
    <div v-else>
      <NavbarMoblie /> 
      <NavbarPartner />
    </div>
    <router-view />
  </div>
  <div v-else>
    <div v-if="$route.path === '/register'">
      <router-view />
    </div>
    <div v-else-if="$route.path === '/login'">
  
      <router-view />
    </div>
    <div v-else-if="$route.path === '/indexregister'">
      <router-view />
    </div>
    <div v-else >
       <div v-if="mode =='WEBSITE'">
          <Navbar v-if="$route.path === '/'"/>
        </div>
        <div v-else>
          <NavbarMoblie />
          <NavbarPartner />
        </div>
        <router-view />
    </div>
  </div>
  <Toast />
  <ConfirmDialog />
</template>

<script>
import NavbarAdmin from "@/components/template/NavbarAdmin.vue"
import NavbarPartner from './components/template/NavbarPartner.vue';
import Navbar from './components/template/Navbar.vue';
import NavbarMoblie from './components/template/NavbarMoblie.vue';
import jwtDecode from "jwt-decode";
import axios from 'axios';

export default {
  components: {
    NavbarAdmin,
    NavbarPartner,
    NavbarMoblie,
    Navbar
  },
  data() {
    return {
      userPosition: null,
      userActive: false,
      mode: null,
    };
  },
  
  created() {
    console.log(process.env.VUE_APP_TEST_ENV);
    this.mode = process.env.MODE;
    this.$store.commit("setLoading", true);
    if (localStorage.getItem("token")) {
      // เช็คว่า token ยังไม่หมดอายุ
      if (Date.now() >= jwtDecode(localStorage.getItem("token")).exp * 1000) {
        localStorage.clear();
        localStorage.removeItem("token");
        this.$store.commit("setLoginDefault");
        this.$router.push("/login");
        return;
      }
      this.getUserProfile()
    } else {
      localStorage.removeItem("token");
      this.$store.commit("setLoginDefault");
    }
  },
  methods: {
    async getUserProfile () {
      try {
        const response = await axios.get(`${process.env.VUE_APP_MLM}/getUserProfile_token`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        })
        ////console.log(response.data)
        if (response.data.status === 'success') {
          this.userPosition = "customer"
          const payload = {
            user_id: response.data.data.id,
            username: response.data.data.user_name
          }
          const res = await axios.post(`${process.env.VUE_APP_MLM}/getUserProfile`, payload, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
          })
          ////console.log(res.data)
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
            this.$store.commit("setLogin", loginData)
          }
        }
      }
      catch(err) {
        ////console.log(err)
      }
    }
  }
}
</script>

<style>
.p-dialog-mask{
  background-color: var(--maskbg) !important;
}
.bodyback {
  background-color: #DC97FF;

}
.p-inputtext {
   padding: 0.5rem;

}

.p-toast-message-icon{
  margin-top: 11px;
  margin-left: 10px;
  margin-right: 10px; 
}
.p-toast-summary{
  font-size: 1.1rem;
  font-weight: bold;
}
.p-button .p-button-icon-left{
  margin-right: 0.5rem;

}

.buttonfile {
  background-color: #8B2FC9 !important;
  border: none;
}
.buttonfile:hover {
  background-color: #E178C5 !important;
  border: none;
}
.p-image-preview{
  width: 50vw;
  height: 50vh;
  margin: 0 auto;
  display: block;

}
.p-inputswitch-slider:before{
    box-sizing: border-box;
    margin: -10px;
    margin-left: 0px;
    font-weight: normal;
}

.p-inputswitch.p-inputswitch-checked .p-inputswitch-slider{
    background-color: #8B2FC9;
}
.p-dropdown-panel .p-dropdown-header .p-dropdown-filter-icon{
  top:0.9rem;
  right: 0.75rem;
  color:#6b7280;
}
.p-multiselect-label{
  padding: 0.5rem;
  transition :background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
}
.p-multiselect-panel .p-multiselect-items .p-multiselect-item .p-checkbox{
  margin-right: 0.5rem !important;
}
.p-multiselect-filter-icon{
  top:0.9rem;
  right: 0.75rem;
  color:#6b7280;
}
.p-multiselect-filter{
  margin-left:0.5rem; 
}

div:where(.swal2-container) {
  z-index: 9999999999999999 !important;
}
.p-rating .p-rating-item.p-rating-item-active .p-rating-icon{
  color: #8B2FC9
}
 
</style>

<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>