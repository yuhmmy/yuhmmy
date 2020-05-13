import React from 'react';
import PropTypes from 'prop-types';
import { Header, Container, Input, Button, Dropdown, Grid } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import RestaurantCard from '../components/RestaurantCard';
import { Restaurants } from '../../api/restaurant/Restaurant';
import { Menu } from '../../api/menu/Menu';

class RestaurantSearch extends React.Component {
  constructor() {
    super();

    this.state = {
      feelingHungry: null,
    };
  }

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

  feelingHungry() {
    const ethnicities = this.props.userData[0].preferences.ethnicity;
    const meat = this.props.userData[0].preferences.meat;

    const feelingHungry = this.props.menus
      .filter((m) => m.menuItemMeatId === meat && ethnicities.includes(m.menuItemEthnicityId));

    const chosen = feelingHungry[Math.floor(Math.random() * Math.floor(feelingHungry.length - 1))].menuItemRestaurantId;

    const restaurant = this.props.restaurants.filter((r) => chosen === r._id);

    this.setState({
      feelingHungry: restaurant[0],
    });

  }

  resetRestaurants() {
    this.setState({
      feelingHungry: null,
    });
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
                <Button.Group>
                <Button
                  onClick={() => this.feelingHungry()}
                  color='teal'
                >
                  I&apos;m feeling hungry!
                </Button>
                {
                  this.state.feelingHungry !== null ? (
                    <Button
                      onClick={() => this.resetRestaurants()}
                      color='red'
                    >
                      Reset
                    </Button>
                  ) : null
                }
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
                this.state.feelingHungry !== null ? (
                  <Grid.Column key={this.state.feelingHungry._id}>
                    <RestaurantCard
                        id={this.state.feelingHungry._id}
                        image={this.state.feelingHungry.restaurantImage}
                        name={this.state.feelingHungry.restaurantName}
                        address={this.state.feelingHungry.restaurantAddress.street}
                        description={this.state.feelingHungry.restaurantDesc}
                    />
                  </Grid.Column>
                )
                :
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
  userData: PropTypes.array.isRequired,
  menus: PropTypes.array.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('Restaurants');
  const subscription2 = Meteor.subscribe('Meteor.users.user');
  const subscription3 = Meteor.subscribe('Menu');

  return {
    restaurants: Restaurants.find({}).fetch(),
    menus: Menu.find({}).fetch(),
    userData: Meteor.users.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready() && subscription3.ready(),
  };
})(RestaurantSearch);
