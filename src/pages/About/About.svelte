<script>
    import { totalSupply } from "../../stores/contract";
</script>

<div class="flex flex-col items-center justify-start flex-auto w-11/12 mt-8">
    <h1 class="self-start mb-3 text-xl dark:text-white">
        About FreshAFPunks
        <div class="bg-FreshAF-red psuedoUnderline" />
    </h1>
    <h1 class="text-base text-center dark:text-white">
        FreshAFpunks is a class above the rest!
    </h1>
    <h1 class="text-base text-center dark:text-white">
        Mad respect for the founders of this space.
    </h1>
    <h1 class="text-base text-center dark:text-white">
        Minted once! Forever a part of the legacy, Become a collector now!!
    </h1>

    <p class="w-10/12 my-6 text-base text-center dark:text-white">
        FreshAFPunks is a fresh twist to the original pioneers of the Punkverse!
        Every FreshAFPunk has been programatically generated to be a 1/1 combo
        not one is the same.
    </p>
    <p class="text-xs text-center dark:text-white">
        (Get yours while you can!!)
    </p>

    <p class="w-10/12 my-6 text-base text-center dark:text-white">
        Breathing new life into the Punkverse now you can be an owner of your
        very own special punk and claim Punkrights to all your friends and
        family
    </p>
    <p class="text-xs text-center dark:text-white">
        How many will you collect… ^_^
    </p>

    <h2 class="self-start mt-6 text-lg dark:text-white">
        What are FreshAFPunks? <div class="bg-FreshAF-red psuedoUnderline" />
    </h2>
    <p class="w-10/12 mt-4 mb-6 text-base text-center dark:text-white">
        FreshAFPunks are programatically generated NFT’s on the Ethereum
        blockchain, There is a unique range of punks to choose from some rarer
        then others!! You have non animated and animated punks and then a mix of
        both together can you collect them all :P?
    </p>
    <h2 class="self-start text-lg dark:text-white">
        How many FreshAFPunks are there?
        <div class="bg-FreshAF-red psuedoUnderline" />
    </h2>
    <p class="w-10/12 mt-4 mb-6 text-base text-center dark:text-white">
        12,500 have been made with the FreshAF twist
    </p>
    <h2 class="self-start text-lg dark:text-white">
        How much are FreshAFPunks?
        <div class="bg-FreshAF-red psuedoUnderline" />
    </h2>
    <h3 class="mt-4 text-lg text-center dark:text-white">
        I have taken a FreshAF approach to the BONDING CURVE
    </h3>
    <p class="w-10/12 mt-2 mb-4 text-base text-center dark:text-white">
        The purchase price increases with a bonding curve to create Hype and
        Urgency so that it rewards early supporters so that more people will buy
        now to build a community and encourage collecting and trading of these
        FreshAFPunks below is the roadmap of the Bonding curve get in early!!
    </p>
    <div class="flex flex-col my-2 text-base text-center dark:text-white">
        <p class={`${parseInt($totalSupply) >= 299 ? "line-through" : ""}`}>
            0 - 299 => 0.01 ETH
        </p>
        <p
            class={`${
                parseInt($totalSupply) >= 300 && parseInt($totalSupply) > 800
                    ? "line-through"
                    : ""
            }`}
        >
            300 - 799 => 0.02 ETH
        </p>
        <p
            class={`${
                parseInt($totalSupply) >= 800 && parseInt($totalSupply) > 1499
                    ? "line-through"
                    : ""
            }`}
        >
            800 - 1499 => 0.03 ETH
        </p>
        <p
            class={`${
                parseInt($totalSupply) >= 1499 && parseInt($totalSupply) > 2299
                    ? "line-through"
                    : ""
            }`}
        >
            1500 - 2299 => 0.04 ETH
        </p>
        <p
            class={`${
                parseInt($totalSupply) >= 2299 && parseInt($totalSupply) > 2999
                    ? "line-through"
                    : ""
            }`}
        >
            2300 - 2999 => 0.05 ETH
        </p>
        <p
            class={`${
                parseInt($totalSupply) >= 2999 && parseInt($totalSupply) > 3699
                    ? "line-through"
                    : ""
            }`}
        >
            3000 - 3699 => 0.10 ETH
        </p>
        <p
            class={`${
                parseInt($totalSupply) >= 3699 && parseInt($totalSupply) > 4399
                    ? "line-through"
                    : ""
            }`}
        >
            3700 - 4399 => 0.11 ETH
        </p>
        <p
            class={`${
                parseInt($totalSupply) >= 4399 && parseInt($totalSupply) > 5099
                    ? "line-through"
                    : ""
            }`}
        >
            4400 - 5099 => 0.12 ETH
        </p>
        <p
            class={`${
                parseInt($totalSupply) >= 5099 && parseInt($totalSupply) > 5799
                    ? "line-through"
                    : ""
            }`}
        >
            5100 - 5799 => 0.13 ETH
        </p>
        <p
            class={`${
                parseInt($totalSupply) >= 5799 && parseInt($totalSupply) > 6499
                    ? "line-through"
                    : ""
            }`}
        >
            5800 - 6499 => 0.14 ETH
        </p>
        <p
            class={`${
                parseInt($totalSupply) >= 6499 && parseInt($totalSupply) > 7199
                    ? "line-through"
                    : ""
            }`}
        >
            6500 - 7199 => 0.28 ETH
        </p>
        <p
            class={`${
                parseInt($totalSupply) >= 7199 && parseInt($totalSupply) > 7899
                    ? "line-through"
                    : ""
            }`}
        >
            7200 - 7899 => 0.29 ETH
        </p>
        <p
            class={`${
                parseInt($totalSupply) >= 7899 && parseInt($totalSupply) > 8599
                    ? "line-through"
                    : ""
            }`}
        >
            7900 - 8599 => 0.30 ETH
        </p>
        <p
            class={`${
                parseInt($totalSupply) >= 8599 && parseInt($totalSupply) > 9299
                    ? "line-through"
                    : ""
            }`}
        >
            8600 - 9299 => 0.31 ETH
        </p>
        <p
            class={`${
                parseInt($totalSupply) >= 9299 && parseInt($totalSupply) > 9999
                    ? "line-through"
                    : ""
            }`}
        >
            9300 - 9999 => 0.32 ETH
        </p>
        <p
            class={`${
                parseInt($totalSupply) >= 9999 && parseInt($totalSupply) > 10699
                    ? "line-through"
                    : ""
            }`}
        >
            10000 - 10699 => 0.64 ETH
        </p>
        <p
            class={`${
                parseInt($totalSupply) >= 10699 &&
                parseInt($totalSupply) > 11399
                    ? "line-through"
                    : ""
            }`}
        >
            10700 - 11399 => 0.65 ETH
        </p>
        <p
            class={`${
                parseInt($totalSupply) >= 11399 &&
                parseInt($totalSupply) > 12099
                    ? "line-through"
                    : ""
            }`}
        >
            11400 - 12099 => 0.66 ETH
        </p>
        <p
            class={`${
                parseInt($totalSupply) >= 12099 &&
                parseInt($totalSupply) >= 12500
                    ? "line-through"
                    : ""
            }`}
        >
            12100 - 12500 => 0.83 ETH
        </p>
    </div>

    <h2 class="self-start mt-4 text-lg dark:text-white">
        Im Buying a NFT for the first time, how can I get started?
        <div class="bg-FreshAF-red psuedoUnderline" />
    </h2>
    <p class="w-10/12 my-4 text-base text-center dark:text-white">
        Login using your preffered wallet, and load some ETH in that baaaby!
        Once you have your desired amount click on the “Mint” button, approve
        the transaction in your wallet, and this my friend is your first step to
        your FreshAF approach to the Punkverse.
    </p>

    <h2 class="self-start mt-4 text-lg dark:text-white">
        How can I trade my FreshAFPunks?
        <div class="bg-FreshAF-red psuedoUnderline hover:opacity-70" />
    </h2>
    <p class="w-10/12 my-4 text-base text-center dark:text-white">
        FreshAFPunks adhere to the ERC-721 standard so you can trade them on
        platforms like <a
            class="underline transition-opacity redUnderline hover:opacity-70"
            href="https://opensea.io/">OpenSea</a
        >. (Recommended)!!
    </p>

    <h2 class="self-start mt-4 text-lg dark:text-white">
        What can I do with my FreshAFPunks?
        <div class="bg-FreshAF-red psuedoUnderline" />
    </h2>
    <p class="w-10/12 my-4 text-base text-center dark:text-white">
        You own your FreshAFPunks digitally and are free to do anything with
        them as you see fit, maybe go on a virtual date.. or get as much
        bragging rights as possible and become a FreshAF Whale and be the envy
        of everyone else.. Options.. Options… hmm
    </p>

    <h2 class="self-start mt-4 text-lg dark:text-white">
        Feedback and purchase issues
        <div class="bg-FreshAF-red psuedoUnderline" />
    </h2>
    <p class="w-10/12 my-4 text-base text-center dark:text-white">
        The best way to get in contact with us is to send a DM on Twitter with
        your Etherscan transaction and we will be sure to get back to thy fellow
        Punkster and resolve the issue.
    </p>

    <p class="w-10/12 my-4 text-base text-center dark:text-white">
        Spread the word there’s new Punks on the block and we are here to stay!!
        Cant wait to see all you FreshAFPunk collectors on the flipside…
    </p>

    <h2 class="self-start mt-4 text-lg dark:text-white">
        How do I change my login?
        <div class="bg-FreshAF-red psuedoUnderline" />
    </h2>
    <p class="w-10/12 my-4 text-base text-center dark:text-white">
        To change your login from MetaMask to Fortmatic, go to <a
            class="underline transition-opacity redUnderline hover:opacity-70"
            href="/#/inventory">your inventory</a
        > and click "clear cached login" in the bottom right corner.
    </p>
    <p class="w-10/12 my-4 text-base text-center dark:text-white">
        To change your account within MetaMask disconnect your current account
        from the website, and login with your new account.
    </p>
</div>

<style>
    .redUnderline {
        text-decoration-color: #fc0000;
    }
</style>
