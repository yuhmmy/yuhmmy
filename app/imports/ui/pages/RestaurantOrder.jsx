import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Card } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Orders } from '../../api/order/Order';
import { OrderCard } from '../components/OrderCard';
import { Restaurants } from '../../api/restaurant/Restaurant';
import { SubOrders } from '../../api/order/SubOrder';

class RestaurantOrder extends React.Component {
  render() {
    const orderIds = this.props.order.map((index,a) => index._id);
    orderArray: SubOrders.find({ orderId:{
      $in: orderIds
  }}).fetch(),
    return (
      <div className="order">
        <Grid>
          <Grid.Column width={11}>
            <div className="order-menu">
              <Header as="h2" inverted>Kitchen Queue</Header>
              <div className="order-menu-item">
              <div>
                  <Card.Group>
                      {orders.map((orders, index) =>
                      <OrderCard key={orders._id} subOrder={orders}/>
                    )}
                  </Card.Group>
                </div>
                <br />
              </div>
            </div>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
RestaurantOrder.propTypes = {
  order: PropTypes.array,
  restaurants: PropTypes.array,
  subOrders: PropTypes.array,
  orderArray: PropTypes.array,
  orderIds: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  const restaurantId = match.params._id;
  const subscription = Meteor.subscribe('SubOrders');
  const subscription2 = Meteor.subscribe('Orders');
    return {
      order: Orders.find({ orderRestaurantId: restaurantId }).fetch(),
      subOrders: SubOrders.find({}).fetch(),
      ready: subscription.ready() && subscription2.ready(),
    };
})(RestaurantOrder);
