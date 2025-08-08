<template>
  <view class="home-container">
    <!-- 顶部导航栏 -->
    <view class="navbar">
      <view class="navbar-left">
        <uni-icons type="bars" size="22" color="#333" @click="openDrawer" />
        <view class="city" @click="chooseCity">{{ city }}</view>
      </view>
      <view class="navbar-title">手机号商城</view>
    </view>

    <!-- 抽屉侧边栏（默认隐藏，仅点击图标时展开） -->
    <uni-drawer ref="drawer" mode="left" :width="260">
      <view class="drawer-content">
        <view class="drawer-title">选择城市</view>
        <view v-for="item in cityList" :key="item" class="drawer-city" @click="selectCity(item)">{{ item }}</view>
      </view>
    </uni-drawer>

    <!-- 轮播图 -->
    <view class="banner-box">
      <swiper class="banner-swiper" circular autoplay interval="3000" duration="500">
        <swiper-item v-for="(img, idx) in banners" :key="idx">
          <image :src="img" class="banner-img" mode="aspectFill" />
        </swiper-item>
      </swiper>
    </view>

    <!-- 金刚区 分类入口 -->
    <view class="categories">
      <view class="cate-item" @click="goToFlowCard">
        <view class="cate-icon"><uni-icons type="list" size="22" color="#2F80ED" /></view>
        <text class="cate-text">流量卡</text>
      </view>
    </view>

    <!-- 今日推荐 -->
    <view class="section">
      <view class="section-title">今日推荐</view>
      <view class="card-list">
        <view class="card-item" v-for="item in recommendList" :key="item.id">
          <image :src="item.img" class="card-img" />
          <view class="card-body">
            <text class="card-title">{{ item.name }}</text>
            <text class="card-sub">{{ item.desc }}</text>
            <view class="card-actions">
              <button class="btn-link" @click="goToFlowCard">查看详情</button>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      city: '定位中',
      cityList: ['北京', '上海', '广州', '深圳'],
      banners: [
        '/static/logo.png',
        '/static/logo.png',
        '/static/logo.png'
      ],
      recommendList: [
        { id: 1, name: '爆款流量卡', desc: '不限速大流量', img: '/static/logo.png' },
        { id: 2, name: '特惠套餐', desc: '月租低至9元', img: '/static/logo.png' }
      ]
    }
  },
  methods: {
    openDrawer() { this.$refs.drawer.open() },
    chooseCity() { this.openDrawer() },
    selectCity(city) { this.city = city; this.$refs.drawer.close() },
    goToFlowCard() { uni.navigateTo({ url: '/pages/flowcard/index' }) }
  },
  onLoad() {
    this.city = '北京'
  }
}
</script>

<style scoped>
/* 配色：主色 #2F80ED 背景灰 #F2F2F2 文本 #333/#666/#999 */
.home-container { background: #F7F8FA; min-height: 100vh; }
.navbar { display: flex; align-items: center; padding: 16rpx 24rpx 16rpx 16rpx; background: #fff; border-bottom: 1rpx solid #EFEFEF; }
.navbar-left { display: flex; align-items: center; }
.city { margin-left: 12rpx; font-weight: 500; color: #2F80ED; font-size: 28rpx; }
.navbar-title { flex: 1; text-align: center; font-size: 32rpx; font-weight: 600; color: #333; }

.banner-box { margin: 24rpx; border-radius: 18rpx; overflow: hidden; box-shadow: 0 6rpx 20rpx rgba(0,0,0,0.06); }
.banner-swiper { width: 100%; height: 260rpx; }
.banner-img { width: 100%; height: 260rpx; object-fit: cover; }

.categories { display: flex; gap: 24rpx; margin: 8rpx 24rpx 0; }
.cate-item { flex: 1; display: flex; flex-direction: column; align-items: center; background: #fff; border-radius: 16rpx; padding: 28rpx 0; box-shadow: 0 4rpx 14rpx rgba(0,0,0,0.04); }
.cate-icon { width: 88rpx; height: 88rpx; border-radius: 16rpx; background: #EAF2FE; display: flex; align-items: center; justify-content: center; margin-bottom: 10rpx; }
.cate-text { color: #333; font-size: 26rpx; }

.section { margin: 24rpx; }
.section-title { font-size: 30rpx; font-weight: 600; color: #333; margin-bottom: 16rpx; }
.card-list { display: flex; flex-direction: column; gap: 20rpx; }
.card-item { display: flex; background: #fff; border-radius: 16rpx; overflow: hidden; box-shadow: 0 6rpx 20rpx rgba(0,0,0,0.06); }
.card-img { width: 140rpx; height: 140rpx; border-radius: 12rpx; margin: 16rpx; background: #F2F2F2; }
.card-body { flex: 1; padding: 18rpx 18rpx 18rpx 0; display: flex; flex-direction: column; justify-content: center; }
.card-title { font-size: 28rpx; font-weight: 600; color: #333; }
.card-sub { color: #666; margin-top: 6rpx; font-size: 24rpx; }
.card-actions { margin-top: 12rpx; }
.btn-link { background: #EAF2FE; color: #2F80ED; border: none; border-radius: 999rpx; padding: 8rpx 16rpx; font-size: 22rpx; }

.drawer-content { padding: 32rpx 16rpx; }
.drawer-title { font-size: 28rpx; font-weight: 600; margin-bottom: 18rpx; color: #333; }
.drawer-city { padding: 14rpx 0; border-bottom: 1rpx solid #f2f2f2; font-size: 26rpx; color: #444; transition: color 0.2s; }
.drawer-city:active { color: #2F80ED; }
</style>
