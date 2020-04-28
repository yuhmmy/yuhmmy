import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Orders = new Mongo.Collection('Orders');

/** Define a schema to specify the structure of each document in the collection. */
const OrdersSchema = new SimpleSchema({
  orderRestaurantId: String,
  orderItemId: String,
  orderQuantity: SimpleSchema.Integer,
  orderPreference: String,
  orderIsFinished: Boolean,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Orders.attachSchema(OrdersSchema);

/** Make the collection and schema available to other code. */
export { Orders, OrdersSchema };
