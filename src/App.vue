<template>
  <div class="wrapper">
    <headerApp />
    <router-view />
    <footerApp />
    <scrollButton />
  </div>
</template>

<script>
import headerApp from './components/headerApp.vue';
import footerApp from './UI/footerApp.vue';
import scrollButton from './UI/scrollButton.vue';

export default{
  components:{
    headerApp,
    footerApp,
    scrollButton,
  },
}
</script>

<style lang="scss"></style>