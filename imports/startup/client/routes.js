import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { AccountsTemplates } from 'meteor/useraccounts:core';

import '/imports/ui/layouts/app-body.js';
import '/imports/ui/pages/app-not-found.js';
import '/imports/ui/pages/app-timeline.js';
import '/imports/modules/rating/smiley_styles.css';
import '/imports/modules/rating/smiley_rating.js';
import '/imports/ui/pages/rate-us.js';


// Import to override accounts templates
import '../../ui/accounts/accounts-templates.js';


// ******************* Route Helpers *****************************
// if logged in
function redirectIfLoggedIn (ctx, redirect) {
  if (Meteor.userId()) {
    //redirect('/'); // 
  }
}

// if not logged in
function checkLoggedIn (ctx, redirect) {
  if (!Meteor.userId() && !Meteor.loggingIn()) {
    alert("you need to be loggedin");
    redirect('/signin');
  }
}
// ******************* Global Routes *****************************
// global action on enteirng routes  
FlowRouter.triggers.enter( [
   // run providerSubdomian from ns:subdomian package
   //providerSubdomain
 ] );

FlowRouter.triggers.exit( [ 
  // exitFunction 
] );
  
// pirvate routes
let privateRoutes = FlowRouter.group({
  name: 'private',
  triggersEnter: [
    //checkLoggedIn
  ]
});

privateRoutes.route('/', {
// FlowRouter.route('/', {
  name: 'App_timeline',
  action() {
    BlazeLayout.render('App_body', { main: 'App_timeline' });
  },
});   

FlowRouter.route('/rateus', {
// FlowRouter.route('/', {
  name: 'RateUs',
  action() {
    BlazeLayout.render('App_body', { main: 'RateUs' });
    // BlazeLayout.render('Centered_Content', { main: 'RateUs' });
    // BlazeLayout.render('RateUs'); // also works
  },
});  

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
