<template>
  <view class="flowcard-container">
    <!-- 厂商切换Tab -->
    <view class="vendor-tabs">
      <view v-for="(vendor, idx) in vendors" :key="vendor" :class="['vendor-tab', idx === vendorIndex ? 'active' : '']" @click="changTab(idx)">
        {{ vendor }}
      </view>
    </view>
    <!-- 文章列表 -->
    <view class="article-list">
      <view class="article-item" v-for="item in articles" :key="item._id" @click="goToDetail(item._id)">
        <image :src="item.img" class="article-img" />
        <view class="article-info">
          <text class="article-title">{{ item.title }}</text>
          <text class="article-desc">{{ item.desc }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      vendors: ['移动', '联通', '电信'],
      vendorIndex: 0,
      articles: []
    }
  },
  onLoad() {
    this.getArticles()
  },
  methods: {
    goToDetail(id) {
      uni.navigateTo({ url: `/pages/flowcard/detail?id=${id}` });
    },
    getArticles() {
      uniCloud.callFunction({
        name: 'article',
        data: { action: 'list', vendor: this.vendors[this.vendorIndex] }
      }).then(res => {
        this.articles = (res.result && res.result.data) || []
      })
    },
    changTab(index){
      this.vendorIndex = index
      this.getArticles()
    }
  }
}
</script>

<style scoped>
/* 保持原样式 */
.flowcard-container { background: #f8f8f8; min-height: 100vh; }
.vendor-tabs { display: flex; background: #fff; border-radius: 16rpx; margin: 24rpx; overflow: hidden; box-shadow: 0 2rpx 8rpx #eee; }
.vendor-tab { flex: 1; text-align: center; padding: 24rpx 0; font-size: 32rpx; color: #888; background: #fff; transition: color 0.2s, background 0.2s; }
.vendor-tab.active { color: #007aff; background: #e6f2ff; font-weight: bold; }
.article-list { margin: 24rpx; display: flex; flex-direction: column; gap: 24rpx; }
.article-item { display: flex; background: #fff; border-radius: 12rpx; overflow: hidden; box-shadow: 0 2rpx 8rpx #eee; }
.article-img { width: 120rpx; height: 120rpx; }
.article-info { flex: 1; padding: 24rpx; display: flex; flex-direction: column; justify-content: center; }
.article-title { font-size: 28rpx; font-weight: bold; }
.article-desc { color: #888; margin-top: 8rpx; }
</style>