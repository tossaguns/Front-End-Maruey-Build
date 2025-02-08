<template>
  <Sidebar v-model:visible="isLoading" header=" " position="bottom" style="height: 100%" :showCloseIcon="false" class="!bg-gradient-to-br from-[#745abd] to-[#9540ce]">
        <div class="text-white flex justify-center items-center mt-20">
            <div class="text-center flex flex-col items-center gap-3">
                <div class="loader my-10"></div>
                <p class="text-xl opacity-50">กรุณารอซักครู่ . . .</p>
            </div>
        </div>    
    </Sidebar>
  <ConfirmDialog></ConfirmDialog>
  <Dialog v-model:visible="visiblePVActive" modal header=" " :style="{ width: '25rem' }">
    <div class="flex flex-col gap-2 items-center">
      <p class="text-xl font-bold">ยืนยันการแจงยืนยันรับสิทธิ์</p>
      <p>รหัสสมาชิก : {{ target_username }}</p>
      <p>ใช้ PV : {{ target_pv }}</p>
    </div>
    <div class="flex justify-end gap-5 mt-5 border-t pt-3">
        <Button type="button" label="ยกเลิก" class="text-gray-500" @click="visiblePVActive = false"></Button>
        <Button type="button" label="ยืนยัน" @click="confirmPVActive()" class="bg-purple-500 text-white px-2 py-1"></Button>
    </div>
  </Dialog>
  <Dialog v-model:visible="visiblePVUpgrade" modal header=" " :style="{ width: '25rem' }">
    <div class="flex flex-col gap-2 items-center">
      <p class="text-xl font-bold">ยืนยันการแจงปรับตำแหน่งสูงขึ้น</p>
      <p>รหัสสมาชิก : {{ target_username }}</p>
      <p>ใช้ PV : {{ target_pv }}</p>
    </div>
    <div class="flex justify-end gap-5 mt-5 border-t pt-3">
        <Button type="button" label="ยกเลิก" class="text-gray-500" @click="visiblePVUpgrade = false"></Button>
        <Button type="button" label="ยืนยัน" @click="confirmPVUpgrade()" class="bg-purple-500 text-white px-2 py-1"></Button>
    </div>
  </Dialog>
  <Dialog v-model:visible="visiblePVCashback" modal header=" " :style="{ width: '25rem' }">
    <div class="flex flex-col gap-2 items-center">
      <p class="text-xl font-bold">ยืนยันการแจง Cashback</p>
      <p>รหัสสมาชิก : {{ target_username }}</p>
      <p>ใช้ PV : {{ target_pv }}</p>
    </div>
    <div class="flex justify-end gap-5 mt-5 border-t pt-3">
        <Button type="button" label="ยกเลิก" class="text-gray-500" @click="visiblePVCashback = false"></Button>
        <Button type="button" label="ยืนยัน" @click="confirmPVCashback()" class="bg-purple-500 text-white px-2 py-1"></Button>
    </div>
  </Dialog>
  
  <!-- อันใหม่ -->
  <div class="bg-slate-200 min-h-screen w-full">
    <div class="h-full flex flex-col bg-gradient-to-bl from-purple-500 to-purple-900">
      <div class="">
        <div class="text-white text-end px-5 pt-3 text-xs" :class="from?.qualification_id === 'MC' ? 'hidden' : ''">
          รหัสผู้แนะนำ: {{ from.introduce_id }} | V {{ current_version }}
        </div>
        <div class="flex items-start justify-between px-5 relative mt-5">
          
          <div class="w-full flex flex-col justify-center items-center">
            <div class="border-4 bg-purple-400 w-24 h-24 rounded-full flex items-center justify-center relative mb-3">
              <i class="pi pi-user text-4xl text-white"></i>
              <span class="absolute -bottom-2 bg-gradient-to-tr from-purple-400 to-purple-700 text-white shadow rounded-xl px-2">{{ from.qualification_id }}</span>
            </div>
            <div class="text-lg font-bold text-center text-white">{{ from?.name }}</div>
            <div class="text-center text-white">
              <span class="mr-3">{{ from.user_name }}</span>
              <button type="button" class="hidden">
                <i class="pi pi-copy text-white opacity-80"></i>
              </button>
            </div>
            <div class="flex text-xs gap-1 mt-5" v-if="from.qualification_id !== 'MC'">
              <div v-if="dayjs(from.expire_date).diff(dayjs(new Date()), 'day') > 0" class="flex gap-2 bg-white/80 px-2 rounded-xl py-1">
                <span><span class="bg-green-400 rounded-xl">Active</span> {{ dateLongTH(from.expire_date) }}</span>
                <span class="hidden">({{ dayjs(from.expire_date).diff(dayjs(new Date()), 'day') }} วัน)</span>
              </div>
              <div v-else class="flex gap-2 bg-white/80 px-2 rounded-xl py-1">
                <span><span class="bg-red-400 rounded-xl">no-Active</span> {{ 'หมดอายุ' }}</span>
              </div>
              
              <div v-if="dayjs(from.expire_date_bonus).diff(dayjs(new Date()), 'day') > 0" class="flex gap-2 bg-white/80 px-2 rounded-xl py-1">
                <div class="relative">
                  <p class="absolute -top-5 text-xs text-yellow-300">super bonus</p>
                  <span><span class="bg-green-400 rounded-xl">Active</span> {{ dateLongTH(from.expire_date_bonus) }}</span>
                  <span class="hidden">({{ dayjs(from.expire_date_bonus).diff(dayjs(new Date()), 'day') }} วัน)</span>
                </div>
              </div>
              <div v-else class="flex gap-2 bg-white/80 px-2 rounded-xl py-1">
                <div class="relative">
                  <p class="absolute -top-5 text-xs text-yellow-300">super bonus</p>
                  <span><span class="bg-red-400 rounded-xl">no-Active</span> {{ 'ไม่มี' }}</span>
                </div>
              </div>

            </div>
          </div>
          <div class="w-fit flex justify-end h-full mt-2 gap-2 absolute right-5 top-0">
            <div
              class="pi pi-cog text-white border rounded-full p-2 h-fit"
              @click="router.push('/customer/menucustomer')"
            >
            </div>
          </div>

        </div>
        <div class="w-full flex justify-center p-5">
          <div class="grid grid-cols-3 w-full gap-2" v-if="from.qualification_id !== 'MC'">
            <div class="bg-yellow-500/30 rounded py-3 shadow w-full text-center relative">
              <span class="text-white/30 text-sm">เพิ่มวัน</span>
              <span class="absolute bottom-4 left-1/2 -translate-x-1/2 rotate-[-20deg] text-xs text-white truncate bg-purple-500 px-2 rounded">coming soon</span>
            </div>
            <div class="bg-sky-500/30 rounded py-3 shadow w-full text-center relative">
              <span class="text-white/30 text-sm">สายงานแนะนำ</span>
              <span class="absolute bottom-4 left-1/2 -translate-x-1/2 rotate-[-20deg] text-xs text-white truncate bg-purple-500 px-2 rounded">coming soon</span>
            </div>
            <div class="bg-pink-500 rounded py-3 shadow w-full text-center" @click="router.push('/customer/pvchain')">
              <span class="text-white text-sm">สายงานสมาชิก</span>
            </div>

            <button type="button" class="bg-purple-500 rounded py-3 shadow w-full text-center relative" @click="invitefriendHandle()" :disabled="from.qualification_id === 'MC' || from.qualification_id === 'MB' || from.qualification_id === 'MO' || from.qualification_id === 'VIP'">
              <span class="text-white text-sm">ชวนเพื่อน</span>
              <span class="absolute hidden bottom-4 left-1/2 -translate-x-1/2 rotate-[-20deg] text-xs text-white truncate bg-purple-500 px-2 rounded">coming soon</span>
              <p v-if="from.qualification_id === 'MC' || from.qualification_id === 'MB' || from.qualification_id === 'MO' || from.qualification_id === 'VIP'" class="absolute truncate bottom-0 left-1/2 -translate-x-1/2 text-xs text-yellow-300">! ระดับ VVIP ขึ้นไป</p>
            </button>
            <button type="button" 
            :disabled="from.qualification_id === 'MC'"
            :class="from.qualification_id === 'MC' ? 'opacity-30' : 'opacity-100'"
            class="bg-green-500 rounded py-3 shadow w-full text-center relative" 
            @click="router.push('/customer/register-downline')">
              <span class="text-white text-sm">สมัครสมาชิก</span>
              <span class="absolute bottom-4 left-1/2 -translate-x-1/2 rotate-[-20deg] text-xs text-white truncate bg-purple-500 px-2 rounded hidden">coming soon</span>
            </button>
            <div class="bg-yellow-300/30 rounded py-3 shadow w-full text-center relative">
              <span class="text-black/30 text-sm">อัพตำแหน่ง</span>
              <span class="absolute bottom-4 left-1/2 -translate-x-1/2 rotate-[-20deg] text-xs text-white truncate bg-purple-500 px-2 rounded">coming soon</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="h-full flex flex-col bg-slate-200 mb-16 pt-5 pb-10">
      <div class="relative flex mx-4 p-3 rounded-xl"
      :class="from.shop_partner ? 'shadow-xl bg-gradient-to-tr from-orange-400 to-orange-700' : 'bg-gradient-to-tr from-purple-400 to-purple-700'" 
      v-if="from.qualification_id !== 'MC' && store.getters.me?.user_name"
      @click="from.shop_partner ? $router.push('/partner/home') : $router.push('/partner/register')"
      >
        <div class="w-4/12 rounded-md flex flex-col justify-center items-center">
          <i class="pi pi-users text-white" style="font-size: 2rem;"></i>
          <span v-if="from.shop_partner?.status === 4" class="min-w-fit text-center text-xs bg-yellow-300 px-2 rounded">รอเพิ่มข้อมูล</span>
        </div>
        <div class="w-10/12 text-right" v-if="!from.shop_partner">
          <div class="text-xl text-white">สมัครพาร์ทเนอร์</div>
          <div class="text-purple-200">สมัครพาร์ทเนอร์ เปิดสร้างรายได้</div>
        </div>
        <div class="w-10/12 text-right" v-else>
          <div class="text-lg text-white">{{ from.shop_partner?.name }}</div>
          <div class="text-orange-300">รหัสพาร์ทเนอร์ : {{ from.shop_partner?.code || '???' }}</div>
        </div>
        <div v-if="!from.shop_partner" class="absolute top-0 left-0 bg-red-500 text-yellow-300 text-xs px-2 py-1 rounded-r-md">ใหม่</div>
      </div>
      <div class="w-full px-5" 
      v-if="
      from.qualification_id === 'VVIP'
      || from.qualification_id === 'XVVIP'
      || from.qualification_id === 'SVVIP'
      || from.qualification_id === 'MG'
      || from.qualification_id === 'MR'
      || from.qualification_id === 'ME'
      || from.qualification_id === 'MD'
      "
      >
        <button @click="copyInvitePartner(store.getters.me?.user_name)" class="w-full flex items-center justify-center gap-3 py-2 rounded bg-purple-500 text-white mt-3">
          <p>ชวนสมาชิกสมัครพาร์ทเนอร์</p>
          <i class="pi pi-copy"></i>
        </button>
      </div>
      <div class="flex bg-[#fff] my-4 mx-4 p-3 rounded-xl" v-if="from.qualification_id !== 'MC'">
        <div class="w-2/12 bg-purple-100 rounded-md flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#7f2cca"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M7 15h0M2 9.5h20" />
          </svg>
        </div>
        <div class="w-10/12 text-right">
          <div class="text-xl text-[#7f2cca]">{{ (from.pv_upgrad || 0)?.toLocaleString() }}</div>
          <div class="text-stone-600">PV สะสมขึ้นตำแหน่ง</div>
        </div>
      </div>
      <div class="flex bg-[#fff] mb-4 mx-4 p-3 rounded-xl" v-if="from.qualification_id !== 'MC'">
        <div class="w-2/12 bg-purple-100 rounded-md flex justify-center items-center">
          <i class="text-[#7f2cca]" style="font-size: 2rem;">PV</i>
        </div>
        <div class="w-10/12 text-right">
          <div class="text-xl text-[#7f2cca]">
            {{ (from.pv || 0)?.toLocaleString() }}
            <button @click="usePvToggle" :disabled="from.qualification_id === 'MC'"><i class="pi pi-caret-down" :aria-haspopup="true" aria-controls="usepvmenu"></i></button>
            <Menu ref="usePvmenu" id="usepvmenu" :model="usePvitems" :popup="true" />
          </div>
          <div class="text-stone-600"><span class="text-xs mr-3 text-[#7f2cca]" v-if="from.qualification_id === 'MC'">! ต้องมีระดับ MB ขึ้นไป</span>PV ใช้ได้</div>
        </div>
      </div>
      <div class="bg-[#fff] mb-4 mx-4 p-3 rounded-xl">
        <div class="flex">
          <div class="w-2/12 bg-purple-100 rounded-md flex justify-center items-center">
            <i class="pi pi-wallet text-[#7f2cca]" style="font-size: 2rem;"></i>
          </div>
          <div class="w-10/12 text-right">
            <div class="text-xl text-[#7f2cca]">
              {{ parseFloat(from.ewallet || 0)?.toLocaleString() || '0.00' }}
              <button><i class="pi pi-caret-down" @click="ewalletToggle" :aria-haspopup="true" aria-controls="ewalletmenu"></i></button>
              <Menu ref="ewalletmenu" id="ewalletmenu" :model="ewalletitems" :popup="true" />
            </div>
            <div class="text-stone-600">eWallet</div>
          </div>
        </div>
      </div>

      <div class="flex bg-[#fff] mb-4 mx-4 p-3 rounded-xl" v-if="from.qualification_id !== 'MC'">
        <div class="w-2/12 bg-purple-100 rounded-md flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#7f2cca"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
          </svg>
        </div>
        <div class="w-10/12 text-right">
          <div class="text-xl text-[#7f2cca]">
            -
            <button><i class="pi pi-caret-down"></i></button>
          </div>
          <div class="text-stone-600">รายได้สะสม</div>
        </div>
      </div>
      <div class="mx-4">
        <div class="bg-[#fff] text-center px-3 py-3 pb-5 font-medium w-full hidden justify-between items-center">
          <div class="text-left font-semibold text-base md:text-xl mb-3 min-w-fit">
            แชร์ลิงค์เชิญชวน
          </div>
          <div class="flex w-full flex-wrap justify-end">
            <div class="w-3/5 md:w-4/5 hidden">
              <input
                v-model="from.linkregistercode"
                type="text"
                class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
                placeholder="กรุณากรอกรหัสผู้แนะนำ"
                disabled
                id="copyInput"
              />
            </div>
            <div class="w-auto">
              <button
                @click="copylink()"
                class="bg-[#8B2FC9] text-white mt-1 p-2 rounded ml-2 w-full"
              >
                คัดลอกลิงค์
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="mx-4 mt-5">
        <button
          @click="logout"
          class="bg-red-600 hover:bg-red-700 text-white mt-1 p-2 rounded w-full"
        >
          ออกจากระบบ
        </button>
      </div>
    </div>
  </div>

  <Sidebar v-model:visible="pvUpgradeVisible" header="อัพเกรดตำแหน่ง" position="bottom" style="height: 100%">
    <div class="w-full flex flex-col items-center gap-3">
      <div class="flex flex-col gap-3 p-2 border w-full rounded items-center border-purple-500">
        <div class="flex items-center gap-3">
          <div class="w-20 h-20 rounded-full bg-purple-300 flex items-center justify-center">
            <i class="pi pi-user text-3xl text-purple-700"></i>
          </div>
          <div class="flex flex-col">
            <span>{{ from.user_name }}</span>
            <span class="font-bold">{{ from.name }}</span>
          </div>
        </div>

        <div class="w-full flex justify-center items-center gap-5">
          <span class="bg-gradient-to-tr from-purple-400 to-purple-700 px-2 border rounded-xl text-white">{{ from.qualification_id }}</span>
          <div class="flex items-center gap-3 border w-fit pr-3 rounded border-purple-500">
            <i class="text-purple-700 px-2 border-r bg-purple-300 border-purple-500 rounded">PV</i>
            <span class="text-purple-700">{{ from.pv || 0 }}</span>
          </div>
        </div>
      </div>

      <div class="w-full border border-purple-500 rounded flex flex-col gap-3 pb-3">
        <div class="flex flex-col p-2">
          <label for="target_username">รหัสสมาชิกที่ต้องการแจงให้</label>
          <div class="flex items-center justify-between">
            <input id="target_username" type="text" :disabled="target && !invalidTarget" :class="target && !invalidTarget ? 'bg-green-100 border-green-500' : ''" class="p-1 border rounded focus:outline-none focus:ring-1 ring-purple-500" v-model="target_username" >
            <button v-if="target && !invalidTarget" class="py-1 px-2 border bg-gray-500 text-white rounded" type="button" @click="cancleMember">ยกเลิก</button>
            <button v-else class="py-1 px-2 border bg-purple-500 text-white rounded" type="button" @click="checkMember">ยืนยัน</button>
          </div>
          <span v-if="invalidTarget" class="text-xs text-red-500 mt-1">*ไม่พบรหัสสมาชิกนี้ในระบบ กรุณาลองใหม่</span>
        </div>

        <span v-if="target && !invalidTarget" class="px-2 border-t-2 border-dashed border-purple-500 pt-2">แจงให้สมาชิก</span>
        <div v-if="target && !invalidTarget" class="flex justify-between w-full p-2">
          <div class="flex items-center gap-2">
            <div class="w-10 h-10 rounded-full bg-purple-300 flex items-center justify-center">
              <i class="pi pi-user text-xl text-purple-700"></i>
            </div>
            <div class="flex flex-col text-sm">
              <span>{{ target.user_name }}</span>
              <span class="font-bold">{{ target.name }}</span>
            </div>
          </div>
          <div class="text-sm flex flex-col items-center px-2 py-1 rounded bg-yellow-300">
            <span>PV สะสมขึ้นตำแหน่ง</span>
            <div class="flex gap-2">
              <span class="font-bold">{{ target.pv_upgrad || 0 }}</span>
              <span>→</span>
              <span class="font-bold">{{ parseFloat(target.pv_upgrad || 0) + (target_pv || 0) }}</span>
            </div>
          </div>
        </div>
        
        <div v-if="target && !invalidTarget" class="flex justify-center items-center gap-5">
          <div class="flex flex-col">
            <span class="text-sm">ตำแหน่งปัจจุบัน</span>
            <span class="bg-gradient-to-tr from-purple-400 to-purple-700 px-2 border rounded-xl text-white text-center">{{ target.qualification_id }}</span>
            <span class="text-xs opacity-0">.</span>
          </div>
          <i class="pi pi-arrow-right"></i>
          <div v-if="nextPvUpgrade.pv" class="flex flex-col">
            <span class="text-sm">ตำแหน่งอัพเกรด</span>
            <span 
            v-if="((nextPvUpgrade.pv || 0) - (parseFloat(target.pv_upgrad || 0) + (target_pv || 0))) <= 0"
            class="bg-gradient-to-tr from-yellow-400 to-orange-500 px-2 border rounded-xl text-white text-center">{{ nextUpgrade.code }}</span>
            <span v-else class="bg-gray-500 opacity-50 px-2 border rounded-xl text-white text-center">{{ '???' }}</span>
            <span
            class="text-xs text-green-600"
            v-if="((nextPvUpgrade.pv || 0) - (parseFloat(target.pv_upgrad || 0) + (target_pv || 0))) <= 0"
            >สมาชิกนี้จะได้เลื่อนขั้น</span>
            <span v-else class="text-xs text-orange-500">ต้องการอีก {{ (nextPvUpgrade.pv || 0) - (parseFloat(target.pv_upgrad || 0) + (target_pv || 0)) }} pv</span>
          </div>
          <div v-else>
            <p class="text-xs">รหัสนี้มีตำแหน่ง VVIP หรือสูงกว่า</p>
            <p class="text-xs">ไม่สามารถอัพตำแหน่งอีกได้</p>
          </div>
        </div>

        <div v-if="target && !invalidTarget && nextPvUpgrade.pv" class="flex flex-col p-2 border-t-2 border-dashed border-purple-500">
          <label for="target_username">จำนวน pv ที่แจงให้</label>
          <div class="flex items-center justify-between">
            <input id="target_username" type="number" class="p-1 border rounded focus:outline-none focus:ring-1 ring-purple-500 w-full" v-model="target_pv" >
          </div>
          
          <span v-if="(parseFloat(from.pv) - parseFloat(target_pv)) < 0" class="text-xs text-red-500 mt-1">*จำนวน pv ไม่พอ</span>
        </div>

        <div v-if="target && !invalidTarget && target_pv > 0 && nextPvUpgrade.pv" class="mx-2">
          <button :disabled="(parseFloat(from.pv) - parseFloat(target_pv)) < 0" type="button" :class="(parseFloat(from.pv) - parseFloat(target_pv)) < 0 ? 'opacity-50' : 'opacity-100'" class="py-2 w-full bg-green-500 text-white rounded"
          @click="confirmPVUpgradeHandle()"
          >
            ยืนยันแจง PV
          </button>
        </div>
        
      </div>
    
    </div>
  </Sidebar>

  <Sidebar v-model:visible="pvActiveVisible" header="แจงยืนยันสิทธิ์หรือรักษาสภาพ" position="bottom" style="height: 100%">
    <div class="w-full flex flex-col items-center gap-3">
      <div class="flex flex-col gap-3 p-2 border w-full rounded items-center border-purple-500">
        <div class="flex items-center gap-3">
          <div class="w-20 h-20 rounded-full bg-purple-300 flex items-center justify-center">
            <i class="pi pi-user text-3xl text-purple-700"></i>
          </div>
          <div class="flex flex-col">
            <span>{{ from.user_name }}</span>
            <span class="font-bold">{{ from.name }}</span>
          </div>
        </div>

        <div class="w-full flex justify-center items-center gap-5">
          <span class="bg-gradient-to-tr from-purple-400 to-purple-700 px-2 border rounded-xl text-white">{{ from.qualification_id }}</span>
          <div class="flex items-center gap-3 border w-fit pr-3 rounded border-purple-500">
            <i class="text-purple-700 px-2 border-r bg-purple-300 border-purple-500 rounded">PV</i>
            <span class="text-purple-700">{{ from.pv || 0 }}</span>
          </div>
        </div>
      </div>

      <div class="w-full border border-purple-500 rounded flex flex-col gap-3 pb-3">
        <div class="flex flex-col p-2">
          <label for="target_username">รหัสสมาชิก</label>
          <div class="flex items-center justify-between">
            <input id="target_username" type="text" :disabled="target && !invalidTarget" :class="target && !invalidTarget ? 'bg-green-100 border-green-500' : ''" class="p-1 border rounded focus:outline-none focus:ring-1 ring-purple-500" v-model="target_username" >
            <button v-if="target && !invalidTarget" class="py-1 px-2 border bg-gray-500 text-white rounded" type="button" @click="cancleMember">ยกเลิก</button>
            <button v-else class="py-1 px-2 border bg-purple-500 text-white rounded" type="button" @click="checkMember">ยืนยัน</button>
          </div>
          <span v-if="invalidTarget" class="text-xs text-red-500 mt-1">*ไม่พบรหัสสมาชิกนี้ในระบบ กรุณาลองใหม่</span>
        </div>

        <span v-if="target && !invalidTarget" class="px-2 border-t-2 border-dashed border-purple-500 pt-2">เพิ่มวันให้สมาชิก</span>
        <div v-if="target && !invalidTarget" class="flex justify-between w-full p-2">
          <div class="flex items-center gap-2">
            <div class="w-10 h-10 rounded-full bg-purple-300 flex items-center justify-center relative">
              <i class="pi pi-user text-xl text-purple-700"></i>
              <span class="absolute text-xs text-purple-500 -bottom-4">{{ target.qualification_id }}</span>
            </div>
            <div class="flex flex-col text-sm">
              <span>{{ target.user_name }}</span>
              <span class="font-bold">{{ target.name }}</span>
            </div>
          </div>
          <div class="flex flex-col text-xs gap-2">
            <div v-if="dayjs(target.expire_date).diff(dayjs(new Date()), 'day') > 0" class="flex flex-col gap-2 bg-white/80 border border-purple-500 px-2 rounded-xl py-1">
              <span><span class="bg-green-400 rounded-xl px-2">Active</span> {{ dateLongTH(target.expire_date) }}</span>
              <span class="hidden">({{ dayjs(target.expire_date).diff(dayjs(new Date()), 'day') }} วัน)</span>
              <p v-if="target_pv === 20" class="text-right text-green-500 font-bold">เลือก</p>
            </div>
            <div v-else class="flex gap-2 bg-white/80 px-2 rounded-xl py-1 border border-purple-500">
              <span><span class="bg-red-400 rounded-xl text-white px-2">no-Active</span> {{ 'หมดอายุ' }}</span>
              <p v-if="target_pv === 20" class="text-right text-green-500 font-bold">active +33 วัน</p>
            </div>
            
            <div v-if="dayjs(target.expire_date_bonus).diff(dayjs(new Date()), 'day') > 0" class="flex flex-col gap-2 bg-white/80 px-2 rounded-xl py-1 border border-orange-500">
              <div class="relative">
                
                <span><span class="bg-green-400 rounded-xl px-2">Active</span> {{ dateLongTH(target.expire_date_bonus) }}</span>
                <span class="hidden">({{ dayjs(target.expire_date_bonus).diff(dayjs(new Date()), 'day') }} วัน)</span>
                <p v-if="target_pv === 100" class="text-right text-green-500 font-bold">เลือก</p>
              </div>
            </div>
            <div v-else class="flex flex-col gap-2 bg-white/80 px-2 rounded-xl py-1 border border-orange-500">
              <div class="relative">
                
                <span><span class="bg-red-400 rounded-xl text-white px-2">no-Active</span> {{ 'ไม่มี' }}</span>
                <p v-if="target_pv === 100" class="text-right text-green-500 font-bold">active</p>
              </div>
            </div>

          </div>
        </div>
        
        <div v-if="target" class="flex justify-start ml-2 items-center gap-5">
          <div class="flex bg-gradient-to-tr from-purple-400 to-purple-700 py-2 px-3 rounded-xl gap-2">
            <RadioButton v-model="target_pv" :value="20" inputId="target_pv20" name="target_pv20" /> 
            <span class="text-white text-center truncate">
              20 PV
            </span>
          </div>
          <i class="pi pi-arrow-right"></i>
          <div>
            <p class="text-xs">รับโบนัสข้อที่ 7, ข้อที่ 13 เพิ่ม /รับ 33 วัน</p>
          </div>
        </div>

        <div v-if="target" class="flex justify-start ml-2 items-center gap-5">
          <div class="flex bg-gradient-to-tr from-orange-400 to-orange-700 p-2 rounded-xl gap-2">
            <RadioButton v-model="target_pv" :value="100" inputId="target_pv100" name="target_pv100" /> 
            <span class="text-white text-center truncate">
              100 PV
            </span>
          </div>
          <i class="pi pi-arrow-right"></i>
          <div>
            <p class="text-xs">รับโบนัสทุกข้อ /รับ 33 วัน</p>
          </div>
        </div>

        <div v-if="target && (target_pv===20 || target_pv===100)" class="mx-2">
          <button :disabled="(parseFloat(from.pv) - parseFloat(target_pv)) < 0" type="button" :class="(parseFloat(from.pv) - parseFloat(target_pv)) < 0 ? 'opacity-50' : 'opacity-100'" class="py-2 w-full bg-green-500 text-white rounded"
          @click="confirmPVActiveHandle()"
          >
            ยืนยันแจง PV
          </button>
          <span v-if="parseFloat(from.pv) - parseFloat(target_pv) < 0" class="text-sm text-red-500">* pv ไม่เพียงพอ</span>
        </div>
        
      </div>
    
    </div>
  </Sidebar>

  <Sidebar v-model:visible="pvCashbackVisible" header="แจง Cashback หรือส่วนลดซื้อซ้ำ" position="bottom" style="height: 100%">
    <div class="w-full flex flex-col items-center gap-3">
      <div class="flex flex-col gap-3 p-2 border w-full rounded items-center border-purple-500">
        <div class="flex items-center gap-3">
          <div class="w-20 h-20 rounded-full bg-purple-300 flex items-center justify-center">
            <i class="pi pi-user text-3xl text-purple-700"></i>
          </div>
          <div class="flex flex-col">
            <span>{{ from.user_name }}</span>
            <span class="font-bold">{{ from.name }}</span>
          </div>
        </div>

        <div class="w-full flex justify-center items-center gap-5">
          <span class="bg-gradient-to-tr from-purple-400 to-purple-700 px-2 border rounded-xl text-white">{{ from.qualification_id }}</span>
          <div class="flex items-center gap-3 border w-fit pr-3 rounded border-purple-500">
            <i class="text-purple-700 px-2 border-r bg-purple-300 border-purple-500 rounded">PV</i>
            <span class="text-purple-700">{{ from.pv || 0 }}</span>
          </div>
        </div>
      </div>

      <div class="w-full border border-purple-500 rounded flex flex-col gap-3 pb-3">
        <div class="flex flex-col p-2">
          <label for="target_username">รหัสสมาชิก</label>
          <div class="flex items-center justify-between">
            <input id="target_username" type="text" :disabled="target && !invalidTarget" :class="target && !invalidTarget ? 'bg-green-100 border-green-500' : ''" class="p-1 border rounded focus:outline-none focus:ring-1 ring-purple-500" v-model="target_username" >
            <button v-if="target && !invalidTarget" class="py-1 px-2 border bg-gray-500 text-white rounded" type="button" @click="cancleMember">ยกเลิก</button>
            <button v-else class="py-1 px-2 border bg-purple-500 text-white rounded" type="button" @click="checkMember">ยืนยัน</button>
          </div>
          <span v-if="invalidTarget" class="text-xs text-red-500 mt-1">*ไม่พบรหัสสมาชิกนี้ในระบบ กรุณาลองใหม่</span>
        </div>

        <span v-if="target && !invalidTarget" class="px-2 border-t-2 border-dashed border-purple-500 pt-2">แจง Cashback หรือส่วนลดซื้อซ้ำ</span>
        <div v-if="target && !invalidTarget" class="flex justify-between w-full p-2">
          <div class="flex items-center gap-2">
            <div class="w-10 h-10 rounded-full bg-purple-300 flex items-center justify-center">
              <i class="pi pi-user text-xl text-purple-700"></i>
            </div>
            <div class="flex flex-col text-sm">
              <span>{{ target.user_name }}</span>
              <span class="font-bold">{{ target.name }}</span>
            </div>
          </div>
          <div class="flex items-center">--></div>
          <div class="flex flex-col text-xs bg-green-300 p-2 rounded gap-2 items-center">
            <div class="flex items-center border-b border-purple-500 gap-2">
              <i class="pi pi-wallet text-lg text-purple-700"></i>
              <p>E-wallet</p>
            </div>
            <div class="font-bold text-lg">
              <p>+ {{ target_pv*1.25 }}</p>
            </div>
          </div>
        </div>

        <div v-if="target && !invalidTarget" class="flex flex-col p-2 border-t-2 border-dashed border-purple-500">
          <label for="target_username">จำนวน pv ที่ต้องการแลก</label>
          <div class="flex items-center justify-between">
            <input id="target_username" type="number" class="p-1 border rounded focus:outline-none focus:ring-1 ring-purple-500 w-full" v-model="target_pv" >
          </div>
          
          <span v-if="(parseFloat(from.pv) - parseFloat(target_pv)) < 0" class="text-xs text-red-500 mt-1">*จำนวน pv ไม่พอ</span>

          <span class="text-xs text-purple-500 mt-1">* อัตราแลกเปลี่ยน 125% หรือ 1 PV = 1 . 25 บาท</span>
        </div>

        <div v-if="target && (target_pv > 0)" class="mx-2">
          <button :disabled="(parseFloat(from.pv) - parseFloat(target_pv)) < 0" type="button" :class="(parseFloat(from.pv) - parseFloat(target_pv)) < 0 ? 'opacity-50' : 'opacity-100'" class="py-2 w-full bg-green-500 text-white rounded"
          @click="confirmPVCashbackHandle()"
          >
            ยืนยันแจง PV
          </button>
          <span v-if="parseFloat(from.pv) - parseFloat(target_pv) < 0" class="text-sm text-red-500">* pv ไม่เพียงพอ</span>
        </div>
        
      </div>
    
    </div>
  </Sidebar>
