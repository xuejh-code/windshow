// components/spu-preview/index.js
Component({

  properties: {
    data:Object
  },

  data: {
    tags: Array
  },

  observers:{
    data:function (data){
      if(!data){
        return
      }
      if (!data.tags) {
        return
      }
      const tags = data.tags.split('$')
      this.setData({
        tags
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onImgLoad(event){
      // console.log(event);
      const {width,height} = event.detail
      this.setData({
        w:width,
        h:height
      })
    },
    onItemTap(event){
      //console.log(event)
      const pid = event.currentTarget.dataset.pid
      wx.navigateTo({
        url: `/pages/detail/detail?pid=${pid}`
      });
    }
  }
})
