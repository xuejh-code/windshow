import { Http } from "../utils/http"

class Activity{
    static locationD = 'a-2'
    static async getHomeLocationD(){
        return await Http.requestMyself({
            url:`activity/name/${Activity.locationD}`
        })
    }
    static async getActivityWithCoupon(activityName){
        return await Http.requestMyself({
            url:`activity/name/${activityName}/with_coupon`
        })
    }
}

export {
    Activity
}