</template>

<script setup>
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
 
dayjs.extend(buddhistEra);
import Swal from "sweetalert2";
import { ref, onMounted, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { useRoute, useRouter } from "vue-router";
//import Invitefriend from "./invitefriend.vue";

const current_version = process.env.VUE_APP_VERSION;
const store = useStore();
const toast = useToast();
const confirm = useConfirm();
const route = useRoute();
const router = useRouter();
const isLoading = ref(false);

const pvActiveVisible = ref(false);

const pvUpgradeVisible = ref(false);
const target_username = ref("")
const target_pv = ref(0);

const from = ref({});

onMounted(async () => {
  document.title = "ข้อมูลส่วนตัว || Maruey";
  isLoading.value = true;

  await getdata();
  

  await getMyMember(store.getters.me?.user_name);
  if (store.getters.me?.user_name) {
    await getMyShopPartner()
  }
  isLoading.value = false;
  //console.log("hello")
});

const copyInvitePartner = async(introduce_username) => {
  try {
    await navigator.clipboard.writeText(`${process.env.VUE_APP_REGISTERLINK}/partner/register?introduced_id=${introduce_username}`);
    //toast.add({ severity:'success', summary: 'คัดลอกลิงค์เชิญแล้ว', detail: '' });
    Swal.fire({
      text: "คัดลอกลิงค์สำเร็จ",
      icon: "success",
      iconColor: "#8B2FC9",
      confirmButtonColor: "#8B2FC9",
    });
  } catch (err) {
    //toast.add({ severity: 'error', summary: 'คัดลอกลิงค์เชิญไม่สำเร็จ', detail: '' });
    Swal.fire({
      text: "คัดลอกลิงค์เชิญไม่สำเร็จ",
      icon: "error",
      iconColor: "#8B2FC9",
      confirmButtonColor: "#8B2FC9",
    });
  }
}

const getMyShopPartner = async () => {
  if (!store.getters.me?.user_name) return
  try {
    const {data} = await axios.get(`${process.env.VUE_APP_MARUEY}partner/byusername/${store.getters.me?.user_name}`)
    if (data.status) {
      from.value.shop_partner = data.data
      //console.log('shop: ', data.data)
    }
  }
  catch(err) {
    //console.log(err)
  }
}

const dateLongTH = (date) => {
  dayjs.locale("th");
  return dayjs(date).format("DD/MM/BBBB");
}

const getUserProfile = async () => {
isLoading.value = true
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
      finally {
        isLoading.value = false
      }
    }


const getdata = async () => {
  //await getcustomer();
  await getUserProfile();
  //const user = store.getters.me
};

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

const invitefriendHandle = () => {
  router.push("/invitefriend"+`?username=${from.value.user_name}`);
}

const logout = async () => {
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
    store.commit("setLoginDefault");

    // ทำการล็อกเอาท์ใน Store
    window.location.assign("/");
  }
};

