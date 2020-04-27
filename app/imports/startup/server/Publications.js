import { Meteor } from 'meteor/meteor';

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
