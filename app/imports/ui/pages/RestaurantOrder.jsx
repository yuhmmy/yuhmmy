import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Loader } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Orders } from '../../api/order/Order';
import OrderCard from '../components/OrderCard';
import { SubOrders } from '../../api/order/SubOrder';
import { Restaurants } from '../../api/restaurant/Restaurant';

class RestaurantOrder extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const orderIds = this.props.order.map(index => index._id);

    const orderArray = SubOrders.find({
      orderId: {
        $in: orderIds,
      },
      subOrderIsFinished: false,
    }).fetch();

    if (this.props.restaurants[0].restaurantOwner === this.props.userData[0]._id) {
      return <Header as="h1" inverted>FORBIDDEN - Access for Admins Only</Header>;
    }

    return (
        <div className="order">
          <div className="order-menu">
            <Header as="h2" inverted>Kitchen Queue</Header>
            <Grid columns={3} padded>
              <Grid.Row>
                {
                  orderArray.map(orders => (
                      <OrderCard
                          subOrder={orders}
                          key={orders._id}
                      />
                  ))
                }
              </Grid.Row>
            </Grid>
          </div>
        </div>
    );
  }
}

RestaurantOrder.propTypes = {
  order: PropTypes.array,
  subOrders: PropTypes.array,
  ready: PropTypes.bool.isRequired,
  restaurants: PropTypes.array,
  userData: PropTypes.array.isRequired,
};

export default withTracker(({ match }) => {
  const restaurantId = match.params._id.toString();
  const subscription = Meteor.subscribe('SubOrders');
  const subscription2 = Meteor.subscribe('Orders');
  const subscription3 = Meteor.subscribe('Restaurants');
  const subscription4 = Meteor.subscribe('Meteor.users.user');

  return {
    restaurants: Restaurants.find({ _id: restaurantId }).fetch(),
    order: Orders.find({ orderRestaurantId: restaurantId }).fetch(),
    subOrders: SubOrders.find({}).fetch(),
    userData: Meteor.users.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready() && subscription3.ready() && subscription4.ready(),
  };
})(RestaurantOrder);
