import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header, Icon } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '10px' };
    return (
        <Menu style={menuStyle} attached="top" borderless inverted>
          <Menu.Item as={NavLink} activeClassName="" exact to="/">
            <Header inverted as='h1' color='teal'>yUHmmy</Header>
          </Menu.Item>
          {this.props.currentUser ? (
              [<Menu.Item as={NavLink} activeClassName="active" exact to="/search" key='search'>Search</Menu.Item>,
                <Menu.Item as={NavLink} activeClassName="active" exact to="/profile" key='profile'>Profile</Menu.Item>,
                <Menu.Item as={NavLink} activeClassName="active" exact to="/map" key='map'>Map</Menu.Item>,
                <Menu.Item as={NavLink} activeClassName="active" exact to="/menu/9" key='menu/9'>Menu</Menu.Item>,
                <Menu.Item as={NavLink} activeClassName="active" exact to="/add" key='add'>Add Restaurant</Menu.Item>,
                <Menu.Item as={NavLink} activeClassName="active" exact to="/menuAdd"
                           key='menuAdd'>Add Menu Item</Menu.Item>,
                <Menu.Item as={NavLink} activeClassName="active" exact to="/restaurantorder/9"
                           key='/restaurantorder/9'>Orders</Menu.Item>,
              ]) : ''}
          {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              [<Menu.Item as={NavLink} activeClassName="active" exact to="/restaurantorder"
                          key='admin'> Orders </Menu.Item>,
                <Menu.Item as={NavLink} activeClassName="active" exact to="/Order" key='Order'>Menu</Menu.Item>,
                <Menu.Item as={NavLink} activeClassName="active" exact to="/RestaurantOrder"
                           key='order'>Orders</Menu.Item>,
                <Menu.Item as={NavLink} activeClassName="active" exact to="/AddRestaurant"
                           key='AddRestaurant'>Add Your Restaurant</Menu.Item>,
                <Menu.Item as={NavLink} activeClassName="active" exact to="/menuAdd"
                           key='menuAdd'>Add Menu Item</Menu.Item>,
                <Menu.Item as={NavLink} activeClassName="active" exact to="/RestaurantSearch"
                           key='RestaurantSearch'>Search</Menu.Item>,
              ]
          ) : ''}
          <Menu.Item position="right">
            {this.props.currentUser === '' ? (
                [
                  <Menu.Item as={NavLink} activeClassName="active" exact to="/Signin" key='Signin'>
                    <Icon name='user'/> Sign In
                  </Menu.Item>,
                  <Menu.Item as={NavLink} activeClassName="active" icon="add user" exact to="/Signup" key='Signup'>
                    <Icon name='add user'/> Sign Up
                  </Menu.Item>,
                ]
            ) : (
                <Dropdown text={this.props.currentUser} pointing="top right" icon={'user'}>
                  <Dropdown.Menu>
                    <Dropdown.Item icon="sign out" text="Sign Out" as={NavLink} exact to="/Signout"/>
                  </Dropdown.Menu>
                </Dropdown>
            )}
          </Menu.Item>
        </Menu>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
