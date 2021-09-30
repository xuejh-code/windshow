
import {Coupon} from "../../model/coupon";
import {promisic} from "../../utils/util";
import {AuthAddress, CouponStatus} from "../../core/enum";

Page({

  data: {
    couponCount:0
  },

  onLoad: async function (options) {
    const coupon = await Coupon.getMyCoupons(CouponStatus.AVAILABLE)
    this.setData({
      couponCount:coupon.length
    })
  },

  onGotoMyCoupon(event) {
    wx.navigateTo({
        url: "/pages/my-coupon/my-coupon"
    })
  },

  onGotoMyOrder(event) {
    wx.navigateTo({
        url: "/pages/my-order/my-order?key=0"
    })
  },

  async onMgrAddress(event) {
    const authStatus = await this.hasAuthorizedAddress()
    if (authStatus === AuthAddress.DENY) {
        this.setData({
            showDialog: true
        })
        return
    }
    this.openAddress()
    },

  async hasAuthorizedAddress() {
    const setting = await promisic(wx.getSetting)();
    console.log(setting)
    const addressSetting = setting.authSetting['scope.address']
    if (addressSetting === undefined) {
        return AuthAddress.NOT_AUTH
    }
    if (addressSetting === false) {
        return AuthAddress.DENY
    }
    if (addressSetting === true) {
        return AuthAddress.AUTHORIZED
    }
  },

  async openAddress() {
    let res;
    res = await promisic(wx.chooseAddress)();
  },

  onReady: function () {

  },

  onShow: function () {

  }

})