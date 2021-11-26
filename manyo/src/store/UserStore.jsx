import {makeAutoObservable} from "mobx";
import JWTdecode from 'jwt-decode'
import { authuser } from "../Http/UserAPI";

export default class UserStore {
    constructor() {
        this._isAuth = false 
        this._user = {} 
        this._role = {} 
        this._users = []
        this._usersId = []

        makeAutoObservable(this)
    }
    

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(bool) {
        this._user = bool
    }
    setRole(role) {
        this._role = role
    }
    setUsers(role) {
        let i = null
        if (localStorage.getItem('token') !== null) {
            let token = localStorage.getItem('token')
            i = JWTdecode(token)
         }
         this._users = i
    }
    getUsersId(userInfo) {
        this._usersId = userInfo
    }
    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
    get role() {
        return this._role
    }
    get users() {
        return this._users
    }
    get userId() {
        return this._usersId
    }
}
