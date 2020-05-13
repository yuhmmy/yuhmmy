import React from 'react';
import { Reviews } from '/imports/api/review/Reviews';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { AutoForm, SelectField, ErrorsField, LongTextField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';

const formSchema = new SimpleSchema({
  title: String,
  experience: String,
  stars: {
    label: 'stars',
    type: Number,
    allowedValues: [1, 2, 3, 4, 5],
    defaultValue: 5,
  },
  rating: {
    label: 'rating',
    type: String,
    allowedValues: ['bad', 'okay', 'good', 'great', 'perfect!'],
    defaultValue: 'perfect!',
  },
  date: Date,
  name: {
    type: String,
    optional: true,
  },
});

/** Renders the Page for adding a document. */
class RestaurantReview extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { title, experience, stars, rating, date, name } = data;
    Reviews.insert({ title, experience, stars, rating, date, name },
        (error) => {
          if (error) {
            swal('Success', 'Thank you for your feedback!', 'success');
          } else {
            swal('Error', error.message, 'error');
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
            <Header as="h2" textAlign="center" inverted color='teal'>Review this Restaurant</Header>
            <AutoForm ref={ref => {
              fRef = ref;
            }} schema={formSchema} onSubmit={data => this.submit(data, fRef)}>
              <Segment>
                <TextField name='title' label='Restaurant Name:' placeholder='Pizza Hut at UHM Campus Center'/>
                <Grid columns="2">
                  <Grid.Column><SelectField name='stars' label='How Many Stars?'/></Grid.Column>
                  <Grid.Column><SelectField name='rating' label='How Was Your Experience'/></Grid.Column></Grid>
                <LongTextField name='experience' label='Tell Us More About Your Visit(s):'
                               placeholder='yUHmmy yUHmmy in my tUHmmy! My favorite place to eat on campus!
                               Located so close to the gym as well! The cheese pizza is delicious'/>
                <TextField name='date' label='When Was Your Visit?' value={new Date().toDateString()}/>
                <TextField name='name' label='Your Name:' placeholder='anonymous student'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default RestaurantReview;
