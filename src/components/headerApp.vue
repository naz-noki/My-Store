<template>
    <header class="header">
        <router-link @click="store.dispatch('actProductsList', [])" to="./" class="header__logo">
            <img src="../assets/img/header__logo_img.png" alt="" class="header__logo_img">
        </router-link>
        <Search />
        <Cart />
    </header>
</template>

<script lang="ts">
import Search from '../UI/headerSearch.vue';
import Cart from '../UI/headerCart.vue';

import { useStore } from 'vuex';

export default{
    components:{
    Search,
    Cart,
},
    setup(){
        const store = useStore();
        return { store, }
    }
}
</script>