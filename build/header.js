var firebaseUrl = "https://underline.firebaseio.com/";

var Header = React.createClass({
	render: function () {
		return React.createElement(
			"div",
			{ className: "headWrapper" },
			React.createElement(
				"div",
				{ className: "logo" },
				"Underline22"
			),
			React.createElement(SearchForm, null)
		);
	}
});

var SearchForm = React.createClass({
	handleFocus: function (e) {
		e.preventDefault();
		window.location = '/search';
	},
	render: function () {
		return React.createElement(
			"form",
			{ className: "SearchForm" },
			React.createElement("input", { type: "text", placeholder: "keyword", ref: "keyword", onFocus: this.handleFocus }),
			React.createElement("input", { type: "submit", value: "검색" })
		);
	}
});

ReactDOM.render(React.createElement(Header, null), document.getElementById('header'));