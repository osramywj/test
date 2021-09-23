import Vue from 'vue'
import App from './App.vue'
import { Button, Row, Select} from 'element-ui';
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';


Vue.config.productionTip = false;
// Vue.component(Button.name, Button);
Vue.use(Button)
Vue.use(Row)
Vue.use(Select)
// Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h => h(App),
});