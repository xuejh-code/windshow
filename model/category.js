import { Http } from "../utils/http"

class Category {
    static async getHomeLocationC(){
        return await Http.requestMyself({
            url:`category/grid/all`
        })
    }
}

export {
    Category
}