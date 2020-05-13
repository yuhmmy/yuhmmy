import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment, Button, Select, Loader } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import { Ethnicity } from '../../api/menu/Ethnicity';
import '../../stylesheets/Signup.css';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
const genderOptions = [
  { key: 'm', text: 'Male', value: 'M' },
  { key: 'f', text: 'Female', value: 'F' },
  { key: 'z', text: 'ZJ', value: 'Z' },
];

const EthnicityDb = Meteor.subscribe('Ethnicity');


const dietaryOptions = [
  { key: 've', text: 'Vegan', value: 1 },
  { key: 'v', text: 'Vegetarian', value: 2 },
  { key: 'pesc', text: 'Pescetarian', value: 3 },
  { key: 'meat', text: 'Meat', value: 4 },
];

class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      age: 1,
      gender: 'M',
      dietary: 4,
      error: '',
      redirectToReferer: false,
    };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  /** Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { email, password, firstName, lastName, age, gender, dietary, ethnicity } = this.state;
    const pref = { ethnicity: ethnicity, meat: dietary };
    Accounts.createUser(
        {
          username: email,
          email: email,
          password: password,
        },
        (err) => {
          if (err) {
            this.setState({ error: err.reason });
          } else {

            // Update custom fields
            const id = Meteor.userId();
            Meteor.users.update({ _id: id }, {
              $set: {
                isAdmin: 0,
                age: age,
                gender: gender,
                preferences: pref,
                name: {
                  firstName: firstName,
                  lastName: lastName,
                },
              },
            });
            this.setState({ error: '', redirectToReferer: true });
          }
        },
    );
  };

  cancel = () => {
    this.setState({ error: '', redirectToReferer: true });
  };

  render() {
    return (EthnicityDb.ready()) ? this.renderForm() : <Loader active>Getting data</Loader>;
  }

  /** Display the signup form. Redirect to add page after successful registration and login. */
  renderForm() {
    const ethnicities = Ethnicity.find().fetch();
    const ethnicityOptions = ethnicities.map(ethnicity => ({
      key: ethnicity._id,
      text: ethnicity.ethnicityDesc,
      value: ethnicity.ethnicityId,
    }));
    console.log(ethnicityOptions);

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
                      inverted
                  />
                  <Form.Input
                      icon="lock"
                      iconPosition="left"
                      name="password"
                      placeholder="Password"
                      type="password"
                      onChange={this.handleChange}
                      inverted
                  />
                  <Form.Group widths='equal'>
                    <Form.Input
                        inverted
                        fluid
                        name="firstName"
                        placeholder="First"
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        inverted
                        fluid
                        name="lastName"
                        placeholder="Last"
                        onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group widths='equal'>
                    <Form.Input
                        inverted
                        fluid
                        name="gender"
                        placeholder="Gender"
                        control={Select}
                        options={genderOptions}
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        inverted
                        fluid
                        name="age"
                        placeholder="Age"
                        type="number"
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        inverted
                        fluid
                        name="dietary"
                        placeholder="Dietary"
                        control={Select}
                        options={dietaryOptions}
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        inverted
                        fluid
                        multiple
                        name="ethnicity"
                        placeholder="Favorites"
                        control={Select}
                        options={ethnicityOptions}
                        onChange={this.handleChange}
                    />
                  </Form.Group>
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
