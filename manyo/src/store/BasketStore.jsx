import { makeAutoObservable } from "mobx";    


export default class BasketStore {

    constructor() {
        this._idProduct = []
        this._basket = [
            {
            "id": 18,
            "count": 1,
            "name": "we",
            "price": 2134,
            "rating": 0,
            "img": "c5268aa0-127f-4b06-b71f-69df4a421ead.jpg",
            "createdAt": "2021-09-17T07:50:06.085Z",
            "updatedAt": "2021-09-17T07:50:06.085Z",
            "typeId": 1,
            "brandId": 1
          },
        ]
        this._basketClone =[{
            "id": 18,
            "count": 1,
            "name": "we",
            "price": 2134,
            "rating": 0,
            "img": "c5268aa0-127f-4b06-b71f-69df4a421ead.jpg",
            "createdAt": "2021-09-17T07:50:06.085Z",
            "updatedAt": "2021-09-17T07:50:06.085Z",
            "typeId": 1,
            "brandId": 1
          }, ]

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
        // let sumLog = 0

        // this._basketClone.map(i => {
        //     if (i.id === produ.id) {
        //         this._basket.forEach(function (item, i) {
        //                 if (item.id === produ.id) {
        //                     sumLog = item.price;
        //                     console.log('asdasd');
        //                 }
        //             });
        //             i.price += sumLog

        //     }
            
        //     console.log(sumLog);
        // })
        
        // sumLog = 0
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