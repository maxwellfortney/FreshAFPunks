import Home from "./pages/Home/Home.svelte";
import About from "./pages/About/About.svelte";
import Shop from "./pages/Shop/Shop.svelte";
import SingleFreshAFPunk from "./pages/SingleFreshAFPunk/SingleFreshAFPunk.svelte";
import Inventory from "./pages/Inventory/Inventory.svelte";
import NotFound from "./pages/NotFound/NotFound.svelte";

const routes = {
    "/": Home,
    "/shop": Shop,
    "/shop/:tokenID": SingleFreshAFPunk,
    "/about": About,
    "/inventory": Inventory,

    "*": NotFound,
};

export { routes };
