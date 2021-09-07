<template>
    <ul class="todo-main">
        <TodoItem v-for="todo of todos" :key="todo.id" :todo="todo" :removeTodo="removeTodo"/>
    </ul>
</template>

<script>
import TodoItem from './TodoItem.vue';
export default {
    name: 'TodoList',
    methods: {
        
    },
    components: {TodoItem},
    props: ['todos', 'removeTodo']
}
</script>
    
<style scoped >
    .todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>