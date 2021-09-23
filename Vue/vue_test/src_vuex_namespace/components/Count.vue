<template>
  <div>
    <h4>求和为{{sum}}</h4>
    <h4>乘10求和为{{bigSum}}</h4>
    <h4>二次求和为{{sum}}</h4>
    <select name="" id="" v-model.number="n">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
    </select>
    <button @click="add(n)">+</button>
    <button @click="substract(n)">-</button>
    <button @click="addOdd(n)">奇数时加</button>
    <button @click="addTimeout(n)">延时加</button>
    <h1 style="color:red">Count组件中的人数：{{persons.length}}</h1>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
export default {
    name: 'Count',
    data() {
        return {
            n: 1,
        }
    },
    methods: {
        ...mapMutations('sumAbout', {add: 'JIA', substract: 'JIAN'}),
        // add(){
        //     // this.$store.dispatch('jia', this.n);
        //     this.$store.commit('JIA', this.n);
        //     // this.$store.state.sum += this.n;
        // },
        // substract(){
            // this.$store.dispatch('jian', this.n);
            // this.$store.commit('JIAN', this.n); 
        // },
        ...mapActions('sumAbout', {addOdd: 'jiaOdd', addTimeout: 'jiaWait'}),
        // addOdd(){
            // if (this.sum % 2) this.sum += this.n
            // if (this.$store.state.sum % 2) this.$store.dispatch('jia', this.n);
            // this.$store.dispatch('jiaOdd', this.n);
        // },
        // addTimeout(){
            // this.$store.dispatch('jiaWait', this.n);
        // },
    },
    computed: {
        // ...mapState({he: 'sum'}),
        // ...mapState(['sumAbout', 'personAbout']),
        ...mapState('sumAbout', ['sum']),
        ...mapState('personAbout', ['persons']),
        ...mapGetters('sumAbout', ['bigSum'])
    },
    mounted() {
        console.log(this.$store);
    },
}
</script>
<style lang="css">
    button {
        margin: 0 5px;
    }
</style>