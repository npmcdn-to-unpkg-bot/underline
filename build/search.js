var Header = React.createClass({
	render: function () {
		return React.createElement(
			"div",
			{ className: "headWrapper" },
			React.createElement(
				"div",
				{ className: "logo" },
				"Underline"
			)
		);
	}
});

React.render(React.createElement(Header, null), document.getElementById('header'));

var Book = React.createClass({
	mixins: [ReactFireMixin],
	componentWillMount: function () {
		this.bookFirebaseRef = new Firebase("https://underline.firebaseio.com/books/");
		this.booUserFirebaseRef = new Firebase("https://underline.firebaseio.com/bookusers/");
		this.bookFirebaseRef.on("child_added", function (dataSnapshot) {
			this.setState({
				books: dataSnapshot.val()
			});
		}.bind(this));
	},
	addBook: function (e) {
		console.log("onclick!!!");
		console.log(this.props.book);
		e.preventDefault();
		var newBookRef = this.bookFirebaseRef.push(this.props.book);
		if (newBookRef.key()) {
			var userData = sessionStorage.getItem('underline-user-data');
			userData = JSON.parse(userData);
			this.booUserFirebaseRef.push({ book: newBookRef.key(), user: userData.uid });
		}
		console.log(newBookRef.key());
		this.setState({ book: "" });
	},
	render: function () {
		return React.createElement(
			"div",
			{ className: "book" },
			React.createElement(
				"h2",
				{ className: "bookAuthor" },
				this.props.book.author_t
			),
			this.props.children,
			React.createElement(
				"button",
				{ onClick: this.addBook },
				"Add"
			)
		);
	}
});

var SearchForm = React.createClass({
	handleSubmit: function (e) {
		e.preventDefault();
		var keyword = ReactDOM.findDOMNode(this.refs.keyword).value.trim();
		if (!keyword) {
			return;
		}
		this.props.onSearchSubmit(keyword);
		ReactDOM.findDOMNode(this.refs.keyword).value = '';
		return;
	},
	render: function () {
		return React.createElement(
			"form",
			{ className: "SearchForm", onSubmit: this.handleSubmit },
			React.createElement("input", { type: "text", placeholder: "keyword", ref: "keyword", autoFocus: true }),
			React.createElement("input", { type: "submit", value: "검색" })
		);
	}
});

var SearchResultBox = React.createClass({
	loadBooksFromServer: function () {
		/*$.ajax({
  url: this.props.url,
  dataType: 'jsonp',
  cache: false,
   
  success: function(data) {
  console.log(data.channel.item);
  this.setState({data: data.channel.item});
  }.bind(this),
  error: function(xhr, status, err) {
  console.error(this.props.url, status, err.toString());
  }.bind(this)
  });*/
	},
	handleSearchSubmit: function (keyword) {
		$.ajax({
			url: this.props.url + "&q=" + keyword + "&output=json",
			dataType: 'jsonp',
			type: 'POST',
			success: function (data) {
				//console.log("url:"+this.props.url+"&q="+keyword+"&output=json");
				//console.log(keyword);
				this.setState({ data: data.channel.item });
			}.bind(this),
			error: function (xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	getInitialState: function () {
		return { data: [] };
	},
	componentDidMount: function () {
		this.loadBooksFromServer();
	},
	render: function () {
		return React.createElement(
			"div",
			{ className: "searchResultBox" },
			React.createElement(SearchForm, { onSearchSubmit: this.handleSearchSubmit }),
			React.createElement(
				"div",
				{ className: "book" },
				React.createElement(
					"h1",
					null,
					"book"
				),
				React.createElement(SearchList, { data: this.state.data })
			)
		);
	}
});

var SearchList = React.createClass({
	render: function () {
		//console.log(this.props.data);
		var bookNodes = this.props.data.map(function (book, i) {
			return React.createElement(
				Book,
				{ author: book.author, key: i, book: book },
				book.title
			);
		});
		return React.createElement(
			"div",
			{ className: "bookList" },
			bookNodes
		);
	}
});

React.render(React.createElement(SearchResultBox, { url: "https://apis.daum.net/search/book?apikey=f43b4510bf93765b4b6800c889be1b89" }), document.getElementById('searchResult'));