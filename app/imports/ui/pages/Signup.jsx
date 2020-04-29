import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment, Button } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import '../../stylesheets/Signup.css';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  /** Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { email, password, firstName, lastName } = this.state;
    const id = Accounts.createUser(
        {
          email,
          username: email,
          password,
        },
        (err) => {
          if (err) {
            this.setState({ error: err.reason });
          } else {
            this.setState({ error: '', redirectToReferer: true });
          }
        },
    );
    // Update custom fields
    Meteor.users.update(id, {
          $set: {
            // age: age,
            // gender: gender,
            // preferences: pref,
            name: {
              firstName: firstName,
              lastName: lastName,
            },
          },
        },
    );
  };

  cancel = () => {
    this.setState({ error: '', redirectToReferer: true });
  };

  /** Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/add' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
        <Container id="bodyid">
          <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
            <Grid.Column>
              <Form onSubmit={this.submit} className="textBox">
                <Segment stacked padding="very" className="segment">
                  <Header as="h2" textAlign="center" className="headerColor">
                    Registration
                  </Header>
                  <Form.Input
                      name="email"
                      type="email"
                      placeholder="E-mail address"
                      onChange={this.handleChange}
                      className="textBox"
                  />
                  <Form.Group widths='equal'>
                    <Form.Input
                        fluid
                        name="firstName"
                        placeholder="First"
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        fluid
                        name="lastName"
                        placeholder="Last"
                        onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Input
                      icon="lock"
                      iconPosition="left"
                      name="password"
                      placeholder="Password"
                      type="password"
                      onChange={this.handleChange}
                  />
                  <div className="spacing">
                    <Button type="submit" fluid content="Create Account" id="primaryButton"/>
                  </div>
                  <div>
                    <Button
                        id="secondaryButton"
                        type="cancel"
                        className="secondaryButtonColor"
                        fluid
                        content="Cancel"
                        onClick={() => this.cancel()}
                    />
                  </div>
                </Segment>
              </Form>
              <Message id="loginBanner">
                Already have an account? Login <Link to="/signin">here</Link>
              </Message>
              {this.state.error === '' ? (
                  ''
              ) : (
                  <Message
                      error
                      header="Registration was not successful"
                      content={this.state.error}
                  />
              )}
            </Grid.Column>
          </Grid>
        </Container>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
