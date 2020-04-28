import React from 'react';
import { Card, Image, MenuItem } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

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

/** Require a document to be passed to this component. */
export default withTracker(({ match }) => {
  const orderId = order._Id
  const subscription = Meteor.subscribe(SubOrder)
  const subscription2 = Meteor.subscribe(Menu)
    return{
      orders: Suborders.findOne(orderId),
      name: Menu.findOne(orders.menuItemId),
      ready: subscription.ready() && subscription2.ready(), 
    };
})(OrderCard);