const pvCashbackVisible = ref(false);

const usePvmenu = ref();
const usePvitems = ref([
    {
        items: [
            {
              label: 'แจงยืนยันสิทธิ์หรือรักษาสภาพ',
              icon: 'pi pi-calendar-plus px-2',
              command: () => {
                pvActiveVisible.value = true
                target_username.value = from.value.user_name
              }
            },
            {
              label: 'แจงปรับตำแหน่งสูงขึ้น',
              icon: 'pi pi-angle-double-up px-2',
              command: () => {
                pvUpgradeVisible.value = true
                target_username.value = from.value.user_name
              }
            },
            {
              label: 'แจง Cashback หรือส่วนลดซื้อซ้ำ',
              icon: 'pi pi-wallet px-2',
              command: () => {
                pvCashbackVisible.value = true
                target_username.value = from.value.user_name
              }
            },
            {
              label: 'โอน PV',
              icon: 'pi pi-reply px-2',
              command: () => {
                pvCashbackVisible.value = true
                target_username.value = from.value.user_name
              },
              disabled: true
            },
            {
              label: 'ประวัติการแจง',
              icon: 'pi pi-history px-2',
              command: () => {
                router.push('/customer/jangpvhistory')
              }
            }
        ]
    }
]);
const usePvToggle = (event) => {
  usePvmenu.value.toggle(event);
};

