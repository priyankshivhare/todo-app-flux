var HTTP = require('../services/httpserver');
var Reflux = require('reflux');
var Actions = require('./actions.jsx');

var TodoStore = Reflux.createStore({
	listenables: [Actions],
	addTodo: function(todo){
		var id = Date.now();
		var todoData = {id: id, text: todo};
		this.todos.push(todoData);
		this.fireUpdate();
		HTTP.post('todos', todoData).then(function(){
			this.getTodo();
		}.bind(this));
	},
	getTodo: function(){
		HTTP.get('todos').then(function(data){
			this.todos = data;
			this.fireUpdate();
		}.bind(this));
	},
    //Refresh function
    fireUpdate: function() {
        this.trigger('change', this.todos);
    }

});

module.exports = TodoStore;