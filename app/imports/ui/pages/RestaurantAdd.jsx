import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import NumField from 'uniforms-semantic//NumField';
// import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import swal from 'sweetalert';
// import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import { Restaurants } from '../../api/restaurant/Restaurant';

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = new SimpleSchema({
  restaurantName: String,
  description: String,
  rating: String,
  location: String,
  phoneNumber: {
    type: String,
    required: false,
  },
  restaurantAddress: String,
  owner: String,
  logo: String,
  hours: String,
  website: String,
  menu: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  diet: String,
});

/** Renders the Page for adding a document. */
class RestaurantAdd extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const {
      restaurantName, description, rating, location, phoneNumber, restaurantAddress, logo, hours,
      website, menu, image, diet,
    } = data;
    // const owner = Meteor.user().username;
    Restaurants.insert({
          restaurantName, restaurantAddress, hours, menu, phoneNumber, location, image,
          logo, website, description, rating, diet,
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
    const formSchema = makeSchema;
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
                  <TextField label='Restaurant Phone Number:' name='phoneNumber' required={false}
                             placeholder='Your Restaurant Phone Number'/>
                </Grid.Column>
                <Grid.Column>
                  <TextField label='Restaurant Hours:' name='hours'
                             placeholder='08:00AM - 08:00PM'/>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={3}>
                <Grid.Column>
                  <TextField label='Restaurant Address:' name='restaurantAddress'
                             placeholder='Your Restaurant Address'/>
                </Grid.Column>
                <Grid.Column>
                  <TextField label='Restaurant Owner:' name='owner'
                             placeholder='Your Restaurant Owner'/>
                </Grid.Column>
                <Grid.Column>
                  <TextField label='Restaurant Website:' name='site'
                             placeholder='www.RestaurantSite.com'/>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={3}>
                <Grid.Column>
                  <TextField label='Restaurant Logo:' name='logo'
                             placeholder='www.RestaurantLogo.jpg'/>
                </Grid.Column>
                <Grid.Column>
                  <TextField label='Restaurant Photo:' name='image' required={false}
                             placeholder='www.RestaurantPic.jpg'/>
                </Grid.Column>
                <Grid.Column>
                  <TextField label='Restaurant Menu URL:' name='menu' required={false}
                             placeholder='www.RestaurantMenu.com'/>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <NumField label='Rating' name='rating'
                            placeholder='Rate Your Restaurant'/>
                </Grid.Column>
                <Grid.Column>
                  <TextField label='Dietary Options' name='diet' required={false}
                             placeholder='List Dietary Options'/>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <LongTextField label='Restaurant Description:' name='description'
                                 placeholder='Describe Your Website...'/>
                </Grid.Column>
              </Grid.Row>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default RestaurantAdd;
