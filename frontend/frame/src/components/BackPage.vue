<template>
        <van-nav-bar
        left-text="返回"
        left-arrow
        fixed
        class="back-button"
        @click-left="onClickLeft"
        >
        </van-nav-bar>
</template>
<script>
export default{
    setup() {
    const onClickLeft = () => history.back();
    return {
      onClickLeft,
    };
  },
}
</script>
<style>
.van-nav-bar_content{
  height: 10px;
}
.van-nav-bar_left .van-nav-bar_text
{
    font-size: 20px;
    color: black;
}
.van-nav-bar .var-icon{
    color: black;
}
.van-nav-bar-background{
    background: none;
}
</style>