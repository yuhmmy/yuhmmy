import React from 'react';
import { Header, Container, Input, Button } from 'semantic-ui-react';

class RestaurantSearch extends React.Component {
  render() {
    return (
      <Container style={{ padding: 20 }}>
        <Header inverted as="h1">Search restaurants</Header>
        <Input placeholder="Search" fluid size='huge' action={{ icon: 'search' }} />
        <br />
        <Button>I&apos;m feeling lucky!</Button>
      </Container>
    );
  }
}

export default RestaurantSearch;
