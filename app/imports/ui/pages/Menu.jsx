import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Grid, Header, Button } from 'semantic-ui-react';

import { Menu } from '../../api/menu/Menu';
import { Restaurants } from '../../api/restaurant/Restaurant';

import MenuCard from '../components/MenuCard';
import CheckoutItem from '../components/CheckoutItem';

class Order extends React.Component {
  constructor() {
    super();

    this.state = {
      orderItems: [],
    };
  }

  addItem(item) {
    this.setState((state) => ({
      orderItems: [
        ...state.orderItems,
        item,
      ],
    }));
  }

  removeItem(index) {
    this.setState(state => ({
      orderItems: state.orderItems.filter((e, i) => i !== index),
    }));
  }

  render() {
    return (
      <div className="order">
        <Grid>
          <Grid.Column width={11}>
            <div className="order-menu">
              <Header as="h2" inverted>
                Ala Carte
              </Header>
              <Grid columns={3}>
                <Grid.Row>
                  {
                    this.props.menu.map(item => (
                      <Grid.Column key={item._id}>
                        <MenuCard
                          addItem={(menu) => this.addItem(menu)}
                          item={item}
                          image={item.menuItemImage}
                          name={item.menuItemName}
                          price={item.menuItemPrice}
                          description={item.menuItemDescription}
                        />
                      </Grid.Column>
                    ))
                  }
                </Grid.Row>
              </Grid>
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className="order-checkout">
              <Header as="h2" inverted>
                Your Order
              </Header>
              <table>
                {
                  this.state.orderItems.length > 0 ? this.state.orderItems.map((item, i) => (
                    <CheckoutItem
                      removeItem={(index) => this.removeItem(index)}
                      quantity={1}
                      name={item.name}
                      price={item.price}
                      index={i}
                      key={i}
                    />
                  )) : 'No items in your order.'
                }
              </table>
              <br />
              <br />
              <Grid textAlign="left">
                <Header inverted as="h3">
                  Total
                </Header>
                <span>
                  20.00
                </span>
              </Grid>
            </div>
            <br />
            <Button size="massive" color="teal" fluid>
              Checkout
            </Button>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

Order.propTypes = {
  restaurant: PropTypes.object,
  menu: PropTypes.array,
};

export default withTracker(({ match }) => {
  const _id = match.params._id;
  const subscription = Meteor.subscribe('Menu');

  return {
    restaurant: Restaurants.findOne({ _id }),
    menu: Menu.find({ menuItemRestaurantId: _id }).fetch(),
    ready: subscription.ready(),
  };
})(Order);
