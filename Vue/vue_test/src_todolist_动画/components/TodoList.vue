<template>
    <ul class="todo-main">
    <transition-group name="todo" appear>
        <TodoItem v-for="todo of todos" :key="todo.id" :todo="todo" />
    </transition-group>

    </ul>
</template>

<script>
import TodoItem from './TodoItem.vue';
export default {
    name: 'TodoList',
    methods: {
        
    },
    components: {TodoItem},
    props: ['todos']
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
.todo-enter-active {
    animation: show .3s linear;
}
.todo-leave-active {
    animation: show .3s linear reverse;
}

@keyframes show {
    from {
        transform: translateX(-100%);
    }
    to{
        transform: translateX(0px);
    }
}
</style>