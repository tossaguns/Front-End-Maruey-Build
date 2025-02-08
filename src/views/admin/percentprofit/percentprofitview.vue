<template>
  <div v-if="isLoading" class="overlay">
    <div class="loader"></div>
  </div>
  <div class="flex w-full pt-5 justify-center px-2 sm:px-10">
    <div class="grow w-full">
      <div class="text-center py-5 bg-white rounded-t-xl drop-shadow-2xl bg-opacity-80">
        <div class="mt-10 font-semibold text-4xl text-[#8B2FC9]">
            กำหนดแบ่งเปอร์เซ็นต์
        </div>
      </div>

      
      <div  v-if="data != null"   class="text-center py-5 bg-white drop-shadow-2xl bg-opacity-80 rounded-b-xl overflow-y-auto" style="min-height: 82vh; max-height:82vh;">
 

            <div class=" md:flex  gap-10 mx-5 mb-6 ">
                <!--สินค้าของตัวเอง-->
                
                <div class="flex flex-col justify-between  my-4 md:my-0 border border-[#fff] w-full  bg-white rounded shadow-md">
                    <div class="text-left text-2xl m-3 pb-3 border-b border-[#000] ">สินค้าของตัวเอง</div>
                    <div class="text-left mx-3 pb-3 border-b border-[#000] text-xl"> <span class= "text-2xl font-bold">100%</span> ของส่วนแบ่งทางการตลาด </div>
                    <ul class="text-left mb-auto m-3">
                        <li class="pb-3">
                            <div class="flex">
                                <div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b2fc9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg></div>
                                <div>รายได้ของตัวเอง {{data?.percentmaruey?.owner}} %</div>
                            </div>
                        </li>
                        <li class="pb-3">
                            <div class="flex">
                                <div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b2fc9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg></div>
                                <div>แบ่งรายให้กับการแชร์ลิงค์ {{data?.percentmaruey?.sharelink}} %</div>
                            </div>
                        </li>
                    </ul>
                  <div class=" border-t border-[#000] m-3 py-4  ">
                    <button @click="opendialog('editowner',data)" class="bg-purple-600 text-white font-bold py-4  rounded w-full">อัพเดทเปอร์เซ็นต์</button>
                </div> 
                </div>
                
                <!--สินค้าของคู่ค้า (Partner)--->
              
                <div class="flex flex-col justify-between my-4 md:my-0 border border-[#fff] w-full  h-full bg-white  rounded shadow-md">
                    <div class="text-left text-2xl m-3 pb-3 border-b border-[#000] ">สินค้าของคู่ค้า (Partner)</div>
                    <div class="text-left mx-3 pb-3 border-b border-[#000] text-xl"> <span class= "text-2xl font-bold">100%</span> ของส่วนแบ่งทางการตลาด </div>
                    <ul class="text-left m-3">
                        <li class="pb-3">
                            <div class="flex">
                                <div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b2fc9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg></div>
                                <div>รายได้ของคู่ค้า {{data?.percentpartner?.owner}} %</div>
                            </div>
                        </li>
                        <li class="pb-3">
                            <div class="flex">
                                <div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b2fc9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg></div>
                                <div>แบ่งให้แพลตฟอร์ม {{data?.percentpartner?.platform}} %</div>
                            </div>
                        </li>
                        <li class="pb-3">
                            <div class="flex">
                                <div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b2fc9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg></div>
                                <div>
                                    แล้วรายได้ที่แบ่งให้แพลตฟอร์ม
                                </div>
                            </div>
                            <ul class="text-left m-3">
                                <li class="pl-5 pb-3 flex">
                                    <div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg></div>
                                <div>
                                    เข้าแพลต์ฟอร์ม {{data?.percentpartner?.separateplatform?.platform}} %
                                </div>
                                </li>
                                 <li class="pl-5 pb-3 flex">
                                    <div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg></div>
                                <div>
                                    แบ่งรายให้กับการแชร์ลิงค์ {{data?.percentpartner?.separateplatform?.sharelink}} %
                                </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                  <div class="flex justify-center border-t border-[#000] m-3 py-4 items-center mt-4">
                    <button @click="opendialog('editpartner',data)" class="bg-purple-600 text-white font-bold py-4  rounded w-full">อัพเดทเปอร์เซ็นต์</button>
                </div>
                        
                    
                </div>
              
            </div>
            <!--คืนให้ลูกค้า-->
            <div class="text-center font-bold text-xl border bg-[#fff] border-[#fff] mx-5 rounded shadow-md">
                <div class="text-left text-2xl m-3 pb-3 border-b border-[#000] ">ส่วนแบ่งรายได้คืนให้ลูกค้า</div>
                <div class="text-left m-3 pb-3 border-b border-[#000] text-xl"> <span class= "text-2xl font-bold">100%</span> ของส่วนแบ่งทางการตลาด </div>
                <ul class="text-left mb-auto m-3 text-sm">
                        <li class="pb-3">
                            <div class="flex">
                                <div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b2fc9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg></div>
                                <div>แบ่งให้กับคนแชร์ลิงค์สินค้า {{data?.percentcustomer?.shareproduct}} %</div>
                            </div>
                        </li>
                        <li class="pb-3">
                            <div class="flex">
                                <div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b2fc9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg></div>
                                <div>แบ่งให้กับคนที่แนะนำเพื่อน {{data?.percentcustomer?.sharelink}} %</div>
                            </div>
                        </li>
                    </ul>   
            
                <div class=" border-t border-[#000] m-3 py-4  ">
                    <button @click="opendialog('editcustomer',data)" class="bg-purple-600 text-white font-bold py-4 text-base rounded w-full">อัพเดทเปอร์เซ็นต์</button>
                </div> 
            </div>

             <div class="text-center font-bold text-xl border bg-[#fff] border-[#fff] mx-5  mt-5 rounded shadow-md">
                <div class="text-left text-2xl m-3 pb-3 border-b border-[#000] ">ส่วนแบ่งให้กับคนที่แนะนำเพื่อน</div>
                <div class="text-left m-3 pb-3 border-b border-[#000] text-xl"> <span class= "text-2xl font-bold">100%</span> ของส่วนแบ่งทางการตลาด </div>
               
                
                <div class="grid grid-cols-3 gap-4 m-3 pt-3 pb-5">
               
                    <ul class="text-left text-sm">
                        <li class="pb-3"><div class="flex"><div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b2fc9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg></div><div>Lv1 :{{data?.sharelink?.level_one}} %</div></div></li>
                        <li class="pb-3"><div class="flex"><div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b2fc9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg></div><div>Lv2 :{{data?.sharelink?.level_two}} %</div></div></li>
                        <li class="pb-3"><div class="flex"><div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b2fc9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg></div><div>Lv3 :{{data?.sharelink?.level_three}} %</div></div></li>
                        <li class="pb-3"><div class="flex"><div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b2fc9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg></div><div>Lv4 :{{data?.sharelink?.level_four}} %</div></div></li>
                    </ul>
              
                    <ul class="text-left text-sm">
                        <li class="pb-3"><div class="flex"><div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b2fc9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg></div><div>Lv5 :{{data?.sharelink?.level_five}} %</div></div></li>
                        <li class="pb-3"><div class="flex"><div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b2fc9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg></div><div>Lv6 :{{data?.sharelink?.level_six}} %</div></div></li>
                        <li class="pb-3"><div class="flex"><div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b2fc9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg></div><div>Lv7 :{{data?.sharelink?.level_seven}} %</div></div></li>
                        <li class="pb-3"><div class="flex"><div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b2fc9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg></div><div>Lv8 :{{data?.sharelink?.level_eight}} %</div></div></li>
                    </ul>
        
                    <ul class="text-left text-sm">
                        <li class="pb-3"><div class="flex"><div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b2fc9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg></div><div>Lv9 :{{data?.sharelink?.level_nine}} %</div></div></li>
                        <li class="pb-3"><div class="flex"><div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b2fc9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg></div><div>Lv10 :{{data?.sharelink?.level_ten}} %</div></div></li>
           
                    </ul>
                </div>
                <div class=" border-t border-[#000] m-3 py-4  ">
                    <button @click="opendialog('editsharelink',data)" class="bg-purple-600 text-white font-bold py-4 text-base rounded w-full">อัพเดทเปอร์เซ็นต์</button>
                </div> 
            </div>
           
      </div>
       <div v-else class="text-center py-5 bg-white drop-shadow-2xl bg-opacity-80 rounded-b-xl overflow-y-auto" style="min-height: 82vh; max-height:82vh;">
            <div class="text-center text-2xl font-bold">คุณยังไม่สร้างการกำหนดแบ่งเปอร์เซ็นต์</div>
            <div class="text-center mt-5">
                <button @click="opendialog('add', {})" class="bg-[#8B2FC9] text-white font-bold py-4 px-10 rounded-lg hover:bg-[#E178C5] focus:ring-2 focus:ring-offset-2 focus:ring-[#8B2FC9] focus:outline-none">สร้างการกำหนดแบ่งเปอร์เซ็นต์</button>
            </div>
       </div>
    </div>
  </div>

  <Dialog v-model:visible="dialog" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"  >
    <template #header>
      <div class="flex justify-between items-center">
        <div class="text-lg font-semibold">{{headform}}</div>
      </div>
    </template>
    <div class="text-base font-semibold">แบ่งสินค้าของตัวเอง</div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">รายได้ของตัวเอง :</label>
        <InputNumber v-model="from.percentmaruey.owner" inputId="mile" suffix=" %" class="w-full" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">แบ่งคืนให้กับลูกค้า:</label>
        <InputNumber v-model="from.percentmaruey.sharelink" inputId="mile" suffix=" %" class="w-full" />
      </div>
    </div>
    <div class="text-base font-semibold">แบ่งสินค้าของคู่ค้า (Partner)</div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">รายได้ของคู่ค้า :</label>
        <InputNumber v-model="from.percentpartner.owner" inputId="mile" suffix=" %" class="w-full" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">แบ่งให้แพลตฟอร์ม:</label>
        <InputNumber v-model="from.percentpartner.platform" inputId="mile" suffix=" %" class="w-full" />
      </div>
    </div>
    <div class="text-base font-semibold">รายได้ที่หักแบ่งให้แพลตฟอร์ม ของสินค้าของคู่ค้า (Partner) </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">เข้าแพลต์ฟอร์ม :</label>
        <InputNumber v-model="from.percentpartner.separateplatform.platform" inputId="mile" suffix=" %" class="w-full" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">แบ่งคืนให้กับลูกค้า:</label>
        <InputNumber v-model="from.percentpartner.separateplatform.sharelink" inputId="mile" suffix=" %" class="w-full" />
      </div>
    </div>
    <div class="text-base font-semibold">ส่วนแบ่งรายได้คืนให้ลูกค้า </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">แบ่งให้กับคนแชร์ลิงค์สินค้า :</label>
        <InputNumber v-model="from.percentcustomer.shareproduct" inputId="mile" suffix=" %" class="w-full" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">แบ่งให้กับคนที่แนะนำเพื่อน :</label>
        <InputNumber v-model="from.percentcustomer.sharelink" inputId="mile" suffix=" %" class="w-full" />
      </div>
    </div>

    <div class="text-base font-semibold">แบ่งรายจากการแชร์ลิงค์</div>
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Lv1 :</label>
            <InputNumber v-model="from.sharelink.level_one" inputId="mile" suffix=" %" class="w-full" />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Lv2 :</label>
            <InputNumber v-model="from.sharelink.level_two" inputId="mile" suffix=" %" class="w-full" />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Lv3 :</label>
            <InputNumber v-model="from.sharelink.level_three" inputId="mile" suffix=" %" class="w-full" />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Lv4 :</label>
            <InputNumber v-model="from.sharelink.level_four" inputId="mile" suffix=" %" class="w-full" />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Lv5 :</label>
            <InputNumber v-model="from.sharelink.level_five" inputId="mile" suffix=" %" class="w-full" />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Lv6 :</label>
            <InputNumber v-model="from.sharelink.level_six" inputId="mile" suffix=" %" class="w-full" />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Lv7 :</label>
            <InputNumber v-model="from.sharelink.level_seven" inputId="mile" suffix=" %" class="w-full" />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Lv8 :</label>
            <InputNumber v-model="from.sharelink.level_eight" inputId="mile" suffix=" %" class="w-full" />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Lv9 :</label>
            <InputNumber v-model="from.sharelink.level_nine" inputId="mile" suffix=" %" class="w-full" />
        </div>
        <div class="col-span-full">
            <label class="block text-sm font-medium text-gray-700 mb-2">Lv10 :</label>
            <InputNumber v-model="from.sharelink.level_ten" inputId="mile" suffix=" %" class="w-full" />
        </div>
    </div>
    <div class="flex items-center justify-center w-full ">
      <button @click="adddata()"  :disabled="isLoading"   class="mt-9 font-semibold leading-none text-white py-4 px-10 bg-[#8B2FC9] rounded-lg hover:bg-[#E178C5] focus:ring-2 focus:ring-offset-2 focus:ring-[#8B2FC9] focus:outline-none mx-5">
        บันทึก
      </button>
      <button @click="dialog = false" :disabled="isLoading"  class="mt-9 font-semibold leading-none text-white py-4 px-10 bg-[#ff3d32] rounded-lg hover:bg-[#ff6259] focus:ring-2 focus:ring-offset-2 focus:ring-[#8B2FC9] focus:outline-none">
        ยกเลิก
      </button>
    </div>
   
  </Dialog>
