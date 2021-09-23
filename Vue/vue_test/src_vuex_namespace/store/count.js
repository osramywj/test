export default {
    namespaced: true,
    actions: {
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
    },
    mutations: {
        JIA(state, value){
            // console.log(`mutation 被调用了`, state, value);
            state.sum += value;
        },
        JIAN(state, value){
            // console.log(`mutation 被调用了`, state, value);
            state.sum -= value;
        },
        ADD(state, value) {
            state.persons.push(value);
        }
    },
    state: {
        sum: 0,
    },
    getters: {
        bigSum(state){
            return state.sum * 10;
        }
    },
}