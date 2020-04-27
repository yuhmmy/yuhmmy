import { Meteor } from 'meteor/meteor';
import { Menu } from '../../api/menu/Menu';
import { Meat } from '../../api/menu/Meat';
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
