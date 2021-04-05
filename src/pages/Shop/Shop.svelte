<script>
    import { selectedAccount, networkID } from "../../stores/wallet";
    import {
        connectContract,
        getMintablePunks,
        getSoldPunks,
        totalSupply,
        getRandomMintablePunk,
        currentPrice,
        getCurrentPrice,
        attemptMint,
        checkOwnerOf,
    } from "../../stores/contract";
    import PaginatePane from "./PaginatePane.svelte";
    import { onDestroy, onMount } from "svelte";
    import { push } from "svelte-spa-router";

    let scrollBoxHeight;
    let scrollBoxWidth;

    let viewingMintable = true;
    let offset = 0;
    let pageLimit = 45;

    let soldPunksData = [];

    let isLoading = true;
    let mintCount = 1;
    let isWaitingForRandoms = false;
    let isWaitingForTx = false;
    let maxMintCount = 10;

    let data = [];
    let randomIDs = [];

    let secondaryLockedIDs = [
        3651,
        5000,
        1666,
        9421,
        8212,
        4232,
        11472,
        12409,
        12092,
        5500,
        2549,
        2549,
        376,
        2383,
        385,
        7189,
        12006,
        2877,
        6876,
        9756,
        4413,
        2556,
        11288,
        5882,
        5052,
        12393,
        2212,
        11071,
        6078,
        3234,
        8509,
        10265,
        4368,
        212,
        8302,
        3371,
        4262,
        6288,
        8573,
        4773,
        5652,
        8018,
        6767,
        1228,
        11581,
        1143,
        1711,
        2313,
        10066,
        3505,
        6606,
        6809,
        4728,
        3364,
        5744,
        11741,
        11162,
        1697,
        2905,
        7012,
        2262,
        3576,
        11782,
        6021,
        5355,
        7167,
        3205,
        2370,
        6631,
        906,
        3811,
        10220,
        722,
        8506,
        6082,
        6651,
        6713,
        109,
        2941,
        1472,
        9990,
        6110,
        647,
        619,
        5230,
        3155,
        7514,
        420,
        8286,
        10654,
        7823,
        10139,
        6715,
        7406,
        5250,
        3076,
        522,
        4895,
        7486,
        2604,
        10978,
        2015,
        6790,
        10511,
        69,
        7119,
        7913,
        4928,
        6160,
        3285,
        11321,
    ];
    $: generatedCount = randomIDs.length;

    $: data = [...data, ...soldPunksData];

    // $: if (data) {
    //     data = [
    //         ...new Set(
    //             data.map((item) => {
    //                 item.tokenID;
    //             })
    //         ),
    //     ];
    // }

    // let soldBatches = [
    //     false,
    //     false,
    //     false,
    //     false,
    //     false,
    //     false,
    //     false,
    //     false,
    //     false,
    //     false,
    // ];

    // let numsToCheck = [
    //     12006,
    //     2212,
    //     4262,
    //     1711,
    //     11162,
    //     3205,
    //     6713,
    //     420,
    //     4895,
    //     4928,
    // ];

    // let prevTotalSupply = $totalSupply;

    // $: if ($totalSupply !== prevTotalSupply) {
    //     soldBatches.forEach(async (batch, i) => {
    //         console.log(await checkOwnerOf(numsToCheck[i]));
    //         if ((await checkOwnerOf(numsToCheck[i])) === true) {
    //             soldBatches[i] = true;
    //         }
    //     });
    //     prevTotalSupply = $totalSupply;
    //     console.log(soldBatches);
    // }

    async function lockRandoms(randomIDs) {
        await fetch(
            "https://freshafpunks-metadata-api.herokuapp.com/lockedIDs",
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(randomIDs),
            }
        );
    }

    async function unlockRandoms(randomIDs) {
        await fetch(
            "https://freshafpunks-metadata-api.herokuapp.com/removeLockedIDs",
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(randomIDs),
            }
        );
    }

    async function fetchLockedRandoms() {
        return await fetch(
            "https://freshafpunks-metadata-api.herokuapp.com/lockedIDs"
        ).then(async (r) => {
            // console.log(await r.json());
            return await r.json();
        });
    }

    async function randomMint() {
        isWaitingForRandoms = true;
        randomIDs = [];
        let lockedIDs = await fetchLockedRandoms();
        while (randomIDs.length < mintCount) {
            let randomNum = await getRandomMintablePunk();
            // console.log(randomIDs);
            while (
                randomIDs.includes(randomNum) ||
                lockedIDs.includes(randomNum) ||
                secondaryLockedIDs.includes(randomNum)
            ) {
                // console.log("ALREADY SOMEWHERE: ", randomNum);
                randomNum = await getRandomMintablePunk();
            }

            randomIDs = [...randomIDs, randomNum];
        }
        isWaitingForRandoms = false;
        isWaitingForTx = true;

        // console.log(randomIDs);
        await lockRandoms(randomIDs);
        let tx = await attemptMint(randomIDs);
        console.log(tx);
        await unlockRandoms(randomIDs);
        if (tx === false) {
            isWaitingForTx = false;
        } else {
            console.log("success");
            isWaitingForTx = false;
            push("/inventory");
        }
    }

    async function presaleMint(tokenIDs, batchNum) {
        waitingForBatchNum = batchNum;
        let tx = await attemptMint(tokenIDs);
        console.log(tx);

        if (tx === false) {
            waitingForBatchNum = null;
        } else {
            console.log("success");
            waitingForBatchNum = null;
        }
    }

    async function fetchSold(shouldReset) {
        isLoading = true;

        if (shouldReset) {
            pageLimit = 45;
            offset = 0;
            data = [];
        }
        viewingMintable = false;
        // await connectContract();

        soldPunksData = await getSoldPunks(offset, pageLimit);
        console.log(soldPunksData);
        pageLimit = scrollBoxWidth > 1000 ? 20 : 10;
        isLoading = false;
    }

    function handleChangeMintCount(e) {
        if (parseInt(e.target.value) > 12500 - parseInt($totalSupply)) {
            mintCount = 12500 - parseInt($totalSupply);
        } else if (parseInt(e.target.value) <= 0) {
            mintCount = 1;
        } else if (parseInt(e.target.value) > maxMintCount) {
            mintCount = maxMintCount;
        } else {
            mintCount = parseInt(e.target.value);
        }
    }

    let priceInterval;

    onMount(async () => {
        // document.getElementsByClassName("mainApp")[0].style.maxHeight = "100vh";
        // setTimeout(async () => {
        //     if (viewingMintable) {
        //         await getCurrentPrice();
        //     }
        // }, 1000);
        priceInterval = setInterval(async () => {
            if (viewingMintable) {
                await getCurrentPrice();
            }
        }, 5000);
    });

    onDestroy(() => {
        document.getElementsByClassName("mainApp")[0].style.maxHeight =
            "initial";
        clearInterval(priceInterval);
    });

    let billsFanPresale = "0x465Aa44C1ECD8eeD60311bFdfDBEd0dbF12E1D7d";
    let waitingForBatchNum;
