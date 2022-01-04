
<template>
  <!-- navback -->
  <van-nav-bar
    :left-text="navbar_left_text"
    :title="navbar_title"
    :right-text="navbar_right_text"
    @click-left="navbar_left_click"
    @click-right="navbar_right_click"
  ></van-nav-bar>
</template>

<script>
export default {
  data() {
    return {
        navbar_left_text:"",
        navbar_right_text:"上傳",
        navbar_title:"現場相記錄"

    };
  },
  methods: {
    navbar_left_click(){
      this.$router.go(-1);
    },
    navbar_right_click(){
      this.$router.go(-1);
    },
  },
};
</script>

<style>
</style>