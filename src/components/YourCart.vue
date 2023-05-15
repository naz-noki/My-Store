<template>
    <div class="YourCart">
        <div class="YourCart__title" v-if="ProductsInCart.length < 1">Your basket is empty</div>
        <div class="YourCart__title" v-else>Your cart</div>
        <ul class="YourCart__main">
            <li 
            class="YourCart__main_el"
            v-for="(Product, idx) of ProductsInCart"
            :key="idx"
            >
                <div class="YourCart__main_el_imgBlock">
                    <img :src="Product.image" alt="" class="YourCart__main_el_img">
                </div>
                <div class="YourCart__main_el_titleBlock">
                    <div class="YourCart__main_el_title">{{ Product.title }}</div>
                    <div class="YourCart__main_el_category">{{ Product.category }}</div>
                </div>
                <div class="YourCart__main_el_price">{{ Product.price }}$</div>
                <div class="YourCart__main_el_count">
                    <button 
                    @click="minusProduct(idx)"
                    class="YourCart__main_el_count_btn"
                    >
                        <img src="../assets/img/minus.png" alt="" class="YourCart__main_el_count_btn_img">
                    </button>
                    <div class="YourCart__main_el_counter">{{ Product.quantity }}</div>
                    <button 
                    @click="plusProduct(idx)"
                    class="YourCart__main_el_count_btn"
                    >
                        <img src="../assets/img/plus.png" alt="" class="YourCart__main_el_count_btn_img">
                    </button>
                </div>
                <div class="YourCart__main_el_totalPrice">{{ Product.totalPrice }}$</div>
                <button 
                @click="delProduct(idx)"
                class="YourCart__main_el_del"
                >
                    <img src="../assets/img/close.png" alt="" class="YourCart__main_el_close">
                </button>
            </li>
        </ul>
        <div class="YourCart__footer" v-if="ProductsInCart.length > 0">
            <div class="YourCart__footer_block">
                TOTAL PRICE:
                <span>
                    {{ itogPrice }}$
                </span>
            </div>
            <proceedToCheckout />
        </div>
    </div>
</template>

<script lang="ts">
import proceedToCheckout from '@/UI/proceedToCheckout.vue';

import { useStore } from 'vuex';
import { computed, ComputedRef, ref, Ref, onMounted, watch, } from 'vue';

import Iproduct from '@/mixins/Iproduct';

export default{
    components:{
        proceedToCheckout,
    },
    setup(){

        const store = useStore();

        let itogPrice:Ref<number> = ref(0);

        const ProductsInCart:ComputedRef<Iproduct[]> = computed(()=>store.getters.getProductsInCart);
    
        const getItogPrice = ():void => {
            itogPrice.value = 0;
            for(let i = 0; i<ProductsInCart.value.length; i++){
                let el = ProductsInCart.value[i];
                itogPrice.value += Math.floor(el.totalPrice);
            }
        }

        const plusProduct = (idx:number):void => {
            let product:Iproduct = ProductsInCart.value[idx];
            if(product.quantity < 100){
                product.quantity++;
                product.totalPrice += Math.floor(product.price);
            }
        }

        const minusProduct = (idx:number):void => {
            let product:Iproduct = ProductsInCart.value[idx];
            if(product.quantity > 1){
                product.quantity--;
                product.totalPrice -= Math.floor(product.price);
            }
        }

        const delProduct = (idx:number):void => {
            ProductsInCart.value.splice(idx, 1);
        }

        onMounted(getItogPrice);
        
        watch(ProductsInCart.value, getItogPrice);

        return { ProductsInCart, itogPrice, plusProduct, minusProduct, delProduct, }
    }
}
</script>