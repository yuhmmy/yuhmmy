// eslint-disable-next-line max-classes-per-file
import React from 'react';
import { Header, Image, Grid, Button, Icon } from 'semantic-ui-react';
import { Fade } from 'react-slideshow-image';
import { Link } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div>
          <Call/>
          <Info/>
          <Images/>
        </div>
    );
  }
}

class Call extends React.Component {
  render() {
    return (
        <Grid className="landing" verticalAlign="middle" textAlign='center' columns={2}>
          <Grid.Column>
            <Header inverted as="h1">Food ordering, simplified.</Header>
            <p style={{ color: '#999' }}>Never wait in line for your food order again!</p>
            <Link to="/signup">
              <Button>
                Sign up
              </Button>
            </Link>
          </Grid.Column>
          <Grid.Column>
            <Image src="images/donut_love.svg"/>
          </Grid.Column>
        </Grid>
    );
  }
}

class Info extends React.Component {
  render() {
    return (
        <div className="landing-info">
          <Grid container verticalAlign="middle" textAlign='center' columns={3}>
            <Grid.Column textAlign='center'>
              <Icon size='huge' name='search' inverted/>
              <Header inverted as='h2' textAlign='center'>
                Food Search
              </Header>
              <p style={{ color: '#999' }}>
                Looking for somewhere to eat on campus? Easily search for what that you are looking for or view the map!
              </p>
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Icon size='huge' name='food' inverted/>
              <Header inverted as='h2' textAlign='center'>
                Easy Ordering
              </Header>
              <p style={{ color: '#999' }}>
                No time between classes? Order beforehand to practice social distancing between wait staff & customers!
              </p>
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Icon size='huge' name='money' inverted/>
              <Header inverted as='h2' textAlign='center'>
                Payment Planning
              </Header>
              <p style={{ color: '#999' }}>
                On a budget? View prices of menu items and see your total without needing to set foot in the restaurant!
              </p>
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
        <div className='landing-images'>
          <Grid container stackable centered columns={1}>
            <Grid.Column textAlign='center'>
              <Header inverted as='h2' textAlign='center'>
                Top 5 take-out locations at UH Manoa during Covid-19:
              </Header>
            </Grid.Column>
          </Grid>
          <br/>
          <Fade {...switchPic}>
            <div className="new">
              <img className='ui tiny rounded centered image' src='images/bale.jpeg' style={imageStyle} alt='food1'/>
            </div>
            <div className="new">
              <img className='ui tiny rounded centered image' src='images/jj.jpg' style={imageStyle} alt='food2'/>
            </div>
            <div className="new">
              <img className='ui tiny rounded centered image' src='images/ll.png' style={imageStyle} alt='food3'/>
            </div>
            <div className="new">
              <img className='ui tiny rounded centered image'
                   src='https://cdn.freebiesupply.com/images/large/2x/pizza-hut-logo-png-transparent.png'
                   style={imageStyle} alt='food4'/>
            </div>
            <div className="new">
              <img className='ui tiny rounded centered image' src='images/panda.png' style={imageStyle} alt='food5'/>
            </div>
          </Fade>
        </div>
    );
  }
}

export default Landing;
