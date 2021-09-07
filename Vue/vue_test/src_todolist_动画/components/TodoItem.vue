<template>
    <!-- <transition name="todo" appear> -->
      <li>
          <label>
              <input type="checkbox" v-model="todo.done" />
              <span>{{todo.name}}</span>
          </label>
          <button class="btn btn-danger" @click="deleteTodo(todo.id)">删除</button>
      </li>
    <!-- </transition> -->
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