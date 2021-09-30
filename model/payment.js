import { Http } from "../utils/http";

class Payment{
    static async getPayParams(orderId){
        const serverParams = await Http.requestMyself({
            url: `payment/pay/order/${orderId}`,
            method: 'POST'
        })
        return serverParams
    }
}

export{
    Payment
}