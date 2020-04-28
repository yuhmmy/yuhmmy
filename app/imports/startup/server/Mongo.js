import { Meteor } from 'meteor/meteor';
import { Menu } from '../../api/menu/Menu';
import { Meat } from '../../api/menu/Meat';
import { Ethnicity } from '../../api/menu/Ethnicity';
import { Restaurants } from '../../api/restaurant/Restaurant';

/* eslint-disable no-console */

/** Initialize the database with a default menu doc */
function addMenu(data) {
  console.log(`  Adding: ${data.menuItemName}`);
  Menu.insert(data);
}

function addRestaurant(data) {
  console.log(`  Adding: ${data.restaurantName}`);
  Restaurants.insert(data);
}

function addMeat(data) {
  console.log(`  Adding: ${data.meatDesc}`);
  Meat.insert(data);
}

function addEthnicity(data) {
  console.log(`  Adding: ${data.ethnicityDesc}`);
  Ethnicity.insert(data);
}

/** Initialize the collection if empty. */
if (
    Menu.find().count() === 0 &&
    Restaurants.find().count() === 0 &&
    Meat.find().count() === 0 &&
    Ethnicity.find().count() === 0
) {
  // Initialize restaurants first
  if (Meteor.settings.defaultRestaurant) {
    console.log('creating default restaurants');
    Meteor.settings.defaultRestaurant.map(data => addRestaurant(data));
  }
  // Then, initialize indicator master collections
  if (Meteor.settings.defaultEthnicity) {
    console.log('creating default ethnicity list');
    Meteor.settings.defaultEthnicity.map(data => addEthnicity(data));
  }
  if (Meteor.settings.defaultMeat) {
    console.log('creating default meat list');
    Meteor.settings.defaultMeat.map(data => addMeat(data));
  }

  // initialize menu last
  if (Meteor.settings.defaultMenu) {
    console.log('creating default menu');
    Meteor.settings.defaultMenu.map(data => addMenu(data));
  }
}
