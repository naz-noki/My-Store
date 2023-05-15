<template>
    <form class="headerSearch" @submit="setProducts">
        <button class="headerSearch__btn">
            <img src="../assets/img/headerSearch__img.png" alt="" class="headerSearch__img">
        </button>
        <input 
            v-model="productTitle"
            placeholder="Search for anything..."
            type="text" 
            class="headerSearch__inp">
    </form>
</template>

<script lang="ts">
import { ref, onMounted, computed, } from 'vue';
import { useStore } from 'vuex';

import setProduct from '../mixins/setProduct';

export default{
    setup(){

        const store = useStore();

        const link:any = computed(():string=>store.getters.getLink);
        let Products: any = ref([]);
        let productTitle: any = ref('');

        const setProducts = () => {
            if(productTitle.value != ''){
                store.dispatch('actProductsList', setProduct(Products.value, productTitle.value));
            }
        }

        const getProducts = async () => {
            const answer = await fetch(`${link.value}`);
            const data:string[] = await answer.json();
            Products.value = data;
        }

        onMounted(getProducts)

        return { productTitle, setProducts, Products, }
    }
}
</script>