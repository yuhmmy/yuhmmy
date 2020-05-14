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
      searchName: '',
      vale: '',
      filterPref: '',
      filterDiet: 'none',
      filterLoc: 'none',
      page: '1',
      intervalId: 0,
    };
  }

  componentDidMount() {
    if (this.props.location.state !== undefined) {
      this.setState({ searchName: this.props.location.state });
      this.setState({ value: this.props.location.state });
    }
  }

  updateSearchName(event) {
    this.setState({ searchName: event.target.value });
    this.setState({ page: 1 });
  }

  updateFilterPref(event, data) {
    this.setState({ filterPref: data.value });
    this.setState({ page: 1 });
  }

  cuisines() {
    return ([{
          key: '1',
          text: 'Chinese',
          value: '1',
        }, {
          key: '2',
          text: 'Korean',
          value: '2',
        }, {
          key: '3',
          text: 'Thai',
          value: '3',
        }, {
          key: '4',
          text: 'Local',
          value: '4',
        }, {
          key: 'None',
          text: 'None',
          value: 'None',
        },
        ]
    );
  }

  diet() {
    return ([{
          key: '1',
          text: 'Vegan',
          value: '1',
        }, {
          key: '2',
          text: 'Vegetarian',
          value: '2',
        }, {
          key: '3',
          text: 'Pescatarian',
          value: '3',
        },
          {
            key: 'None',
            text: 'None',
            value: 'None',
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

  updateFilterDiet(event, data) {
    this.setState({ filterDiet: data.value });
  }

  getRestaurantList() {
    let list = [];
    // filters name.
    list = this.props.restaurants.filter(
        (items) => items.restaurantName.toLowerCase().indexOf(this.state.searchName.toLowerCase()) !== -1,
    );

    // filters preference.=
    if (this.state.filterPref !== 'None') {
      list = list.filter(
          (items) => items.description.indexOf(this.state.filterPref) !== -1,
      );
    }

    // filters diet. Vegans are vegetarians but vegetarians are not vegan.
    if (this.state.filterDiet === 'vegan') {
      list = list.filter(
          (items) => items.diet.indexOf(this.state.filterDiet) !== -1,
      );
    } else
      if (this.state.filterDiet === 'vegetarian') {
        list = list.filter(
            (items) => items.diet.indexOf('none') === -1,
        );
      }
    //
    // // filters preference.
    if (this.state.filterLoc !== 'none') {
      list = list.filter(
          (items) => items.location.indexOf(this.state.filterLoc) !== -1,
      );
    }

    return list;
  }

  setPageNum = (event, { activePage }) => {
    this.setState({ page: activePage });
  };

  updateValue(event) {
    // console.log(event.target.value);
    this.setState({ value: event.target.value });
  }

  handleClick(e) {
    if (e.key === 'Enter') {
      this.setState({ searchName: this.state.value });
    }
  }

  handleButton() {
    this.setState({ searchName: this.state.value });
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
          <Input type='text' placeholder="Search by Restaurant Name" fluid size='huge' action={{ icon: 'search' }}
                 onChange={this.updateSearchName.bind(this)} value={this.state.searchName}/>
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
  location: PropTypes.object,
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
