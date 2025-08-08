<template>
  <view class="publish-container">
    <view class="publish-title">发布流量卡文章</view>

    <view class="card">
      <view class="card-title">基本信息</view>
      <view class="form-group"><input class="input" v-model="form.title" placeholder="标题：如“移动99元不限速流量卡”" /></view>
      <view class="form-group"><input class="input" v-model="form.desc" placeholder="简短描述：亮点/优惠信息" /></view>
      <view class="form-group">
        <picker :range="vendors" :value="vendorIndex" @change="onVendorChange">
          <view class="picker">{{ form.vendor ? form.vendor : '请选择厂商' }}</view>
        </picker>
      </view>
    </view>

    <view class="card">
      <view class="card-title">文章内容</view>
      <view class="form-group">
        <textarea class="textarea" v-model="form.content" placeholder="请输入详细内容（支持换行）" />
      </view>
    </view>

    <view class="card">
      <view class="card-title">上传图片</view>
      <view class="upload-area" @click="chooseImage">
        <uni-icons type="image" size="32" color="#2F80ED" />
        <text class="upload-tip">点击上传封面图（建议1:1或16:9）</text>
      </view>
      <image v-if="form.img" :src="form.img" class="preview-img" />
    </view>

    <button class="submit-btn" @click="submit">发布</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      vendors: ['移动', '联通', '电信'],
      vendorIndex: -1,
      form: { title: '', desc: '', img: '', vendor: '', content: '' }
    }
  },
  methods: {
    onVendorChange(e) { this.vendorIndex = e.detail.value; this.form.vendor = this.vendors[this.vendorIndex] },
    chooseImage() {
      uni.chooseImage({ count: 1, success: res => { this.form.img = res.tempFilePaths[0] } })
    },
    submit() {
      if (!this.form.title || !this.form.desc || !this.form.vendor || !this.form.content) {
        return uni.showToast({ title: '请完整填写信息', icon: 'none' })
      }
      uni.showLoading({ title: '发布中...' })
      const submitData = { ...this.form }
      const done = () => {
        uniCloud.callFunction({ name: 'article', data: { action: 'add', data: submitData } })
          .then(() => { uni.hideLoading(); uni.showToast({ title: '发布成功' }); setTimeout(() => uni.navigateBack(), 800) })
          .catch(err => { uni.hideLoading(); console.error(err); uni.showToast({ title: '发布失败', icon: 'none' }) })
      }
      if (this.form.img && !this.form.img.startsWith('cloud://')) {
        uniCloud.uploadFile({ filePath: this.form.img, cloudPath: `articles/${Date.now()}.jpg` })
          .then(res => { submitData.img = res.fileID; done() })
          .catch(() => { uni.hideLoading(); uni.showToast({ title: '图片上传失败', icon: 'none' }) })
      } else { done() }
    }
  }
}
</script>

<style scoped>
.publish-container { background: #F7F8FA; min-height: 100vh; padding: 24rpx; }
.publish-title { font-size: 34rpx; font-weight: 600; text-align: center; margin: 16rpx 0 24rpx; color: #333; }
.card { background: #fff; border-radius: 16rpx; box-shadow: 0 6rpx 20rpx rgba(0,0,0,0.06); padding: 20rpx; margin-bottom: 18rpx; }
.card-title { font-size: 28rpx; font-weight: 600; color: #333; margin-bottom: 10rpx; }
.form-group { margin-bottom: 16rpx; }
.input { width: 100%; padding: 18rpx 24rpx; border: 1rpx solid #E0E0E0; border-radius: 12rpx; background: #fff; font-size: 28rpx; }
.textarea { width: 100%; min-height: 160rpx; padding: 18rpx 24rpx; border: 1rpx solid #E0E0E0; border-radius: 12rpx; background: #fff; font-size: 28rpx; }
.picker { width: 100%; padding: 18rpx 24rpx; border: 1rpx solid #E0E0E0; border-radius: 12rpx; background: #fff; color: #666; font-size: 28rpx; }
.upload-area { display: flex; align-items: center; gap: 12rpx; background: #EAF2FE; padding: 20rpx; border-radius: 12rpx; }
.upload-tip { color: #2F80ED; font-size: 26rpx; }
.preview-img { width: 100%; height: 360rpx; border-radius: 14rpx; margin-top: 12rpx; object-fit: cover; background: #F2F2F2; }
.submit-btn { width: 100%; background: #2F80ED; color: #fff; border: none; border-radius: 12rpx; padding: 20rpx 0; font-size: 28rpx; font-weight: 600; margin-top: 10rpx; }
</style>