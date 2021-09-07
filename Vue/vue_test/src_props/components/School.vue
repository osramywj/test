<template>
    <div>
        <h1>{{name}}</h1>
        <h1>{{myYear}}</h1>
      <button @click="updateYear">修改years</button>
    </div>
</template>

<script>
export default {
    name: 'School',
    data() {
        return {
            myYear: this.years
        }
    },
    props: ['name','years'],
    // props: {
    //     name: String,
    //     years: Number,
    // }
    
    methods: {
        updateYear(){
            this.myYear = 100;
        }
    },
    props: {
        name: {
            type: String,
            required: true
        },
        years: {
            type: Number,
            default: 22
        }
    }
}
</script>

<style>

</style>