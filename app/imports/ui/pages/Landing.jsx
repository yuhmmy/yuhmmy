// eslint-disable-next-line max-classes-per-file
import React from 'react';
import { Header, Image, Input, Grid, Button, Icon } from 'semantic-ui-react';
import { Fade } from 'react-slideshow-image';
import { NavLink } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div>
          <Call/>
          <Info/>
          <hr/>
          <Images/>
          <hr/>
          <Feedback/>
        </div>
    );
  }
}

class Call extends React.Component {
  render() {
    const buttonStyle = { width: '260px', height: '51px' };
    return (
        <div className='yUHmmy-landing-background'>
          <Image
              className='back'
              src='images/landing.png' centered/>
          <Grid container stackable centered columns={1}>
            <Grid.Column textAlign='center'>
              <Header as='h1' className='landing-text-color' textAlign='center'>
                Sign in to access the menu and get started on your yUHmmy journey!</Header>
              <Grid container stackable centered columns={1}>
                <Grid.Column textAlign='center'>
                  <Button as={NavLink} activeClassName="" exact to="/Signup"
                          style={buttonStyle}
                          className='ui button' size='huge' center floated='center'> SIGN UP!</Button>
                </Grid.Column>
              </Grid>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

class Info extends React.Component {
  render() {
    return (
        <div className='landing-info'>
          <Grid container stackable centered columns={3}>
            <Grid.Column textAlign='center'>
              <Icon size='huge' name='search' inverted/>
              <Header as='h2' textAlign='center' color='blue'>
                UH Manoa Restaurants: Interface for restaurants and their customers! Looking for somewhere to eat on
                campus? Easily search for the type of food that you are looking for! </Header>
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Icon size='huge' name='food' inverted/>
              <Header as='h2' textAlign='center' color='blue'>
                No time between your classes? No Worries! Order beforehand & your food will *magically* appear
                at your table </Header>
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Icon size='huge' name='money' inverted/>
              <Header as='h2' textAlign='center' color='blue'>
                $ Quickly pay and tip on-app for limited interaction between wait staff and customers $ </Header>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

class Images extends React.Component {
  render() {

    const switchPic = {
      duration: 2000,
      transitionDuration: 50,
    };

    const imageStyle = { width: '300px' };

    return (
        <div className='Images'>
          <Grid container stackable centered columns={1}>
            <Grid.Column textAlign='center'>
              <Header as='h1' color='blue'>Unsure where to eat? Try Here! </Header>
            </Grid.Column>
          </Grid>
          <Fade {...switchPic}>
            <div className="new">
              <img className='ui tiny rounded centered image' src='images/bale.jpeg' style={imageStyle} alt='food1'/>
            </div>
            <div className="new">
              <img className='ui tiny rounded centered image' src='images/jamba.png' style={imageStyle} alt='food2'/>
            </div>
            <div className="new">
              <img className='ui tiny rounded centered image' src='images/ll.png' style={imageStyle} alt='food3'/>
            </div>
            <div className="new">
              <img className='ui tiny rounded centered image' src='images/zip.png' style={imageStyle} alt='food4'/>
            </div>
          </Fade>
        </div>
    );
  }
}

class Feedback extends React.Component {
  render() {
    return (
        <div className='Feedback'>
          <Grid container stackable centered columns={1}>
            <Grid.Column textAlign='center'>
              <Header as='h2' color='blue'>Never wait for your food order again!<br/></Header>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

export default Landing;
