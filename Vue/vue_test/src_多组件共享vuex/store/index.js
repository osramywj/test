
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
    ADD(state, value) {
        state.persons.push(value);
    }
};

const state = {
    sum: 0,
    persons: [{
        id: '001', name: '张三'
    }]
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