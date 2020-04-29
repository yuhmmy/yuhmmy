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
            <Card.Header>{this.props.menu.menuItemName}</Card.Header>
            <Card.Description>
              Quantity: {this.props.subOrder.subOrderQuantity}
            </Card.Description>
          </Card.Content>
        </Card>
    );
  }
}
OrderCard.propTypes = {
  name: PropTypes.string,
  order: PropTypes.object,
  quantity: PropTypes.number,
  orders: PropTypes.object,
  menu: PropTypes.object,
  subOrder: PropTypes.object, 
  ready: PropTypes.bool,
};
/** Require a document to be passed to this component. */
 export default withTracker(() => {
   const subscription = Meteor.subscribe('SubOrder');
   const subscription2 = Meteor.subscribe('Menu');
     return {
       subOrder: SubOrders.findOne({ orderID: order._id }),
       menu: Menu.findOne(subOrder.menuItemId),
       ready: subscription.ready() && subscription2.ready(),
     };
 })(OrderCard);
