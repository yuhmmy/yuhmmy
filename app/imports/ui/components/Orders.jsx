import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Orders extends React.Component {
  render() {
    return (
        <Card centered>
          <Card.Content>
            <Card.Header>{this.props} {this.props.contact.itemName}</Card.Header>
            <Card.Meta>{this.props.order.table}</Card.Meta>
            <Card.Description>
              Quantity: {this.props.order.quantity}
            </Card.Description>
            {this.props.order.preference}
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
Orders.propTypes = {
  order: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Orders);
