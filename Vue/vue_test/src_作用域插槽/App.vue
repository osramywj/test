<template>
    <div class="container">

        <Category> 
            <template v-slot="{games}">
                <ul>
                    <li v-for="(item,index) of games" :key="index">
                        {{item}}
                    </li>
                </ul>
            </template>
        </Category>
        <Category  title="游戏"> 
            <template scope="{games}">
                <ol>
                    <li v-for="(item,index) of games" :key="index">
                        {{item}}
                    </li>
                </ol>
            </template>
          
        </Category>
        <Category  title="游戏"> 
            <template slot-scope="{games,x}">
                <h4 v-for="(item,index) of games" :key="index">
                    {{item}}
                </h4>
                <p>{{x}}</p>
            </template>
          
        </Category>
    </div>
</template>

<script>
import Category from './components/Category.vue';
export default {
    name: 'App',
    components: { Category },
    
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
