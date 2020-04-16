import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

/* eslint-disable no-console */

function createUser(email, password, firstName, lastName) {
  console.log(`  Creating user ${email}.`);
  Accounts.createUser({
    username: email,
    email: email,
    password: password,
    profile: { firstName, lastName },
  });
}

/** When running app for first time, pass a settings file to set up a default user account. */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    // eslint-disable-next-line max-len
    Meteor.settings.defaultAccounts.map(({ email, password, firstName, lastName }) => createUser(email, password, firstName, lastName));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
