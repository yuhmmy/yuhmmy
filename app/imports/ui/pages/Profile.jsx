import React from 'react';
import PropTypes from 'prop-types';
import { Header, Container, Grid, Loader, Divider, List } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import RestaurantCard from '../components/RestaurantCard';
import { Restaurants } from '../../api/restaurant/Restaurant';
import { Meat } from '../../api/menu/Meat';
import { Ethnicity } from '../../api/menu/Ethnicity';

class Profile extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    // Get ethnicity names from ethnicity Ids in userData object
    const userEthnicityPref = Ethnicity.find(
        {
          ethnicityId: {
            $in: this.props.userData[0].preferences.ethnicity,
          },
        },
        {
          ethnicityDesc: 1,
          ethnicityCardImage: 1,
        },
    ).fetch();

    // Get user's prefered diet
    const userDietPref = Meat.find(
        {
          meatId: this.props.userData[0].preferences.meat,
        },
        {
          meatDesc: 1,
          meatCardImage: 1,
        },
    ).fetch();

    return (
        <Container className="order order-menu" style={{ padding: 20 }}>
          <Header inverted as="h1">
            {this.props.userData[0].name.firstName} {this.props.userData[0].name.lastName}
          </Header>
          age: {this.props.userData[0].age}, Gender: {this.props.userData[0].gender}

          <Divider/>

          <Header inverted as="h2">Liked Foods</Header>
          <List divided horizontal verticalAlign="middle">
            {
              userEthnicityPref.map((ethnic) => (<List.Item key={ethnic._id}>{ethnic.ethnicityDesc}</List.Item>))
            }
          </List>

          <Header inverted as="h2">Preferred Diet</Header>
          <List>
            {
              userDietPref.map((diet) => (<List.Item key={diet._id} content={diet.meatDesc}/>))
            }
          </List>

          <Header inverted as="h2">Owned Restaurants</Header>
          <Grid columns={3} padded>
            <Grid.Row>
              {
                this.props.ownedRestaurants.map((restaurant) => (
                    <Grid.Column key={restaurant._id}>
                      <RestaurantCard
                          id={restaurant._id}
                          image={restaurant.restaurantImage}
                          name={restaurant.restaurantName}
                          address={restaurant.restaurantAddress.city}
                          description={restaurant.restaurantDesc}
                      />
                    </Grid.Column>
                ))
              }
            </Grid.Row>
            <Grid.Row>
              <Header inverted as="h2">Recommended Restaurants For You</Header>
              <br/>
              <br/>
              <br/>
              {/* {
              this.props.ownedRestaurants.map((restaurant) => (
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
            } */}
            </Grid.Row>
          </Grid>
        </Container>
    );
  }
}

Profile.propTypes = {
  ownedRestaurants: PropTypes.array.isRequired,
  meat: PropTypes.array.isRequired,
  ethnicity: PropTypes.array.isRequired,
  userData: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription1 = Meteor.subscribe('Restaurants');
  const subscription2 = Meteor.subscribe('Ethnicity');
  const subscription3 = Meteor.subscribe('Meat');
  const subscription4 = Meteor.subscribe('Meteor.users.user');

  return {
    ownedRestaurants: Restaurants.find({ $where: () => this.restaurantOwner === Meteor.userId().str }).fetch(),
    meat: Meat.find({}).fetch(),
    ethnicity: Ethnicity.find().fetch(),
    userData: Meteor.users.find({}).fetch(),
    ready: subscription1.ready() && subscription2.ready() && subscription3.ready() && subscription4.ready(),
  };
})(Profile);
