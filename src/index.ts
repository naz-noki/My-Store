import { createStore } from "vuex"

export const store = createStore({
    state: {
        activeCategori: 'electronics',
        link: 'https://fakestoreapi.com/products/',
        productsList: [],
        productsInCart: [], 
    },

    mutations:{
        mutCategori(state, newActiveCategori){
            state.activeCategori = newActiveCategori;
        },
        mutProductsList(state, newProductsList){
            state.productsList = newProductsList;
        },
        mutAddToCart(state, newProducts){
            state.productsInCart = newProducts;
        },
    },

    actions:{
        actCategori({ commit }, newActiveCategori){
            commit('mutCategori', newActiveCategori);
        },
        actProductsList({ commit }, newProductsList){
            commit('mutProductsList', newProductsList);
        },
        actAddToCart({ commit }, newProducts){
            commit('mutAddToCart', newProducts);
        },
    },

    getters:{
        getCategori(state){
            return state.activeCategori;
        },
        getLink(state){
            return state.link;
        },
        getProductsList(state){
            return state.productsList;
        },
        getProductsInCart(state){
            return state.productsInCart;
        },
    }
})