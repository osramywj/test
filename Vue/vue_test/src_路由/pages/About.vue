<template>
  <h3>我是About内容</h3>
</template>

<script>
export default {
    name: 'About',
    mounted() {
      // console.log('about',this);
    },
    beforeRouteEnter(to, from, next) {
      console.log('组件通过路由进入');
      next();
    },
    beforeRouteLeave(to, from, next) {
      console.log('组件通过路由离开');
      next();
    }
}
</script>

<style>

</style>