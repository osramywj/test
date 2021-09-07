<template>
  <div>
      <!-- <img src="./assets/logo.png" alt="logo"> -->
      <School :sendSchool="sendSchool"/>
      <!-- <Student @sendStudent="getStudent" @talk="talk"/> -->
      <Student ref="student" />
      <h1>{{appName}}</h1>
  </div>
</template>

<script>
import School from './components/School.vue';
import Student from './components/Student.vue';
export default {
    name: 'App',
    components:{School, Student},
    data() {
      return {
        appName: ''
      }
    },
    methods: {
      sendSchool(name){
        console.log('App收到了' + name);
      },
      getStudent(name){
        console.log('App收到了student:' + name);
      },
      talk(){
        console.log('talking');
      },
      sendStudent(name){
        this.appName = name;
      }
    },
    mounted() {
      this.$refs.student.$on('sendStudent', this.sendStudent);
    },
}
</script>
