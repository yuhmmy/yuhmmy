import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Menu = new Mongo.Collection('Menu');

/** Define a schema to specify the structure of each document in the collection. */
const MenuSchema = new SimpleSchema({
  itemName: String,
  price: Number,
  description: String,
  ingredients: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Menu.attachSchema(MenuSchema);

/** Make the collection and schema available to other code. */
export { Menu, MenuSchema };
