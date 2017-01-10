Messages = new Meteor.Collection('messages')
Messages.attachSchema(new SimpleSchema({
	from: {
		type: String,
		autoValue: function(){
			return this.userId
		},
		autoform: {
			type: "hidden"
		}
	},
	to: {
		type: String,
		autoValue: function(){
			if(Meteor.isClient)
				return Session.get('currentConversation');
			else return this.value;
		},
		autoform: {
			type: "hidden"
		}
	},
	msg: {
		type: String,
		label: "message"
	},
	sentAt: {
		type: Date,
		autoValue: function(){
			return new Date();
		},
		autoform: {
			type: "hidden"
		}
	}

}))

Messages.allow({
	insert: ()=> {return true}
})