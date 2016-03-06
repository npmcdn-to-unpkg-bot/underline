var firebaseUrl = "https://underline.firebaseio.com/";

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


ReactDOM.render(
  <BookListBox />,
  document.getElementById('myBooks')
);


