<template>


<div class='flex flex-col items-center justify-center min-h-screen p-16 bg-slate-200'>
    <h1 class="my-10 text-3xl sm:text-4xl font-black">
        Follow a Members
        <span class="day" style="display: inline-block">?</span>
        <span class="night" style="display: none">?</span>
    </h1>
    <div class="mb-4">
        <button class="toggle-theme btn inline-block select-none no-underline align-middle cursor-pointer whitespace-nowrap px-4 py-1.5 rounded text-base font-medium leading-6 tracking-tight text-white text-center border-0 bg-[#6911e7] hover:bg-[#590acb] duration-300" type="button">Dark</button>
    </div>
    <div class='user-list w-full max-w-lg mx-auto bg-white rounded-xl shadow-xl flex flex-col py-4'>
        <!--User row -->
        <div class="user-row flex flex-col items-center justify-between cursor-pointer  p-4 duration-300 sm:flex-row sm:py-4 sm:px-8 hover:bg-[#f6f8f9]">
            <div class="user flex items-center text-center flex-col sm:flex-row sm:text-left">
                <div class="avatar-content mb-2.5 sm:mb-0 sm:mr-2.5">
                    <img class="avatar w-20 h-20 rounded-full" src="https://randomuser.me/api/portraits/men/32.jpg"/>
                </div>
                <div class="user-body flex flex-col mb-4 sm:mb-0 sm:mr-4">
                    <a href="#" class="title font-medium no-underline">Wade Warren</a>
                    <div class="skills flex flex-col">
                        <span class="subtitle text-slate-500">Marketing Liaison</span>
                        <span class="subtitle text-slate-500">Coordinator ?</span>
                    </div>
                </div>
            </div>
            <!--Button content -->
            <div class="user-option mx-auto sm:ml-auto sm:mr-0">
                <button class="btn inline-block select-none no-underline align-middle cursor-pointer whitespace-nowrap px-4 py-1.5 rounded text-base font-medium leading-6 tracking-tight text-white text-center border-0 bg-[#6911e7] hover:bg-[#590acb] duration-300" type="button">Follow</button>
            </div>
            <!--Close Button content -->
        </div>
        <!--User row -->

        <!--User row -->
        <div class="user-row flex flex-col items-center justify-between cursor-pointer  p-4 duration-300 sm:flex-row sm:py-4 sm:px-8 hover:bg-[#f6f8f9]">
            <div class="user flex items-center text-center flex-col sm:flex-row sm:text-left">
                <div class="avatar-content mb-2.5 sm:mb-0 sm:mr-2.5">
                    <img class="avatar w-20 h-20 rounded-full" src="https://randomuser.me/api/portraits/women/44.jpg"/>
                </div>
                <div class="user-body flex flex-col mb-4 sm:mb-0 sm:mr-4">
                    <a href="#" class="title font-medium no-underline">Loura Weber</a>
                    <div class="skills flex flex-col">
                        <span class="subtitle text-slate-500">Lead Manager</span>
                        <span class="subtitle text-slate-500">Confidence</span>
                    </div>
                </div>
            </div>
            <!--Button content -->
            <div class="user-option mx-auto sm:ml-auto sm:mr-0">
                <button class="btn inline-block select-none no-underline align-middle cursor-pointer whitespace-nowrap px-4 py-1.5 rounded text-base font-medium leading-6 tracking-tight text-white text-center border-0 bg-[#6911e7] hover:bg-[#590acb] duration-300" type="button">Follow</button>
            </div>
            <!--Close Button content -->
        </div>
        <!--User row -->

        <!--User row -->
        <div class="user-row flex flex-col items-center justify-between cursor-pointer  p-4 duration-300 sm:flex-row sm:py-4 sm:px-8 hover:bg-[#f6f8f9]">
            <div class="user flex items-center text-center flex-col sm:flex-row sm:text-left">
                <div class="avatar-content mb-2.5 sm:mb-0 sm:mr-2.5">
                    <img class="avatar w-20 h-20 rounded-full" src="https://randomuser.me/api/portraits/men/46.jpg"/>
                </div>
                <div class="user-body flex flex-col mb-4 sm:mb-0 sm:mr-4">
                    <a href="#" class="title font-medium no-underline">Jane Cooper</a>
                    <div class="skills flex flex-col">
                        <span class="subtitle text-slate-500">Dog Trainer</span>
                        <span class="subtitle text-slate-500">Trainer</span>
                    </div>
                </div>
            </div>
            <!--Button content -->
            <div class="user-option mx-auto sm:ml-auto sm:mr-0">
                <button class="btn inline-block select-none no-underline align-middle cursor-pointer whitespace-nowrap px-4 py-1.5 rounded text-base font-medium leading-6 tracking-tight text-white text-center border-0 bg-[#6911e7] hover:bg-[#590acb] duration-300" type="button">Follow</button>
            </div>
            <!--Close Button content -->
        </div>
        <!--User row -->

        <!--User row -->
        <div class="user-row flex flex-col items-center justify-between cursor-pointer  p-4 duration-300 sm:flex-row sm:py-4 sm:px-8 hover:bg-[#f6f8f9]">
            <div class="user flex items-center text-center flex-col sm:flex-row sm:text-left">
                <div class="avatar-content mb-2.5 sm:mb-0 sm:mr-2.5">
                    <img class="avatar w-20 h-20 rounded-full" src="https://randomuser.me/api/portraits/men/47.jpg"/>
                </div>
                <div class="user-body flex flex-col mb-4 sm:mb-0 sm:mr-4">
                    <a href="#" class="title font-medium no-underline">Guy Hawkins</a>
                    <div class="skills flex flex-col">
                        <span class="subtitle text-slate-500">Medical Assistant</span>
                        <span class="subtitle text-slate-500">Assitant</span>
                    </div>
                </div>
            </div>
            <!--Button content -->
            <div class="user-option mx-auto sm:ml-auto sm:mr-0">
                <button class="btn inline-block select-none no-underline align-middle cursor-pointer whitespace-nowrap px-4 py-1.5 rounded text-base font-medium leading-6 tracking-tight text-white text-center border-0 bg-[#6911e7] hover:bg-[#590acb] duration-300" type="button">Follow</button>
            </div>
            <!--Close Button content -->
        </div>
        <!--User row -->

        <!--User row -->
        <div class="user-row flex flex-col items-center justify-between cursor-pointer  p-4 duration-300 sm:flex-row sm:py-4 sm:px-8 hover:bg-[#f6f8f9]">
            <div class="user flex items-center text-center flex-col sm:flex-row sm:text-left">
                <div class="avatar-content mb-2.5 sm:mb-0 sm:mr-2.5">
                    <img class="avatar w-20 h-20 rounded-full" src="https://randomuser.me/api/portraits/women/63.jpg"/>
                </div>
                <div class="user-body flex flex-col mb-4 sm:mb-0 sm:mr-4">
                    <a href="#" class="title font-medium no-underline">Julian Jill Brown</a>
                    <div class="skills flex flex-col">
                        <span class="subtitle text-slate-500">Web Designer</span>
                        <span class="subtitle text-slate-500">Work under pressure</span>
                    </div>
                </div>
            </div>
            <!--Button content -->
            <div class="user-option mx-auto sm:ml-auto sm:mr-0">
                <button class="btn inline-block select-none no-underline align-middle cursor-pointer whitespace-nowrap px-4 py-1.5 rounded text-base font-medium leading-6 tracking-tight text-white text-center border-0 bg-[#6911e7] hover:bg-[#590acb] duration-300" type="button">Follow</button>
            </div>
            <!--Close Button content -->
        </div>
        <!--User row -->

        <a class="show-more block w-10/12 mx-auto py-2.5 px-4 text-center no-underline rounded hover:bg-[#f6f8f9] font-medium duration-300" href="#/">Show more members</a>
    </div>
</div>
</template>


<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

</style>