import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { Restaurants, RestaurantSchema } from '../../api/restaurant/Restaurant';

/** Renders the Page for editing a single document. */
class RestaurantEdit extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    const { restaurantName, restaurantAddress, restaurantImage, restaurantDesc, _id } = data;
    Restaurants.update(_id, {
      $set: { restaurantName, restaurantAddress, restaurantImage, restaurantDesc } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Item updated successfully', 'success')));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    if (this.props.doc.length < 1) {
      return <Header as="h1" inverted>Forbidden</Header>;
    }
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center" color='teal'>Edit Restaurant</Header>
            <AutoForm schema={RestaurantSchema} onSubmit={data => this.submit(data)} model={this.props.doc}>
              <Segment>
                <TextField label='Restaurant Name:' name='restaurantName' placeholder='McDonald&apos;s'/>
                <TextField label='Restaurant Street:' name='restaurantAddress.street' placeholder='2121 S King St'/>
                <TextField label='Restaurant City:' name='restaurantAddress.city' placeholder='Honolulu'/>
                <TextField label='Restaurant State:' name='restaurantAddress.state' placeholder='HI'/>
                <TextField label='Restaurant Zip Code:' name='restaurantAddress.zipCode' placeholder='96826'/>
                <TextField label='Restaurant Image:' name='restaurantImage' placeholder='McD.jpg'/>
                <LongTextField label='Restaurant Description:' name='restaurantDesc'
                               placeholder='We have the finest nuggets that will make you say mmmmm I&apos;m lovin it'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );

}
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
RestaurantEdit.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Restaurants');
  const ownerId = Meteor.userId();
  return {
    doc: Restaurants.findOne({ _id: documentId, restaurantOwner: ownerId }),
    ready: subscription.ready(),
  };
})(RestaurantEdit);
