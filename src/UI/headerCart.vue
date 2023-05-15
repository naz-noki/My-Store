<template>
    <router-link to="/cart" class="headerCart">
        <img src="../assets/img/headerCart__img.png" alt="" class="headerCart__img">
        <div class="headerCart__count">
            {{ count }}
        </div>
    </router-link>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { computed, ComputedRef, } from 'vue';

export default{
    setup() {
        
        const store = useStore();

        const count:ComputedRef<number> = computed(()=>store.getters.getProductsInCart.length);

        return { count, }
    }
}
</script>