<template>
<div>
    <ul>
    <li v-for="message in messages" :key="message.id">
        <!-- <router-link :to="`/home/message/detail?id=${message.id}&name=${message.name}`" active-class="active">{{message.title}}</router-link> -->
        <!-- <router-link :to="`/home/message/detail/${message.id}/${message.name}`" active-class="active">{{message.title}}</router-link> -->
        <!-- <router-link 
            :to="{
                name: 'xiangqing',
                query: {
                    id: message.id,
                    name: message.name,
                }
            }" 
            active-class="active">
            {{message.title}}
        </router-link> -->
        <router-link 
            :to="{
                name: 'xiangqing',
                query: {
                    id: message.id,
                    name: message.name,
                }
            }" 
            active-class="active">
            {{message.title}}
        </router-link>
        <button @click="pushShow(message)">push</button>
        <button @click="replaceShow(message)">replace</button>
    </li>
    </ul>
    <router-view></router-view>
</div>
</template>

<script>
export default {
    name: 'Message',
    data() {
        return {
            messages: [
                {id: '001', name: '消息内容1', title: 'title1'},
                {id: '002', name: '消息内容2', title: 'title2'},
                {id: '003', name: '消息内容3', title: 'title3'}
            ]
        }
    },
    methods: {
        pushShow(message){
            this.$router.push({
                name: 'xiangqing',
                query: {
                    id: message.id,
                    name: message.name,
                }
            })
        },
        replaceShow(message){
            this.$router.replace({
                name: 'xiangqing',
                query: {
                    id: message.id,
                    name: message.name,
                }
            })
        }
    },
    beforeDestroy() {
        console.log('message即将销毁');
    },
}
</script>

<style>

</style>