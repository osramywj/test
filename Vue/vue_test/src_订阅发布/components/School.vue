<template>
  <div>
      <h1>{{name}}</h1>
      <h1>{{years}}</h1>
  </div>
</template>

<script>
import pubsub from 'pubsub-js';

export default {
    name: 'School',
    data(){
        return {
            name: '武汉理工',
            years: 20,
        };
    },
    mounted() {
        pubsub.subscribe('hello', (msgName, data) => {
            console.log('School收到了student发来的数据' + data);
        })
    },
}
</script>
