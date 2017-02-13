/* NOTES

DDP.connect returns an object which provides:
* subscribe - Subscribe to a record set. See Meteor.subscribe.
* call - Invoke a method. See Meteor.call.
* apply - Invoke a method with an argument array. See Meteor.apply.
* methods - Define client-only stubs for methods defined on the remote server. See Meteor.methods.
* status - Get the current connection status. See Meteor.status.
* reconnect - See Meteor.reconnect.
* disconnect - See Meteor.disconnect.
* onReconnect - Set this to a function to be called as the first step of reconnecting. This function can call methods which will be executed before any other outstanding methods. For example, this can be used to re-establish the appropriate authentication context on the new connection.

*/

// This Should be in both server and client in a lib folder
export const DDPConnectToRemote = (Meteor.isClient) ? DDP.connect("http://localhost:3000/") : {}; // for local dev with browswer connection
// export const DDPConnectToRemote = (Meteor.isClient) ? DDP.connect("http://192.168.1.100:3000/") : {}; // for remote mobile connection
// console.log(DDPConnectToRemote);

// https://forums.meteor.com/t/accounts-password-accounts-ui-remote-users-trought-ddp/23458/2
// export const connectToExistingBackend = function(url) {
//   //
//   // make a remote connection and set the global connection object to it
//   Meteor.connection = DDP.connect(url);
//   // make sure Accounts uses that connection
//   Accounts.connection = Meteor.connection;
//   //
//   // this is copied from ddp/*/web.browser/packages/ddp.js
//   // it makes sure all method calls are done with the correct connection
//   //
//   _.each(['subscribe', 'methods', 'call', 'apply', 'status', 'reconnect',                                         // 52
//           'disconnect'],                                                                                          // 53
//          function (name) {                                                                                        // 54
//            Meteor[name] = _.bind(Meteor.connection[name], Meteor.connection);                                     // 55
//          });                                                                                                      // 56
//   //
//   // we need re-declare the users collection so Meteor knows to use the remote one
//   //
//   Meteor.users = new Meteor.Collection('users');
//   //
//   // now that we have our act together, try to re-login
//   // unfortunately Accounts seems to have already run before
//   // we did the Meteor.connection = DDP.connect part, so we manually
//   // need to re-check the loginToken or hot code pushes log us out every time
//   //
//   var token = Accounts._storedLoginToken();
//   if(token)  {
//   	console.log("token "+ token);
//     Meteor.loginWithToken(token, function(err){
//       // this is going to throw error if we logged out
//       if(err) console.log(err);else console.log('loginWithToken');
//     });
//   }
// }

// if (Meteor.isClient) {
// 	// set the new DDP connection to all internal packages, which require one
// 	Meteor.connection = DDPConnectToRemote;
// 	Accounts.connection = Meteor.connection;

// 	Meteor.users = new Mongo.Collection('users');   // not sure about this
// 	Meteor.connection.subscribe('users');			// not sure about this

// }



// Replace base connections
// Meteor.connection, Accounts.connection = DDPConnectToRemote;


// patch method should be used when we are sure selected method calls will always go to remote server
// Patch methods
// var methods = ["subscribe", "call", "apply", "methods", "status", "reconnect", "disconnect", "onReconnect"];
// methods.forEach(function(method) {
// 	Meteor[method] = function() {
// 		return DDPConnectToRemote[method].apply(DDPConnectToRemote, arguments);
// 	};
// });

// Patch All Method calls to call remote server method (another way to patch methods) 
// Meteor.call = function(){  // may interfere with hen you want to call a method to local server aand not remote server

// 	if(Meteor.status().connected){ // if connected
// 		return DDPConnectToRemote.call.apply(DDPConnectToRemote, arguments);
// 	}

// 	// else throw new Meteor.Error('not connected!'); retru  errors on client and throw them on server
// 	else {//new Meteor.Error(error, "reason", details);
// 	    // or set an alert or something to the user
// 	    return new Meteor.Error('not connected!', "may be due to lost internet connectioin", "details");
// 	}

// };


Tracker.autorun(function(){
	// to check connection status
	console.log(DDPConnectToRemote.status());

	DDPConnectToRemote.onReconnect = function () {
		console.log("RECONNECTING REMOTE");
	};

	// if remote connection exists, coonect to remote users collection  
  //TODO may have to move tis block somewhere else where it is call earlier

 //  if (DDPConnectToRemote.status().connected){
 //  	Meteor.connection, Accounts.connection = DDPConnectToRemote;
 //  	console.log("Connected. working on getting remote users now");
 //    // Meteor.users = new Meteor.Collection('users', {connection: DDPConnectToRemote});
 //    // DDPConnectToRemote.subscribe('users', true);
 //    Meteor.users = new Meteor.Collection('users', {connection: DDPConnectToRemote});
 //    DDPConnectToRemote.subscribe('users', function() {
 //      var users = Meteor.users.find();
 //      console.log(users.count());
 //    });
	// var token = Accounts._storedLoginToken();
 //  	if(token)  {
 //  		console.log("token: "+ token);
 //    	Meteor.loginWithToken(token, function(err){
	//       	// this is going to throw error if we logged out
	//       	if(err){
	//       		console.log(err);
	//       	} 
	//       	else {
	//       		console.log('loginWithToken');
	//       	}
 //    	});
 //  	}
 //  }

});
