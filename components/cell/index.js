// components/cell/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cell:Object,
    y:Number,
    x:Number
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event){
      this.triggerEvent('celltap',{
        //事件的应用有一个非常重要的意义：子组件向父组件传参 
        //父组件向子组件传参是通过上面的properties 
        //子组件要把一些数据回传给父组件时要使用事件  
        cell:this.properties.cell,
        x:this.properties.x,
        y:this.properties.y
      },{
        bubbles:true,
        composed:true
      })
    }
  }
})
