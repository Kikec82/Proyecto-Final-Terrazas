import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

export class Maps extends Component {

    render() {
        return (


            <Map
                style={{ width: '60%', height: '30%' }}
                initialCenter={{ lat: this.props.terrace.location?.coordinates[0] || 40.4235104, lng: this.props.terrace.location?.coordinates[1] || -3.6796021 }}
                zoom={14}
                google={this.props.google}
            >
                <Marker
                    title={'The marker`s title will appear as a tooltip.'}
                    name={'100 montaditos'}
                    position={{ lat: this.props.terrace.location?.coordinates[0] || 37.778519, lng: this.props.terrace.location?.coordinates[1] || -3.4056404 }} />
                <Marker />

            </Map>

        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBKvU2rxm0HMbYos8YBWLS6orxqlcmWSzM'
})(Maps);