<Dialog
    v-model:visible="dialogedit"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
>
    <template #header>
        <div class="flex justify-between items-center">
            <div class="text-lg font-semibold">{{ headform }}</div>
        </div>
    </template>
    <div
        class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6"
        v-if="headform == 'แก้ไขเปอร์เซ็นต์สินค้าของตัวเอง'"
    >
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
                >รายได้ของตัวเอง :</label
            >
            <InputNumber v-model="from.percentmaruey.owner" inputId="mile" suffix=" %" class="w-full"/>
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
                >แบ่งรายได้ให้กับการแชร์ลิงค์:</label
            >
            <InputNumber
                v-model="from.percentmaruey.sharelink" inputId="mile" suffix=" %" class="w-full"
            />
        </div>
    </div>
    <div
        class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6"
        v-if="headform == 'แก้ไขเปอร์เซ็นต์สินค้าของคู่ค้า'"
    >
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
                >รายได้ของคู่ค้า :</label
            >
            <InputNumber
                v-model="from.percentpartner.owner"
                inputId="mile" suffix=" %" class="w-full"
            />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
                >แบ่งให้แพลตฟอร์ม:</label
            >
            <InputNumber
                v-model="from.percentpartner.platform"
                inputId="mile" suffix=" %" class="w-full"
            />
        </div>
    </div>
    <div
        class="text-base font-semibold"
        v-if="headform == 'แก้ไขเปอร์เซ็นต์สินค้าของคู่ค้า'"
    >
        รายได้ที่หักแบ่งให้แพลตฟอร์ม ของสินค้าของคู่ค้า (Partner)
    </div>
    <div
        class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6"
        v-if="headform == 'แก้ไขเปอร์เซ็นต์สินค้าของคู่ค้า'"
    >
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
                >เข้าแพลต์ฟอร์ม :</label
            >
            <InputNumber
                v-model="from.percentpartner.separateplatform.platform"
                inputId="mile" suffix=" %" class="w-full"
            />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
                >แบ่งให้แพลตฟอร์ม:</label
            >
            <InputNumber
                v-model="from.percentpartner.separateplatform.sharelink"
                inputId="mile" suffix=" %" class="w-full"
            />
        </div>
    </div>
    <div
        class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6"
        v-if="headform == 'แก้ไขเปอร์เซ็นต์แบ่งรายได้คืนให้กับลูกค้า'"
    >
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">แบ่งให้กับคนแชร์ลิงค์สินค้า :</label
            >
            <InputNumber
                v-model="from.percentcustomer.shareproduct"
                inputId="mile" suffix=" %" class="w-full"
            />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
                >แบ่งให้กับคนที่แนะนำเพื่อน:</label
            >
            <InputNumber
                v-model="from.percentcustomer.sharelink"
                inputId="mile" suffix=" %" class="w-full"
            />
        </div>
    </div>
    <div
        class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6"
        v-if="headform == 'แก้ไขเปอร์เซ็นต์ส่วนแบ่งรายได้จากการแชร์ลิงค์'"
    >
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Lv1 :</label>
            <InputNumber
                v-model="from.sharelink.level_one"
                inputId="mile"
                suffix=" %"
                class="w-full"
            />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Lv2 :</label>
            <InputNumber
                v-model="from.sharelink.level_two"
                inputId="mile"
                suffix=" %"
                class="w-full"
            />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Lv3 :</label>
            <InputNumber
                v-model="from.sharelink.level_three"
                inputId="mile"
                suffix=" %"
                class="w-full"
            />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Lv4 :</label>
            <InputNumber
                v-model="from.sharelink.level_four"
                inputId="mile"
                suffix=" %"
                class="w-full"
            />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Lv5 :</label>
            <InputNumber
                v-model="from.sharelink.level_five"
                inputId="mile"
                suffix=" %"
                class="w-full"
            />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Lv6 :</label>
            <InputNumber
                v-model="from.sharelink.level_six"
                inputId="mile"
                suffix=" %"
                class="w-full"
            />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Lv7 :</label>
            <InputNumber
                v-model="from.sharelink.level_seven"
                inputId="mile"
                suffix=" %"
                class="w-full"
            />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Lv8 :</label>
            <InputNumber
                v-model="from.sharelink.level_eight"
                inputId="mile"
                suffix=" %"
                class="w-full"
            />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Lv9 :</label>
            <InputNumber
                v-model="from.sharelink.level_nine"
                inputId="mile"
                suffix=" %"
                class="w-full"
            />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
                >Lv10 :</label
            >
            <InputNumber
                v-model="from.sharelink.level_ten"
                inputId="mile"
                suffix=" %"
                class="w-full"
            />
        </div>
    </div>
    <div class="flex items-center justify-center w-full">
        <button
            @click="editdata()"
            :disabled="isLoading"
            class="mt-9 font-semibold leading-none text-white py-4 px-10 bg-[#8B2FC9] rounded-lg hover:bg-[#E178C5] focus:ring-2 focus:ring-offset-2 focus:ring-[#8B2FC9] focus:outline-none mx-5"
        >
            บันทึก
        </button>
        <button
            @click="dialogedit = false"
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
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { ref, onMounted, computed,watchEffect } from "vue";
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
const token = ref("Bearer "+localStorage.getItem("token")) 


