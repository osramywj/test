import axios from 'axios';
import { nanoid } from 'nanoid';
export default {
    namespaced: true,
    actions: {
        addPersonWang(context, value) {
            console.log(value.name.indexOf('王'));
            if (value.name.indexOf('王') === 0) {
                context.commit('ADD', value);
            }
        },
        addServerPerson(context) {
            axios.get('https://api.uixsj.cn/hitokoto/get?type=social').then(resp => {
                // console.log(resp.data);
                context.commit('ADD', {id: nanoid(), name: resp.data});
            }, 
            err => {
                alert(err.message);
            })
        }
    },
    mutations: {
        ADD(state, value) {
            state.persons.push(value);
        }
    },
    state: {
        persons: [{
            id: '001', name: '张三'
        }]
    },
    getters: {
        firstPerson(state) {
            return state.persons[0].name;
        }
    }
}