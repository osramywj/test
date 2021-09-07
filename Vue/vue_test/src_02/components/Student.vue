<template>
    <div class="demo">
        <h1 class="a">{{name | mySlice}}</h1>
        <h1>{{age}}</h1>
        <button @click="getName">点击</button>
    </div>
</template>

<script>

export default {
    name: 'Student',
    data() {
        return {
            name: '杨文举',
            age: 30
        }
    },
    methods: {
        getName(){
            console.log('self name');
        }
    },

}
</script>
    
<style scoped lang="less">
    .demo{
        background-color: orange;
        .a {
            font-size: 10px;
        }
    }
</style>