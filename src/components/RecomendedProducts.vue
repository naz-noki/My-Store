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

import { computed, ref, onMounted, watch, } from 'vue';
import { useStore } from 'vuex';

export default{
    components:{
        seeMore,
    },
    setup() {
        
        const store = useStore();

        const Link:any  = computed(():string=>store.getters.getLink);
        const Categori:any  = computed(():string=>store.getters.getCategori);
        const ProductsList:any = computed(():string[]=>store.getters.getProductsList);

        const products:any = ref([]);
        const seeMore:any = ref(true);

        const getProductsFromCategory = async () => {
            const answer:any = await fetch(`${Link.value}category/${Categori.value}`);
            const data:string[] = await answer.json();
            products.value = data;
            if(ProductsList.value.length > 1){
                products.value.unshift(...ProductsList.value.slice(1, ProductsList.value.length));
            }
        }

        const setProduct = (idx:number) => {
            store.dispatch('actProductsList', [products.value[idx]]);
        }

        onMounted(getProductsFromCategory);
        watch(Categori, getProductsFromCategory);
        watch(ProductsList, getProductsFromCategory);

        const getSeeMore = (newSeeMore:boolean) => seeMore.value = newSeeMore;

        return {showMoreProducts, setProduct, getSeeMore,  products, seeMore, }
    },
}
</script>