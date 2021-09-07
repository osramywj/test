<template>
    <div class="todo-footer" v-show="total">
        <label>
          <input type="checkbox" v-model="allSelect" />
        </label>
        <span>
          <span>已完成{{doneNum}}</span> / 全部{{total}}
        </span>
        <button class="btn btn-danger" @click="clear">清除已完成任务</button>
    </div>
</template>

<script>
// 问题？？ :checked="allSelect"怎么也是双向的？？？？  no  selectAll 影响了this.todos的状态，进而影响计算属性allSelect的值
export default {
    name: 'TodoFooter',
    data() {
        return {
            // allSelect: false
            // styleObj: {}
        }
    },
    methods: {
        // selectAll(){
        //         // console.log(this.allSelect);

        //     if (this.allSelect) {
        //         this.todos.forEach(todo => todo.done = false)
        //     } else {
        //         this.todos.forEach(todo => todo.done = true)

        //     }
        // },
        clear(){
            this.$emit('clearAll');
        }
        
    },
    props: ['todos'],
    computed: {
        doneNum(){
            return this.todos.filter(todo => todo.done).length;
        },
        total(){
            return this.todos.length;
        },
        allSelect: {
            get(){
                return this.todos.length > 0 ? this.todos.every(todo => todo.done) : false;
            },
            set(val){
                this.todos.forEach(todo => {
                    todo.done = val;
                });
            }
        }
    },
    // watch: {
    //     allSelect(val){
    //         if (!val){
    //             this.styleObj = {display: 'none'};
    //         }else {
    //             this.styleObj = {};
    //         }
    //     }
    // }
}
</script>
    
<style scoped >
    .todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>