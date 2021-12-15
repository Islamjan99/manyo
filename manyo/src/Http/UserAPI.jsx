import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (name, lastName, email, password, phone) => {
    const {data} = await $host.post('api/user/registration', {name, lastName,email, password, phone, role: 'USER', img: 'empty', percent : 0})
    localStorage.setItem('token', data.token)
    localStorage.setItem('image', data.user.img)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    localStorage.setItem('image', data.user.img)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    return jwt_decode(data.token)
}
export const authuser = async (id) => {
    const {data} = await $authHost.get(`api/user//${id}`)
    return data

}
export const addImg = async (img) => {
    try {
        const {data} = await $authHost.put(`api/user/addImg`, img)
        localStorage.setItem('image', data)
        return data
    } catch (e) {
       console.log(e.message)
     }
    
}
export const deleteImg = async (img) => {
    const {data} = await $authHost.put(`api/user/deleteImg`, img)
    localStorage.setItem('image', data)
    console.log(data);
    return data
}