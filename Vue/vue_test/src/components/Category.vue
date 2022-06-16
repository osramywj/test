<template>
  <div class="category">
        <h3>{{title}}</h3>
        <slot :games="games" x="xxx">我是默认值</slot>
  </div>
</template>

<script>
export default {
    name: 'Category',
    
    props: ['title'],
    data() {
        return {
            games: ['红色警戒', '穿越火线', '劲舞团', '超级玛丽'],
        };
    },
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
