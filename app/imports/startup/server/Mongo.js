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

// For users doc
Meteor.users.allow({
  update: () => true,
});

/**
 * If the loadAssetsFile field in settings.development.json is true, then load the data in private/data.json.
 * This approach allows you to initialize your system with large amounts of data.
 * Note that settings.development.json is limited to 64,000 characters.
 * We use the "Assets" capability in Meteor.
 * For more info on assets, see https://docs.meteor.com/api/assets.html
 * User count check is to make sure we don't load the file twice, which would generate errors due to duplicate info.
 */
if (Meteor.settings.loadAssetsFile) {
  const assetsFileName = 'data.json';
  console.log(`Loading data from private/${assetsFileName}`);
  const jsonData = JSON.parse(Assets.getText(assetsFileName));

  if (Restaurants.find().count() === 0) {
    jsonData.defaultRestaurant.map(data => addRestaurant(data));
  }

  if (Menu.find().count() === 0) {
    jsonData.defaultMenu.map(data => addMenu(data));
  }

  if (Ethnicity.find().count() === 0) {
    console.log('creating default ethnicity list');
    jsonData.defaultEthnicity.map(data => addEthnicity(data));
  }

  if (Meat.find().count() === 0) {
    console.log('creating default meat list');
    jsonData.defaultMeat.map(data => addMeat(data));
  }

  if (Meteor.users.find().count() === 0) {
    if (Meteor.settings.defaultAccounts) {
      console.log('Creating the default user(s)');
      // eslint-disable-next-line max-len
      jsonData.defaultAccounts.map(({ _id, email, password, firstName, lastName, gender, pref, age, isAdmin }) => createUser(_id, email, password, firstName, lastName, gender, pref, age, isAdmin));
    } else {
      console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
    }
  }
}
