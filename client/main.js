import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Meteor.subscribe('users');
Meteor.subscribe('messages');

Meteor.startup(function(){
	AutoForm.setDefaultTemplate('materialize');
});

Template.registerHelper('users',()=>{
	return Meteor.users.find()
});
Template.registerHelper('username', (userId)=> {
	return Meteor.users.findOne(userId).emails[0].address;
});
Template.conversation.helpers({
	messages: ()=> {
		currentConversation = Session.get('currentConversation');
			return Messages.find({
				$or: [
					{from: Meteor.userId(), to: currentConversation},
					{to: Meteor.userId(), from: currentConversation}
				]
			}, {
				sort: {sentAt: 1}
			})
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
			return "Select a registered user to send message"
		else
			return false
	}
})

Template.allUsers.events({
	'click .username': (event)=>{
		Session.set('currentConversation', event.target.dataset.userId);
	}
})

Template.chatbox.onRendered(function(){
	$("#chatbox").scrollTop($("#chatbox")[0].scrollHeight);
})

AutoForm.hooks({
  sendMsg: {
    onSubmit: function (doc) {
      if (Messages.insert(doc)) {
      	$("#chatbox").scrollTop($("#chatbox")[0].scrollHeight);
        this.done();
      } else {
        this.done(new Error("Submission failed"));
      }
      return false;
    }
  }
});