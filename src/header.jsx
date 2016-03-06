var firebaseUrl = "https://underline.firebaseio.com/";

var Header = React.createClass({
	render: function() {
		return (
			<div className="headWrapper">
				<div className="logo">
					Underline22
				</div>
				<SearchForm />
			</div>
		  
		);
	}
});

var SearchForm = React.createClass({
	handleFocus: function(e) {
	    e.preventDefault();
	    window.location = '/search';
	},
	render: function() {
		return (
			<form className="SearchForm" >
				<input type="text" placeholder="keyword" ref="keyword" onFocus={this.handleFocus} />
				<input type="submit" value="검색" />
			</form>
		);
	}
});

ReactDOM.render(
	<Header />,
	document.getElementById('header')
);