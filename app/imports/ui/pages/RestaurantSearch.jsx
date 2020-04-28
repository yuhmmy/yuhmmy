import React from 'react';
import PropTypes from 'prop-types';
import { Header, Container, Input, Button, Grid } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import RestaurantCard from '../components/RestaurantCard';
import { Restaurants } from '../../api/restaurant/Restaurant';

class RestaurantSearch extends React.Component {
  render() {
    return (
        <Container className="order order-menu" style={{ padding: 20 }}>
          <Header inverted as="h1">Search restaurants</Header>
          <Input placeholder="Search" fluid size='huge' action={{ icon: 'search' }}/>
          <br/>
          <Button>I&apos;m feeling lucky!</Button>
          <br/>
          <br/>
          <br/>
          <Grid columns={3} padded>
            <Grid.Row>
              {
                this.props.restaurants.map((restaurant) => (
                    <Grid.Column key={restaurant._id}>
                      <RestaurantCard
                          id={restaurant._id}
                          image="https://react.semantic-ui.com/images/wireframe/square-image.png"
                          name={restaurant.restaurantName}
                          address={restaurant.restaurantAddress.city}
                          description={restaurant.restaurantDesc}
                      />
                    </Grid.Column>
                ))
              }
            </Grid.Row>
          </Grid>
        </Container>
    );
  }
}

RestaurantSearch.propTypes = {
  restaurants: PropTypes.array.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('Restaurants');

  return {
    restaurants: Restaurants.find({}).fetch(),
    ready: subscription.ready(),
  };
})(RestaurantSearch);
