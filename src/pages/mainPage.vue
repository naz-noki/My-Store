<template>
    <div class="mainPage">
      <div class="mainPage__block">
        <categoriesList />
        <mainProduct />
      </div>
      <RecomendedProducts />
      <saleBanner />
      <lessThan />
    </div>
  </template>
  
<script>
import categoriesList from '../components/categoriesList.vue';
import mainProduct from '@/components/mainProduct.vue';
import RecomendedProducts from '@/components/RecomendedProducts.vue';
import saleBanner from '@/UI/saleBanner.vue';
import lessThan from '@/components/lessThan.vue';

export default{
  components:{
    categoriesList,
    mainProduct,
    RecomendedProducts,
    saleBanner,
    lessThan,
  },
}
</script>
  
<style lang="scss">
.mainPage{
  max-width: 1274px;
  min-height: max-content;
  margin: 0 auto;
  .mainPage__block{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>