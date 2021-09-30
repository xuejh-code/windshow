import { Http } from "../utils/http"

class SaleExplain{
    static async getFixed(){
        const explains = await Http.requestMyself({
            url:`sale_explain/fixed`
        })
        return explains.map(e=>{
            return e.text
        })
    }
}

export{
    SaleExplain
}