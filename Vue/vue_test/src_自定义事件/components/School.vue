<template>
  <div>
      <h1>{{name}}</h1>
      <h1>{{years}}</h1>
      <button @click="send">传递给父组件</button>
  </div>
</template>

<script>
export default {
    name: 'School',
    data(){
        return {
            name: '武汉理工',
            years: 20,
        };
    },
    props: ['sendSchool'],
    methods: {
        send(){
            this.sendSchool(this.name);
        }
    },
}
</script>