const ewalletmenu = ref();
const ewalletitems = ref([
    {
        items: [
            {
                label: 'โอน wallet',
                icon: 'pi pi-chart-line px-2',
                command: () => {
                  router.push('/customer/wallet-transfer')
                },
                disabled: true
            },
            {
                label: 'เติมเงิน',
                icon: 'pi pi-plus px-2',
                command: () => {
                  router.push('/customer/deposithistory')
                }
            },
            {
                label: 'ถอนเงิน',
                icon: 'pi pi-minus px-2',
                command: () => {
                  router.push('/customer/deposithistory')
                }
            },
            {
                label: 'ดูประวัติ',
                icon: 'pi pi-history px-2',
                command: () => {
                  router.push('/customer/ewallethistory')
                }
            }
        ]
    }
]);
const ewalletToggle = (event) => {
  ewalletmenu.value.toggle(event);
};

const target = ref(null)
const invalidTarget = ref(false)

const checkMember = async () => {
  isLoading.value = true
  try {
    const { data } = await axios.get(`${process.env.VUE_APP_MARUEY}member/${target_username.value}`, {
      headers: {
        token: "Bearer " + localStorage.getItem("token"),
      }
    })
    if (!data.data) {
      invalidTarget.value = true
      toast.add({ severity: 'error', summary: 'ไม่พบสมาชิก', detail: 'ไม่พบสมาชิก', life: 3000 });
    } else {
      target.value = data.data
      invalidTarget.value = false
    }
    //console.log(data)
  }
  catch(err) {
    //console.log(err)
    checkMember()
  }
  finally {
    isLoading.value = false
  }
}

