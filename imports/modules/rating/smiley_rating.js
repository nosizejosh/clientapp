import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Template } from 'meteor/templating';

import './smiley_rating.html';

/*
// This module encapsulates the UI (smileys) and score generation (1-5) for its parent template.
// To use, call this withing template where you want to use it, for kiosk and mobil app eg
// Parent template must have this 'template.score = new ReactiveVar(0);  which will bemanipulated by this module
*/

Template.smileyRating.onCreated(function(){    

	let template = Template.instance(); 
   // a way to make this truely modular is to connect template.score to a parent reactive source eg template.parent(x).score.get()
   // so that it will always update the parent rather and this code can be picked and plugged into other apps such as the mobile and also kiosk app
   // making it somewhat modular. Else, getting the score to the appropraite method will be difficult and introduc very tight coupling
     template.localScore = new ReactiveVar(0);  // standalone for tests

});


Template.smileyRating.onRendered(function () {
  
  let template = Template.instance(); 
  template.autorun( function () {  
    template.parent(1).score.set(template.localScore.get());   // update parent score with local score
    // console.log(template.localScore.get()); // local score  
    // console.log(template.parent(1).score.get()); // parent score      
  });

});

Template.smileyRating.helpers({
    

});

Template.smileyRating.events({

	'click .rating-bar.smileys li a ': function( event, template ) {
      event.preventDefault();
      // set score based on smiley clicked
      switch(event.currentTarget.id){
      	case 'awesome':  
      	template.localScore.set(5);
      	break;
      	case 'good':  
      	template.localScore.set(4);
      	break;
      	case 'ok':  
      	template.localScore.set(3); 
      	break;
      	case 'bad':  
      	template.localScore.set(2);
      	break;
      	case 'aweful':  
      	template.localScore.set(1); 
      	break;
      }

  	},
 
});

