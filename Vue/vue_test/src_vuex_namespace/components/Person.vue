<template>
  <div>
      <h1>人员列表</h1>
      <input type="text" placeholder="请输入姓名" v-model="name">
      <button @click="add">添加</button>
    <hr>
      <input type="text" placeholder="请输入姓王的" v-model="wang">
      <button @click="addWang">添加姓王的</button>
    <ul>
        <li v-for="p in persons" :key="p.id">
            {{p.name}}
        </li>
    </ul>
    <h3 style="color:red">Person中的sum: {{sum}}</h3>
    <h3 style="color:red">Person中的第一个: {{firstPerson}}</h3>
    <button @click="addServerPerson">添加一个随机的人</button>
  </div>
</template>

<script>
import { nanoid } from 'nanoid';
export default {
    name: 'Person',
    data() {
        return {
            name: '',
            wang: '',
        }
    },
    methods: {
        add() {
            this.$store.commit('personAbout/ADD', {id: nanoid(), name: this.name});
            this.name = ''
        },
        addWang() {
            this.$store.dispatch('personAbout/addPersonWang', {id: nanoid(), name: this.wang});
            this.name = '';
        },
        addServerPerson() {
            this.$store.dispatch('personAbout/addServerPerson');
        }
    },
    computed: {
        persons() {
            return this.$store.state.personAbout.persons;
        },
        sum() {
            return this.$store.state.sumAbout.sum;
        },
        firstPerson() {
            return this.$store.getters['personAbout/firstPerson'];
        }
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

