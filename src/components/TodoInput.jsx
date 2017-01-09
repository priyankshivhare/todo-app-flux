var React = require('react');

var TodoInput = React.createClass({
	getInitialState: function(){
		return {value: ""};
	},
	handleChange: function(e){
		var val = e.target.value;
		this.setState({value: val});
	},
	clearField: function(){
		this.state.value='';
	},
	render: function(){
		return (
			<input type="text" className="form-control" value={this.state.value} 
			onChange={this.handleChange}
			/>
		);
	}
});

module.exports = TodoInput;