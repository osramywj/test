import Vue from 'vue'
import App from './App'
import plugin from './plugins'
Vue.config.productionTip = false;
// Vue.use(plugin);
new Vue({
    el: '#app',
    render: h => h(App),
})