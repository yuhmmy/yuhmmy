import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Menu } from '../../api/menu/Menu';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.insert(data);
}

/** Initialize the collection if empty. */
if (Stuffs.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}
/** Initialize the database with a default menu doc */
function addMenu(data) {
  console.log(`  Adding: ${data.itemName} (${data.owner})`);
  Menu.insert(data);
}
/** Initialize the collection if empty. */
if (Menu.find().count() === 0) {
  if (Meteor.settings.defaultMenu) {
    console.log('creating default menu');
    Meteor.settings.defaultMenu.map(data => addMenu(data));
  }
}
