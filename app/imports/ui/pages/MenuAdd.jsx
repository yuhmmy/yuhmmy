import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Grid, Segment, Header, Container, Loader } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import { Menu } from '../../api/menu/Menu';
import '../../stylesheets/Signup.css';
// import { Restaurants } from '../../api/restaurant/Restaurant';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  menuItemName: String,
  menuItemPrice: Number,
  menuItemDescription: String,
  menuItemImage: String,
  menuItemIngredients: { type: Array, required: false },
  'menuItemIngredients.$': String,
  menuItemMeatId: { type: SimpleSchema.Integer, required: false },
  menuItemEthnicityId: { type: SimpleSchema.Integer, required: false },
  menuItemRestaurantId: String,
  menuItemIsDrink: SimpleSchema.Integer,
});

/** Renders the Page for adding a document. */
class MenuAdd extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const {
      menuItemName, menuItemPrice, menuItemDescription, menuItemImage, menuItemIngredients, menuItemMeatId,
      menuItemEthnicityId, menuItemRestaurantId, menuItemIsDrink,
    } = data;
    const restaurantOwner = Meteor.userId();
    Menu.insert({
          menuItemName,
          menuItemPrice,
          menuItemDescription,
          menuItemImage,
          menuItemIngredients,
          menuItemMeatId,
          menuItemEthnicityId,
          menuItemRestaurantId,
          menuItemIsDrink,
          restaurantOwner,
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
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    let fRef = null;
    /** if (this.props.restaurants[0].restaurantOwner !== this.props.userData[0]._id &&
     this.props.userData[0].isAdmin !== 1) {
      return <Header as="h1" inverted>FORBIDDEN - Access for Admins Only</Header>;
    }
     */
    if (!(this.props.userData[0].restaurantOwner !== this.props.userData[0]._id && this.props.userData[0].isAdmin)) {
      return <Header as="h1" inverted>FORBIDDEN - Access for Admins Only</Header>;
    }
    return (
        <Container id="bodyid">
          <Grid container centered>
            <Grid.Column>
              <AutoForm ref={ref => {
                fRef = ref;
              }} schema={formSchema} inverted onSubmit={data => this.submit(data, fRef)}>
                <Segment stacked padding="very" className="segment" inverted>
                  <Header as='h2' textAlign='center' className='headerColor' color='teal'> Add A Menu Item </Header>
                  <TextField
                      label='Menu Item Name:'
                      name='menuItemName'
                      placeholder='Kalua Pig and Long Rice'
                  />
                  <TextField
                      label='Menu Item Price:'
                      name='menuItemPrice'
                      placeholder='10.00'
                  />
                  <TextField
                      label='Menu Item Description:'
                      name='menuItemDescription'
                      placeholder='A classic local dish in Hawaii'
                  />
                  <TextField
                      label='Menu Item Image'
                      name='menuItemImage'
                      placeholder='Kalua.png'
                  />
                  <TextField
                      label='Menu Item Ingredients'
                      name='menuItemIngredients'
                      placeholder='Kalua Pig, Long Rice'
                  />
                  <TextField
                      label='Menu Item Diet Id :'
                      name='menuItemMeatId'
                      placeholder='1=Vegan; 2=Vegetarian; 3=Pescatarian; 4=Meats/None'
                  />
                  <TextField
                      label='Menu Item Cuisine Id :'
                      name='menuItemEthnicityId'
                      placeholder='1=Chinese; 2=Korean; 3=Thai; 4=Local'
                  />
                  <TextField
                      label='Menu Item Restaurant Id :'
                      name='menuItemRestaurantId'
                      placeholder='9'
                  />
                  <TextField
                      label='Is Menu Item a Drink? :'
                      name='menuItemIsDrink'
                      placeholder='0 = NO; 1 = YES'
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

MenuAdd.propTypes = {
  userData: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  // restaurants: PropTypes.array,
};

export default withTracker(() => {
  // const restaurantId = match.params._id.toString();
  const subscription = Meteor.subscribe('Meteor.users.user');
  // const subscription1 = Meteor.subscribe('Restaurants');

  return {
    // restaurants: Restaurants.find({ _id: restaurantId }).fetch(),
    userData: Meteor.users.find({}).fetch(),
    ready: subscription.ready(),
  };
})(MenuAdd);
