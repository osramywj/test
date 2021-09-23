<template>
  <div class="category">
        <h3>{{title}}</h3>
        <slot name="center">我是默认值</slot>
        <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
    name: 'Category',
    
    props: ['title']
}
</script>
<style lang="css">
    .category{
        width: 200px;
        height: 300px;
        background-color: #bfa;
    }
    h3 {
        text-align: center;
    }
</style>
