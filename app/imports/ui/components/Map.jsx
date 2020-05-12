import React from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { Container, Grid } from 'semantic-ui-react';

const Style = {
  height: '600px',
};

export class MapContainer extends React.Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker) => this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true,
  });

  render() {
    return (
        <Container>
          <div id='map'>
            <Grid centered>
              <Map
                  /* eslint-disable-next-line react/prop-types */
                  google={this.props.google}
                  zoom={16}
                  style={Style}
                  initialCenter={{
                    lat: 21.298000,
                    lng: -157.819100,
                  }}>
                <Marker
                    onClick={this.onMarkerClick}
                    restaurant={'Panda Express'}
                    desc={'Gourmet Chinese food with the freshest ingredients'}
                    site={'https://manoa.hawaii.edu/food/pandaExpress.php'}
                    position={{ lat: 21.301090, lng: -157.815400 }}/>
                <Marker
                    onClick={this.onMarkerClick}
                    restaurant={'Ba-Le'}
                    desc={'Vietnamese Sandwiches, Pho, & Bakery'}
                    site={'https://uhm.sodexomyway.com/dining-near-me/ba-le'}
                    position={{ lat: 21.298900, lng: -157.8197070 }}/>
                <Marker
                    onClick={this.onMarkerClick}
                    restaurant={'L&L Hawaiian BBQ'}
                    desc={'Local Plate Lunches, Bowls, & Sides'}
                    site={'https://manoa.hawaii.edu/food/LandL.php'}
                    position={{ lat: 21.3009200, lng: -157.815700 }}/>
                <Marker
                    onClick={this.onMarkerClick}
                    restaurant={'Jamba Juice'}
                    desc={'Juices, Smoothies, & Bowls - Live Fruitfully'}
                    site={'https://uhm.sodexomyway.com/dining-near-me/jamba-juice'}
                    position={{ lat: 21.298680, lng: -157.819079 }}/>
                <Marker
                    onClick={this.onMarkerClick}
                    restaurant={'Pizza Hut'}
                    desc={'Italian Grab and Go Pizzas, Pastas, & Wings'}
                    site={'https://uhm.sodexomyway.com/dining-near-me/pizza-hut'}
                    position={{ lat: 21.298083, lng: -157.818600 }}/>
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}>
                  <div>
                    <h4>{this.state.selectedPlace.restaurant}</h4>
                    <p>{this.state.selectedPlace.desc}</p>
                    <a href={this.state.selectedPlace.site} target='_top'>Website</a>
                  </div>
                </InfoWindow>
              </Map>
            </Grid>
          </div>
        </Container>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCXbqUp69744PLBpEcJ_5uaclmQcNYzIHQ',
})(MapContainer);
