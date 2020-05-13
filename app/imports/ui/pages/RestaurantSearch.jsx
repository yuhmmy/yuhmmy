import React from 'react';
import PropTypes from 'prop-types';
import { Header, Container, Input, Button, Dropdown, Grid } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import RestaurantCard from '../components/RestaurantCard';
import { Restaurants } from '../../api/restaurant/Restaurant';

class RestaurantSearch extends React.Component {
  cuisines() {
    return ([
          {
            text: 'Chinese',
          },
          {
            text: 'Korean',
          },
          {
            text: 'Thai',
          },
          {
            text: 'Local',
          },
          {
            text: 'None',
          },
        ]
    );
  }

  diet() {
    return ([
          {
            text: 'Vegetarian',
          },
          {
            text: 'Vegan',
          },
          {
            text: 'Pescatarian',
          },
          {
            text: 'Meat',
          },
          {
            text: 'None',
          },
        ]
    );
  }

  locations() {
    return ([
          {
            text: 'UHM Campus Center',
          },
          {
            text: 'UHM Paradise Palms',
          },
          {
            text: 'UHM Food Truck',
          },
          {
            text: 'Off-Campus',
          },
          {
            text: 'None',
          },
        ]
    );
  }

  render() {
    return (
        <Container className="order order-menu" style={{ padding: 20 }}>
          <Header inverted as="h1">Search restaurants</Header>
          <Input placeholder="Search by Name" fluid size='huge' action={{ icon: 'search' }}/>
          <br/>
          <Grid>
            <Grid.Row columns={4}>
              <Grid.Column>
                <Button.Group color='teal'>
                <Button>I&apos;m feeling Hungry!</Button>
                </Button.Group>
              </Grid.Column>
              <Grid.Column>
                <Dropdown
                    search
                    selection
                    options={this.cuisines()}
                    placeholder='Search by Cuisines'/>
              </Grid.Column>
              <Grid.Column>
                <Dropdown
                    search
                    selection
                    options={this.diet()}
                    placeholder='Search by Restrictions'/>
              </Grid.Column>
              <Grid.Column>
                <Dropdown
                    search
                    selection
                    options={this.locations()}
                    placeholder='Search by Locations'/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <br/>
          <Grid columns={3} padded>
            <Grid.Row>
              {
                this.props.restaurants.map((restaurant) => (
                    <Grid.Column key={restaurant._id}>
                      <RestaurantCard
                          id={restaurant._id}
                          image={restaurant.restaurantImage}
                          name={restaurant.restaurantName}
                          address={restaurant.restaurantAddress.street}
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
