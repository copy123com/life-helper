<template>
  <view class="settings-container">
    <view class="settings-title">设置</view>
    <view class="settings-list">
      <view class="settings-item" @click="showPrivacy">
        <text>隐私政策</text>
        <uni-icons type="arrowright" size="20" color="#bbb" />
      </view>
      <view class="settings-item logout" @click="logout" v-if="userStore.isLoggedIn">
        <text>退出登录</text>
      </view>
    </view>
  </view>
</template>

<script>
import { useUserStore } from '@/stores/user.js'

export default {
  setup() {
    const userStore = useUserStore()
    return { userStore }
  },
  methods: {
    showPrivacy() {
      uni.showModal({
        title: '隐私政策',
        content: '这里是隐私政策内容示例。',
        showCancel: false
      })
    },
    logout() {
      uni.showModal({
        title: '确认退出',
        content: '确定要退出登录吗？',
        success: (res) => {
          if (res.confirm) {
            this.userStore.logout()
            uni.showToast({
              title: '已退出登录',
              icon: 'none'
            })
            // 返回上一页或首页
            setTimeout(() => {
              uni.switchTab({
                url: '/pages/mine/index'
              })
            }, 1000)
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.settings-container {
  background: #f8f8f8;
  min-height: 100vh;
  padding: 32rpx;
}
.settings-title {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 32rpx;
}
.settings-list {
  background: #fff;
  border-radius: 16rpx;
  box-shadow: 0 2rpx 8rpx #eee;
  padding: 0 24rpx;
}
.settings-item {
  display: flex;
  align-items: center;
  padding: 32rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
  font-size: 28rpx;
}
.settings-item:last-child {
  border-bottom: none;
}
.logout {
  color: #e43d33;
  justify-content: center;
}
</style>