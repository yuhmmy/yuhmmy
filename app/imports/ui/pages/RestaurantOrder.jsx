import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Card } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Orders } from '../../api/order/Order';
import { OrderCard } from '/imports/ui/components/OrderCard';
import { Restaurants } from '../../api/restaurant/Restaurant';

class RestaurantOrder extends React.Component {
  render() {
    return (
      <div className="order">
        <Grid>
          <Grid.Column width={11}>
            <div className="order-menu">
              <Header as="h2" inverted>Kitchen Queue</Header>
              <div className="order-menu-item">
                <div>
                  <Card.Group>
                    {this.props.orders.map((orders, index) => <OrderCard key={orders._id} orders={orders}/>)}
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
  orders: PropTypes.array.isRequired,
  restaurants: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  const restaurantId = match.params._id;
  const subscription = Meteor.subscribe('Restaurants');
  const subscription2 = Meteor.subscribe('Orders');
    return {
      orders: Orders.find({ orderRestaurantId: restaurantId }).fetch(),
      restaurant: Restaurants.findOne(restaurantId),
      ready: subscription.ready() && subscription2.ready(),
    };
})(RestaurantOrder);
