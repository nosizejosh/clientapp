import { Template } from 'meteor/templating';
import { AccountsClient } from 'meteor/accounts-base';


import './accounts-templates.html';

import { DDPConnectToRemote} from '../../startup/client/_connector.js';

// We identified the templates that need to be overridden by looking at the available templates
// here: https://github.com/meteor-useraccounts/unstyled/tree/master/lib
Template['override-atPwdFormBtn'].replaces('atPwdFormBtn');
Template['override-atPwdForm'].replaces('atPwdForm');
Template['override-atTextInput'].replaces('atTextInput');
Template['override-atTitle'].replaces('atTitle');
Template['override-atError'].replaces('atError');


// if (DDPConnectToRemote.status().connected){
  	// Meteor.connection, Accounts.connection = DDPConnectToRemote;
//   	console.log("Connected. working on getting remote users now");
//     // Meteor.users = new Meteor.Collection('users', {connection: DDPConnectToRemote});
//     // DDPConnectToRemote.subscribe('users', true);
    // Meteor.users = new Meteor.Collection('users', {connection: DDPConnectToRemote});
    // DDPConnectToRemote.subscribe('users', function() {
    //   var users = Meteor.users.find();
    //   console.log(users.count());
    // });
// 	var token = Accounts._storedLoginToken();
//   	if(token)  {
//   		console.log("token: "+ token);
//     	Meteor.loginWithToken(token, function(err){
// 	      	// this is going to throw error if we logged out
// 	      	if(err){
// 	      		console.log(err);
// 	      	} 
// 	      	else {
// 	      		console.log('loginWithToken');
// 	      	}
//     	});
//   	}
//   }

Meteor.connection, Accounts.connection = DDPConnectToRemote;
// let mServiceConn = DDPConnectToRemote;
let mServiceConn= DDP.connect("http://localhost:3000/");
let mServiceAccount = new AccountsClient({'connection': mServiceConn});

// On login:
// - login to the client server through the Accounts package
// - login to the microservice server
Accounts.onLogin(() => {
  let loginToken = Accounts._storedLoginToken();

  // Use the accounts loginToken to login to the mService
  if(loginToken) {
    console.log('Logging in with token');
    mServiceAccount.loginWithToken(loginToken,
      (loginErr, result) => {
        if(loginErr) {
          console.log(loginErr.message);
        }
      });
  } else {
    console.log('Unable to log in, no token found');
  }
});

// Tracker.autorun(function(){
// 	// to check connection status
// 	console.log("Remote connection status from client accounts page:" + DDPConnectToRemote.status());
// });

