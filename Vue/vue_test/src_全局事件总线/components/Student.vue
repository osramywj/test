<template>
  <div>
      <h1>{{name}}</h1>
      <h1>{{age}}</h1>
      <button @click="sendName">发送学生</button>
      <button @click="unbind">解绑事件</button>
      <button @click="sendSchool">向School发送消息</button>
  </div>
</template>

<script>
export default {
    name: 'Student',
    data(){
        return {
            name: 'yang',
            age: 30,
        };
    },
    methods: {
        sendName(){
            this.$emit('sendStudent', this.name);
            // this.$emit('talk');
        },
        unbind(){
            this.$off(['sendStudent', 'talk'])
        },
        sendSchool(){
            this.$bus.$emit('receiveStu', '干死你')
        }
    },
}
</script>
