import { Cart } from "./model/cart"
import { Token } from "./model/token";

// app.js
App({
  onLaunch() {
    const cart = new Cart()
    if (!cart.isEmpty()) {
      wx.showTabBarRedDot({
        index: 2,
        fail(){}
      });
    }

    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    const token = new Token()
    token.verify()

  },
  globalData: {
    userInfo: null
  }
})
