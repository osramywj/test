<template>
  <div>
      <h1>人员列表</h1>
      <input type="text" placeholder="请输入姓名" v-model="name">
      <button @click="add">添加</button>
    <ul>
        <li v-for="p in persons" :key="p.id">
            {{p.name}}
        </li>
    </ul>
    <h1 style="color:red">Person中的sum: {{sum}}</h1>
  </div>
</template>

<script>
import { nanoid } from 'nanoid';
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
export default {
    name: 'Person',
    data() {
        return {
            name: ''
        }
    },
    methods: {
        // ...mapMutations(['add'])
        add() {
            this.$store.commit('ADD', {id: nanoid(), name: this.name});
            this.name = ''
        }
    },
    computed: {
        ...mapState(['persons', 'sum']),
    },
    mounted() {
        
    },
}
</script>
<style lang="css">
    button {
        margin: 0 5px;
    }
</style>

