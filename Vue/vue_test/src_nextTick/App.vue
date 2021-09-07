<template>
  <div id="root">
  <div class="todo-container">
    <div class="todo-wrap">
      <TodoHeader @addTodo="addTodo"/>
      <TodoList :todos="todos" />
      <TodoFooter :todos="todos" @clearAll="clearAll"/>
    </div>
  </div>
</div>
</template>

<script>
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
        removeTodo(id){
            // this.todos = this.todos.filter(todo => todo.id !== id);
            const index = this.todos.find(todo => todo.id === id);
            this.todos.splice(index, 1);
        },
        clearAll(){
            this.todos = this.todos.filter(todo => !todo.done);
        },
        updateTodo(id, val){
          this.todos.forEach(todo => {
            if (todo.id === id) todo.name = val;
          }) 
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
    mounted() {
      this.$bus.$on('removeTodo', this.removeTodo);
      this.$bus.$on('updateTodo', this.updateTodo);
    },
    beforeDestroy() {
      this.$bus.$off('removeTodo');
      this.$bus.$off('updateTodo');
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

.btn-edit {
  color: #fff;
  background-color: rgb(121, 167, 111);
  border: 1px solid rgb(121, 167, 111);
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn-edit:hover {
  color: #fff;
  background-color: rgb(79, 110, 72);
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