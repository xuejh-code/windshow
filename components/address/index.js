// components/address/index.js
import { AuthAddress } from "../../core/enum";
import {Address} from "../../model/address";

Component({
  properties: {

  },

  data: {
    address:Object,
    hasChosen:false,
    showDialog:false
  },

  lifetimes:{
    attached(){
      const address = Address.getLocal()
      if (address) {
        this.setData({
          address,
          hasChosen:true
        })
        this.triggerEvent('address',{
          address
        })
      }
    }
  },

  methods: {
    async onChooseAddress(event){
      const authStatus = await this.hasAuthorizedAddress()
      console.log(authStatus);
      if (authStatus === AuthAddress.DENY) {
        this.setData({
          showDialog:true
        })
        return
      }
      this.getUserAddress()
    },

    onDialogConfirm(event){
      wx.openSetting()
    },

    async getUserAddress(){
      let res;
      try {
        res = await wx.chooseAddress({});
      } catch (error) {
        console.error(error);
      }
      if (res) {
        this.setData({
          address:res,
          hasChosen:true
        })
        Address.setLocal(res)
        this.triggerEvent('address',{
          address: res
        })
      }
    },

    async hasAuthorizedAddress(){
      const setting = await wx.getSetting({})
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
    }
      
  }
})
