import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Meteor.subscribe('users');
Meteor.subscribe('messages');

Template.registerHelper('users',()=>{
	return Meteor.users.find()
})

Template.conversation.helpers({
	messages: ()=> {
		currentConversation = Session.get('currentConversation');
			return Messages.find({
				$or: [
					{from: Meteor.userId(), to: currentConversation},
					{to: Meteor.userId(), from: currentConversation}
				]
			}, {
				sort: {sentAt: -1}
			})
	},
	username: (userId)=> {
		return Meteor.users.findOne(userId).emails[0].address;
	},
	currentConversation: (userId)=> {
		return Session.get('currentConversation')
	},
	showConversation: (userId)=> {
		if(!Meteor.userId())
			return false
		else if(!Session.get('currentConversation'))
			return false
		else 
			return true
	},
	noConversationMsg: ()=>{
		if(!Meteor.userId())
			return "You are not signed in <br> Please sign in to send/view messages.";
		else if(!Session.get('currentConversation'))
			return "Select a user above to send message"
	}
})

Template.allUsers.events({
	'click .username': (event)=>{
		Session.set('currentConversation', event.target.dataset.userId);
	}
})

AutoForm.hooks({
  sendMsg: {
    onSubmit: function (doc) {
      if (Messages.insert(doc)) {
        this.done();
      } else {
        this.done(new Error("Submission failed"));
      }
      return false;
    }
  }
});