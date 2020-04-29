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

/**
 * If the loadAssetsFile field in settings.development.json is true, then load the data in private/data.json.
 * This approach allows you to initialize your system with large amounts of data.
 * Note that settings.development.json is limited to 64,000 characters.
 * We use the "Assets" capability in Meteor.
 * For more info on assets, see https://docs.meteor.com/api/assets.html
 * User count check is to make sure we don't load the file twice, which would generate errors due to duplicate info.
 */
if ((Meteor.settings.loadAssetsFile) && (Meteor.users.find().count() < 7)) {
  const assetsFileName = 'data.json';
  console.log(`Loading data from private/${assetsFileName}`);
  const jsonData = JSON.parse(Assets.getText(assetsFileName));
  jsonData.profiles.map(profile => addProfile(profile));
  jsonData.projects.map(project => addProject(project));
}