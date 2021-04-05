<script>
    import { onMount } from "svelte";
    import { fetchSinglePunk, attemptMint } from "../../stores/contract";
    import { selectedAccount } from "../../stores/wallet";
    import {
        addToCart,
        cartArr,
        isInCart,
        removeFromCart,
    } from "../../stores/cart";
    import attributePercentages from "../../assets/attribute-percentages.json";

    export let params = {};

    $: tokenID = params.tokenID;

    let punkData;

    $: if (params.tokenID) {
        //watch the params.id for changes
        console.log("here");
        fetchPunkData(); //invoke your method to reload data
    }

    $: isValidTokenID = tokenID >= 0 && tokenID < 12500;

    async function fetchPunkData() {
        punkData = await fetchSinglePunk(tokenID);
        console.log(punkData);
    }

    function pad(n, width, z) {
        z = z || "0";
        n = n + "";
        return n.length >= width
            ? n
            : new Array(width - n.length + 1).join(z) + n;
    }

    function getPercentageForAttribute(value) {
        for (let i = 0; i < attributePercentages.length; i++) {
            if (attributePercentages[i].attributeName === value) {
                return attributePercentages[i].percent;
            }
        }
    }

    function parseTxDate(timestamp) {
        let date = new Date(timestamp * 1000);

        console.log(date.getMonth());
        let ret = "";

        ret +=
            date.getMonth() + 1 < 10
                ? `0${date.getMonth() + 1}/`
                : `${date.getDate() + 1}/`;

        ret +=
            date.getDate() < 10 ? `0${date.getDate()}/` : `${date.getDate()}/`;

        ret += date.getFullYear();

        return ret;
    }

    console.log(attributePercentages);
</script>

