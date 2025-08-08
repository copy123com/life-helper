<template>
  <view class="orderform-container">
    <view class="form-title">办卡信息提交</view>
    <view class="form-group">
      <input class="input" v-model="form.name" placeholder="请输入姓名" />
    </view>
    <view class="form-group">
      <input class="input" v-model="form.mobile" placeholder="请输入手机号" />
    </view>
    <view class="form-group">
      <input class="input" v-model="form.address" placeholder="请输入收货地址" />
    </view>
    <button class="submit-btn" @click="submit">提交</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        mobile: '',
        address: ''
      }
    }
  },
  methods: {
    submit() {
      if (!this.form.name || !this.form.mobile || !this.form.address) {
        uni.showToast({ title: '请填写完整信息', icon: 'none' })
        return
      }
      // TODO: 提交表单到云函数
      uni.showToast({ title: '提交成功', icon: 'success' })
      setTimeout(() => uni.navigateBack(), 1000)
    }
  }
}
</script>

<style scoped>
.orderform-container {
  background: #f8f8f8;
  min-height: 100vh;
  padding: 32rpx;
}
.form-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 32rpx;
  text-align: center;
}
.form-group {
  margin-bottom: 28rpx;
}
.input {
  width: 100%;
  padding: 18rpx 24rpx;
  border: 1rpx solid #e0e0e0;
  border-radius: 10rpx;
  background: #fff;
  font-size: 28rpx;
}
.submit-btn { width: 100%; background: #007aff; color: #fff; border: none; border-radius: 10rpx; padding: 18rpx 0; font-size: 28rpx; font-weight: bold; margin-top: 24rpx; }
</style>