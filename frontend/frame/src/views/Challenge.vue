<template>
  <div>
    <van-nav-bar title="闯关" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div style="font-size: 40px;font-weight:bold;position: relative;margin-top: 80px">第{{this.$route.params.id}}关</div>
    <router-link :to="{ name: 'Answer', params: { id: this.$route.params.id } }" style="margin-top: 10%;margin-right:12%; --van-button-default-height: 8rem;">
    <div style="margin-top: 80px;margin-left:12%;margin-right:12%; --van-button-default-height: 5rem;">
        <van-button plain block type="primary" native-type="submit" @click="startAnswer">开始答题</van-button>
    </div>
    </router-link>
    <router-link :to="{ name: 'Wrong', params: { id: this.$route.params.id } }" style="margin-top: 10%;margin-right:12%; --van-button-default-height: 8rem;">
    <div style="margin-top: 10%;margin-left:12%; --van-button-default-height: 8rem;">
        <van-button style="width: 40%; float:left" plain block type="primary" native-type="submit" @click="openWrong">
            <van-icon name="records-o" size="30"/>错题集</van-button>
    </div>
    </router-link>
    <router-link :to="{ name: 'Rank', params: { id: this.$route.params.id } }">
      <div style="margin-top: -10%;margin-right:12%; --van-button-default-height: 8rem;">
        <van-button style="width: 40%; float:right" plain block type="primary" native-type="submit" @click="openRank">
            <van-icon name="medal-o" size="30"/>排行榜</van-button>
        </div>
    </router-link>
</div>
</template>

<script>

	export default {
	  methods: {
        onClickLeft() {
          this.$router.push('/');
	    },
        startAnswer(){
            sessionStorage.clear("challenge");
            this.$router.push('/answer');
        },
        openWrong(){
            sessionStorage.clear("challenge");
            this.$router.push('/wrong');
        },
	  },
	};
</script>

<style>


</style>