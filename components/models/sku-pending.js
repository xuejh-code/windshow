import { Joiner } from "../../utils/joiner";
import { Cell } from "./cell"

class SkuPending{
    pending = []
    size

    constructor(size){
        this.size = size
    }

    init(sku){
        //this.size = sku.specs.length
        for (let i = 0; i < sku.specs.length; i++) {
            const cell = new Cell(sku.specs[i]);
            this.insertCell(cell,i)
        }
    }
    getCurrentSpecValues(){
        const values = this.pending.map(cell=>{
            return cell?cell.spec.value:null
        })
        return values
    }

    getMissingSpecKeysIndex(){
        const keysIndex = []
        for (let i = 0; i < this.size; i++) {
            if (!this.pending[i]) {
                keysIndex.push(i)
            }
        }
        return keysIndex
    }

    //这个方法确实是会返回一组code的拼接，但它并不一定是一个完整的sku。
    //这个拼接是根据pending数组来的，有可能pending并没有装满
    //所以需要在judger里面增加一个判断
    getSkuCode(){
        const joiner = new Joiner('#')
        this.pending.forEach(cell=>{
            const cellCode = cell.getCellCode()
            joiner.join(cellCode)
        })
        return joiner.getStr()
    }
    //返回true表示已经确定来完整的sku
    isIntact(){
        // if (this.size !== this.pending.length) {
        //     return false
        // }
        for (let i = 0; i < this.size; i++) {
            if (this._isEmptyPart(i)) {
                return false
            }
        }
        return true
    }

    _isEmptyPart(index){
        return this.pending[index]?false:true
    }

    insertCell(cell,x){
        this.pending[x] = cell
    }

    removeCell(x){
        this.pending[x] = null
    }

    findSelectedCellByX(x){
        return this.pending[x]
    }

    isSelected(cell,x){
        const pendingCell = this.pending[x]
        if (!pendingCell) {
            return false
        }
        return cell.id === pendingCell.id
    }
}

export {
    SkuPending
}