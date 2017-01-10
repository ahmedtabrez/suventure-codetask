import React from 'react';
import ReactDOM from 'react-dom';
import RenderTemplate from './RenderTemplate.jsx'

class App extends React.Component{
	render(){
		return (
			<h1>Assalaamu Alaikum</h1>
		);
	}
}

Meteor.startup(function(){
	ReactDOM.render(<RenderTemplate template="loginButtons" />, document.getElementById("app"));
	ReactDOM.render(<RenderTemplate template="allUsers" />, document.getElementById("allUsers"));
	ReactDOM.render(<RenderTemplate template="conversation" />, document.getElementById("conversation"));
})