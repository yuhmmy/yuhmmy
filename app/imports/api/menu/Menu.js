import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Menu = new Mongo.Collection('Menu');

/** Define a schema to specify the structure of each document in the collection. */
const MenuSchema = new SimpleSchema({
  itemName: String,
  price: Number,
  image: String,
  description: String,
  ingredients: {type: String, required: false},
  restaurantId: String,
  meatId: {type: SimpleSchema.Integer, required: false},
  allergyId: {type: SimpleSchema.Integer, required: false},
  ethnicityId: {type: SimpleSchema.Integer, required: false},
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Menu.attachSchema(MenuSchema);

/** Make the collection and schema available to other code. */
export { Menu, MenuSchema };