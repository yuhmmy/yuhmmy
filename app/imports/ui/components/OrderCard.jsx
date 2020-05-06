import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Card, Loader } from 'semantic-ui-react';
import { Menu } from '../../api/menu/Menu';
import { SubOrders } from '../../api/order/SubOrder';
import { Orders } from '../../api/order/Order';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class OrderCard extends React.Component {
  render() {
    return (this.props.ready) ? this.renderComp() : <Loader active>Getting data</Loader>;
  }
  renderComp() {
    const itemId = this.props.subOrder.menuItemId;
    const menuItem = this.props.menu.find(item => item._id === itemId);
    console.log('props', this.props);
    console.log('menuItem', menuItem.menuItemName);
    
   // const name = menuItem.menuItemDescription;
   
    return (
        <Card centered>
          <Card.Content>
            {/* {console.log(this.props.subOrder)} */}
            <Card.Header>{menuItem.menuItemName}</Card.Header>
            <Card.Description>
              Quantity: {this.props.subOrder.subOrderQuantity}
            </Card.Description>
          </Card.Content>
        </Card>
    );
  }
}

OrderCard.propTypes = {
  menu: PropTypes.array,
  subOrder: PropTypes.object,
  itemName: PropTypes.string,
};
export default withTracker(() => {
  const subscription = Meteor.subscribe('Menu');
  return {
    menu: Menu.find().fetch(),
    ready: subscription.ready(),
  };
})(OrderCard);
// export default OrderCard;