const getMyMember = async (myusername) => {
  isLoading.value = true
  try {
    const { data } = await axios.get(`${process.env.VUE_APP_MARUEY}member/${myusername}`, {
      headers: {
        token: "Bearer " + localStorage.getItem("token"),
      }
    })
    from.value = {...data.data}
    from.value.linkregistercode = `${process.env.VUE_APP_REGISTERLINK}/register/${data.data.user_name}`
    //console.log(data)
  }
  catch(err) {
    //console.log(err)
    await getMyMemberAgain(myusername)
    //checkMember()
  }
  finally {
    isLoading.value = false
  }
}

const getMyMemberAgain = async (myusername) => {
  isLoading.value = true
  try {
    const { data } = await axios.get(`${process.env.VUE_APP_MARUEY}member/${myusername}`, {
      headers: {
        token: "Bearer " + localStorage.getItem("token"),
      }
    })
    from.value = {...data.data}
    from.value.linkregistercode = `${process.env.VUE_APP_REGISTERLINK}/register/${data.data.user_name}`
    //console.log(data)
  }
  catch(err) {
    //console.log(err)
    await getMyMember(myusername)
    //checkMember()
  }
  finally {
    isLoading.value = false
  }
}

const cancleMember = () => {
  target_username.value = ""
  target.value = null
  invalidTarget.value = false
}

