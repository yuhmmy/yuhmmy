import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

class CheckoutItem extends React.Component {
  render() {
    return (
      <div className="flex" style={{ fontSize: 16 }}>
        <span style={{ color: '#119DA4', fontWeight: 'bold', paddingRight: 20 }}>
          {this.props.quantity}
        </span>
        <span style={{ color: '#DCDCDC', paddingRight: 30 }}>
          {this.props.name}
        </span>
        <span style={{ color: '#DCDCDC', paddingRight: 20 }}>
          {this.props.price}
        </span>
        <span style={{ color: '#DCDCDC' }}>
          <Icon name="trash" />
        </span>
      </div>
    );
  }
}

CheckoutItem.propTypes = {
  quantity: PropTypes.number,
  name: PropTypes.name,
  price: PropTypes.price,
};

export default CheckoutItem;
