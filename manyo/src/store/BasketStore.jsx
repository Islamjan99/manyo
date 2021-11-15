import { makeAutoObservable } from "mobx";    

export default class BasketStore {

    constructor() {
        this._idProduct = []
        this._basket = []
        this._basketClone =[]

        makeAutoObservable(this)

    }
    addID(idProduct) {
        this._idProduct.push(idProduct)
            
    }
    idRemove(idProduct) {
        this._idProduct = []
            
    }
    basketRemove(idProduct) {
        this._basket = []
            
    }
    addBasket(basket) {
        this._basket.push(basket)
        this._basketClone.push(basket)
        this._basket.map(item => item.count = 1)
        this._basketClone.map(i => i.count = 1)
            
    }
    basketChange(produ) {

    }
    removeProduct ( id, basket ) {
        this._basket = this._basket.filter(i => i.id !== id)
        
    }

    get idProduct() {
        return this._idProduct
    }
    get basket() {
        return this._basket
    }
    get favorites() {
        return this._favorites
    }
    get basketClone() {
        return this._basketClone
    }
}  