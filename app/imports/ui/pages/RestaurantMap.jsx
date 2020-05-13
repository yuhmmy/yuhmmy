import React from 'react';
import { Grid, Header, Icon, Image } from 'semantic-ui-react';
import Map from '../components/Map';

export default class RestaurantMap extends React.Component {
  render() {
    return (
        <div>
          <Grid.Row>
            <Header as='h1' textAlign='center' size='medium'><p style={{ color: '#00FFFF' }}>
              Interactive Map! Click on the red pins for restaurant info || Use the hand to navigate the map ||
              Move the golden person to get a street view || Zoom in/out or enter full screen mode</p></Header>
            <Map/>
            <Grid container verticalAlign="middle" textAlign='center' columns={2}>
              <Grid.Column>
                <Image src="http://manoa.hawaii.edu/food/resources/images/maps/locationsUpperCampusMap.png"/>
                <Header inverted as='h2' textAlign='left' size='medium' style={{ color: '#999' }}>
                  <Icon size='tiny' name='circle' style={{ color: '#0E6EB8' }}/>
                  Restaurants that accept Dining Dollars / Meal Plan
                  <Icon size='tiny' name='square' style={{ color: '#A52A2A' }}/>
                  Restaurants that take cash or card only
                  <Icon size='tiny' name='square' inverted color='orange'/>
                  Food Trucks
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Image src="https://manoa.hawaii.edu/food/resources/images/maps/vendingUpperCampusMap.png"/>
                <Image src="images/foodz.png"/>
              </Grid.Column>
            </Grid>
          </Grid.Row>
        </div>
    );
  }
}
