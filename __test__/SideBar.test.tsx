import React from 'react'
import axios from 'axios'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'
import SideBar from '../src/containers/SideBar'

Enzyme.configure({ adapter: new Adapter() })
jest.mock('axios')

test('render', () => {
    const component = renderer.create(<SideBar getIsReset={jest.fn()} getRoutes={jest.fn()} />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})

test('submit success', () => {
    const mockGetIsReset = jest.fn()
    const mockGetRoutes = jest.fn()
    axios.post.mockResolvedValue({
        data: { token: '8b01b5646c16' },
    })
    axios.get.mockResolvedValue({
        data: {
            status: 'success',
            path: [
                ['22.372081', '114.107877'],
                ['22.326442', '114.167811'],
                ['22.284419', '114.159510'],
            ],
            total_distance: 20000,
            total_time: 1800,
        },
    })
    const component = shallow(<SideBar getIsReset={mockGetIsReset} getRoutes={mockGetRoutes} />)
    component.find('#submit').simulate('click')
    expect(mockGetIsReset.mock.calls.length).toBe(1)
    setTimeout(() => {
        expect(mockGetRoutes.mock.calls.length).toBe(1)
        expect(component.state().totalDistance).toBe(20000)
        expect(component.state().totalTime).toBe(1800)
        expect(component.state().error).toBe('')
    })
})

test('submit fail', () => {
    const mockGetIsReset = jest.fn()
    const mockGetRoutes = jest.fn()
    axios.post.mockResolvedValue({
        data: { token: '8b01b5646c16' },
    })
    axios.get.mockResolvedValue({
        data: {
            status: 'failure',
            error: 'Location not accessible by car',
        },
    })
    const component = shallow(<SideBar getIsReset={mockGetIsReset} getRoutes={mockGetRoutes} />)
    component.find('#submit').simulate('click')
    expect(mockGetIsReset.mock.calls.length).toBe(1)
    setTimeout(() => {
        expect(mockGetRoutes.mock.calls.length).toBe(0)
        expect(component.state().totalDistance).toBe(0)
        expect(component.state().totalTime).toBe(0)
        expect(component.state().error).toBe('Location not accessible by car')
    })
})

test('reset', () => {
    const mockGetIsReset = jest.fn()
    const mockGetRoutes = jest.fn()
    const component = shallow(<SideBar getIsReset={mockGetIsReset} getRoutes={mockGetRoutes} />)
    component.find('#reset').simulate('click')
    expect(mockGetIsReset.mock.calls.length).toBe(1)
    setTimeout(() => {
        expect(component.state().totalDistance).toBe(0)
        expect(component.state().totalTime).toBe(0)
        expect(component.state().error).toBe('')
    })
})
