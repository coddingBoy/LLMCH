import React, { useEffect } from 'react'

interface props {
    routes: Array<{ lat: number; lng: number }>
    isReset: boolean
}
function Map(props: props) {
    useEffect(() => {
        if (google) {
            const map = new google.maps.Map(document.getElementById('map'), {
                center: props.routes[0],
                zoom: 10,
            })
            if (props.routes.length > 1) {
                let polyline = new google.maps.Polyline({
                    path: props.routes,
                    geodesic: true,
                    strokeColor: '#FF0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 5,
                })
                polyline.setMap(map)
                if (props.isReset) {
                    polyline.setMap(null)
                }
                // const directionsService = new google.maps.DirectionsService()
                // const directionsRenderer = new google.maps.DirectionsRenderer()
                // const request = {
                //     origin: 'Chicago, IL',
                //     destination: 'Los Angeles, CA',
                //     travelMode: 'DRIVING',
                // }
                // directionsService.route(request, (result: any, status: any) => {
                //     console.log(result, 'result')
                //     if (status == 'OK') {
                //         directionsRenderer.setDirections(result)
                //     }
                // })

                props.routes.forEach((e, i) => {
                    const marker = new google.maps.Marker({
                        position: e,
                        map: map,
                        label: String(i + 1),
                    })
                    marker.setMap(map)
                    if (props.isReset) {
                        marker.setMap(null)
                    }
                })
            }
        }
    }, [props.routes, props.isReset])
    return <div id='map' />
}

export default Map
