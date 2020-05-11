import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Loader, Button } from 'semantic-ui-react';
import { Menu } from '../../api/menu/Menu';
import { SubOrders } from '../../api/order/SubOrder';
import { Orders } from '../../api/order/Order';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class OrderCard extends React.Component {

  deleteOrder(suborderId, orderId) {
    SubOrders.remove(suborderId);
    Orders.remove(orderId);
  }

  render() {
    return (this.props.ready) ? this.renderComp() : <Loader active>Getting data</Loader>;
  }

  renderComp() {
    const itemId = this.props.subOrder.menuItemId;
    const menuItem = this.props.menu.find(item => item._id === itemId);
    console.log('props', this.props);
    console.log('menuItem', menuItem.menuItemName);
    return (
        <div>
          <div className="order-card-item">
            <div>{menuItem.menuItemName}</div>
            <div>Quantity: {this.props.subOrder.subOrderQuantity}</div>
            <br/>
            <Button onClick={
              () => this.deleteOrder(this.props.subOrder._id, this.props.subOrder.orderId)} size="massive" color="teal"
                    fluid>
              Done
            </Button>
          </div>
        </div>
    );
  }
}

OrderCard.propTypes = {
  menu: PropTypes.array,
  subOrder: PropTypes.object,
  itemName: PropTypes.string,
  ready: PropTypes.bool.isRequired,
};
export default withTracker(() => {
  const subscription = Meteor.subscribe('Menu');
  return {
    menu: Menu.find().fetch(),
    ready: subscription.ready(),
  };
})(OrderCard);
// export default OrderCard;
