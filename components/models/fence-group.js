import { Fence } from "./fence"
import { Matrix } from "./matrix"

class FenceGroup{
    spu
    skuList = []
    fences = []

    constructor(spu){
        this.spu = spu
        this.skuList = spu.sku_list
    }

    getDefaultSku(){
        const defaultSkuId = this.spu.default_sku_id
        if (!defaultSkuId) {
            return
        }
        return this.skuList.find(s=>s.id === defaultSkuId)
    }

    getSku(skuCode){
        const fullSkuCode = this.spu.id+'$'+skuCode
        const sku = this.spu.sku_list.find(s=>s.code === fullSkuCode)
        return sku?sku:null
    }

    setCellStatusById(cellId,status){
        this.eachCell((cell)=>{
            if (cell.id === cellId) {
                cell.status = status
            }
        })
    }

    setCellStatusByXY(x,y,status){
        this.fences[x].cells[y].status = status
    }

    //这个方法比较好
    initFences(){
        const matrix = this._createMatrix(this.skuList)
        const fences = []
        const AT = matrix.transpose()
        //console.log(AT)
        AT.forEach(r=>{
            const fence = new Fence(r)
            fence.init()
            if (this._hasSketchFence() && this._isSketchFence(fence.id)) {
                fence.setSketchFence(this.skuList)
            }
            fences.push(fence)
        })
        this.fences = fences
        // console.log(fences)
    }

    _hasSketchFence(){
        return this.spu.sketch_spec_id?true:false
    }

    _isSketchFence(fenceId){
        return this.spu.sketch_spec_id === fenceId?true:false
    }

    eachCell(cb){
        for (let i = 0; i < this.fences.length; i++) {
            for (let j = 0; j < this.fences[i].cells.length; j++) {
                const cell = this.fences[i].cells[j];
                cb(cell,i,j)
            }
        }
    }

    initFences1(){
        const matrix = this._createMatrix(this.skuList)
        const fences = []
        let currentJ = -1;
        //这一步的目的就是创建三个fence
        matrix.each((element,i,j)=>{
            //j列号发生改变了就说明开启了一个新列，需要创建一个新的fence（同一列的同一规格名下的规格值）
            if(currentJ !== j){
                currentJ = j
                //把返回的fence加进fences数组中
                fences[currentJ] = this._createFence(element)
            }
            fences[currentJ].pushValueTitle(element.value)
        })

        //console.log(fences)
    }
// 私有的方法前面加上下划线
// 创建fence的方法要把矩阵的元素element传入进来
// 这是一个生成fence的工厂，每当需要的时候就会调用它生成一个空的fence
    _createFence(element){
        const fence = new Fence()
        //fence.pushValueTitle(element.value)
        return fence
        //把实例化的fence返回回去
    }

    _createMatrix(skuList){
        const m = []
        skuList.forEach(sku => {
            m.push(sku.specs)
        });
        return new Matrix(m)
    }
}

export {
    FenceGroup
}