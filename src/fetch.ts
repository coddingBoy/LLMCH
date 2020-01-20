import axios from 'axios'
import { RouteData, Token } from './types'

export const getTokenPromise = async (params: { origin: string; destination: string }): Promise<Token> => {
    try {
        const data = await axios.post('https://mock-api.dev.lalamove.com/route', params)
        return data.data
    } catch (e) {
        return Promise.reject(e)
    }
}

export const getRoutePromise = async (token: string): Promise<RouteData> => {
    try {
        // const data = await axios.get(`https://mock-api.dev.lalamove.com/route/${token}`)
        const data = await axios.get('https://mock-api.dev.lalamove.com/mock/route/success')
        return data.data
    } catch (e) {
        return Promise.reject(e)
    }
}