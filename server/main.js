import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.publish('users', function() {
	return Meteor.users.find();
})

Meteor.publish('messages', function() {
	return Messages.find({
		$or: [
			{from: this.userId},
			{to: this.userId}
		]
	});
})