const data = ref({
    percentmaruey: {
        owner: 0,
        sharelink: 0
    },
    percentpartner: {
        owner: 0,
        platform: 0,
        separateplatform: {
            platform: 0,
            sharelink: 0
        }
    },
    percentcustomer:{
      shareproduct:0, //(ให้คนที่แชร์ลิงค์สินค้า)
      sharelink:0 //(ให้คนที่แนะนำเพื่อน)
    },
    sharelink: {
        level_one: 0,
        level_two: 0,
        level_three: 0,
        level_four: 0,
        level_five: 0,
        level_six: 0,
        level_seven: 0,
        level_eight: 0,
        level_nine: 0,
        level_ten: 0
    }
});
const getData = async () => {
    const config = {
      method: "get",
      headers: {
        "token": token.value,
      },
      url: `${process.env.VUE_APP_MARUEY}percentprofit/`,
    };
    await axios(config).then((res) => {
            data.value = res.data?.data;
    }).catch((err) => { console.log(err);});
    
};

const dialog = ref(false);

const dialogedit = ref(false);


const from = ref({
    percentmaruey: {
        owner: 0,
        sharelink: 0
    },
    percentpartner: {
        owner: 0,
        platform: 0,
        separateplatform: {
            platform: 0,
            sharelink: 0
        }
    },
    percentcustomer:{
      shareproduct:0, //(ให้คนที่แชร์ลิงค์สินค้า)
      sharelink:0 //(ให้คนที่แนะนำเพื่อน)
    },
    sharelink: {
        level_one: 0,
        level_two: 0,
        level_three: 0,
        level_four: 0,
        level_five: 0,
        level_six: 0,
        level_seven: 0,
        level_eight: 0,
        level_nine: 0,
        level_ten: 0
    }
});
const headform = ref("");
const opendialog = (type, item) => {
    if (type === "add") {
        from.value = {
            percentmaruey: {
                owner: 0,
            sharelink: 0
            },
            percentpartner: {
                owner: 0,
                platform: 0,
                separateplatform: {
                    platform: 0,
                    sharelink: 0
                }
            },
            percentcustomer:{
              shareproduct:0, //(ให้คนที่แชร์ลิงค์สินค้า)
              sharelink:0 //(ให้คนที่แนะนำเพื่อน)
            },
            sharelink: {
                level_one: 0,
                level_two: 0,
                level_three: 0,
                level_four: 0,
                level_five: 0,
                level_six: 0,
                level_seven: 0,
                level_eight: 0,
                level_nine: 0,
                level_ten: 0
            }
        }
        headform.value = "เพิ่มข้อมูลกำหนดแบ่งเปอร์เซ็นต์"; 
        dialog.value = true;
    }
    else if(type =="editowner")
    {
       from.value._id = item._id;
       from.value.percentmaruey.owner = item.percentmaruey.owner;
        from.value.percentmaruey.sharelink = item.percentmaruey.sharelink;
        headform.value = "แก้ไขเปอร์เซ็นต์สินค้าของตัวเอง";
        dialogedit.value = true;
    }
    else if(type =="editpartner")
    {
        from.value._id = item._id;
        from.value.percentpartner.owner = item.percentpartner.owner;
        from.value.percentpartner.platform = item.percentpartner.platform;
        from.value.percentpartner.separateplatform.platform = item.percentpartner.separateplatform.platform;
        from.value.percentpartner.separateplatform.sharelink = item.percentpartner.separateplatform.sharelink;
        headform.value = "แก้ไขเปอร์เซ็นต์สินค้าของคู่ค้า";
        dialogedit.value = true;
    }
    else if(type =="editcustomer"){
        from.value._id = item._id;
        from.value.percentcustomer.shareproduct = item.percentcustomer.shareproduct;
        from.value.percentcustomer.sharelink = item.percentcustomer.sharelink;
        headform.value = "แก้ไขเปอร์เซ็นต์แบ่งรายได้คืนให้กับลูกค้า";
        dialogedit.value = true;
    }
    else if(type =="editsharelink")
    {
        from.value._id = item._id;
        from.value.sharelink.level_one = item.sharelink.level_one;
        from.value.sharelink.level_two = item.sharelink.level_two;
        from.value.sharelink.level_three = item.sharelink.level_three;
        from.value.sharelink.level_four = item.sharelink.level_four;
        from.value.sharelink.level_five = item.sharelink.level_five;
        from.value.sharelink.level_six = item.sharelink.level_six;
        from.value.sharelink.level_seven = item.sharelink.level_seven;
        from.value.sharelink.level_eight = item.sharelink.level_eight;
        from.value.sharelink.level_nine = item.sharelink.level_nine;
        from.value.sharelink.level_ten = item.sharelink.level_ten;
        headform.value = "แก้ไขเปอร์เซ็นต์ส่วนแบ่งรายได้จากการแชร์ลิงค์";
        dialogedit.value = true;
    
    }


};


