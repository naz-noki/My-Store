<template>
    <div class="productsList">
        <div class="productsList__title">Recomended products</div>
        <ul class="productsList__ul">
            <li 
            @click="setProduct(idx)"
            v-for="(product, idx) of showMoreProducts(products, seeMore)"
            :key="idx"
            class="productsList__li"
            >
                <div class="productsList__li_imgBlock">
                    <img :src="product.image" alt="" class="productsList__li_img">
                </div>
                <div class="productsList__li_title">{{product.title}}</div>
                <div class="productsList__li_category">{{product.category}}</div>
                <div class="productsList__li_price">{{product.price}}$</div>
            </li>
        </ul>
        <seeMore v-if="products.length > 5" @moreProducts="getSeeMore" />
    </div>
</template>

<script lang="ts">
import seeMore from '@/UI/seeMore.vue';

import showMoreProducts from '@/mixins/showMoreProducts';

import { computed, ComputedRef, ref, Ref, onMounted, watch, } from 'vue';
import { useStore } from 'vuex';

import Iproduct from '@/mixins/Iproduct';

export default{
    components:{
        seeMore,
    },
    setup() {
        
        const store = useStore();

        const Link:ComputedRef<string>  = computed(()=>store.getters.getLink);
        const Categori:ComputedRef<string>  = computed(()=>store.getters.getCategori);
        const ProductsList:ComputedRef<Iproduct[]> = computed(()=>store.getters.getProductsList);

        const products:Ref<Iproduct[]> = ref([]);
        const seeMore:Ref<boolean> = ref(true);

        const getProductsFromCategory = async ():Promise<void> => {
            const answer:any = await fetch(`${Link.value}category/${Categori.value}`);
            const data:Iproduct[] = await answer.json();
            products.value = data;
            if(ProductsList.value.length > 1){
                products.value.unshift(...ProductsList.value.slice(1, ProductsList.value.length));
            }
        }

        const setProduct = (idx:number):void => {
            store.dispatch('actProductsList', [products.value[idx]]);
        }

        const getSeeMore = (newSeeMore:boolean):boolean => seeMore.value = newSeeMore;

        onMounted(getProductsFromCategory);

        watch(Categori, getProductsFromCategory);

        watch(ProductsList, getProductsFromCategory);

        return {showMoreProducts, setProduct, getSeeMore,  products, seeMore, }
    },
}
</script>