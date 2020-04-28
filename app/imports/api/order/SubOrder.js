import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const SubOrders = new Mongo.Collection('SubOrders');

/** Define a schema to specify the structure of each document in the collection. */
const SubOrdersSchema = new SimpleSchema({
  orderId: String,
  subOrderQuantity: SimpleSchema.Integer,
  subOrderIsFinished: Boolean,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
SubOrders.attachSchema(SubOrdersSchema);

/** Make the collection and schema available to other code. */
export { SubOrders, SubOrdersSchema };
