<script>
    import { onMount } from "svelte";
    import { connectContract, getUserInventory } from "../../stores/contract";
    import { selectedAccount } from "../../stores/wallet";

    // onMount(async () => {
    //     await connectContract();
    //     await getUserInventory();
    // });

    async function getUserInfo() {
        await connectContract();
        await getUserInventory();
    }
</script>

<div class="flex flex-col items-center justify-start flex-auto w-full">
    {#if $selectedAccount}
        {#await getUserInfo()}
            <div class="loader" />
        {:then}
            <div class="">LOADED</div>
        {/await}
    {:else}
        <div class="loader" />
    {/if}
    <div class="flex flex-col w-10/12">
        <div class="flex flex-col self-start">
            <p class="text-xl sm:text-2xl md:text-3xl dark:text-white">
                My Statistics
            </p>
            <div class={`relative z-10 transition-all`}>
                <div class="bg-FreshAF-red psuedoUnderline" />
            </div>
        </div>
        <div class="flex flex-col self-start">
            <p class="text-xl sm:text-2xl md:text-3xl dark:text-white">
                My FreshAFPunks
            </p>
            <div class={`relative z-10 transition-all`}>
                <div class="bg-FreshAF-red psuedoUnderline" />
            </div>
        </div>
    </div>
</div>

<style>
</style>
