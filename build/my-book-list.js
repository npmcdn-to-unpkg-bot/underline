var firebaseUrl = "https://underline.firebaseio.com/";

var Book = React.createClass({
	mixins: [ReactFireMixin],
	removeBook: function () {
		var firebaseRef = new Firebase(firebaseUrl + 'books');
		firebaseRef.child(this.props.book['.key']).remove();
	},
	render: function () {
		return React.createElement(
			'div',
			{ className: 'book' },
			React.createElement(
				'h2',
				{ className: 'bookAuthor' },
				this.props.book.author_t
			),
			this.props.children,
			React.createElement(
				'button',
				{ onClick: this.removeBook },
				'Remove'
			)
		);
	}
});

var BookListBox = React.createClass({
	mixins: [ReactFireMixin],
	loadBooksFromServer: function () {
		this.bindAsArray(new Firebase(firebaseUrl + "books"), "data");
	},
	getInitialState: function () {
		return { data: [] };
	},
	componentDidMount: function () {
		this.loadBooksFromServer();
	},
	render: function () {
		return React.createElement(
			'div',
			{ className: 'bookListBox' },
			React.createElement(
				'h1',
				null,
				'My Books'
			),
			React.createElement(BookList, { data: this.state.data })
		);
	}
});

var BookList = React.createClass({
	render: function () {
		var bookNodes = this.props.data.map(function (book, index) {
			return React.createElement(
				Book,
				{ key: index, author: book.author, book: book },
				book.title
			);
		});
		return React.createElement(
			'div',
			{ className: 'bookList' },
			bookNodes
		);
	}
});

ReactDOM.render(React.createElement(BookListBox, null), document.getElementById('myBooks'));