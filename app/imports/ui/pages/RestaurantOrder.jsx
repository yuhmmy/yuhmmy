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
                Kitchen Queue
              </Header>
              <div className="order-menu-item">
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
          <Grid.Column width={11}>
            <div className="order-menu">
              <Header as="h2" inverted>
                Bar Queue
              </Header>
              <div className="order-menu-item">
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
          <Grid.Column width={11}>
            <div className="order-menu">
              <Header as="h2" inverted>
                Wait Queue
              </Header>
              <div className="order-menu-item">
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
        </Grid>
      </div>
    );
  }
}

export default Order;
