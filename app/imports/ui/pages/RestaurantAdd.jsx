import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Grid, Segment, Header, Container, Loader } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, LongTextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import { Restaurants } from '../../api/restaurant/Restaurant';
import '../../stylesheets/Signup.css';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  restaurantName: String,
  restaurantAddress: Object,
  'restaurantAddress.street': String,
  'restaurantAddress.city': String,
  'restaurantAddress.state': String,
  'restaurantAddress.zipCode': String,
  restaurantImage: String,
  restaurantDesc: String,
});

/** Renders the Page for adding a document. */
class RestaurantAdd extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { restaurantName, restaurantAddress, restaurantImage, restaurantDesc } = data;
    const restaurantOwner = Meteor.userId();
    Restaurants.insert({ restaurantName, restaurantAddress, restaurantImage, restaurantDesc, restaurantOwner },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Item added successfully', 'success');
            formRef.reset();
          }
        });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    let fRef = null;
    return (
        <Container id="bodyid">
          <Grid container centered>
            <Grid.Column>
              <AutoForm ref={ref => {
                fRef = ref;
              }} schema={formSchema} inverted onSubmit={data => this.submit(data, fRef)}>
                <Segment stacked padding="very" className="segment" inverted>
                  <Header as='h2' textAlign='center' className='headerColor' color='teal'> Add Your Restaurant </Header>
                  <TextField
                      label='Restaurant Name:'
                      name='restaurantName'
                      placeholder='McDonald&apos;s'
                  />
                  <TextField
                      label='Restaurant Street:'
                      name='restaurantAddress.street'
                      placeholder='2121 S King St'
                  />
                  <TextField
                      label='Restaurant City:'
                      name='restaurantAddress.city'
                      placeholder='Honolulu'
                  />
                  <TextField
                      label='Restaurant State:'
                      name='restaurantAddress.state'
                      placeholder='HI'
                  />
                  <TextField
                      label='Restaurant Zip Code:'
                      name='restaurantAddress.zipCode'
                      placeholder='96826'
                  />
                  <TextField
                      label='Restaurant Image:'
                      name='restaurantImage'
                      placeholder='McD.jpg'
                  />
                  <LongTextField
                      label='Restaurant Description:'
                      name='restaurantDesc'
                      placeholder='We have the finest nuggets that will make you say mmmmm I&apos;m lovin it'
                  />
                  <SubmitField value='Submit'/>
                  <ErrorsField/>
                </Segment>
              </AutoForm>
            </Grid.Column>
          </Grid>
        </Container>
    );
  }
}

RestaurantAdd.propTypes = {
  userData: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('Meteor.users.user');

  return {
    userData: Meteor.users.find({}).fetch(),
    ready: subscription.ready(),
  };
})(RestaurantAdd);
