<template>
    <button 
    @click="showMoreProducts"
    v-if="seeMore" 
    class="SeeMore__btn">
        See more
    </button>
    <button 
    @click="showMoreProducts"
    v-else 
    class="ShowLess__btn">
        Show less
    </button>
</template>

<script>
import { ref, } from 'vue';

export default{
    emits:[ 
        'moreProducts', 
    ],
    setup(_, { emit }){
        
        const seeMore = ref(true);

        const showMoreProducts = () => {
            seeMore.value ? seeMore.value = false : seeMore.value = true;
            emit('moreProducts', seeMore.value);
        }

        return { seeMore, showMoreProducts }
    }
}
</script>