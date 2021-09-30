import { Theme } from "../../model/theme"
// pages/theme/theme.js
Page({

  data: {
    _noResource: false,
    _theme: null,
    _tplName: ''
  },

  onLoad: async function (options) {
    const tname = options.tname
    console.log(tname)
    wx.lin.showLoading({
        color: '#157658',
        type: 'flash',
        fullScreen: true
    })
    const theme = await Theme.getThemeSpuByName(tname)
    const forYouData = await Theme.getForYou();
    wx.lin.renderWaterFlow(forYouData.spu_list, true)
    this.setData({
        _theme: theme,
        _tplName: theme.tpl_name,
        forYouData,
    })
    wx.lin.hideLoading()
  },

  initCategoryData(theme) {
  },

  onShareAppMessage: function () {

  }
})