import {$authHost, $host} from "./index";

export const createType = async (type) => {
    const { data } = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const { data } = await $host.get('api/type')
    return data
}

export const createBrand = async (brand) => {
    const { data } = await $authHost.post('api/brand', brand)
    return data
}

export const fetchBrands = async () => {
    const { data } = await $host.get('api/brand', )
    return data
}

export const createDevice = async (device) => {
    const { data } = await $authHost.post('api/device', device)
    return data
}

export const fetchDevices = async (typeId, brandId, page, limit= 5) => {
    const { data } = await $host.get('api/device', {params: {
            typeId, brandId, page, limit
        }})
    return data
}

export const fetchDevicees = async (device) => {
    const { data } = await $host.get('api/device',)
    return data
}

export const fetchOneDevice = async (id) => {
    const { data } = await $host.get(`api/device/${id}`)
    return data
}
export const createHistoryOrder = async (formData) => {
    try {
        const { data } = await $host.post('api/his/history', formData)
        return data
    } catch (e) {
        console.log(e.message);
    }
    
}

export const getOrder = async () => {
    const { data } = await $host.get('api/his/history',)
    return data
}