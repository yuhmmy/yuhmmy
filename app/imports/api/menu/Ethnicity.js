import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Ethnicity = new Mongo.Collection('Ethnicity');

/** Master table of ethnicities, tied to Menu table. */
const EthnicitySchema = new SimpleSchema({
  ethnicityId: SimpleSchema.Integer,
  ethnicityDesc: String,
  ethnicityCardImage: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Ethnicity.attachSchema(EthnicitySchema);

/** Make the collection and schema available to other code. */
export { Ethnicity, EthnicitySchema };
