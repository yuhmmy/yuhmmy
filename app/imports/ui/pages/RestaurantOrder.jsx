import React from 'react';
import { Grid, Header, Button, List, Image, Card } from 'semantic-ui-react';
import { Restaurants } from '../../api/restaurant/Restaurant';
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
                    {this.props.restaurants.restaurantOrders.kitchenQueue.map((kitchenQueue, index) => <OrderCard key={kitchenQueue._id} kitchenQueue={kitchenQueue}/>)}
                  </Card.Group>
                </div>
                <br />
              </div>
            </div>
          </Grid.Column>


          <Grid.Column width={11}>
            <div className="order-menu">
              <Header as="h2" inverted>Bar Queue</Header>
              <div className="order-menu-item">
                <div>
                  <Card.Group>
                    {this.props.restaurants.restaurantOrders.drinkQueue.map((drinkQueue, index) => <OrderCard key={kitchenque._id} barQueue={barQueue}/>)}
                  </Card.Group>
                </div>
                <br />
              </div>
            </div>
          </Grid.Column>


          <Grid.Column width={11}>
            <div className="order-menu">
              <Header as="h2" inverted>Wait Queue</Header>
              <div className="order-menu-item">
                <div>
                  <Card.Group>
                    {this.props.Wait.map((Wait, index) => <Orders key={index} Wait = {Wait}/>)}
                  </Card.Group>
                </div>
                <br />
                <div>
                  A Japanese twist on a british classic. Chicken fried with yuzu infused flour.
                </div>
              </div>
            </div>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default withTracker(({ match }) => {
  const restaurantId = match.params._id;
  const subscription = Meteor.subscribe(Restaurants)
    return{
      restaurants: Restaurants.findOne(restaurantId).fetch(),
      ready: subscription.ready(),
    };
})(RestaurantOrder);
