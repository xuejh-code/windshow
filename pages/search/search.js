// pages/search/search.js
import {HistoryKeyword} from "../../model/history-keyword";
import { Tags } from "../../model/tag";
import {Search} from "../../model/search";
import {showToast} from "../../utils/ui";

const history = new HistoryKeyword()
Page({
  data: {
    loadingType:'end'
  },

  onLoad:async function (options) {
    const historyTags = history.get()
    const hotTags = await Tags.getSearchTags()
    this.setData({
      historyTags,
      hotTags
    })
  },

  async onSearch(event){
    this.setData({
      search:true,
      items:[]
    })
    const keyword = event.detail.value || event.detail.name
    if (!keyword) {
      showToast('请输入关键字')
      return
    }
    history.save(keyword)
    this.setData({
      historyTags:history.get()
    })
    const paging = Search.search(keyword)
    wx.lin.showLoading({
      color:'#157658',
      type:'flash',
      fullScreen:true
    })
    const data = await paging.getMoreData()
    wx.lin.hideLoading()
    this.bindItems(data)
  },

  onCancel(event){
    this.setData({
      search:false
    })
  },

  bindItems(data){
    if (data.accumulator.length !== 0) {
      this.setData({
        items:data.accumulator
      })
    }
    if(!data.moreData){
      this.setData({
        loadingType:'end'
      })
    }
  },

  onDeleteHistory(event){
    history.clear()
    this.setData({
      historyTags:[]
    })
  },

  onShareAppMessage: function () {

  }
})