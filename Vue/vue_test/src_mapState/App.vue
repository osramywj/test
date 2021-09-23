<template>
    <Count/>
</template>

<script>
import Count from './components/Count.vue';
export default {
    name: 'App',
    components: { Count },
    mounted() {
      // console.log({App: this})
    },
};
</script>

<style lang="css">
.container , .footer{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
img{
  width: 100%;
}
video{
  width: 100%;
}
</style>
