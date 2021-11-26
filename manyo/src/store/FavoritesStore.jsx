import { makeAutoObservable } from "mobx";    

export default class BasketStore {

    constructor() {
        this._favoritesID = []
        this._favorites = []

        makeAutoObservable(this)

    }
    setFavorites(prod) {
        if (localStorage.getItem('favorites') != null) {
            const cart = JSON.parse(localStorage.getItem('favorites'));
            this._favorites = cart
            this._favoritesID = []
            cart.map(i=> this._favoritesID.push(i) )
        }
            
    }
    setFavoritesID() {
        
    }
  
    get favorites() {
        return this._favorites
    }
    get favoritesID() {
        return this._favoritesID
    }
}  