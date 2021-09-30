import { Cell } from "./cell"

class Fence{
    cells =[]
    specs
    //规格名的名字
    title
    //规格名的主键、唯一标识
    id

    constructor(specs){
        this.specs = specs
        //如果有更好的写法，不要出现【0】固定值的这种写法，没有就算了
        this.title = specs[0].key
        this.id = specs[0].key_id
    }

    //将不同的初始化进一步细分
    init(){
        this._initCells()
    }

    //方法名是对方法内部代码的最好的描述
    _initCells(){
        //some 只要求这个数组下的某一个元素符合要求，就会马上返回true，否则返回false
        //every 要求这个数组下的所有元素符合要求，才会返回true，否则返回false
        this.specs.forEach(s=>{
            //this.pushValueTitle(s.value)
            const existed = this.cells.some(c=>{
                return c.id === s.value_id
            })
            if (existed) {
                return
            }
            const cell = new Cell(s)
            this.cells.push(cell)
        })
    }

    setSketchFence(skuList){
        this.cells.forEach(c=>{
            this._setCellSkuImg(c,skuList)
        })
    }

    _setCellSkuImg(cell,skuList){
        const specCode = cell.getCellCode()
        const matchedSku = skuList.find(s=>s.code.includes(specCode))
        if(matchedSku){
            cell.skuImg = matchedSku.img
        }
    }

    // pushValueTitle(title){
    //     this.valueTitles.push(title)
    // }
}

export {
    Fence
}