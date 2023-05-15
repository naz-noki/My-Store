<template>
   <div class="categoriesList">
    <div class="categoriesList__title">CATEGORIES</div>
    <ul class="categoriesList__listItems">
        <li 
            :class="{categoriesList__listItemActive: idx == activeCategori}"
            v-for="(Categori, idx) of Categories"
            :key="idx"
            @click="setCategori(idx)"
            class="categoriesList__listItem"
        >{{Categori}}</li>
    </ul>
    <div class="categoriesList__footer">
        <a href="./help" class="categoriesList__footer_link">Help</a>
        <a href="./TermsConditions" class="categoriesList__footer_link">Terms & Conditions</a>
    </div>
   </div>  
</template>

<script lang="ts">
import { ref, onMounted, computed, } from 'vue';
import { useStore } from 'vuex';

export default{
    setup(){

        const store = useStore();

        const link:any = computed(():string=>store.getters.getLink);
        let Categories: any = ref([]);
        let activeCategori:any = ref(0);

        const setCategori = (idx:number) => {
            activeCategori.value = idx;
            store.dispatch("actCategori", Categories.value[idx]);
            store.dispatch("actProductsList", []);
        }

        const getCategories = async () => {
            const answer = await fetch(`${link.value}/categories`);
            const data:string[] = await answer.json();
            Categories.value = data.length > 9 ? data.slice(0, 9) : data;
        }

        onMounted(getCategories,)

        return { Categories, setCategori, activeCategori, }
    }
}
</script>