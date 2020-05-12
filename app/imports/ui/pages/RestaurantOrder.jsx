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
    }).fetch();
    console.log(orderArray);
    if (this.props.restaurants.length < 1) {
      return <Header as="h1" inverted>Forbidden</Header>
    } else {
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
}

RestaurantOrder.propTypes = {
  order: PropTypes.array,
  subOrders: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  const restaurantId = match.params._id;
  const subscription = Meteor.subscribe('SubOrders');
  const subscription2 = Meteor.subscribe('Orders');
  const subscription3 = Meteor.subscribe('Restaurants');
  const ownerId = Meteor.userId();
  return {
    restaurants: Restaurants.find({ restaurantOwner: ownerId, _id: restaurantId }).fetch(),
    order: Orders.find({ orderRestaurantId: restaurantId }).fetch(),
    subOrders: SubOrders.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready() && subscription3.ready(),
  };
})(RestaurantOrder);
