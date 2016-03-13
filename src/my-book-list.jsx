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
	    //this.bindAsArray(new Firebase(firebaseUrl + "books"), "data");
	    //var bookusers = new Firebase(firebaseUrl + "bookusers")
	    //var userId = ReactDOM.findDOMNode(this.refs.userInfo).value;
	    //var myBooks = bookusers.child('user:c30eac46-f9d5-45a0-b4db-19c947bb3a4e');
	    //this.bindAsArray(myBooks, "myBooksArray");
	    //console.log(new Firebase(firebaseUrl + "books"));
	    //this.myBooksArray.map(function (book, index) {
		//	console.log(index + ":" + book);
	    //});
	    var myBooks = [];
	    var bookusersRef = new Firebase(firebaseUrl + "bookusers");
		bookusersRef.once("value", function(snapshot) {
		  // The callback function will get called twice, once for "fred" and once for "barney"
		  snapshot.forEach(function(childSnapshot) {

		  	//TODO : 책 상세를 가져오는 이 부분은 Book에서 처리하는것이 좋겠다.
		    var childData = childSnapshot.val();
		    var bookKey = childData.book;
		    console.log(bookKey);
		    bookRef = new Firebase(firebaseUrl + "books/" + bookKey);
		    bookRef.once("value", function(booksnapshot) {
		    	myBooks.push(booksnapshot.val());
		    	//this.setState({ data : myBooks });
		    	
		    });
		    // key will be "fred" the first time and "barney" the second time
		    var key = childSnapshot.key();
		    // childData will be the actual contents of the child
		    var childData = childSnapshot.val();
		  });
		  return myBooks
		});
		
		
	},
	setBooksAsArray: function(){
		this.bindAsArray(this.loadBooksFromServer(), "data");
	},
	getInitialState: function() {
		return {data: []};
	},
	componentDidMount: function() {
		this.setBooksAsArray();
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


