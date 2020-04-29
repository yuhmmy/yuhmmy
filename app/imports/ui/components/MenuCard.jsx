import React from 'react';
import PropTypes from 'prop-types';
import { Image, Icon } from 'semantic-ui-react';

class MenuCard extends React.Component {
  addItem() {
    this.props.addItem({
      _id: this.props.item._id,
      name: this.props.name,
      price: this.props.price,
      quantity: 1,
    });
  }

  render() {
    return (
        <div className="order-menu-item">
          <div className="flex justify-between">
            <div className="flex-auto">
            <span style={{ float: 'left', paddingRight: 5 }}>
              <Image src={this.props.image} avatar/>
            </span>
              <div style={{ fontWeight: 'bold', lineHeight: 0.95 }}>
                {this.props.name}
              </div>
              <div className="secondary-text">
                ${this.props.price}
              </div>
            </div>
            <div className="flex-auto">
              <Icon className="cursor-pointer" onClick={() => this.addItem()} style={{ float: 'right' }} name="plus"/>
            </div>
          </div>
          <br/>
          <div>
            {this.props.description}
          </div>
        </div>
    );
  }
}

MenuCard.propTypes = {
  addItem: PropTypes.func,
  item: PropTypes.object,
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  description: PropTypes.description,
};

export default MenuCard;
