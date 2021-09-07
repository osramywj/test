<template>
  <section class="jumbotron">
    <h3 class="jumbotron-heading">Search Github Users</h3>
    <div>
    <input type="text" placeholder="enter the name you search"  v-model="keyWord"/>&nbsp;<button @click="search">Search</button>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Search',
    data() {
        return {
            keyWord: ''
        }
    },
    methods: {
        search(){
            this.$bus.$emit('getList', {isFirst: false, isLoading: true, errMsg: '', cardList: []});

            axios.get(`https://api.github.com/search/users?q=${this.keyWord}`).then(
                res => {
                    this.$bus.$emit('getList', {isLoading: false, errMsg: '', cardList: res.data.items});
                },
                err => {
                    this.$bus.$emit('getList', {isLoading: false, errMsg: err.message, cardList: []});
                }
            )
        }
    },
}
</script>