<div class="flex flex-col items-center justify-start flex-auto w-full">
    {#if $selectedAccount && isValidTokenID}
        <div class="flex flex-col items-center justify-start w-10/12 mt-12">
            {#await fetchPunkData()}
                <div class="loader" />
            {:then}
                {#if punkData}
                    <div class="flex flex-auto w-full aPunkContainer">
                        <div class="flex justify-center flex-auto w-1/2">
                            <img
                                src={punkData.image}
                                alt="punk"
                                class="w-full md:w-3/4 punkImage"
                            />
                        </div>
                        <div
                            class="flex flex-col justify-between flex-auto w-1/2"
                        >
                            <div class="flex flex-col w-3/4">
                                <h1 class="text-4xl dark:text-white">
                                    FreshAFPunk
                                </h1>
                                <h2 class="text-4xl dark:text-white">
                                    #{pad(
                                        punkData.image
                                            .split("\\")
                                            .pop()
                                            .split("/")
                                            .pop()
                                            .split(".")[0],
                                        5
                                    )}
                                </h2>
                            </div>
                            <!-- <p class="text-lg dark:text-white">
                                Short MetaData description can go gere. Lorem
                                ipsum dolor sit amet, consectetur adipiscing.
                            </p> -->
                            {#if punkData.owner}
                                <a
                                    href={`https://opensea.io/assets/0xabc3c131238bbf24972856b25fb484eddab76f46/${punkData.tokenID}`}
                                    class={`mb-6 mx-auto shadow-lg aStackCard-hover relative px-10 py-2 text-base text-white bg-FreshAF-red aStackCard`}
                                >
                                    Owned by {punkData.owner ===
                                    $selectedAccount
                                        ? "You"
                                        : `${punkData.owner.substr(0, 10)}...`}
                                </a>
                            {:else}
                                <a
                                    href="/#/shop"
                                    class={`mb-6 shadow-lg self-center aStackCard-hover relative px-10 py-2 text-base text-white bg-FreshAF-red aStackCard`}
                                >
                                    Available
                                </a>
                            {/if}
                        </div>
                    </div>
                    <div class="flex flex-col w-11/12 mt-6">
                        <h2 class="relative mr-auto text-2xl dark:text-white">
                            Accessories
                            <div class="psuedoUnderline bg-FreshAF-red" />
                        </h2>
                        <div class="flex flex-col w-11/12 mx-auto mt-2">
                            {#each punkData.attributes as attribute}
                                {#if !attribute.display_type}
                                    <div
                                        class="flex items-center justify-between mb-2 text-base dark:text-white"
                                    >
                                        <p>
                                            {attribute.trait_type}: {attribute.value}
                                        </p>
                                        <div
                                            class="flex-auto mx-6 border-t-2 border-dashed aDashed"
                                        />
                                        <p>
                                            {getPercentageForAttribute(
                                                attribute.value
                                            ).toFixed(2)}%
                                        </p>
                                    </div>
                                {:else}
                                    <div
                                        class="flex items-center justify-between mb-2 text-base dark:text-white"
                                    >
                                        <p>
                                            {attribute.trait_type}
                                        </p>
                                        <div
                                            class="flex-auto mx-6 border-t-2 border-dashed aDashed"
                                        />
                                        <p>
                                            {attribute.value}/{attribute.max_value}
                                        </p>
                                    </div>
                                {/if}
                            {/each}
                        </div>
                        {#if punkData.owner}
                            <h2
                                class="relative mt-2 mr-auto text-2xl dark:text-white"
                            >
                                Transactions
                                <div class="psuedoUnderline bg-FreshAF-red" />
                            </h2>
                            <div
                                class="flex flex-col w-11/12 mx-auto mt-2 text-base dark:text-white"
                            >
                                <table class="w-full max-w-full table-auto">
                                    <thead align="left" class="text-lg">
                                        <tr>
                                            <th>
                                                <div
                                                    class="relative flex w-full h-full"
                                                >
                                                    <div
                                                        class="relative flex flex-col mr-auto"
                                                    >
                                                        From
                                                        <div
                                                            class="relative psuedoUnderline bg-FreshAF-red"
                                                        />
                                                    </div>
                                                </div>
                                            </th>
                                            <th
                                                ><div
                                                    class="relative flex w-full h-full"
                                                >
                                                    <div
                                                        class="relative flex flex-col mr-auto"
                                                    >
                                                        To
                                                        <div
                                                            class="relative psuedoUnderline bg-FreshAF-red"
                                                        />
                                                    </div>
                                                </div></th
                                            >
                                            <th
                                                ><div
                                                    class="relative flex w-full h-full"
                                                >
                                                    <div
                                                        class="relative flex flex-col mr-auto"
                                                    >
                                                        ETH
                                                        <div
                                                            class="relative psuedoUnderline bg-FreshAF-red"
                                                        />
                                                    </div>
                                                </div></th
                                            >
                                            <th
                                                ><div
                                                    class="relative flex w-full h-full"
                                                >
                                                    <div
                                                        class="relative flex flex-col mr-auto"
                                                    >
                                                        Date
                                                        <div
                                                            class="relative psuedoUnderline bg-FreshAF-red"
                                                        />
                                                    </div>
                                                </div></th
                                            >
                                        </tr>
                                    </thead>
                                    <tbody class="mt-4">
                                        {#each punkData.transactions.reverse() as transaction}
                                            <tr class="py-1">
                                                <td
                                                    ><a
                                                        href={`https://etherscan.io/tx/${transaction.hash}`}
                                                        >{transaction.from.substr(
                                                            0,
                                                            10
                                                        )}...</a
                                                    ></td
                                                >
                                                <td
                                                    ><a
                                                        href={`https://etherscan.io/tx/${transaction.hash}`}
                                                        >{transaction.to.substr(
                                                            0,
                                                            10
                                                        )}...</a
                                                    ></td
                                                >
                                                <td
                                                    >{parseFloat(
                                                        transaction.value
                                                    ).toFixed(3)}</td
                                                >
                                                <td
                                                    ><a
                                                        href={`https://etherscan.io/tx/${transaction.hash}`}
                                                        >{parseTxDate(
                                                            transaction.timestamp
                                                        )}</a
                                                    ></td
                                                >
                                            </tr>
                                        {/each}
                                    </tbody>
                                </table>
                            </div>
                        {/if}
                    </div>
                {/if}
            {/await}
        </div>
    {:else if !isValidTokenID}
        <div class="flex flex-col items-center justify-center flex-auto h-full">
            <p class="text-4xl text-center dark:text-white">404</p>
            <p class="text-4xl text-center dark:text-white">Invalid tokenID</p>
        </div>
    {:else if !$selectedAccount}
        <p class="mt-4 ml-10 text-xl dark:text-white">No wallet connected</p>
    {:else}
        <div class="loader" />
    {/if}
</div>

<style>
    .punkImage {
        max-height: 625px;
        max-width: 625px;
        image-rendering: pixelated;
        image-rendering: -moz-crisp-edges;
        image-rendering: crisp-edges;
    }
    .aPunkContainer {
        max-height: 625px;
    }
    .loader {
        border: 4px solid #f0f0f025; /* Light grey */
        border-top: 4px solid #dbdbdb; /* Blue */
        border-radius: 50%;
        width: 25px;
        height: 25px;
        animation: spin 1s linear infinite;
    }
    .aDashed {
        max-height: 3px;
    }

    tr td:last-child {
        width: 1%;
        white-space: nowrap;
    }

    tbody tr td {
        padding: 1rem 0;
    }
</style>
