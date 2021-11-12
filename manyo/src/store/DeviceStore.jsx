import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = []
        this._brands = []
        this._devices = []
        this._devicees = []
        this._skins = []
        this._selectedType = {}
        this._selectedBrand = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 9
        this._idProduct = []
        this._basket = []
        this._basketClone = []
        this._favorites = []
        
        makeAutoObservable(this)
    }
    

    setTypes(types) {
        this._types = types
    }
    setBrands(brands) {
        this._brands = brands
    }
    setDevices(devices) {
        this._devices = devices
    }
    setDevicees(devicees) {
        this._devices = devicees
    }
    setSelectedType(type) {
        this._selectedType = type
    }
    setSkinType(skins) {
        this._selectedType = skins
    }
    setSelectedBrand(brand) {
        this._selectedBrand = brand
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
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
        this._basket.map(item => item.prices = item.price)
        this._basketClone.map(i => i.count = 1)
            
    }
    basketIncrement (produ) {
        this._basket.map(item  => {
            if (item.id === produ.id) {
                if (item.count <= 4) {
                    item.price += item.prices
                    item.count ++
                    
                }
            }
            return this._basket
        });
    }
    basketDecrement(produ) {
        this._basket.map(item  => {
            if (item.id === produ.id) {
                if (item.count !== 1) {
                    item.price -= item.prices
                    item.count --
                }
                
            }
            return this._basket
        });
    }
    removeProduct ( id, basket ) {
        this._basket = this._basket.filter(i => i.id !== id)   
    }
    getLocalFavorites() {
        if (localStorage.getItem('favorites') != null ) {
            this._favorites.push(JSON.parse(localStorage.getItem('favorites')))
        }
    }
    get types () {
       return this._types
    }
    get brands () {
        return this._brands
    }
    get devices () {
        return this._devices
    }
    get devicees () {
        return this._devicees
    }
    get selectedType () {
        return this._selectedType
    }
    get skinType () {
        return this._skins
    }
    get selectedBrand() {
        return this._selectedBrand
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
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