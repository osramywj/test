<template>
    <li>
        <label>
            <input type="checkbox" v-model="todo.done" />
            <span v-show="!todo.isEdit">{{todo.name}}</span>
            <input type="text" :value="todo.name" v-show="todo.isEdit" @blur="blurHandle(todo, $event)" ref="editInput">
        </label>
        <button class="btn btn-danger" @click="deleteTodo(todo.id)">删除</button>
        <button class="btn btn-edit" v-show="!todo.isEdit" @click="editTodo(todo)" >编辑</button>
    </li>
</template>

<script>

export default {
    name: 'TodoItem',
    data() {
        return {
            
        }
    },
    props: ['todo', 'doneTodo'],
    methods: {
        deleteTodo(id){
            // this.removeTodo(id);
            this.$bus.$emit('removeTodo', id);
        },
        editTodo(todo){
          this.$set(todo, 'isEdit', true);
          this.$nextTick(function(){
            this.$refs.editInput.focus();
          })
        },
        blurHandle(todo, e){
          todo.isEdit = false;
          if (!e.target.value.trim()) return;
          todo.name = e.target.value;
       
          // this.$bus.$emit('updateTodo', todo.id, e.target.value);
        }
    },

}
</script>
    
<style scoped >
    li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
  margin-right: 2px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}

li:hover{
    background-color: #ccc;
}

li:hover button{
    display: block;
}
</style>