import { CouponCenterType, ShoppingWay } from "../../core/enum"
import { Spu } from "../../model/spu"
import {SaleExplain} from "../../model/sale-explain"
import { px2rpx } from "../../miniprogram_npm/lin-ui/utils/util"
import { getSystemSize, getWindowHeightRpx } from "../../utils/system"
import { Cart } from "../../model/cart"
import { CartItem } from "../../model/cart-item"
import { Coupon } from "../../model/coupon"

// pages/detail/detail.js
Page({

  data: {
    showRealm:false,
    cartItemCount:0
  },

  onLoad: async function (options) {
    const pid = options.pid
    const spu = await Spu.getDetail(pid)
    const explain = await SaleExplain.getFixed()
    const windowHeight = await getWindowHeightRpx()
    const h = windowHeight - 100

    const coupons = await Coupon.getTop2CouponsByCategory(spu.category_id)

    this.setData({
      spu,
      explain,
      h,
      coupons
    })
    this.updataCartItemCount()
  },

  onGoToCouponCenter(event){
    const type = CouponCenterType.SPU_CATEGORY
    const cid = this.data.spu.category_id
    wx.navigateTo({
      url: `/pages/coupon/coupon?cid=${cid}&type=${type}`
    });
  },

  onAddToCart(event){
    this.setData({
      showRealm:true,
      orderWay:ShoppingWay.CART
    })
  },

  onBuy(event){
    this.setData({
      showRealm:true,
      orderWay:ShoppingWay.BUY
    })
  },

  onShopping(event){
    const chosenSku = event.detail.sku
    const skuCount = event.detail.skuCount

    if (event.detail.orderWay == ShoppingWay.CART) {
      const cart = new Cart()
      const cartItem = new CartItem(chosenSku,skuCount)
      cart.addItem(cartItem)
      this.updataCartItemCount()
    }

    if(event.detail.orderWay === ShoppingWay.BUY){
      wx.navigateTo({
          url:`/pages/order/order?sku_id=${chosenSku.id}&count=${skuCount}&way=${ShoppingWay.BUY}`
      })
    }
  },

  updataCartItemCount(){
    const cart = new Cart()
    this.setData({
      cartItemCount:cart.getCartItemCount(),
      showRealm:false
    })
  },

  onGotoHome(event){
    wx.switchTab({
      url: '/pages/home/home'
    });
  },

  onGotoCart(event){
    wx.switchTab({
      url: '/pages/cart/cart'
    });
      
  },

  onSpecChange(event){
    this.setData({
      specs:event.detail
    })
  },

  onReady: function () {

  },

  onShareAppMessage: function () {

  }
})