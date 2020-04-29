import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

/* eslint-disable no-console */

function createUser(email, password, firstName, lastName, gender, pref, age) {
  console.log(`  Creating user ${email}.`);

  // create account
  const id = Accounts.createUser({
    username: email,
    email: email,
    password: password,
  });

  // add custom fields of gender and preferences
  Meteor.users.update(id, {
      $set: {
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
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    // eslint-disable-next-line max-len
    Meteor.settings.defaultAccounts.map(({ email, password, firstName, lastName, gender, pref, age }) => createUser(email, password, firstName, lastName, gender, pref, age));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