onMounted(async () => {
    document.title = "ข้อมูลกำหนดแบ่งเปอร์เซ็นต์ || Maruey";
    isLoading.value = true;
    await getData();
    isLoading.value = false;
});






const adddata = async () => {
    //เช็คก่อนกรอกค่าครบไหม
    if(from.value.percentmaruey.owner =="" || from.value.percentmaruey.sharelink =="" || from.value.percentpartner.owner =="" || from.value.percentpartner.platform =="" || from.value.percentpartner.separateplatform.platform =="" || from.value.percentpartner.separateplatform.sharelink =="" || from.value.sharelink.level_one =="" || from.value.sharelink.level_two =="" || from.value.sharelink.level_three =="" || from.value.sharelink.level_four =="" || from.value.sharelink.level_five =="" || from.value.sharelink.level_six =="" || from.value.sharelink.level_seven =="" || from.value.sharelink.level_eight =="" || from.value.sharelink.level_nine =="" || from.value.sharelink.level_ten =="" || from.value.percentcustomer.shareproduct =='' || from.value.percentcustomer.sharelink =='')
    {
        toast.add({
            severity: "error",
            summary: "กรุณากรอกข้อมูลให้ครบ",
            detail:"กรุณากรอกข้อมูลให้ครบ",
            life: 3000,
        });
        return;
    }
    if(from.value.percentmaruey.owner+from.value.percentmaruey.sharelink !=100)
        {
            toast.add({
                severity: "warn",
                summary: "กรอกเปอร์เซ็นต์ให้ครบ 100 %",
                detail:"ห้ามกรอกเปอร์เซ้นต์เกิน 100 %",
                life: 3000,
            });
            return;
        }

        if(from.value.percentpartner.separateplatform.platform+from.value.percentpartner.separateplatform.sharelink !=100)
        {
            toast.add({
                severity: "warn",
                summary: "กรอกเปอร์เซ็นต์ให้ครบ 100 %(หักแพลตฟอร์ม)",
                detail:"ห้ามกรอกเปอร์เซ้นต์เกิน 100 % (หักแพลตฟอร์ม)",
                life: 3000,
            });
            return;
        }
        if(from.value.percentcustomer.sharelink+from.value.percentcustomer.shareproduct !=100)
        {
            toast.add({
                severity: "warn",
                summary: "กรอกเปอร์เซ็นต์ให้ครบ 100 %",
                detail:"ห้ามกรอกเปอร์เซ้นต์เกิน 100 %",
                life: 3000,
            });
            return;
        }

        if(from.value.sharelink.level_one+from.value.sharelink.level_two+from.value.sharelink.level_three+from.value.sharelink.level_four+from.value.sharelink.level_five+from.value.sharelink.level_six+from.value.sharelink.level_seven+from.value.sharelink.level_eight+from.value.sharelink.level_nine+from.value.sharelink.level_ten !=100)
        {
            toast.add({
                severity: "warn",
                summary: "กรอกเปอร์เซ็นต์ให้ครบ 100 %",
                detail:"ห้ามกรอกเปอร์เซ้นต์เกิน 100 %",
                life: 3000,
            });
            return;
    }



    const result = await Swal.fire({
        text: "คุณต้องการเพิ่มข้อมูลกำหนดแบ่งเปอร์เซ็นต์ใช่หรือไม่?",
        icon: "question",
        iconColor: "#8B2FC9",
        showCancelButton: true,
        confirmButtonColor: "#8B2FC9",
        cancelButtonColor: "#E85D40",
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
      });
    
    if(result.isConfirmed){
        isLoading.value = true;
        const config = {
            method: "post",
            headers: {
                "token": token.value,
            },
            data: from.value,
            url: `${process.env.VUE_APP_MARUEY}percentprofit/`,
        };
        await axios(config).then(async(res) => {
            if (res.data?.status === true) {
                toast.add({
                    severity: "success",
                    summary: "เพิ่มข้อมูลสำเร็จ",
                    detail: "เพิ่มข้อมูลสำเร็จ",
                    life: 3000,
                });
                await getData();
                dialog.value = false;
            } else {
                toast.add({
                    severity: "error",
                    summary: "เพิ่มข้อมูลไม่สำเร็จ",
                    detail: "เพิ่มข้อมูลไม่สำเร็จ",
                    life: 3000,
                });
            }
        }).catch((err) => { 

          if(err.response.status == 409){
              toast.add({
                    severity: "error",
                    summary: "ข้อมูลซ้ำกัน",
                    detail: err.response.data.message,
                    life: 3000,
            });
          }else{
            toast.add({
                    severity: "error",
                    summary: "เพิ่มข้อมูลไม่สำเร็จ",
                    detail: "เพิ่มข้อมูลไม่สำเร็จ",
                    life: 3000,
            });
          }

          

        });
        isLoading.value = false;
    }
};

