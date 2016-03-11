var firebaseUrl = "https://underline.firebaseio.com/";

var Load = React.createClass({
	componentDidMount: function() {
		//var userData = sessionStorage.getItem('underline-user-data');
		var ref = new Firebase(firebaseUrl);
		var authData = ref.getAuth();
		if (authData) {
		  console.log("User " + authData.uid + " is logged in with " + authData.provider);
		  ReactDOM.findDOMNode(this.refs.userInfo).value = authData.uid;
		  ReactDOM.findDOMNode(this.refs.userPicture).src = authData.password.profileImageURL;
		} else {
		  console.log("User is logged out:"+window.location.pathname);
		  if( window.location.pathname != '/login/' ){
		  	window.location = '/login';
		  }
		}

	},
	render: function() {
		return (
			<div className="loading">
				Loding...
				<input type="text" name="userInfo" ref="userInfo" value="" />
				<img src="" ref="userPicture"/>
			</div>
		);
	}
});


ReactDOM.render(
	<Load />,
	document.getElementById('load')
);