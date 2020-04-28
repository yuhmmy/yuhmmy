import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class OrderCard extends React.Component {
  render() {
    return (
        <Card centered>
          <Card.Content>
            <Card.Header>{this.props} {this.props.contact.itemName}</Card.Header>
            <Card.Meta>{this.props.order.table}</Card.Meta>
            <Card.Description>
              Quantity: {this.props.quantity}
              Preference: {this.props.preference}
              Table: {this.props.table}
            </Card.Description>
          </Card.Content>
        </Card>
    );
  }
}
/** Require a document to be passed to this component. */
Orders.propTypes = {
  name: PropTypes.string,
  quantity: PropTypes.number,
  table: PropTypes.number,
  preference: PropTypes.string,
};

export default OrderCard;
