import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

/* eslint-disable no-console */

function createUser(_id, email, password, firstName, lastName, gender, pref, age, isAdmin) {
  console.log(`  Creating user ${email}. isAdmin ${isAdmin}`);

  // create account
  Meteor.users.insert({
    _id: _id,
    username: email,
    emails: [{ address: email, verified: false }],
  });

  Accounts.setPassword(_id, password);

  // add custom fields of gender and preferences
  Meteor.users.update(_id, {
    $set: {
      isAdmin: isAdmin,
      age: age,
      gender: gender,
      preferences: pref,
      name: {
        firstName: firstName,
        lastName: lastName,
      },
    },
  });

}


/** When running app for first time, pass a settings file to set up a default user account. */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.loadAssetsFile) {
    const assetsFileName = 'data.json';
    console.log(`Loading data from private/${assetsFileName}`);
    const jsonData = JSON.parse(Assets.getText(assetsFileName));

    if (jsonData.defaultAccounts) {
      console.log('Creating the default user(s)');
      // eslint-disable-next-line max-len
      jsonData.defaultAccounts.map(({ _id, email, password, firstName, lastName, gender, pref, age, isAdmin }) => createUser(_id, email, password, firstName, lastName, gender, pref, age, isAdmin));
    } else {
      console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
    }
  }
}
