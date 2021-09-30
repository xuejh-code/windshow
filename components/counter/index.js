import { Cart } from "../../model/cart";

// components/counter/index.js
Component({

  properties: {
    count:{
      type:Number,
      value:Cart.SKU_MIN_COUNT
    },
    min:{
      type:Number,
      value:Cart.SKU_MIN_COUNT
    },
    max:{
      type:Number,
      value:Cart.SKU_MAX_COUNT
    }
  },

  // observers:{
  //   'count,min,max':function (count,min,max) {
  //     console.log(count,min,max);
  //   }
  // },

  data: {

  },

  methods: {
    onOverStep(event){
      // console.log(event);
      const minOrMaxOut = event.detail.type
      // console.log(minOrMaxOut);
      if (minOrMaxOut == 'overflow_max') {
        wx.showToast({
          title: `超出最大购买数量`,
          icon: 'none',
          duration: 3000
        });
      }
      if (minOrMaxOut == 'overflow_min') {
        wx.showToast({
          title: `最少需要购买${Cart.SKU_MIN_COUNT}件噢`,
          icon: 'none',
          duration: 3000
        });
      }
    }
  }

})
