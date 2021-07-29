import React, { Component } from 'react';
import { Map, GoogleApiWrapper,Marker } from 'google-maps-react';

export class Maps extends Component {

    render() {
        return (
            

            <Map 
                style={{ width: '30%', height: '30%' }}
                initialCenter={{ lat: 40.4235104, lng: -3.6796021 }}
                zoom={14}
                google={this.props.google}
            >
            <Marker
                    title={'The marker`s title will appear as a tooltip.'}
                    name={'100 montaditos'}
                    position={{ lat: 37.778519, lng: -122.405640 }} />
            <Marker />

            </Map>
           
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBKvU2rxm0HMbYos8YBWLS6orxqlcmWSzM'
})(Maps);