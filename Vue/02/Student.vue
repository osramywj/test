<template>
  <div>
      <h1>{{name}}</h1>
      <h1>{{age}}</h1>
  </div>
</template>

<script>
export default {
    name: 'Student',
    data(){
        return {
            name: '杨文举',
            age: 30,
        };
    }
}
</script>
