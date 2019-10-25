import Vue from 'vue';
import App from './App.vue';
import Quote from './components/Quote';
import QuoteContainer from './components/QuoteContainer';
import VueRouter from 'vue-router';

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [
	{ path: '/quote/:id', name: 'quote', component: Quote },
	{ path: '/', name: 'quoteContainer', component: QuoteContainer }
];

const router = new VueRouter({
	routes
});

new Vue({
	render: h => h(App),
	router
}).$mount('#app');
