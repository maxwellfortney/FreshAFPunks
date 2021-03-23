<script>
    import { onMount } from "svelte";
    import Tailwind from "./Tailwind.svelte";
    import Router from "svelte-spa-router";
    import { routes } from "./routes.js";
    import Navbar from "./components/Navbar.svelte";
    import Footer from "./components/Footer.svelte";

    import { initWallet, selectedAccount } from "./stores/wallet.js";

    import Web3Modal from "web3modal";
    import Fortmatic from "fortmatic";

    let statusMessage = "Connect to MetaMask";

    async function toggleLightDark() {
        if (document.documentElement) {
            document.documentElement.classList.toggle("dark");
        }
    }

    onMount(async () => {
        await initWallet();
    });
</script>

<Tailwind />

<div class="absolute light-darkSwitch top-1 right-1">
    <label class="switch">
        <input type="checkbox" on:click={toggleLightDark} />
        <span class="slider round dark:bg-white bg-FreshAF-gray" />
    </label>
</div>

<div
    class="flex flex-col items-center justify-start w-full min-h-screen transition-colors bg-white dark:bg-FreshAF-gray mainApp"
>
    <Navbar />
    <Router {routes} />
    <Footer />
</div>

<style>
    .switch {
        position: relative;
        display: inline-block;
        width: 35px;
        height: 20px;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        -webkit-transition: 0.4s;
        transition: 0.4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 1px;
        bottom: 1px;
        background-color: #fc0000;
        -webkit-transition: 0.4s;
        transition: 0.4s;
    }
    /* 
    input:checked + .slider {
        background-color: #2196f3;
    }

    input:focus + .slider {
        box-shadow: 0 0 1px #2196f3;
    } */

    input:checked + .slider:before {
        -webkit-transform: translateX(14px);
        -ms-transform: translateX(14px);
        transform: translateX(14px);
    }

    /* Rounded sliders */
    .slider.round {
        border-radius: 999px;
    }

    .slider.round:before {
        border-radius: 50%;
    }
</style>
