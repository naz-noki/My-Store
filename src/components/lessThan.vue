<template>
    <div class="productsList">
        <div class="productsList__title">Less Than 100$</div>
        <ul class="productsList__ul">
            <li 
            @click="setProduct(idx)"
            v-for="(product, idx) of showMoreProducts(products, seeMore)"
            :key="idx"
            class="productsList__li"
            >
                <ProductApp :product="product"/>
            </li>
        </ul>
        <seeMore v-if="products.length > 5" @moreProducts="getSeeMore" />
    </div>
</template>

<script lang="ts">
import seeMore from "../UI/seeMore.vue";

import showMoreProducts from '../mixins/showMoreProducts';
import ProductApp from './ProductApp.vue';

import { computed, ComputedRef, ref, Ref, onMounted, } from 'vue';
import { useStore } from 'vuex';

import Iproduct from '../mixins/Iproduct';

export default{
    components:{
        seeMore,
        ProductApp,
    },
    setup() {
        
        const store = useStore();

        const Link:ComputedRef<string>  = computed(()=>store.getters.getLink);

        const products:Ref<Iproduct[]> = ref([]);
        const seeMore:Ref<boolean> = ref(true);  

        const getProductsFromCategory = async ():Promise<void> => {
            const answer:any = await fetch(`${Link.value}`);
            const data:Iproduct[] = await answer.json();
            products.value = data.reduce((acc:Iproduct[], el:Iproduct)=>{
                if(el.price <= 100) acc.push(el);
                return acc;
            },[]);
        }

        const setProduct = (idx:number):void => {
            store.dispatch('actProductsList', [products.value[idx]]);
        }

        onMounted(getProductsFromCategory);

        const getSeeMore = (newSeeMore:boolean):boolean => seeMore.value = newSeeMore;

        return {showMoreProducts, setProduct, getSeeMore,  products, seeMore, }
    },
}
</script>