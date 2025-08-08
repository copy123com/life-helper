import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: null,
    isAdmin: false
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    isAdminUser: (state) => !!state.token && state.isAdmin,
    userInfo: (state) => state.user || { nickname: '未登录用户', avatar: '/static/logo.png' }
  },

  actions: {
    // 初始化状态
    init() {
      const token = uni.getStorageSync('token')
      const user = uni.getStorageSync('user')
      const isAdmin = uni.getStorageSync('isAdmin')
      
      this.token = token
      this.user = user
      this.isAdmin = isAdmin
    },

    // 设置登录状态
    setLogin(token, user) {
      this.token = token
      this.user = user
      this.isAdmin = user.role === 'admin'
      
      uni.setStorageSync('token', token)
      uni.setStorageSync('user', user)
      uni.setStorageSync('isAdmin', this.isAdmin)
    },

    // 清除登录状态
    logout() {
      this.token = null
      this.user = null
      this.isAdmin = false
      
      uni.removeStorageSync('token')
      uni.removeStorageSync('user')
      uni.removeStorageSync('isAdmin')
    },

    // 更新用户信息
    updateUser(user) {
      this.user = user
      uni.setStorageSync('user', user)
    }
  }
}) 