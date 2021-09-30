// pages/home/home.js
import {config} from "../../config/config";
import { CouponCenterType } from "../../core/enum";
import { Activity } from "../../model/activity";
import { Banner } from "../../model/banner";
import { Category } from "../../model/category";
import { SpuPaging } from "../../model/spu-paging";
import { Theme } from "../../model/theme";
Page({

  data: {
    themeA:null,
    bannerB:null,
    gridC:[],
    activityD:null,
    themeE:null,
    themeF:null,
    bannerG:null,
    themeH:null,
    spuPaging:null,
    loadingType:'loading'
  },

  async onLoad(options) {
    this.initAllData()
    this.initBottomSpuList()
  },

  async initBottomSpuList(){
    const paging = SpuPaging.getLatestPaging()
    this.data.spuPaging = paging
    const data = await paging.getMoreData()
    if (!data) {
      return
    }
    wx.lin.renderWaterFlow(data.items)
  },

  async initAllData(){
    //const themeA = await Theme.getHomeLocationA()
    const theme = new Theme()
    await theme.getThemes()

    const themeA = theme.getHomeLocationA()
    const bannerB = await Banner.getHomeLocationB()
    const gridC = await Category.getHomeLocationC()
    const activityD = await Activity.getHomeLocationD()
    const themeE = theme.getHomeLocationE()
    let themeESpu = []
    if(themeE.online){
      const data = await Theme.getHomeLocationESpu()
      if(data){
        themeESpu = data.spu_list.slice(0,8)
      }
    }
    const themeF = theme.getHomeLocationF()
    const bannerG = await Banner.getHomeLocationG()
    const themeH = theme.getHomeLocationH()

    this.setData({
      themeA,
      bannerB,
      gridC,
      activityD,
      themeE,
      themeESpu,
      themeF,
      bannerG,
      themeH
    })
  },

  onGoToCoupons(event){
    const name = event.currentTarget.dataset.aname
    wx.navigateTo({
      url: `/pages/coupon/coupon?name=${name}&type=${CouponCenterType.ACTIVITY}`
    })
  },

  onGoToTheme(event) {
    const tName = event.currentTarget.dataset.tname
    wx.navigateTo({
      url: `/pages/theme/theme?tname=${tName}`
    })
  },

  onGoToBanner(event) {
    const keyword = event.currentTarget.dataset.keyword
    const type = event.currentTarget.dataset.type
    Banner.gotoTarget(type, keyword)
  },

  onReachBottom: async function () {
    const data = await this.data.spuPaging.getMoreData()
    if (!data) {
      return
    }
    wx.lin.renderWaterFlow(data.items)
    if(!data.moreData){
      this.setData({
        loadingType:'end'
      })
    }
  },

  onPullDownRefresh: function () {

  },

  onShareAppMessage: function () {

  }
})