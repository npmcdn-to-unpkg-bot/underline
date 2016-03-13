var firebaseUrl = "https://underline.firebaseio.com/";

var UserInfo = React.createClass({
	getInitialState: function () {
		return {
			data: {
				userInfo: {},
				statusText: 'Log In',
				statusChangeLink: '/login/'
			}
		};
	},
	componentDidMount: function () {
		this.loadUserInfosFromFirebase();
	},
	loadUserInfosFromFirebase: function () {
		//var userData = sessionStorage.getItem('underline-user-data');
		var ref = new Firebase(firebaseUrl);
		var authData = ref.getAuth();
		if (authData) {
			if (window.location.pathname == '/login/') {
				window.location = '/';
			}
			//console.log("User " + authData.uid + " is logged in with " + authData.provider);

			this.setState({
				data: { userInfo: authData, statusText: 'Log Out', statusChangeLink: '/logout/' }
			});

			//ReactDOM.findDOMNode(this.refs.userInfo).value = authData.uid;
			ReactDOM.findDOMNode(this.refs.userPicture).src = authData.password.profileImageURL;
		} else {
			//console.log("User is logged out:"+window.location.pathname);
			if (window.location.pathname != '/login/') {
				//window.location = '/login';
			}
		}
	},
	render: function () {
		console.log(this.state.data);
		return React.createElement(
			'div',
			{ className: 'userInfo' },
			React.createElement(
				'span',
				null,
				this.state.data.message
			),
			React.createElement(
				'div',
				{ type: 'text', ref: 'userInfo', className: 'displaynone' },
				this.state.data.userInfo.uid
			),
			React.createElement('img', { src: '', ref: 'userPicture', className: 'displaynone' }),
			React.createElement(
				'a',
				{ href: this.state.data.statusChangeLink },
				this.state.data.statusText
			)
		);
	}
});

ReactDOM.render(React.createElement(UserInfo, null), document.getElementById('userInfo'));