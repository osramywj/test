
import Vue from 'vue';
import Vuex from 'vuex';
import sumOptions from './count';
import personOptions from './person';
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        sumAbout: sumOptions,
        personAbout: personOptions,
    }
});