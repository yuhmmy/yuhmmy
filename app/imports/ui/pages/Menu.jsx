import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Grid, Header, Button } from 'semantic-ui-react';

import { Menu } from '../../api/menu/Menu';
import { Restaurants } from '../../api/restaurant/Restaurant';
import { Orders } from '../../api/order/Order';
import { SubOrders } from '../../api/order/SubOrder';

import MenuCard from '../components/MenuCard';
import CheckoutItem from '../components/CheckoutItem';

class MenuPage extends React.Component {
  constructor() {
    super();

    this.state = {
      orderItems: [],
      total: 0,
    };
  }

  addItem(item) {
    this.setState((state) => ({
      orderItems: [
        ...state.orderItems,
        item,
      ],
      total: state.total + item.price,
    }));
  }

  removeItem(index, price) {
    this.setState(state => ({
      orderItems: state.orderItems.filter((e, i) => i !== index),
      total: state.total - price,
    }));
  }

  submitOrder() {
    const orderCustomerId = Meteor.userId();
    const orderId = Orders.insert({
      orderRestaurantId: this.props.restaurant._id,
      orderCustomerId,
      orderIsFinished: false,
    });

    const accumulate = {};

    this.state.orderItems.forEach(item => {
      if (!accumulate[item._id]) {
        accumulate[item._id] = item.quantity;
      } else {
        accumulate[item._id] += item.quantity;
      }
    });

    Object.keys(accumulate).forEach((key) => {
      SubOrders.insert({
        orderId,
        menuItemId: key,
        subOrderQuantity: accumulate[key],
        subOrderIsFinished: false,
      });
    });

    this.props.history.push(`/order/${orderId}`);
  }

  render() {
    return (
        <div className="order">
          <Grid>
            <Grid.Column width={11}>
              <div className="order-menu">
                <Header as="h2" inverted>
                  {this.props.ready ? this.props.restaurant.restaurantName : ''} Menu
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
                  <tbody>
                  {
                    this.state.orderItems.length > 0 ? this.state.orderItems.map((item, i) => (
                        <CheckoutItem
                            removeItem={(index, price) => this.removeItem(index, price)}
                            quantity={1}
                            name={item.name}
                            price={item.price}
                            index={i}
                            key={i}
                        />
                    )) : 'No items in your order.'
                  }
                  </tbody>
                </table>
                <br/>
                <br/>
                <Grid textAlign="left">
                  <Header inverted as="h3">
                    Total
                  </Header>
                  <span>
                  ${this.state.total}
                </span>
                </Grid>
              </div>
              <br/>
              <Button onClick={() => this.submitOrder()} size="massive" color="teal" fluid>
                Checkout
              </Button>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

MenuPage.propTypes = {
  history: PropTypes.object,
  restaurant: PropTypes.object,
  menu: PropTypes.array,
  ready: PropTypes.bool,
};

export default withTracker(({ match }) => {
  const _id = match.params._id;
  const subscription = Meteor.subscribe('Menu');
  const subscription2 = Meteor.subscribe('Restaurants');
  const subscription3 = Meteor.subscribe('Orders');

  return {
    restaurant: Restaurants.findOne(_id),
    menu: Menu.find({ menuItemRestaurantId: _id }).fetch(),
    ready: subscription.ready() && subscription2.ready() && subscription3.ready(),
  };
})(MenuPage);