const qualifications = ref([
  { id: 1, code: 'MB', pv: 20 },
  { id: 2, code: 'MO', pv: 400 },
  { id: 3, code: 'VIP', pv: 800 },
  { id: 4, code: 'VVIP', pv: 1200 },
  { id: 5, code: 'XVVIP', pv: null },
  { id: 6, code: 'SVVIP', pv: null },
])

const nextUpgrade = computed(() => {
  let result = {}
  if (target.value) {
    const indexs = qualifications.value.filter(q =>q.pv && q.pv <= parseInt(target.value.pv_upgrad) + parseInt(target_pv.value))
    if (indexs.length) {
      result = indexs[indexs.length-1]
    }
  }
  return result
})

const nextPvUpgrade = computed(() => {
  let result = {}
  if (target.value) {
    const index = qualifications.value.findIndex(q => q.code === target.value.qualification_id)
    if (index !== -1) {
      result = qualifications.value[index + 1]
    }
  }
  return result
})

const visiblePVUpgrade = ref(false)
const confirmPVUpgradeHandle = () => {
  visiblePVUpgrade.value = true
};

const confirmPVUpgrade = async () => {
  visiblePVUpgrade.value = false
  isLoading.value = true
  const payload = {
    user_name: from.value.user_name,
    input_user_name_upgrad: target_username.value,
    pv_upgrad_input: parseInt(target_pv.value)
  }
  //console.log(payload)
  try {
    const { data } = await axios.post(`${process.env.VUE_APP_MARUEY}jangpv/upgrade`, payload, {
      headers: {
        token: "Bearer " + localStorage.getItem("token"),
      }
    })
    if (data.status) {
      await Swal.fire({
        text: "แจง PV สำเร็จ",
        icon: "success",
        iconColor: "#8B2FC9",
        timer: 5000,
        //confirmButtonColor: "#8B2FC9",
      });
    }
    window.location.assign("/customer/customerview");
  }
  catch(err) {
    //console.log(err)
  }
  finally{
    pvUpgradeVisible.value = false
    isLoading.value = false
  }
}

