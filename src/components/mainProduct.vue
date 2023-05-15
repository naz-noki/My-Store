<template>
    <div class="mainProduct">
        <div class="mainProduct__block_img">
          <img :src="product.image" alt="" class="mainProduct__img">
        </div>  
        <div class="mainProduct__block_info">
            <div class="mainProduct__info_title">{{ product.title }}</div>
            <div class="mainProduct__info_price">{{ product.price }}$</div>
            <div class="mainProduct__info_category">{{ product.category }}</div>
            <div class="mainProduct__info_rating">
                <div class="mainProduct__info_rait">
                    <img src="../assets/img/mainProduct__info_rait.png" alt="" class="mainProduct__info_rait_img">
                    {{ product.rate }}
                </div>
                <div class="mainProduct__info_rait">
                    <img src="../assets/img/mainProduct__info_count.png" alt="" class="mainProduct__info_rait_img">
                    {{ product.count }}
                </div>
            </div>
            <div class="mainProduct__info_description">{{ product.description }}</div>
            <button 
            class="addToCart"
            @click="toBasket"
            >
                Add to cart
            </button>            
        </div>
    </div>
</template>

<script lang="ts">
import { ref, Ref, computed, ComputedRef, onMounted, watch, } from 'vue';
import { useStore } from 'vuex';

import Iproduct from '@/mixins/Iproduct';

export default{
    setup() {
        
        const store = useStore();

        const Link:ComputedRef<string>  = computed(()=>store.getters.getLink);
        const Categori:ComputedRef<string>  = computed(()=>store.getters.getCategori);
        const ProductsList:ComputedRef<Iproduct[]> = computed(()=>store.getters.getProductsList);
        const ProductsInCart:ComputedRef<Iproduct[]> = computed(()=>store.getters.getProductsInCart);
        
        const product:Ref<Iproduct> = ref({}) as Ref<Iproduct>;

        const getProductsFromCategory = async ():Promise<void> => {
            const answer:any = await fetch(`${Link.value}category/${Categori.value}`);
            const data:Iproduct[] = await answer.json();
            product.value = data[0];
            product.value['rate'] = product.value.rating.rate;
            product.value['count'] = product.value.rating.count;
        }

        const getProducts = ():void => {
            if(ProductsList.value.length > 0) {
                product.value = ProductsList.value[0];
                product.value['rate'] = ProductsList.value[0].rating.rate;
                product.value['count'] = ProductsList.value[0].rating.count;
            }
            else getProductsFromCategory();
        }

        const AddToCart = ():void => {
            product.value.totalPrice = product.value.price;
            product.value.quantity = 1;
            ProductsInCart.value.push(product.value);
        }

        const toBasket = ():void => {
            let check:boolean = false;
            for(let i = 0; i<ProductsInCart.value.length; i++){
                let cur:Iproduct = ProductsInCart.value[i];
                if(cur.id === product.value.id){
                    product.value.totalPrice += product.value.price;
                    product.value.quantity++;
                    check = true;
                    break;
                }
            }
            if(!check) AddToCart(); 
            store.dispatch('actAddToCart', ProductsInCart.value);
        }
        
        watch(Categori, getProducts);
        watch(ProductsList, getProducts);

        onMounted(getProducts,);

        return{ product, toBasket, }
    },
}
</script>