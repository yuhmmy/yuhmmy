import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import Menu from '../pages/Menu';
import Order from '../pages/Order';
import RestaurantOrder from '../pages/RestaurantOrder';
import RestaurantSearch from '../pages/RestaurantSearch';
import RestaurantAdd from '../pages/RestaurantAdd';
import RestaurantEdit from '../pages/RestaurantEdit';
import Profile from '../pages/Profile';
import RestaurantMap from '../pages/RestaurantMap';
import RestaurantReview from '../pages/RestaurantReview';
import MenuAdd from '../pages/MenuAdd';


/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
        <Router>
          <div>
            <NavBar/>
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route path="/signin" component={Signin}/>
              <Route path="/signup" component={Signup}/>
              <Route path="/menu/:_id" component={Menu}/>
              <Route path="/order/:_id" component={Order}/>
              <Route path="/map" component={RestaurantMap}/>
              <Route path="/search" component={RestaurantSearch}/>
              <Route path="/review/:id" component={RestaurantReview}/>
              <Route path="/add" component={RestaurantAdd}/>
              <ProtectedRoute path="/restaurantorder/:_id" component={RestaurantOrder}/>
              <ProtectedRoute path="/menuAdd" component={MenuAdd}/>
              <ProtectedRoute path="/edit/:_id" component={RestaurantEdit}/>
              <ProtectedRoute path="/profile" component={Profile}/>
              <ProtectedRoute path="/signout" component={Signout}/>
              <Route component={NotFound}/>
            </Switch>
            <Footer/>
          </div>
        </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null;
          return isLogged ?
              (<Component {...props} />) :
              (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
              );
        }}
    />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null;
          const isAdmin = Meteor.user().isAdmin === 1;
          return (isLogged && isAdmin) ?
              (<Component {...props} />) :
              (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
              );
        }}
    />
);

/** Require a component and location to be passed to each ProtectedRoute. */
ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

/** Require a component and location to be passed to each AdminProtectedRoute. */
AdminProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

export default App;