const visiblePVActive = ref(false)
const confirmPVActiveHandle = () => {
    visiblePVActive.value = true
};

const confirmPVActive = async () => {
  isLoading.value = true
  visiblePVActive.value = false
  const payload = {
    currentUser: {
      user_name: from.value.user_name,
      id: from.value.id
    },
    input_user_name_active: target_username.value,
    pv_active: parseInt(target_pv.value)
  }
  //console.log(payload)
  try {
    await axios.post(`${process.env.VUE_APP_MARUEY}jangpv/active`, payload, {
      headers: {
        token: "Bearer " + localStorage.getItem("token"),
      }
    })
    
    await Swal.fire({
      text: "แจง PV สำเร็จ",
      icon: "success",
      iconColor: "#8B2FC9",
      timer: 5000,
      //confirmButtonColor: "#8B2FC9",
    });
    
    window.location.assign("/customer/customerview");
  }
  catch(err) {
    //console.log(err)
  }
  finally{
    pvActiveVisible.value = false
    isLoading.value = false
  }
}

const visiblePVCashback = ref(false)
const confirmPVCashbackHandle = () => {
  visiblePVCashback.value = true
};

const confirmPVCashback = async () => {
  visiblePVCashback.value = false
  isLoading.value = true
  const payload = {
    active_user_name: from.value.user_name,
    active_user_id: from.value.id,
    user_name: target_username.value,
    pv: parseInt(target_pv.value),
    type: 2
  }
  //console.log(payload)
  try {
    const { data } = await axios.post(`${process.env.VUE_APP_MARUEY}jangpv/cashback`, payload, {
      headers: {
        token: "Bearer " + localStorage.getItem("token"),
      }
    })
    if (data.status) {
      await Swal.fire({
        text: "แจง PV สำเร็จ",
        icon: "success",
        iconColor: "#8B2FC9",
        timer: 5000,
        //confirmButtonColor: "#8B2FC9",
      });
    }
    window.location.assign("/customer/customerview");
  }
  catch(err) {
    //console.log(err)
  }
  finally{
    pvUpgradeVisible.value = false
    isLoading.value = false
  }
}

</script>

<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

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
.loader:after{ 
  content: "";
  grid-area: 1/1; 
  width: 40px;
  height: 40px;
  background: #ff34d3;
  animation: l7 2s infinite;
}
.loader:after{ 
  animation-delay: -1s;
}
@keyframes l7{
  0%   {transform: translate(   0,0)}
  25%  {transform: translate(100%,0)}
  50%  {transform: translate(100%,100%)}
  75%  {transform: translate(   0,100%)}
  100% {transform: translate(   0,0)}
}
</style>