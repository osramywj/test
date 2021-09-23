<template>
  <ul>
    <li :style="{opacity}">我是渐变色</li>
    <li>news001 <input type="text"></li>
    <li>news002 <input type="text"></li>
    <li>news003 <input type="text"></li>
</ul>
</template>

<script>
export default {
    name: 'News',
    data() {
        return {
            opacity: 1,
        }
    },
    beforeDestroy() {
        // console.log('news即将销毁');
        clearInterval(this.timer);
    },
    mounted() {
        // this.timer = setInterval(() => {
        //     this.opacity-=0.01
        //     if (this.opacity <= 0) this.opacity = 1;
        //     console.log('渐变');
        // },10)
    },

    activated() {
        // this.timer = setInterval(() => {
        //     this.opacity-=0.01
        //     if (this.opacity <= 0) this.opacity = 1;
        //     console.log('渐变');
        // },10)
        // console.log('激活了');
    },
    deactivated() {
        // clearInterval(this.timer);
        // console.log('失活了');
    },
}
</script>

<style>

</style>