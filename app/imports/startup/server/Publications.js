import { Meteor } from 'meteor/meteor';
import { Menu } from '../../api/menu/Menu';
import { Meat } from '../../api/menu/Meat';
import { Orders } from '../../api/order/Order';
import { SubOrders } from '../../api/order/SubOrder';
import { Ethnicity } from '../../api/menu/Ethnicity';
import { Restaurants } from '../../api/restaurant/Restaurant';

Meteor.publish('Restaurants', function publish() {
    return Restaurants.find();
});

Meteor.publish('Ethnicity', function publish() {
    return Ethnicity.find();
});

Meteor.publish('Meat', function publish() {
    return Meat.find();
});

Meteor.publish('Menu', function publish() {
    return Menu.find();
});

Meteor.publish('Orders', function publish() {
    return Orders.find();
});

Meteor.publish('SubOrders', function publish() {
    return SubOrders.find();
});