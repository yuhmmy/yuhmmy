import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Card } from 'semantic-ui-react';
import { Menu } from '../../api/menu/Menu';
import { SubOrders } from '../../api/order/SubOrder';
import { Orders } from '../../api/order/Order';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class OrderCard extends React.Component {
  render() {
    return (
        <Card centered>
          <Card.Content>
            <Card.Header>A</Card.Header>
            <Card.Description>
              Quantity: {this.props.subOrder.subOrderQuantity}
            </Card.Description>
          </Card.Content>
        </Card>
    );
  }
}
OrderCard.propTypes = {
  subOrder: PropTypes.object,
};
// export default withTracker(() => {
//   const subscription = Meteor.subscribe('Menu');
//   return {
//     menu: Menu.find().fetch,
//     ready: subscription.ready(),
//   };
// })(OrderCard);
export default OrderCard;
