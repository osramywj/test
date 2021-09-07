<template>
    <div class="demo">
        <h1>{{name}}</h1>
        <h1>{{years}}</h1>
    </div>
</template>

<script>
// import {mix1} from '../mixin';

export default {
    name: 'School',
    data() {
        return {
            name: '武汉理工',
            years: 20
        }
    },
    methods: {
        
    },
    // mixins: [mix1]
   
}
</script>

<style scoped>
    .demo{
        background-color: #bfa;
    }
</style>