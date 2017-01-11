import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'react-mounter';
import RenderTemplate from './RenderTemplate.jsx'

Meteor.startup(function(){
	ReactDOM.render(<RenderTemplate template="loginButtons" />, document.getElementById("loginButtons"));
	ReactDOM.render(<RenderTemplate template="allUsers" />, document.getElementById("allUsers"));
	ReactDOM.render(<RenderTemplate template="conversation" />, document.getElementById("conversation"));
});
