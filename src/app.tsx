import React from 'react'
import { hot } from 'react-hot-loader/root'
import './styles.css'
import SideBar from './containers/SideBar'
import Map from './containers/Map'
// import Users from './containers/Users';

class App extends React.Component {
    state = {
        routes: [{ lat: 22.372081, lng: 114.107877 }],
        isReset: false,
    }
    getRoutes = (data: Array<[string, string]>) => {
        this.setState({
            routes: data.map(e => ({
                lat: Number(e[0]),
                lng: Number(e[1]),
            })),
        })
    }
    getIsReset = (e: boolean) => {
        this.setState({
            isReset: e,
        })
    }
    render() {
        return (
            <div>
                <SideBar getIsReset={this.getIsReset} getRoutes={this.getRoutes} />
                <Map routes={this.state.routes} isReset={this.state.isReset} />
            </div>
        )
    }
}

export default hot(App)
