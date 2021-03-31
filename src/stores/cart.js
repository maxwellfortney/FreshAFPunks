import { writable, get } from "svelte/store";

export let cartArr = writable([]);
export let cartPrice = writable(0);

export function addToCart(punkData) {
    console.log(punkData);
    let isInCartAlready = false;

    console.log(get(cartArr));
    let _cartArr = get(cartArr);
    for (let i = 0; i < _cartArr.length; i++) {
        if (_cartArr[i].tokenID === punkData.tokenID) {
            isInCartAlready = true;
        }
    }

    if (isInCartAlready) return;
    cartArr.update((cartArr) => [...cartArr, punkData]);
    cartPrice.update((cartPrice) => cartPrice + punkData.price);
}

export function isInCart(tokenID) {
    let _cartArr = get(cartArr);
    let isInCartAlready = false;

    for (let i = 0; i < _cartArr.length; i++) {
        if (_cartArr[i].tokenID === tokenID) {
            isInCartAlready = true;
        }
    }

    return isInCartAlready;
}

export function removeFromCart(punkData) {
    let _cartArr = get(cartArr);

    let newCartArr = [];

    for (let i = 0; i < _cartArr.length; i++) {
        if (_cartArr[i].tokenID !== punkData.tokenID) {
            newCartArr.push(_cartArr[i]);
        }
    }

    cartArr.set(newCartArr);
    cartPrice.update((cartPrice) => cartPrice - punkData.price);
}

export function clearCart() {
    cartArr.set([]);
    cartPrice.set(0);
}