</script>

<div
    class="flex flex-col items-center justify-start flex-auto w-full overflow-y-auto"
>
    <div
        class={`flex flex-col flex-auto w-11/12 mt-4 ${
            viewingMintable ? "" : "overflow-y-auto"
        } md:w-10/12 md:mt-8`}
    >
        <div class="flex justify-between mb-10">
            <div class="flex">
                <div class="flex flex-col mr-1">
                    <p
                        on:click={() => {
                            viewingMintable = true;
                            document.getElementsByClassName(
                                "mainApp"
                            )[0].style.maxHeight = "initial";
                        }}
                        class:viewingMintable
                        class="text-xl transition-opacity cursor-pointer sm:text-2xl md:text-3xl dark:text-white opacity-40"
                    >
                        Mint
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
                        on:click={() => {
                            viewingMintable = false;
                            document.getElementsByClassName(
                                "mainApp"
                            )[0].style.maxHeight = "100vh";
                        }}
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
            <div class="flex items-center">
                <!-- {#if viewingMintable}
                    <a
                        href={`/#/shop/${$randomPunkNum}`}
                        class={`mr-5 shadow-lg aStackCard-hover relative px-1 py-1 text-base text-white bg-FreshAF-red aStackCard`}
                    >
                        Random
                    </a>
                {/if} -->

                <p class="text-base dark:text-white">
                    {viewingMintable
                        ? `${12500 - parseInt($totalSupply)}`
                        : $totalSupply}
                    {viewingMintable ? "Available" : "Sold"}
                </p>
            </div>
        </div>
        <!-- ADD HERE -->
        {#if $selectedAccount && $networkID === 1}
            <!-- {#if $selectedAccount === billsFanPresale && viewingMintable}
                <div
                    class="flex flex-col items-center justify-start flex-auto text-base dark:text-white"
                >
                    <p class="text-center underline redUnderline">
                        Please make sure the transaction is confirmed on ETH
                        blockchain before buying the next batch.
                    </p>

                    <p
                        class={`text-center mt-7 ${
                            soldBatches[0] ? "line-through" : ""
                        }`}
                    >
                        #2549, #376, #2383, #385, #7189, #12006, #2877, #6876,
                        #9756, #4413
                    </p>
                    <button
                        on:click={() => {
                            soldBatches[0]
                                ? null
                                : presaleMint(
                                      [
                                          2549,
                                          376,
                                          2383,
                                          385,
                                          7189,
                                          12006,
                                          2877,
                                          6876,
                                          9756,
                                          4413,
                                      ],
                                      1
                                  );
                        }}
                        class="relative flex items-center justify-center px-1 py-1 mt-2 ml-5 text-xs text-white shadow-lg aStackCard-hover bg-FreshAF-red aStackCard"
                        >{#if waitingForBatchNum === 1}
                            <div class="loader-small" />
                        {:else if soldBatches[0]}
                            Sold
                        {:else}
                            Batch 1
                        {/if}
                    </button>

                    <p
                        class={`text-center mt-7 ${
                            soldBatches[1] ? "line-through" : ""
                        }`}
                    >
                        #2556, #11288, #5882, #5052, #12393, #2212, #11071,
                        #6078, #3234, #8509
                    </p>
                    <button
                        on:click={() => {
                            soldBatches[1]
                                ? null
                                : presaleMint(
                                      [
                                          2556,
                                          11288,
                                          5882,
                                          5052,
                                          12393,
                                          2212,
                                          11071,
                                          6078,
                                          3234,
                                          8509,
                                      ],
                                      2
                                  );
                        }}
                        class="relative flex items-center justify-center px-1 py-1 mt-2 ml-5 text-xs text-white shadow-lg aStackCard-hover bg-FreshAF-red aStackCard"
                        >{#if waitingForBatchNum === 2}
                            <div class="loader-small" />
                        {:else if soldBatches[1]}
                            Sold
                        {:else}
                            Batch 2
                        {/if}
                    </button>

                    <p
                        class={`text-center mt-7 ${
                            soldBatches[2] ? "line-through" : ""
                        }`}
                    >
                        #10265, #4368, #212, #8302, #3371, #4262, #6288, #8573,
                        #4773, #5652
                    </p>
                    <button
                        on:click={() => {
                            soldBatches[2]
                                ? null
                                : presaleMint(
                                      [
                                          10265,
                                          4368,
                                          212,
                                          8302,
                                          3371,
                                          4262,
                                          6288,
                                          8573,
                                          4773,
                                          5652,
                                      ],
                                      3
                                  );
                        }}
                        class="relative flex items-center justify-center px-1 py-1 mt-2 ml-5 text-xs text-white shadow-lg aStackCard-hover bg-FreshAF-red aStackCard"
                        >{#if waitingForBatchNum === 3}
                            <div class="loader-small" />
                        {:else if soldBatches[2]}
                            Sold
                        {:else}
                            Batch 3
                        {/if}
                    </button>

                    <p
                        class={`text-center mt-7 ${
                            soldBatches[3] ? "line-through" : ""
                        }`}
                    >
                        #8018, #6767, #1228, #11581, #1143, #1711, #2313,
                        #10066, #3505, #6606
                    </p>
                    <button
                        on:click={() => {
                            soldBatches[3]
                                ? null
                                : presaleMint(
                                      [
                                          8018,
                                          6767,
                                          1228,
                                          11581,
                                          1143,
                                          1711,
                                          2313,
                                          10066,
                                          3505,
                                          6606,
                                      ],
                                      4
                                  );
                        }}
                        class="relative flex items-center justify-center px-1 py-1 mt-2 ml-5 text-xs text-white shadow-lg aStackCard-hover bg-FreshAF-red aStackCard"
                        >{#if waitingForBatchNum === 4}
                            <div class="loader-small" />
                        {:else if soldBatches[3]}
                            Sold
                        {:else}
                            Batch 4
                        {/if}
                    </button>

                    <p
                        class={`text-center mt-7 ${
                            soldBatches[4] ? "line-through" : ""
                        }`}
                    >
                        #6809, #4728, #3364, #5744, #11741, #11162, #1697,
                        #2905, #7012, #2262
                    </p>
                    <button
                        on:click={() => {
                            soldBatches[4]
                                ? null
                                : presaleMint(
                                      [
                                          6809,
                                          4728,
                                          3364,
                                          5744,
                                          11741,
                                          11162,
                                          1697,
                                          2905,
                                          7012,
                                          2262,
                                      ],
                                      5
                                  );
                        }}
                        class="relative flex items-center justify-center px-1 py-1 mt-2 ml-5 text-xs text-white shadow-lg aStackCard-hover bg-FreshAF-red aStackCard"
                        >{#if waitingForBatchNum === 5}
                            <div class="loader-small" />
                        {:else if soldBatches[4]}
                            Sold
                        {:else}
                            Batch 5
                        {/if}
                    </button>

                    <p
                        class={`text-center mt-7 ${
                            soldBatches[5] ? "line-through" : ""
                        }`}
                    >
                        #3576, #11782, #6021, #5355, #7167, #3205, #2370, #6631,
                        #906, #3811
                    </p>
                    <button
                        on:click={() => {
                            soldBatches[5]
                                ? null
                                : presaleMint(
                                      [
                                          3576,
                                          11782,
                                          6021,
                                          5355,
                                          7167,
                                          3205,
                                          2370,
                                          6631,
                                          906,
                                          3811,
                                      ],
                                      6
                                  );
                        }}
                        class="relative flex items-center justify-center px-1 py-1 mt-2 ml-5 text-xs text-white shadow-lg aStackCard-hover bg-FreshAF-red aStackCard"
                        >{#if waitingForBatchNum === 6}
                            <div class="loader-small" />
                        {:else if soldBatches[5]}
                            Sold
                        {:else}
                            Batch 6
                        {/if}
                    </button>

                    <p
                        class={`text-center mt-7 ${
                            soldBatches[6] ? "line-through" : ""
                        }`}
                    >
                        #10220, #722, #8506, #6082, #6651, #6713, #109, #2941,
                        #1472, #9990
                    </p>
                    <button
                        on:click={() => {
                            soldBatches[6]
                                ? null
                                : presaleMint(
                                      [
                                          10220,
                                          722,
                                          8506,
                                          6082,
                                          6651,
                                          6713,
                                          109,
                                          2941,
                                          1472,
                                          9990,
                                      ],
                                      7
                                  );
                        }}
                        class="relative flex items-center justify-center px-1 py-1 mt-2 ml-5 text-xs text-white shadow-lg aStackCard-hover bg-FreshAF-red aStackCard"
                        >{#if waitingForBatchNum === 7}
                            <div class="loader-small" />
                        {:else if soldBatches[6]}
                            Sold
                        {:else}
                            Batch 7
                        {/if}
                    </button>

                    <p
                        class={`text-center mt-7 ${
                            soldBatches[7] ? "line-through" : ""
                        }`}
                    >
                        #6110, #647, #619, #5230, #3155, #7514, #420, #8286,
                        #10654, #7823
                    </p>
                    <button
                        on:click={() => {
                            soldBatches[7]
                                ? null
                                : presaleMint(
                                      [
                                          6110,
                                          647,
                                          619,
                                          5230,
                                          3155,
                                          7514,
                                          420,
                                          8286,
                                          10654,
                                          7823,
                                      ],
                                      8
                                  );
                        }}
                        class="relative flex items-center justify-center px-1 py-1 mt-2 ml-5 text-xs text-white shadow-lg aStackCard-hover bg-FreshAF-red aStackCard"
                        >{#if waitingForBatchNum === 8}
                            <div class="loader-small" />
                        {:else if soldBatches[7]}
                            Sold
                        {:else}
                            Batch 8
                        {/if}
                    </button>

                    <p
                        class={`text-center mt-7 ${
                            soldBatches[8] ? "line-through" : ""
                        }`}
                    >
                        #10139, #6715, #7406, #5250, #3076, #522, #4895, #7486,
                        #2604, #10978
                    </p>
                    <button
                        on:click={() => {
                            soldBatches[8]
                                ? null
                                : presaleMint(
                                      [
                                          10139,
                                          6715,
                                          7406,
                                          5250,
                                          3076,
                                          522,
                                          4895,
                                          7486,
                                          2604,
                                          10978,
                                      ],
                                      9
                                  );
                        }}
                        class="relative flex items-center justify-center px-1 py-1 mt-2 ml-5 text-xs text-white shadow-lg aStackCard-hover bg-FreshAF-red aStackCard"
                        >{#if waitingForBatchNum === 9}
                            <div class="loader-small" />
                        {:else if soldBatches[8]}
                            Sold
                        {:else}
                            Batch 9
                        {/if}
                    </button>

                    <p
                        class={`text-center mt-7 ${
                            soldBatches[9] ? "line-through" : ""
                        }`}
                    >
                        #2015, #6790, #10511, #69, #7119, #7913, #4928, #6160,
                        #3285, #11321
                    </p>
                    <button
                        on:click={() => {
                            soldBatches[9]
                                ? null
                                : presaleMint(
                                      [
                                          2015,
                                          6790,
                                          10511,
                                          69,
                                          7119,
                                          7913,
                                          4928,
                                          6160,
                                          3285,
                                          11321,
                                      ],
                                      10
                                  );
                        }}
                        class="relative flex items-center justify-center px-1 py-1 mt-2 ml-5 text-xs text-white shadow-lg aStackCard-hover bg-FreshAF-red aStackCard"
                        >{#if waitingForBatchNum === 10}
                            <div class="loader-small" />
                        {:else if soldBatches[9]}
                            Sold
                        {:else}
                            Batch 10
                        {/if}
                    </button>
                </div> -->
            {#if viewingMintable}
                <div
                    class="flex flex-col items-center justify-start flex-auto text-base dark:text-white"
                >
                    {#if $currentPrice}
                        <p class="w-1/2 mt-12 text-xl text-center">
                            Please input the number of FreshAFPunks you would
                            like to mint.
                        </p>
                        <p class="w-1/2 text-base text-center">
                            Your {mintCount > 1 ? "Punks" : "Punk"} will be revealed
                            once your transaction is processed.
                        </p>
                        <!-- <p class="w-1/2 mt-1 text-xs text-center">
                            After clicking the mint button please checkout as
                            soon as possible to prevent potential transaction
                            failures.
                        </p> -->
                        <div
                            class="flex flex-col items-center justify-center mt-12"
                        >
                            <p>Current Price Tier: {$currentPrice} ETH</p>
                            <div class="flex w-full mt-6">
                                <input
                                    type="number"
                                    max={maxMintCount}
                                    min={1}
                                    step={1}
                                    class="w-16 p-1 text-center text-black"
                                    placeholder="Number to Mint"
                                    value={mintCount}
                                    on:change={(e) => handleChangeMintCount(e)}
                                />
                                <div
                                    on:click={() => {
                                        if (
                                            !isWaitingForTx &&
                                            !isWaitingForRandoms
                                        ) {
                                            randomMint();
                                        }
                                    }}
                                    class="relative flex items-center justify-center w-full px-1 py-1 ml-5 text-xs text-white shadow-lg aStackCard-hover bg-FreshAF-red aStackCard"
                                >
                                    {#if isWaitingForTx}
                                        <p class="mr-2">
                                            Waiting for transaction
                                        </p>
                                        <div class="loader-small" />
                                    {:else if isWaitingForRandoms}
                                        <p class="mr-2">
                                            Generated {generatedCount}/{mintCount}
                                        </p>
                                        <div class="loader-small" />
                                    {:else}
                                        <p>
                                            Mint {mintCount}
                                            {mintCount > 1 ? "Punks" : "Punk"} for
                                            {(
                                                $currentPrice * mintCount
                                            ).toFixed(4)} ETH
                                        </p>
                                    {/if}
                                </div>
                            </div>
                        </div>
                        <!-- <a class="text-xs underline mt-14" href="/#/gas"
                            >Learn About Gas</a
                        > -->
                    {:else}
                        {#await getCurrentPrice()}
                            <div class="loader" />
                        {/await}
                    {/if}
                </div>
            {:else if data.length > 0 && !viewingMintable}
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
                                target="_blank"
                                class="flex transition shadow-lg cursor-pointer aPunk"
                            >
                                <img src={punk.image} alt="A FreshAFPunk" />
                            </a>
                        </div>
                    {/each}
                    {#if isLoading}
                        <div class="flex items-center justify-center w-full">
                            <div class="loader" />
                        </div>
                    {/if}
                    <PaginatePane
                        hasMore={soldPunksData.length &&
                            data.length < $totalSupply}
                        threshold={scrollBoxHeight * 0.65}
                        on:loadMore={() => {
                            offset += pageLimit;
                            fetchSold();
                        }}
                    />
                </div>
            {:else}
                {#await fetchSold(true)}
                    <div class="flex items-center justify-center flex-auto">
                        <div class="loader" />
                    </div>
                {/await}
            {/if}
        {:else if $networkID !== 1 && $selectedAccount}
            <p class="mx-auto text-base dark:text-white ">
                Please change to the Ethereum mainnet
            </p>
        {:else}
            <p class="mx-auto text-base dark:text-white ">
                Please connect your wallet
            </p>
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
    .loader-small {
        border: 4px solid #f0f0f025; /* Light grey */
        border-top: 4px solid #dbdbdb; /* Blue */
        border-radius: 50%;
        width: 25px;
        height: 25px;
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

    .aPunk img {
        image-rendering: pixelated;
        image-rendering: -moz-crisp-edges;
        image-rendering: crisp-edges;
    }
    .redUnderline {
        text-decoration-color: red;
    }
</style>
