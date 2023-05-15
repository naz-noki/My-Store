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
import { ref, Ref, onMounted, computed, ComputedRef, } from 'vue';
import { useStore } from 'vuex';

import setProduct from '../mixins/setProduct';

import Iproduct from '@/mixins/Iproduct';

export default{
    setup(){

        const store = useStore();

        const link:ComputedRef<string> = computed(()=>store.getters.getLink);

        let Products:Ref<Iproduct[]> = ref([]);
        let productTitle:Ref<string> = ref('');

        const setProducts = ():void => {
            if(productTitle.value != ''){
                store.dispatch('actProductsList', setProduct(Products.value, productTitle.value));
            }
        }

        const getProducts = async ():Promise<void> => {
            const answer:any = await fetch(`${link.value}`);
            const data:Iproduct[] = await answer.json();
            Products.value = data;
        }

        onMounted(getProducts)

        return { productTitle, setProducts, Products, }
    }
}
</script>