<template>
  <view class="order-container">
    <view class="order-title">我的订单</view>
    <view v-if="orders.length === 0" class="order-empty">暂无订单</view>
    <view v-else class="order-list">
      <view class="order-item" v-for="order in orders" :key="order.id">
        <view class="brand">
          <image :src="order.brandLogo" class="brand-logo" />
        </view>
        <view class="order-info">
          <view class="row">
            <text class="order-card">{{ order.cardNo }}</text>
            <text :class="['status', order.status === '已激活' ? 'success' : 'pending']">{{ order.status }}</text>
          </view>
          <view class="meta">
            <text class="vendor">{{ order.vendor }}</text>
            <text class="date">{{ order.date }}</text>
          </view>
          <view class="actions">
            <button class="btn ghost" @click="contact(order)">联系客服</button>
            <button class="btn primary" @click="detail(order)">查看详情</button>
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
      orders: [
        { id: 1, cardNo: '188****1234', vendor: '移动', date: '2024-05-01', status: '已激活', brandLogo: '/static/logo.png' },
        { id: 2, cardNo: '156****5678', vendor: '联通', date: '2024-05-10', status: '待激活', brandLogo: '/static/logo.png' }
      ]
    }
  },
  methods: {
    contact(order) { uni.showToast({ title: '联系客服', icon: 'none' }) },
    detail(order) { uni.showToast({ title: '查看详情', icon: 'none' }) }
  }
}
</script>

<style scoped>
.order-container { background: #F7F8FA; min-height: 100vh; padding: 24rpx; }
.order-title { font-size: 36rpx; font-weight: 600; margin: 16rpx 8rpx 24rpx; color: #333; }
.order-empty { text-align: center; color: #999; margin-top: 80rpx; }
.order-list { display: flex; flex-direction: column; gap: 20rpx; }
.order-item { display: flex; background: #fff; border-radius: 16rpx; box-shadow: 0 6rpx 20rpx rgba(0,0,0,0.06); overflow: hidden; }
.brand { width: 120rpx; display: flex; align-items: center; justify-content: center; background: #F2F2F2; }
.brand-logo { width: 72rpx; height: 72rpx; border-radius: 12rpx; }
.order-info { flex: 1; padding: 18rpx; }
.row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8rpx; }
.order-card { font-size: 30rpx; font-weight: 600; color: #333; }
.status { padding: 6rpx 16rpx; border-radius: 999rpx; font-size: 22rpx; }
.status.success { background: #E9F9EF; color: #16c784; }
.status.pending { background: #FFF4E5; color: #ff9f0a; }
.meta { display: flex; gap: 12rpx; color: #666; font-size: 24rpx; margin-bottom: 12rpx; }
.actions { display: flex; gap: 12rpx; }
.btn { flex: 1; padding: 12rpx 0; border-radius: 10rpx; font-size: 24rpx; border: none; }
.btn.ghost { background: #EAF2FE; color: #2F80ED; }
.btn.primary { background: #2F80ED; color: #fff; }
</style>