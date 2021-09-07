<template>
  <div class="row" >
    <div class="card" v-for="card of info.cardList" :key="card.id" v-show="info.cardList.length">
    <a :href="card.html_url" target="_blank">
        <img :src="card.avatar_url" style='width: 100px'/>
    </a>
    <p class="card-text">{{card.login}}</p>
    </div>
    <h1 v-show="info.isFirst">欢迎光临</h1>
    <h1 v-show="info.isLoading">加载中...</h1>
    <h1 v-show="info.errMsg">{{info.errMsg}}</h1>
  </div>
</template>

<script>
export default {
    name: 'List',
    data() {
        return {
            info: {
                isFirst: true,
                isLoading: false,
                errMsg: '',
                cardList: []
            }
        }
    },
    methods: {
        getResult(val){
            Object.assign(this.info, val)
        }
    },
    mounted() {
        this.$bus.$on('getList',this.getResult);
    },
}
</script>
