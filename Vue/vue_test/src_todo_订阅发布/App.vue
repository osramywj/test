<template>
  <div id="root">
  <div class="todo-container">
    <div class="todo-wrap">
      <TodoHeader :addTodo="addTodo"/>
      <TodoList :todos="todos" />
      <TodoFooter :todos="todos" :clearAll="clearAll"/>
    </div>
  </div>
</div>
</template>

<script>
import pubsub from 'pubsub-js'

import TodoHeader from './components/TodoHeader'
import TodoList from './components/TodoList'
import TodoFooter from './components/TodoFooter'
export default {
    name: 'App',
    data() {
        return {
            todos: JSON.parse(localStorage.getItem('todos')) || []
        }
    },
    methods: {
        addTodo(obj){
            this.todos.unshift(obj);
        },
        removeTodo(_, id){
            // this.todos = this.todos.filter(todo => todo.id !== id);
            const index = this.todos.find(todo => todo.id === id);
            this.todos.splice(index, 1);
        },
        clearAll(){
            this.todos = this.todos.filter(todo => !todo.done);
        }
    },
    components: {TodoHeader, TodoList, TodoFooter},
    watch: {
      todos: {
        deep: true,
        handler(val){
          localStorage.setItem('todos', JSON.stringify(val));
        }
      }
    },
    mounted(){
      this.pid = pubsub.subscribe('removeItem', this.removeTodo)
    },
    beforeDestroy() {
      pubsub.unsubscribe(this.pid);
    },
}
</script>

<style>
/*base*/
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>