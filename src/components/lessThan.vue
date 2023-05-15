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

import { computed, ref, onMounted, } from 'vue';
import { useStore } from 'vuex';

export default{
    components:{
        seeMore,
    },
    setup() {
        
        const store = useStore();

        const Link:any  = computed(():string=>store.getters.getLink);

        const products:any = ref([]);
        const seeMore:any = ref(true);

        const getProductsFromCategory = async () => {
            const answer:any = await fetch(`${Link.value}`);
            const data:any[] = await answer.json();
            products.value = data.reduce((acc,el)=>{
                if(el.price <= 100) acc.push(el);
                return acc;
            },[]);
        }

        const setProduct = (idx:number) => {
            store.dispatch('actProductsList', [products.value[idx]]);
        }

        onMounted(getProductsFromCategory);

        const getSeeMore = (newSeeMore:boolean) => seeMore.value = newSeeMore;

        return {showMoreProducts, setProduct, getSeeMore,  products, seeMore, }
    },
}
</script>