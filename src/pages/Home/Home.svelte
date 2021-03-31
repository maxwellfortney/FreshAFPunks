<script>
    import { link } from "svelte-spa-router";
    import {
        isWaitingForAccount,
        promptForMetaMask,
        selectedAccount,
        networkID,
    } from "../../stores/wallet.js";
    import { onMount } from "svelte";

    onMount(async () => {
        // await promptForMetaMask();
        console.log($selectedAccount);
    });
</script>

<div class="flex flex-col items-center justify-center flex-auto">
    <h2 class="text-xl sm:text-2xl dark:text-white">CryptoPunks...</h2>
    <h2 class="text-base sm:text-lg dark:text-white">but</h2>
    <h1
        class="mb-10 text-5xl sm:text-6xl md:text-7xl flamingShadow dark:text-white"
    >
        FreshAF
    </h1>
    <a
        href="#/shop"
        class="relative px-2 py-1.5 text-sm sm:text-base text-white aStackCard-hover aStackCard bg-FreshAF-red shadow-lg"
    >
        {$selectedAccount ? "Shop The Collection" : "View The Collection"}
    </a>
    {#if $networkID !== 1 && $selectedAccount}
        <p class="mt-4 text-xs dark:text-white">
            Psst. Hey! You're not on the Ethereum Mainnet.
        </p>
    {/if}
    <!-- <div
        class="relative px-2 py-1.5 text-sm sm:text-base text-white aStackCard-hover aStackCard bg-FreshAF-red shadow-lg"
    >
        Coming Soon
    </div> -->
</div>

<style>
    .loader {
        border: 4px solid #f0f0f025; /* Light grey */
        border-top: 4px solid #dbdbdb; /* Blue */
        border-radius: 50%;
        width: 25px;
        height: 25px;
        animation: spin 1s linear infinite;
    }
</style>
