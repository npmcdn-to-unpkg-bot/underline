var Header = React.createClass({
	render: function() {
		return (
			<div className="headWrapper">
				<div className="logo">
					Underline
				</div>
			</div>
		  
		);
	}
});

React.render(
	<Header />,
	document.getElementById('header')
);


var Book = React.createClass({
	mixins: [ReactFireMixin],
	componentWillMount: function() {
		this.bookFirebaseRef = new Firebase("https://underline.firebaseio.com/books/");
		this.booUserFirebaseRef = new Firebase("https://underline.firebaseio.com/bookusers/");
		this.bookFirebaseRef.on("child_added", function(dataSnapshot) {
			this.setState({
				books: dataSnapshot.val()
			});

		}.bind(this));
		
	},
	addBook: function(e) {
		console.log("onclick!!!");
		console.log(this.props.book);
		e.preventDefault();
		var newBookRef = this.bookFirebaseRef.push(this.props.book);
		if(newBookRef.key()){
			var userData = sessionStorage.getItem('underline-user-data');
			userData = JSON.parse(userData);
			this.booUserFirebaseRef.push({book:newBookRef.key(), user:userData.uid});
		}
		console.log(newBookRef.key());
		this.setState({book: ""});
	},
	render: function() {
		return (
			<div className="book">
				<h2 className="bookAuthor">
					{this.props.book.author_t}
				</h2>
				{this.props.children}
				<button onClick={this.addBook}>Add</button>
			</div>
		);
	}
});


var SearchForm = React.createClass({
	handleSubmit: function(e) {
	    e.preventDefault();
	    var keyword = ReactDOM.findDOMNode(this.refs.keyword).value.trim();
	    if (!keyword) {
			return;
	    }
	    this.props.onSearchSubmit(keyword);
	    ReactDOM.findDOMNode(this.refs.keyword).value = '';
	    return;
	},
	render: function() {
		return (
			<form className="SearchForm" onSubmit={this.handleSubmit}>
				<input type="text" placeholder="keyword" ref="keyword" autoFocus={true} />
				<input type="submit" value="검색" />
			</form>
		);
	}
});

var SearchResultBox = React.createClass({
	loadBooksFromServer: function() {
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
	handleSearchSubmit: function(keyword) {
		$.ajax({
			url: this.props.url+"&q="+keyword+"&output=json",
			dataType: 'jsonp',
			type: 'POST',
			success: function(data) {
				//console.log("url:"+this.props.url+"&q="+keyword+"&output=json");
				//console.log(keyword);
				this.setState({data: data.channel.item});
			}.bind(this),
				error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	getInitialState: function() {
		return {data: []};
	},
	componentDidMount: function() {
		this.loadBooksFromServer();
	},
	render: function() {
		return (
			<div className="searchResultBox">
				<SearchForm onSearchSubmit={this.handleSearchSubmit} />
				<div className="book">
					<h1>book</h1>
					<SearchList data={this.state.data} />
				</div>
			</div>
		  
		);
	}
});

var SearchList = React.createClass({
  render: function() {
  	//console.log(this.props.data);
  	var bookNodes = this.props.data.map(function (book, i) {
		return (
			<Book author={book.author} key={i} book={book}>
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
  <SearchResultBox url="https://apis.daum.net/search/book?apikey=f43b4510bf93765b4b6800c889be1b89" />,
  document.getElementById('searchResult')
);


