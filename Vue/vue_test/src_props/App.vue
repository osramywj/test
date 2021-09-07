<template>
  <div>
      <!-- <h1 ref="hello">{{name}}</h1> -->
        <School ref="c" name="清华" :years="22"/>
        <Student/>
  </div>
</template>

<script>
import School from './components/School'
import Student from './components/Student'
export default {
    name: 'App',
    data() {
        return {
            name: '你好啊'
        }
    },
    methods: {
        getEle(){
            console.log(this.$refs.c);
        }
    },
    components: {School, Student}
}
</script>

<style>

</style>