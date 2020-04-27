import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Grid, Header, Button, List } from 'semantic-ui-react';

import { Menu } from '../../api/menu/Menu';

import MenuCard from '../components/MenuCard';
import CheckoutItem from '../components/CheckoutItem';

class Order extends React.Component {
  constructor() {
    super();

    this.state = {
      menuItems: [],
      orderItems: [],
    };
  }

  render() {
    return (
      <div className="order">
        <Grid>
          <Grid.Column width={11}>
            <div className="order-menu">
              <Header as="h2" inverted>
                Ala Carte
              </Header>
              <Grid columns={3}>
                <Grid.Row>
                  <Grid.Column>
                    <MenuCard
                      image="https://react.semantic-ui.com/images/wireframe/square-image.png"
                      name="Chicken Fingers"
                      price={13.99}
                      description="A Japanese twist on a british classic. Chicken fried with yuzu infused flour."
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <MenuCard
                      image="https://react.semantic-ui.com/images/wireframe/square-image.png"
                      name="Chicken Fingers"
                      price={13.99}
                      description="A Japanese twist on a british classic. Chicken fried with yuzu infused flour."
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <MenuCard
                      image="https://react.semantic-ui.com/images/wireframe/square-image.png"
                      name="Chicken Fingers"
                      price={13.99}
                      description="A Japanese twist on a british classic. Chicken fried with yuzu infused flour."
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <MenuCard
                      image="https://react.semantic-ui.com/images/wireframe/square-image.png"
                      name="Chicken Fingers"
                      price={13.99}
                      description="A Japanese twist on a british classic. Chicken fried with yuzu infused flour."
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className="order-checkout">
              <Header as="h2" inverted>
                Your Order
              </Header>
              <List>
                <List.Item>
                  <CheckoutItem
                    quantity={1}
                    name="Chicken Fingers"
                    price={13.99}
                  />
                </List.Item>
                <List.Item>
                  <CheckoutItem
                    quantity={1}
                    name="Chicken Fingers"
                    price={13.99}
                  />
                </List.Item>
              </List>
              <br />
              <Grid textAlign="left">
                <Header inverted as="h3">
                  Total
                </Header>
                <span>
                  20.00
                </span>
              </Grid>
            </div>
            <br />
            <Button size="massive" color="teal" fluid>
              Checkout
            </Button>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default withTracker(() => {
  const subscription = Meteor.subscribe('Menu');

  return {
    doc: Menu.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Order);
