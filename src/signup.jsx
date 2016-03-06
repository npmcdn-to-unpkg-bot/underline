var firebaseUrl = "https://underline.firebaseio.com/";

var SignupForm = React.createClass({
	mixins: [ReactFireMixin],
	handleSubmit: function(e) {
	    e.preventDefault();
	    var email = React.findDOMNode(this.refs.email).value.trim();
	    var password = React.findDOMNode(this.refs.password).value.trim();
	    if (!email || !password) {
			return;
	    }else{
	    	this.createUser(email, password);
	    }

	    ReactDOM.findDOMNode(this.refs.email).value = '';
	    ReactDOM.findDOMNode(this.refs.password).value = '';
	    return;
	},
	createUser: function(email, password){
		//ref : https://www.firebase.com/docs/web/guide/login/password.html
		var ref = new Firebase(firebaseUrl);
		ref.createUser({
		  email    : email,
		  password : password
		}, function(error, userData) {
		  if (error) {
		    console.log("Error creating user:", error);
		  } else {
		    console.log("Successfully created user account with uid:", userData.uid);
		    alert("Successfully created user account with uid:", userData.uid);
		    window.location = '/login?email='+email;
		  }
		});
	},
	render: function() {
		return (
			<form className="SignupForm" onSubmit={this.handleSubmit} >
				<input type="eamil" placeholder="email" ref="email" />
				<input type="password" placeholder="password" ref="password" />
				<input type="submit" value="Login" />
			</form>
		);
	}
});

ReactDOM.render(
	<SignupForm />,
	document.getElementById('signup')
);