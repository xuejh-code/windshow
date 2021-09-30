// components/cart-item/index.js
import { Cart } from "../../model/cart";
import {parseSpecValue} from "../../utils/sku";

const cart = new Cart()

Component({
  properties: {
    cartItem:Object
  },

  data: {
    specStr:String,
    discount:Boolean,
    soldOut:Boolean,
    online:Boolean,
    stock:Cart.SKU_MAX_COUNT,
    skuCount: 1
  },

  observers:{
    cartItem: function(cartItem){
      // console.log(cartItem.count);
      // console.log(cartItem.sku.stock);
      if (!cartItem) {
        return
      }
      const specStr = parseSpecValue(cartItem.sku.specs)
      const discount = cartItem.sku.discount_price?true:false
      const soldOut = Cart.isSoldOut(cartItem)
      const online = Cart.isOnline(cartItem)
      this.setData({
        specStr,
        discount,
        soldOut,
        online,
        stock:cartItem.sku.stock,
        skuCount:cartItem.count
      })
    }
  },

  methods: {
    onDelete(event){
      const skuId = this.properties.cartItem.skuId
      cart.removeItem(skuId)
      this.setData({
        cartItem:null
      })
      this.triggerEvent('itemdelete',{
        skuId
      })
    },

    checkedItem(event){
      const checked = event.detail.checked
      cart.checkItem(this.properties.cartItem.skuId)
      this.properties.cartItem.checked = checked
      this.triggerEvent('itemcheck',{})
    },

    onSelectCount(event){
      let newCount = event.detail.count
      // console.log(newCount);
      cart.replaceItemCount(this.properties.cartItem.skuId,newCount)
      this.triggerEvent('countfloat')
    }
  }
})
