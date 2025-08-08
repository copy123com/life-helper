<template>
  <view class="mine-container">
    <view class="user-info">
      <image class="avatar" :src="userStore.userInfo.avatar" />
      <view class="user-name">{{ userStore.userInfo.nickname }}</view>
    </view>
    <view class="menu-list">
      <view class="menu-item" v-if="!userStore.isLoggedIn" @click="goToLogin">
        <uni-icons type="person" size="24" color="#007aff" />
        <text class="menu-text">登录</text>
        <uni-icons type="arrowright" size="20" color="#bbb" />
      </view>
      <view class="menu-item" v-if="userStore.isLoggedIn" @click="goToPublish">
        <uni-icons type="compose" size="24" color="#007aff" />
        <text class="menu-text">发布流量卡文章</text>
        <uni-icons type="arrowright" size="20" color="#bbb" />
      </view>
      <view class="menu-item" v-if="userStore.isAdminUser" @click="goToReview">
        <uni-icons type="checkmarkempty" size="24" color="#16c784" />
        <text class="menu-text">文章审核</text>
        <uni-icons type="arrowright" size="20" color="#bbb" />
        <view v-if="pendingCount > 0" class="badge">{{ pendingCount > 99 ? '99+' : pendingCount }}</view>
      </view>
      <view class="menu-item" @click="goToSettings">
        <uni-icons type="gear" size="24" color="#007aff" />
        <text class="menu-text">设置</text>
        <uni-icons type="arrowright" size="20" color="#bbb" />
      </view>
    </view>
  </view>
</template>

<script>
import { useUserStore } from '@/stores/user.js'

export default {
  data() {
    return { pendingCount: 0 }
  },
  setup() {
    const userStore = useUserStore()
    return { userStore }
  },
  onShow() {
    // 管理员进入时获取待审核数量
    if (this.userStore.isAdminUser) {
      this.fetchPendingCount()
    } else {
      this.pendingCount = 0
    }
  },
  methods: {
    fetchPendingCount() {
      uniCloud.callFunction({ name: 'article', data: { action: 'reviewList' } })
        .then(res => {
          const list = (res.result && res.result.data) || []
          this.pendingCount = Array.isArray(list) ? list.length : 0
        })
        .catch(() => { this.pendingCount = 0 })
    },
    goToLogin() { 
      uni.navigateTo({ url: '/pages/auth/login' }) 
    },
    goToPublish() { 
      if (!this.userStore.isLoggedIn) {
        return uni.navigateTo({ url: '/pages/auth/login' })
      }
      uni.navigateTo({ url: '/pages/mine/publish' }) 
    },
    goToReview() { 
      uni.navigateTo({ url: '/pages/mine/review' }) 
    },
    goToSettings() { 
      uni.navigateTo({ url: '/pages/mine/settings' }) 
    }
  }
}
</script>

<style scoped>
.mine-container { background: #f8f8f8; min-height: 100vh; padding: 32rpx; }
.user-info { display: flex; flex-direction: column; align-items: center; margin-bottom: 48rpx; }
.avatar { width: 120rpx; height: 120rpx; border-radius: 50%; margin-bottom: 16rpx; background: #fff; }
.user-name { font-size: 32rpx; font-weight: bold; }
.menu-list { background: #fff; border-radius: 16rpx; box-shadow: 0 2rpx 8rpx #eee; padding: 0 24rpx; }
.menu-item { position: relative; display: flex; align-items: center; padding: 32rpx 0; border-bottom: 1rpx solid #f0f0f0; }
.menu-item:last-child { border-bottom: none; }
.menu-text { flex: 1; margin-left: 24rpx; font-size: 28rpx; }
.badge {
  position: absolute;
  right: 72rpx;
  top: 35rpx;
  min-width: 36rpx;
  height: 32rpx;
  padding: 0 10rpx;
  background: #ff3b30;
  color: #fff;
  border-radius: 20rpx;
  font-size: 22rpx;
  line-height: 32rpx;
  text-align: center;
  box-shadow: 0 4rpx 12rpx rgba(255, 59, 48, 0.35);
}
</style>