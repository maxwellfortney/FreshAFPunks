<script>
    import { onDestroy, onMount } from "svelte";
    import {
        connectContract,
        getUserInventory,
        userNumOwnedPunks,
        userAverageRarity,
        userMostRare,
        userOwnedPunksData,
    } from "../../stores/contract";
    import {
        selectedAccount,
        clearCachedProvider,
        networkID,
    } from "../../stores/wallet";

    let isLoading = false;

    onMount(() => {
        document.getElementsByClassName("mainApp")[0].style.maxHeight = "100vh";
    });

    onDestroy(() => {
        document.getElementsByClassName("mainApp")[0].style.maxHeight =
            "initial";
    });

    async function getUserInfo() {
        isLoading = true;
        await getUserInventory();
        isLoading = false;
    }

    // async function calculateAverageRarity() {
    //     return await _calculateAverageRarity();
    // }
</script>

<p
    on:click={clearCachedProvider}
    class="absolute text-xs transition cursor-pointer hover:opacity-70 bottom-1 right-2 dark:text-white"
>
    Clear Cached Login
</p>
<div
    class="flex flex-col items-center justify-start flex-auto w-full overflow-y-auto"
>
    <!-- ADD HERE -->
    {#if $selectedAccount && $networkID === 1}
        {#await getUserInfo()}
            <div class="flex flex-col items-center justify-center flex-auto">
                <div class="loader" />
                <p class="mt-4 text-sm dark:text-white">
                    Loading {$userNumOwnedPunks && $userOwnedPunksData
                        ? `${$userOwnedPunksData.length}/${$userNumOwnedPunks} FreshAFPunks`
                        : ""}
                </p>
            </div>
        {:then}
            <div class="flex flex-col w-10/12 mt-12">
                <div class="flex flex-col self-start">
                    <p class="text-xl sm:text-2xl md:text-3xl dark:text-white">
                        My Statistics
                    </p>
                    <div class={`relative z-10 transition-all`}>
                        <div class="bg-FreshAF-red psuedoUnderline" />
                    </div>
                </div>
                <p class="mt-4 ml-10 text-xl dark:text-white">
                    Quantity: {$userNumOwnedPunks}
                </p>
                {#if $userNumOwnedPunks > 0}
                    <p class="mt-2 ml-10 text-xl dark:text-white">
                        Average Rarity: {$userAverageRarity}%
                    </p>
                    <p class="mt-2 ml-10 text-xl dark:text-white">
                        Most Rare Attribute: {$userMostRare.trait_type}: {$userMostRare.value}
                        {$userMostRare.rarity.toFixed(2)}%
                    </p>
                {/if}
                <div class="flex flex-col self-start mt-6">
                    <p class="text-xl sm:text-2xl md:text-3xl dark:text-white">
                        My FreshAFPunks
                    </p>
                    <div class={`relative z-10 transition-all`}>
                        <div class="bg-FreshAF-red psuedoUnderline" />
                    </div>
                </div>
                {#if $userOwnedPunksData && $userOwnedPunksData.length > 0}
                    <div
                        class="grid w-11/12 gap-8 mx-auto mt-6 overflow-y-auto punksGrid"
                    >
                        {#each $userOwnedPunksData as punk}
                            <div class="flex flex-col">
                                <a
                                    href={`/#/shop/${
                                        punk.image
                                            .split("\\")
                                            .pop()
                                            .split("/")
                                            .pop()
                                            .split(".")[0]
                                    }`}
                                    class="flex transition shadow-lg cursor-pointer aPunk"
                                >
                                    <img src={punk.image} alt="A FreshAFPunk" />
                                </a>
                            </div>{/each}
                    </div>
                {/if}
            </div>
        {/await}
    {:else if $networkID !== 1 && $selectedAccount}
        <p class="mt-4 ml-10 text-xl dark:text-white">
            Please change to the Ethereum mainnet
        </p>
    {:else}
        <p class="mt-4 ml-10 text-xl dark:text-white">No wallet connected</p>
    {/if}
</div>

<style>
    .punksGrid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }

    @media (min-width: 1200px) {
        .punksGrid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        }
    }

    .aPunk {
        box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
            rgba(0, 0, 0, 0.23) 0px 6px 6px;
    }

    .aPunk:hover {
        transform: translateY(-3px);
        opacity: 0.8;
    }

    .aPunk img {
        image-rendering: pixelated;
        image-rendering: -moz-crisp-edges;
        image-rendering: crisp-edges;
    }

    .loader {
        border: 4px solid #f0f0f025; /* Light grey */
        border-top: 4px solid #dbdbdb; /* Blue */
        border-radius: 50%;
        width: 45px;
        height: 45px;
        animation: spin 1s linear infinite;
    }
</style>
