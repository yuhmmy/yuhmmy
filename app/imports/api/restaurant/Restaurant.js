import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Restaurants = new Mongo.Collection('Restaurants');

/** Define a schema to specify the structure of each document in the collection. */
const RestaurantSchema = new SimpleSchema({ 
  restaurantName: String,
  restaurantAddress: String,
  restaurantImage: String,
  restaurantDesc: String,
  restaurantOwner: String,
  }, { tracker: Tracker });

/** Attach this schema to the collection. */
Restaurants.attachSchema(RestaurantSchema);

/** Make the collection and schema available to other code. */
export { Restaurants, RestaurantSchema };