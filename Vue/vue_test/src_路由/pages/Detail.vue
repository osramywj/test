<template>
<div>
    <div>消息id: {{id}}</div>
    <div>消息内容: {{name}}</div>
    <!-- <div>a: {{a}}</div> -->
    <!-- <div>b: {{b}}</div> -->
</div>
</template>

<script>
export default {
    name: 'Detail',
    props: ['id', 'name'],
    mounted() {
        console.log(this);
    },
}
</script>

<style>

</style>