<template>
  <div>
      <button @click="changeShow">显示/隐藏</button>
      <transition appear>
        <h1 ref="hello" id="show" v-show="isShow" appear>哈喽啊</h1>
      </transition>

  </div>
</template>

<script>
export default {
    name: 'School',
    data(){
        return {
            isShow: true,

        };
    },
    methods: {
        changeShow(){
            this.isShow = !this.isShow;
            // console.log(this.$refs.hello);
            // this.className = 'go';
            // document.getElementById('show').className = document.getElementById('show').className === 'go' ? 'come' : 'go'
            // this.$refs.hello.className = this.$refs.hello.className === 'go' ? 'come' : 'go'
            // if (this.$refs.hello.className === 'come'){
                // this.$set(this.$refs.hello, 'className', 'go')
            // } else {
                // this.$set(this.$refs.hello, 'className', 'come')

            // }
        }
    }
}
</script>
<style lang="css">
    h1 {
        width: 500px;
        height: 100px;
        background-color: #bfa;
    }

    .v-enter-active {
        animation: show 2s linear;
    }
    .v-leave-active {
        animation: show 2s linear reverse;
    } 

    /* .come {
        animation: show 2s linear;
    }
    .go {
        animation: show 2s linear reverse;
    } */

    @keyframes show {
        from {
            transform: translateX(-100%);
        }
        to{
            transform: translateX(0px);
        }
    }
</style>
