<template>
  <div>
    <!-- 排行榜标题 -->
    <van-nav-bar title="排行榜" left-text="返回" left-arrow @click-left="goBack" />
    <div style="margin-top: 0%;">
      <van-tabs v-model="currentTab" @change="onTabChange" title-active-color="#1989fa">

        <van-tab title="正确率">
          <van-list v-if="rankings.length > 0">
            <div class="rank-item" v-for="(user, index) in rankings" :key="user.id">
              <van-cell style="font-size: large; --van-cell-label-font-size: 1rem; "
                :title="`${user.username}`"
                :label="`正确率：${formattedRightRate(user.rightRate)}`"
                center
              >
                <template #right-icon>
                  <span v-if="index >= 3" class="rank-number">{{ index + 1 }}</span>
                  <van-icon v-else-if="index === 0" name="medal" size="40" color="#FFD700"/>
                  <van-icon v-else-if="index === 1" name="medal" size="40" color="#C0C0C0"/>
                  <van-icon v-else-if="index === 2" name="medal" size="40" color="#CD7F32"/>
                </template>
              </van-cell>
            </div>
          </van-list>
        </van-tab>

        <van-tab title="答题数">
          <van-list v-if="rankings.length > 0">
            <div class="rank-item" v-for="(user, index) in rankings" :key="user.id">
              <van-cell style="font-size: large; --van-cell-label-font-size: 1rem; "
                :title="`${user.username}`"
                :label="`答题数：${user.answerCount}`"
                center
              >
                <template #right-icon>
                  <span v-if="index >= 3" class="rank-number">{{ index + 1 }}</span>
                  <van-icon v-else-if="index === 0" name="medal" size="40" color="#FFD700"/>
                  <van-icon v-else-if="index === 1" name="medal" size="40" color="#C0C0C0"/>
                  <van-icon v-else-if="index === 2" name="medal" size="40" color="#CD7F32"/>
                </template>
              </van-cell>
            </div>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { fetchRankings } from '../api/api';

export default {
  name: 'RankingPage',

  components: {},
  data() {
    return {
      currentTab: 0,
      rankings: [],
      sortType: 'rightRate', // 默认按照准确率排序
    };
  },

  methods: {
    goBack() {
      this.$router.go(-1);
    },
    formattedRightRate(rate) {
      return parseFloat(rate).toFixed(2);
    },
    onTabChange(name) {
      if (name === 0) {
        this.sortType = 'rightRate'; // 当前选项卡为“正确率”
      } else if (name === 1) {
        this.sortType = 'answerCount'; // 当前选项卡为“答题数”
      }
      this.initializeRankings(); // 切换时重新获取数据
    },
    async initializeRankings() {
      try {
        this.rankings = await fetchRankings(this.sortType);
      } catch (error) {
        console.error('Failed to initialize rankings:', error);
      }
    },
  },
  mounted() {
    this.initializeRankings();
  },
};
</script>

<style scoped>
/* .rank-item {
  padding: 1rem;
} */
.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  /* margin-left: 2rem; */
}
.rank-number {
  font-size: 25px;
  margin-right: 20px;
  line-height: 1; /* 确保与图标对齐 */
}
</style>