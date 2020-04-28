import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Menu = new Mongo.Collection('Menu');

/** Define a schema to specify the structure of each document in the collection. */
const MenuSchema = new SimpleSchema({
  menuItemName: String,
  menuItemPrice: Number,
  menuItemImage: String,
  menuItemDescription: String,
  menuItemIngredients: { type: Array, required: false },
    'menuItemIngredients.$': String,
  menuItemRestaurantId: String,
  menuItemMeatId: { type: SimpleSchema.Integer, required: false },
  menuItemAllergyId: { type: SimpleSchema.Integer, required: false },
  menuItemEthnicityId: { type: SimpleSchema.Integer, required: false },
  menuItemIsDrink: SimpleSchema.Integer,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Menu.attachSchema(MenuSchema);

/** Make the collection and schema available to other code. */
export { Menu, MenuSchema };
