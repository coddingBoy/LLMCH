
import axios from 'axios'
import { getTokenPromise, getRoutePromise } from '../src/fetch'

jest.mock('axios')
test('fetch token', async () => {
    axios.post.mockResolvedValue({
        data: {token: '9d3503e0-7236-4e47-a62f-8b01b5646c16'},
    })
        const data = await getTokenPromise({
            origin: 'xxx',
            destination: 'xxx',
        })
        expect(data).toEqual({
            token: '9d3503e0-7236-4e47-a62f-8b01b5646c16',
        })
})

test('fetch route success', async () => {
    const routeData = {
        status: 'success',
        path: [
            ['22.372081', '114.107877'],
            ['22.326442', '114.167811'],
            ['22.284419', '114.159510'],
        ],
        total_distance: 20000,
        total_time: 1800,
    }
    axios.get.mockResolvedValue({
        data: routeData,
    })
    const data = await getRoutePromise('9d3503e0-7236-4e47-a62f-8b01b5646c16')
    expect(data).toEqual(routeData)
})

test('fetch route in progress', async () => {
    const routeData = {
        status: 'in progress',
    }
    axios.get.mockResolvedValue({
        data: routeData,
    })
    const data = await getRoutePromise('9d3503e0-7236-4e47-a62f-8b01b5646c16')
    expect(data).toEqual(routeData)
})
test('fetch route failure', async () => {
    const routeData = {
        status: 'failure',
        error: 'Location not accessible by car',
    }
    axios.get.mockResolvedValue({
        data: routeData,
    })
    const data = await getRoutePromise('9d3503e0-7236-4e47-a62f-8b01b5646c16')
    expect(data).toEqual(routeData)
})