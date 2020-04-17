import React from 'react';
import { Grid, Header, Button, List, Image } from 'semantic-ui-react';

class Order extends React.Component {
  render() {
    return (
      <div className="order">
        <Grid>
          <Grid.Column width={11}>
            <div className="order-menu">
              <Header as="h2" inverted>
                Ala Carte
              </Header>
              <div class="order-menu-item">
                <div>
                  <span style={{ float: 'left' }}>
                    <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' avatar />
                  </span>
                  <div style={{ fontWeight: 'bold' }}>
                    Chicken Fingers
                  </div>
                  <div style={{ fontSize: '12px', color: 'rgb(153, 153, 153)' }}>
                    13.99
                  </div>
                </div>
                <br />
                <div>
                  A Japanese twist on a british classic. Chicken fried with yuzu infused flour.
                </div>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className="order-checkout">
              <Header as="h2" inverted>
                Your Order
              </Header>
              <List>
                <List.Item>
                  <span style={{ color: '#119DA4', fontWeight: 'bold', marginRight: 3 }}>
                    1
                  </span>
                  <span style={{ color: '#DCDCDC', paddingRight: 3 }}>
                    Chicken Fingers
                  </span>
                  <span style={{ color: '#DCDCDC', marginRight: 3 }}>
                    13.99
                  </span>
                </List.Item>
                <List.Item>
                  <span style={{ color: '#119DA4', fontWeight: 'bold', marginRight: 3 }}>
                    2
                  </span>
                  <span style={{ color: '#DCDCDC', paddingRight: 3 }}>
                    Shoyu Ramen
                  </span>
                  <span style={{ color: '#DCDCDC', marginRight: 3 }}>
                    15.99
                  </span>
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

export default Order;
