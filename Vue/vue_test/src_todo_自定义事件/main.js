import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false;
console.log(Vue.prototype);

const vm = new Vue({
    el: '#app',
    render: h => h(App),
    // mounted() {
    //     console.log(this)
    // },
})