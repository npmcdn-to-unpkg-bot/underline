var firebaseUrl = "https://underline.firebaseio.com/";

var Header = React.createClass({
	render: function() {
		return (
			<div className="headWrapper">
				<div className="logo">
					Underline
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

React.render(
	<Header />,
	document.getElementById('header')
);


var Book = React.createClass({
	mixins: [ReactFireMixin],
	removeBook : function(){
		var firebaseRef = new Firebase(firebaseUrl + 'books');
    	firebaseRef.child(this.props.book['.key']).remove();
	},
	render: function() {
		return (
			<div className="book">
				<h2 className="bookAuthor">
					{this.props.book.author_t}
				</h2>
				{this.props.children}
				<button onClick={ this.removeBook }>Remove</button>
			</div>
		);
	}
});


var BookListBox = React.createClass({
	mixins: [ReactFireMixin],
	loadBooksFromServer: function() {
	    this.bindAsArray(new Firebase(firebaseUrl + "books"), "data");
	},
	getInitialState: function() {
		return {data: []};
	},
	componentDidMount: function() {
		this.loadBooksFromServer();
	},
	render: function() {
		return (
			<div className="bookListBox">
				<h1>My Books</h1>
				<BookList data={this.state.data} />
			</div>
		  
		);
	}
});

var BookList = React.createClass({
  render: function() {
  	var bookNodes = this.props.data.map(function (book, index) {
		return (
			<Book key={index} author={book.author} book={book}>
				{book.title}

			</Book>
		);
    });
    return (
      <div className="bookList">
        {bookNodes}
      </div>
    );
  }
});


React.render(
  <BookListBox />,
  document.getElementById('myBooks')
);


