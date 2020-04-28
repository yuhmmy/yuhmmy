import React from 'react';
import { Grid, Header, Button, List, Image, Card } from 'semantic-ui-react';
import { Orders } from '../../api/restaurant/Order';
import { OrderCard } from '/imports/ui/components/OrderCard'
class RestaurantOrder extends React.Component {
  render() {
    return (
      <div className="order">
        <Grid>
          <Grid.Column width={11}>
            <div className="order-menu">
              <Header as="h2" inverted>Kitchen Queue</Header>
              <div className="order-menu-item">
                <div>
                  <Card.Group>
                    {this.props.orders.map((orders, index) => <OrderCard key={orders._id} orders={order}/>)}
                  </Card.Group>
                </div>
                <br />
              </div>
            </div>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
export default withTracker(({ match }) => {
  const orderId = match.params._id;
  const subscription = Meteor.subscribe(Restaurants)
    return{
      orders: Orders.findOne(orderId).fetch(),
      ready: subscription.ready(),
    };
})(RestaurantOrder);
