import React from 'react';
import { Grid, Header, Image } from 'semantic-ui-react';
import Map from '../components/Map';

export default class RestaurantMap extends React.Component {
  render() {
    return (
        <div>
          <Grid.Row>
            <Header as='h1' textAlign='center'>  </Header>
            <Map/>
            <Grid container verticalAlign="middle" textAlign='center' columns={2}>
              <Grid.Column>
              <Image src="http://manoa.hawaii.edu/food/resources/images/maps/locationsUpperCampusMap.png"/>
            </Grid.Column>
              <Grid.Column>
                <Image src="https://manoa.hawaii.edu/food/resources/images/maps/vendingUpperCampusMap.png"/>
              </Grid.Column>
            </Grid>
          </Grid.Row>
        </div>
    );
  }
}
