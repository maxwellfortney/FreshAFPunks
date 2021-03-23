<script>
    import { link, location } from "svelte-spa-router";
    import {
        isWaitingForAccount,
        promptForMetaMask,
        selectedAccount,
    } from "../stores/wallet.js";

    let showMobileMenu = false;
</script>

<div class="flex items-center justify-between w-full sm:w-11/12 Navbar">
    <a
        href="#/"
        on:click={() => (showMobileMenu = false)}
        class="pl-1 text-2xl sm:pl-0 sm:text-4xl flamingShadow dark:text-white"
        >FreshAFPunks</a
    >
    <div class="items-center hidden md:flex">
        <div class="flex flex-col mr-6 lg:mr-10">
            <a href="#/shop" class="mt-1 text-base dark:text-white">Shop</a>
            <div
                class={`relative z-10 transition-all ${
                    $location === "/shop" ? "max-w-full" : "max-w-0"
                }`}
            >
                <div class="bg-FreshAF-red psuedoUnderline" />
            </div>
        </div>
        <div class="flex flex-col mr-6 lg:mr-10">
            <a href="#/about" class="mt-1 text-base dark:text-white">About</a>
            <div
                class={`relative z-10 transition-all ${
                    $location === "/about" ? "max-w-full" : "max-w-0"
                }`}
            >
                <div class="bg-FreshAF-red psuedoUnderline" />
            </div>
        </div>
        {#if $selectedAccount}
            <a
                href="#/inventory"
                class={`shadow-lg aStackCard-hover relative px-2 py-2 text-base text-white bg-FreshAF-red aStackCard`}
            >
                {$selectedAccount.substr(0, 10) + "..."}
            </a>
        {:else}
            <div
                on:click={promptForMetaMask}
                class={`shadow-lg aStackCard-hover relative px-10 py-2 text-base text-white bg-FreshAF-red aStackCard`}
            >
                Login
            </div>
        {/if}
    </div>
    <div
        on:click={() => (showMobileMenu = !showMobileMenu)}
        class="flex flex-col mr-3 hambugerButton md:hidden"
    >
        <div class={`shadow-lg relative z-10 transition-all w-full`}>
            <div class="bg-FreshAF-red psuedoUnderline" />
        </div>
        <div class={`shadow-lg relative z-10 transition-all w-full mt-1.5`}>
            <div class="bg-FreshAF-red psuedoUnderline" />
        </div>
        <div class={`shadow-lg relative z-10 transition-all w-full mt-1.5`}>
            <div class="bg-FreshAF-red psuedoUnderline" />
        </div>
    </div>
</div>

<div
    class={`md:hidden flex justify-center items-center flex-col bg-FreshAF-gray z-20 transition-all absolute w-screen mobileMenu ${
        !showMobileMenu ? "left-screen" : "left-0"
    }`}
>
    <div class="flex flex-col justify-around h-1/2">
        <div class="flex flex-col mx-auto">
            <a
                href="#/shop"
                on:click={() => (showMobileMenu = false)}
                class="text-3xl dark:text-white">Shop</a
            >
            <div
                class={`relative z-10 transition-all ${
                    $location === "/shop" ? "max-w-full" : "max-w-0"
                }`}
            >
                <div class="bg-FreshAF-red psuedoUnderline" />
            </div>
        </div>
        <div class="flex flex-col mx-auto">
            <a
                href="#/about"
                on:click={() => (showMobileMenu = false)}
                class="text-3xl dark:text-white">About</a
            >
            <div
                class={`relative z-10 transition-all ${
                    $location === "/about" ? "max-w-full" : "max-w-0"
                }`}
            >
                <div class="bg-FreshAF-red psuedoUnderline" />
            </div>
        </div>
        {#if $selectedAccount}
            <div
                on:click={promptForMetaMask}
                class={`shadow-lg aStackCard-hover relative px-2 py-2 text-base text-white bg-FreshAF-red aStackCard`}
            >
                {$selectedAccount.substr(0, 10) + "..."}
            </div>
        {:else}
            <a
                href="#/inventory"
                class={`shadow-lg aStackCard-hover relative px-10 py-2 text-base text-white bg-FreshAF-red aStackCard`}
                >Login
            </a>
        {/if}
    </div>
</div>

<style>
    .Navbar {
        height: 105px;
        max-height: 105px;
        min-height: 105px;
    }
    .viewingMintable {
        opacity: 1;
    }
    .hambugerButton {
        width: 28px;
    }
    .mobileMenu {
        top: 95px;
        height: calc(100vh - 95px);
    }
    .left-screen {
        left: 100vw;
    }
</style>
