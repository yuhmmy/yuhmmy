import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
// import NumField from 'uniforms-semantic//NumField';
// import HiddenField from 'uniforms-semantic/HiddenField';
// import ErrorsField from 'uniforms-semantic/ErrorsField';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import { Restaurants } from '../../api/restaurant/Restaurant';
// import { Ethnicity } from '../../api/menu/Ethnicity';
// import { Meat } from '../../api/menu/Meat';

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
  restaurantOwner: String,
});

/** Renders the Page for adding a document. */
class RestaurantAdd extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const {
      restaurantName, restaurantAddress, restaurantImage, restaurantDesc, restaurantOwner,
    } = data;
    // const owner = Meteor.user().username;
    Restaurants.insert({
          restaurantName, restaurantAddress, restaurantImage, restaurantDesc, restaurantOwner,
        },
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
    let fRef = null;
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add Your Restaurant</Header>
            <AutoForm ref={ref => {
              fRef = ref;
            }} schema={formSchema} onSubmit={data => this.submit(data, fRef)}>
              <Grid.Row columns={3}>
                <Grid.Column>
                  <TextField label='Restaurant Name:' name='restaurantName'
                             placeholder='Your Restaurant Name'/>
                </Grid.Column>
                <Grid.Column>
                  <TextField label='Restaurant Address:' name='restaurantAddress'
                             placeholder='Your Restaurant Address'/>
                </Grid.Column>
                <Grid.Column>
                  <TextField label='Restaurant Image:' name='restaurantImage'
                             placeholder='RestaurantImage.jpg'/>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <TextField label='Restaurant Owner:' name='restaurantOwner'
                             placeholder='Your Restaurant Owner'/>
                </Grid.Column>
                <Grid.Column>
                  <LongTextField label='Restaurant Description:' name='restaurantDesc'
                                 placeholder='Describe Your Restaurant...'/>
                </Grid.Column>
              </Grid.Row>
              <SubmitField value='Submit'/>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require an array of Stuff documents in the props. */

RestaurantAdd.propTypes = {
  restaurants: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  location: PropTypes.object,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Restaurant');
  return {
    restaurants: Restaurants.find({}).fetch(),
    ready: subscription.ready(),
  };
})(RestaurantAdd);
