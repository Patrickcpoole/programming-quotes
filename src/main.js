import Vue from 'vue';
import App from './App.vue';
import Author from './components/Author';
import HelloWorld from './components/HelloWorld';
import VueRouter from 'vue-router';

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [
	{ path: '/author', component: Author },
	{ path: '/', component: HelloWorld }
];

const router = new VueRouter({
	routes
});

new Vue({
	render: h => h(App),
	router
}).$mount('#app');
