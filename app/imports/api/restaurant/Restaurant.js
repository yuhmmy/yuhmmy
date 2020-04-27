import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Restaurants = new Mongo.Collection('Restaurants');

/** Define a schema to specify the structure of each document in the collection. */
const RestaurantSchema = new SimpleSchema({ 
  restaurantName: String,
  restaurantAddress: Object,
    'restaurantAddress.street': String,
    'restaurantAddress.city': String,
    'restaurantAddress.state': String,
    'restaurantAddress.zipCode': String,
  restaurantImage: String,
  restaurantDesc: String,
  restaurantOwner: String,
  restaurantOrders: { type: Object, required: false },
    'restaurantOrders.kitchenQueue': Array,
      'restaurantOrders.kitchenQueue.$': Object,
        'restaurantOrders.kitchenQueue.$.kitchenName': String,
        'restaurantOrders.kitchenQueue.$.preference': String,
    'restaurantOrders.drinkQueue': Array,
      'restaurantOrders.drinkQueue.$': Object,
        'restaurantOrders.drinkQueue.$.drinkName': String,
        'restaurantOrders.drinkQueue.$.preference': String,
    'restaurantOrders.waitQueue': Array,
      'restaurantOrders.waitQueue.$': Object,
        'restaurantOrders.waitQueue.$.waitName': String,
        'restaurantOrders.waitQueue.$.preference': String,

  }, { tracker: Tracker });

/** Attach this schema to the collection. */
Restaurants.attachSchema(RestaurantSchema);

/** Make the collection and schema available to other code. */
export { Restaurants, RestaurantSchema };