<template>
  <view class="review-container">
    <view class="title">待审核文章</view>
    <view v-if="!userStore.isAdminUser" class="tip">请先登录管理员账号后再操作</view>
    <view v-else class="list">
      <view v-for="item in list" :key="item._id" class="card" @click="goDetail(item._id)">
        <view class="row">
          <text class="name">{{ item.title }}</text>
          <text class="vendor">{{ item.vendor }}</text>
        </view>
        <view class="desc">{{ item.desc }}</view>
        <view class="actions" @click.stop>
          <button class="btn pass" @click="approve(item._id)">通过</button>
          <button class="btn reject" @click="reject(item._id)">拒绝</button>
        </view>
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
  data() { return { list: [] } },
  onShow() {
    if (this.userStore.isAdminUser) this.fetch()
  },
  methods: {
    fetch() {
      uniCloud.callFunction({ name: 'article', data: { action: 'reviewList' } })
      .then(res => { this.list = (res.result && res.result.data) || [] })
    },
    goDetail(id) { uni.navigateTo({ url: `/pages/flowcard/detail?id=${id}` }) },
    approve(id) { uniCloud.callFunction({ name: 'article', data: { action: 'approve', id } }).then(() => { uni.showToast({ title: '已通过' }); this.fetch() }) },
    reject(id) { uniCloud.callFunction({ name: 'article', data: { action: 'reject', id } }).then(() => { uni.showToast({ title: '已拒绝' }); this.fetch() }) }
  }
}
</script>

<style scoped>
.review-container { background: #F7F8FA; min-height: 100vh; padding: 24rpx; }
.title { font-size: 34rpx; font-weight: 600; margin: 16rpx 8rpx 24rpx; color: #333; }
.tip { color: #999; text-align: center; margin-top: 60rpx; }
.card { background: #fff; border-radius: 16rpx; padding: 22rpx; margin-bottom: 16rpx; box-shadow: 0 6rpx 20rpx rgba(0,0,0,0.06); }
.row { display: flex; justify-content: space-between; align-items: center; }
.name { font-size: 28rpx; font-weight: 600; color: #333; }
.vendor { font-size: 24rpx; color: #2F80ED; }
.desc { margin-top: 8rpx; color: #666; font-size: 26rpx; }
.actions { display: flex; gap: 16rpx; margin-top: 16rpx; }
.btn { flex: 1; padding: 14rpx 0; border-radius: 10rpx; font-size: 24rpx; border: none; }
.pass { background: #16c784; color: #fff; }
.reject { background: #FFE8E6; color: #e43d33; }
</style>