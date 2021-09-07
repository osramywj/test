<template>
  <div class="category">
        <h3>{{title}}</h3>
        <slot>我是默认值</slot>

  </div>
</template>

<script>
export default {
    name: 'Category',
    
    props: ['list','title']
}
</script>
<style lang="css">
    .category{
        width: 200px;
        height: 200px;
        background-color: #bfa;
    }
    h3 {
        text-align: center;
    }
</style>
