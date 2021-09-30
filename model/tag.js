import {Http} from "../utils/http";
class Tags{
    static getSearchTags(){
        return Http.requestMyself({
            url:`tag/type/1`
        })
    }
}

export{
    Tags
}