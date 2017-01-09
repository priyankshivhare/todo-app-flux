var React = require('react');
var List = require('./List.jsx');
var TodoInput = require('./TodoInput.jsx');
var HTTP = require('../services/httpserver');
var Reflux = require('reflux');
var Actions = require('../reflux/actions.jsx');
var TodoStore = require('../reflux/todoStore.jsx');

var headlineStyle = {
	textTransform: 'uppercase',
	color: '#dddddd'	
};
var containerWrapper = {
	maxWidth: 800,
	borderWidth: 1,
	borderColor: '#eeeeee',
	borderStyle: 'solid',
	padding: 8	
};
var listStyle = {
	marginTop: 8
};

var ListWrapper = React.createClass({
	mixins:[Reflux.listenTo(TodoStore, 'onChange')],
	getInitialState: function(){
		return {todos: [{id:"", text:"" }]};
	},
	componentWillMount: function(){
		Actions.getTodo();
	},
	onChange: function(event, data){
		this.setState({todos: data});
	},
	handleSubmit: function(e){
		e.preventDefault();
		var todo = this.refs.listInput.state.value;
		Actions.addTodo(todo);
		this.refs.listInput.clearField();
	},
	render: function(){
		var todoItem = this.state.todos.map(function(item){
			return <List todoText={item.text} key={item.id} />;
		});
		return (
			<div className="row">
				<div className="col-xs-12">
					<div style={containerWrapper} className="center-block">
						<h1 style={headlineStyle} className="text-center">To-Dos</h1>
						<form onSubmit={this.handleSubmit}>
							<TodoInput ref="listInput"/>
						</form>
						<ul style={listStyle}>
							{todoItem}
						</ul>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = ListWrapper;