
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const actions = {
    jia(context, value){
        // console.log(`action jia 被调用了`, context,value);
        context.commit('JIA', value);
    },
    jian(context, value){
        // console.log(`action jia 被调用了`, context,value);
        context.commit('JIAN', value);
    },
    jiaOdd(context, value) {
        if (context.state.sum % 2) {
            context.commit('JIA', value);
        }
        // console.log(context);
    },
    jiaWait(context, value) {
        setTimeout(() => {
            context.commit('JIA', value);
        }, 500)
    },
};

const mutations = {
    JIA(state, value){
        console.log(`mutation 被调用了`, state, value);
        state.sum += value;
    },
    JIAN(state, value){
        // console.log(`mutation 被调用了`, state, value);
        state.sum -= value;
    },
};

const state = {
    sum: 0,
};

const getters = {
    bigSum(state){
        return state.sum * 10;
    }
};

export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters,
});