<template>
    <button  
    @click="scroll"
    class="scrollButton" 
    :class="{scrollButton_active: active}"
    >
        <img src="../assets/img/icons8-вверх-48.png" alt="" class="scrollButton_img">
    </button>
</template>

<script>
import { ref } from 'vue';

export default{
    setup(){

        const active = ref(false);

        window.addEventListener('scroll', ()=>{
            let top = window.scrollY;
            top >= 200 ? active.value = true : active.value = false; 
        })

        const scroll = () => {
            window.scrollTo(0, 0);
        }

        return { active, scroll, }
    }
}
</script>

<style>
.scrollButton{
    width: max-content;
    height: max-content;
    cursor: pointer;
    position: fixed;
    right: -50px;
    bottom: -50px;
    border: none;
    padding: 10px;
    background: #191919;
    border-radius: 6px; 
    transition: 200ms;
}
.scrollButton_img{
    width: 36px;
    height: 36px;
} 
.scrollButton_active{
    right: 50px;
    bottom: 50px;
    transition: 150ms;
}
</style>