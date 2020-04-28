import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

class CheckoutItem extends React.Component {
  removeItem() {
    this.props.removeItem(this.props.index, this.props.price);
  }

  render() {
    return (
        <tr style={{ fontSize: 16 }}>
          <td style={{ color: '#119DA4', fontWeight: 'bold', paddingRight: 20 }}>
            {this.props.quantity}
          </td>
          <td style={{ color: '#DCDCDC', paddingRight: 30 }}>
            {this.props.name}
          </td>
          <td style={{ color: '#DCDCDC', paddingRight: 20 }}>
            ${this.props.price}
          </td>
          <td style={{ color: '#DCDCDC' }}>
            <Icon className="cursor-pointer" onClick={() => this.removeItem()} name="trash"/>
          </td>
        </tr>
    );
  }
}

CheckoutItem.propTypes = {
  removeItem: PropTypes.func,
  quantity: PropTypes.number,
  name: PropTypes.string,
  price: PropTypes.number,
  index: PropTypes.number,
};

export default CheckoutItem;
