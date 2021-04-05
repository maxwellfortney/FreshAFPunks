<script>
    import { link, location, push } from "svelte-spa-router";
    import {
        isWaitingForAccount,
        promptForMetaMask,
        selectedAccount,
    } from "../stores/wallet.js";
    import {
        cartArr,
        cartPrice,
        removeFromCart,
        clearCart,
    } from "../stores/cart";
    import { attemptMint } from "../stores/contract";

    let showMobileMenu = false;
    let showCart = false;

    let isWaitingForTx = false;

    async function promptForMintToken() {
        isWaitingForTx = true;
        let tx = await attemptMint($cartArr);
        isWaitingForTx = false;
        console.log(tx);
        if (tx === false) {
            //
        } else {
            clearCart();
            showCart = false;
            push("/inventory");
        }
    }

    let searchValue;

    function handleSearchInput(e) {
        let value = parseInt(e.target.value);
        if (value > 12499) {
            searchValue = 12499;
        } else if (value < 0) {
            searchValue = 0;
        } else {
            searchValue = value;
        }
    }
</script>

<div
    class="relative flex items-center justify-between w-full sm:w-11/12 Navbar"
>
    <a
        href="#/"
        on:click={() => {
            showMobileMenu = false;
            showCart = false;
        }}
        class="pl-1 text-2xl sm:pl-0 sm:text-4xl flamingShadow dark:text-white"
        >FreshAFPunks</a
    >
    <form
        class="flex justify-end flex-auto"
        on:submit={(e) => {
            push(`/shop/${searchValue}`);
            e.target.reset();
        }}
    >
        <input
            class="px-2 py-1 mr-7"
            placeholder="Search"
            type="number"
            min={0}
            step={1}
            max={12499}
            on:change={(e) => handleSearchInput(e)}
        />
    </form>
    <div class="items-center hidden md:flex">
        <div class="flex flex-col mr-6 lg:mr-10">
            <a
                href="#/shop"
                on:click={() => {
                    showMobileMenu = false;
                    showCart = false;
                }}
                class="mt-1 text-base dark:text-white">Shop</a
            >
            <div
                class={`relative z-10 transition-all ${
                    $location === "/shop" ? "max-w-full" : "max-w-0"
                }`}
            >
                <div class="bg-FreshAF-red psuedoUnderline" />
            </div>
        </div>
        <div class="flex flex-col mr-6 lg:mr-10">
            <a
                href="#/about"
                on:click={() => {
                    showMobileMenu = false;
                    showCart = false;
                }}
                class="mt-1 text-base dark:text-white">About</a
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
            <a
                href="#/inventory"
                on:click={() => {
                    showMobileMenu = false;
                    showCart = false;
                }}
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
        {#if $cartArr && $cartArr.length > 0}
            <div
                on:click={() => (showCart = !showCart)}
                class={`ml-4 shadow-lg flex items-center aStackCard-hover relative px-2 py-2 text-base text-white bg-FreshAF-red aStackCard`}
            >
                <svg class="h-6" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                    />
                </svg>
                <p class="ml-1 text-base font-semibold">{$cartArr.length}</p>
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
    {#if showCart && $cartArr.length > 0}
        <div
            class="absolute right-0 flex flex-col items-center justify-start top-full cartContainer dark:text-white"
        >
            <div
                class="relative flex flex-col items-center justify-start w-full shadow-lg bg-FreshAF-red aStackCard"
            >
                {#each $cartArr as cartItem}
                    <a
                        href={`/shop/${cartItem.tokenID}`}
                        use:link
                        on:click={() => (showCart = false)}
                        class="flex items-center justify-between w-full px-2 py-1 text-sm"
                    >
                        <img
                            src={cartItem.image}
                            class="h-12"
                            alt={cartItem.tokenID}
                        />
                        <p>#{cartItem.tokenID}</p>
                        <p>{cartItem.price} ETH</p>
                        <p on:click={() => removeFromCart(cartItem)}>X</p>
                    </a>
                {/each}
            </div>
            {#if isWaitingForTx}
                <div
                    on:click={promptForMintToken}
                    class="relative flex items-center justify-center w-full py-1 mt-3 shadow-lg bg-FreshAF-red aStackCard"
                >
                    <p class="loader" />
                </div>
            {:else}
                <div
                    on:click={promptForMintToken}
                    class="relative flex items-center justify-center w-full py-1 mt-3 shadow-lg bg-FreshAF-red aStackCard aStackCard-hover"
                >
                    <p>Checkout {$cartPrice.toFixed(4)} ETH</p>
                </div>
            {/if}
        </div>
    {/if}
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
    .cartContainer {
        width: 250px;
    }
    .loader {
        border: 4px solid #f0f0f025; /* Light grey */
        border-top: 4px solid #dbdbdb; /* Blue */
        border-radius: 50%;
        width: 25px;
        height: 25px;
        animation: spin 1s linear infinite;
    }
</style>
