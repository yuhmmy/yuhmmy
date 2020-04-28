import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Icon } from 'semantic-ui-react';

import { Menu } from '../../api/menu/Menu';

class OrderItem extends React.Component {
  constructor() {
    super();

    this.state = {

    };
  }

  componentDidMount() {}

  render() {
    return (
      <tr style={{ fontSize: 16 }}>
        <td style={{ color: '#119DA4', fontWeight: 'bold', paddingRight: 20 }}>
          {this.props.subOrder.subOrderQuantity}
        </td>
        <td style={{ color: '#DCDCDC', paddingRight: 30 }}>
          {this.props.ready
            ? this.props.menu.filter((items) => items._id === this.props.subOrder.menuItemName)[0].menuItemName
            : ''}
        </td>
        <td style={{ color: '#DCDCDC' }}>
          {this.props.subOrder.subOrderIsFinished ? <Icon name="check" /> : 'Making'}
        </td>
      </tr>
    );
  }
}

OrderItem.propTypes = {
  order: PropTypes.string,
  restautant: PropTypes.string,
  subOrder: PropTypes.object,
  menu: PropTypes.object,
  ready: PropTypes.bool,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('Menu');

  return {
    menu: Menu.find().fetch(),
    ready: subscription.ready(),
  };
})(OrderItem);
