import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const kitchen = new Mongo.Collection('Menu');

/** Define a schema to specify the structure of each document in the collection. */
const OrdersSchema = new SimpleSchema({
  itemName: String,
  quantity: Number,
  preference: String,
  type: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Menu.attachSchema(MenuSchema);

/** Make the collection and schema available to other code. */
export { Menu, MenuSchema };
