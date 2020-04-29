import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, LongTextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import { Restaurants } from '../../api/restaurant/Restaurant';

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
    const { restaurantName, restaurantAddress, restaurantImage, restaurantDesc } = data;
    const restaurantOwner = Meteor.user().username;
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
    let fRef = null;
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>Add Your Restaurant</Header>
            <AutoForm ref={ref => {
              fRef = ref;
            }} schema={formSchema} onSubmit={data => this.submit(data, fRef)}>
              <Segment>
                <TextField name='restaurantName'/>
                <TextField name='restaurantAddress'/>
                <TextField name='restaurantImage'/>
                <LongTextField name='restaurantDesc'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default RestaurantAdd;
