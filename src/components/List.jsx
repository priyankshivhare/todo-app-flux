var React = require('react');

var List = React.createClass({
	render: function(){
		return (
			<li>
				{this.props.todoText}
			</li>
		);
	}
});

module.exports = List;