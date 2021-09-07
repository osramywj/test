<template>
  <div>
      <h1>{{name}}</h1>
      <h1>{{age}}</h1>
      <button @click="sendName">传递给School</button>
  </div>
</template>

<script>
import pubsub from 'pubsub-js';
export default {
    name: 'Student',
    data(){
        return {
            name: '杨文举',
            age: 30,
        };
    },
    methods: {
        sendName(){
            pubsub.publish('hello', 999);
        }
    },
}
</script>
