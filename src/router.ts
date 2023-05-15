import { createRouter, createWebHashHistory } from "vue-router";

import mainPage from './pages/mainPage.vue';
import YourCart from './components/YourCart.vue';

export default createRouter ({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: mainPage
        },
        {
            path: '/cart',
            component: YourCart
        },
    ]
})