<template>
  <div>
      <img src="./assets/logo.png" alt="logo">
      <School/>
  </div>
</template>

<script>
import School from './components/School.vue';
export default {
    name: 'App',
    components:{School}
}
</script>
