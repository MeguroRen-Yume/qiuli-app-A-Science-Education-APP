<template>
  <div class="swiper-layout">
    <swiper
      :spaceBetween="30"
      :slidesPerView="1"
      :loop="true"
      :centeredSlides="true"
      :pagination="{
        clickable: true
      }"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false
      }"
      :navigation="true"
      :modules="modules"
      class="mySwiper">
      <swiper-slide class="swiper-pic">
        <img class="swiper-img" src="../../../assets/img/home/slider/slider1.jpg" alt="">
      </swiper-slide>
      <swiper-slide class="swiper-pic">
        <img class="swiper-img" src="../../../assets/img/home/slider/slider2.jpg" alt="">
      </swiper-slide>
      <swiper-slide class="swiper-pic">
        <img class="swiper-img" src="../../../assets/img/home/slider/slider3.jpg" alt="">
      </swiper-slide>
      <swiper-slide class="swiper-pic">
        <img class="swiper-img" src="../../../assets/img/home/slider/slider4.jpg" alt="">
      </swiper-slide>
      <div class="swiper-button-prev" @click.stop="prevEl(item, index)" />
      <div class="swiper-button-next" @click.stop="nextEl" />
    </swiper>
  </div>
</template>
  
<script setup>
  import {Swiper, SwiperSlide} from 'swiper/vue';
  import 'swiper/css/pagination';
  import 'swiper/css/navigation';
  import { Autoplay, Pagination, Navigation, Scrollbar} from 'swiper/modules';
  import headline from './homeHeadline.vue';
  import {ref} from 'vue';
  const navigation = ref({
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  });
  const modules = [Autoplay, Pagination, Navigation, Scrollbar];
  const prevEl = (item, index) => {
  };
  const nextEl = () =>{
  };
  const onSlideChange = (swiper) => {
  };
</script>
  
<style>

.swiper-layout{
  display: flex;
  flex-direction: column;
  height: 270px;
  width: 100%;
  position: relative;
}

.mySwiper{
  width: 100%;
}

.swiper-pic{
  width: 100%;
  height: 100%;
  border-radius: 0 0 100px 100px;
  border: none;
  overflow: hidden;
  position: relative;
}
.swiper-pic:after{
  position: absolute;
  content: '';
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 0 0 100px 100px;
  border: none;
  box-shadow: 0px -10px 10px 10px #F0F0F0 inset;
}

.swiper-img{
  width: 100%;
  height: 100%;
}

</style>