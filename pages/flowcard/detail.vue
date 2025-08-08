<template>
  <view class="detail-container">
    <image :src="article.img" class="detail-img" />
    <view class="detail-title">{{ article.title }}</view>
    <view class="detail-sub">{{ article.desc }}</view>
    <view class="detail-actions">
      <button class="action-btn main" @click="goToOrderForm">
        <uni-icons type="paperplane-filled" size="18" color="#fff" style="margin-right: 6rpx;" />我要办卡
      </button>
      <button class="action-btn contact" @click="showContact">
        <uni-icons type="chatboxes-filled" size="18" color="#2F80ED" style="margin-right: 6rpx;" />联系客服
      </button>
    </view>
    <uni-popup ref="popup" type="center">
      <view class="popup-content">
        <image src="/static/wechat_qr.png" class="qr-img" />
        <view class="popup-tip">长按识别二维码添加微信</view>
        <button class="close-btn" @click="closePopup">关闭</button>
      </view>
    </uni-popup>
  </view>
</template>

<script>
export default {
  data() {
    return {
      article: { title: '', desc: '', img: '' },
      articles: [
        { id: 1, vendor: '移动', title: '移动爆款流量卡', desc: '不限速大流量', img: '/static/logo.png' },
        { id: 2, vendor: '联通', title: '联通特惠卡', desc: '月租低至9元', img: '/static/logo.png' },
        { id: 3, vendor: '电信', title: '电信畅享卡', desc: '全国通用', img: '/static/logo.png' }
      ]
    }
  },
  methods: {
    goToOrderForm() { uni.navigateTo({ url: '/pages/flowcard/orderform?id=' + this.article.id }) },
    showContact() { this.$refs.popup.open() },
    closePopup() { this.$refs.popup.close() }
  },
  onLoad(options) {
    const id = Number(options.id)
    const found = this.articles.find(a => a.id === id)
    if (found) { this.article = found }
  }
}
</script>

<style scoped>
.detail-container { padding: 24rpx; background: #fff; min-height: 100vh; position: relative; }
.detail-img { width: 100%; height: 340rpx; object-fit: cover; border-radius: 16rpx; box-shadow: 0 6rpx 20rpx rgba(0,0,0,0.06); }
.detail-title { font-size: 34rpx; font-weight: 700; margin-top: 20rpx; color: #333; }
.detail-sub { font-size: 26rpx; color: #666; margin-top: 8rpx; margin-bottom: 80rpx; }
.detail-actions { position: fixed; left: 0; right: 0; bottom: 0; display: flex; justify-content: space-between; background: #F7F8FA; padding: 10rpx 16rpx 18rpx; box-shadow: 0 -2rpx 12rpx #f0f1f3; z-index: 10; gap: 16rpx; }
.action-btn { flex: 1; display: flex; align-items: center; justify-content: center; font-size: 22rpx; font-weight: 600; border-radius: 10rpx; border: none; padding: 12rpx 0; transition: transform 0.1s; }
.action-btn:active { transform: scale(0.96); }
.action-btn.main { background: #2F80ED; color: #fff; }
.action-btn.contact { background: #EAF2FE; color: #2F80ED; }
.uni-popup .popup-content { display: flex; flex-direction: column; align-items: center; padding: 40rpx 32rpx 32rpx; background: #fff; border-radius: 18rpx; }
.qr-img { width: 420rpx; height: 420rpx; border-radius: 12rpx; margin-bottom: 24rpx; }
.popup-tip { font-size: 26rpx; color: #555; margin-bottom: 24rpx; }
.close-btn { width: 100%; background: #2F80ED; color: #fff; border: none; border-radius: 10rpx; font-size: 24rpx; padding: 12rpx 0; font-weight: bold; }
</style>