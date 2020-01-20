import React, { Component } from 'react'
import { getRoutePromise, getTokenPromise } from '../fetch'
const styles = require('./SideBar.css')

interface Props{
    getRoutes: (e: Array<[string, string]>) => void
    getIsReset: (e: boolean) => void
}
export default class SideBar extends Component<Props> {
    state = {
        startValue: '',
        dropOffValue: '',
        totalDistance: 0,
        totalTime: 0,
        error: ''
    }
    handleOnChange = (key:'startValue' | 'dropOffValue', value: string) => {
        this.setState({
            [key]: value
        })
    }
    getRoute = (token: string) => {
        getRoutePromise(token)
            .then(data => {
                if (data.status === 'success') {
                    this.props.getRoutes(data.path)
                    this.setState({
                        totalDistance: data.total_distance,
                        totalTime: data.total_time,
                        error: '',
                    })
                }
                if (data.status === 'failure') {
                    this.setState({
                        totalDistance: 0,
                        totalTime: 0,
                        error: data.error,
                    })
                }
                if (data.status === 'in progress') {
                    this.getRoute(token)
                }
            })
            .catch(e => {
                console.warn(e)
            })
    }
    handleOnSubmit = () => {
        this.props.getIsReset(false)
        getTokenPromise({
            origin: this.state.startValue,
            destination: this.state.dropOffValue,
        })
            .then(data => {
                if (data.token) this.getRoute(data.token)
            })
            .catch(e => {
                console.warn(e)
            })
    }
    handleOnReset = () => {
        this.handleOnChange('startValue', '')
        this.handleOnChange('dropOffValue', '')
        this.setState({
            totalDistance: 0,
            totalTime: 0,
        })
        this.props.getRoutes([['22.372081', '114.107877']])
        this.props.getIsReset(true)
    }
    render() {
        return (
            <div className={styles.sidebar}>
                <ul className={styles.container}>
                    <li>
                        <input
                            placeholder='Starting location'
                            value={this.state.startValue}
                            onChange={e => this.handleOnChange('startValue', e.target.value)}
                            autoComplete='on'
                        />
                        {this.state.startValue && (
                            <img
                                className={styles.close}
                                onClick={() => this.handleOnChange('startValue', '')}
                                src={require('../images/close.png')}
                            />
                        )}
                    </li>
                    <li>
                        <input
                            placeholder='Drop-off point'
                            value={this.state.dropOffValue}
                            onChange={e => this.handleOnChange('dropOffValue', e.target.value)}
                        />
                        {this.state.dropOffValue && (
                            <img
                                className={styles.close}
                                onClick={() => this.handleOnChange('dropOffValue', '')}
                                src={require('../images/close.png')}
                            />
                        )}
                    </li>
                </ul>
                <div className={styles.buttonGroup}>
                    <button id="submit" onClick={this.handleOnSubmit}>submit</button>
                    <button id="reset" onClick={this.handleOnReset}>reset</button>
                </div>
                {this.state.error ? <p className={styles.error}>{this.state.error}</p> : null}
                {this.state.totalTime && this.state.totalDistance ? (
                    <ul className={styles.container}>
                        <li>total distance: {this.state.totalDistance}</li>
                        <li>total time: {this.state.totalTime}</li>
                    </ul>
                ) : null}
            </div>
        )
    }
}
