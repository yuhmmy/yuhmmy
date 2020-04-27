import React from 'react';
import { Grid, Header, Button, List, Image, Card } from 'semantic-ui-react';
import { Restaurants } from '../../api/restaurant/Restaurant';
import { Orders } from '/imports/ui/components/Orders'
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
                    {this.props.Kitchen.map((Kitchen, index) => <Orders key={index} Kitchen={Kitchen}/>)}
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
                    {this.props.Bar.map((Bar, index) => <Orders key={index} Bar={Bar}/>)}
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

export default withTracker(() => {
  const subscription = Meteor.subscribe(Restaurants)
    return{
      Kitchen: Restaurants.find({}).fetch(),
      Bar: Restaurants.find({}).fetch(),
      Wait: Restaurants.find({}).fetch(),
      ready: subscription.ready(),
    };
})(RestaurantOrder);
