import { ShoppingWay } from "../../core/enum"
import { Calculator } from "../../model/calculator"
import { Cart } from "../../model/cart"

const cart = new Cart()
// pages/cart/cart.js
Page({
  data: {
    cartItems:[],
    isEmpty:false,
    allChecked:false,
    totalPrice:0,
    totalSkuCount:0
  },

  async onLoad(options) {
    const cartData = await cart.getAllSkuFromServer()
    if (cartData) {
      this.setData({
        cartItems:cartData.items
      })
    }
  },

  onShow: function () {
    //刷新数据的代码
    const cart = new Cart()
    const cartItems = cart.getAllCartItemFromLocal().items
    if (cart.isEmpty()) {
      this.empty()
      return
    }
    this.setData({
      cartItems:cartItems
    })
    this.notEmpty()
    this.isAllChecked()
    this.refreshCartData()
  },

  refreshCartData(){
    const checkedItems = cart.getCheckedItems()
    const calculator = new Calculator(checkedItems)
    calculator.calc()
    this.setCalcData(calculator)
  },

  setCalcData(calculator){
    const totalPrice = calculator.getTotalPrice()
    const totalSkuCount = calculator.getTotalSkuCount()
    this.setData({
      totalPrice,
      totalSkuCount
    })
  },

  isAllChecked(){
    const allChecked = cart.isAllChecked()
    this.setData({
      allChecked
    })
  },

  onSingleCheck(event){
    this.isAllChecked()
    this.refreshCartData()
  },

  onDeleteItem(event){
    this.isAllChecked()
    this.refreshCartData()
  },

  onCheckAll(event){
    const checked = event.detail.checked
    cart.checkAll(checked)
    this.setData({
      cartItems:this.data.cartItems
    })
    this.refreshCartData()
  },

  onCountFloat(event){
    this.refreshCartData()
  },

  empty(){
    this.setData({
      isEmpty:true
    })
    wx.hideTabBarRedDot({
      index: 2 
    });
  },

  notEmpty(){
    this.setData({
      isEmpty:false
    })
    wx.showTabBarRedDot({
      index: 2
    });
  },

  onSettle(event){
    if (this.data.totalSkuCount <= 0) {
      return
    }
    wx.navigateTo({
      url: `/pages/order/order?way=${ShoppingWay.CART}`
    });
      
  }
})