const editdata = async () => {
    //เช็คก่อนกรอกค่าครบไหม
    if(headform.value == "แก้ไขเปอร์เซ็นต์สินค้าของตัวเอง")
    {
       
        if(from.value.percentmaruey.owner+from.value.percentmaruey.sharelink !=100)
        {
            toast.add({
                severity: "warn",
                summary: "กรอกเปอร์เซ็นต์ให้ครบ 100 %",
                detail:"ห้ามกรอกเปอร์เซ้นต์เกิน 100 %",
                life: 3000,
            });
            return;
        }
        if(from.value.percentmaruey.owner =="" || from.value.percentmaruey.sharelink =="")
        {
            toast.add({
                severity: "error",
                summary: "กรุณากรอกข้อมูลให้ครบ",
                detail:"กรุณากรอกข้อมูลให้ครบ",
                life: 3000,
            });
            return;
        }
    }
    else if(headform.value == "แก้ไขเปอร์เซ็นต์สินค้าของคู่ค้า")
    {
        if(from.value.percentpartner.owner+from.value.percentpartner.platform !=100)
        {
            toast.add({
                severity: "warn",
                summary: "กรอกเปอร์เซ็นต์ให้ครบ 100 %(คู่ค้า)",
                detail:"ห้ามกรอกเปอร์เซ้นต์เกิน 100 % (คู่ค้า)",
                life: 3000,
            });
            return;
        }
        if(from.value.percentpartner.separateplatform.platform+from.value.percentpartner.separateplatform.sharelink !=100)
        {
            toast.add({
                severity: "warn",
                summary: "กรอกเปอร์เซ็นต์ให้ครบ 100 %(หักแพลตฟอร์ม)",
                detail:"ห้ามกรอกเปอร์เซ้นต์เกิน 100 % (หักแพลตฟอร์ม)",
                life: 3000,
            });
            return;
        }


        if(from.value.percentpartner.owner =="" || from.value.percentpartner.platform =="" || from.value.percentpartner.separateplatform.platform =="" || from.value.percentpartner.separateplatform.sharelink =="")
        {
            toast.add({
                severity: "error",
                summary: "กรุณากรอกข้อมูลให้ครบ",
                detail:"กรุณากรอกข้อมูลให้ครบ",
                life: 3000,
            });
            return;
        }
    }
    else if(headform.value == "แก้ไขเปอร์เซ็นต์แบ่งรายได้คืนให้กับลูกค้า")
    {
        if(from.value.percentcustomer.sharelink+from.value.percentcustomer.shareproduct !=100)
        {
            toast.add({
                severity: "warn",
                summary: "กรอกเปอร์เซ็นต์ให้ครบ 100 %",
                detail:"ห้ามกรอกเปอร์เซ้นต์เกิน 100 %",
                life: 3000,
            });
            return;
        }
        if(from.value.percentcustomer.shareproduct =="" || from.value.percentcustomer.sharelink =="")
        {
            toast.add({
                severity: "error",
                summary: "กรุณากรอกข้อมูลให้ครบ",
                detail:"กรุณากรอกข้อมูลให้ครบ",
                life: 3000,
            });
            return;
        }
    }
    else if(headform.value == "แก้ไขเปอร์เซ็นต์ส่วนแบ่งรายได้จากการแชร์ลิงค์")
    {
        if(from.value.sharelink.level_one+from.value.sharelink.level_two+from.value.sharelink.level_three+from.value.sharelink.level_four+from.value.sharelink.level_five+from.value.sharelink.level_six+from.value.sharelink.level_seven+from.value.sharelink.level_eight+from.value.sharelink.level_nine+from.value.sharelink.level_ten !=100)
        {
            toast.add({
                severity: "warn",
                summary: "กรอกเปอร์เซ็นต์ให้ครบ 100 %",
                detail:"ห้ามกรอกเปอร์เซ้นต์เกิน 100 %",
                life: 3000,
            });
            return;
        }
        if(from.value.sharelink.level_one =="" || from.value.sharelink.level_two =="" || from.value.sharelink.level_three =="" || from.value.sharelink.level_four =="" || from.value.sharelink.level_five =="" || from.value.sharelink.level_six =="" || from.value.sharelink.level_seven =="" || from.value.sharelink.level_eight =="" || from.value.sharelink.level_nine =="" || from.value.sharelink.level_ten =="")
        {
            toast.add({
                severity: "error",
                summary: "กรุณากรอกข้อมูลให้ครบ",
                detail:"กรุณากรอกข้อมูลให้ครบ",
                life: 3000,
            });
            return;
        }
    }

    const result = await Swal.fire({
        text: `คุณต้องการ${headform.value}หรือไม่?`,
        icon: "question",
        iconColor: "#8B2FC9",
        showCancelButton: true,
        confirmButtonColor: "#8B2FC9",
        cancelButtonColor: "#E85D40",
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
      });
    
    if(result.isConfirmed){
        isLoading.value = true;
        let data
        let url
       
        if(headform.value ==  "แก้ไขเปอร์เซ็นต์สินค้าของตัวเอง")
        {
            data ={
                percentmaruey: {
                    owner: from.value.percentmaruey.owner,
                    sharelink: from.value.percentmaruey.sharelink
                }
            }
            url = `${process.env.VUE_APP_MARUEY}percentprofit/editpercentmaruey/${from.value._id}`
        
        }
        else if(headform.value ==  "แก้ไขเปอร์เซ็นต์สินค้าของคู่ค้า")
        {
            data ={
                percentpartner: {
                    owner: from.value.percentpartner.owner,
                    platform: from.value.percentpartner.platform,
                    separateplatform: {
                        platform: from.value.percentpartner.separateplatform.platform,
                        sharelink: from.value.percentpartner.separateplatform.sharelink
                    }
                }
            }
            url = `${process.env.VUE_APP_MARUEY}percentprofit/editpercentpartner/${from.value._id}`
        }
        else if(headform.value ==  "แก้ไขเปอร์เซ็นต์แบ่งรายได้คืนให้กับลูกค้า")
        {
            data ={
                percentcustomer: {
                    shareproduct: from.value.percentcustomer.shareproduct,
                    sharelink: from.value.percentcustomer.sharelink
                }
            }
            url = `${process.env.VUE_APP_MARUEY}percentprofit/editpercentcustomer/${from.value._id}`
        }
        else if(headform.value ==  "แก้ไขเปอร์เซ็นต์ส่วนแบ่งรายได้จากการแชร์ลิงค์")
        {
            data ={
                sharelink: {
                    level_one: from.value.sharelink.level_one,
                    level_two: from.value.sharelink.level_two,
                    level_three: from.value.sharelink.level_three,
                    level_four: from.value.sharelink.level_four,
                    level_five: from.value.sharelink.level_five,
                    level_six: from.value.sharelink.level_six,
                    level_seven: from.value.sharelink.level_seven,
                    level_eight: from.value.sharelink.level_eight,
                    level_nine: from.value.sharelink.level_nine,
                    level_ten: from.value.sharelink.level_ten
                }
                
            }
            url = `${process.env.VUE_APP_MARUEY}percentprofit/editsharelink/${from.value._id}`
        }else{
            isLoading.value = false;
            toast.add({
                severity: "error",
                summary: "ข้อมูลผิดพลาด",
                detail:"ข้อมูลผิดพลาด",
                life: 3000,
            });
            return;
        }
        
        const config = {
            method: "put",
            headers: {
                "token": token.value,
            },
            data: data,
            url: url,
        };
        await axios(config).then((res) => {
            if (res.data?.status === true) {
                toast.add({
                    severity: "success",
                    summary: "แก้ไขข้อมูลสำเร็จ",
                    detail: "แก้ไขข้อมูลสำเร็จ",
                    life: 3000,
                });
                dialogedit.value = false;
                getData();
            } else {
                toast.add({
                    severity: "error",
                    summary: "แก้ไขข้อมูลไม่สำเร็จ",
                    detail: "แก้ไขข้อมูลไม่สำเร็จ",
                    life: 3000,
                });
            }
        }).catch((err) => { 
          if(err.response.status == 409){
              toast.add({
                    severity: "error",
                    summary: "ข้อมูลซ้ำกัน",
                    detail: err.response.data.message,
                    life: 3000,
            });
          }else{
            toast.add({
                    severity: "error",
                    summary: "แก้ไขข้อมูลไม่สำเร็จ",
                    detail: "แก้ไขข้อมูลไม่สำเร็จ",
                    life: 3000,
            });
          }
        });
        isLoading.value = false;
    }
};





</script>

<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

@import "../../../assets/Loading.css";
</style>

<style>
div:where(.swal2-container) {
  z-index: 9000;
}

@media (max-width: 1199px) {
  .dialog-class {
    width: 75vw;
  }
}

@media (max-width: 575px) {
  .dialog-class {
    width: 90vw;
  }
}
</style>

<style>
  .p-inputtext {
   padding: 0.5rem;
  }
</style>