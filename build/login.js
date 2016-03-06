var firebaseUrl = "https://underline.firebaseio.com/";

var LoginForm = React.createClass({
	mixins: [ReactFireMixin],
	handleSubmit: function (e) {
		e.preventDefault();
		var email = ReactDOM.findDOMNode(this.refs.email).value.trim();
		var password = ReactDOM.findDOMNode(this.refs.password).value.trim();
		if (!email || !password) {
			return;
		} else {
			this.getAuthFireBase(email, password);
		}
		this.props.onSearchSubmit(keyword);
		ReactDOM.findDOMNode(this.refs.keyword).value = '';
		return;
	},
	getAuthFireBase: function (email, password) {
		//ref : https://www.firebase.com/docs/web/guide/login/password.html
		var ref = new Firebase(firebaseUrl);
		ref.authWithPassword({
			email: email,
			password: password
		}, function (error, authData) {
			if (error) {
				console.log("Login Failed!", error);
				alert("Login Failed!", error);
			} else {
				console.log("Authenticated successfully with payload:", authData);
				// Save user data to sessionStorage
				sessionStorage.setItem('underline-user-data', JSON.stringify(authData));
				window.location = '/';
			}
		});
	},
	componentDidMount: function () {
		var params = getParams();
		console.log(params.email);
		if (params.email) {
			ReactDOM.findDOMNode(this.refs.email).value = params.email;
		}
	},
	render: function () {
		return React.createElement(
			"form",
			{ className: "LoginForm", onSubmit: this.handleSubmit },
			React.createElement("input", { type: "eamil", placeholder: "email", ref: "email" }),
			React.createElement("input", { type: "password", placeholder: "password", ref: "password" }),
			React.createElement("input", { type: "submit", value: "Login" })
		);
	}
});

ReactDOM.render(React.createElement(LoginForm, null), document.getElementById('login'));

function getParams() {
	var params = {};

	if (location.search) {
		var parts = location.search.substring(1).split('&');

		for (var i = 0; i < parts.length; i++) {
			var nv = parts[i].split('=');
			if (!nv[0]) continue;
			params[nv[0]] = nv[1] || true;
		}
	}
	return params;
}