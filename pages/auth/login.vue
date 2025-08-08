<template>
  <view class="login-container">
    <view class="title">登录</view>
    <view class="form-group"><input class="input" v-model="username" placeholder="用户名(备用)" /></view>
    <view class="form-group"><input class="input" v-model="password" placeholder="密码(备用)" password /></view>
    <button class="login-btn" @click="localLogin">账号登录</button>
	<!-- #ifdef MP-WEIXIN -->
		<view class="split">或</view>
		<button class="wx-btn" open-type="getPhoneNumber" @click="weixinLogin">微信一键登录</button>
	<!-- #endif -->
  </view>
</template>

<script>
import { useUserStore } from '@/stores/user.js'

export default {
  data() { return { username: '', password: '' } },
  methods: {
    weixinLogin() {
      // 小程序环境使用code登录
      uni.login({
        provider: 'weixin',
        success: (res) => {
          const code = res.code
          uniCloud.callFunction({ name: 'auth', data: { action: 'login', code } })
          .then(r => {
            const { token, user } = r.result || {}
            if (!token) throw new Error('登录失败')
            
            // 使用pinia store
            const userStore = useUserStore()
            userStore.setLogin(token, user)
            
            uni.showToast({ title: '登录成功', icon: 'success' })
            setTimeout(() => uni.navigateBack(), 800)
          })
          .catch(err => {
            console.error('微信登录失败', err)
            uni.showToast({ title: '登录失败', icon: 'none' })
          })
        },
        fail: () => uni.showToast({ title: '获取code失败', icon: 'none' })
      })
    },
    localLogin() {
      if (!this.username || !this.password) return uni.showToast({ title: '请输入账号密码', icon: 'none' })
      const isAdmin = this.username === 'admin' && this.password === 'admin123'
      const user = { nickname: this.username, role: isAdmin ? 'admin' : 'user' }
      const token = 'local_' + Date.now()
      
      // 使用pinia store
      const userStore = useUserStore()
      userStore.setLogin(token, user)
      
      uni.showToast({ title: '登录成功', icon: 'success' })
      setTimeout(() => uni.navigateBack(), 800)
    }
  }
}
</script>

<style scoped>
.login-container { padding: 32rpx; }
.title { text-align: center; font-size: 36rpx; font-weight: 600; margin: 48rpx 0; }
.wx-btn { width: 100%; background: #12b95f; color: #fff; border: none; border-radius: 10rpx; padding: 18rpx 0; font-size: 28rpx; font-weight: bold; }
.split { text-align: center; color: #999; margin: 24rpx 0; }
.form-group { margin-bottom: 24rpx; }
.input { width: 100%; padding: 18rpx 24rpx; border: 1rpx solid #e0e0e0; border-radius: 10rpx; background: #fff; font-size: 28rpx; }
.login-btn { width: 100%; background: #007aff; color: #fff; border: none; border-radius: 10rpx; padding: 18rpx 0; font-size: 28rpx; font-weight: bold; margin-top: 12rpx; }
</style>