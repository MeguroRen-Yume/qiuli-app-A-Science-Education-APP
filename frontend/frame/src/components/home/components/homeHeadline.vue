<template>
    <div id="app" class="headline">
        <div class="headline-title">·课程头条·</div>
        <div class="headline-content">快来做实验啦</div>
        <img class="headline-img" src="/src/assets/img/tt.png" alt="">
    </div>
</template>
  
<script>
</script>
  
<style scoped>
.headline{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    height: 34px;
    width: 89%;
    padding: 0 20px;
    align-items: center;
    border: 1px solid;
    border-radius: 27.5px;
    border-color: #3495fc;
    box-shadow: 0 5px 10px 0 rgba(0,0,0,0.05);
}
.headline-title{
  position: absolute;
  left: 30px;
  width: 130px;
  color: #3495fc;
  font-size: 24px;
}
.headline-content{
  position: absolute;
  left: 170px;
  text-align: center;
}
.headline-img{
  position: absolute;
  transform: rotateY(180deg);
  right: 35px;
  height: 25px;
}
</style>
  