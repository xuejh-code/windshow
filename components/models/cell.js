import { CellStatus } from "../../core/enum"

class Cell{
    //在其他地方定义这个变量就需要加个前缀valueTitle，
    //而封装成一个类之后就不需要了，类名就是一个相当简洁有力的前缀和概述
    title
    id
    status = CellStatus.WAITING
    spec
    skuImg

    //在fence中的构造函数接收的是specs
    constructor(spec){
        this.title = spec.value
        this.id = spec.value_id
        this.spec = spec
    }

    getCellCode(){
        return this.spec.key_id + "-" + this.spec.value_id
    }
}

export {
    Cell
}