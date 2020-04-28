import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Container, Grid, Header } from 'semantic-ui-react';

import { Orders } from '../../api/order/Order';
import { SubOrders } from '../../api/order/SubOrder';

import OrderItem from '../components/OrderItem';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
class Order extends React.Component {
  /** Render the signin form. */
  render() {
    // Otherwise return the Login form.
    return (
      <Container>
        <Grid verticalAlign="middle" centered columns={2}>
          <Grid.Column className="login" style={{ marginTop: 30, marginBottom: 30, padding: 75 }}>
            <div className="spacing">
              <Header inverted as="h2">
                Order
                &nbsp;&nbsp;
                <span className="secondary-text">
                  #{this.props.ready ? this.props.order._id : ''}
                </span>
              </Header>
              <table>
                <tbody>
                  {
                    this.props.subOrders.map(order => (
                      <OrderItem
                        order={this.props.order._id}
                        subOrder={order}
                        restaurant={this.props.order.orderRestaurantId}
                        key={order._id}
                      />
                    ))
                  }
                </tbody>
              </table>
            </div>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Order.propTypes = {
  order: PropTypes.object,
  subOrders: PropTypes.array,
  location: PropTypes.object,
  ready: PropTypes.bool,
};

export default withTracker(({ match }) => {
  const _id = match.params._id;
  const subscription = Meteor.subscribe('Orders');
  const subscription2 = Meteor.subscribe('SubOrders');

  return {
    order: Orders.findOne(_id),
    subOrders: SubOrders.find({ orderId: _id }).fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(Order);
