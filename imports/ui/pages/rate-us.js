import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Template } from 'meteor/templating';


import { DDPConnectToRemote } from '../../startup/client/_connector.js';
import { PageRenderHold } from '../launch-screen.js';   // to release PageRenderHold.release();
 // console.log(DDPConnectToRemote);

// import { Ratings } from '../../api/ratings/ratings.js';

import './rate-us.html';

Template.RateUs.onCreated(function(){    

	let template = Template.instance(); 
    // let servicesSubcription = template.subscribe('ratings.all'); 

    template.score = new ReactiveVar(0);  // score to be manipulate by smileyRating module
    template.ratableObjectId = 'uRNhgvnFK3XCLKsBS';

    // define the remote ratings collection
    Ratings = new Mongo.Collection("Ratings", DDPConnectToRemote);  

    // let ratings = Ratings.find().fetch();    


    template.autorun( function () {  
        // subscribe to remote ratings publication
        let ratingSub = DDPConnectToRemote.subscribe('ratings.all'); 
        console.log(Ratings.find().count()); 
        // console.log(ratings);
        if (ratingSub.ready()) {
        let ratings = Ratings.find().fetch();    
        // console.log(ratings.find().count()); 
        console.log(ratings); 
        } else {
            console.log("> ratings Subscription is not ready yet. \n\n");
        } 

    });

    // let remote = DDP.connect('http://localhost:3000/');
  // 
  // const Ratings = new Meteor.Collection('ratings', { connection: remote }); //define the remote collection 
  // Items = new Meteor.Collection('ratings', remote); 
  
//   this.autorun(function () {
// // template.subscribe('ratings.all'); 
//       // subscribe to appointments for today and provider (complex pub)
//       // let ratingSub = remote.subscribe('ratings.all'); 
//       remote.subscribe('ratings.all', function() {
//         var things = Items.find();
//         console.log(things.count());  // get 1         
//       })
      // if (ratingSub.ready()) {
      //   let ratings = Ratings.find().fetch();    
      //   // console.log(ratings.find().count()); 
      //   console.log(ratings); 
      // } else {
      //       console.log("> ratings Subscription is not ready yet. \n\n");
      //   } 


    // });


});


Template.RateUs.onRendered(function () {
    // console.log(DDPConnectToRemote);
  let template = Template.instance(); 
  template.autorun( function () { 

      const rating = {        
          // required for db insert
          score:template.score.get(),
          objectId:template.ratableObjectId// start: clickedSlotTime,       
        };
    	// console.log(template.score.get());
      if(template.score.get()){ // if there is change in score, insert new rating
           // call remote server method
          if(Meteor.status().connected){ // if connected
              DDPConnectToRemote.call('Ratings.insert',rating, function(err, res) {
                  console.log(err, res);
              });         
          }
           else {//new Meteor.Error(error, "reason", details);
               // send message to user and try to reconnect, after two attempts maybe stop or something
            console.log("No Connection");
           }
      }
    	 // call remote insert rating method
    	// Meteor.call('Ratings.insert',rating);  // if relying on the patched system where ddp is applied autimatically in _connector.js
    
    });
});

Template.RateUs.helpers({
    

});

Template.RateUs.events({

	 
});


