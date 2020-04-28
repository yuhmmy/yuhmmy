import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Card } from 'semantic-ui-react';
import { Menu } from '../../api/menu/Menu';
import { SubOrders } from '../../api/order/SubOrder';
import { Orders } from '../../api/order/Order';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class OrderCard extends React.Component {
  render() {
    return (
        <Card centered>
          <Card.Content>
            <Card.Header>{this.props.name}</Card.Header>
            <Card.Description>
              Quantity: {this.props.orders.subOrderQuantity}
            </Card.Description>
          </Card.Content>
        </Card>
    );
  }
}
OrderCard.propTypes = {
  name: PropTypes.string,
  orders: PropTypes.array,
};
/** Require a document to be passed to this component. */
export default withTracker(({ match }) => {
  const orderId = match.order._id;
  const subscription = Meteor.subscribe('SubOrder');
  const subscription2 = Meteor.subscribe('Menu');
    return {
      orders: SubOrders.findOne(orderId),
      name: Menu.findOne(Orders.menuItemId),
      ready: subscription.ready() && subscription2.ready(),
    };
})(OrderCard);
