<template>
  <van-nav-bar
    :title="title"
    :left-text="left_text"
    :right-text="right_text"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  />
</template>

<script>
export default {
    name:'Lcnavbar',
    props:["title","left_text","right_text"],
    mounted:{
        
    }
};
</script>

<style lang="scss" scoped>

</style>
