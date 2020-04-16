import React from 'react';
import { Grid, Icon, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div className='yUHmmy-landing-background'>
          <Grid container stackable centered columns={3}>
            <Grid.Column textAlign='center'>
              <Icon size='huge' name='users' inverted/>
              <Header as='h1' inverted> UH Manoa Restaurants </Header>
              <Header as='h3' inverted>Interface for restaurants and their customer! Looking for somewhere to eat on
                campus? Easily search for the type of food that you are looking for!</Header>
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Icon size='huge' name='file alternate' inverted/>
              <Header as='h1' inverted>In a Rush? </Header>
              <Header as='h3' inverted>You came to the right place! Order beforehand & your food will *magically* appear
                at your table</Header>
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Icon size='huge' name='calendar check' inverted/>
              <Header as='h1' inverted>$$ </Header>
              <Header as='h3' inverted> Quickly pay and tip on-app for limited interaction between wait staff and
                customers</Header>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

export default Landing;
