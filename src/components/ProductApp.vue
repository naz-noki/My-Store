<template>
    <div>
        <div class="productsList__li_imgBlock">
            <img :src="product.image" alt="" class="productsList__li_img">
        </div>
        <div class="productsList__li_title">{{product.title}}</div>
        <div class="productsList__li_category">{{product.category}}</div>
        <div class="productsList__li_price">{{product.price}}$</div>        
    </div>
</template>

<script lang="ts">
import Iproduct from '../mixins/Iproduct';

import { PropType } from 'vue';

export default{
    props:{
        product:{
            type: Object as PropType<Iproduct>,
            required: true      
        }
    },
}
</script>