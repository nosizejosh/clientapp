import { AccountsTemplates } from 'meteor/useraccounts:core';

import { AccountsClient } from 'meteor/accounts-base';
import { DDPConnectToRemote} from '../../startup/client/_connector.js';

/**
 * The useraccounts package must be configured for both client and server to work properly.
 * See the Guide for reference (https://github.com/meteor-useraccounts/core/blob/master/Guide.md)
 */

AccountsTemplates.configure({
  defaultTemplate: 'Auth_page',
  defaultLayout: 'App_body',
  defaultLayoutRegions: {},
  defaultContentRegion: 'main',
  confirmPassword: true,
  enablePasswordChange: true,
  forbidClientAccountCreation: false,
  overrideLoginErrors: true,
  sendVerificationEmail: true,
  lowercaseUsername: false,
  focusFirstInput: true,
  showAddRemoveServices: true,
  showForgotPasswordLink: true,
  showLabels: true,
  showPlaceholders: true,
  showResendVerificationEmailLink: true,
  continuousValidation: true,
  negativeFeedback: true,
  negativeValidation: true,
  positiveValidation: true,
  positiveFeedback: true,
  showValidating: true,
  privacyUrl: 'Privacy',
  termsUrl: 'TermsOfUse',
  redirectTimeout: 0,
  // texts: {
  //   button: {
  //     signUp: 'Create my Profil'
  //   },
  //   socialSignUp: 'Create my Profil',
  //   socialIcons: {
  //     'meteor-developer': 'fa fa-rocket'
  //   },
  //   title: {
  //     forgotPwd: 'Recover Your Password'
  //   }
  // },

});


AccountsTemplates.configureRoute('signIn', {
  name: 'signin',
  path: '/signin',
});

AccountsTemplates.configureRoute('signUp', {
  name: 'join',
  path: '/join',
});

AccountsTemplates.configureRoute('forgotPwd');

AccountsTemplates.configureRoute('resetPwd', {
  name: 'resetPwd',
  path: '/reset-password',
});


// // let mServiceConn = DDPConnectToRemote;
// let mServiceConn= DDP.connect("http://localhost:3000/");
// let mServiceAccount = new AccountsClient({'connection': mServiceConn});

// // On login:
// // - login to the client server through the Accounts package
// // - login to the microservice server
// Accounts.onLogin(() => {
//   let loginToken = Accounts._storedLoginToken();

//   // Use the accounts loginToken to login to the mService
//   if(loginToken) {
//     console.log('Logging in with token');
//     mServiceAccount.loginWithToken(loginToken,
//       (loginErr, result) => {
//         if(loginErr) {
//           console.log(loginErr.message);
//         }
//       });
//   } else {
//     console.log('Unable to log in, no token found');
//   }
// });