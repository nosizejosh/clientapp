import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Template } from 'meteor/templating';
import { ActiveRoute } from 'meteor/zimme:active-route';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { TAPi18n } from 'meteor/tap:i18n';

import { DDPConnectToRemote} from '../../startup/client/_connector.js';

// import '/imports/ui/components/loading.js';
// import '/imports/ui/components/nav-header.js';
import '../components/loading.js';
import './app-body.html';

const CONNECTION_ISSUE_TIMEOUT = 5000;     // seconds before connection error is shown

// A store which is local to this file?
const showConnectionIssue = new ReactiveVar(false);

Meteor.startup(() => {
  // show connection error box after CONNECTION_ISSUE_TIMEOUT seconds since app started
  setTimeout(() => {
    // Show the connection error box
    showConnectionIssue.set(true);
  }, CONNECTION_ISSUE_TIMEOUT);  

// DDPConnectToRemote;

});

Template.App_body.onCreated(function appBodyOnCreated() {
  this.remoteConnectionExists = new ReactiveVar();
//   this.subscribe('lists.public');
//   this.subscribe('lists.private');

//   this.state = new ReactiveDict();
//   this.state.setDefault({
//     menuOpen: false,
//     userMenuOpen: false,
//   });
  // this.autorun(function(){
  //  Template.instance().remoteConnectionExists.set(DDPConnectToRemote.status().connected);
  // })
});

Template.App_body.helpers({
  menuOpen() {
    const instance = Template.instance();
    return instance.state.get('menuOpen') && 'menu-open';
  },
  cordova() {
    return Meteor.isCordova && 'cordova';
  },
  // emailLocalPart() {
  //   const email = Meteor.user().emails[0].address;
  //   return email.substring(0, email.indexOf('@'));
  // },
  // userMenuOpen() {
  //   const instance = Template.instance();
  //   return instance.state.get('userMenuOpen');
  // },
  // lists() {
  //   return Lists.find({ $or: [
  //     { userId: { $exists: false } },
  //     { userId: Meteor.userId() },
  //   ] });
  // },
  // activeListClass(list) {
  //   const active = ActiveRoute.name('Lists.show')
  //     && FlowRouter.getParam('_id') === list._id;

  //   return active && 'active';
  // },
  connected() {
    if (showConnectionIssue.get()) {
      return Meteor.status().connected;
    }
    // if(! DDPConnectToRemote.status().connected){  // use this to check for remote connection in another method
    //   return DDPConnectToRemote.status().connected;
    // }

    return true;
  },
  templateGestures: {
    'swipeleft .cordova'(event, instance) {
      instance.state.set('menuOpen', false);
    },
    'swiperight .cordova'(event, instance) {
      instance.state.set('menuOpen', true);
    },
  },
  languages() {
    return _.keys(TAPi18n.getLanguages());
  },
  isActiveLanguage(language) {
    return (TAPi18n.getLanguage() === language);
  },
});

Template.App_body.events({
  'click .js-logout'() {
    Meteor.logout();
  }
});


Tracker.autorun(function(){
  // if remote connection exists, coonect to remote users collection  
  //TODO may have to move tis block somewhere else where it is call earlier

  // if (DDPConnectToRemote.status().connected){
  //   Accounts.connection = DDPConnectToRemote;
  //   console.log("Connected. working on getting remote users now");
  //   // Meteor.users = new Meteor.Collection('users', {connection: DDPConnectToRemote});
  //   // DDPConnectToRemote.subscribe('users', true);
  //   Meteor.users = new Meteor.Collection('users', {connection: DDPConnectToRemote});
  //   DDPConnectToRemote.subscribe('users', function() {
  //     var users = Meteor.users.find();
  //     console.log(users.count())
  //   });

  //   // currently only way I know how to retrieve {currentUser} from remote server DOESNT WORK
  //   //http://stackoverflow.com/questions/28484319/ddp-connect-and-meteor-users?rq=1
  //   // console.log(DDPConnectToRemote.call("remoteClientCurrentUser"));  
  
  // }

  // connectToExistingBackend("http://192.168.1.100:3000/");

});
