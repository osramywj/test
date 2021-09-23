<template>
    <div class="container">
        <Category title="美食" >
            <img src="https://s3.ax1x.com/2021/01/16/srJlq0.jpg" alt="" slot="center" />
            <a href="" slot="footer" class="footer">更多美食</a>
        </Category>
        <Category title="游戏" > 
          <ul slot="center">
            <li v-for="(item,index) of games" :key="index">
                {{item}}
            </li>
        </ul>
        <div slot="footer" class="footer">
            <a href="">单机游戏</a>
            <a href="">网络游戏</a>
        </div>
        </Category>
        <Category title="电影" :list="films">
            <video
                controls
                src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
                slot="center"
            ></video>
            <template v-slot:footer>
                <div class="footer">
                <a href="">经典</a>
                <a href="">热门</a>
                <a href="">推荐</a>
            </div>
            <h4 class="footer">欢迎前来观影</h4>
            </template>

        </Category>
    </div>
</template>

<script>
import Category from './components/Category.vue';
export default {
    name: 'App',
    components: { Category },
    data() {
        return {
            foods: ['火锅', '烧烤', '小龙虾', '牛排'],
            games: ['红色警戒', '穿越火线', '劲舞团', '超级玛丽'],
            films: [
                '《教父》',
                '《拆弹专家》',
                '《你好，李焕英》',
                '《尚硅谷》',
            ],
        };
    },
};
</script>

<style lang="css">
.container , .footer{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
img{
  width: 100%;
}
video{
  width: 100%;
}
</style>
