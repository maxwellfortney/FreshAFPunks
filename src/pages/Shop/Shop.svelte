<script>
    import { selectedAccount } from "../../stores/wallet";
    import {
        connectContract,
        getMintablePunks,
        getSoldPunks,
        totalSupply,
    } from "../../stores/contract";
    import PaginatePane from "./PaginatePane.svelte";
    import { onDestroy, onMount } from "svelte";
    import { get } from "svelte/store";

    let scrollBoxHeight;
    let scrollBoxWidth;

    let viewingMintable = true;
    let offset = 0;
    let pageLimit = 45;
    let mintablePunksData = [];
    let soldPunksData = [];

    let isLoading = true;

    let data = [];

    $: data = viewingMintable
        ? [...data, ...mintablePunksData]
        : [...data, ...soldPunksData];

    async function fetchSold(shouldReset) {
        isLoading = true;
        if (shouldReset) data = [];
        viewingMintable = false;
        // await connectContract();

        soldPunksData = await getSoldPunks(offset, pageLimit);
        console.log(soldPunksData);
        pageLimit = scrollBoxWidth > 1000 ? 20 : 10;
        isLoading = false;
    }

    async function fetchMintable(shouldReset) {
        isLoading = true;
        if (shouldReset) data = [];
        viewingMintable = true;
        // await connectContract();

        mintablePunksData = await getMintablePunks(offset, pageLimit);
        console.log(mintablePunksData);
        pageLimit = scrollBoxWidth > 1000 ? 20 : 10;
        isLoading = false;
    }

    onMount(() => {
        document.getElementsByClassName("mainApp")[0].style.maxHeight = "100vh";
    });

    onDestroy(() => {
        document.getElementsByClassName("mainApp")[0].style.maxHeight =
            "initial";
    });
</script>

<div
    class="flex flex-col items-center justify-start flex-auto w-full overflow-y-auto"
>
    <div
        class="flex flex-col flex-auto w-11/12 mt-4 overflow-y-auto md:w-10/12 md:mt-8"
    >
        <div class="flex justify-between mb-10">
            <div class="flex">
                <div class="flex flex-col mr-1">
                    <p
                        on:click={() => fetchMintable(true)}
                        class:viewingMintable
                        class="text-xl transition-opacity cursor-pointer sm:text-2xl md:text-3xl dark:text-white opacity-40"
                    >
                        Mintable
                    </p>
                    <div
                        class={`relative z-10 transition-all ${
                            viewingMintable ? "max-w-full" : "max-w-0"
                        }`}
                    >
                        <div class="bg-FreshAF-red psuedoUnderline" />
                    </div>
                </div>
                <p
                    class="mr-1 text-xl sm:text-2xl md:text-3xl dark:text-white opacity-40"
                >
                    /
                </p>
                <div class="flex flex-col">
                    <p
                        on:click={() => (isLoading ? null : fetchSold(true))}
                        class:viewingMintable={!viewingMintable}
                        class="text-xl transition-opacity cursor-pointer sm:text-2xl md:text-3xl dark:text-white opacity-40"
                    >
                        Sold
                    </p>
                    <div
                        class={`relative z-10 transition-all ${
                            viewingMintable ? "max-w-0" : "max-w-full"
                        }`}
                    >
                        <div class="bg-FreshAF-red psuedoUnderline" />
                    </div>
                </div>
            </div>
            <p class="text-base dark:text-white">
                {viewingMintable
                    ? `${12500 - parseInt($totalSupply)}`
                    : $totalSupply}
                {viewingMintable ? "For Sale" : "Sold"}
            </p>
        </div>
        {#if $selectedAccount}
            {#if data.length > 0}
                <div
                    class="grid w-full gap-8 overflow-y-auto punksGrid"
                    bind:clientHeight={scrollBoxHeight}
                    bind:clientWidth={scrollBoxWidth}
                >
                    {#each data as punk, i}
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
                        </div>
                    {/each}
                    <PaginatePane
                        hasMore={viewingMintable
                            ? mintablePunksData.length
                            : soldPunksData.length}
                        threshold={scrollBoxHeight * 0.5}
                        on:loadMore={() => {
                            offset += pageLimit;
                            if (viewingMintable) {
                                fetchMintable();
                            } else {
                                fetchSold();
                            }
                        }}
                    />
                </div>
            {:else if viewingMintable}
                {#await fetchMintable()}
                    <div class="flex items-center justify-center flex-auto">
                        <div class="loader" />
                    </div>
                {/await}
            {:else}
                <!-- {#await fetchSold()}
                    <div class="flex items-center justify-center flex-auto">
                        <div class="loader" />
                    </div>
                {/await} -->
            {/if}
        {/if}
    </div>
</div>

<style>
    .viewingMintable {
        opacity: 1;
    }
    .punksGrid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }

    @media (min-width: 1200px) {
        .punksGrid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        }
    }

    .loader {
        border: 4px solid #f0f0f025; /* Light grey */
        border-top: 4px solid #dbdbdb; /* Blue */
        border-radius: 50%;
        width: 45px;
        height: 45px;
        animation: spin 1s linear infinite;
    }

    .aPunk {
        box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
            rgba(0, 0, 0, 0.23) 0px 6px 6px;
    }

    .aPunk:hover {
        transform: translateY(-3px);
        opacity: 0.8;
    }
</style>
