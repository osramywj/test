<template>
  <div>
      <button @click="getInfo">请求</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'School',
    data(){
        return {
            
        };
    },
    methods: {
        getInfo(){
            axios.get('http://localhost:8080/school/students').then(
                res => {
                    console.log(res);
                    console.log('收到请求了'+ res.data);
                }, 
                err => {
                    console.log('请求出错了', err.message);
                }
            )
        }
    },
}
</script>
